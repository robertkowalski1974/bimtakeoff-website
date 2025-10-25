#!/bin/bash

echo "==================================="
echo "Applying Direct Polish Translation Fix"
echo "==================================="
echo ""

# This script injects the translation JavaScript directly into the Polish HTML files

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Create the inline translation script
cat > /tmp/polish-translation.txt << 'EOF'
<script>
// Polish Navbar Translation - Inline Version
(function() {
    // Only run on Polish pages
    if (!window.location.pathname.includes('/pl/')) return;
    
    const translations = {
        // Main navbar items
        'Home': 'Strona Główna',
        'Services': 'Usługi',
        'Industries': 'Branże',
        'Portfolio': 'Portfolio',
        'Resources': 'Zasoby',
        'About': 'O Nas',
        'Contact': 'Kontakt',
        
        // Services dropdown
        'Cost Estimation & Budget Planning': 'Kosztorysowanie i Planowanie Budżetu',
        'Trade-Specific Specialist Services': 'Specjalistyczne Usługi Branżowe',
        'Automated Quantity Takeoff': 'Zautomatyzowany Przedmiar Ilości',
        'Fast-Track Cost Control': 'Szybka Kontrola Kosztów',
        'BREEAM/ESG Cost Modeling': 'Modelowanie Kosztów BREEAM/ESG',
        'MEP Infrastructure Precision': 'Precyzja Infrastruktury MEP',
        'Multi-Scenario Analysis': 'Analiza Wieloscenariuszowa',
        'Comprehensive Reporting': 'Kompleksowe Raportowanie',
        'Bid Writing & Bid Management': 'Pisanie Ofert i Zarządzanie Przetargami',
        'Traditional Quantity Takeoff': 'Tradycyjny Przedmiar Ilości',
        'Construction Data Management': 'Zarządzanie Danymi Budowlanymi',
        'Construction Logistics': 'Logistyka Budowlana',
        
        // Industries dropdown
        'Warehouses & Logistics': 'Magazyny i Logistyka',
        'Data Centers': 'Centra Danych',
        'Residential Development': 'Deweloperstwo Mieszkaniowe',
        'Remediation': 'Remediacja',
        'Commercial Development': 'Deweloperstwo Komercyjne',
        'Healthcare & Medical Facilities': 'Opieka Zdrowotna i Obiekty Medyczne',
        'Industrial & Manufacturing': 'Przemysł i Produkcja',
        'Infrastructure & Civil Works': 'Infrastruktura i Roboty Inżynieryjne',
        
        // Resources dropdown
        'BIM 2030 Guide': 'Przewodnik BIM 2030',
        'ROI Calculator': 'Kalkulator ROI',
        'Case Studies': 'Studia Przypadków',
        
        // Footer
        'All rights reserved': 'Wszelkie prawa zastrzeżone',
        'Professional BIM 5D Cost Estimation Services': 'Profesjonalne Usługi Kosztorysowania BIM 5D',
        'Quick Links': 'Szybkie Linki',
        'Privacy Policy': 'Polityka Prywatności',
        'Terms of Service': 'Warunki Usługi'
    };

    function translatePage() {
        // Translate menu items
        document.querySelectorAll('.menu-text').forEach(element => {
            const text = element.textContent.trim();
            if (translations[text]) {
                element.textContent = translations[text];
            }
        });
        
        // Translate dropdown items
        document.querySelectorAll('.dropdown-text').forEach(element => {
            const text = element.textContent.trim();
            if (translations[text]) {
                element.textContent = translations[text];
            }
        });
        
        // Translate footer
        const footer = document.querySelector('.nav-footer');
        if (footer) {
            const walker = document.createTreeWalker(
                footer,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue && node.nodeValue.trim()) {
                    let text = node.nodeValue;
                    Object.keys(translations).forEach(eng => {
                        if (text.includes(eng)) {
                            text = text.replace(eng, translations[eng]);
                        }
                    });
                    node.nodeValue = text;
                }
            }
        }
        
        // Set language
        document.documentElement.lang = 'pl';
    }

    // Run immediately
    translatePage();
    
    // Also run after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', translatePage);
    }
    
    // And after a short delay for dynamic content
    setTimeout(translatePage, 100);
})();
</script>
EOF

echo "Injecting translation script into Polish HTML files..."

# Function to inject script before </body> tag
inject_script() {
    local file=$1
    if [ -f "$file" ]; then
        # Remove old external script references
        sed -i.bak '/<script src=".*polish-navbar.js"><\/script>/d' "$file"
        
        # Check if our inline script is already there
        if ! grep -q "Polish Navbar Translation - Inline Version" "$file"; then
            # Insert the inline script before </body>
            sed -i.bak '/<\/body>/r /tmp/polish-translation.txt' "$file"
            echo -e "${GREEN}✓ Injected into $(basename $file)${NC}"
        else
            echo "  Script already present in $(basename $file)"
        fi
        
        # Clean up backup
        rm "${file}.bak" 2>/dev/null
    fi
}

# Inject into all Polish HTML files
inject_script "docs/pl/index.html"
inject_script "docs/pl/coming-soon.html"

echo ""
echo "Verifying the fix..."
if grep -q "Strona Główna" /tmp/polish-translation.txt; then
    echo -e "${GREEN}✓ Translation script contains Polish text${NC}"
fi

echo ""
echo "==================================="
echo -e "${GREEN}Direct injection complete!${NC}"
echo "==================================="
echo ""
echo "Refresh the Polish page to see the translations:"
echo "  http://localhost:8000/pl/"
echo ""
