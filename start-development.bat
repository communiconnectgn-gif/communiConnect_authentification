@echo off
echo ========================================
echo   CommuniConnect - Démarrage Dev
echo ========================================
echo.

echo 🔧 Configuration de l'environnement...
echo.

echo 📁 Copie des fichiers de configuration...
if exist "server\env.local.js" (
    copy "server\env.local.js" "server\.env" >nul
    echo ✅ Configuration serveur copiée
) else (
    echo ❌ Fichier server\env.local.js manquant
)

if exist "client\env.local.js" (
    copy "client\env.local.js" "client\.env" >nul
    echo ✅ Configuration client copiée
) else (
    echo ❌ Fichier client\env.local.js manquant
)

echo.
echo 🚀 Démarrage du serveur sur le port 5001...
start "CommuniConnect Server" cmd /k "cd server && npm start"

echo.
echo ⏳ Attente du démarrage du serveur...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Démarrage du client sur le port 3000...
start "CommuniConnect Client" cmd /k "cd client && npm start"

echo.
echo ✅ CommuniConnect est en cours de démarrage...
echo.
echo 📍 Serveur: http://localhost:5001
echo 🌐 Client:  http://localhost:3000
echo.
echo 🔑 Google OAuth configuré et prêt
echo.
pause
