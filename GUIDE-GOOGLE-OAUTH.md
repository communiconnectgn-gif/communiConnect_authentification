# 🚀 Guide de Configuration Google OAuth pour CommuniConnect

## 📋 Vue d'ensemble

L'authentification Google OAuth est déjà implémentée dans CommuniConnect ! Ce guide vous explique comment la configurer et l'activer.

## ✅ Ce qui est déjà fait

- ✅ Backend OAuth complet (`/api/auth/oauth/callback`)
- ✅ Interface utilisateur avec bouton Google
- ✅ Page de callback OAuth
- ✅ Gestion des tokens JWT
- ✅ Création automatique d'utilisateurs
- ✅ Support des profils Google

## 🔧 Configuration requise

### 1. Créer un projet Google Cloud

1. **Allez sur [Google Cloud Console](https://console.cloud.google.com/)**
2. **Créez un nouveau projet** ou sélectionnez un existant
3. **Activez l'API Google+ API** :
   - Menu → APIs & Services → Library
   - Recherchez "Google+ API" et activez-la

### 2. Configurer OAuth 2.0

1. **Allez dans "Identifiants"** :
   - Menu → APIs & Services → Credentials
2. **Cliquez sur "Créer des identifiants"** → "ID client OAuth 2.0"
3. **Configurez l'application** :
   - Type d'application : Application Web
   - Nom : CommuniConnect
   - URIs de redirection autorisés :
     ```
     http://localhost:3000/auth/callback
     http://localhost:5000/api/auth/oauth/callback
     ```
4. **Cliquez sur "Créer"**
5. **Notez vos identifiants** :
   - Client ID
   - Client Secret

### 3. Configurer les variables d'environnement

#### Serveur (dossier `server/`)

1. **Créez un fichier `.env`** dans le dossier `server/`
2. **Ajoutez ces variables** :

```env
# Google OAuth 2.0
GOOGLE_CLIENT_ID=votre-client-id-ici
GOOGLE_CLIENT_SECRET=votre-client-secret-ici
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/oauth/callback

# Autres variables nécessaires
JWT_SECRET=votre-jwt-secret-ici
NODE_ENV=development
PORT=5000
```

#### Client (dossier `client/`)

1. **Créez un fichier `.env`** dans le dossier `client/`
2. **Ajoutez ces variables** :

```env
# Google OAuth 2.0
REACT_APP_GOOGLE_CLIENT_ID=votre-client-id-ici

# Configuration API
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 🧪 Test de la configuration

### 1. Démarrer le serveur

```bash
cd server
npm install
npm run dev
```

### 2. Démarrer le client

```bash
cd client
npm install
npm start
```

### 3. Tester l'authentification

1. **Ouvrez** `http://localhost:3000`
2. **Cliquez sur "Continuer avec Google"**
3. **Autorisez l'application** dans Google
4. **Vérifiez la redirection** vers `/auth/callback`
5. **Vérifiez la connexion** réussie

### 4. Test automatisé

```bash
# Dans le dossier racine
node test-google-oauth-config.js
```

## 🔍 Dépannage

### Erreur "OAuth non configuré"

**Cause** : Variables d'environnement manquantes
**Solution** : Vérifiez que `.env` contient `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`

### Erreur "redirect_uri_mismatch"

**Cause** : URI de redirection non autorisé dans Google Cloud
**Solution** : Ajoutez l'URI exact dans Google Cloud Console

### Erreur "invalid_client"

**Cause** : Client ID ou Client Secret incorrect
**Solution** : Vérifiez vos identifiants Google OAuth

### Erreur CORS

**Cause** : Configuration CORS incorrecte
**Solution** : Vérifiez `CORS_ORIGIN` dans le serveur

## 📱 Utilisation en production

### 1. Variables de production

```env
NODE_ENV=production
GOOGLE_CLIENT_ID=votre-client-id-production
GOOGLE_CLIENT_SECRET=votre-client-secret-production
GOOGLE_REDIRECT_URI=https://votre-domaine.com/api/auth/oauth/callback
```

### 2. URIs de redirection de production

Dans Google Cloud Console, ajoutez :
```
https://votre-domaine.com/auth/callback
https://votre-domaine.com/api/auth/oauth/callback
```

### 3. Sécurité

- ✅ Changez `JWT_SECRET` en production
- ✅ Utilisez HTTPS
- ✅ Configurez les rate limits
- ✅ Activez la validation des tokens

## 🎯 Fonctionnalités OAuth

### Scopes supportés
- `openid` : Identité OpenID Connect
- `email` : Adresse email
- `profile` : Informations du profil

### Données utilisateur récupérées
- Prénom et nom
- Email (vérifié automatiquement)
- Photo de profil
- ID Google unique

### Création automatique d'utilisateur
- Utilisateur créé automatiquement lors de la première connexion
- Profil pré-rempli avec les données Google
- Statut "vérifié" automatiquement

## 🔗 Liens utiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [Documentation OAuth 2.0 Google](https://developers.google.com/identity/protocols/oauth2)
- [OpenID Connect Google](https://developers.google.com/identity/protocols/openid-connect)

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur
2. Testez avec le script de test
3. Vérifiez la configuration Google Cloud
4. Consultez la documentation Google OAuth

---

**🎉 Félicitations !** Votre authentification Google OAuth est maintenant configurée et prête à être utilisée dans CommuniConnect.
