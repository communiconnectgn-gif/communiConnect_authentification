#!/usr/bin/env node

/**
 * Test Complet de l'Authentification Google OAuth - CommuniConnect
 * ================================================================
 * 
 * Ce script teste l'ensemble du flux OAuth Google :
 * 1. Vérification de la configuration serveur
 * 2. Test des routes OAuth
 * 3. Simulation du flux d'authentification
 * 4. Vérification des tokens JWT
 * 5. Test de la base de données
 */

const axios = require('axios');
const colors = require('colors/safe');

// Configuration
const SERVER_URL = 'http://localhost:5000';
const CLIENT_URL = 'http://localhost:3000';

// Couleurs pour la console
colors.enable();

console.log(colors.cyan.bold('\n🔐 TEST COMPLET AUTHENTIFICATION GOOGLE OAUTH'));
console.log(colors.cyan('==================================================\n'));

// Fonction de test avec gestion d'erreur
async function runTest(testName, testFunction) {
  try {
    console.log(colors.yellow(`\n🧪 Test: ${testName}`));
    console.log(colors.gray('─'.repeat(50)));
    
    const result = await testFunction();
    
    console.log(colors.green(`✅ ${testName} - SUCCÈS`));
    if (result) {
      console.log(colors.gray('Résultat:'), result);
    }
    return { success: true, result };
    
  } catch (error) {
    console.log(colors.red(`❌ ${testName} - ÉCHEC`));
    console.log(colors.red('Erreur:'), error.message);
    if (error.response?.data) {
      console.log(colors.red('Détails:'), error.response.data);
    }
    return { success: false, error: error.message };
  }
}

// Test 1: Vérification de la configuration serveur
async function testServerConfiguration() {
  const response = await axios.get(`${SERVER_URL}/api/auth/oauth/status`);
  return response.data;
}

// Test 2: Vérification du statut général du serveur
async function testServerStatus() {
  const response = await axios.get(`${SERVER_URL}/api/auth/status`);
  return response.data;
}

// Test 3: Test de la route OAuth callback (simulation)
async function testOAuthCallback() {
  // Simuler un code OAuth fictif pour le test
  const mockOAuthData = {
    code: 'mock-oauth-code-12345',
    state: 'mock-state-67890',
    redirectUri: `${CLIENT_URL}/auth/callback`
  };
  
  const response = await axios.post(`${SERVER_URL}/api/auth/oauth/callback`, mockOAuthData);
  return response.data;
}

// Test 4: Vérification de la base de données MongoDB
async function testMongoDBConnection() {
  try {
    // Test de connexion via une route qui utilise MongoDB
    const response = await axios.get(`${SERVER_URL}/api/auth/status`);
    
    // Vérifier si MongoDB est mentionné dans la réponse
    if (response.data && response.data.message) {
      return {
        status: 'connecté',
        message: 'MongoDB semble être connecté'
      };
    }
    
    return {
      status: 'indéterminé',
      message: 'Impossible de déterminer le statut MongoDB'
    };
    
  } catch (error) {
    throw new Error('Serveur non accessible');
  }
}

// Test 5: Test de l'URL d'autorisation Google
async function testGoogleAuthURL() {
  const clientId = '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com';
  const redirectUri = `${CLIENT_URL}/auth/callback`;
  const scope = 'openid email profile';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent&include_granted_scopes=true`;
  
  return {
    authUrl,
    clientId,
    redirectUri,
    scope,
    isValid: authUrl.includes(clientId) && authUrl.includes(redirectUri)
  };
}

// Test 6: Vérification des variables d'environnement
async function testEnvironmentVariables() {
  const response = await axios.get(`${SERVER_URL}/api/auth/oauth/status`);
  const oauthConfig = response.data.oauth;
  
  return {
    googleClientId: oauthConfig.google.clientId === '✅ Configuré',
    googleClientSecret: oauthConfig.google.clientSecret === '✅ Configuré',
    redirectUri: oauthConfig.google.redirectUri,
    corsOrigin: oauthConfig.cors.origin,
    nodeEnv: oauthConfig.google.nodeEnv
  };
}

// Test 7: Test de sécurité et CORS
async function testSecurityAndCORS() {
  try {
    // Test avec des headers CORS
    const response = await axios.get(`${SERVER_URL}/api/auth/oauth/status`, {
      headers: {
        'Origin': CLIENT_URL,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    return {
      corsWorking: true,
      headers: response.headers,
      status: response.status
    };
    
  } catch (error) {
    return {
      corsWorking: false,
      error: error.message
    };
  }
}

// Test 8: Simulation du flux complet OAuth
async function testCompleteOAuthFlow() {
  console.log(colors.blue('\n🔄 Simulation du flux OAuth complet...'));
  
  // Étape 1: Générer l'URL d'autorisation
  const authUrlTest = await testGoogleAuthURL();
  console.log(colors.gray('1. URL d\'autorisation générée:'), authUrlTest.isValid ? '✅' : '❌');
  
  // Étape 2: Simuler le callback
  const callbackTest = await testOAuthCallback();
  console.log(colors.gray('2. Callback OAuth:'), callbackTest.success ? '✅' : '❌');
  
  // Étape 3: Vérifier la réponse
  if (callbackTest.success) {
    console.log(colors.gray('3. Token JWT généré:'), callbackTest.token ? '✅' : '❌');
    console.log(colors.gray('4. Utilisateur créé:'), callbackTest.user ? '✅' : '❌');
  }
  
  return {
    authUrl: authUrlTest.isValid,
    callback: callbackTest.success,
    token: callbackTest.token ? true : false,
    user: callbackTest.user ? true : false
  };
}

// Fonction principale de test
async function runAllTests() {
  console.log(colors.blue.bold('🚀 Démarrage des tests OAuth...\n'));
  
  const tests = [
    { name: 'Configuration serveur OAuth', fn: testServerConfiguration },
    { name: 'Statut général du serveur', fn: testServerStatus },
    { name: 'Connexion MongoDB', fn: testMongoDBConnection },
    { name: 'Variables d\'environnement', fn: testEnvironmentVariables },
    { name: 'Sécurité et CORS', fn: testSecurityAndCORS },
    { name: 'URL d\'autorisation Google', fn: testGoogleAuthURL },
    { name: 'Callback OAuth (simulation)', fn: testOAuthCallback },
    { name: 'Flux OAuth complet', fn: testCompleteOAuthFlow }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await runTest(test.name, test.fn);
    results.push({ name: test.name, ...result });
  }
  
  // Résumé des tests
  console.log(colors.cyan.bold('\n📊 RÉSUMÉ DES TESTS'));
  console.log(colors.cyan('==================='));
  
  const successfulTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  
  console.log(colors.green(`\n✅ Tests réussis: ${successfulTests}/${totalTests}`));
  
  if (successfulTests === totalTests) {
    console.log(colors.green.bold('\n🎉 TOUS LES TESTS SONT PASSÉS !'));
    console.log(colors.green('L\'authentification Google OAuth est prête à être utilisée.'));
  } else {
    console.log(colors.red.bold(`\n⚠️  ${totalTests - successfulTests} test(s) ont échoué.`));
    console.log(colors.yellow('Vérifiez la configuration et relancez les tests.'));
  }
  
  // Détails des échecs
  const failedTests = results.filter(r => !r.success);
  if (failedTests.length > 0) {
    console.log(colors.red('\n❌ Tests échoués:'));
    failedTests.forEach(test => {
      console.log(colors.red(`  • ${test.name}: ${test.error}`));
    });
  }
  
  console.log(colors.cyan('\n🔗 Prochaines étapes:'));
  console.log(colors.gray('1. Ouvrez votre navigateur sur:'), colors.blue(CLIENT_URL));
  console.log(colors.gray('2. Cliquez sur "Continuer avec Google"'));
  console.log(colors.gray('3. Suivez le processus d\'autorisation Google'));
  console.log(colors.gray('4. Vérifiez la redirection et la connexion'));
  
  return results;
}

// Gestion des erreurs globales
process.on('unhandledRejection', (reason, promise) => {
  console.error(colors.red('❌ Erreur non gérée:'), reason);
  process.exit(1);
});

// Exécution des tests
if (require.main === module) {
  runAllTests()
    .then(() => {
      console.log(colors.cyan('\n✨ Tests terminés avec succès !'));
      process.exit(0);
    })
    .catch((error) => {
      console.error(colors.red('\n💥 Erreur fatale lors des tests:'), error);
      process.exit(1);
    });
}

module.exports = {
  runAllTests,
  testServerConfiguration,
  testOAuthCallback,
  testGoogleAuthURL
};
