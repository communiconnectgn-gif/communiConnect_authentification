// Diagnostic détaillé des routes d'authentification
const axios = require('axios');

async function diagnosticRoutes() {
    console.log('🔍 Diagnostic détaillé des routes d\'authentification\n');
    
    const baseUrl = 'http://localhost:5000';
    
    try {
        // Test 1: Vérifier que le serveur répond
        console.log('1️⃣ Test de base du serveur...');
        const healthResponse = await axios.get(`${baseUrl}/api/health`);
        console.log('✅ Serveur opérationnel:', healthResponse.status);
        
        // Test 2: Vérifier la route racine de l'API
        console.log('\n2️⃣ Test de la route racine de l\'API...');
        try {
            const rootResponse = await axios.get(`${baseUrl}/api`);
            console.log('✅ Route racine API:', rootResponse.status);
        } catch (error) {
            console.log('❌ Route racine API:', error.response?.status || 'Erreur');
        }
        
        // Test 3: Vérifier la route racine d'authentification
        console.log('\n3️⃣ Test de la route racine d\'authentification...');
        try {
            const authRootResponse = await axios.get(`${baseUrl}/api/auth`);
            console.log('✅ Route racine auth:', authRootResponse.status);
            console.log('📋 Contenu:', authRootResponse.data);
        } catch (error) {
            console.log('❌ Route racine auth:', error.response?.status || 'Erreur');
            if (error.response?.data) {
                console.log('📋 Erreur:', error.response.data);
            }
        }
        
        // Test 4: Vérifier les routes spécifiques
        console.log('\n4️⃣ Test des routes spécifiques...');
        const routes = [
            { path: '/api/auth/register', method: 'GET', expected: '405' },
            { path: '/api/auth/login', method: 'GET', expected: '405' },
            { path: '/api/auth/logout', method: 'GET', expected: '405' },
            { path: '/api/auth/me', method: 'GET', expected: '401' },
            { path: '/api/auth/oauth/status', method: 'GET', expected: '200' },
            { path: '/api/auth/oauth/callback', method: 'GET', expected: '405' }
        ];
        
        for (const route of routes) {
            try {
                const response = await axios.get(`${baseUrl}${route.path}`);
                console.log(`✅ ${route.path}: ${response.status} (attendu: ${route.expected})`);
            } catch (error) {
                const status = error.response?.status;
                if (status === parseInt(route.expected)) {
                    console.log(`✅ ${route.path}: ${status} (attendu: ${route.expected})`);
                } else {
                    console.log(`❌ ${route.path}: ${status} (attendu: ${route.expected})`);
                }
            }
        }
        
        // Test 5: Vérifier les routes POST
        console.log('\n5️⃣ Test des routes POST...');
        try {
            const loginResponse = await axios.post(`${baseUrl}/api/auth/login`, {
                identifier: 'test@test.com',
                password: 'test123'
            });
            console.log('✅ POST /api/auth/login:', loginResponse.status);
        } catch (error) {
            const status = error.response?.status;
            if (status === 400 || status === 401) {
                console.log('✅ POST /api/auth/login:', status, '(normal avec données de test)');
            } else {
                console.log('❌ POST /api/auth/login:', status || 'Erreur');
                if (error.response?.data) {
                    console.log('📋 Erreur:', error.response.data);
                }
            }
        }
        
        console.log('\n🎉 Diagnostic terminé !');
        
    } catch (error) {
        console.error('❌ Erreur lors du diagnostic:', error.message);
    }
}

diagnosticRoutes();
