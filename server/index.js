const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const NotificationService = require('./services/notificationService');
const MessageSocketService = require('./services/messageSocketService');
const PushNotificationService = require('./services/pushNotificationService');
const multer = require('multer');
const { performanceMonitor, errorMonitor, memoryMonitor, requestMonitor } = require('./middleware/performance');

// Import des middlewares de sécurité RENFORCÉS
const { 
  corsOptions, 
  helmetConfig, 
  blockInjection, 
  validateContentType, 
  limitRequestSize, 
  blockDangerousMethods, 
  addSecurityHeaders, 
  logAttackAttempts 
} = require('./middleware/security');

const { 
  apiLimiter, 
  authLimiter, 
  detectAttack, 
  blockBadBots 
} = require('./middleware/rateLimiter');

const { 
  requestLogger, 
  errorLogger 
} = require('./config/logger');

require('dotenv').config();

// FORCER le mode développement si pas défini
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
  console.log('🔧 NODE_ENV forcé à development');
}

// Configuration par défaut pour le mode développement
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'communiconnect-dev-secret-key-2024';
  console.log('🔧 JWT_SECRET configuré par défaut pour le développement');
}

if (!process.env.JWT_EXPIRE) {
  process.env.JWT_EXPIRE = '7d';
}

if (!process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN = 'http://localhost:3000';
}

const path = require('path'); // Added for serving static files

// Configuration multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  }
});

const app = express();
const server = http.createServer(app);

// CORS très tôt pour préflight/headers
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Configuration Socket.IO avec CORS
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

// Initialiser les services avec l'instance io
const notificationService = new NotificationService(server);
const messageSocketService = new MessageSocketService(io);
const pushNotificationService = new PushNotificationService();

const PORT = process.env.PORT || 3001;

// Middleware de sécurité CRITIQUE (appliqué en premier)
app.use(helmetConfig);
app.use(blockDangerousMethods);
app.use(limitRequestSize);
app.use(validateContentType);
app.use(blockInjection);
app.use(detectAttack);
app.use(blockBadBots);
app.use(logAttackAttempts);
app.use(addSecurityHeaders);

// Rate limiting RENFORCÉ
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// Middleware de monitoring de performance
app.use(performanceMonitor);
app.use(memoryMonitor);
app.use(requestMonitor);

// Middleware de base
app.use(compression());
app.use(morgan('combined'));

// Logging des requêtes
app.use(requestLogger);

// CORS sécurisé
app.use(cors(corsOptions));
// Répondre aux pré-requests CORS rapidement
app.options('*', cors(corsOptions));

// Forcer les headers CORS pour toutes les réponses API (debug dev)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fallback avatar: si le fichier n'existe pas, retourner un SVG par défaut
const fs = require('fs');
app.get('/api/static/avatars/:file', (req, res) => {
  const filePath = path.join(__dirname, 'static/avatars', req.params.file);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(200)
        .type('image/svg+xml')
        .send(
          `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
            <rect width="100%" height="100%" fill="#e0e0e0"/>
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="56" fill="#9e9e9e">U</text>
          </svg>`
        );
    } else {
      res.sendFile(filePath);
    }
  });
});

// Servir les fichiers statiques
app.use('/api/static', express.static(path.join(__dirname, 'static')));

// Créer le dossier avatars s'il n'existe pas
const avatarsDir = path.join(__dirname, 'static/avatars');
if (!require('fs').existsSync(avatarsDir)) {
  require('fs').mkdirSync(avatarsDir, { recursive: true });
}

// Connexion à MongoDB Atlas (toujours activée)
const connectToMongoDB = async () => {
  try {
    // Utilise la config centralisée MongoDB Atlas
    const connectDB = require('./config/database');
    const conn = await connectDB();
    if (conn) {
      console.log('✅ Connexion à MongoDB Atlas établie');
      return true;
    }
    console.log('⚠️ MongoDB Atlas non disponible, continuation sans base de données');
    return false;
  } catch (error) {
    console.error('❌ Erreur MongoDB Atlas:', error.message);
    console.log('⚠️ Continuation sans base de données');
    return false;
  }
};

// Documentation API Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'CommuniConnect API Documentation'
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/conversations', require('./routes/conversations'));
app.use('/api/livestreams', require('./routes/livestreams'));
app.use('/api/events', require('./routes/events'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/friends', require('./routes/friends'));
app.use('/api/moderation', require('./routes/moderation'));
app.use('/api/advanced-moderation', require('./routes/advancedModeration'));
app.use('/api/advanced-notifications', require('./routes/advancedNotifications'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/communiconseil', require('./routes/communiconseil'));
app.use('/api/location', require('./routes/location'));

// Route pour servir les images statiques (sera bypassée par le fallback ci-dessus si fichier manquant)
app.use('/api/static/avatars', express.static(path.join(__dirname, 'static/avatars')));

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifier l'état de l'API
 *     description: Endpoint pour vérifier que l'API CommuniConnect fonctionne correctement
 *     tags: [Système]
 *     responses:
 *       200:
 *         description: API opérationnelle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "CommuniConnect API fonctionne correctement"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-29T22:00:00.000Z"
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CommuniConnect API fonctionne correctement',
    timestamp: new Date().toISOString()
  });
});

// Rendre les services disponibles globalement
global.notificationService = notificationService;
global.messageSocketService = messageSocketService;
global.pushNotificationService = pushNotificationService;

// Broadcast des statistiques toutes les 30 secondes (désactivé temporairement)
// setInterval(() => {
//   notificationService.broadcastStats();
// }, 30000);

// Middleware de gestion d'erreurs (doit être le dernier)
app.use(errorLogger);
app.use(errorMonitor);

module.exports = { app, server, io };

// Démarrage du serveur
const startServer = async () => {
  try {
    // Toujours essayer MongoDB Atlas (développement et production)
    global.mongoConnected = await connectToMongoDB();
  } catch (error) {
    console.log('⚠️ Erreur lors de l\'initialisation, continuation sans MongoDB');
    global.mongoConnected = false;
  }
  
  server.listen(PORT, () => {
    console.log(`🚀 Serveur CommuniConnect démarré sur le port ${PORT}`);
    console.log(`📱 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌍 API disponible sur: http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO actif sur: http://localhost:${PORT}`);
    console.log(`🛡️ Sécurité renforcée activée`);
    console.log(`🗄️ MongoDB: ${global.mongoConnected ? 'Connecté' : 'Non connecté (mode développement)'}`);
  });
};

startServer(); // Call to start the server 