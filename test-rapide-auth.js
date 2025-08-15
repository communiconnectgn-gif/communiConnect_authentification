const axios = require('axios');

console.log('🧪 TEST RAPIDE AUTHENTIFICATION');
console.log('================================\n');

const SERVER_URL = 'https://communiconnect-authentification.onrender.com';

async function testAuth() {
  console.log('📍 Test du serveur Render...');
  
  try {
    // Test 1: Endpoint de base
    console.log('1️⃣ Test endpoint de base...');
    const baseResponse = await axios.get(`${SERVER_URL}/api/auth/status`, {
      timeout: 5000
    });
    console.log('   ✅ Serveur répond:', baseResponse.data.message);
    
    // Test 2: Test de création de compte
    console.log('\n2️⃣ Test création de compte...');
    const testUser = {
      email: `test${Date.now()}@communiconnect.gn`,
      password: 'test123456',
      firstName: 'Test',
      lastName: 'User',
      phone: '22412345678',
      region: 'Conakry',
      prefecture: 'Conakry',
      commune: 'Kaloum',
      quartier: 'Centre',
      address: '123 Rue Test',
      latitude: 9.5370,
      longitude: -13.6785
    };
    
    const registerResponse = await axios.post(`${SERVER_URL}/api/auth/register`, testUser, {
      timeout: 10000
    });
    
    if (registerResponse.data.success) {
      console.log('   ✅ Création de compte: Succès');
      console.log(`   📊 User ID: ${registerResponse.data.user._id}`);
    } else {
      console.log('   ⚠️ Création de compte: Échec');
      console.log(`   📊 Message: ${registerResponse.data.message}`);
    }
    
    console.log('\n🎉 Tests terminés - Serveur opérationnel !');
    
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('   ❌ Rate limiting toujours actif (429)');
      console.log('   💡 Le serveur n\'a pas encore redémarré avec les corrections');
      console.log('   🚨 Forcez un redéploiement manuel sur Render');
    } else if (error.code === 'ECONNABORTED') {
      console.log('   ❌ Timeout - Serveur trop lent ou inaccessible');
    } else {
      console.log('   ❌ Erreur:', error.response?.status, error.response?.data?.message || error.message);
    }
  }
}

testAuth();
