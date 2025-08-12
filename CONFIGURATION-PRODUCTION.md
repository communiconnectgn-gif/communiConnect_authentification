# 🚀 Configuration Production CommuniConnect

## 📍 **URLs de Production**

- **Client (Vercel)**: `https://communiconnectgn224-kbaysrqw3-alpha-oumar-barry-s-projects.vercel.app`
- **Serveur (Render)**: `https://communiconnect-authentification.onrender.com`

## 🔑 **Configuration Google OAuth**

### **1. Console Google Cloud Platform**

Allez sur [Google Cloud Console](https://console.cloud.google.com/) et configurez :

#### **URIs de redirection autorisés :**
```
http://localhost:3000/auth/callback
https://communiconnectgn224-kbaysrqw3-alpha-oumar-barry-s-projects.vercel.app/auth/callback
```

#### **Origines JavaScript autorisées :**
```
http://localhost:3000
https://communiconnectgn224-kbaysrqw3-alpha-oumar-barry-s-projects.vercel.app
```

### **2. Variables d'Environnement Render**

Dans votre dashboard Render, configurez :

```bash
NODE_ENV=production
JWT_SECRET=votre-jwt-secret-super-securise
GOOGLE_CLIENT_SECRET=votre-google-client-secret
MONGODB_URI=votre-mongodb-atlas-uri
```

### **3. Variables d'Environnement Vercel**

Dans votre dashboard Vercel, configurez :

```bash
REACT_APP_API_URL=https://communiconnect-authentification.onrender.com
REACT_APP_SOCKET_URL=https://communiconnect-authentification.onrender.com
REACT_APP_ENV=production
REACT_APP_GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
```

## 🚀 **Processus de Déploiement**

### **Étape 1: Configuration Locale**
```bash
# Copier la configuration de production
copy server\env.render.js server\.env
copy client\env.vercel.js client\.env.production
```

### **Étape 2: Commit et Push**
```bash
git add .
git commit -m "Configuration production pour Render et Vercel"
git push origin main
```

### **Étape 3: Déploiement Automatique**
- **Render**: Déploie automatiquement le serveur
- **Vercel**: Déploie automatiquement le client

## 🔍 **Vérification Post-Déploiement**

### **1. Test du Serveur Render**
```bash
curl https://communiconnect-authentification.onrender.com/api/auth/status
```

### **2. Test du Client Vercel**
- Ouvrir l'URL Vercel
- Vérifier que le manifest.json se charge (pas d'erreur 401)
- Tester l'authentification Google OAuth

### **3. Test des Endpoints**
```bash
# Test de santé
curl https://communiconnect-authentification.onrender.com/api/auth

# Test OAuth
curl https://communiconnect-authentification.onrender.com/api/auth/oauth/status
```

## 🛠️ **Résolution des Problèmes**

### **Erreur 401 sur manifest.json**
- ✅ Vérifier que le fichier est accessible sur Vercel
- ✅ Vérifier la configuration CORS du serveur
- ✅ Vérifier que l'URL Vercel est dans les origines autorisées

### **Erreur 429 Rate Limiting**
- ✅ Vérifier la configuration du rate limiting sur Render
- ✅ Augmenter temporairement les limites si nécessaire
- ✅ Vérifier que le serveur n'est pas surchargé

### **Erreur OAuth**
- ✅ Vérifier les URIs de redirection dans Google Console
- ✅ Vérifier que le client ID est correct
- ✅ Vérifier que le serveur Render est accessible

## 📱 **Configuration PWA**

### **manifest.json**
Le fichier est déjà configuré et accessible sur Vercel.

### **Service Worker**
Le service worker est configuré pour fonctionner avec les URLs de production.

## 🔒 **Sécurité Production**

- ✅ HTTPS obligatoire sur tous les domaines
- ✅ CORS configuré pour les domaines autorisés uniquement
- ✅ Rate limiting activé
- ✅ JWT secret sécurisé
- ✅ Variables d'environnement protégées

## 📞 **Support**

En cas de problème :
1. Vérifier les logs Render et Vercel
2. Tester les endpoints individuellement
3. Vérifier la configuration Google OAuth
4. Contrôler les variables d'environnement

---

**✅ Configuration Production Terminée !**
