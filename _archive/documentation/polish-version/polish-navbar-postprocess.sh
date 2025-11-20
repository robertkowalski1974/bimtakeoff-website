#!/bin/bash

echo "==================================="
echo "Polish Navbar Post-Processing Fix"
echo "==================================="
echo ""

# This script directly modifies the generated Polish HTML files
# to replace English navbar text with Polish translations

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Define translations
declare -A translations=(
    ["Home"]="Strona Główna"
    ["Services"]="Usługi"
    ["Industries"]="Branże"
    ["Portfolio"]="Portfolio"
    ["Resources"]="Zasoby"
    ["About"]="O Nas"
    ["Contact"]="Kontakt"
    ["Cost Estimation &amp; Budget Planning"]="Kosztorysowanie i Planowanie Budżetu"
    ["Trade-Specific Specialist Services"]="Specjalistyczne Usługi Branżowe"
    ["Automated Quantity Takeoff"]="Zautomatyzowany Przedmiar Ilości"
    ["Fast-Track Cost Control"]="Szybka Kontrola Kosztów"
    ["BREEAM/ESG Cost Modeling"]="Modelowanie Kosztów BREEAM/ESG"
    ["MEP Infrastructure Precision"]="Precyzja Infrastruktury MEP"
    ["Multi-Scenario Analysis"]="Analiza Wieloscenariuszowa"
    ["Comprehensive Reporting"]="Kompleksowe Raportowanie"
    ["Bid Writing &amp; Bid Management"]="Pisanie Ofert i Zarządzanie Przetargami"
    ["Traditional Quantity Takeoff"]="Tradycyjny Przedmiar Ilości"
    ["Construction Data Management"]="Zarządzanie Danymi Budowlanymi"
    ["Construction Logistics"]="Logistyka Budowlana"
    ["Warehouses &amp; Logistics"]="Magazyny i Logistyka"
    ["Data Centers"]="Centra Danych"
    ["Residential Development"]="Deweloperstwo Mieszkaniowe"
    ["Remediation"]="Remediacja"
    ["Commercial Development"]="Deweloperstwo Komercyjne"
    ["Healthcare &amp; Medical Facilities"]="Opieka Zdrowotna i Obiekty Medyczne"
    ["Industrial &amp; Manufacturing"]="Przemysł i Produkcja"
    ["Infrastructure &amp; Civil Works"]="Infrastruktura i Roboty Inżynieryjne"
    ["BIM 2030 Guide"]="Przewodnik BIM 2030"
    ["ROI Calculator"]="Kalkulator ROI"
    ["Case Studies"]="Studia Przypadków"
)

echo "Processing Polish HTML files..."

# Function to replace text in file
replace_in_file() {
    local file=$1
    local search=$2
    local replace=$3
    
    # Use perl for more reliable in-place editing
    perl -pi -e "s|>$search</|>$replace</|g" "$file"
}

# Process all Polish HTML files
for file in docs/pl/*.html; do
    if [ -f "$file" ]; then
        echo "Processing: $(basename $file)"
        
        # Replace navbar text
        for eng in "${!translations[@]}"; do
            pol="${translations[$eng]}"
            replace_in_file "$file" "$eng" "$pol"
        done
        
        # Fix footer text if needed
        perl -pi -e 's|All rights reserved|Wszelkie prawa zastrzeżone|g' "$file"
        perl -pi -e 's|Professional BIM 5D Cost Estimation Services|Profesjonalne Usługi Kosztorysowania BIM 5D|g' "$file"
        perl -pi -e 's|Quick Links|Szybkie Linki|g' "$file"
        perl -pi -e 's|Privacy Policy|Polityka Prywatności|g' "$file"
        perl -pi -e 's|Terms of Service|Warunki Usługi|g' "$file"
        
        # Set language attribute
        perl -pi -e 's|lang="en"|lang="pl"|g' "$file"
    fi
done

# Verify the changes
echo ""
echo "Verifying Polish navbar..."
if grep -q "Strona Główna" docs/pl/index.html; then
    echo -e "${GREEN}✓ Polish navbar confirmed!${NC}"
    echo ""
    echo "Found Polish menu items:"
    grep -o 'menu-text">[^<]*' docs/pl/index.html | head -10
else
    echo -e "${RED}✗ Warning: Polish navbar not found${NC}"
fi

echo ""
echo "==================================="
echo -e "${GREEN}Post-processing complete!${NC}"
echo "==================================="
echo ""
echo "Test locally with:"
echo "  python3 -m http.server 8000 --directory docs"
echo "Then visit http://localhost:8000/pl/"
echo ""
