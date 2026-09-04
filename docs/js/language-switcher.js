/**
 * Language Switcher for BIM Takeoff Bilingual Website
 * =====================================================
 *
 * GENERATED FILE - do not hand-edit.
 * Source of truth: scripts/page-map.json
 * Regenerate with: python3 scripts/build-language-switcher.py
 *
 * On DOMContentLoaded, finds the navbar links whose text is exactly "PL"
 * or "EN" and, if the current page has a mapped counterpart, rewrites the
 * link's href to point at it. Pages with no mapped counterpart keep the
 * default href (site root "/" or "/pl/") already in the markup.
 */
(function () {
  "use strict";

  // EN path -> PL path. Generated from scripts/page-map.json.
  var EN_TO_PL = {
    "/index.html": "/pl/index.html",
    "/contact.html": "/pl/kontakt.html",
    "/terms-of-service.html": "/pl/regulamin.html",
    "/privacy-policy.html": "/pl/polityka-prywatnosci.html",
    "/tender-winning.html": "/pl/wygrywanie-przetargow.html",
    "/coming-soon.html": "/pl/coming-soon.html",
    "/services/automated-quantity-takeoff.html": "/pl/uslugi/automatyczny-przedmiar-obmiar.html",
    "/services/bid-writing-management.html": "/pl/uslugi/pisanie-ofert-i-zarzadzanie-przetargami.html",
    "/services/breeam-esg-cost-modeling.html": "/pl/uslugi/kosztorysowanie-breeam-esg.html",
    "/services/comprehensive-reporting.html": "/pl/uslugi/kompleksowe-raportowanie.html",
    "/services/construction-data-management.html": "/pl/uslugi/zarzadzanie-danymi-budowlanymi.html",
    "/services/construction-logistics.html": "/pl/uslugi/logistyka-budowlana.html",
    "/services/cost-estimation-budget-planning.html": "/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html",
    "/services/fast-track-cost-control.html": "/pl/uslugi/szybka-kontrola-kosztow.html",
    "/services/mep-infrastructure-precision.html": "/pl/uslugi/precyzyjne-kosztorysowanie-mep.html",
    "/services/multi-scenario-analysis.html": "/pl/uslugi/analiza-wieloscenariuszowa.html",
    "/services/trade-specific-specialist-services.html": "/pl/uslugi/specjalistyczne-branzy-budowlane.html",
    "/services/traditional-quantity-takeoff.html": "/pl/uslugi/tradycyjny-przedmiar-ilosci.html",
    "/industries/commercial-development.html": "/pl/branze/deweloperstwo-komercyjne.html",
    "/industries/data-centers.html": "/pl/branze/centra-danych.html",
    "/industries/healthcare-medical.html": "/pl/branze/obiekty-medyczne.html",
    "/industries/housing-associations.html": "/pl/branze/spoldzielnie-mieszkaniowe.html",
    "/industries/industrial-manufacturing.html": "/pl/branze/przemysl-i-produkcja.html",
    "/industries/infrastructure-civil.html": "/pl/branze/infrastruktura-i-roboty-inzynieryjne.html",
    "/industries/remediation.html": "/pl/branze/remediacja.html",
    "/industries/residential-development.html": "/pl/branze/deweloperstwo-mieszkaniowe.html",
    "/industries/warehouses-logistics.html": "/pl/branze/magazyny-logistyka.html",
    "/resources/what-is-bim-5d-cost-estimation.html": "/pl/zasoby/czym-jest-kosztorysowanie-bim-5d.html",
    "/resources/roi-calculator.html": "/pl/zasoby/kalkulator-roi.html",
    "/resources/roi-calculator-thank-you.html": "/pl/zasoby/kalkulator-roi-dziekujemy.html",
    "/resources/roi-report.html": "/pl/zasoby/raport-roi.html",
    "/resources/publications/index.html": "/pl/zasoby/publikacje/index.html",
    "/resources/publications/ai-quantity-takeoff-reality.html": "/pl/zasoby/publikacje/ai-przedmiary-deklaracje-vs-rzeczywistosc.html",
    "/resources/publications/ai-replace-quantity-surveyors.html": "/pl/zasoby/publikacje/ai-czy-zastapi-kosztorysantow.html",
    "/resources/publications/bim-adoption-tender-stages.html": "/pl/zasoby/publikacje/adopcja-bim-na-etapie-przetargow.html",
    "/resources/publications/construction-industry-40-trillion-crisis.html": "/pl/zasoby/publikacje/kryzys-budownictwa-40-bilionow-dolarow.html",
    "/resources/publications/construction-project-delivery-failure.html": "/pl/zasoby/publikacje/endemiczna-porazka-realizacji-projektow-budowlanych.html",
    "/resources/publications/tender-winning-strategies.html": "/pl/zasoby/publikacje/strategie-wygrywania-przetargow.html"
  };

  // PL path -> EN path (reverse of EN_TO_PL).
  var PL_TO_EN = {};
  for (var enPath in EN_TO_PL) {
    if (Object.prototype.hasOwnProperty.call(EN_TO_PL, enPath)) {
      PL_TO_EN[EN_TO_PL[enPath]] = enPath;
    }
  }

  function normalizePath(pathname) {
    if (pathname === "/" ) {
      return "/index.html";
    }
    if (pathname === "/pl" || pathname === "/pl/") {
      return "/pl/index.html";
    }
    return pathname;
  }

  function findCounterpart(pathname) {
    var normalized = normalizePath(pathname);
    if (Object.prototype.hasOwnProperty.call(EN_TO_PL, normalized)) {
      return EN_TO_PL[normalized];
    }
    if (Object.prototype.hasOwnProperty.call(PL_TO_EN, normalized)) {
      return PL_TO_EN[normalized];
    }
    return null;
  }

  function isLangLink(el) {
    var text = (el.textContent || "").trim();
    return text === "PL" || text === "EN";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var counterpart = findCounterpart(window.location.pathname);
    if (!counterpart) {
      // No mapped twin for this page - leave the default nav hrefs
      // ("/" and "/pl/") exactly as rendered.
      return;
    }

    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (isLangLink(link)) {
        link.setAttribute("href", counterpart);
      }
    }
  });
})();
