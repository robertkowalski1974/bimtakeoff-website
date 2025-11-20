#!/bin/bash

echo "==================================="
echo "BIM Takeoff - Bilingual Deployment"
echo "With Fixed Polish Navbar"
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

# Step 1: Clean previous Polish builds
echo "Step 1: Cleaning previous Polish builds..."
rm -rf docs/pl
rm -rf pl/_site
echo -e "${GREEN}✓ Cleaned${NC}"

# Step 2: Build Polish site in isolation
echo ""
echo "Step 2: Building Polish site with Polish navbar..."
cd pl

# Render the Polish site using its own config
QUARTO_PROJECT_DIR=. quarto render

# Check if _site directory was created
if [ -d "_site" ]; then
    echo -e "${GREEN}✓ Polish site built successfully${NC}"
else
    # If _site wasn't created, try with explicit output
    quarto render --output-dir _site
    check_status
fi

cd ..

# Step 3: Copy Polish site to docs/pl
echo ""
echo "Step 3: Copying Polish site to docs/pl..."
mkdir -p docs/pl

# Check where the Polish output actually is
if [ -d "pl/_site" ]; then
    cp -r pl/_site/* docs/pl/
    echo -e "${GREEN}✓ Copied from pl/_site${NC}"
elif [ -d "docs/pl" ] && [ "$(ls -A docs/pl)" ]; then
    echo -e "${GREEN}✓ Polish files already in docs/pl${NC}"
else
    echo -e "${RED}✗ Polish site not found${NC}"
    exit 1
fi

# Step 4: Build English site
echo ""
echo "Step 4: Building English site..."
quarto render
check_status

# Step 5: Fix any absolute paths in Polish pages
echo ""
echo "Step 5: Fixing paths in Polish pages..."

# Fix the language switcher link to point to correct English page
if [ -f "docs/pl/index.html" ]; then
    # Fix the EN link to go up one level
    sed -i.bak 's|href="../index.html"|href="../index.html"|g' docs/pl/index.html
    sed -i.bak 's|href="index.html">EN|href="../index.html">EN|g' docs/pl/index.html
    rm docs/pl/index.html.bak 2>/dev/null
    echo -e "${GREEN}✓ Fixed language switcher paths${NC}"
fi

# Step 6: Verify Polish navbar
echo ""
echo "Step 6: Verifying Polish navbar is present..."
if grep -q "Strona Główna" docs/pl/index.html; then
    echo -e "${GREEN}✓ Polish navbar confirmed: 'Strona Główna' found${NC}"
    if grep -q "Usługi" docs/pl/index.html; then
        echo -e "${GREEN}✓ Polish navbar confirmed: 'Usługi' found${NC}"
    fi
    if grep -q "Branże" docs/pl/index.html; then
        echo -e "${GREEN}✓ Polish navbar confirmed: 'Branże' found${NC}"
    fi
else
    echo -e "${RED}✗ Warning: Polish navbar terms not found${NC}"
    echo "Checking what navbar text is present..."
    grep -o 'menu-text">[^<]*' docs/pl/index.html | head -5
fi

# Step 7: Git operations (optional)
if [ "$1" == "--deploy" ]; then
    echo ""
    echo "Step 7: Deploying to GitHub..."
    git add .
    check_status
    
    COMMIT_MSG=${2:-"Update bilingual site with fixed Polish navbar"}
    git commit -m "$COMMIT_MSG"
    check_status
    
    git push origin main
    check_status
fi

echo ""
echo "==================================="
echo -e "${GREEN}Build Complete!${NC}"
echo "==================================="
echo ""
echo "Your website structure:"
echo -e "${BLUE}English: docs/index.html${NC}"
echo -e "${BLUE}Polish:  docs/pl/index.html${NC}"
echo ""
echo "To test locally:"
echo "  python3 -m http.server 8000 --directory docs"
echo ""
echo "Then visit:"
echo "  English: http://localhost:8000/"
echo "  Polish:  http://localhost:8000/pl/"
echo ""
if [ "$1" != "--deploy" ]; then
    echo "To deploy to GitHub Pages, run:"
    echo "  ./deploy-bilingual-fixed.sh --deploy"
fi
echo ""
