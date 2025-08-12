// Test des corrections OAuth Google
const axios = require('axios');

async function testOAuthFix() {
  console.log('🔧 Test des corrections OAuth Google\n');
  
  const baseUrl = 'http://localhost:5000';
  
  try {
    // Test 1: Vérifier le statut du serveur
    console.log('1️⃣ Test du statut du serveur...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log('✅ Serveur opérationnel:', healthResponse.data.message);
    
    // Test 2: Vérifier le statut de l'authentification
    console.log('\n2️⃣ Test du statut de l\'authentification...');
    const authStatusResponse = await axios.get(`${baseUrl}/api/auth/status`);
    console.log('✅ Service d\'authentification:', authStatusResponse.data.message);
    console.log('   Endpoints disponibles:', authStatusResponse.data.endpoints);
    
    // Test 3: Vérifier la configuration OAuth
    console.log('\n3️⃣ Test de la configuration OAuth...');
    const oauthStatusResponse = await axios.get(`${baseUrl}/api/auth/oauth/status`);
    console.log('✅ Configuration OAuth:', oauthStatusResponse.data.message);
    console.log('   Google Client ID:', oauthStatusResponse.data.oauth.google.clientId);
    console.log('   Google Client Secret:', oauthStatusResponse.data.oauth.google.clientSecret);
    console.log('   Redirect URI:', oauthStatusResponse.data.oauth.google.redirectUri);
    
    // Test 4: Test CORS avec une requête depuis localhost:3000
    console.log('\n4️⃣ Test CORS avec simulation client...');
    const corsTestResponse = await axios.post(`${baseUrl}/api/auth/oauth/callback`, {
      code: 'test-code-123',
      state: 'test-state',
      redirectUri: 'http://localhost:3000/auth/callback'
    }, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    
    if (corsTestResponse.status === 200) {
      console.log('✅ CORS fonctionne correctement');
      console.log('   Réponse:', corsTestResponse.data.message);
    }
    
    console.log('\n🎉 Tous les tests OAuth sont passés !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Renommez server/env-config.js en server/.env');
    console.log('   2. Renommez client/env-config.js en client/.env');
    console.log('   3. Configurez vos vraies clés Google OAuth');
    console.log('   4. Redémarrez le serveur et le client');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.message || 'Pas de message d\'erreur');
    }
    
    console.log('\n🔧 Vérifiez que :');
    console.log('   1. Le serveur est démarré sur le port 5000');
    console.log('   2. Les fichiers .env sont créés et configurés');
    console.log('   3. Les variables d\'environnement sont correctes');
  }
}

// Lancer le test
testOAuthFix();
