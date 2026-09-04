// Praevius logo in the navbar.
// Appended as a proper <li class="nav-item"> so the <ul class="navbar-nav">
// keeps a valid list structure for assistive technology.

(function () {
    function addPraeviusLogo() {
        const navbarRight = document.querySelector('.navbar-nav.ms-auto') ||
                            document.querySelector('.navbar-nav-right') ||
                            document.querySelector('.navbar-nav:last-child');

        if (!navbarRight) return;
        if (document.querySelector('.praevius-navbar-logo')) return;

        const item = document.createElement('li');
        item.className = 'nav-item';

        const logoLink = document.createElement('a');
        logoLink.href = 'https://praevius.app';
        logoLink.target = '_blank';
        logoLink.rel = 'noopener';
        logoLink.className = 'praevius-navbar-logo';
        logoLink.setAttribute('aria-label', 'Praevius app');
        logoLink.title = 'Praevius.app - Cost Control Software';

        // Explicit intrinsic size so the navbar does not reflow on load.
        const img = document.createElement('img');
        img.src = '/images/praevius-logo-white.svg';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.width = 123;
        img.height = 28;

        logoLink.appendChild(img);
        item.appendChild(logoLink);
        navbarRight.appendChild(item);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addPraeviusLogo);
    } else {
        addPraeviusLogo();
    }
})();
