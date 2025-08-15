const axios = require('axios');

async function testInscriptionDetaille() {
  console.log('🔍 TEST INSCRIPTION DÉTAILLÉ');
  console.log('=============================\n');

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
    console.log('📝 Données d\'inscription:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('');

    console.log('🌐 Tentative de connexion au serveur...');
    
    const response = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/register',
      testData,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000,
        validateStatus: function (status) {
          return status < 500; // Accepter les erreurs 4xx pour les voir
        }
      }
    );

    console.log('📊 Réponse reçue:');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data:', JSON.stringify(response.data, null, 2));

    if (response.status === 201 || response.status === 200) {
      console.log('\n✅ INSCRIPTION RÉUSSIE !');
      console.log('Token reçu:', !!response.data.token);
      console.log('Utilisateur créé:', response.data.user?.email);
    } else {
      console.log('\n❌ ERREUR INSCRIPTION:');
      console.log('Code:', response.status);
      console.log('Message:', response.data?.message);
      console.log('Erreurs:', response.data?.errors);
    }

  } catch (error) {
    console.log('\n💥 ERREUR RÉSEAU:');
    console.log('Type:', error.code || 'Unknown');
    console.log('Message:', error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      console.log('Aucune réponse reçue du serveur');
      console.log('Request:', error.request);
    }
  }
}

// Test aussi la connexion pour comparer
async function testConnexion() {
  console.log('\n🔐 TEST CONNEXION POUR COMPARAISON');
  console.log('==================================\n');

  try {
    const loginData = {
      identifier: 'test@example.com',
      password: '123456'
    };

    const response = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/login',
      loginData,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    console.log('✅ Connexion réussie:');
    console.log('Status:', response.status);
    console.log('Token reçu:', !!response.data.token);
  } catch (error) {
    console.log('❌ Erreur connexion:', error.response?.data || error.message);
  }
}

// Exécuter les tests
async function runTests() {
  await testInscriptionDetaille();
  await testConnexion();
  
  console.log('\n🎯 TESTS TERMINÉS');
  console.log('Vérifiez les logs ci-dessus pour identifier le problème exact.');
}

runTests();
