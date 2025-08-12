// Script de configuration automatique Google OAuth
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function configurerOAuth() {
  console.log('🚀 Configuration automatique Google OAuth pour CommuniConnect\n');
  
  try {
    // Demander les clés OAuth
    const clientId = await question('🔑 Entrez votre Google Client ID: ');
    const clientSecret = await question('🔐 Entrez votre Google Client Secret: ');
    
    if (!clientId || !clientSecret) {
      console.log('❌ Les clés OAuth sont requises');
      rl.close();
      return;
    }
    
    console.log('\n📝 Configuration des fichiers...');
    
    // Configuration côté serveur
    const serverConfig = `# Configuration CommuniConnect - Serveur (Port temporaire)
# ======================================================

# Configuration du serveur
PORT=5001
NODE_ENV=development

# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/communiconnect

# JWT Secret
JWT_SECRET=communiconnect-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRE=7d

# Google OAuth 2.0 - CLÉS CONFIGURÉES
GOOGLE_CLIENT_ID=${clientId}
GOOGLE_CLIENT_SECRET=${clientSecret}
GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/oauth/callback

# Configuration CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Sécurité
HELMET_ENABLED=true
CORS_ENABLED=true
RATE_LIMIT_ENABLED=true

# ✅ Google OAuth configuré avec succès !
# Timestamp: ${new Date().toISOString()}
`;
    
    // Configuration côté client
    const clientConfig = `# Configuration Google OAuth pour le client CommuniConnect
# ======================================================

# Configuration OAuth
REACT_APP_GOOGLE_CLIENT_ID=${clientId}
REACT_APP_FACEBOOK_CLIENT_ID=your-facebook-client-id-here

# Configuration API
REACT_APP_API_URL=http://localhost:5001
REACT_APP_SOCKET_URL=http://localhost:5001
REACT_APP_ENV=development

# Configuration Firebase (optionnel)
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id

# ✅ Google OAuth configuré avec succès !
# Timestamp: ${new Date().toISOString()}
`;
    
    // Écrire les fichiers de configuration
    fs.writeFileSync('server/.env-temp', serverConfig);
    fs.writeFileSync('client/.env', clientConfig);
    
    console.log('✅ Configuration serveur sauvegardée dans server/.env-temp');
    console.log('✅ Configuration client sauvegardée dans client/.env');
    
    console.log('\n🎉 Configuration OAuth terminée !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Redémarrez le serveur: node start-server-5001.js');
    console.log('   2. Testez la configuration: node test-oauth-wait.js');
    console.log('   3. Ouvrez l\'application dans le navigateur');
    console.log('   4. Testez la connexion avec Google');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
  } finally {
    rl.close();
  }
}

// Lancer la configuration
configurerOAuth();
