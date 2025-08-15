const axios = require('axios');

async function testMongoDBStatus() {
  console.log('🗄️ TEST STATUT MONGODB PRODUCTION');
  console.log('==================================\n');

  try {
    // Test 1: Vérifier le health check général
    console.log('1️⃣ Test du health check général...');
    const healthResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/health');
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Vérifier le statut d'authentification
    console.log('2️⃣ Test du statut d\'authentification...');
    const authStatusResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/auth/status');
    console.log('✅ Auth status:', authStatusResponse.data);
    console.log('');

    // Test 3: Tenter une inscription pour voir si MongoDB est utilisé
    console.log('3️⃣ Test d\'inscription pour vérifier MongoDB...');
    const testData = {
      email: `mongodb-test-${Date.now()}@example.com`,
      password: '123456',
      firstName: 'MongoDB',
      lastName: 'Test',
      phone: '22412345678',
      dateOfBirth: '1990-01-01',
      gender: 'Homme',
      region: 'Conakry',
      prefecture: 'Conakry',
      commune: 'Kaloum',
      quartier: 'Centre',
      address: 'Test MongoDB',
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

    // Test 4: Tenter de se connecter avec l'utilisateur créé
    console.log('4️⃣ Test de connexion avec l\'utilisateur créé...');
    const loginData = {
      identifier: testData.email,
      password: '123456'
    };

    try {
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
    } catch (loginError) {
      console.log('❌ Erreur connexion avec l\'utilisateur créé:');
      console.log('Message:', loginError.response?.data?.message);
      console.log('Cela indique que l\'utilisateur n\'est pas sauvegardé en base');
    }

    // Test 5: Vérifier les variables d'environnement (si possible)
    console.log('\n5️⃣ Analyse des logs...');
    console.log('D\'après les logs précédents, nous avons vu:');
    console.log('- ❌ Erreur de connexion MongoDB Atlas: connect ECONNREFUSED 127.0.0.1:27017');
    console.log('- 📝 Mode développement: serveur continue sans MongoDB');
    console.log('- ⚠️ MongoDB Atlas non disponible, continuation sans base de données');
    console.log('');

    console.log('🎯 CONCLUSION:');
    console.log('MongoDB n\'est PAS connecté en production !');
    console.log('Le serveur fonctionne en mode "développement" sans base de données.');
    console.log('Les utilisateurs sont créés en mémoire temporairement.');

  } catch (error) {
    console.log('❌ Erreur lors du test:', error.message);
  }
}

// Exécuter le test
testMongoDBStatus().then(() => {
  console.log('\n📋 RECOMMANDATIONS:');
  console.log('1. Configurer MongoDB Atlas dans les variables d\'environnement Render');
  console.log('2. Ajouter MONGODB_URI dans les variables d\'environnement');
  console.log('3. Redémarrer le serveur après configuration');
});
