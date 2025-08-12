# 🚀 Guide de Test Rapide - Authentification Google OAuth

## 📋 Prérequis

- ✅ Node.js installé
- ✅ Serveur CommuniConnect configuré
- ✅ Clés Google OAuth configurées
- ✅ Base de données MongoDB accessible

## 🔧 Configuration Vérifiée

Votre configuration OAuth est déjà prête dans `server/env-definitif.js` :

```env
GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/oauth/callback
```

## 🧪 Tests Automatiques

### Option 1: Script de test complet
```bash
node test-oauth-complet-final.js
```

### Option 2: Script batch Windows
```bash
test-oauth-simple.bat
```

## 🔍 Tests Manuels

### 1. Vérification du serveur
```bash
# Démarrer le serveur
cd server
npm start
```

### 2. Tester la configuration OAuth
```bash
curl http://localhost:5000/api/auth/oauth/status
```

### 3. Tester le callback OAuth (simulation)
```bash
curl -X POST http://localhost:5000/api/auth/oauth/callback \
  -H "Content-Type: application/json" \
  -d '{
    "code": "test-code",
    "state": "test-state",
    "redirectUri": "http://localhost:3000/auth/callback"
  }'
```

## 🌐 Test de l'Interface Utilisateur

### 1. Démarrer le client
```bash
cd client
npm start
```

### 2. Tester le flux OAuth
1. Ouvrir http://localhost:3000
2. Cliquer sur "Continuer avec Google"
3. Autoriser l'application dans Google
4. Vérifier la redirection vers `/auth/callback`
5. Vérifier la connexion réussie

## 📊 Points de Vérification

### ✅ Configuration Serveur
- [ ] Variables d'environnement chargées
- [ ] Routes OAuth accessibles
- [ ] CORS configuré correctement
- [ ] Base de données connectée

### ✅ Flux OAuth
- [ ] URL d'autorisation Google générée
- [ ] Redirection vers Google réussie
- [ ] Callback reçu par le serveur
- [ ] Token JWT généré
- [ ] Utilisateur créé/connecté

### ✅ Interface Client
- [ ] Bouton Google visible
- [ ] Redirection vers Google
- [ ] Page de callback affichée
- [ ] Connexion réussie
- [ ] Redirection vers l'accueil

## 🚨 Dépannage

### Erreur "Serveur non accessible"
- Vérifier que le serveur tourne sur le port 5000
- Vérifier les logs du serveur

### Erreur "Configuration OAuth manquante"
- Vérifier le fichier `env-definitif.js`
- Redémarrer le serveur après modification

### Erreur "CORS"
- Vérifier `CORS_ORIGIN=http://localhost:3000`
- Vérifier que le client tourne sur le port 3000

### Erreur "Base de données"
- Vérifier la connexion MongoDB
- Vérifier les logs de connexion

## 🔗 URLs de Test

- **Serveur**: http://localhost:5000
- **Client**: http://localhost:3000
- **Status OAuth**: http://localhost:5000/api/auth/oauth/status
- **Callback OAuth**: http://localhost:5000/api/auth/oauth/callback

## 📝 Logs à Surveiller

### Serveur
```bash
cd server
npm start
```

### Client
```bash
cd client
npm start
```

## ✅ Validation Finale

L'authentification OAuth est réussie quand :
1. ✅ Le bouton Google redirige vers Google
2. ✅ L'utilisateur peut s'autoriser
3. ✅ La redirection vers `/auth/callback` fonctionne
4. ✅ L'utilisateur est connecté et redirigé vers l'accueil
5. ✅ Le token JWT est stocké et valide

## 🎯 Prochaines Étapes

Après validation de l'OAuth :
1. Tester la persistance de session
2. Tester la déconnexion
3. Tester la protection des routes
4. Tester la gestion des erreurs
5. Déployer en production

---

**💡 Astuce**: Utilisez les outils de développement du navigateur pour surveiller les requêtes réseau et les redirections OAuth.
