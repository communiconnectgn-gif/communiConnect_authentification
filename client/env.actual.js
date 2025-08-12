// Configuration Google OAuth pour le client CommuniConnect
// Renommez ce fichier en .env et remplissez vos vraies clés

// Configuration OAuth
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
REACT_APP_FACEBOOK_CLIENT_ID=your-facebook-client-id-here

// Configuration API
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ENV=development

// Configuration Firebase (optionnel)
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id

// Instructions pour configurer Google OAuth côté client :
// 1. Assurez-vous que REACT_APP_GOOGLE_CLIENT_ID correspond à votre Client ID Google
// 2. L'URI de redirection sera automatiquement http://localhost:3000/auth/callback
// 3. Redémarrez le client après avoir modifié ce fichier
// 4. Renommez ce fichier en .env
