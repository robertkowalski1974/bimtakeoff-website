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
        'Automated Quantity Takeoff': 'Zautomatyzowany Obmiar',
        'Fast-Track Cost Control': 'Bieżąca Kontrola Kosztów',
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
        'Housing Associations': 'Spółdzielnie i Wspólnoty Mieszkaniowe',
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

    // Define Polish-only navbar items to inject
    // These items will ONLY appear on Polish pages, not on English
    const polishOnlyItems = [
        {
            parentMenu: 'Zasoby',  // Which menu to add to (after translation)
            text: 'Przewodnik BIM 2030',
            href: '/pl/coming-soon.html',
            position: 'first'  // 'first', 'last', or index number (0-based)
        }
    ];

    // Define link translations (English path -> Polish path)
    // IMPORTANT: Use absolute paths starting with /pl/ to avoid relative path issues
    // This ensures links work correctly from any subdirectory
    const linkTranslations = {
        // HOME/INDEX - Use absolute paths
        '../index.html': '/pl/index.html',
        './index.html': '/pl/index.html',
        '/index.html': '/pl/index.html',
        'index.html': '/pl/index.html',
        '/': '/pl/',  // This is for Strona Główna, not language switcher
        // Note: Language switcher EN link uses '/' but is excluded by the linkText check
        
        // CONTACT - Use absolute paths
        '../contact.html': '/pl/kontakt.html',
        './contact.html': '/pl/kontakt.html',
        '/contact.html': '/pl/kontakt.html',
        
        // SERVICES - Use absolute paths
        '../services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        './services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        '/services/cost-estimation-budget-planning.html': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        
        '../services/trade-specific-specialist-services.html': '/pl/uslugi/specjalistyczne-branzy-budowlane.html',
        './services/trade-specific-specialist-services.html': '/pl/uslugi/specjalistyczne-branzy-budowlane.html',
        '/services/trade-specific-specialist-services.html': '/pl/uslugi/specjalistyczne-branzy-budowlane.html',
        
         '../services/automated-quantity-takeoff.html': '/pl/uslugi/automatyczny-przedmiar-obmiar.html',
        './services/automated-quantity-takeoff.html': '/pl/uslugi/automatyczny-przedmiar-obmiar.html',
        '/services/automated-quantity-takeoff.html': '/pl/uslugi/automatyczny-przedmiar-obmiar.html',
        
        '../services/fast-track-cost-control.html': '/pl/uslugi/szybka-kontrola-kosztow.html',
        './services/fast-track-cost-control.html': '/pl/uslugi/szybka-kontrola-kosztow.html',
        '/services/fast-track-cost-control.html': '/pl/uslugi/szybka-kontrola-kosztow.html',
        
        '../services/breeam-esg-cost-modeling.html': '/pl/uslugi/kosztorysowanie-breeam-esg.html',
        './services/breeam-esg-cost-modeling.html': '/pl/uslugi/kosztorysowanie-breeam-esg.html',
        '/services/breeam-esg-cost-modeling.html': '/pl/uslugi/kosztorysowanie-breeam-esg.html',
        
        '../services/mep-infrastructure-precision.html': '/pl/uslugi/precyzyjne-kosztorysowanie-mep.html',
        './services/mep-infrastructure-precision.html': '/pl/uslugi/precyzyjne-kosztorysowanie-mep.html',
        '/services/mep-infrastructure-precision.html': '/pl/uslugi/precyzyjne-kosztorysowanie-mep.html',
        
        '../services/multi-scenario-analysis.html': '/pl/uslugi/analiza-wieloscenariuszowa.html',
        './services/multi-scenario-analysis.html': '/pl/uslugi/analiza-wieloscenariuszowa.html',
        '/services/multi-scenario-analysis.html': '/pl/uslugi/analiza-wieloscenariuszowa.html',
        
        '../services/comprehensive-reporting.html': '/pl/uslugi/kompleksowe-raportowanie.html',
        './services/comprehensive-reporting.html': '/pl/uslugi/kompleksowe-raportowanie.html',
        '/services/comprehensive-reporting.html': '/pl/uslugi/kompleksowe-raportowanie.html',
        
        '../services/bid-writing-management.html': '/pl/uslugi/pisanie-ofert-i-zarzadzanie-przetargami.html',
        './services/bid-writing-management.html': '/pl/uslugi/pisanie-ofert-i-zarzadzanie-przetargami.html',
        '/services/bid-writing-management.html': '/pl/uslugi/pisanie-ofert-i-zarzadzanie-przetargami.html',
        
        '../services/traditional-quantity-takeoff.html': '/pl/uslugi/tradycyjny-przedmiar-ilosci.html',
        './services/traditional-quantity-takeoff.html': '/pl/uslugi/tradycyjny-przedmiar-ilosci.html',
        '/services/traditional-quantity-takeoff.html': '/pl/uslugi/tradycyjny-przedmiar-ilosci.html',
        
        '../services/construction-data-management.html': '/pl/uslugi/zarzadzanie-danymi-budowlanymi.html',
        './services/construction-data-management.html': '/pl/uslugi/zarzadzanie-danymi-budowlanymi.html',
        '/services/construction-data-management.html': '/pl/uslugi/zarzadzanie-danymi-budowlanymi.html',
        
        '../services/construction-logistics.html': '/pl/uslugi/logistyka-budowlana.html',
        './services/construction-logistics.html': '/pl/uslugi/logistyka-budowlana.html',
        '/services/construction-logistics.html': '/pl/uslugi/logistyka-budowlana.html',
        
        // INDUSTRIES - Use absolute paths
        '../industries/warehouses-logistics.html': '/pl/branze/magazyny-logistyka.html',
        './industries/warehouses-logistics.html': '/pl/branze/magazyny-logistyka.html',
        '/industries/warehouses-logistics.html': '/pl/branze/magazyny-logistyka.html',

        '../industries/data-centers.html': '/pl/branze/centra-danych.html',
        './industries/data-centers.html': '/pl/branze/centra-danych.html',
        '/industries/data-centers.html': '/pl/branze/centra-danych.html',

        '../industries/residential-development.html': '/pl/branze/deweloperstwo-mieszkaniowe.html',
        './industries/residential-development.html': '/pl/branze/deweloperstwo-mieszkaniowe.html',
        '/industries/residential-development.html': '/pl/branze/deweloperstwo-mieszkaniowe.html',

        '../industries/remediation.html': '/pl/branze/remediacja.html',
        './industries/remediation.html': '/pl/branze/remediacja.html',
        '/industries/remediation.html': '/pl/branze/remediacja.html',

        '../industries/commercial-development.html': '/pl/branze/deweloperstwo-komercyjne.html',
        './industries/commercial-development.html': '/pl/branze/deweloperstwo-komercyjne.html',
        '/industries/commercial-development.html': '/pl/branze/deweloperstwo-komercyjne.html',

        '../industries/housing-associations.html': '/pl/branze/spoldzielnie-mieszkaniowe.html',
        './industries/housing-associations.html': '/pl/branze/spoldzielnie-mieszkaniowe.html',
        '/industries/housing-associations.html': '/pl/branze/spoldzielnie-mieszkaniowe.html',

        '../industries/healthcare-medical.html': '/pl/branze/obiekty-medyczne.html',
        './industries/healthcare-medical.html': '/pl/branze/obiekty-medyczne.html',
        '/industries/healthcare-medical.html': '/pl/branze/obiekty-medyczne.html',

        '../industries/industrial-manufacturing.html': '/pl/branze/przemysl-i-produkcja.html',
        './industries/industrial-manufacturing.html': '/pl/branze/przemysl-i-produkcja.html',
        '/industries/industrial-manufacturing.html': '/pl/branze/przemysl-i-produkcja.html',

        '../industries/infrastructure-civil.html': '/pl/branze/infrastruktura-i-roboty-inzynieryjne.html',
        './industries/infrastructure-civil.html': '/pl/branze/infrastruktura-i-roboty-inzynieryjne.html',
        '/industries/infrastructure-civil.html': '/pl/branze/infrastruktura-i-roboty-inzynieryjne.html',

        // PRIVACY & TERMS - Use absolute paths
        '../privacy-policy.html': '/pl/polityka-prywatnosci.html',
        './privacy-policy.html': '/pl/polityka-prywatnosci.html',
        '/privacy-policy.html': '/pl/polityka-prywatnosci.html',

        '../terms-of-service.html': '/pl/regulamin.html',
        './terms-of-service.html': '/pl/regulamin.html',
        '/terms-of-service.html': '/pl/regulamin.html',

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
        // Translate all links in navbar EXCEPT language switchers
        const navLinks = document.querySelectorAll('.navbar a[href], .dropdown-item[href]');
        navLinks.forEach(link => {
            // Skip language switcher links (PL/EN)
            const linkText = link.textContent.trim();
            if (linkText === 'PL' || linkText === 'EN') {
                return; // Don't translate language switchers
            }
            
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

    // Function to add Polish-only navbar items
    function addPolishOnlyItems() {
        polishOnlyItems.forEach(item => {
            // Check if this item already exists to prevent duplicates
            const existingPolishItems = document.querySelectorAll(`[data-polish-only="true"]`);
            for (const existing of existingPolishItems) {
                if (existing.textContent.trim() === item.text) {
                    return; // Item already injected, skip
                }
            }
            // Find the parent menu by its text (after translation)
            const menuItems = document.querySelectorAll('.nav-item.dropdown');
            let parentMenu = null;
            
            for (const menuItem of menuItems) {
                const menuLink = menuItem.querySelector('.nav-link');
                if (menuLink && menuLink.textContent.trim() === item.parentMenu) {
                    parentMenu = menuItem;
                    break;
                }
            }
            
            if (!parentMenu) {
                console.warn(`Parent menu "${item.parentMenu}" not found for Polish-only item`);
                return;
            }
            
            // Find the dropdown menu container
            const dropdownMenu = parentMenu.querySelector('.dropdown-menu');
            if (!dropdownMenu) {
                console.warn(`Dropdown menu not found in "${item.parentMenu}"`);
                return;
            }
            
            // Create the new menu item
            const newItem = document.createElement('a');
            newItem.className = 'dropdown-item';
            newItem.href = item.href;
            newItem.textContent = item.text;
            newItem.setAttribute('data-polish-only', 'true'); // Mark as Polish-only
            
            // Insert at specified position
            const existingItems = dropdownMenu.querySelectorAll('.dropdown-item');
            
            if (item.position === 'first') {
                dropdownMenu.insertBefore(newItem, dropdownMenu.firstChild);
            } else if (item.position === 'last') {
                dropdownMenu.appendChild(newItem);
            } else if (typeof item.position === 'number') {
                const targetItem = existingItems[item.position];
                if (targetItem) {
                    dropdownMenu.insertBefore(newItem, targetItem);
                } else {
                    dropdownMenu.appendChild(newItem);
                }
            } else {
                // Default to first
                dropdownMenu.insertBefore(newItem, dropdownMenu.firstChild);
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
        
        // Add Polish-only items AFTER translation is complete
        addPolishOnlyItems();
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
