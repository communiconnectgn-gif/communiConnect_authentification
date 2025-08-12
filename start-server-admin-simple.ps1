# Script PowerShell simplifié pour démarrer CommuniConnect en mode administrateur
Write-Host "========================================"
Write-Host "  CommuniConnect Server - Admin Mode"
Write-Host "========================================"
Write-Host ""

# Vérifier les droits administrateur
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "❌ Ce script doit être exécuté en tant qu'administrateur !"
    Write-Host "   Clic droit sur PowerShell > 'Exécuter en tant qu'administrateur'"
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

Write-Host "✅ Mode administrateur détecté"
Write-Host ""

# Configuration OAuth Google
$env:GOOGLE_CLIENT_ID = "4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "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"
$env:GOOGLE_REDIRECT_URI = "http://localhost:5000/api/auth/oauth/callback"

# Configuration serveur
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:CORS_ORIGIN = "http://localhost:3000"

Write-Host "📋 Configuration OAuth:"
Write-Host "   - Client ID: $env:GOOGLE_CLIENT_ID"
Write-Host "   - Redirect URI: $env:GOOGLE_REDIRECT_URI"
Write-Host "   - Port: $env:PORT"
Write-Host "   - CORS Origin: $env:CORS_ORIGIN"
Write-Host ""

Write-Host "🚀 Démarrage du serveur sur le port 5000..."
Write-Host ""

# Aller dans le dossier serveur
Set-Location "server"

# Démarrer le serveur
Write-Host "Démarrage du serveur..."
node index.js
