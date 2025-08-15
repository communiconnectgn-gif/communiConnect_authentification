const axios = require('axios');

async function testInscription() {
  console.log('🧪 TEST INSCRIPTION RAPIDE');
  console.log('==========================\n');

  const testData = {
    email: `test-${Date.now()}@example.com`,
    password: '123456',
    firstName: 'Test',
    lastName: 'User',
    phone: '22412345678',
    dateOfBirth: '1990-01-01',
    gender: 'Homme',
    region: 'Conakry',
    prefecture: 'Conakry',
    commune: 'Kaloum',
    quartier: 'Centre',
    address: 'Test Address',
    latitude: 9.537,
    longitude: -13.6785
  };

  try {
    console.log('📝 Tentative d\'inscription...');
    console.log('Email:', testData.email);
    
    const response = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/register',
      testData,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    console.log('✅ INSCRIPTION RÉUSSIE !');
    console.log('Token reçu:', !!response.data.token);
    console.log('Utilisateur créé:', response.data.user.email);
    
    return response.data.token;
  } catch (error) {
    console.log('❌ ERREUR INSCRIPTION:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data?.message);
    console.log('Erreur:', error.response?.data?.error);
    return null;
  }
}

// Exécuter le test
testInscription().then((token) => {
  if (token) {
    console.log('\n🎉 L\'inscription fonctionne maintenant !');
  } else {
    console.log('\n🔧 Il faut encore corriger le problème.');
  }
});
