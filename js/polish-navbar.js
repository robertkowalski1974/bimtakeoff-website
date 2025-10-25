// Polish Navbar Translation Script
// This script automatically translates the navbar when on Polish pages

(function() {
    // Check if we're on a Polish page
    if (!window.location.pathname.includes('/pl/')) {
        return; // Exit if not on Polish page
    }

    // Define all translations
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

    // Function to translate text
    function translateText(element) {
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
        }
    }

    // Function to translate navbar
    function translateNavbar() {
        // Replace phone number for Polish site
        const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
        phoneLinks.forEach(link => {
            link.href = 'tel:+48508209313';
            link.textContent = '+48 508 209 313';
        });
        // Translate menu items
        document.querySelectorAll('.menu-text').forEach(translateText);
        document.querySelectorAll('.dropdown-text').forEach(translateText);
        
        // Translate footer
        const footer = document.querySelector('.nav-footer');
        if (footer) {
            // Get all text nodes in footer
            const walker = document.createTreeWalker(
                footer,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.trim()) {
                    textNodes.push(node);
                }
            }
            
            // Replace text in footer
            textNodes.forEach(node => {
                let text = node.nodeValue;
                Object.keys(translations).forEach(eng => {
                    text = text.replace(eng, translations[eng]);
                });
                node.nodeValue = text;
            });
        }
        
        // Set language attribute
        document.documentElement.lang = 'pl';
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', translateNavbar);
    } else {
        // DOM is already ready
        translateNavbar();
    }
    
    // Also run after a short delay to catch any dynamically loaded content
    setTimeout(translateNavbar, 100);
})();
