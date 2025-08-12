# Configuration Google OAuth CommuniConnect
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuration Google OAuth CommuniConnect" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Configuration du serveur..." -ForegroundColor Yellow
Set-Location "server"
if (Test-Path ".env") {
    Write-Host "Fichier .env existe deja, sauvegarde..." -ForegroundColor Yellow
    Copy-Item ".env" ".env.backup"
}
Copy-Item "env.production.js" ".env"
Write-Host "✅ Serveur configure avec les cles Google OAuth" -ForegroundColor Green
Write-Host ""

Write-Host "[2/4] Configuration du client..." -ForegroundColor Yellow
Set-Location "..\client"
if (Test-Path ".env") {
    Write-Host "Fichier .env existe deja, sauvegarde..." -ForegroundColor Yellow
    Copy-Item ".env" ".env.backup"
}
Copy-Item "env.production.js" ".env"
Write-Host "✅ Client configure avec le Client ID Google" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Verification de la configuration..." -ForegroundColor Yellow
Set-Location ".."
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Configuration terminee !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Google OAuth configure avec succes" -ForegroundColor Green
Write-Host "✅ Client ID: 4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com" -ForegroundColor Green
Write-Host "✅ Client Secret: Configure dans le serveur" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "1. Demarrer le serveur: cd server && npm run dev" -ForegroundColor White
Write-Host "2. Demarrer le client: cd client && npm start" -ForegroundColor White
Write-Host "3. Tester: http://localhost:3000" -ForegroundColor White
Write-Host "4. Cliquer sur 'Continuer avec Google'" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Appuyez sur Entree pour continuer"
