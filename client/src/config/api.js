// Configuration centralisée des URLs de l'API
const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  
  // Préfixe de l'API
  API_PREFIX: '/api',
  
  // URL complète de l'API
  API_URL: `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`,
  
  // Routes d'authentification
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    OAUTH_CALLBACK: '/auth/oauth/callback',
    OAUTH_STATUS: '/auth/oauth/status',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  
  // URL Socket.IO
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001',
  
  // Configuration Google OAuth
  GOOGLE: {
    CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com'
  }
};

// Fonction utilitaire pour construire les URLs complètes
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.API_URL}${endpoint}`;
};

// Fonction utilitaire pour construire les URLs d'authentification
export const buildAuthUrl = (endpoint) => {
  return `${API_CONFIG.API_URL}${API_CONFIG.AUTH[endpoint] || endpoint}`;
};

export default API_CONFIG;
