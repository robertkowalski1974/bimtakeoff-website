// Polish Translation Script for Navigation and Links
(function() {
    const translations = {
        'Home': 'Strona Główna', 
        'Services': 'Usługi', 
        'Industries': 'Branże',
        'Portfolio': 'Portfolio', 
        'Resources': 'Zasoby', 
        'About': 'O Nas', 
        'Contact': 'Kontakt',
        'Cost Estimation & Budget Planning': 'Kosztorysowanie i Planowanie Budżetu',
        'Trade-Specific Specialist Services': 'Specjalistyczne Usługi Branżowe',
        'Automated Quantity Takeoff': 'Automatyczny Przedmiar z Modeli BIM',
        'Fast-Track Cost Control': 'Bieżąca Kontrola Kosztów',
        'BREEAM/ESG Cost Modeling': 'Kosztorysowanie BREEAM/ESG',
        'MEP Infrastructure Precision': 'Kosztorysowanie Instalacji MEP',
        'Multi-Scenario Analysis': 'Analiza Wariantowa',
        'Comprehensive Reporting': 'Kompleksowe Raportowanie',
        'Bid Writing & Bid Management': 'Przygotowanie Ofert Przetargowych',
        'Traditional Quantity Takeoff': 'Tradycyjny Przedmiar z Rysunków 2D',
        'Construction Data Management': 'Zarządzanie Danymi BIM',
        'Construction Logistics': 'Logistyka Budowlana',
        'Warehouses & Logistics': 'Magazyny i Logistyka',
        'Data Centers': 'Centra Danych',
        'Residential Development': 'Deweloperstwo Mieszkaniowe',
        'Remediation': 'Remediacja i Modernizacja',
        'Commercial Development': 'Deweloperstwo Komercyjne',
        'Healthcare & Medical Facilities': 'Opieka Zdrowotna',
        'Industrial & Manufacturing': 'Przemysł i Produkcja',
        'Infrastructure & Civil Works': 'Infrastruktura',
        'BIM 2030 Guide': 'Przewodnik BIM 2030',
        'ROI Calculator': 'Kalkulator Oszczędności',
        'Case Studies': 'Studia Przypadków',
        'All rights reserved': 'Wszelkie prawa zastrzeżone'
    };
    
    const linkTranslations = {
        '/services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        'services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        '../../services/cost-estimation-budget-planning.html': '../uslugi/kosztorysowanie-i-planowanie-budzetu.html',
        '/coming-soon.html': 'coming-soon.html',
        'coming-soon.html': 'coming-soon.html',
        '../coming-soon.html': 'coming-soon.html',
        '/index.html': 'index.html',
        'index.html': 'index.html',
        '../index.html': 'index.html',
        '/': 'index.html',
        '/contact.html': 'kontakt.html',
        'contact.html': 'kontakt.html',
        '../contact.html': 'kontakt.html',
        '../../contact.html': '../kontakt.html'
    };
    
    function translateLinks() {
        document.querySelectorAll('.navbar a[href], .dropdown-item[href]').forEach(link => {
            // Skip language switcher links (PL/EN)
            const linkText = link.textContent.trim();
            if (linkText === 'PL' || linkText === 'EN') {
                return;
            }
            
            let href = link.getAttribute('href');
            
            // Handle absolute URLs by extracting the path
            if (href && href.includes('://')) {
                try {
                    const url = new URL(href);
                    href = url.pathname;
                } catch (e) {}
            }
            
            if (linkTranslations[href]) {
                link.setAttribute('href', linkTranslations[href]);
            }
        });
    }
    
    function translatePage() {
        // Translate navbar text
        document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) {
                el.textContent = translations[text];
            }
        });
        
        // Update phone numbers
        const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
        phoneLinks.forEach(link => {
            link.href = 'tel:+48508209313';
            link.textContent = '+48 508 209 313';
        });
        
        // Translate links
        translateLinks();
        
        // Set language attribute
        document.documentElement.lang = 'pl';
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', translatePage);
    } else {
        translatePage();
    }
    
    // Run again after a short delay to catch any dynamically loaded content
    setTimeout(translatePage, 100);
})();
