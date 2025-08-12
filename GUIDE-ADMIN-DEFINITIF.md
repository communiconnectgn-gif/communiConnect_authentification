# 🚀 Guide Définitif - Résolution des Problèmes de Port avec Droits Administrateur

## 🎯 **Objectif : Résoudre définitivement les problèmes de port 5000**

### ❌ **Problème actuel :**
- Erreur `EACCES: permission denied 5000` sur Windows
- Contournement temporaire avec le port 5001
- Configuration non permanente

### ✅ **Solution définitive :**
- Utiliser les droits administrateur Windows
- Démarrer le serveur sur le port 5000 standard
- Configuration OAuth Google permanente

## 🔧 **Étapes pour résoudre définitivement :**

### **Étape 1 : Ouvrir PowerShell en tant qu'administrateur**
1. Appuyez sur `Windows + X`
2. Sélectionnez "Windows PowerShell (Admin)" ou "Terminal (Admin)"
3. Cliquez "Oui" pour autoriser les modifications

### **Étape 2 : Naviguer vers le projet**
```powershell
cd "C:\Users\DELL\Documents\CommuniConnect_charte_graphique"
```

### **Étape 3 : Exécuter le script administrateur**
```powershell
.\start-server-admin.ps1
```

**OU utiliser le script batch :**
```cmd
start-server-admin.bat
```

## 📋 **Ce que font les scripts administrateur :**

### ✅ **Vérification des droits :**
- Détection automatique du mode administrateur
- Message d'erreur si pas de droits

### ✅ **Configuration automatique :**
- Variables d'environnement OAuth Google
- Port 5000 standard
- Configuration CORS correcte

### ✅ **Démarrage du serveur :**
- Serveur sur le port 5000
- MongoDB Atlas connecté
- OAuth Google fonctionnel

## 🧪 **Test de la solution définitive :**

### **1. Démarrer le serveur en administrateur :**
```powershell
.\start-server-admin.ps1
```

### **2. Vérifier que le port 5000 fonctionne :**
```powershell
netstat -ano | findstr :5000
```

### **3. Tester l'API :**
```powershell
curl http://localhost:5000/api/health
```

### **4. Tester OAuth :**
```powershell
curl http://localhost:5000/api/auth/oauth/status
```

## 🎉 **Résultat attendu :**

### ✅ **Serveur opérationnel :**
- Port 5000 accessible
- Plus d'erreurs de permission
- Configuration OAuth permanente

### ✅ **Authentification Google :**
- Client ID configuré
- Redirect URI correct
- CORS fonctionnel

### ✅ **Configuration définitive :**
- Plus de scripts temporaires
- Port standard respecté
- Solution Windows native

## 🔒 **Sécurité et bonnes pratiques :**

### **⚠️ Important :**
- N'utilisez les droits administrateur que pour démarrer le serveur
- Fermez PowerShell admin après le démarrage
- Le serveur continuera de fonctionner sans droits admin

### **✅ Recommandations :**
- Utilisez le script PowerShell (plus sécurisé)
- Vérifiez que le port 5000 est libre avant
- Testez l'API après démarrage

## 🚨 **Dépannage :**

### **Problème : "Accès refusé"**
- Vérifiez que PowerShell est en mode administrateur
- Redémarrez PowerShell en admin

### **Problème : Port déjà utilisé**
- Vérifiez avec `netstat -ano | findstr :5000`
- Arrêtez le processus qui utilise le port

### **Problème : Variables d'environnement**
- Vérifiez que le script s'exécute correctement
- Relancez le script en admin

## 🎯 **Avantages de cette solution :**

1. **Définitive** - Plus de contournements temporaires
2. **Standard** - Utilise le port 5000 standard
3. **Sécurisée** - Droits admin limités au démarrage
4. **Windows native** - Solution adaptée à Windows
5. **Maintenable** - Configuration permanente

## 🏁 **Conclusion :**

Cette solution résout définitivement les problèmes de port en utilisant les droits administrateur Windows de manière sécurisée et contrôlée. Une fois le serveur démarré, il fonctionne normalement sans nécessiter de droits spéciaux.

**Votre authentification Google OAuth sera alors 100% fonctionnelle sur le port 5000 standard !** 🎉
