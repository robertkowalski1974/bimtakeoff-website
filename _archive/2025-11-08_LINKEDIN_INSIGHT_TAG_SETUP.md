# LinkedIn Insight Tag - Setup Complete Guide

**Data:** 2025-11-08  
**Status:** ✅ Kod dodany do _quarto.yml - WYMAGANA AKCJA: Podmień Partner ID

---

## Co zostało zrobione ✅

LinkedIn Insight Tag został dodany do `_quarto.yml` w dwóch miejscach:

1. **`include-in-header`** - główny tracking script
2. **`include-after-body`** - noscript fallback dla użytkowników bez JavaScript

**Lokalizacja:** Zaraz po Google Tag Manager (dla spójności)

---

## ⚠️ MUSISZ TO ZROBIĆ TERAZ

### Krok 1: Pobierz Swój LinkedIn Partner ID

```
1. Idź do: linkedin.com/campaignmanager
2. Zaloguj się
3. Kliknij "Account Assets" (lewy sidebar)
4. Wybierz "Insight Tag"
5. Kliknij "See my Insight Tag"
6. Skopiuj Partner ID (będzie to 6-7 cyfrowy numer)
```

**Przykład:**
```javascript
_linkedin_partner_id = "1234567"; // <-- Ten numer
```

---

### Krok 2: Zamień XXXXXX na Swój Partner ID

Otwórz `_quarto.yml` i znajdź **DWA miejsca** z `XXXXXX`:

#### Miejsce 1 (linia ~140):
```yaml
<!-- LinkedIn Insight Tag -->
<!-- REPLACE 'XXXXXX' BELOW WITH YOUR ACTUAL PARTNER ID FROM LINKEDIN -->
<script type="text/javascript">
_linkedin_partner_id = "XXXXXX";  # <-- ZAMIEŃ TO
```

**ZAMIEŃ NA:**
```yaml
_linkedin_partner_id = "1234567";  # <-- Twój Partner ID z LinkedIn
```

#### Miejsce 2 (linia ~220):
```yaml
<!-- LinkedIn Insight Tag (noscript) -->
<!-- REPLACE 'XXXXXX' BELOW WITH YOUR ACTUAL PARTNER ID FROM LINKEDIN -->
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.linkedin.com/collect/?pid=XXXXXX&fmt=gif" />  # <-- ZAMIEŃ TO
```

**ZAMIEŃ NA:**
```yaml
<img height="1" width="1" style="display:none;" alt="" src="https://px.linkedin.com/collect/?pid=1234567&fmt=gif" />  # <-- Twój Partner ID
```

---

### Krok 3: Rebuild & Deploy

**Terminal commands:**

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Rebuild strony z nowym tagiem
quarto render

# Deploy na GitHub Pages
git add .
git commit -m "Add LinkedIn Insight Tag for campaign tracking"
git push origin main
```

**Czas:** 2-3 minuty

---

## Weryfikacja - Sprawdź Czy Działa

### Metoda 1: LinkedIn Tag Helper (Chrome Extension)

```
1. Zainstaluj: LinkedIn Insight Tag Helper (Chrome extension)
2. Odwiedź: https://robertkowalski1974.github.io/bimtakeoff-website
3. Kliknij ikonę extension
4. Powinna pokazać: ✅ "LinkedIn Tag detected"
```

### Metoda 2: Browser DevTools

```
1. Odwiedź: https://robertkowalski1974.github.io/bimtakeoff-website
2. Otwórz Developer Tools (F12)
3. Tab: "Network"
4. Filter: "linkedin" lub "snap.licdn.com"
5. Odśwież stronę
6. Powinieneś zobaczyć request do: snap.licdn.com/li.lms-analytics/insight.min.js
   ✅ Status: 200 OK
```

### Metoda 3: LinkedIn Campaign Manager

```
1. Idź do: linkedin.com/campaignmanager
2. "Account Assets" → "Insight Tag"
3. Po 24-48h zobaczysz:
   - "Tag Status: Active"
   - "Impressions: X" (liczba odwiedzin strony)
```

---

## Troubleshooting

### Problem: "Tag not detected"

**Możliwe przyczyny:**
1. ❌ Partner ID nie został zamieniony (nadal pokazuje XXXXXX)
2. ❌ Strona nie została zrebuildowana
3. ❌ Zmiany nie zostały wrzucone na GitHub
4. ❌ Cache przeglądarki (hard refresh: Cmd+Shift+R)

**Rozwiązanie:**
- Sprawdź source code strony (View Page Source)
- Szukaj: `_linkedin_partner_id`
- Upewnij się że widzisz swój Partner ID, nie "XXXXXX"

---

### Problem: "Multiple tags detected"

**Przyczyna:** Być może dodałeś tag też przez Google Tag Manager

**Rozwiązanie:**
- Wybierz JEDNĄ metodę: GTM LUB _quarto.yml
- Usuń duplikat
- Recommended: Zostaw w _quarto.yml (łatwiejsze zarządzanie)

---

### Problem: "No data in Campaign Manager after 48h"

**Możliwe przyczyny:**
1. Mało ruchu na stronie (potrzeba min. 100 unikalnych odwiedzin)
2. Tag jest poprawny ale Campaign Manager jeszcze nie aktualizował

**Rozwiązanie:**
- Poczekaj 72h
- Jeśli nadal brak danych → sprawdź czy tag jest na WSZYSTKICH stronach

---

## Conversion Tracking - Następny Krok

Po dodaniu Insight Tag, możesz trackować konwersje (form submissions).

### Setup Conversion Events:

```
1. LinkedIn Campaign Manager → "Account Assets" → "Conversions"
2. "Create Conversion"
3. Nazwa: "Bezpłatna Analiza Przetargu - Form Submit"
4. Type: "Lead"
5. Tracking method: "Event-specific pixel"
6. Skopiuj conversion ID (np. 123456)
```

### Dodaj do Landing Page Contact Form:

Na stronie `/pl/branze/spoldzielnie-mieszkaniowe.qmd`, w miejscu gdzie jest form submission, dodaj:

```javascript
<script>
// LinkedIn Conversion Tracking
window.lintrk('track', { conversion_id: 123456 });
</script>
```

**Gdzie dodać?**
- Form onSubmit event
- LUB: na confirmation page po submisji
- LUB: przez Google Tag Manager (jeśli używasz)

---

## Conversion Events do Stworzenia

Rekomendowane conversions dla kampanii LinkedIn:

| Event Name | Type | Priority | Tracking Location |
|-----------|------|----------|-------------------|
| **Bezpłatna Analiza - Form Submit** | Lead | 🔴 P0 | `/pl/branze/spoldzielnie-mieszkaniowe` form |
| **Konsultacja - Click** | Lead | 🟡 P1 | "Umów Konsultację" button clicks |
| **Phone Click** | Lead | 🟡 P1 | Phone number clicks |
| **Email Click** | Lead | 🟢 P2 | Email address clicks |
| **PDF Download** | Lead | 🟢 P2 | "Checklist Przetargu" PDF download |

---

## UTM Parameters dla LinkedIn Campaigns

Dla każdej kampanii LinkedIn, używaj UTM tags w URL:

### Campaign 1: "Tender Disaster"
```
https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=tender-disaster&utm_content=spoldzielnie
```

### Campaign 2: "Case Study"
```
https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=case-study-3m&utm_content=spoldzielnie
```

### Campaign 3: "Complete Service"
```
https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=complete-service&utm_content=spoldzielnie
```

**Dodaj w LinkedIn Campaign Manager:**
- Ad → "Website URL"
- Paste URL z UTM parameters
- LinkedIn automatycznie trackuje

---

## KPIs do Monitorowania

Po 7 dniach od startu kampanii, monitoruj w LinkedIn Campaign Manager:

### Week 1 Targets:
- ✅ **Impressions:** 3,000-5,000
- ✅ **CTR:** > 0.8%
- ✅ **Clicks:** 30-50
- ✅ **CPC:** < 25 PLN
- ✅ **Conversions:** 5-10 (form submits)
- ✅ **Cost per Conversion:** < 150 PLN

### Month 1 Targets:
- ✅ **Impressions:** 15,000-20,000
- ✅ **CTR:** > 1.2%
- ✅ **Clicks:** 180-240
- ✅ **Conversions:** 30-40
- ✅ **Cost per Conversion:** < 120 PLN

---

## Next Steps

**Po dodaniu LinkedIn Insight Tag:**

1. ✅ Insight Tag installed (DONE - tylko podmień Partner ID)
2. 🔨 Create Conversion Events (Week 1)
3. 🔨 Add UTM parameters to campaigns (Week 1)
4. 🔨 Setup Google Analytics goals (Week 1)
5. 🔨 Create tracking dashboard (Week 2)

---

## Quick Reference Commands

```bash
# Check if tag is in rendered HTML
grep -r "_linkedin_partner_id" docs/

# Rebuild site
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render

# Deploy to GitHub
git add .
git commit -m "LinkedIn Insight Tag with Partner ID XXXXXX"
git push origin main

# Check live site
open https://robertkowalski1974.github.io/bimtakeoff-website
```

---

## Status Checklist

- [x] LinkedIn Insight Tag code added to _quarto.yml
- [ ] Partner ID replaced (XXXXXX → Your actual ID)
- [ ] Site rebuilt with `quarto render`
- [ ] Changes pushed to GitHub
- [ ] Tag verified with LinkedIn Tag Helper
- [ ] Conversion events created in Campaign Manager
- [ ] UTM parameters added to campaign URLs
- [ ] Dashboard created for monitoring

**ETA to complete:** 30-45 minutes

---

## Questions?

If you need help with:
- Getting Partner ID from LinkedIn
- Setting up Conversion tracking
- Creating UTM parameters
- Verifying tag installation

Just ask! 🚀

---

**Document created:** 2025-11-08  
**Last updated:** 2025-11-08  
**Next review:** After first campaign launch (Week 1)
