// Script de démarrage du serveur sur le port 5001
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du serveur CommuniConnect sur le port 5001...');

// Configuration temporaire
process.env.PORT = '5001';
process.env.NODE_ENV = 'development';
process.env.JWT_SECRET = 'communiconnect-super-secret-jwt-key-2024-change-in-production';
process.env.JWT_EXPIRE = '7d';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.GOOGLE_CLIENT_ID = 'your-google-client-id-here';
process.env.GOOGLE_CLIENT_SECRET = 'your-google-client-secret-here';
process.env.GOOGLE_REDIRECT_URI = 'http://localhost:5001/api/auth/oauth/callback';

console.log('📋 Configuration temporaire:');
console.log('   - Port:', process.env.PORT);
console.log('   - Mode:', process.env.NODE_ENV);
console.log('   - CORS Origin:', process.env.CORS_ORIGIN);
console.log('   - Google Redirect URI:', process.env.GOOGLE_REDIRECT_URI);

// Démarrer le serveur
const serverPath = path.join(__dirname, 'server', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

server.on('error', (error) => {
  console.error('❌ Erreur lors du démarrage du serveur:', error.message);
});

server.on('close', (code) => {
  console.log(`🔴 Serveur arrêté avec le code: ${code}`);
});

// Gérer l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.kill('SIGTERM');
  process.exit(0);
});
