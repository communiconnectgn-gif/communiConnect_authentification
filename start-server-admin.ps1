# Script PowerShell pour démarrer CommuniConnect en mode administrateur
# Exécutez ce script en tant qu'administrateur pour résoudre les problèmes de permission

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CommuniConnect Server - Admin Mode" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier les droits administrateur
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "❌ Ce script doit être exécuté en tant qu'administrateur !" -ForegroundColor Red
    Write-Host "   Clic droit sur PowerShell > 'Exécuter en tant qu'administrateur'" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

Write-Host "✅ Mode administrateur détecté" -ForegroundColor Green
Write-Host ""

# Configuration OAuth Google
$env:GOOGLE_CLIENT_ID = "4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "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"
$env:GOOGLE_REDIRECT_URI = "http://localhost:5000/api/auth/oauth/callback"

# Configuration serveur
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:CORS_ORIGIN = "http://localhost:3000"

Write-Host "📋 Configuration OAuth:" -ForegroundColor Yellow
Write-Host "   - Client ID: $env:GOOGLE_CLIENT_ID" -ForegroundColor White
Write-Host "   - Redirect URI: $env:GOOGLE_REDIRECT_URI" -ForegroundColor White
Write-Host "   - Port: $env:PORT" -ForegroundColor White
Write-Host "   - CORS Origin: $env:CORS_ORIGIN" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Démarrage du serveur sur le port 5000..." -ForegroundColor Green
Write-Host ""

# Aller dans le dossier serveur
Set-Location "server"

# Démarrer le serveur
try {
    node index.js
} catch {
    Write-Host "❌ Erreur lors du démarrage du serveur: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔴 Serveur arrêté" -ForegroundColor Red
Read-Host "Appuyez sur Entrée pour fermer..."
