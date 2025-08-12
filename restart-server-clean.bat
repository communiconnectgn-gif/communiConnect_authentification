@echo off
echo ========================================
echo   Redemarrage propre du serveur
echo ========================================
echo.

REM Arrêter tous les processus Node.js
echo Arret des processus Node.js...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Configuration OAuth Google
set GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
set GOOGLE_CLIENT_SECRET=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
set GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/oauth/callback

REM Configuration serveur
set PORT=5000
set NODE_ENV=development
set CORS_ORIGIN=http://localhost:3000

echo Configuration OAuth:
echo   - Client ID: %GOOGLE_CLIENT_ID%
echo   - Redirect URI: %GOOGLE_REDIRECT_URI%
echo   - Port: %PORT%
echo.

echo Demarrage du serveur sur le port 5000...
echo.

cd server
node index.js

pause
