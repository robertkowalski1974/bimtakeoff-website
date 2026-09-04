/**
 * BIM Takeoff - Scroll effects and progressive enhancement
 *
 * Rules this file follows:
 *  - Content is never hidden by CSS alone. Anything this script fades in is
 *    made hidden BY this script first (the .js-reveal class), so a reader
 *    with no JS, or one who jumps to the end of the page before the
 *    observer fires, always sees the content.
 *  - Hover effects live in CSS, not in inline styles set from JS.
 *  - prefers-reduced-motion is honoured everywhere.
 */

// ============================================
// UTILITIES
// ============================================
const isMobile = () => window.innerWidth <= 768;
const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ============================================
// 0. SKIP LINK
// ============================================
// Quarto puts include-in-header content in <head>, so the skip link has to be
// prepended to <body> here. It is visually hidden until focused (see CSS).
function initSkipLink() {
    if (document.querySelector('.skip-link')) return;
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    const link = document.createElement('a');
    link.className = 'skip-link';
    link.href = '#quarto-content';
    link.textContent = lang.startsWith('pl') ? 'Przejdź do treści' : 'Skip to content';
    document.body.prepend(link);
}

// ============================================
// 1. SCROLL REVEAL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('fade-in-visible');
        // The stagger belongs to the entrance only. Clearing it afterwards
        // keeps hover and focus transitions instant.
        setTimeout(() => { el.style.transitionDelay = ''; }, 700);
        observer.unobserve(el);
    });
}, observerOptions);

function initScrollReveal() {
    // Reduced motion: leave everything visible and do nothing at all.
    if (isReducedMotion()) return;

    const fadeElements = document.querySelectorAll(
        '.feature-card, .stat, .process-step, .portfolio-item, .faq-item, .trust-badge, h2, .callout-box'
    );

    fadeElements.forEach((el, index) => {
        // Hidden state is added by JS, never by the stylesheet alone.
        el.classList.add('js-reveal');
        // Cap the stagger at 6 steps: 300ms worst case, not 2.9s.
        el.style.transitionDelay = `${Math.min(index, 6) * 50}ms`;
        fadeInObserver.observe(el);
    });
}

// ============================================
// 2. HERO VIDEO (lazy, desktop only)
// ============================================
// The <source> elements carry data-src, so nothing is fetched until we decide
// the connection and viewport can afford it. Below 992px the poster stays.
function initHeroVideo() {
    const video = document.querySelector('.hero-video-bg video');
    if (!video) return;

    const wrapper = video.closest('.hero-video-bg');
    const conn = navigator.connection || {};
    const saveData = conn.saveData === true;
    const slowLink = conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
    const wideViewport = window.matchMedia('(min-width: 992px)').matches;

    if (!wideViewport || saveData || slowLink || isReducedMotion()) {
        video.removeAttribute('autoplay');
        if (wrapper) wrapper.classList.add('video-disabled');
        return;
    }

    const start = () => {
        const sources = video.querySelectorAll('source[data-src]');
        if (!sources.length) return;
        sources.forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
        });
        video.load();
        const played = video.play();
        if (played && typeof played.catch === 'function') {
            played.catch(() => {
                // Autoplay refused - the poster is still showing, so leave it.
                if (wrapper) wrapper.classList.add('video-disabled');
            });
        }
    };

    // Let the first paint finish before pulling ~850KB of video.
    if ('requestIdleCallback' in window) {
        requestIdleCallback(start, { timeout: 2000 });
    } else {
        setTimeout(start, 500);
    }
}

// ============================================
// 3. PARALLAX HERO EFFECT
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero-section');
    const heroVideo = document.querySelector('.hero-video-bg video');

    if (!hero || isMobile() || isReducedMotion()) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                if (heroVideo) {
                    heroVideo.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
                }
                const content = hero.querySelector('.container');
                if (content) {
                    content.style.opacity = Math.max(0, 1 - (scrolled / heroHeight) * 1.5);
                }
            }
            ticking = false;
        });
    }, { passive: true });
}

// ============================================
// 4. ANIMATED COUNTERS
// ============================================
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num + '+';
}

function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function initCounters() {
    // Reduced motion: leave the authored numbers alone.
    if (isReducedMotion()) return;

    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.classList.contains('counted')) return;
            entry.target.classList.add('counted');
            const text = entry.target.textContent.trim();

            let targetNumber = 0;
            if (text.includes('M+')) {
                targetNumber = parseFloat(text) * 1000000;
            } else if (text.includes('K+')) {
                targetNumber = parseFloat(text) * 1000;
            } else {
                targetNumber = parseInt(text.replace(/\D/g, ''), 10);
            }

            if (targetNumber > 0) {
                entry.target.textContent = '0';
                animateCounter(entry.target, targetNumber);
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

// ============================================
// 5. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: isReducedMotion() ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });
}

// ============================================
// 6. NAVBAR SCROLL BEHAVIOUR
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.pageYOffset > 50
            ? 'var(--shadow-sm)'
            : 'none';
    }, { passive: true });
}

// ============================================
// 7. IMAGE LOADING HINTS
// ============================================
function initLazyImages() {
    document.querySelectorAll('img:not([loading])').forEach(img => {
        // Never defer hero or navbar imagery - those are the LCP candidates.
        if (!img.closest('.hero-section') && !img.closest('.navbar')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    document.querySelectorAll('img:not([decoding])').forEach(img => {
        img.setAttribute('decoding', 'async');
    });
}

// ============================================
// 8. VIEWPORT HEIGHT FIX FOR MOBILE
// ============================================
function initMobileViewportFix() {
    const setVH = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
}

// ============================================
// 9. TOUCH-FRIENDLY NAVIGATION
// ============================================
function initTouchNavigation() {
    if (!isTouchDevice()) return;

    document.querySelectorAll(
        '.cta-primary, .cta-secondary, .feature-card, .portfolio-item, .nav-link, .dropdown-item'
    ).forEach(el => {
        el.addEventListener('touchstart', function () {
            this.classList.add('touch-active');
        }, { passive: true });

        el.addEventListener('touchend', function () {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            const dropdown = this.closest('.dropdown');
            if (dropdown && !dropdown.classList.contains('show')) {
                e.preventDefault();
            }
        });
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSkipLink();
    initMobileViewportFix();
    initHeroVideo();
    initTouchNavigation();
    initScrollReveal();
    initParallax();
    initCounters();
    initSmoothScroll();
    initNavbarScroll();
    initLazyImages();
});
