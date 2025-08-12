@echo off
chcp 65001 >nul
echo.
echo 🔐 TEST AUTHENTIFICATION GOOGLE OAUTH - CommuniConnect
echo ======================================================
echo.

echo 📋 Vérification des prérequis...
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé ou n'est pas dans le PATH
    echo    Installez Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté

REM Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
)

echo ✅ Dépendances installées
echo.

echo 🚀 Démarrage du serveur...
echo.

REM Démarrer le serveur en arrière-plan
start "CommuniConnect Server" cmd /c "cd server && npm start"

echo ⏳ Attente du démarrage du serveur...
timeout /t 5 /nobreak >nul

echo.
echo 🔍 Test de la configuration OAuth...
echo.

REM Tester la configuration OAuth
node test-oauth-complet-final.js

echo.
echo 📱 Test manuel de l'interface :
echo    1. Ouvrez votre navigateur sur http://localhost:3000
echo    2. Cliquez sur "Continuer avec Google"
echo    3. Suivez le processus d'autorisation
echo    4. Vérifiez la redirection et la connexion
echo.

echo 🛑 Pour arrêter le serveur, fermez la fenêtre "CommuniConnect Server"
echo.

pause
