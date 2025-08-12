@echo off
chcp 65001 >nul
echo.
echo 🚀 DÉMARRAGE COMPLET OAUTH - CommuniConnect
echo ============================================
echo.

echo 📍 Ports utilisés :
echo    - Serveur OAuth : 5001
echo    - Client React  : 3000
echo.

echo 🚀 Démarrage du serveur OAuth...
echo.

REM Démarrer le serveur OAuth en arrière-plan
start "Serveur OAuth" cmd /c "cd /d %~dp0 && node server-test-simple.js"

echo ⏳ Attente du démarrage du serveur...
timeout /t 5 /nobreak >nul

echo.
echo 🚀 Démarrage du client React...
echo.

REM Démarrer le client React en arrière-plan
start "Client React" cmd /c "cd /d %~dp0\client && npm start"

echo ⏳ Attente du démarrage du client...
timeout /t 10 /nobreak >nul

echo.
echo ✅ SERVEURS DÉMARRÉS !
echo.
echo 🔗 URLs de test :
echo    - Serveur OAuth : http://localhost:5001
echo    - Client React  : http://localhost:3000
echo    - Page Login    : http://localhost:3000/login
echo.
echo 🧪 Test OAuth :
echo    1. Ouvrez http://localhost:3000/login
echo    2. Cliquez sur "Continuer avec Google"
echo    3. Testez le flux d'authentification
echo.

echo 🛑 Pour arrêter les serveurs, fermez les fenêtres :
echo    - "Serveur OAuth"
echo    - "Client React"
echo.

pause
