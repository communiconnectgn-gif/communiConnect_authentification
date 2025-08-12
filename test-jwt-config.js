// Test de la configuration JWT
const axios = require('axios');

async function testJWTConfig() {
    console.log('🔐 Test de la configuration JWT\n');
    
    const baseUrl = 'http://localhost:5000';
    
    try {
        // Test 1: Vérifier la configuration OAuth
        console.log('1️⃣ Configuration OAuth...');
        const oauthResponse = await axios.get(`${baseUrl}/api/auth/oauth/status`);
        console.log('✅ OAuth status:', oauthResponse.status);
        console.log('📋 Configuration:', oauthResponse.data.oauth);
        
        // Test 2: Vérifier la route racine d'authentification
        console.log('\n2️⃣ Route racine d\'authentification...');
        const authRootResponse = await axios.get(`${baseUrl}/api/auth`);
        console.log('✅ Auth root:', authRootResponse.status);
        console.log('📋 Message:', authRootResponse.data.message);
        
        // Test 3: Tester la connexion avec des données valides
        console.log('\n3️⃣ Test de connexion...');
        try {
            const loginResponse = await axios.post(`${baseUrl}/api/auth/login`, {
                identifier: 'test@test.com',
                password: 'test123'
            });
            console.log('✅ Connexion réussie:', loginResponse.status);
        } catch (error) {
            console.log('❌ Erreur de connexion:', error.response?.status);
            if (error.response?.data?.error) {
                console.log('📋 Erreur JWT:', error.response.data.error);
            }
        }
        
        console.log('\n🎉 Test JWT terminé !');
        
    } catch (error) {
        console.error('❌ Erreur lors du test JWT:', error.message);
    }
}

testJWTConfig();
