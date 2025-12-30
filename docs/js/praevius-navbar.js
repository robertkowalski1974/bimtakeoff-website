// Praevius Logo in Navbar
// Appends clickable Praevius logo to the right side of navbar

(function() {
    function addPraeviusLogo() {
        // Find the right-side navbar
        const navbarRight = document.querySelector('.navbar-nav.ms-auto') || 
                           document.querySelector('.navbar-nav-right') ||
                           document.querySelector('.navbar-nav:last-child');
        
        if (!navbarRight) return;
        
        // Check if already added
        if (document.querySelector('.praevius-navbar-logo')) return;
        
        // Create the logo link
        const logoLink = document.createElement('a');
        logoLink.href = 'https://praevius.app';
        logoLink.target = '_blank';
        logoLink.rel = 'noopener';
        logoLink.className = 'praevius-navbar-logo';
        logoLink.title = 'Praevius.app - Cost Control Software';
        
        // Create the image
        const img = document.createElement('img');
        img.src = '/images/praevius-logo-white.svg';
        img.alt = 'Praevius.app';
        img.height = 28;
        
        logoLink.appendChild(img);
        navbarRight.appendChild(logoLink);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addPraeviusLogo);
    } else {
        addPraeviusLogo();
    }
    
    // Backup run after short delay
    setTimeout(addPraeviusLogo, 200);
})();
