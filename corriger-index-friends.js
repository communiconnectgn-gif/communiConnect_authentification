const fs = require('fs');

console.log('🔧 CORRECTION INDEX.JS - ROUTE FRIENDS');
console.log('=======================================');

const indexPath = 'server/index.js';

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  console.log('📄 Ajout de la route friends dans index.js...');
  
  // Vérifier si la route friends est déjà présente
  if (!content.includes('friends')) {
    // Ajouter l'import de la route friends
    if (content.includes('const express = require(\'express\')')) {
      content = content.replace(
        'const express = require(\'express\')',
        'const express = require(\'express\');\nconst friendsRoutes = require(\'./routes/friends\');'
      );
    }
    
    // Ajouter l'utilisation de la route friends
    if (content.includes('app.use(\'/api/')) {
      content = content.replace(
        'app.use(\'/api/',
        'app.use(\'/api/friends\', friendsRoutes);\napp.use(\'/api/'
      );
    }
    
    fs.writeFileSync(indexPath, content);
    console.log('✅ Route friends ajoutée au serveur');
  } else {
    console.log('✅ Route friends déjà présente');
  }
  
  // Vérifier le résultat
  const newContent = fs.readFileSync(indexPath, 'utf8');
  console.log(`   Route friends dans index.js: ${newContent.includes('friends') ? '✅' : '❌'}`);
  
} else {
  console.log('❌ index.js non trouvé');
}

console.log('\n🎯 CORRECTION TERMINÉE');
console.log('=======================');
console.log('💡 Prochaines étapes:');
console.log('1. Redémarrez le serveur: cd server && npm start');
console.log('2. Redémarrez le client: cd client && npm start');
console.log('3. Testez la navigation vers /friends'); 