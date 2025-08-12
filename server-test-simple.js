#!/usr/bin/env node

/**
 * Serveur de Test OAuth Ultra-Simple - CommuniConnect
 * ====================================================
 * 
 * Serveur minimal SANS dépendances externes
 * Utilise uniquement les modules Node.js natifs
 */

const http = require('http');
const url = require('url');

const PORT = 5001;

// Configuration OAuth
const GOOGLE_CLIENT_ID = '4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Gestion des requêtes
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  // Gestion OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`📡 ${req.method} ${path}`);
  
  // Routes
  if (path === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Serveur de test OAuth CommuniConnect - PORT 5001',
      timestamp: new Date().toISOString(),
      endpoints: {
        status: '/api/auth/oauth/status',
        callback: '/api/auth/oauth/callback'
      }
    }));
  }
  
  else if (path === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      port: PORT,
      timestamp: new Date().toISOString(),
      message: 'Serveur OAuth opérationnel'
    }));
  }
  
  else if (path === '/api/auth/oauth/status' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
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
    }));
  }
  
  else if (path === '/api/auth/oauth/callback' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('🔐 OAuth callback reçu:', data);
        
        if (!data.code) {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            message: 'Code d\'autorisation requis'
          }));
          return;
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
        
        // Token JWT simple (simulation)
        const token = 'mock-jwt-token-' + Date.now();
        
        console.log('✅ Connexion OAuth simulée réussie');
        
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          message: 'Connexion OAuth réussie (mode test)',
          user: mockUser,
          token
        }));
        
      } catch (error) {
        console.error('❌ Erreur parsing JSON:', error);
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: 'Données invalides'
        }));
      }
    });
  }
  
  else {
    res.writeHead(404);
    res.end(JSON.stringify({
      success: false,
      message: 'Route non trouvée'
    }));
  }
});

// Démarrage du serveur
server.listen(PORT, () => {
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
server.on('error', (error) => {
  console.error('❌ Erreur serveur:', error);
});

process.on('SIGINT', () => {
  console.log('\n🔴 Arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté');
    process.exit(0);
  });
});
