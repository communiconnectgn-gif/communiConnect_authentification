const axios = require('axios');

console.log('🔧 TEST DES CORRECTIONS FRONTEND');
console.log('=' .repeat(50));

async function testFrontendCorrections() {
  const baseUrl = 'http://localhost:5000';
  
  try {
    console.log('\n🚀 Test des routes corrigées...');
    
    // Test 1: Routes livestreams avec /api
    console.log('\n1️⃣ Test routes livestreams avec /api...');
    
    const livestreamsResponse = await axios.get(`${baseUrl}/api/livestreams`);
    console.log(`✅ /api/livestreams: ${livestreamsResponse.data.data?.length || 0} lives`);
    
    const liveResponse = await axios.get(`${baseUrl}/api/livestreams/live`);
    console.log(`✅ /api/livestreams/live: ${liveResponse.data.data?.length || 0} lives`);
    
    const scheduledResponse = await axios.get(`${baseUrl}/api/livestreams/scheduled`);
    console.log(`✅ /api/livestreams/scheduled: ${scheduledResponse.data.data?.length || 0} lives`);
    
    const alertsResponse = await axios.get(`${baseUrl}/api/livestreams/alerts`);
    console.log(`✅ /api/livestreams/alerts: ${alertsResponse.data.data?.length || 0} alertes`);
    
    // Test 2: Routes friends avec /api
    console.log('\n2️⃣ Test routes friends avec /api...');
    
    const friendsResponse = await axios.get(`${baseUrl}/api/friends`);
    console.log(`✅ /api/friends: ${friendsResponse.data.friends?.length || 0} amis`);
    
    const requestsResponse = await axios.get(`${baseUrl}/api/friends/requests`);
    console.log(`✅ /api/friends/requests: ${requestsResponse.data.requests?.length || 0} demandes`);
    
    // Test 3: Routes auth avec /api
    console.log('\n3️⃣ Test routes auth avec /api...');
    
    const authResponse = await axios.get(`${baseUrl}/api/auth/me`);
    console.log(`✅ /api/auth/me: ${authResponse.data.user?.firstName || 'Non trouvé'}`);
    
    console.log('\n📊 RÉSUMÉ DES CORRECTIONS:');
    console.log('✅ Routes livestreams: /api/livestreams/*');
    console.log('✅ Routes friends: /api/friends/*');
    console.log('✅ Routes auth: /api/auth/*');
    
    console.log('\n💡 PROCHAINES ÉTAPES:');
    console.log('1. Le frontend devrait maintenant fonctionner');
    console.log('2. Plus d\'erreurs 404 sur les routes');
    console.log('3. Les données devraient s\'afficher correctement');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    
    if (error.response?.status === 404) {
      console.log('\n🔧 PROBLÈME: Route non trouvée');
      console.log('Vérifiez que le serveur backend est démarré');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 PROBLÈME: Serveur non accessible');
      console.log('Démarrez le serveur: cd server && npm start');
    }
  }
}

// Attendre un peu que le serveur démarre
setTimeout(() => {
  testFrontendCorrections();
}, 2000); 