# PowerShell script to start CommuniConnect in admin mode
Write-Host "========================================"
Write-Host "  CommuniConnect Server - Admin Mode"
Write-Host "========================================"
Write-Host ""

# Check admin rights
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as administrator!"
    Write-Host "   Right-click on PowerShell > 'Run as administrator'"
    Read-Host "Press Enter to continue..."
    exit 1
}

Write-Host "SUCCESS: Administrator mode detected"
Write-Host ""

# Google OAuth configuration
$env:GOOGLE_CLIENT_ID = "4969411745-ct0qp6ui7f1etrk3hrknaj3duuo34f8k.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "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"
$env:GOOGLE_REDIRECT_URI = "http://localhost:5000/api/auth/oauth/callback"

# Server configuration
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:CORS_ORIGIN = "http://localhost:3000"

Write-Host "OAuth Configuration:"
Write-Host "   - Client ID: $env:GOOGLE_CLIENT_ID"
Write-Host "   - Redirect URI: $env:GOOGLE_REDIRECT_URI"
Write-Host "   - Port: $env:PORT"
Write-Host "   - CORS Origin: $env:CORS_ORIGIN"
Write-Host ""

Write-Host "Starting server on port 5000..."
Write-Host ""

# Go to server directory
Set-Location "server"

# Start server
Write-Host "Starting server..."
node index.js
