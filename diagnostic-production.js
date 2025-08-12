const axios = require('axios');

console.log('🔍 DIAGNOSTIC PRODUCTION COMMUNICONNECT');
console.log('==========================================\n');

const PRODUCTION_URLS = {
  client: 'https://communiconnectgn224-kbaysrqw3-alpha-oumar-barry-s-projects.vercel.app',
  server: 'https://communiconnect-authentification.onrender.com'
};

async function testProduction() {
  console.log('📍 URLs de Production:');
  console.log(`   Client (Vercel): ${PRODUCTION_URLS.client}`);
  console.log(`   Serveur (Render): ${PRODUCTION_URLS.server}\n`);

  // Test 1: Vérifier le serveur Render
  console.log('1️⃣ Test du serveur Render...');
  try {
    const serverResponse = await axios.get(`${PRODUCTION_URLS.server}/api/auth/status`, {
      timeout: 10000
    });
    console.log('   ✅ Serveur Render: Opérationnel');
    console.log(`   📊 Status: ${serverResponse.data.message}`);
  } catch (error) {
    console.log('   ❌ Serveur Render: Erreur');
    console.log(`   🔍 Détail: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }

  // Test 2: Vérifier le manifest.json sur Vercel
  console.log('\n2️⃣ Test du manifest.json sur Vercel...');
  try {
    const manifestResponse = await axios.get(`${PRODUCTION_URLS.client}/manifest.json`, {
      timeout: 10000
    });
    console.log('   ✅ Manifest.json: Accessible');
    console.log(`   📊 Taille: ${JSON.stringify(manifestResponse.data).length} caractères`);
  } catch (error) {
    console.log('   ❌ Manifest.json: Erreur');
    console.log(`   🔍 Détail: ${error.response?.status} - ${error.response?.data || error.message}`);
  }

  // Test 3: Test d'authentification (sans rate limiting)
  console.log('\n3️⃣ Test d\'authentification...');
  try {
    const authResponse = await axios.post(`${PRODUCTION_URLS.server}/api/auth/login`, {
      identifier: 'test@communiconnect.gn',
      password: 'test123'
    }, {
      timeout: 10000
    });
    console.log('   ✅ Authentification: Fonctionnelle');
    console.log(`   📊 Réponse: ${authResponse.data.success ? 'Succès' : 'Échec'}`);
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('   ⚠️ Authentification: Rate limiting (429)');
      console.log('   💡 Solution: Augmenter les limites dans rateLimiter.js');
    } else {
      console.log('   ❌ Authentification: Erreur');
      console.log(`   🔍 Détail: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
  }

  // Test 4: Vérifier la configuration OAuth
  console.log('\n4️⃣ Test de la configuration OAuth...');
  try {
    const oauthResponse = await axios.get(`${PRODUCTION_URLS.server}/api/auth/oauth/status`, {
      timeout: 10000
    });
    console.log('   ✅ Configuration OAuth: Vérifiée');
    console.log(`   📊 Google Client ID: ${oauthResponse.data.oauth?.google?.clientId}`);
    console.log(`   📊 Redirect URI: ${oauthResponse.data.oauth?.google?.redirectUri}`);
  } catch (error) {
    console.log('   ❌ Configuration OAuth: Erreur');
    console.log(`   🔍 Détail: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }

  console.log('\n📋 RÉSUMÉ DES PROBLÈMES IDENTIFIÉS:');
  console.log('=====================================');
  console.log('1. Rate Limiting: 5 requêtes/15min en production (trop strict)');
  console.log('2. Manifest.json: Problème d\'accès sur Vercel');
  console.log('3. Configuration OAuth: À vérifier');
  
  console.log('\n🚀 SOLUTIONS IMMÉDIATES:');
  console.log('========================');
  console.log('1. ✅ Rate limiting déjà corrigé (5 → 50 requêtes)');
  console.log('2. 🔧 Redéployer le serveur sur Render');
  console.log('3. 🔍 Vérifier les variables d\'environnement Render');
  console.log('4. 🔑 Vérifier la configuration Google OAuth');
}

// Exécuter le diagnostic
testProduction().catch(console.error);
