// Script de démarrage du client avec configuration OAuth automatique
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du client CommuniConnect avec OAuth configuré...');

// Configuration OAuth automatique
process.env.REACT_APP_GOOGLE_CLIENT_ID = '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com';
process.env.REACT_APP_API_URL = 'http://localhost:5001';
process.env.REACT_APP_SOCKET_URL = 'http://localhost:5001';
process.env.REACT_APP_ENV = 'development';

console.log('📋 Configuration OAuth automatique:');
console.log('   - Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
console.log('   - API URL:', process.env.REACT_APP_API_URL);
console.log('   - Mode:', process.env.REACT_APP_ENV);

// Aller dans le dossier client
process.chdir(path.join(__dirname, 'client'));

console.log('\n📁 Dossier client:', process.cwd());

// Démarrer le client React
const client = spawn('npm', ['start'], {
  stdio: 'inherit',
  env: process.env
});

client.on('error', (error) => {
  console.error('❌ Erreur lors du démarrage du client:', error.message);
});

client.on('close', (code) => {
  console.log(`🔴 Client arrêté avec le code: ${code}`);
});

// Gérer l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du client...');
  client.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du client...');
  client.kill('SIGTERM');
  process.exit(0);
});
