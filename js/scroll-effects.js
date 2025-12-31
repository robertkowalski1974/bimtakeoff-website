/**
 * BIM Takeoff - Scroll Effects & Animations
 * Advanced visual effects for better user experience
 * Updated with mobile optimizations
 */

// ============================================
// MOBILE DETECTION & UTILITIES
// ============================================
const isMobile = () => window.innerWidth <= 768;
const isSmallPhone = () => window.innerWidth <= 480;
const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ============================================
// 1. SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Initialize scroll reveal on page load
function initScrollReveal() {
    // Target elements for fade-in animation
    const fadeElements = document.querySelectorAll(`
        .feature-card,
        .stat,
        .process-step,
        .portfolio-item,
        .faq-item,
        .trust-badge,
        h2,
        .callout-box
    `);
    
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in-element');
        el.style.transitionDelay = `${index * 0.05}s`;
        fadeInObserver.observe(el);
    });
}

// ============================================
// 2. PARALLAX HERO EFFECT (Mobile-Optimized)
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero-section');
    const heroVideo = document.querySelector('.hero-video-bg video');

    if (!hero) return;

    // Disable parallax on mobile for performance
    if (isMobile() || isReducedMotion()) {
        return;
    }

    // Use requestAnimationFrame for smoother performance
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;

                // Only apply parallax while hero is visible
                if (scrolled < heroHeight) {
                    const parallaxSpeed = 0.5;
                    if (heroVideo) {
                        heroVideo.style.transform = `translateX(-50%) translateY(${scrolled * parallaxSpeed}px)`;
                    }

                    // Fade out hero content as you scroll
                    const opacity = 1 - (scrolled / heroHeight) * 1.5;
                    const content = hero.querySelector('.container');
                    if (content) {
                        content.style.opacity = Math.max(0, opacity);
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// 3. ANIMATED COUNTERS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
}

function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent.trim();
                
                // Parse the number from text like "2000+" or "12M+"
                let targetNumber = 0;
                if (text.includes('M+')) {
                    targetNumber = parseFloat(text) * 1000000;
                } else if (text.includes('K+')) {
                    targetNumber = parseFloat(text) * 1000;
                } else {
                    targetNumber = parseInt(text.replace(/\D/g, ''));
                }
                
                if (targetNumber > 0) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, targetNumber);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// ============================================
// 4. SCROLL PROGRESS INDICATOR
// ============================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ============================================
// 5. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// 6. ENHANCED CARD HOVER EFFECTS
// ============================================
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .portfolio-item, .trust-badge');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// 7. NAVBAR SCROLL BEHAVIOR
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// 8. LOADING ANIMATION
// ============================================
function initLoadAnimation() {
    // Function to animate hero elements
    const animateHero = () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-primary, .cta-secondary');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };
    
    // Check if page is already loaded (for Quarto preview mode)
    if (document.readyState === 'complete') {
        // Page already loaded, animate immediately
        setTimeout(animateHero, 100);
    } else {
        // Add loaded class after page loads
        window.addEventListener('load', animateHero);
    }
}

// ============================================
// 9. SCROLL TO TOP BUTTON
// ============================================
// DISABLED: Replaced with chat widget
// To re-enable, uncomment the function call in initScrollToTop() on line 299
function initScrollToTop() {
    // const scrollBtn = document.createElement('button');
    // scrollBtn.className = 'scroll-to-top';
    // scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    // scrollBtn.setAttribute('aria-label', 'Scroll to top');
    // document.body.appendChild(scrollBtn);

    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset > 500) {
    //         scrollBtn.classList.add('visible');
    //     } else {
    //         scrollBtn.classList.remove('visible');
    //     }
    // });

    // scrollBtn.addEventListener('click', () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // });
}

// ============================================
// 10. IMAGE LAZY LOADING WITH FADE (Enhanced)
// ============================================
function initLazyImages() {
    // Handle data-src lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add native lazy loading to all images without it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        // Skip hero/critical images
        if (!img.closest('.hero-section') && !img.closest('.navbar')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Add decoding async to all images
    document.querySelectorAll('img:not([decoding])').forEach(img => {
        img.setAttribute('decoding', 'async');
    });
}

// ============================================
// 11. MOBILE VIDEO OPTIMIZATION
// ============================================
function initMobileVideoOptimization() {
    const heroVideo = document.querySelector('.hero-video-bg video');

    if (!heroVideo) return;

    // Check if user prefers reduced data
    const prefersReducedData = navigator.connection &&
        (navigator.connection.saveData ||
         navigator.connection.effectiveType === 'slow-2g' ||
         navigator.connection.effectiveType === '2g');

    // On mobile or reduced data, consider replacing video with static image
    if (isSmallPhone() || prefersReducedData || isReducedMotion()) {
        // Pause video and show poster instead
        heroVideo.pause();
        heroVideo.removeAttribute('autoplay');

        // Add a CSS class to indicate video is disabled
        heroVideo.closest('.hero-video-bg').classList.add('video-disabled');

        console.log('📱 Hero video disabled for mobile/reduced data');
    } else if (isMobile()) {
        // On larger phones, reduce video quality by limiting playback
        heroVideo.playbackRate = 1.0;

        // Pause when not visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });

        videoObserver.observe(heroVideo);
    }
}

// ============================================
// 12. VIEWPORT HEIGHT FIX FOR MOBILE
// ============================================
function initMobileViewportFix() {
    // Fix for mobile browsers where 100vh includes the address bar
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
}

// ============================================
// 13. TOUCH-FRIENDLY NAVIGATION
// ============================================
function initTouchNavigation() {
    if (!isTouchDevice()) return;

    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.cta-primary, .cta-secondary, .feature-card, .portfolio-item, .nav-link, .dropdown-item'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });

        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Improve dropdown behavior on touch
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // On mobile, first click opens, second navigates
            const dropdown = this.closest('.dropdown');
            if (dropdown && !dropdown.classList.contains('show')) {
                e.preventDefault();
            }
        });
    });
}

// ============================================
// INITIALIZE ALL EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing BIM Takeoff scroll effects...');

    // Initialize mobile-specific optimizations first
    initMobileViewportFix();
    initMobileVideoOptimization();
    initTouchNavigation();

    // Initialize all effects
    initScrollReveal();
    initParallax();
    initCounters();
    initScrollProgress();
    initSmoothScroll();
    initCardEffects();
    initNavbarScroll();
    initLoadAnimation();
    initScrollToTop();
    initLazyImages();

    console.log('✅ All scroll effects initialized');
    console.log(`📱 Mobile: ${isMobile()}, Touch: ${isTouchDevice()}, Reduced Motion: ${isReducedMotion()}`);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events if needed
const debouncedScroll = debounce(() => {
    // Additional scroll effects can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);
