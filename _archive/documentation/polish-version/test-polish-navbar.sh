#!/bin/bash

echo "==================================="
echo "Testing Polish Navbar Fix"
echo "==================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if Polish index.html exists
if [ ! -f "docs/pl/index.html" ]; then
    echo -e "${RED}✗ Polish index.html not found at docs/pl/index.html${NC}"
    exit 1
fi

echo "Checking Polish navbar elements..."
echo ""

# Test for Polish navbar items
declare -A required_terms=(
    ["Strona Główna"]="Home page"
    ["Usługi"]="Services"
    ["Branże"]="Industries"
    ["Portfolio"]="Portfolio"
    ["Zasoby"]="Resources"
    ["O Nas"]="About"
    ["Kontakt"]="Contact"
)

found_count=0
missing_count=0

for polish_term in "${!required_terms[@]}"; do
    english_equiv="${required_terms[$polish_term]}"
    if grep -q "$polish_term" docs/pl/index.html; then
        echo -e "${GREEN}✓ Found: '$polish_term' (replaces '$english_equiv')${NC}"
        ((found_count++))
    else
        echo -e "${RED}✗ Missing: '$polish_term' (should replace '$english_equiv')${NC}"
        ((missing_count++))
    fi
done

echo ""
echo "----------------------------------------"
echo "Results:"
echo -e "${GREEN}Found: $found_count Polish terms${NC}"
if [ $missing_count -gt 0 ]; then
    echo -e "${RED}Missing: $missing_count Polish terms${NC}"
else
    echo -e "${GREEN}All navbar terms are in Polish!${NC}"
fi
echo "----------------------------------------"
echo ""

# Check language attribute
if grep -q 'lang="pl"' docs/pl/index.html; then
    echo -e "${GREEN}✓ Language attribute is set to Polish (lang=\"pl\")${NC}"
else
    echo -e "${RED}✗ Language attribute is not set to Polish${NC}"
fi

# Check footer
echo ""
echo "Checking Polish footer..."
if grep -q "Wszelkie prawa zastrzeżone" docs/pl/index.html; then
    echo -e "${GREEN}✓ Footer is in Polish${NC}"
else
    echo -e "${RED}✗ Footer is still in English${NC}"
fi

echo ""
echo "==================================="
if [ $missing_count -eq 0 ]; then
    echo -e "${GREEN}SUCCESS: Polish navbar is working!${NC}"
    echo "==================================="
    echo ""
    echo "You can now:"
    echo "1. Test locally: python3 -m http.server 8000 --directory docs"
    echo "2. Visit: http://localhost:8000/pl/"
    echo "3. Deploy: git add . && git commit -m 'Fix Polish navbar' && git push"
else
    echo -e "${RED}PARTIAL SUCCESS: Some terms are still in English${NC}"
    echo "==================================="
    echo ""
    echo "Try running the post-processing script:"
    echo "  ./polish-navbar-postprocess.sh"
fi
echo ""
