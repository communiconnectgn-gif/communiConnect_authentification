// Test des routes d'authentification
const axios = require('axios');

async function testAuthRoutes() {
    console.log('🔐 Test des routes d\'authentification\n');
    
    const baseUrl = 'http://localhost:5000';
    const routes = [
        '/api/auth/login',
        '/api/auth/register', 
        '/api/auth/me',
        '/api/auth/logout',
        '/api/auth/oauth/status',
        '/api/auth/oauth/callback'
    ];
    
    for (const route of routes) {
        try {
            const response = await axios.get(`${baseUrl}${route}`);
            console.log(`✅ ${route}: ${response.status}`);
        } catch (error) {
            if (error.response?.status === 405) {
                console.log(`✅ ${route}: 405 Method Not Allowed (normal pour GET sur POST routes)`);
            } else {
                console.log(`❌ ${route}: ${error.response?.status || 'Erreur'}`);
            }
        }
    }
    
    console.log('\n🎯 Test des routes POST...');
    
    // Test des routes POST
    try {
        const loginResponse = await axios.post(`${baseUrl}/api/auth/login`, {
            identifier: 'test@test.com',
            password: 'test123'
        });
        console.log('✅ POST /api/auth/login:', loginResponse.status);
    } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 401) {
            console.log('✅ POST /api/auth/login: 400/401 (normal avec données de test)');
        } else {
            console.log('❌ POST /api/auth/login:', error.response?.status || 'Erreur');
        }
    }
    
    console.log('\n🎉 Test des routes terminé !');
}

testAuthRoutes();
