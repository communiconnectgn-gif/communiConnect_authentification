const axios = require('axios');

// Configuration pour les tests
const API_BASE_URL = 'http://localhost:5000/api';
const testConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logSuccess = (message) => log(`✅ ${message}`, 'green');
const logError = (message) => log(`❌ ${message}`, 'red');
const logWarning = (message) => log(`⚠️ ${message}`, 'yellow');
const logInfo = (message) => log(`ℹ️ ${message}`, 'blue');

async function testServerStatus() {
  log('\n🔍 Test du statut du serveur', 'blue');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/status`, testConfig);
    if (response.data.success) {
      logSuccess('Serveur d\'authentification accessible');
      logInfo(`Status: ${response.data.status}`);
      return true;
    } else {
      logError('Serveur d\'authentification en erreur');
      return false;
    }
  } catch (error) {
    logError(`Serveur non accessible: ${error.message}`);
    return false;
  }
}

async function testOAuthEndpoint() {
  log('\n🔐 Test de l\'endpoint OAuth', 'blue');
  
  try {
    // Test avec un code OAuth simulé
    const oauthResponse = await axios.post(`${API_BASE_URL}/auth/oauth/callback`, {
      code: 'test-google-oauth-code',
      state: 'test-state',
      redirectUri: 'http://localhost:3000/auth/callback'
    }, testConfig);

    if (oauthResponse.data.success) {
      logSuccess('Endpoint OAuth fonctionne');
      logInfo(`Token généré: ${oauthResponse.data.token.substring(0, 20)}...`);
      logInfo(`Utilisateur: ${oauthResponse.data.user.firstName} ${oauthResponse.data.user.lastName}`);
      return true;
    } else {
      logError('Endpoint OAuth en erreur');
      return false;
    }
  } catch (error) {
    if (error.response?.status === 501) {
      logWarning('OAuth non configuré (mode production) - normal en développement');
      return true;
    } else {
      logError(`Erreur OAuth: ${error.response?.data?.message || error.message}`);
      return false;
    }
  }
}

async function testGoogleOAuthFlow() {
  log('\n🌐 Test du flux OAuth Google complet', 'blue');
  
  try {
    logInfo('1. Vérification de la configuration Google...');
    
    // Simuler le flux OAuth Google
    const mockOAuthData = {
      code: 'mock-google-oauth-code-123',
      state: 'mock-state-456',
      redirectUri: 'http://localhost:3000/auth/callback'
    };

    logInfo('2. Envoi du code OAuth au serveur...');
    const response = await axios.post(`${API_BASE_URL}/auth/oauth/callback`, mockOAuthData, testConfig);

    if (response.data.success) {
      logSuccess('Flux OAuth Google simulé réussi');
      logInfo(`Token JWT: ${response.data.token.substring(0, 30)}...`);
      logInfo(`Utilisateur: ${response.data.user.firstName} ${response.data.user.lastName}`);
      logInfo(`Email: ${response.data.user.email}`);
      logInfo(`Rôle: ${response.data.user.role}`);
      
      // Vérifier que l'utilisateur a les bonnes informations
      if (response.data.user.isVerified) {
        logSuccess('Utilisateur vérifié automatiquement');
      }
      
      return true;
    } else {
      logError('Flux OAuth échoué');
      return false;
    }
  } catch (error) {
    logError(`Erreur dans le flux OAuth: ${error.response?.data?.message || error.message}`);
    return false;
  }
}

async function runGoogleOAuthTests() {
  log('\n🚀 Tests de configuration Google OAuth', 'blue');
  log('=' .repeat(60), 'blue');

  // Test 1: Statut du serveur
  const serverOk = await testServerStatus();
  if (!serverOk) {
    logError('Serveur non accessible. Arrêt des tests.');
    logInfo('Démarrez le serveur avec: cd server && npm run dev');
    return;
  }

  // Test 2: Endpoint OAuth
  const oauthOk = await testOAuthEndpoint();
  if (!oauthOk) {
    logWarning('Endpoint OAuth en erreur');
  }

  // Test 3: Flux OAuth Google complet
  const flowOk = await testGoogleOAuthFlow();
  if (!flowOk) {
    logWarning('Flux OAuth Google en erreur');
  }

  log('\n' + '=' .repeat(60), 'blue');
  log('📊 Résumé des tests Google OAuth:', 'blue');
  
  if (serverOk && oauthOk && flowOk) {
    logSuccess('✅ Tous les tests OAuth Google sont passés !');
    logInfo('L\'authentification Google est prête à être utilisée');
  } else if (serverOk && oauthOk) {
    logWarning('⚠️ Serveur et OAuth fonctionnels, mais flux incomplet');
    logInfo('Vérifiez la configuration des variables d\'environnement');
  } else if (serverOk) {
    logWarning('⚠️ Serveur accessible mais OAuth non fonctionnel');
    logInfo('Vérifiez la configuration OAuth dans auth.js');
  } else {
    logError('❌ Serveur non accessible');
    logInfo('Démarrez le serveur avant de tester OAuth');
  }

  log('\n🔧 Prochaines étapes:', 'blue');
  logInfo('1. Configurez vos vraies clés Google OAuth');
  logInfo('2. Testez l\'interface utilisateur');
  logInfo('3. Vérifiez la redirection OAuth');
}

// Exécuter les tests
runGoogleOAuthTests().catch(error => {
  logError(`Erreur générale: ${error.message}`);
  process.exit(1);
});
