const axios = require('axios');

async function diagnosticRechargement() {
  console.log('🔄 DIAGNOSTIC RECHARGEMENT EN BOUCLE');
  console.log('====================================\n');

  try {
    // Test 1: Vérifier le serveur
    console.log('1️⃣ Test du serveur...');
    const healthResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/health');
    console.log('✅ Serveur opérationnel');
    console.log('');

    // Test 2: Vérifier l'authentification
    console.log('2️⃣ Test de l\'authentification...');
    const authResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/auth/status');
    console.log('✅ Service d\'authentification opérationnel');
    console.log('');

    // Test 3: Tester la route /api/auth/me sans token
    console.log('3️⃣ Test de la route /api/auth/me sans token...');
    try {
      const meResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/auth/me');
      console.log('❌ Problème: Route /me accessible sans token');
      console.log('Status:', meResponse.status);
      console.log('Data:', meResponse.data);
    } catch (error) {
      console.log('✅ Route /me correctement protégée');
      console.log('Status:', error.response?.status);
    }
    console.log('');

    // Test 4: Tester avec un token invalide
    console.log('4️⃣ Test avec un token invalide...');
    try {
      const invalidTokenResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/auth/me', {
        headers: { 'Authorization': 'Bearer invalid-token' }
      });
      console.log('❌ Problème: Token invalide accepté');
      console.log('Status:', invalidTokenResponse.status);
    } catch (error) {
      console.log('✅ Token invalide correctement rejeté');
      console.log('Status:', error.response?.status);
    }
    console.log('');

    // Test 5: Créer un utilisateur et tester la connexion
    console.log('5️⃣ Test de création et connexion utilisateur...');
    const testData = {
      email: `test-reload-${Date.now()}@example.com`,
      password: '123456',
      firstName: 'Test',
      lastName: 'Reload',
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

    const registerResponse = await axios.post(
      'https://communiconnect-authentification.onrender.com/api/auth/register',
      testData,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('✅ Utilisateur créé:', registerResponse.data.user?.email);
    const token = registerResponse.data.token;

    // Test 6: Tester la route /me avec un token valide
    console.log('6️⃣ Test de la route /me avec token valide...');
    const meValidResponse = await axios.get('https://communiconnect-authentification.onrender.com/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('✅ Route /me avec token valide:');
    console.log('Status:', meValidResponse.status);
    console.log('User:', meValidResponse.data.user?.email);
    console.log('');

    console.log('🎯 DIAGNOSTIC TERMINÉ');
    console.log('Le serveur semble fonctionner correctement.');
    console.log('Le problème de rechargement vient probablement du frontend.');

  } catch (error) {
    console.log('❌ ERREUR:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

// Exécuter le diagnostic
diagnosticRechargement().then(() => {
  console.log('\n📋 CAUSES POSSIBLES DU RECHARGEMENT:');
  console.log('1. checkAuthStatus() appelé en boucle dans useEffect');
  console.log('2. Redux store qui se met à jour en continu');
  console.log('3. Route protégée qui redirige en boucle');
  console.log('4. localStorage qui change constamment');
  console.log('5. API calls qui échouent et relancent');
});
