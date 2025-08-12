const http = require('http');
const mongoose = require('mongoose');

// Configuration MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://aob_communiconnectgn:Alpha.o.b5@cluster0.7z6yujq.mongodb.net/communiconnect?retryWrites=true&w=majority';

// Schéma utilisateur pour vérifier la base de données
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  googleId: String,
  profilePicture: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function testOAuthWithMongoDB() {
  try {
    console.log('🔌 Connexion à MongoDB Atlas pour vérification...');
    
    // Connexion à MongoDB Atlas
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'communiconnect'
    });
    
    console.log('✅ MongoDB Atlas connecté !');
    
    // Vérifier les utilisateurs existants
    const existingUsers = await User.find().limit(5);
    console.log(`📊 Utilisateurs existants: ${existingUsers.length}`);
    
    if (existingUsers.length > 0) {
      console.log('👥 Derniers utilisateurs:');
      existingUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
      });
    }
    
    // Fermer la connexion MongoDB
    await mongoose.disconnect();
    console.log('🔌 Connexion MongoDB fermée\n');
    
    // Test OAuth avec le serveur
    console.log('🧪 Test OAuth Google avec MongoDB Atlas...');
    
    const testData = JSON.stringify({
      code: "test-oauth-mongodb-123",
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
    
    console.log('📍 URL:', `http://localhost:5000${options.path}`);
    console.log('📤 Données de test:', testData);
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
              console.log('🚀 OAuth + MongoDB Atlas fonctionnent parfaitement !');
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
    console.log('\n⏳ Envoi de la requête OAuth...');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

// Lancer le test
testOAuthWithMongoDB();
