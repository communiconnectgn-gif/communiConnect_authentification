# 🚀 Guide Complet Google OAuth pour CommuniConnect

## 📋 Prérequis
- Un compte Google
- Accès à Google Cloud Console

## 🔧 Étape 1 : Créer un projet Google Cloud

### 1.1 Aller sur Google Cloud Console
- Ouvrez [Google Cloud Console](https://console.cloud.google.com/)
- Connectez-vous avec votre compte Google

### 1.2 Créer un nouveau projet
- Cliquez sur le sélecteur de projet en haut
- Cliquez sur "Nouveau projet"
- Nom du projet : `CommuniConnect-OAuth`
- Cliquez sur "Créer"

### 1.3 Sélectionner le projet
- Sélectionnez le projet `CommuniConnect-OAuth` dans le sélecteur

## 🔑 Étape 2 : Activer l'API Google+ API

### 2.1 Aller dans les APIs
- Dans le menu de gauche, cliquez sur "APIs et services" > "Bibliothèque"

### 2.2 Rechercher et activer Google+ API
- Recherchez "Google+ API"
- Cliquez sur "Google+ API"
- Cliquez sur "Activer"

## 🎯 Étape 3 : Créer les identifiants OAuth 2.0

### 3.1 Aller dans les identifiants
- Dans le menu de gauche, cliquez sur "APIs et services" > "Identifiants"

### 3.2 Créer un ID client OAuth 2.0
- Cliquez sur "Créer des identifiants" > "ID client OAuth 2.0"
- Si c'est la première fois, configurez l'écran de consentement OAuth

### 3.3 Configurer l'écran de consentement OAuth
- Type d'utilisateur : "Externe"
- Nom de l'application : "CommuniConnect"
- Adresse e-mail de support : votre email
- Adresse e-mail de contact développeur : votre email
- Cliquez sur "Enregistrer et continuer"
- Scopes : laissez par défaut, cliquez sur "Enregistrer et continuer"
- Utilisateurs de test : ajoutez votre email, cliquez sur "Enregistrer et continuer"
- Cliquez sur "Retour au tableau de bord"

### 3.4 Créer l'ID client
- Type d'application : "Application Web"
- Nom : "CommuniConnect Web Client"
- URIs de redirection autorisés :
  ```
  http://localhost:3000/auth/callback
  http://localhost:5001/api/auth/oauth/callback
  ```
- Cliquez sur "Créer"

### 3.5 Récupérer les clés
- **Client ID** : Copiez cette valeur
- **Client Secret** : Cliquez sur "Afficher" et copiez cette valeur

## ⚙️ Étape 4 : Configurer CommuniConnect

### 4.1 Configuration côté serveur
- Ouvrez `server/.env-temp`
- Remplacez :
  ```
  GOOGLE_CLIENT_ID=votre-vrai-client-id
  GOOGLE_CLIENT_SECRET=votre-vrai-client-secret
  GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/oauth/callback
  ```

### 4.2 Configuration côté client
- Ouvrez `client/.env`
- Remplacez :
  ```
  REACT_APP_GOOGLE_CLIENT_ID=votre-vrai-client-id
  ```

### 4.3 Redémarrer les services
- Arrêtez le serveur (Ctrl+C)
- Redémarrez le serveur : `node start-server-5001.js`
- Redémarrez le client : `npm start`

## 🧪 Étape 5 : Tester l'authentification

### 5.1 Test de la configuration
```bash
node test-oauth-wait.js
```

### 5.2 Test de l'authentification complète
1. Ouvrez l'application dans le navigateur
2. Allez sur la page de connexion
3. Cliquez sur "Se connecter avec Google"
4. Autorisez l'application
5. Vérifiez que vous êtes redirigé vers l'application

## 🔒 Étape 6 : Sécurité et production

### 6.1 Variables d'environnement
- Ne commitez jamais les fichiers `.env` dans Git
- Utilisez des variables d'environnement sécurisées en production

### 6.2 URIs de redirection en production
- Ajoutez vos domaines de production dans Google Cloud Console
- Exemple : `https://votre-domaine.com/auth/callback`

## 🚨 Dépannage

### Problème : "redirect_uri_mismatch"
- Vérifiez que l'URI de redirection dans Google Cloud Console correspond exactement à celui de votre application

### Problème : "invalid_client"
- Vérifiez que le Client ID et Client Secret sont corrects
- Vérifiez que l'API Google+ API est activée

### Problème : CORS
- Vérifiez que la configuration CORS est correcte
- Vérifiez que l'origine est autorisée

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur
2. Vérifiez la configuration Google Cloud Console
3. Testez avec le script de test OAuth

## 🎉 Félicitations !

Votre authentification Google OAuth est maintenant configurée et fonctionnelle !
