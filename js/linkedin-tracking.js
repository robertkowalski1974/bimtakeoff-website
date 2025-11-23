// LinkedIn Conversion Tracking for Contact Links
// This script adds LinkedIn conversion tracking to all email and phone links

(function() {
    // LinkedIn conversion ID
    const LINKEDIN_CONVERSION_ID = 24859401;
    
    // Function to add tracking to links
    function addLinkedInTracking() {
        // Track all email links
        const emailLinks = document.querySelectorAll('a[href^="mailto:info@bimtakeoff.com"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.lintrk) {
                    window.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
                }
            });
        });
        
        // Track all phone links (Polish number)
        const phoneLinksPolish = document.querySelectorAll('a[href^="tel:+48508209313"]');
        phoneLinksPolish.forEach(link => {
            link.addEventListener('click', function() {
                if (window.lintrk) {
                    window.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
                }
            });
        });
        
        // Track all phone links (UK number in footer)
        const phoneLinksUK = document.querySelectorAll('a[href^="tel:+442032399967"]');
        phoneLinksUK.forEach(link => {
            link.addEventListener('click', function() {
                if (window.lintrk) {
                    window.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
                }
            });
        });
        
        // Track "Zadzwoń Teraz" and "Wyślij E-mail" buttons on contact page
        const callButtons = document.querySelectorAll('a.btn[href^="tel:"]');
        callButtons.forEach(button => {
            if (!button.hasAttribute('onclick')) {
                button.addEventListener('click', function() {
                    if (window.lintrk) {
                        window.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
                    }
                });
            }
        });
        
        const emailButtons = document.querySelectorAll('a.btn[href^="mailto:"]');
        emailButtons.forEach(button => {
            if (!button.hasAttribute('onclick')) {
                button.addEventListener('click', function() {
                    if (window.lintrk) {
                        window.lintrk('track', { conversion_id: LINKEDIN_CONVERSION_ID });
                    }
                });
            }
        });
    }
    
    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addLinkedInTracking);
    } else {
        // DOM is already ready
        addLinkedInTracking();
    }
    
    // Also run after a small delay to catch any dynamically added elements
    setTimeout(addLinkedInTracking, 1000);
})();
