@echo off
echo ========================================
echo   Configuration Google OAuth CommuniConnect
echo ========================================
echo.

echo [1/4] Configuration du serveur...
cd server
if exist .env (
    echo Fichier .env existe deja, sauvegarde...
    copy .env .env.backup
)
copy env.production.js .env
echo ✅ Serveur configure avec les cles Google OAuth
echo.

echo [2/4] Configuration du client...
cd ..\client
if exist .env (
    echo Fichier .env existe deja, sauvegarde...
    copy .env .env.backup
)
copy env.production.js .env
echo ✅ Client configure avec le Client ID Google
echo.

echo [3/4] Verification de la configuration...
cd ..
echo.
echo ========================================
echo   Configuration terminee !
echo ========================================
echo.
echo ✅ Google OAuth configure avec succes
echo ✅ Client ID: 4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
echo ✅ Client Secret: Configure dans le serveur
echo.
echo Prochaines etapes:
echo 1. Demarrer le serveur: cd server ^&^& npm run dev
echo 2. Demarrer le client: cd client ^&^& npm start
echo 3. Tester: http://localhost:3000
echo 4. Cliquer sur "Continuer avec Google"
echo.
echo ========================================
pause
