# 🚀 Configuration Rapide Google OAuth - CommuniConnect

## 📋 État Actuel

✅ **Backend OAuth complet** - Implémenté et testé  
✅ **Interface utilisateur** - Bouton Google dans la page de connexion  
✅ **Page de callback** - Gestion des retours OAuth  
✅ **Tests automatisés** - Tous les tests passent  
⚠️ **Configuration manquante** - Clés Google OAuth à configurer  

## 🔧 Activation en 5 étapes

### 1. Créer un projet Google Cloud
- Allez sur [Google Cloud Console](https://console.cloud.google.com/)
- Créez un nouveau projet ou sélectionnez un existant
- Activez l'API Google+ API

### 2. Configurer OAuth 2.0
- Menu → APIs & Services → Credentials
- "Créer des identifiants" → "ID client OAuth 2.0"
- Type : Application Web
- Nom : CommuniConnect
- URIs de redirection autorisés :
  ```
  http://localhost:3000/auth/callback
  http://localhost:5000/api/auth/oauth/callback
  ```

### 3. Configurer le serveur
```bash
cd server
# Copiez env.actual.js vers .env
cp env.actual.js .env
# Éditez .env avec vos vraies clés Google
```

### 4. Configurer le client
```bash
cd client
# Copiez env.actual.js vers .env
cp env.actual.js .env
# Éditez .env avec votre Client ID Google
```

### 5. Redémarrer les services
```bash
# Serveur
cd server && npm run dev

# Client (nouveau terminal)
cd client && npm start
```

## 🧪 Test de la configuration

```bash
# Test automatisé
node test-google-oauth-config.js

# Test manuel
# 1. Ouvrez http://localhost:3000
# 2. Cliquez sur "Continuer avec Google"
# 3. Autorisez l'application
# 4. Vérifiez la redirection réussie
```

## 🔑 Variables d'environnement requises

### Serveur (.env)
```env
GOOGLE_CLIENT_ID=votre-client-id-ici
GOOGLE_CLIENT_SECRET=votre-client-secret-ici
JWT_SECRET=votre-jwt-secret-ici
```

### Client (.env)
```env
REACT_APP_GOOGLE_CLIENT_ID=votre-client-id-ici
```

## 🎯 Fonctionnalités disponibles

- ✅ Connexion avec Google
- ✅ Création automatique d'utilisateur
- ✅ Profil pré-rempli (nom, email, photo)
- ✅ Statut vérifié automatiquement
- ✅ Token JWT sécurisé
- ✅ Redirection automatique

## 🚨 Dépannage

### Erreur "OAuth non configuré"
- Vérifiez que `.env` existe dans `server/`
- Vérifiez que `GOOGLE_CLIENT_ID` est défini

### Erreur "redirect_uri_mismatch"
- Vérifiez les URIs dans Google Cloud Console
- Assurez-vous que les ports correspondent

### Erreur CORS
- Vérifiez que le serveur et le client sont sur les bons ports
- Vérifiez `CORS_ORIGIN` dans le serveur

## 📱 Utilisation

1. **Démarrez les services** (serveur + client)
2. **Ouvrez** http://localhost:3000
3. **Cliquez** sur "Continuer avec Google"
4. **Autorisez** l'application dans Google
5. **Profitez** de votre connexion automatique !

---

**🎉 Votre authentification Google OAuth est prête !**  
Il suffit de configurer vos vraies clés Google pour l'activer.
