# 🚀 Guide de Déploiement - CommuniConnect

Ce guide vous accompagne pour déployer CommuniConnect sur Render (backend) et Vercel (frontend).

## 📋 Prérequis

- Compte GitHub avec votre code source
- Compte Render.com (gratuit)
- Compte Vercel.com (gratuit)
- Base de données MongoDB Atlas
- Services externes configurés (Cloudinary, Twilio, Firebase, etc.)

## 🔧 Déploiement du Backend sur Render

### 1. Préparation du Code

1. **Vérifiez que votre code est sur GitHub** avec la structure suivante :
   ```
   ├── server/
   │   ├── package.json
   │   ├── index.js
   │   └── ...
   ├── client/
   │   ├── package.json
   │   └── ...
   ├── render.yaml
   └── README.md
   ```

2. **Le fichier `render.yaml` est déjà configuré** pour le déploiement automatique.

### 2. Déploiement sur Render

1. **Connectez-vous à [Render.com](https://render.com)**
2. **Cliquez sur "New +" → "Blueprint"**
3. **Connectez votre repository GitHub**
4. **Render détectera automatiquement le `render.yaml`**
5. **Configurez les variables d'environnement** (voir section ci-dessous)

### 3. Variables d'Environnement sur Render

Dans votre dashboard Render, configurez ces variables :

#### Variables Obligatoires :
- `MONGODB_URI` : Votre URI MongoDB Atlas
- `JWT_SECRET` : Clé secrète pour les tokens JWT
- `CORS_ORIGIN` : URL de votre frontend Vercel

#### Variables Optionnelles (selon vos besoins) :
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

### 4. Déploiement

1. **Cliquez sur "Create Blueprint"**
2. **Render déploiera automatiquement votre backend**
3. **Notez l'URL générée** (ex: `https://communiconnect-backend.onrender.com`)

## 🌐 Déploiement du Frontend sur Vercel

### 1. Préparation

1. **Vérifiez que le fichier `client/vercel.json` est présent**
2. **Mettez à jour l'URL de l'API** dans `client/vercel.env.example`

### 2. Déploiement sur Vercel

1. **Connectez-vous à [Vercel.com](https://vercel.com)**
2. **Cliquez sur "New Project"**
3. **Importez votre repository GitHub**
4. **Configurez le projet** :
   - **Framework Preset** : Create React App
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`

### 3. Variables d'Environnement sur Vercel

Dans votre projet Vercel, ajoutez ces variables :

#### Variables Obligatoires :
- `REACT_APP_API_URL` : URL de votre backend Render
- `REACT_APP_SOCKET_URL` : URL de votre backend Render (pour Socket.IO)

#### Variables Optionnelles :
- Variables Firebase si vous utilisez Firebase côté client
- Variables Cloudinary si nécessaire

### 4. Déploiement

1. **Cliquez sur "Deploy"**
2. **Vercel déploiera votre frontend**
3. **Notez l'URL générée** (ex: `https://communiconnect.vercel.app`)

## 🔄 Mise à Jour des URLs

### 1. Backend (Render)

Après le déploiement, mettez à jour `CORS_ORIGIN` avec l'URL de votre frontend Vercel.

### 2. Frontend (Vercel)

Après le déploiement du backend, mettez à jour :
- `REACT_APP_API_URL`
- `REACT_APP_SOCKET_URL`

## 📱 Configuration des Services Externes

### MongoDB Atlas
1. Créez un cluster MongoDB Atlas
2. Configurez l'utilisateur et le mot de passe
3. Ajoutez l'IP de Render à la whitelist (ou `0.0.0.0/0` pour tous)

### Cloudinary
1. Créez un compte Cloudinary
2. Récupérez vos clés API
3. Configurez les variables d'environnement

### Twilio (SMS)
1. Créez un compte Twilio
2. Récupérez vos identifiants
3. Configurez les variables d'environnement

### Firebase
1. Créez un projet Firebase
2. Téléchargez la clé privée
3. Configurez les variables d'environnement

## 🧪 Test du Déploiement

### 1. Test du Backend
- Visitez : `https://your-backend.onrender.com/api/health`
- Vous devriez voir : `{"status":"OK","message":"CommuniConnect API fonctionne correctement"}`

### 2. Test du Frontend
- Visitez votre URL Vercel
- Vérifiez que l'application se charge
- Testez la connexion à l'API

## 🔍 Dépannage

### Problèmes Courants

1. **CORS Errors** : Vérifiez que `CORS_ORIGIN` pointe vers votre frontend Vercel
2. **MongoDB Connection** : Vérifiez votre URI MongoDB et la whitelist IP
3. **Build Errors** : Vérifiez les dépendances dans `package.json`
4. **Environment Variables** : Vérifiez que toutes les variables sont configurées

### Logs

- **Render** : Dashboard → Logs
- **Vercel** : Dashboard → Functions → Logs

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [CommuniConnect GitHub](votre-repo-github)

## 🆘 Support

En cas de problème :
1. Vérifiez les logs de déploiement
2. Consultez la documentation des services
3. Vérifiez la configuration des variables d'environnement
4. Testez localement avant de déployer

---

**🎉 Félicitations !** Votre application CommuniConnect est maintenant déployée sur Render et Vercel ! 