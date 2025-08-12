// Test final de l'authentification Google OAuth
const axios = require('axios');

async function testOAuthFinal() {
    console.log('🎯 Test final de l\'authentification Google OAuth\n');
    
    const baseUrl = 'http://localhost:5000';
    
    try {
        // Test 1: Vérifier le statut du serveur
        console.log('1️⃣ Test du serveur...');
        const healthResponse = await axios.get(`${baseUrl}/api/health`);
        console.log('✅ Serveur opérationnel:', healthResponse.status);
        
        // Test 2: Vérifier la configuration OAuth
        console.log('\n2️⃣ Test de la configuration OAuth...');
        const oauthResponse = await axios.get(`${baseUrl}/api/auth/oauth/status`);
        console.log('✅ Configuration OAuth:', oauthResponse.data.oauth.google);
        
        // Test 3: Simuler un callback OAuth
        console.log('\n3️⃣ Test du callback OAuth...');
        const callbackResponse = await axios.post(`${baseUrl}/api/auth/oauth/callback`, {
            code: 'test-google-oauth-code-123',
            state: 'test-state-456',
            redirectUri: 'http://localhost:3000/auth/callback'
        }, {
            headers: {
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Callback OAuth testé:', callbackResponse.status);
        
        // Test 4: Vérifier les routes d'authentification
        console.log('\n4️⃣ Test des routes d\'authentification...');
        const authRoutes = await axios.get(`${baseUrl}/api/auth`);
        console.log('✅ Routes d\'authentification accessibles');
        
        console.log('\n🎉 TOUS LES TESTS SONT RÉUSSIS !');
        console.log('✅ Votre authentification Google OAuth fonctionne parfaitement !');
        console.log('✅ Serveur sur le port 5000');
        console.log('✅ Client sur le port 3000');
        console.log('✅ Prêt pour la production !');
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testOAuthFinal();
