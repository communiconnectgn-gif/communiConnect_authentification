const axios = require('axios');

// Configuration
const API_BASE_URL = 'https://communiconnect-authentification.onrender.com';
const TEST_EMAIL = 'test-diagnostic@example.com';

async function testAuthEndpoints() {
  console.log('🔍 DIAGNOSTIC AUTHENTIFICATION PRODUCTION');
  console.log('==========================================\n');

  try {
    // 1. Test du health check
    console.log('1️⃣ Test du health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // 2. Test du statut d'authentification
    console.log('2️⃣ Test du statut d\'authentification...');
    const authStatusResponse = await axios.get(`${API_BASE_URL}/api/auth/status`);
    console.log('✅ Auth status:', authStatusResponse.data);
    console.log('');

    // 3. Test de l'inscription avec données minimales
    console.log('3️⃣ Test de l\'inscription (données minimales)...');
    const registerData = {
      email: TEST_EMAIL,
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
      const registerResponse = await axios.post(`${API_BASE_URL}/api/auth/register`, registerData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ Inscription réussie:', registerResponse.data);
    } catch (error) {
      console.log('❌ Erreur inscription:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    console.log('');

    // 4. Test de la connexion
    console.log('4️⃣ Test de la connexion...');
    const loginData = {
      identifier: TEST_EMAIL,
      password: '123456'
    };

    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ Connexion réussie:', {
        success: loginResponse.data.success,
        message: loginResponse.data.message,
        hasToken: !!loginResponse.data.token,
        hasUser: !!loginResponse.data.user
      });
      
      // 5. Test du profil avec le token
      if (loginResponse.data.token) {
        console.log('5️⃣ Test du profil utilisateur...');
        const profileResponse = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${loginResponse.data.token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Profil récupéré:', {
          success: profileResponse.data.success,
          hasUser: !!profileResponse.data.user
        });
      }
    } catch (error) {
      console.log('❌ Erreur connexion:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    console.log('');

    // 6. Test OAuth status
    console.log('6️⃣ Test du statut OAuth...');
    try {
      const oauthStatusResponse = await axios.get(`${API_BASE_URL}/api/auth/oauth/status`);
      console.log('✅ OAuth status:', oauthStatusResponse.data);
    } catch (error) {
      console.log('❌ Erreur OAuth status:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter le diagnostic
testAuthEndpoints().then(() => {
  console.log('\n🎯 DIAGNOSTIC TERMINÉ');
  console.log('Vérifiez les logs ci-dessus pour identifier les problèmes.');
});
