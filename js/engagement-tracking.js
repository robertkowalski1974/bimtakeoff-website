// Engagement Tracking - BIM Takeoff
// One delegated click listener that pushes structured events to the GTM dataLayer.
// Folds in the former js/linkedin-tracking.js behaviour: tel:/mailto: clicks still
// fire a LinkedIn conversion via window.lintrk (only present once marketing consent
// is granted and the Insight Tag has been injected by consent-banner.js).

(function () {
  // LinkedIn conversion id used for general contact intent (call/email clicks).
  // Sourced from the former js/linkedin-tracking.js.
  var LINKEDIN_CONTACT_CONVERSION_ID = 24859401;

  // Duplicated intentionally in consent-banner.js (8 lines) rather than shared,
  // per implementation notes - keep both copies in sync if the rules change.
  function getPageType() {
    var path = window.location.pathname;
    if (path === '/' || path === '/pl/' || path === '/pl') return 'home';
    if (path.indexOf('/services/') !== -1 || path.indexOf('/pl/uslugi/') !== -1) return 'service';
    if (path.indexOf('/industries/') !== -1 || path.indexOf('/pl/branze/') !== -1) return 'industry';
    if (path.indexOf('/resources/') !== -1 || path.indexOf('/pl/zasoby/') !== -1) return 'resource';
    if (path.indexOf('/contact') !== -1 || path.indexOf('/pl/kontakt') !== -1) return 'contact';
    return 'page';
  }

  function baseParams() {
    return {
      page_language: document.documentElement.lang || '',
      page_type: getPageType()
    };
  }

  function pushEvent(data) {
    window.dataLayer = window.dataLayer || [];
    var payload = baseParams();
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        payload[key] = data[key];
      }
    }
    window.dataLayer.push(payload);
  }

  function resolveUrl(href) {
    try {
      return new URL(href, window.location.href);
    } catch (e) {
      return null;
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim();

    // --- contact_intent: tel:/mailto: links ---
    if (href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) {
      var contactMethod = href.indexOf('tel:') === 0 ? 'phone' : 'email';
      pushEvent({ event: 'contact_intent', contact_method: contactMethod });

      if (window.lintrk) {
        window.lintrk('track', { conversion_id: LINKEDIN_CONTACT_CONVERSION_ID });
      }
    }

    // --- cta_click: .cta-primary, .cta-secondary, .btn ---
    var ctaEl = link.closest('.cta-primary, .cta-secondary, .btn');
    if (ctaEl) {
      pushEvent({
        event: 'cta_click',
        button_text: text,
        link_url: href
      });
    }

    // --- language_switch: navbar PL/EN links ---
    var menuTextEl = link.querySelector('.menu-text');
    var label = (menuTextEl ? menuTextEl.textContent : text).trim();
    if ((label === 'PL' || label === 'EN') && link.closest('.navbar')) {
      pushEvent({
        event: 'language_switch',
        to_language: label.toLowerCase()
      });
    }

    // --- outbound_click: praevius.app, client-portal.bimtakeoff.com, any external host ---
    if (href.indexOf('tel:') !== 0 && href.indexOf('mailto:') !== 0 && href.indexOf('#') !== 0) {
      var resolved = resolveUrl(href);
      if (resolved && resolved.hostname && resolved.hostname !== window.location.hostname) {
        pushEvent({
          event: 'outbound_click',
          link_url: resolved.href,
          link_text: text
        });
      }
    }
  });
})();
