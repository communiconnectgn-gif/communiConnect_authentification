const http = require('http');

const testData = JSON.stringify({
  code: "test-code-mongodb-123",
  state: "test-state-mongodb",
  redirectUri: "http://localhost:3000/auth/callback"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/oauth/callback',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData),
    'Origin': 'http://localhost:3000'
  }
};

console.log('🧪 Test OAuth avec MongoDB Atlas connecté...');
console.log('📍 URL:', `http://localhost:5000${options.path}`);
console.log('📤 Données:', testData);
console.log('🌐 Origin:', options.headers.Origin);

const req = http.request(options, (res) => {
  console.log(`\n📥 Réponse reçue:`);
  console.log(`   Status: ${res.statusCode} ${res.statusMessage}`);
  console.log(`   Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`\n📋 Contenu de la réponse:`);
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (jsonData.success) {
        console.log('\n✅ SUCCÈS: Authentification OAuth fonctionne !');
        console.log(`   Utilisateur: ${jsonData.user?.firstName} ${jsonData.user?.lastName}`);
        console.log(`   Email: ${jsonData.user?.email}`);
        console.log(`   Token: ${jsonData.token ? 'Présent' : 'Manquant'}`);
        
        // Vérifier si c'est un vrai utilisateur ou un mock
        if (jsonData.user?.email === 'oauth@example.com') {
          console.log('⚠️  Utilisateur mock retourné (MongoDB non connecté)');
        } else {
          console.log('🎉 Vrai utilisateur MongoDB retourné !');
        }
      } else {
        console.log('\n❌ ÉCHEC: Authentification OAuth a échoué');
        console.log(`   Message: ${jsonData.message}`);
      }
    } catch (e) {
      console.log('\n⚠️ Réponse non-JSON reçue:');
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error('\n🚨 Erreur de connexion:', e.message);
  console.log('   Vérifiez que le serveur est démarré sur le port 5000');
});

req.write(testData);
req.end();
console.log('\n⏳ Envoi de la requête...');
