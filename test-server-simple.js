// Test simple du serveur CommuniConnect
const fs = require('fs');
const path = require('path');

console.log('🔍 Test simple du serveur CommuniConnect\n');

// Vérifier la structure des dossiers
const serverDir = path.join(__dirname, 'server');
const clientDir = path.join(__dirname, 'client');

console.log('📂 Structure des dossiers :');
console.log(`✅ Dossier serveur: ${fs.existsSync(serverDir) ? 'Présent' : '❌ Manquant'}`);
console.log(`✅ Dossier client: ${fs.existsSync(clientDir) ? 'Présent' : '❌ Manquant'}`);

// Vérifier les fichiers essentiels du serveur
const serverFiles = [
  'index.js',
  'package.json',
  'routes/auth.js',
  'middleware/rateLimiter.js'
];

console.log('\n📁 Fichiers serveur essentiels :');
serverFiles.forEach(file => {
  const filePath = path.join(serverDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}: ${exists ? 'Présent' : 'Manquant'}`);
});

// Vérifier les fichiers essentiels du client
const clientFiles = [
  'package.json',
  'src/pages/Auth/LoginPage.js',
  'src/pages/Auth/AuthCallback.js'
];

console.log('\n📁 Fichiers client essentiels :');
clientFiles.forEach(file => {
  const filePath = path.join(clientDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}: ${exists ? 'Présent' : 'Manquant'}`);
});

// Vérifier les fichiers de configuration
console.log('\n📝 Fichiers de configuration :');
const configFiles = [
  'server/env.temp.js',
  'server/config/env.server.js',
  'client/config/env.client.js',
  'docs/google-oauth-setup.md'
];

configFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}: ${exists ? 'Présent' : 'Manquant'}`);
});

// Instructions pour corriger les problèmes
console.log('\n🔧 Instructions pour corriger les problèmes :');

if (!fs.existsSync(path.join(serverDir, '.env'))) {
  console.log('\n📝 Créez le fichier server/.env :');
  console.log('1. Copiez le contenu de server/env.temp.js');
  console.log('2. Renommez-le en .env');
  console.log('3. Remplissez vos vraies clés Google OAuth');
}

// Vérifier les erreurs courantes
console.log('\n⚠️  Problèmes potentiels identifiés :');

// Vérifier si le serveur peut démarrer
try {
  const serverIndex = fs.readFileSync(path.join(serverDir, 'index.js'), 'utf8');
  
  if (serverIndex.includes('onLimitReached')) {
    console.log('❌ Le serveur utilise onLimitReached (déprécié)');
    console.log('   💡 Ce problème a été corrigé dans rateLimiter.js');
  } else {
    console.log('✅ Le serveur n\'utilise plus onLimitReached');
  }
  
  if (serverIndex.includes('require(\'dotenv\').config()')) {
    console.log('✅ Le serveur charge bien les variables d\'environnement');
  } else {
    console.log('❌ Le serveur ne charge pas dotenv');
  }
  
} catch (error) {
  console.log('❌ Impossible de lire index.js du serveur');
}

console.log('\n🚀 Prochaines étapes :');
console.log('1. Créez le fichier server/.env avec vos clés');
console.log('2. Démarrez le serveur: cd server && npm run dev');
console.log('3. Testez l\'endpoint: http://localhost:5000/api/health');
console.log('4. Configurez Google OAuth dans Google Cloud Console');

console.log('\n' + '='.repeat(60));
console.log('🎯 Résumé du diagnostic');
console.log('='.repeat(60));

const allServerFiles = serverFiles.every(file => fs.existsSync(path.join(serverDir, file)));
const allClientFiles = clientFiles.every(file => fs.existsSync(path.join(clientDir, file)));

if (allServerFiles && allClientFiles) {
  console.log('✅ Tous les fichiers essentiels sont présents');
  console.log('✅ Le serveur devrait pouvoir démarrer');
  console.log('⚠️  Il faut juste créer le fichier .env avec vos clés');
} else {
  console.log('❌ Certains fichiers essentiels sont manquants');
  console.log('🔧 Vérifiez la structure du projet');
}

console.log('\n🎉 Diagnostic terminé !');
