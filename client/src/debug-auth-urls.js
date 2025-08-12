// Script de diagnostic pour identifier les URLs d'authentification
console.log('🔍 DIAGNOSTIC DES URLS D\'AUTHENTIFICATION');

import API_CONFIG from './config/api';

// Vérifier la configuration
const API_URL = API_CONFIG.API_URL;
console.log('📍 API_URL:', API_URL);

// Vérifier la baseURL d'auth
const authBaseURL = `${API_URL}/auth`;
console.log('📍 authBaseURL:', authBaseURL);

// Vérifier les URLs complètes
console.log('📍 /me URL complète:', `${authBaseURL}/me`);
console.log('📍 /logout URL complète:', `${authBaseURL}/logout`);

// Vérifier les variables d'environnement
console.log('📍 NODE_ENV:', process.env.NODE_ENV);
console.log('📍 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

// Intercepter les appels fetch pour voir les URLs réelles
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  console.log('🔍 FETCH appelé avec URL:', url);
  if (url.includes('/auth/')) {
    console.log('⚠️  URL d\'auth détectée:', url);
    if (!url.includes('/api/')) {
      console.log('🚨 PROBLÈME: URL sans /api/ détectée!');
    }
  }
  return originalFetch.apply(this, arguments);
};

console.log('✅ Intercepteur fetch installé');
