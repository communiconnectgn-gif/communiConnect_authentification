const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { logSecurity } = require('../config/logger');

// Configuration CORS sécurisée
const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (applications mobiles, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://communiconnect.com',
      'https://www.communiconnect.com'
    ];
    
    // Ajouter l'origine depuis la variable d'environnement
    if (process.env.CORS_ORIGIN) {
      allowedOrigins.push(process.env.CORS_ORIGIN);
      console.log('🔧 CORS_ORIGIN ajouté:', process.env.CORS_ORIGIN);
      
             // Ajouter aussi tous les sous-domaines Vercel
       if (process.env.CORS_ORIGIN.includes('vercel.app')) {
         // Extraire le nom de base (avant le premier tiret)
         const fullDomain = process.env.CORS_ORIGIN.replace('https://', '');
         const baseName = fullDomain.split('-')[0];
         const wildcardDomain = `https://${baseName}-*.vercel.app`;
         allowedOrigins.push(wildcardDomain);
         console.log('🔧 Domaine wildcard Vercel ajouté:', wildcardDomain);
         
                   // Ajouter aussi le pattern générique pour tous les projets Vercel
          const genericWildcard = `https://*-alpha-oumar-barry-s-projects.vercel.app`;
          allowedOrigins.push(genericWildcard);
          console.log('🔧 Pattern générique Vercel ajouté:', genericWildcard);
          
          // Ajouter un pattern ultra-générique pour TOUS les domaines Vercel
          const ultraGenericWildcard = `https://*.vercel.app`;
          allowedOrigins.push(ultraGenericWildcard);
          console.log('🔧 Pattern ultra-générique Vercel ajouté:', ultraGenericWildcard);
       }
    } else {
      console.log('⚠️ CORS_ORIGIN non défini');
    }
    
    // En développement, autoriser localhost et toutes les variantes
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push(
        'http://localhost:3000', 
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001'
      );
    }
    
    // Autoriser les requêtes OAuth Google (qui peuvent venir de différents domaines)
    if (origin && origin.includes('accounts.google.com')) {
      return callback(null, true);
    }
    
    console.log('🔍 CORS - Origine demandée:', origin);
    console.log('🔍 CORS - Origines autorisées:', allowedOrigins);
    
    // Vérifier si l'origine est exactement dans la liste
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS - Origine autorisée (exacte):', origin);
      callback(null, true);
    } else {
      // Vérifier les patterns wildcard
      const isWildcardMatch = allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin.includes('*')) {
          const pattern = allowedOrigin.replace('*', '.*');
          const regex = new RegExp(pattern);
          return regex.test(origin);
        }
        return false;
      });
      
      if (isWildcardMatch) {
        console.log('✅ CORS - Origine autorisée (wildcard):', origin);
        callback(null, true);
      } else {
        console.log('❌ CORS - Origine refusée:', origin);
        logSecurity('Tentative d\'accès CORS non autorisée', {
          origin,
          allowedOrigins
        });
        callback(new Error('Non autorisé par CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 heures
};

// Configuration Helmet renforcée
const helmetConfig = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true
});

// Middleware pour bloquer les attaques par injection
const blockInjection = (req, res, next) => {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi,
    /onclick\s*=/gi,
    /onmouseover\s*=/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
    /alert\s*\(/gi,
    /confirm\s*\(/gi,
    /prompt\s*\(/gi
  ];

  const checkInput = (input) => {
    if (typeof input === 'string') {
      for (const pattern of dangerousPatterns) {
        if (pattern.test(input)) {
          return true;
        }
      }
    }
    return false;
  };

  // Vérifier le body
  if (req.body && checkInput(JSON.stringify(req.body))) {
    logSecurity('Injection détectée dans le body', {
      ip: req.ip,
      path: req.path,
      body: req.body
    });
    return res.status(403).json({
      success: false,
      message: 'Contenu malveillant détecté'
    });
  }

  // Vérifier les query parameters
  if (req.query && checkInput(JSON.stringify(req.query))) {
    logSecurity('Injection détectée dans les query params', {
      ip: req.ip,
      path: req.path,
      query: req.query
    });
    return res.status(403).json({
      success: false,
      message: 'Paramètres malveillants détectés'
    });
  }

  next();
};

// Middleware pour valider les types de contenu
const validateContentType = (req, res, next) => {
  const allowedContentTypes = [
    'application/json',
    'application/x-www-form-urlencoded',
    'multipart/form-data'
  ];

  const contentType = req.get('Content-Type') || '';
  const methodChecks = ['POST', 'PUT', 'PATCH'].includes(req.method);

  // Déterminer s'il y a réellement un corps à valider
  const hasBodyLength = req.headers['content-length'] && parseInt(req.headers['content-length']) > 0;
  const hasParsedBody = req.body && Object.keys(req.body || {}).length > 0;
  const hasBody = Boolean(hasBodyLength || hasParsedBody);

  if (methodChecks && hasBody) {
    if (!allowedContentTypes.some(type => contentType.includes(type))) {
      logSecurity('Content-Type non autorisé', {
        ip: req.ip,
        path: req.path,
        method: req.method,
        contentType,
        contentLength: req.headers['content-length']
      });
      return res.status(415).json({
        success: false,
        message: 'Type de contenu non supporté'
      });
    }
  }

  next();
};

// Middleware pour limiter la taille des requêtes
const limitRequestSize = (req, res, next) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > maxSize) {
    logSecurity('Requête trop volumineuse', {
      ip: req.ip,
      path: req.path,
      size: req.headers['content-length']
    });
    return res.status(413).json({
      success: false,
      message: 'Requête trop volumineuse'
    });
  }

  next();
};

// Middleware pour bloquer les méthodes HTTP dangereuses
const blockDangerousMethods = (req, res, next) => {
  // Autoriser OPTIONS pour les pré-requests CORS
  if (req.method === 'OPTIONS') {
    return next();
  }

  const dangerousMethods = ['TRACE', 'TRACK'];
  
  if (dangerousMethods.includes(req.method)) {
    logSecurity('Méthode HTTP dangereuse', {
      ip: req.ip,
      method: req.method,
      path: req.path
    });
    return res.status(405).json({
      success: false,
      message: 'Méthode non autorisée'
    });
  }

  next();
};

// Middleware pour ajouter des headers de sécurité supplémentaires
const addSecurityHeaders = (req, res, next) => {
  // Headers de sécurité supplémentaires
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  
  // Header personnalisé pour identifier l'API
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Powered-By', 'CommuniConnect API');
  
  next();
};

// Middleware pour logger les tentatives d'attaque
const logAttackAttempts = (req, res, next) => {
  const suspiciousHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'x-forwarded-proto',
    'x-forwarded-host'
  ];

  const suspiciousHeadersFound = suspiciousHeaders.filter(header => 
    req.headers[header]
  );

  if (suspiciousHeadersFound.length > 0) {
    logSecurity('Headers suspects détectés', {
      ip: req.ip,
      path: req.path,
      suspiciousHeaders: suspiciousHeadersFound,
      allHeaders: req.headers
    });
  }

  next();
};

module.exports = {
  corsOptions,
  helmetConfig,
  blockInjection,
  validateContentType,
  limitRequestSize,
  blockDangerousMethods,
  addSecurityHeaders,
  logAttackAttempts
}; 