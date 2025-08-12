// Configuration CommuniConnect - Serveur (Développement Local)
// ======================================================

module.exports = {
  // Configuration du serveur
  PORT: 5001,
  NODE_ENV: 'development',
  
  // Base de données MongoDB
  MONGODB_URI: 'mongodb://localhost:27017/communiconnect',
  
  // JWT Secret
  JWT_SECRET: 'communiconnect-super-secret-jwt-key-2024-change-in-production',
  JWT_EXPIRE: '7d',
  
  // Google OAuth 2.0 - CLÉS CONFIGURÉES
  GOOGLE_CLIENT_ID: '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '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',
  GOOGLE_REDIRECT_URI: 'http://localhost:3000/auth/callback',
  
  // Configuration CORS
  CORS_ORIGIN: 'http://localhost:3000',
  
  // Rate Limiting - Plus permissif en développement
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 200,
  
  // Sécurité
  HELMET_ENABLED: true,
  CORS_ENABLED: true,
  RATE_LIMIT_ENABLED: true
};

// ✅ Configuration pour le développement local
// Timestamp: 2025-08-11T15:40:00.000Z

// Instructions:
// 1. Renommez ce fichier en .env
// 2. Assurez-vous que MongoDB est en cours d'exécution
// 3. Redémarrez le serveur après modification
