// Configuration Google OAuth pour CommuniConnect
// Renommez ce fichier en .env et remplissez vos vraies clés

module.exports = {
  // Configuration du serveur
  PORT: 5000,
  NODE_ENV: 'development',
  
  // Base de données MongoDB
  MONGODB_URI: 'mongodb://localhost:27017/communiconnect',
  
  // JWT Secret
  JWT_SECRET: 'communiconnect-super-secret-jwt-key-2024-change-in-production',
  JWT_EXPIRE: '7d',
  
  // Google OAuth 2.0 - REMPLACEZ PAR VOS VRAIES CLÉS
  GOOGLE_CLIENT_ID: 'your-google-client-id-here',
  GOOGLE_CLIENT_SECRET: 'your-google-client-secret-here',
  GOOGLE_REDIRECT_URI: 'http://localhost:5000/api/auth/oauth/callback',
  
  // Configuration CORS
  CORS_ORIGIN: 'http://localhost:3000',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
};

// Instructions pour configurer Google OAuth :
// 1. Allez sur https://console.cloud.google.com/
// 2. Créez un nouveau projet ou sélectionnez un existant
// 3. Activez l'API Google+ API
// 4. Allez dans "Identifiants" > "Créer des identifiants" > "ID client OAuth 2.0"
// 5. Configurez les URIs de redirection autorisés :
//    - http://localhost:3000/auth/callback
//    - http://localhost:5000/api/auth/oauth/callback
// 6. Copiez le Client ID et Client Secret dans ce fichier
