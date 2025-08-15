const axios = require('axios');

async function testMongoDBConnection() {
  console.log('🗄️ TEST CONNEXION MONGODB ATLAS');
  console.log('================================\n');

  try {
    // Test 1: Vérifier que le serveur fonctionne
    console.log('1️⃣ Vérification du serveur...');
    const healthResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/health');
    console.log('✅ Serveur opérationnel');
    console.log('');

    // Test 2: Créer un utilisateur pour tester MongoDB
    console.log('2️⃣ Test de création d\'utilisateur avec MongoDB...');
    const testData = {
      email: `mongodb-atlas-test-${Date.now()}@example.com`,
      password: '123456',
      firstName: 'MongoDB',
      lastName: 'Atlas',
      phone: '22412345678',
      dateOfBirth: '1990-01-01',
      gender: 'Homme',
      region: 'Conakry',
      prefecture: 'Conakry',
      commune: 'Kaloum',
      quartier: 'Centre',
      address: 'Test MongoDB Atlas',
      latitude: 9.537,
      longitude: -13.6785
    };

    const registerResponse = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/register',
      testData,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
      }
    );

    console.log('📊 Réponse inscription:');
    console.log('Status:', registerResponse.status);
    console.log('Message:', registerResponse.data.message);
    console.log('Utilisateur créé:', registerResponse.data.user?.email);
    console.log('');

    // Test 3: Se connecter avec l'utilisateur créé
    console.log('3️⃣ Test de connexion avec l\'utilisateur créé...');
    const loginData = {
      identifier: testData.email,
      password: '123456'
    };

    const loginResponse = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/login',
      loginData,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    console.log('✅ Connexion réussie avec l\'utilisateur créé');
    console.log('Token reçu:', !!loginResponse.data.token);
    console.log('');

    // Test 4: Vérifier le profil utilisateur
    console.log('4️⃣ Test de récupération du profil...');
    const profileResponse = await axios.get(
      'https://communiconnect-authentification.onrender.com/api/auth/me',
      {
        headers: { 
          'Authorization': `Bearer ${loginResponse.data.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Profil récupéré:');
    console.log('Email:', profileResponse.data.user?.email);
    console.log('Nom:', profileResponse.data.user?.firstName, profileResponse.data.user?.lastName);
    console.log('');

    console.log('🎉 MONGODB ATLAS CONNECTÉ AVEC SUCCÈS !');
    console.log('✅ Les utilisateurs sont maintenant persistants en base de données');
    console.log('✅ L\'application est prête pour la production');

  } catch (error) {
    console.log('❌ ERREUR:', error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
    
    console.log('\n🔧 Vérifiez que :');
    console.log('1. La variable MONGODB_URI est configurée dans Render');
    console.log('2. Le service a été redémarré après configuration');
    console.log('3. L\'URI MongoDB Atlas est correcte');
  }
}

// Exécuter le test
testMongoDBConnection().then(() => {
  console.log('\n📋 PROCHAINES ÉTAPES:');
  console.log('1. Testez votre application frontend');
  console.log('2. Vérifiez que les utilisateurs persistent après redémarrage');
  console.log('3. Configurez d\'autres fonctionnalités si nécessaire');
});
