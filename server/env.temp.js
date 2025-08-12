// Configuration temporaire pour le serveur CommuniConnect
// Copiez ce contenu dans un fichier .env dans le dossier server/

module.exports = {
  NODE_ENV: 'development',
  PORT: 5000,
  JWT_SECRET: 'communiconnect-dev-secret-key-2024',
  JWT_EXPIRE: '7d',
  CORS_ORIGIN: 'http://localhost:3000',
  
  // Configuration Google OAuth (à remplir plus tard)
  GOOGLE_CLIENT_ID: 'your-google-client-id-here',
  GOOGLE_CLIENT_SECRET: 'your-google-client-secret-here',
  GOOGLE_REDIRECT_URI: 'http://localhost:5000/api/auth/oauth/callback',
  
  // Configuration MongoDB (optionnelle en développement)
  MONGODB_URI: 'mongodb://localhost:27017/communiconnect',
  
  // Configuration Firebase (optionnelle en développement)
  FIREBASE_PROJECT_ID: 'your-firebase-project-id',
  FIREBASE_PRIVATE_KEY: 'your-firebase-private-key',
  FIREBASE_CLIENT_EMAIL: 'your-firebase-client-email',
  
  // Configuration Redis (optionnelle en développement)
  REDIS_URL: 'redis://localhost:6379',
  
  // Configuration Twilio (optionnelle en développement)
  TWILIO_ACCOUNT_SID: 'your-twilio-account-sid',
  TWILIO_AUTH_TOKEN: 'your-twilio-auth-token',
  
  // Configuration Cloudinary (optionnelle en développement)
  CLOUDINARY_CLOUD_NAME: 'your-cloudinary-cloud-name',
  CLOUDINARY_API_KEY: 'your-cloudinary-api-key',
  CLOUDINARY_API_SECRET: 'your-cloudinary-api-secret',
  
  // Configuration email (optionnelle en développement)
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'your-email@gmail.com',
  SMTP_PASS: 'your-app-password',
  
  // Limites de taux
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
};

console.log('📝 Instructions:');
console.log('1. Copiez ce contenu dans un fichier .env dans le dossier server/');
console.log('2. Remplacez les valeurs "your-..." par vos vraies clés');
console.log('3. Pour Google OAuth, créez d\'abord un projet Google Cloud');
console.log('4. Redémarrez le serveur après avoir créé le fichier .env');
