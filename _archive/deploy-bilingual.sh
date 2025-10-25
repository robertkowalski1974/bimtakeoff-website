#!/bin/bash

echo "==================================="
echo "BIM Takeoff Website Deployment"
echo "English + Polish Versions"
echo "==================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command was successful
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Success${NC}"
    else
        echo -e "${RED}✗ Failed${NC}"
        exit 1
    fi
}

echo "Step 1: Building English version..."
quarto render
check_status

echo ""
echo "Step 2: Building Polish version..."
cd pl
quarto render
check_status
cd ..

echo ""
echo "Step 3: Copying Polish files to docs/pl..."
if [ ! -d "docs/pl" ]; then
    mkdir -p docs/pl
fi
# The Polish render should have created files in docs/pl already
echo -e "${GREEN}✓ Polish files ready${NC}"

echo ""
echo "Step 4: Git operations..."
echo "Adding all changes to git..."
git add .
check_status

echo ""
echo "Committing changes..."
COMMIT_MSG=${1:-"Update website - English and Polish versions"}
git commit -m "$COMMIT_MSG"
check_status

echo ""
echo "Pushing to GitHub..."
git push origin main
check_status

echo ""
echo "==================================="
echo -e "${GREEN}Deployment Complete!${NC}"
echo "==================================="
echo ""
echo "Your website will be available at:"
echo -e "${BLUE}English: https://robertkowalski1974.github.io/bimtakeoff-website/${NC}"
echo -e "${BLUE}Polish:  https://robertkowalski1974.github.io/bimtakeoff-website/pl/${NC}"
echo ""
echo "Note: GitHub Pages may take 2-5 minutes to update."
echo ""
