// Test de la configuration OAuth avec attente du serveur
const axios = require('axios');

async function waitForServer(baseUrl, maxAttempts = 10) {
  console.log(`⏳ Attente du serveur sur ${baseUrl}...`);
  
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const response = await axios.get(`${baseUrl}/api/health`, { timeout: 2000 });
      if (response.status === 200) {
        console.log(`✅ Serveur prêt après ${i} tentative(s)`);
        return true;
      }
    } catch (error) {
      console.log(`   Tentative ${i}/${maxAttempts}: Serveur pas encore prêt...`);
      if (i < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  console.log('❌ Serveur non accessible après plusieurs tentatives');
  return false;
}

async function testOAuthWithWait() {
  console.log('🔧 Test de la configuration OAuth avec attente du serveur\n');
  
  const baseUrl = 'http://localhost:5001';
  
  // Attendre que le serveur soit prêt
  const serverReady = await waitForServer(baseUrl);
  if (!serverReady) {
    console.log('\n🔧 Vérifiez que :');
    console.log('   1. Le serveur est démarré sur le port 5001');
    console.log('   2. Aucun autre processus n\'utilise le port');
    console.log('   3. Les variables d\'environnement sont correctes');
    return;
  }
  
  try {
    // Test 1: Vérifier le statut du serveur
    console.log('\n1️⃣ Test du statut du serveur...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log('✅ Serveur opérationnel sur le port 5001:', healthResponse.data.message);
    
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
    
    console.log('\n🎉 Configuration OAuth testée avec succès sur le port 5001 !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Configurez vos vraies clés Google OAuth');
    console.log('   2. Résolvez le problème de permission sur le port 5000');
    console.log('   3. Testez l\'authentification complète');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.message || 'Pas de message d\'erreur');
    }
    
    console.log('\n🔧 Vérifiez que :');
    console.log('   1. Le serveur est démarré sur le port 5001');
    console.log('   2. Les routes OAuth sont bien configurées');
    console.log('   3. La configuration CORS est correcte');
  }
}

// Lancer le test
testOAuthWithWait();
