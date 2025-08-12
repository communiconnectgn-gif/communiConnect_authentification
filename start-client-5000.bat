@echo off
echo ========================================
echo   CommuniConnect Client - Port 5000
echo ========================================
echo.

REM Configuration OAuth Google pour le client
set REACT_APP_GOOGLE_CLIENT_ID=4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com
set REACT_APP_API_URL=http://localhost:5000
set REACT_APP_SOCKET_URL=http://localhost:5000

echo Configuration OAuth:
echo   - Google Client ID: %REACT_APP_GOOGLE_CLIENT_ID%
echo   - API URL: %REACT_APP_API_URL%
echo   - Socket URL: %REACT_APP_SOCKET_URL%
echo.

echo Demarrage du client React...
echo.

cd client
npm start

pause
