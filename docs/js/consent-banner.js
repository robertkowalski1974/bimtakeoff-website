// Cookie Consent Banner - BIM Takeoff
// Dependency-free. Reads/writes localStorage key "bimtakeoff_consent",
// applies Google Consent Mode v2 updates, and injects the LinkedIn Insight
// Tag only once marketing consent is granted.

(function () {
  var STORAGE_KEY = 'bimtakeoff_consent';
  var CONSENT_LIFETIME_MS = 365.25 / 12 * 30 * 24 * 60 * 60 * 1000 * 12; // ~12 months
  var LINKEDIN_PARTNER_ID = '8743217';

  // Duplicated intentionally from js/engagement-tracking.js (8 lines) rather
  // than shared state - keep both copies in sync if the rules change.
  function getPageType() {
    var path = window.location.pathname;
    if (path === '/' || path === '/pl/' || path === '/pl') return 'home';
    if (path.indexOf('/services/') !== -1 || path.indexOf('/pl/uslugi/') !== -1) return 'service';
    if (path.indexOf('/industries/') !== -1 || path.indexOf('/pl/branze/') !== -1) return 'industry';
    if (path.indexOf('/resources/') !== -1 || path.indexOf('/pl/zasoby/') !== -1) return 'resource';
    if (path.indexOf('/contact') !== -1 || path.indexOf('/pl/kontakt') !== -1) return 'contact';
    return 'page';
  }

  function isPolish() {
    return (document.documentElement.lang || '').toLowerCase().indexOf('pl') === 0;
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (typeof parsed.ts !== 'number') return null;
      if (Date.now() - parsed.ts > CONSENT_LIFETIME_MS) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(analytics, marketing) {
    var consent = { analytics: !!analytics, marketing: !!marketing, ts: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      // localStorage unavailable (private mode, blocked storage) - proceed
      // without persistence; the banner will simply reappear next visit.
    }
    return consent;
  }

  function applyConsent(consent) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
        analytics_storage: consent.analytics ? 'granted' : 'denied'
      });
    }
    if (consent.marketing) {
      injectLinkedInInsightTag();
    }
  }

  var linkedInInjected = false;
  function injectLinkedInInsightTag() {
    if (linkedInInjected || window.__bimtakeoffLinkedInLoaded) return;
    linkedInInjected = true;
    window.__bimtakeoffLinkedInLoaded = true;

    window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

    if (!window.lintrk) {
      window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
      window.lintrk.q = [];
    }

    var s = document.getElementsByTagName('script')[0];
    var b = document.createElement('script');
    b.type = 'text/javascript';
    b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    s.parentNode.insertBefore(b, s);
  }

  function pushBannerEvent(name) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      page_language: document.documentElement.lang || '',
      page_type: getPageType()
    });
  }

  var banner = null;

  // Builds the paragraph as safe DOM nodes (no innerHTML) - static, non-user
  // content, split before/after the privacy-policy link.
  function buildText(pl) {
    var p = document.createElement('p');
    p.className = 'bimtakeoff-consent-text';

    var before, linkText, linkHref, after;
    if (pl) {
      before = 'Używamy plików cookie do analityki i pomiaru kampanii LinkedIn. ' +
        'Niezbędne pliki cookie są zawsze aktywne. Zobacz naszą ';
      linkText = 'politykę prywatności';
      linkHref = '/pl/polityka-prywatnosci.html';
      after = '.';
    } else {
      before = 'We use cookies for analytics and LinkedIn campaign measurement. ' +
        'Essential cookies always on. See our ';
      linkText = 'privacy policy';
      linkHref = '/privacy-policy.html';
      after = '.';
    }

    p.appendChild(document.createTextNode(before));
    var link = document.createElement('a');
    link.href = linkHref;
    link.textContent = linkText;
    p.appendChild(link);
    p.appendChild(document.createTextNode(after));
    return p;
  }

  function buildBanner() {
    var pl = isPolish();

    var wrapper = document.createElement('div');
    wrapper.id = 'bimtakeoff-consent-banner';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-label', pl ? 'Ustawienia plikow cookie' : 'Cookie settings');
    wrapper.hidden = true;

    var inner = document.createElement('div');
    inner.className = 'bimtakeoff-consent-inner';

    var text = buildText(pl);

    var actions = document.createElement('div');
    actions.className = 'bimtakeoff-consent-actions';

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.className = 'bimtakeoff-consent-btn bimtakeoff-consent-btn-accept';
    acceptBtn.textContent = pl ? 'Akceptuj analitykę i marketing' : 'Accept analytics and marketing';
    acceptBtn.addEventListener('click', function () {
      var consent = writeConsent(true, true);
      applyConsent(consent);
      pushBannerEvent('consent_accept_all');
      hideBanner();
    });

    var essentialBtn = document.createElement('button');
    essentialBtn.type = 'button';
    essentialBtn.className = 'bimtakeoff-consent-btn bimtakeoff-consent-btn-essential';
    essentialBtn.textContent = pl ? 'Tylko niezbędne' : 'Essential only';
    essentialBtn.addEventListener('click', function () {
      var consent = writeConsent(false, false);
      applyConsent(consent);
      pushBannerEvent('consent_essential_only');
      hideBanner();
    });

    actions.appendChild(acceptBtn);
    actions.appendChild(essentialBtn);

    inner.appendChild(text);
    inner.appendChild(actions);
    wrapper.appendChild(inner);

    document.body.appendChild(wrapper);
    return wrapper;
  }

  function showBanner() {
    if (!banner) banner = buildBanner();
    banner.hidden = false;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function init() {
    var stored = readConsent();
    if (stored) {
      applyConsent(stored);
      return;
    }
    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API - lets a footer "Cookie settings" link reopen the banner.
  window.bimtakeoffConsent = {
    open: function () {
      showBanner();
    }
  };
})();
