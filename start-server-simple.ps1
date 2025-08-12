# Script PowerShell simple pour démarrer CommuniConnect
# Exécutez ce script en tant qu'administrateur

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CommuniConnect Server - Simple Mode" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration OAuth Google
$env:GOOGLE_CLIENT_ID = "4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "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"
$env:GOOGLE_REDIRECT_URI = "http://localhost:5000/api/auth/oauth/callback"

# Configuration serveur
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:CORS_ORIGIN = "http://localhost:3000"

Write-Host "Configuration OAuth:" -ForegroundColor Yellow
Write-Host "  - Client ID: $env:GOOGLE_CLIENT_ID" -ForegroundColor White
Write-Host "  - Redirect URI: $env:GOOGLE_REDIRECT_URI" -ForegroundColor White
Write-Host "  - Port: $env:PORT" -ForegroundColor White
Write-Host "  - CORS Origin: $env:CORS_ORIGIN" -ForegroundColor White
Write-Host ""

Write-Host "Demarrage du serveur sur le port 5000..." -ForegroundColor Green
Write-Host ""

# Aller dans le dossier serveur
Set-Location "server"

# Démarrer le serveur
try {
    node index.js
} catch {
    Write-Host "Erreur lors du demarrage du serveur: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Serveur arrete" -ForegroundColor Red
Read-Host "Appuyez sur Entree pour fermer..."
