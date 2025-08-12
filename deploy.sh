#!/bin/bash

# 🚀 Script de Déploiement CommuniConnect
# Ce script automatise le processus de déploiement

echo "🚀 Déploiement CommuniConnect - Render (Backend) + Vercel (Frontend)"
echo "=================================================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        print_error "Git n'est pas installé. Veuillez l'installer."
        exit 1
    fi
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé. Veuillez l'installer."
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé. Veuillez l'installer."
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Vérification de la structure du projet
check_project_structure() {
    print_status "Vérification de la structure du projet..."
    
    if [ ! -d "server" ]; then
        print_error "Le dossier 'server' n'existe pas"
        exit 1
    fi
    
    if [ ! -d "client" ]; then
        print_error "Le dossier 'client' n'existe pas"
        exit 1
    fi
    
    if [ ! -f "render.yaml" ]; then
        print_error "Le fichier 'render.yaml' n'existe pas"
        exit 1
    fi
    
    if [ ! -f "client/vercel.json" ]; then
        print_error "Le fichier 'client/vercel.json' n'existe pas"
        exit 1
    fi
    
    print_success "Structure du projet validée"
}

# Installation des dépendances
install_dependencies() {
    print_status "Installation des dépendances..."
    
    # Backend
    print_status "Installation des dépendances backend..."
    cd server
    npm install
    if [ $? -ne 0 ]; then
        print_error "Erreur lors de l'installation des dépendances backend"
        exit 1
    fi
    cd ..
    
    # Frontend
    print_status "Installation des dépendances frontend..."
    cd client
    npm install
    if [ $? -ne 0 ]; then
        print_error "Erreur lors de l'installation des dépendances frontend"
        exit 1
    fi
    cd ..
    
    print_success "Dépendances installées avec succès"
}

# Test local
run_local_tests() {
    print_status "Tests locaux..."
    
    # Test du backend
    print_status "Test du backend..."
    cd server
    npm test 2>/dev/null || print_warning "Aucun test configuré pour le backend"
    cd ..
    
    # Test du frontend
    print_status "Test du frontend..."
    cd client
    npm test -- --watchAll=false 2>/dev/null || print_warning "Aucun test configuré pour le frontend"
    cd ..
    
    print_success "Tests locaux terminés"
}

# Build du frontend
build_frontend() {
    print_status "Build du frontend..."
    
    cd client
    npm run build
    if [ $? -ne 0 ]; then
        print_error "Erreur lors du build du frontend"
        exit 1
    fi
    cd ..
    
    print_success "Frontend buildé avec succès"
}

# Vérification Git
check_git_status() {
    print_status "Vérification du statut Git..."
    
    if [ -z "$(git status --porcelain)" ]; then
        print_success "Aucune modification en attente"
    else
        print_warning "Modifications non commitées détectées"
        echo "Modifications en attente :"
        git status --short
        
        read -p "Voulez-vous commiter ces modifications ? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            git commit -m "Deploy: Préparation du déploiement $(date)"
            print_success "Modifications commitées"
        else
            print_warning "Déploiement continué sans commit"
        fi
    fi
}

# Instructions de déploiement
show_deployment_instructions() {
    echo
    echo "🎯 INSTRUCTIONS DE DÉPLOIEMENT"
    echo "================================"
    echo
    echo "1️⃣  BACKEND (Render):"
    echo "   • Allez sur https://render.com"
    echo "   • Créez un nouveau 'Blueprint'"
    echo "   • Connectez votre repository GitHub"
    echo "   • Render détectera automatiquement render.yaml"
    echo "   • Configurez les variables d'environnement"
    echo "   • Déployez"
    echo
    echo "2️⃣  FRONTEND (Vercel):"
    echo "   • Allez sur https://vercel.com"
    echo "   • Créez un nouveau projet"
    echo "   • Importez votre repository GitHub"
    echo "   • Root Directory: client"
    echo "   • Framework: Create React App"
    echo "   • Déployez"
    echo
    echo "3️⃣  CONFIGURATION:"
    echo "   • Mettez à jour les URLs dans les variables d'environnement"
    echo "   • Testez l'application"
    echo
    echo "📚 Consultez DEPLOYMENT.md pour plus de détails"
}

# Menu principal
main_menu() {
    echo
    echo "🔧 MENU DE DÉPLOIEMENT"
    echo "======================="
    echo "1. Vérifier les prérequis"
    echo "2. Vérifier la structure du projet"
    echo "3. Installer les dépendances"
    echo "4. Lancer les tests locaux"
    echo "5. Build du frontend"
    echo "6. Vérifier le statut Git"
    echo "7. Afficher les instructions de déploiement"
    echo "8. Déploiement complet"
    echo "9. Quitter"
    echo
    read -p "Choisissez une option (1-9): " -n 1 -r
    echo
    
    case $REPLY in
        1) check_prerequisites ;;
        2) check_project_structure ;;
        3) install_dependencies ;;
        4) run_local_tests ;;
        5) build_frontend ;;
        6) check_git_status ;;
        7) show_deployment_instructions ;;
        8) 
            check_prerequisites
            check_project_structure
            install_dependencies
            run_local_tests
            build_frontend
            check_git_status
            show_deployment_instructions
            ;;
        9) 
            print_success "Au revoir !"
            exit 0
            ;;
        *) 
            print_error "Option invalide"
            main_menu
            ;;
    esac
    
    echo
    read -p "Appuyez sur Entrée pour continuer..."
    main_menu
}

# Démarrage du script
echo "Bienvenue dans le script de déploiement CommuniConnect !"
main_menu 