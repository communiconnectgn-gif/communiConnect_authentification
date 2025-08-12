// Test simple de la configuration OAuth
const axios = require('axios');

async function testOAuthSimple() {
  console.log('🔧 Test simple de la configuration OAuth\n');
  
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
    
    console.log('\n🎉 Configuration OAuth testée avec succès !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Configurez vos vraies clés Google OAuth');
    console.log('   2. Testez l\'authentification complète');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.message || 'Pas de message d\'erreur');
    }
    
    console.log('\n🔧 Vérifiez que :');
    console.log('   1. Le serveur est démarré sur le port 5000');
    console.log('   2. Les routes OAuth sont bien configurées');
  }
}

// Lancer le test
testOAuthSimple();
