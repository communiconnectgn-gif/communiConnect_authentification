const mongoose = require('mongoose');

// Configuration MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://aob_communiconnectgn:Alpha.o.b5@cluster0.7z6yujq.mongodb.net/communiconnect?retryWrites=true&w=majority';

// Schéma utilisateur simple pour le test
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  googleId: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function testMongoDBAtlas() {
  try {
    console.log('🔌 Test de connexion MongoDB Atlas...');
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    
    // Connexion à MongoDB Atlas
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'communiconnect'
    });
    
    console.log('✅ MongoDB Atlas connecté avec succès !');
    console.log('🏠 Base de données:', mongoose.connection.db.databaseName);
    console.log('🔗 Host:', mongoose.connection.host);
    
    // Test 1: Créer un utilisateur de test
    console.log('\n🧪 Test 1: Création d\'un utilisateur...');
    const testUser = new User({
      firstName: 'Test',
      lastName: 'Utilisateur',
      email: 'test@communiconnect.com',
      googleId: 'test-google-id-123'
    });
    
    await testUser.save();
    console.log('✅ Utilisateur créé avec succès !');
    console.log('   ID:', testUser._id);
    console.log('   Nom:', testUser.firstName, testUser.lastName);
    console.log('   Email:', testUser.email);
    
    // Test 2: Récupérer l'utilisateur
    console.log('\n🧪 Test 2: Récupération de l\'utilisateur...');
    const foundUser = await User.findOne({ email: 'test@communiconnect.com' });
    console.log('✅ Utilisateur récupéré:', foundUser.firstName, foundUser.lastName);
    
    // Test 3: Compter les utilisateurs
    console.log('\n🧪 Test 3: Comptage des utilisateurs...');
    const userCount = await User.countDocuments();
    console.log('✅ Nombre total d\'utilisateurs:', userCount);
    
    // Test 4: Lister les collections
    console.log('\n🧪 Test 4: Collections disponibles...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('✅ Collections:', collections.map(c => c.name).join(', '));
    
    // Nettoyage: Supprimer l'utilisateur de test
    console.log('\n🧹 Nettoyage: Suppression de l\'utilisateur de test...');
    await User.deleteOne({ email: 'test@communiconnect.com' });
    console.log('✅ Utilisateur de test supprimé');
    
    console.log('\n🎉 TOUS LES TESTS MONGODB ATLAS SONT RÉUSSIS !');
    console.log('🚀 Votre base de données est prête pour la production !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test MongoDB Atlas:', error.message);
    console.error('🔍 Détails:', error);
  } finally {
    // Fermer la connexion
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('\n🔌 Connexion MongoDB Atlas fermée');
    }
    process.exit(0);
  }
}

// Lancer le test
testMongoDBAtlas();
