import axios from 'axios';
import localPersistenceService from './localPersistenceService';
import API_CONFIG, { buildAuthUrl } from '../config/api.js';

// Configuration de base d'Axios pour l'authentification
const authAPI = axios.create({
  baseURL: API_CONFIG.API_URL, // Utilise directement l'URL de l'API sans ajouter /auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Inscription
  register: async (userData) => {
    // Adapter les données pour correspondre au format attendu par le backend
    const registerData = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      region: userData.region,
      prefecture: userData.prefecture,
      commune: userData.commune,
      quartier: userData.quartier,
      address: userData.address,
      latitude: userData.latitude,
      longitude: userData.longitude,
      dateOfBirth: userData.dateOfBirth || '1990-01-01',
      gender: userData.gender || 'Homme'
    };
    
    const response = await authAPI.post('/register', registerData);
    
    // Sauvegarder localement les données utilisateur
    if (response.data.success && response.data.user) {
      localPersistenceService.saveProfile(response.data.user);
    }
    
    return response;
  },

  // Connexion
  login: async (credentials) => {
    // Adapter les données pour correspondre à l'API backend
    const loginData = {
      identifier: credentials.email || credentials.phone || credentials.identifier,
      password: credentials.password
    };
    const response = await authAPI.post('/login', loginData);
    
    // Sauvegarder localement les données utilisateur
    if (response.data.success && response.data.user) {
      localPersistenceService.saveProfile(response.data.user);
    }
    
    return response;
  },

  // Déconnexion
  logout: async () => {
    const response = await authAPI.post('/auth/logout');
    
    // Nettoyer les données locales
    localPersistenceService.remove('profile');
    localPersistenceService.remove('profile_picture');
    
    return response;
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: async () => {
    try {
      // Vérifier si un token existe
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Si hors-ligne, ne pas appeler l'API et utiliser le profil local
      if (typeof navigator !== 'undefined' && navigator && navigator.onLine === false) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const localProfile = localPersistenceService.loadProfile(userId);
          if (localProfile) {
            console.log('📂 Utilisateur récupéré depuis le stockage local (mode hors-ligne)');
            return { data: { success: true, user: localProfile } };
          }
        }
        throw new Error('offline');
      }

      const response = await authAPI.get('/auth/me');
      
      // Sauvegarder localement les données utilisateur
      if (response.data.success && response.data.user) {
        localPersistenceService.saveProfile(response.data.user);
      }
      
      return response;
    } catch (error) {
      // Si erreur 401 (non autorisé), nettoyer le token et rediriger
      if (error.response?.status === 401) {
        console.log('🔒 Token invalide, nettoyage de la session');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        throw new Error('Token invalide');
      }

      // En cas d'erreur, essayer de récupérer depuis le stockage local
      const userId = localStorage.getItem('userId');
      if (userId) {
        const localProfile = localPersistenceService.loadProfile(userId);
        if (localProfile) {
          console.log('📂 Utilisateur récupéré depuis le stockage local');
          return {
            data: {
              success: true,
              user: localProfile
            }
          };
        }
      }
      throw error;
    }
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    const response = await authAPI.put('/profile', profileData);
    
    // Sauvegarder localement les données mises à jour
    if (response.data.success && response.data.user) {
      localPersistenceService.saveProfile(response.data.user);
    }
    
    return response;
  },

  // Mettre à jour la photo de profil
  updateProfilePicture: async (formData) => {
    const response = await authAPI.put('/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Sauvegarder localement la photo de profil
    if (response.data.success && response.data.profilePicture) {
      const userId = localStorage.getItem('userId') || 'current';
      localPersistenceService.saveProfilePicture(userId, {
        profilePicture: response.data.profilePicture,
        updatedAt: new Date().toISOString()
      });
    }
    
    return response;
  },

  // Récupérer le profil depuis le stockage local
  getLocalProfile: (userId) => {
    return localPersistenceService.loadProfile(userId);
  },

  // Récupérer la photo de profil depuis le stockage local
  getLocalProfilePicture: (userId) => {
    return localPersistenceService.loadProfilePicture(userId);
  },

  // Sauvegarder le profil localement
  saveLocalProfile: (profileData) => {
    return localPersistenceService.saveProfile(profileData);
  },

  // Sauvegarder la photo de profil localement
  saveLocalProfilePicture: (userId, pictureData) => {
    return localPersistenceService.saveProfilePicture(userId, pictureData);
  }
};

export default authService; 