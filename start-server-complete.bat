@echo off
echo ========================================
echo   CommuniConnect Server - Configuration Complete
echo ========================================
echo.

REM Configuration OAuth Google
set GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
set GOOGLE_CLIENT_SECRET=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
set GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/oauth/callback

REM Configuration serveur
set PORT=5000
set NODE_ENV=development
set CORS_ORIGIN=http://localhost:3000

REM Configuration JWT
set JWT_SECRET=communiconnect-super-secret-jwt-key-2024-change-in-production
set JWT_EXPIRE=7d

REM Configuration MongoDB
set MONGODB_URI=mongodb+srv://communiconnect:communiconnect123@cluster0.7z6yujq.mongodb.net/communiconnect?retryWrites=true&w=majority

echo Configuration complete:
echo   - Google Client ID: %GOOGLE_CLIENT_ID%
echo   - Redirect URI: %GOOGLE_REDIRECT_URI%
echo   - Port: %PORT%
echo   - JWT Expire: %JWT_EXPIRE%
echo   - MongoDB: Configure
echo.

echo Demarrage du serveur sur le port 5000...
echo.

cd server
node index.js

pause
