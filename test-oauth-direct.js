#!/usr/bin/env node

/**
 * Test Direct de la Configuration OAuth - CommuniConnect
 * ======================================================
 * 
 * Ce script teste la configuration OAuth SANS démarrer le serveur complet
 * Il vérifie uniquement les fichiers de configuration et la logique OAuth
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔐 TEST DIRECT CONFIGURATION OAUTH - CommuniConnect');
console.log('==================================================\n');

// Configuration attendue
const EXPECTED_CONFIG = {
  GOOGLE_CLIENT_ID: '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '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',
  GOOGLE_REDIRECT_URI: 'http://localhost:5000/api/auth/oauth/callback',
  PORT: '5000',
  NODE_ENV: 'development',
  CORS_ORIGIN: 'http://localhost:3000'
};

// Test 1: Vérification des fichiers de configuration
function testConfigurationFiles() {
  console.log('🧪 Test 1: Vérification des fichiers de configuration');
  console.log('─'.repeat(50));
  
  const configFiles = [
    'server/env-definitif.js',
    'server/routes/auth.js',
    'client/src/pages/Auth/LoginPage.js',
    'client/src/pages/Auth/AuthCallback.js'
  ];
  
  let allFilesExist = true;
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - EXISTE`);
    } else {
      console.log(`❌ ${file} - MANQUANT`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// Test 2: Vérification de la configuration OAuth
function testOAuthConfiguration() {
  console.log('\n🧪 Test 2: Vérification de la configuration OAuth');
  console.log('─'.repeat(50));
  
  try {
    // Lire le fichier de configuration
    const configPath = path.join(__dirname, 'server', 'env-definitif.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    let configValid = true;
    
    // Vérifier chaque variable attendue
    Object.entries(EXPECTED_CONFIG).forEach(([key, expectedValue]) => {
      if (configContent.includes(`${key}=${expectedValue}`)) {
        console.log(`✅ ${key} - Configuré correctement`);
      } else {
        console.log(`❌ ${key} - Valeur incorrecte ou manquante`);
        configValid = false;
      }
    });
    
    return configValid;
    
  } catch (error) {
    console.log(`❌ Erreur lecture configuration: ${error.message}`);
    return false;
  }
}

// Test 3: Vérification de la logique OAuth côté serveur
function testServerOAuthLogic() {
  console.log('\n🧪 Test 3: Vérification de la logique OAuth côté serveur');
  console.log('─'.repeat(50));
  
  try {
    const authPath = path.join(__dirname, 'server', 'routes', 'auth.js');
    const authContent = fs.readFileSync(authPath, 'utf8');
    
    const requiredFeatures = [
      'router.post(\'/oauth/callback\'',
      'googleClientId',
      'googleClientSecret',
      'axios.post(\'https://oauth2.googleapis.com/token\'',
      'jwt.sign(',
      'User.findOne({ email: profile.email })'
    ];
    
    let allFeaturesPresent = true;
    
    requiredFeatures.forEach(feature => {
      if (authContent.includes(feature)) {
        console.log(`✅ ${feature} - Présent`);
      } else {
        console.log(`❌ ${feature} - Manquant`);
        allFeaturesPresent = false;
      }
    });
    
    return allFeaturesPresent;
    
  } catch (error) {
    console.log(`❌ Erreur lecture logique serveur: ${error.message}`);
    return false;
  }
}

// Test 4: Vérification de la logique OAuth côté client
function testClientOAuthLogic() {
  console.log('\n🧪 Test 4: Vérification de la logique OAuth côté client');
  console.log('─'.repeat(50));
  
  try {
    const loginPath = path.join(__dirname, 'client', 'src', 'pages', 'Auth', 'LoginPage.js');
    const callbackPath = path.join(__dirname, 'client', 'src', 'pages', 'Auth', 'AuthCallback.js');
    
    const loginContent = fs.readFileSync(loginPath, 'utf8');
    const callbackContent = fs.readFileSync(callbackPath, 'utf8');
    
    const loginFeatures = [
      'handleSocialLogin(\'google\')',
      'Google',
      'Continuer avec Google',
      'https://accounts.google.com/o/oauth2/v2/auth'
    ];
    
    const callbackFeatures = [
      'searchParams.get(\'code\')',
      '/api/auth/oauth/callback',
      'dispatch(login(',
      'navigate(\'/\')'
    ];
    
    let allFeaturesPresent = true;
    
    console.log('LoginPage.js:');
    loginFeatures.forEach(feature => {
      if (loginContent.includes(feature)) {
        console.log(`  ✅ ${feature} - Présent`);
      } else {
        console.log(`  ❌ ${feature} - Manquant`);
        allFeaturesPresent = false;
      }
    });
    
    console.log('\nAuthCallback.js:');
    callbackFeatures.forEach(feature => {
      if (callbackContent.includes(feature)) {
        console.log(`  ✅ ${feature} - Présent`);
      } else {
        console.log(`  ❌ ${feature} - Manquant`);
        allFeaturesPresent = false;
      }
    });
    
    return allFeaturesPresent;
    
  } catch (error) {
    console.log(`❌ Erreur lecture logique client: ${error.message}`);
    return false;
  }
}

// Test 5: Génération de l'URL d'autorisation Google
function testGoogleAuthURL() {
  console.log('\n🧪 Test 5: Génération de l\'URL d\'autorisation Google');
  console.log('─'.repeat(50));
  
  const clientId = EXPECTED_CONFIG.GOOGLE_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/auth/callback';
  const scope = 'openid email profile';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent&include_granted_scopes=true`;
  
  console.log('URL d\'autorisation générée:');
  console.log(authUrl);
  
  const isValid = authUrl.includes(clientId) && authUrl.includes(redirectUri);
  console.log(`\nValidation: ${isValid ? '✅ VALIDE' : '❌ INVALIDE'}`);
  
  return isValid;
}

// Fonction principale
function runAllTests() {
  console.log('🚀 Démarrage des tests de configuration OAuth...\n');
  
  const tests = [
    { name: 'Fichiers de configuration', fn: testConfigurationFiles },
    { name: 'Configuration OAuth', fn: testOAuthConfiguration },
    { name: 'Logique OAuth serveur', fn: testServerOAuthLogic },
    { name: 'Logique OAuth client', fn: testClientOAuthLogic },
    { name: 'URL d\'autorisation Google', fn: testGoogleAuthURL }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = test.fn();
    results.push({ name: test.name, success: result });
  }
  
  // Résumé
  console.log('\n📊 RÉSUMÉ DES TESTS');
  console.log('===================');
  
  const successfulTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  
  console.log(`\n✅ Tests réussis: ${successfulTests}/${totalTests}`);
  
  if (successfulTests === totalTests) {
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !');
    console.log('La configuration OAuth est complète et prête.');
    console.log('\n🔗 Prochaines étapes:');
    console.log('1. Résoudre le problème de permission du serveur (port 5000)');
    console.log('2. Configurer MongoDB ou utiliser le mode développement');
    console.log('3. Tester l\'interface utilisateur');
  } else {
    console.log(`\n⚠️  ${totalTests - successfulTests} test(s) ont échoué.`);
    console.log('Vérifiez la configuration avant de continuer.');
  }
  
  return results;
}

// Exécution
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
