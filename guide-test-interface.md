# 🎯 Guide de Test - Interface Utilisateur CommuniConnect

## 🚀 **Test de l'Authentification Google OAuth**

### ✅ **Prérequis vérifiés :**
- Serveur actif sur le port 5000 ✅
- Client React actif sur le port 3000 ✅
- OAuth Google configuré ✅

## 🔧 **Étapes de test :**

### **1. Ouvrir l'interface utilisateur**
```
🌐 Ouvrir votre navigateur
📱 Aller sur : http://localhost:3000
✅ Vérifier que la page se charge
```

### **2. Tester la page de connexion**
```
🔍 Chercher le bouton "Se connecter avec Google"
🎨 Vérifier que l'interface est belle et moderne
📱 Vérifier que c'est responsive
```

### **3. Tester l'authentification Google**
```
🖱️ Cliquer sur "Se connecter avec Google"
🌐 Vérifier la redirection vers Google
🔐 S'authentifier avec votre compte Google
✅ Vérifier le retour vers l'application
```

### **4. Vérifier la création de compte**
```
👤 Vérifier que votre profil est créé
📧 Vérifier les informations Google (email, nom, photo)
🎯 Vérifier que vous êtes connecté
```

## 🧪 **Tests automatisés à exécuter :**

### **Test 1 : Vérifier que l'interface répond**
```bash
curl http://localhost:3000
```

### **Test 2 : Vérifier l'API OAuth**
```bash
curl http://localhost:5000/api/auth/oauth/status
```

### **Test 3 : Vérifier le serveur**
```bash
curl http://localhost:5000/api/health
```

## 🎉 **Résultats attendus :**

### ✅ **Interface utilisateur :**
- Page de connexion chargée
- Bouton Google OAuth visible
- Design moderne et responsive

### ✅ **Authentification :**
- Redirection Google fonctionnelle
- Retour vers l'application
- Compte utilisateur créé

### ✅ **Système complet :**
- Serveur + Client synchronisés
- OAuth Google opérationnel
- Base de données connectée

## 🚨 **En cas de problème :**

### **Interface ne se charge pas :**
- Vérifier que le client React est actif
- Vérifier le port 3000

### **Erreur d'authentification :**
- Vérifier la configuration OAuth
- Vérifier les clés Google

### **Erreur de base de données :**
- Vérifier MongoDB Atlas
- Vérifier la connexion serveur

## 🏁 **Objectif final :**

**Avoir une authentification Google OAuth 100% fonctionnelle avec une interface utilisateur moderne et responsive !** 🎯 