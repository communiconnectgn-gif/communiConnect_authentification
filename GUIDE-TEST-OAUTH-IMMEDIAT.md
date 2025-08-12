# 🚀 GUIDE DE TEST IMMÉDIAT - OAuth Google

## ✅ **STATUT ACTUEL :**
- **Serveur OAuth** : ✅ Fonctionne sur http://localhost:5001
- **Client React** : 🚀 Démarrage en cours sur http://localhost:3000
- **Configuration OAuth** : ✅ Complète et fonctionnelle

## 🔗 **URLS DE TEST :**

### Serveur OAuth (Port 5001)
- **Statut** : http://localhost:5001/api/auth/oauth/status
- **Santé** : http://localhost:5001/health
- **Callback** : http://localhost:5001/api/auth/oauth/callback

### Client React (Port 3000)
- **Accueil** : http://localhost:3000
- **Connexion** : http://localhost:3000/login
- **Callback OAuth** : http://localhost:3000/auth/callback

## 🧪 **TESTS À EFFECTUER :**

### 1. **Vérification du Serveur OAuth**
```bash
# Test de santé
curl http://localhost:5001/health

# Test de la configuration OAuth
curl http://localhost:5001/api/auth/oauth/status
```

### 2. **Test de l'Interface Utilisateur**
1. Ouvrir http://localhost:3000 dans le navigateur
2. Aller sur la page de connexion : http://localhost:3000/login
3. Vérifier que le bouton "Continuer avec Google" est visible
4. Cliquer sur le bouton Google

### 3. **Test du Flux OAuth**
1. **Redirection vers Google** : Le bouton doit rediriger vers Google
2. **Autorisation Google** : Autoriser l'application CommuniConnect
3. **Callback** : Redirection vers http://localhost:3000/auth/callback
4. **Connexion réussie** : Redirection vers l'accueil avec l'utilisateur connecté

## 🔍 **POINTS DE VÉRIFICATION :**

### ✅ **Serveur OAuth**
- [ ] Port 5001 accessible
- [ ] Route `/api/auth/oauth/status` répond
- [ ] Route `/api/auth/oauth/callback` accepte les POST
- [ ] CORS configuré pour localhost:3000

### ✅ **Interface Client**
- [ ] Page de connexion accessible
- [ ] Bouton Google visible et cliquable
- [ ] Redirection vers Google fonctionne
- [ ] Page de callback s'affiche
- [ ] Connexion réussie et redirection

### ✅ **Flux OAuth Complet**
- [ ] URL d'autorisation Google générée
- [ ] Redirection vers Google réussie
- [ ] Callback reçu par le serveur
- [ ] Utilisateur créé/connecté
- [ ] Token JWT généré
- [ ] Redirection vers l'accueil

## 🚨 **DÉPANNAGE RAPIDE :**

### Problème : "Serveur non accessible"
- Vérifier que le serveur tourne sur le port 5001
- Vérifier les logs du serveur

### Problème : "Bouton Google ne fonctionne pas"
- Vérifier la console du navigateur
- Vérifier que le client est sur le port 3000
- Vérifier la configuration OAuth

### Problème : "Erreur CORS"
- Vérifier que le serveur autorise localhost:3000
- Vérifier les headers CORS

## 📱 **TEST MANUEL RAPIDE :**

1. **Ouvrir 2 onglets** :
   - Serveur : http://localhost:5001/health
   - Client : http://localhost:3000/login

2. **Tester le bouton Google** :
   - Cliquer sur "Continuer avec Google"
   - Vérifier la redirection vers Google
   - Autoriser l'application
   - Vérifier le retour et la connexion

3. **Vérifier les logs** :
   - Console du navigateur
   - Terminal du serveur
   - Terminal du client

## 🎯 **OBJECTIF :**
**Valider que l'authentification OAuth Google fonctionne de bout en bout :**
1. ✅ Bouton Google visible
2. ✅ Redirection vers Google
3. ✅ Autorisation utilisateur
4. ✅ Callback serveur
5. ✅ Connexion réussie
6. ✅ Redirection accueil

---

**💡 ASTUCE :** Utilisez les outils de développement du navigateur (F12) pour surveiller les requêtes réseau et les redirections OAuth.
