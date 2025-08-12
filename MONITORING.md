# 📊 Monitoring et Maintenance - CommuniConnect

Ce guide vous accompagne pour surveiller et maintenir votre application CommuniConnect déployée.

## 🔍 Monitoring en Temps Réel

### 1. Render (Backend)

#### Dashboard Principal
- **URL** : [dashboard.render.com](https://dashboard.render.com)
- **Métriques disponibles** :
  - CPU et mémoire utilisés
  - Temps de réponse des requêtes
  - Nombre de requêtes par minute
  - Logs en temps réel

#### Logs et Debugging
```bash
# Accès aux logs depuis le dashboard Render
Dashboard → Votre Service → Logs

# Filtrage des logs
- Niveau : INFO, WARN, ERROR
- Période : Dernières heures, jours, semaines
- Recherche par mot-clé
```

#### Alertes et Notifications
- **Configuration des alertes** :
  1. Dashboard → Votre Service → Alerts
  2. Définir des seuils (CPU > 80%, Mémoire > 90%)
  3. Configurer les notifications email/Slack

### 2. Vercel (Frontend)

#### Analytics
- **URL** : [vercel.com/analytics](https://vercel.com/analytics)
- **Métriques disponibles** :
  - Visiteurs et pages vues
  - Performance (Core Web Vitals)
  - Erreurs JavaScript
  - Temps de chargement

#### Functions Logs
```bash
# Accès aux logs des fonctions
Dashboard → Votre Projet → Functions → Logs

# Types de logs
- Build logs
- Runtime logs
- Error logs
```

## 🚨 Surveillance des Erreurs

### 1. Backend (Render)

#### Endpoint de Santé
```bash
# Test automatique de l'API
curl https://your-backend.onrender.com/api/health

# Réponse attendue
{
  "status": "OK",
  "message": "CommuniConnect API fonctionne correctement",
  "timestamp": "2025-01-29T22:00:00.000Z"
}
```

#### Monitoring des Erreurs
```javascript
// Dans votre code backend
app.use((error, req, res, next) => {
  // Log de l'erreur
  console.error('Error:', error);
  
  // Envoi à un service de monitoring (optionnel)
  // Sentry, LogRocket, etc.
  
  res.status(500).json({
    error: 'Erreur interne du serveur',
    timestamp: new Date().toISOString()
  });
});
```

### 2. Frontend (Vercel)

#### Error Boundary React
```jsx
// ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log de l'erreur
    console.error('Frontend Error:', error, errorInfo);
    
    // Envoi à un service de monitoring
    // Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return <h1>Une erreur s'est produite.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 📈 Métriques de Performance

### 1. Backend Performance

#### Monitoring Express
```javascript
// Middleware de monitoring
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    
    // Envoyer à un service de monitoring
    // Prometheus, Grafana, etc.
  });
  
  next();
});
```

#### Métriques MongoDB
```javascript
// Monitoring de la base de données
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connecté');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB déconnecté');
});
```

### 2. Frontend Performance

#### Core Web Vitals
```javascript
// Monitoring des Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log('Web Vital:', metric);
  
  // Envoyer à Google Analytics ou autre service
  // gtag('event', metric.name, metric.value);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 🔄 Maintenance Préventive

### 1. Sauvegardes

#### Base de Données
```bash
# MongoDB Atlas - Sauvegarde automatique
- Configurée par défaut
- Rétention : 7 jours (gratuit)
- Rétention : 30 jours (payant)

# Export manuel
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/communiconnect"
```

#### Code Source
```bash
# GitHub - Versioning automatique
git tag -a v1.0.0 -m "Version stable 1.0.0"
git push origin v1.0.0

# Branches de maintenance
git checkout -b maintenance/v1.0.1
git push origin maintenance/v1.0.1
```

### 2. Mises à Jour

#### Dépendances Backend
```bash
# Vérification des vulnérabilités
cd server
npm audit

# Mise à jour des dépendances
npm update
npm audit fix

# Mise à jour majeure (attention)
npm audit fix --force
```

#### Dépendances Frontend
```bash
# Vérification des vulnérabilités
cd client
npm audit

# Mise à jour des dépendances
npm update
npm audit fix
```

## 🚨 Procédures d'Urgence

### 1. Service Indisponible

#### Backend Down
```bash
# 1. Vérifier les logs Render
Dashboard → Service → Logs

# 2. Redémarrer le service
Dashboard → Service → Manual Deploy

# 3. Vérifier la base de données
- MongoDB Atlas → Clusters → Connect

# 4. Rollback si nécessaire
Dashboard → Service → Deploys → Rollback
```

#### Frontend Down
```bash
# 1. Vérifier les logs Vercel
Dashboard → Projet → Functions → Logs

# 2. Redéployer
Dashboard → Projet → Deployments → Redeploy

# 3. Vérifier les variables d'environnement
Dashboard → Projet → Settings → Environment Variables
```

### 2. Base de Données Corrompue

```bash
# 1. Arrêter le service backend
Dashboard → Service → Suspend

# 2. Restaurer depuis la sauvegarde
MongoDB Atlas → Clusters → Command Line Tools

# 3. Redémarrer le service
Dashboard → Service → Resume
```

## 📊 Outils de Monitoring Recommandés

### 1. Gratuits
- **Uptime Robot** : Monitoring de disponibilité
- **Google Analytics** : Analytics frontend
- **MongoDB Atlas** : Monitoring base de données
- **Render/Vercel** : Monitoring intégré

### 2. Payants (Recommandés pour la production)
- **Sentry** : Gestion des erreurs
- **LogRocket** : Session replay et debugging
- **DataDog** : Monitoring complet
- **New Relic** : APM et monitoring

## 🔧 Scripts de Maintenance

### 1. Script de Vérification
```bash
#!/bin/bash
# check-health.sh

BACKEND_URL="https://your-backend.onrender.com"
FRONTEND_URL="https://your-frontend.vercel.app"

echo "🔍 Vérification de la santé des services..."

# Test backend
echo "Backend:"
if curl -f "$BACKEND_URL/api/health" > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ ERREUR"
fi

# Test frontend
echo "Frontend:"
if curl -f "$FRONTEND_URL" > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ ERREUR"
fi
```

### 2. Script de Sauvegarde
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/$DATE"

mkdir -p "$BACKUP_DIR"

echo "📦 Sauvegarde du $(date)"

# Sauvegarde des variables d'environnement
cp server/.env* "$BACKUP_DIR/" 2>/dev/null || echo "Pas de .env trouvé"

# Sauvegarde de la configuration
cp render.yaml "$BACKUP_DIR/"
cp client/vercel.json "$BACKUP_DIR/"

echo "✅ Sauvegarde terminée dans $BACKUP_DIR"
```

## 📅 Planning de Maintenance

### Maintenance Hebdomadaire
- [ ] Vérification des logs d'erreur
- [ ] Analyse des métriques de performance
- [ ] Vérification des sauvegardes
- [ ] Audit de sécurité des dépendances

### Maintenance Mensuelle
- [ ] Mise à jour des dépendances
- [ ] Analyse des tendances de performance
- [ ] Vérification des quotas (Render/Vercel)
- [ ] Optimisation des requêtes MongoDB

### Maintenance Trimestrielle
- [ ] Révision de l'architecture
- [ ] Mise à jour des outils de monitoring
- [ ] Formation de l'équipe
- [ ] Planification des évolutions

---

**🎯 Un monitoring efficace garantit la stabilité et les performances de votre application CommuniConnect !**
