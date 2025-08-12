import api from './api';
import localPersistenceService from './localPersistenceService';

const EVENTS_ENDPOINT = '/api/events';

export const eventsService = {
  // Obtenir tous les événements avec filtres
  getEvents: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      const response = await api.get(`${EVENTS_ENDPOINT}?${params.toString()}`);
      const payload = response.data?.data || response.data;
      // Optionnel: sauvegarder localement la dernière liste
      try {
        const events = payload.events || [];
        events.forEach(ev => localPersistenceService.saveEvent(ev));
      } catch {}
      return payload;
    } catch (error) {
      // Fallback: charger depuis localStorage
      const localEvents = localPersistenceService.loadAllEvents();
      return { events: localEvents, pagination: { page: 1, limit: localEvents.length, total: localEvents.length, pages: 1 } };
    }
  },

  // Obtenir les événements à venir
  getUpcomingEvents: async (limit = 10) => {
    try {
      const response = await api.get(`${EVENTS_ENDPOINT}/upcoming?limit=${limit}`);
      return response.data?.data || response.data;
    } catch {
      const events = localPersistenceService.loadAllEvents();
      return events
        .filter(e => new Date(e.startDate) > new Date())
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, limit);
    }
  },

  // Obtenir les événements à proximité
  getNearbyEvents: async (latitude, longitude, radius = 10) => {
    try {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        radius: radius.toString()
      });
      const response = await api.get(`${EVENTS_ENDPOINT}/nearby?${params.toString()}`);
      return response.data?.data || response.data;
    } catch {
      // Approx fallback: distance euclidienne approx transformée en km
      const events = localPersistenceService.loadAllEvents();
      const results = events.filter(ev => {
        const elat = ev.location?.coordinates?.latitude;
        const elng = ev.location?.coordinates?.longitude;
        if (typeof elat !== 'number' || typeof elng !== 'number') return false;
        const latDiff = Math.abs(latitude - elat);
        const lngDiff = Math.abs(longitude - elng);
        const distKm = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
        return distKm <= radius;
      });
      return results;
    }
  },

  // Obtenir un événement spécifique
  getEvent: async (id) => {
    try {
      const response = await api.get(`${EVENTS_ENDPOINT}/${id}`);
      return response.data?.data || response.data;
    } catch {
      // Fallback local
      return localPersistenceService.loadEvent(id);
    }
  },

  // Créer un nouvel événement
  createEvent: async (eventData) => {
    try {
      const response = await api.post(EVENTS_ENDPOINT, eventData);
      const event = response.data?.data || response.data;
      try { localPersistenceService.saveEvent(event); } catch {}
      return event;
    } catch (error) {
      // Fallback hors-ligne: simuler la création et persister localement
      const now = new Date();
      const id = `local-${Math.random().toString(36).slice(2)}`;
      const event = {
        _id: id,
        title: (eventData.title || '').trim(),
        description: (eventData.description || '').trim(),
        type: eventData.type || 'autre',
        category: eventData.category || 'communautaire',
        startDate: eventData.startDate ? new Date(eventData.startDate) : now,
        endDate: eventData.endDate ? new Date(eventData.endDate) : now,
        startTime: eventData.startTime || eventData.time || '08:00',
        endTime: eventData.endTime || eventData.time || '10:00',
        location: {
          coordinates: {
            latitude: parseFloat(eventData.latitude) || 9.5370,
            longitude: parseFloat(eventData.longitude) || -13.6785,
          },
          region: eventData.location?.region || eventData.region || 'Conakry',
          prefecture: eventData.location?.prefecture || eventData.prefecture || 'Conakry',
          commune: eventData.location?.commune || eventData.commune || 'Kaloum',
          quartier: eventData.location?.quartier || eventData.quartier || 'Centre',
          address: (eventData.address || eventData.location?.address || '').trim(),
          venue: (eventData.venue || eventData.address || eventData.location?.venue || '').trim(),
        },
        organizer: { _id: localStorage.getItem('userId') || 'local-user' },
        capacity: eventData.capacity || eventData.maxParticipants || null,
        isFree: eventData.isFree !== undefined ? eventData.isFree : true,
        price: eventData.price || { amount: 0, currency: 'GNF' },
        participants: [],
        media: { images: [], videos: [], documents: [] },
        status: 'published',
        visibility: 'public',
        tags: [eventData.type, eventData.category].filter(Boolean),
        createdAt: now,
        updatedAt: now,
      };
      try { localPersistenceService.saveEvent(event); } catch {}
      return event;
    }
  },

  // Mettre à jour un événement
  updateEvent: async (id, updateData) => {
    const response = await api.put(`${EVENTS_ENDPOINT}/${id}`, updateData);
    const updated = response.data?.data || response.data;
    try { localPersistenceService.update('event', updated, id); } catch {}
    return updated;
  },

  // Participer à un événement
  participateInEvent: async (id, status = 'confirmed') => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${id}/participate`, { status });
    return response.data?.data || response.data;
  },

  // Se désinscrire d'un événement
  leaveEvent: async (id) => {
    const response = await api.delete(`${EVENTS_ENDPOINT}/${id}/participate`);
    return response.data?.data || response.data;
  },

  // Signaler un événement
  reportEvent: async (id, reportData) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${id}/report`, reportData);
    return response.data?.data || response.data;
  },

  // Supprimer un événement
  deleteEvent: async (id) => {
    const response = await api.delete(`${EVENTS_ENDPOINT}/${id}`);
    try { localPersistenceService.remove('event', id); } catch {}
    return response.data?.data || response.data;
  },

  // Obtenir les événements par type
  getEventsByType: async (type) => {
    const response = await api.get(`${EVENTS_ENDPOINT}?type=${type}`);
    return response.data;
  },

  // Obtenir les événements par organisateur
  getEventsByOrganizer: async (organizerId) => {
    const response = await api.get(`${EVENTS_ENDPOINT}?organizer=${organizerId}`);
    return response.data;
  },

  // Obtenir les événements par date
  getEventsByDateRange: async (startDate, endDate) => {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });

    const response = await api.get(`${EVENTS_ENDPOINT}?${params.toString()}`);
    return response.data;
  },

  // Obtenir les événements gratuits
  getFreeEvents: async () => {
    const response = await api.get(`${EVENTS_ENDPOINT}?isFree=true`);
    return response.data;
  },

  // Obtenir les événements payants
  getPaidEvents: async () => {
    const response = await api.get(`${EVENTS_ENDPOINT}?isFree=false`);
    return response.data;
  },

  // Rechercher des événements par mot-clé
  searchEvents: async (searchTerm) => {
    const response = await api.get(`${EVENTS_ENDPOINT}?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  },

  // Obtenir les statistiques des événements
  getEventStats: async () => {
    const response = await api.get(`${EVENTS_ENDPOINT}/stats`);
    return response.data;
  },

  // Ajouter un co-organisateur
  addCoOrganizer: async (eventId, userId, role = 'coordinateur') => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/co-organizers`, {
      userId,
      role
    });
    return response.data;
  },

  // Supprimer un co-organisateur
  removeCoOrganizer: async (eventId, userId) => {
    const response = await api.delete(`${EVENTS_ENDPOINT}/${eventId}/co-organizers/${userId}`);
    return response.data;
  },

  // Marquer la présence d'un participant
  markAttendance: async (eventId, userId, attended = true) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/attendance`, {
      userId,
      attended
    });
    return response.data;
  },

  // Obtenir la liste des participants
  getEventParticipants: async (eventId) => {
    const response = await api.get(`${EVENTS_ENDPOINT}/${eventId}/participants`);
    return response.data;
  },

  // Exporter les participants (CSV)
  exportParticipants: async (eventId, format = 'csv') => {
    const response = await api.get(`${EVENTS_ENDPOINT}/${eventId}/export-participants`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  },

  // Envoyer des notifications aux participants
  notifyParticipants: async (eventId, message) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/notify`, {
      message
    });
    return response.data;
  },

  // Dupliquer un événement
  duplicateEvent: async (eventId, newDates) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/duplicate`, newDates);
    return response.data;
  },

  // Annuler un événement
  cancelEvent: async (eventId, reason) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/cancel`, {
      reason
    });
    return response.data;
  },

  // Reporter un événement
  postponeEvent: async (eventId, newDates) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/postpone`, newDates);
    return response.data;
  },

  // Marquer un événement comme terminé
  completeEvent: async (eventId, summary) => {
    const response = await api.post(`${EVENTS_ENDPOINT}/${eventId}/complete`, {
      summary
    });
    return response.data;
  }
}; 