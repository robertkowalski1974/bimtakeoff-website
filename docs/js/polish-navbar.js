// Polish Navbar Translation Script
// This script automatically translates the navbar when on Polish pages

(function() {
    // Check if we're on a Polish page
    if (!window.location.pathname.includes('/pl/')) {
        return; // Exit if not on Polish page
    }

    // Define all text translations
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

    // Define link translations (English path -> Polish path)
    // IMPORTANT: Use absolute paths starting with /pl/ to avoid relative path issues
    // This ensures links work correctly from any subdirectory
    const linkTranslations = {
        // HOME/INDEX - Use absolute paths
        '../index.html': '/pl/index.html',
        './index.html': '/pl/index.html',
        '/index.html': '/pl/index.html',
        '/': '/pl/',
        
        // CONTACT - Use absolute paths
        '../contact.html': '/pl/kontakt.html',
        './contact.html': '/pl/kontakt.html',
        '/contact.html': '/pl/kontakt.html',
        
        // SERVICES - Use absolute paths
        '../services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        './services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        '/services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        
        // COMING SOON - Use absolute paths
        '../coming-soon.html': '/pl/coming-soon.html',
        './coming-soon.html': '/pl/coming-soon.html',
        '/coming-soon.html': '/pl/coming-soon.html'
    };

    // Function to translate text
    function translateText(element) {
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
        }
    }

    // Function to translate links
    function translateLinks() {
        // Translate all links in navbar
        const navLinks = document.querySelectorAll('.navbar a[href], .dropdown-item[href]');
        navLinks.forEach(link => {
            let href = link.getAttribute('href');
            
            // Handle absolute URLs by extracting the pathname
            if (href && href.includes('://')) {
                try {
                    const url = new URL(href);
                    href = url.pathname;
                } catch (e) {
                    // If URL parsing fails, continue with original href
                }
            }
            
            // Check if we have a translation for this path
            if (linkTranslations[href]) {
                link.setAttribute('href', linkTranslations[href]);
            }
        });
    }

    // Function to translate navbar
    function translateNavbar() {
        // Replace phone number for Polish site
        const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
        phoneLinks.forEach(link => {
            link.href = 'tel:+48508209313';
            link.textContent = '+48 508 209 313';
        });
        
        // Translate links FIRST before translating text
        translateLinks();
        
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
