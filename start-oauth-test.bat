@echo off
chcp 65001 >nul
echo.
echo 🚀 DÉMARRAGE SERVEUR TEST OAUTH - CommuniConnect
echo ================================================
echo.

echo 📍 Port: 5001
echo 🌐 URL: http://localhost:5001
echo 🔐 OAuth: http://localhost:5001/api/auth/oauth/status
echo.

echo 🚀 Démarrage du serveur...
echo.

cd /d "%~dp0"
node server-test-oauth.js

echo.
echo 🔴 Serveur arrêté
pause
