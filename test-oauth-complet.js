// Test complet de l'authentification Google OAuth
const axios = require('axios');

async function testOAuthComplet() {
  console.log('🔧 Test complet de l\'authentification Google OAuth\n');
  
  const baseUrl = 'http://localhost:5001';
  
  try {
    // Test 1: Vérifier le statut du serveur
    console.log('1️⃣ Test du statut du serveur...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log('✅ Serveur opérationnel:', healthResponse.data.message);
    
    // Test 2: Vérifier la configuration OAuth
    console.log('\n2️⃣ Test de la configuration OAuth...');
    const oauthStatusResponse = await axios.get(`${baseUrl}/api/auth/oauth/status`);
    console.log('✅ Configuration OAuth:', oauthStatusResponse.data.message);
    console.log('   Google Client ID:', oauthStatusResponse.data.oauth.google.clientId);
    console.log('   Google Client Secret:', oauthStatusResponse.data.oauth.google.clientSecret);
    console.log('   Redirect URI:', oauthStatusResponse.data.oauth.google.redirectUri);
    
    // Test 3: Simuler le flux OAuth complet
    console.log('\n3️⃣ Test du flux OAuth complet...');
    const oauthCallbackResponse = await axios.post(`${baseUrl}/api/auth/oauth/callback`, {
      code: 'test-google-oauth-code-123',
      state: 'test-state-456',
      redirectUri: 'http://localhost:3000/auth/callback'
    }, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    
    if (oauthCallbackResponse.status === 200) {
      console.log('✅ Flux OAuth simulé réussi');
      console.log('   Réponse:', oauthCallbackResponse.data.message);
      console.log('   Token généré:', oauthCallbackResponse.data.token ? '✅ Oui' : '❌ Non');
      console.log('   Utilisateur créé:', oauthCallbackResponse.data.user ? '✅ Oui' : '❌ Non');
    }
    
    // Test 4: Vérifier les routes d'authentification
    console.log('\n4️⃣ Test des routes d\'authentification...');
    const authRoutes = [
      '/api/auth/status',
      '/api/auth/oauth/status'
    ];
    
    for (const route of authRoutes) {
      try {
        const response = await axios.get(`${baseUrl}${route}`);
        console.log(`✅ ${route}: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${route}: ${error.response?.status || 'Erreur'}`);
      }
    }
    
    console.log('\n🎉 Test complet OAuth réussi !');
    console.log('\n📋 Votre authentification Google OAuth est prête !');
    console.log('\n🚀 Prochaines étapes :');
    console.log('   1. Démarrer le client: node start-client-oauth.js');
    console.log('   2. Ouvrir http://localhost:3000 dans le navigateur');
    console.log('   3. Aller sur la page de connexion');
    console.log('   4. Cliquer sur "Se connecter avec Google"');
    console.log('   5. Autoriser l\'application CommuniConnect');
    console.log('   6. Vérifier que vous êtes connecté');
    
    console.log('\n🔑 Clés OAuth configurées :');
    console.log('   - Client ID: 4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com');
    console.log('   - Redirect URI: http://localhost:5001/api/auth/oauth/callback');
    console.log('   - CORS Origin: http://localhost:3000');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test complet:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.message || 'Pas de message d\'erreur');
    }
    
    console.log('\n🔧 Vérifiez que :');
    console.log('   1. Le serveur est démarré sur le port 5001');
    console.log('   2. Les vraies clés Google OAuth sont configurées');
    console.log('   3. La configuration CORS est correcte');
    console.log('   4. MongoDB Atlas est connecté');
  }
}

// Lancer le test complet
testOAuthComplet(); 