@echo off
echo ========================================
echo   CommuniConnect - Déploiement Prod
echo ========================================
echo.

echo 🔧 Configuration de la production...
echo.

echo 📁 Copie des fichiers de configuration...
if exist "server\env.render.js" (
    copy "server\env.render.js" "server\.env" >nul
    echo ✅ Configuration serveur Render copiée
) else (
    echo ❌ Fichier server\env.render.js manquant
)

if exist "client\env.vercel.js" (
    copy "client\env.vercel.js" "client\.env.production" >nul
    echo ✅ Configuration client Vercel copiée
) else (
    echo ❌ Fichier client\env.vercel.js manquant
)

echo.
echo 🚀 Déploiement du serveur sur Render...
echo 📍 URL: https://communiconnect-authentification.onrender.com
echo.

echo 🌐 Déploiement du client sur Vercel...
echo 📍 URL: https://communiconnectgn224-kbaysrqw3-alpha-oumar-barry-s-projects.vercel.app
echo.

echo ✅ Configuration de production terminée !
echo.
echo 📋 Prochaines étapes:
echo 1. Commitez et poussez les changements sur GitHub
echo 2. Render déploiera automatiquement le serveur
echo 3. Vercel déploiera automatiquement le client
echo 4. Vérifiez que les domaines OAuth incluent votre URL Vercel
echo.
pause
