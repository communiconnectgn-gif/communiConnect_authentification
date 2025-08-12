# Configuration CommuniConnect - Serveur (DÉFINITIVE)
# ======================================================

# Configuration du serveur
PORT=5001
NODE_ENV=development

# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/communiconnect

# JWT Secret
JWT_SECRET=communiconnect-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRE=7d

# Google OAuth 2.0 - CLÉS CONFIGURÉES
GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/oauth/callback

# Configuration CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Sécurité
HELMET_ENABLED=true
CORS_ENABLED=true
RATE_LIMIT_ENABLED=true

# ✅ Configuration OAuth Google PERMANENTE et DÉFINITIVE !
# Timestamp: 2025-08-11T15:45:00.000Z
