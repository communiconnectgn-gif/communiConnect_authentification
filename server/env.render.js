// Configuration CommuniConnect - Serveur (Production Render)
// ======================================================

module.exports = {
  // Configuration du serveur
  PORT: process.env.PORT || 5000,
  NODE_ENV: 'production',
  
  // Base de données MongoDB Atlas (production)
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/communiconnect',
  
  // JWT Secret (doit être défini dans les variables d'environnement Render)
  JWT_SECRET: process.env.JWT_SECRET || 'communiconnect-production-jwt-key-2024',
  JWT_EXPIRE: '7d',
  
  // Google OAuth 2.0 - CLÉS CONFIGURÉES
  GOOGLE_CLIENT_ID: '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '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',
  GOOGLE_REDIRECT_URI: 'https://*.vercel.app/auth/callback', // Wildcard pour tous les domaines Vercel
  
  // Configuration CORS - Autoriser tous les domaines Vercel
  CORS_ORIGIN: ['http://localhost:3000', 'https://*.vercel.app', 'https://communiconnectgn224-*.vercel.app'],
  
  // Rate Limiting - Plus strict en production
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Sécurité
  HELMET_ENABLED: true,
  CORS_ENABLED: true,
  RATE_LIMIT_ENABLED: true
};

// ✅ Configuration pour la production Render
// Timestamp: 2025-08-11T15:40:00.000Z

// Instructions:
// 1. Renommez ce fichier en .env pour Render
// 2. Configurez les variables d'environnement dans Render
// 3. Assurez-vous que MongoDB Atlas est accessible
// 4. Vérifiez que l'URL OAuth inclut votre domaine Vercel
