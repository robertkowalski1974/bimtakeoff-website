#!/bin/bash

# Bilingual Quarto Website - Test and Deploy Script
# This script will clean, render, and test the bilingual setup

echo "==================================="
echo "BIM Takeoff Website - Bilingual Fix"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean previous builds
echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
rm -rf docs/_site
rm -rf docs/pl
rm -rf _site
echo -e "${GREEN}✓ Cleaned${NC}"
echo ""

# Step 2: Render from root (this generates both English and Polish)
echo -e "${YELLOW}Step 2: Rendering website from root directory...${NC}"
quarto render
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Rendered successfully${NC}"
else
    echo -e "${RED}✗ Rendering failed${NC}"
    exit 1
fi
echo ""

# Step 3: Check if Polish files were created
echo -e "${YELLOW}Step 3: Verifying Polish files...${NC}"
if [ -f "docs/pl/index.html" ]; then
    echo -e "${GREEN}✓ Polish index.html exists${NC}"
else
    echo -e "${RED}✗ Polish index.html NOT found${NC}"
    exit 1
fi
echo ""

# Step 4: Check if translation script is included
echo -e "${YELLOW}Step 4: Checking translation script inclusion...${NC}"
if grep -q "Bilingual translation script initialized" docs/pl/index.html; then
    echo -e "${GREEN}✓ Enhanced translation script is included${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Translation script may not be properly included${NC}"
fi
echo ""

# Step 5: Display instructions
echo -e "${GREEN}==================================="
echo -e "Bilingual setup complete!"
echo -e "===================================${NC}"
echo ""
echo "To test locally:"
echo "  1. Run: quarto preview"
echo "  2. Navigate to English page: http://localhost:XXXX/"
echo "  3. Click 'PL' button to go to: http://localhost:XXXX/pl/"
echo "  4. Verify navbar and footer are in Polish"
echo ""
echo "To deploy to GitHub Pages:"
echo "  1. Commit changes: git add -A && git commit -m 'Fix bilingual navbar/footer'"
echo "  2. Push: git push origin main"
echo "  3. Website will be live at: https://robertkowalski1974.github.io/bimtakeoff-website"
echo ""
echo -e "${YELLOW}Troubleshooting:${NC}"
echo "  - If navbar/footer still in English, check browser console (F12)"
echo "  - Look for '[BilingualNav]' debug messages"
echo "  - Clear browser cache and reload"
echo ""
