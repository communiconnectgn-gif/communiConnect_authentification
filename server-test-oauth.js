#!/usr/bin/env node

/**
 * Serveur de Test OAuth - CommuniConnect
 * =======================================
 * 
 * Serveur minimal pour tester l'authentification OAuth
 * Démarré immédiatement sans problèmes de permission
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Configuration OAuth
const GOOGLE_CLIENT_ID = '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const JWT_SECRET = 'communiconnect-super-secret-jwt-key-2024-change-in-production';

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur de test OAuth CommuniConnect - PORT 5001',
    timestamp: new Date().toISOString(),
    endpoints: {
      status: '/api/auth/oauth/status',
      callback: '/api/auth/oauth/callback'
    }
  });
});

// Statut OAuth
app.get('/api/auth/oauth/status', (req, res) => {
  res.json({
    success: true,
    message: 'Configuration OAuth',
    oauth: {
      google: {
        clientId: '✅ Configuré',
        clientSecret: '✅ Configuré',
        redirectUri: `http://localhost:${PORT}/api/auth/oauth/callback`,
        nodeEnv: 'development'
      },
      cors: {
        origin: 'http://localhost:3000',
        enabled: true
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Callback OAuth (simulation)
app.post('/api/auth/oauth/callback', async (req, res) => {
  try {
    console.log('🔐 OAuth callback reçu:', req.body);
    
    const { code, state, redirectUri } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code d\'autorisation requis'
      });
    }
    
    // Simulation d'un utilisateur OAuth réussi
    const mockUser = {
      _id: 'oauth-user-' + Date.now(),
      firstName: 'Utilisateur',
      lastName: 'OAuth',
      email: 'test.oauth@communiconnect.com',
      phone: '22412345678',
      role: 'user',
      isVerified: true,
      isActive: true,
      location: {
        region: 'Conakry',
        prefecture: 'Conakry',
        commune: 'Kaloum',
        quartier: 'Centre',
        coordinates: {
          latitude: 9.537,
          longitude: -13.6785
        }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Générer un token JWT
    const token = jwt.sign(
      { userId: mockUser._id, email: mockUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✅ Connexion OAuth simulée réussie');
    
    res.json({
      success: true,
      message: 'Connexion OAuth réussie (mode test)',
      user: mockUser,
      token
    });
    
  } catch (error) {
    console.error('❌ Erreur OAuth callback:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'authentification OAuth'
    });
  }
});

// Test de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    port: PORT,
    timestamp: new Date().toISOString(),
    message: 'Serveur OAuth opérationnel'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('\n🚀 SERVEUR DE TEST OAUTH DÉMARRÉ !');
  console.log('=====================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔐 OAuth: http://localhost:${PORT}/api/auth/oauth/status`);
  console.log(`💚 Santé: http://localhost:${PORT}/health`);
  console.log('\n✅ Prêt pour les tests OAuth !');
  console.log('📱 Démarrez le client sur http://localhost:3000');
  console.log('🔗 Testez: http://localhost:3000/login');
  console.log('\n⏹️  Arrêter: Ctrl+C\n');
});

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  console.error('❌ Erreur non gérée:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesse rejetée:', reason);
});
