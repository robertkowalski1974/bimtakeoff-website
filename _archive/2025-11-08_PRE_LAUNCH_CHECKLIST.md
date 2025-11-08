# PRE-LAUNCH CHECKLIST - LinkedIn Campaign Ready

**Data:** 2025-11-08  
**Target Launch Date:** Za 3 dni (2025-11-11)

---

## 🔴 PRIORYTET 0 - MUSI BYĆ ZROBIONE (Dzisiaj - 2h)

### 1. LinkedIn Insight Tag - Partner ID ⏱️ 15 min

- [ ] Idź do linkedin.com/campaignmanager
- [ ] "Account Assets" → "Insight Tag" → "See my Insight Tag"
- [ ] Skopiuj swój Partner ID (6-7 cyfr)
- [ ] Otwórz `_quarto.yml`
- [ ] Zamień `XXXXXX` na swój Partner ID (2 miejsca: linia ~140 i ~220)
- [ ] **Test:** Grep verify: `grep -r "_linkedin_partner_id" _quarto.yml` (nie powinno pokazać XXXXXX)

**Documentation:** `/Users/robertkowalski/Documents/bimtakeoff-website/_archive/2025-11-08_LINKEDIN_INSIGHT_TAG_SETUP.md`

---

### 2. Rebuild & Deploy ⏱️ 5 min

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
git add .
git commit -m "Add LinkedIn Insight Tag for campaign tracking"
git push origin main
```

- [ ] Run commands above
- [ ] Wait 2-3 minutes for GitHub Pages to deploy
- [ ] Visit: https://robertkowalski1974.github.io/bimtakeoff-website
- [ ] View Page Source (Cmd+U)
- [ ] Search for: `_linkedin_partner_id`
- [ ] **Verify:** See your Partner ID (not XXXXXX) ✅

---

### 3. LinkedIn Company Page Check ⏱️ 10 min

- [ ] Odwiedź: linkedin.com/company/bimtakeoff (lub stwórz jeśli nie istnieje)
- [ ] Sprawdź czy masz dostęp Admin
- [ ] Uzupełnij pełny profil:
  - [ ] Logo uploaded
  - [ ] Banner image (1584x396px)
  - [ ] Company description (używając tekstu z dokumentu)
  - [ ] Website: https://bimtakeoff.com
  - [ ] Industry: Construction
  - [ ] Location: Warsaw, Poland
- [ ] Dodaj pierwszy post (opcjonalnie - ale lepiej mieć kilka postów przed ads)

---

### 4. Lead Magnet - "Checklist Dobrego Przetargu" PDF ⏱️ 1h

**To jest wymagane przez Kampanię 1 LinkedIn!**

#### Treść PDF (1 strona, branded):

**Nagłówek:**
```
CHECKLIST DOBREGO PRZETARGU
10 Punktów Kontrolnych Przed Ogłoszeniem
```

**10 Checkboxów:**
```
□ 1. Szczegółowy zakres robót (nie ogólnikowy)
□ 2. Pełny przedmiar (BOQ) z jednostkami miary
□ 3. Specyfikacja techniczna (STWiOR) bez luk
□ 4. Kryteria oceny (nie tylko cena - także jakość, doświadczenie)
□ 5. Wzór umowy chroniący zamawiającego
□ 6. Realistyczny budżet (wycena rynkowa, nie "z sufitu")
□ 7. Jasne warunki płatności i zabezpieczenia
□ 8. Procedura zgłaszania pytań przez oferentów
□ 9. Termin wiążący oferentów (min. 30 dni)
□ 10. Plan kontroli jakości i nadzoru
```

**Footer:**
```
🔥 Darmowa Analiza Waszego Przetargu
Wyślij dokumenty na: info@bimtakeoff.com
Odpowiedź w 48h

BIM Takeoff | +48 508 209 313 | bimtakeoff.com
2000+ Projektów | UK & Australia Standards
```

**Design:**
- Use brand colors (Orange #FF9900, Charcoal #2C2C2C)
- Professional layout (Canva or Word → Export PDF)
- Save as: `Checklist_Dobrego_Przetargu_BIMTakeoff.pdf`

**Where to upload:**
- [ ] Upload to: `/Users/robertkowalski/Documents/bimtakeoff-website/docs/resources/`
- [ ] Test download link: https://robertkowalski1974.github.io/bimtakeoff-website/resources/Checklist_Dobrego_Przetargu_BIMTakeoff.pdf

---

## 🟡 PRIORYTET 1 - POWINNO BYĆ ZROBIONE (Jutro - 3h)

### 5. LinkedIn Campaign Graphics ⏱️ 2h

**Format:** 1200x627px (LinkedIn optimal)  
**Tool:** Canva Pro (jeśli masz) lub Photoshop

#### Graphic 1: "Tender Disaster"
```
Background: Charcoal #2C2C2C
Main Image: Stack dokumentów przetargowych (mockup)
Red X overlays: Pokazujące błędy
Text Overlay (Orange): "70% PRZETARGÓW UPADA"
Logo: Bottom right corner
```

#### Graphic 2: "Case Study"
```
Background: White
Layout: Before/After split
LEFT side: "BYŁO" - 4 oferty (12M, 14M, 16M, 18M) - red
RIGHT side: "JEST" - 6 ofert (8M, 8.5M, 9M, 9.5M, 10M, 11M) - green
Big number: "3M PLN ZAOSZCZĘDZONE"
Logo: Bottom center
```

#### Graphic 3: "Complete Service"
```
Background: Orange #FF9900
4 Phases Timeline (horizontal):
📊 WYCENA → 📋 PRZETARG → 👁️ NADZÓR → ✅ ROZLICZENIE
Icons above each phase
Text: "JEDEN CZŁOWIEK. CAŁY PROCES."
Logo: Top right
```

**Save locations:**
- [ ] `/Users/robertkowalski/Documents/bimtakeoff-website/images/linkedin-ads/`
- [ ] Naming: `linkedin-ad-tender-disaster.png`, `linkedin-ad-case-study.png`, `linkedin-ad-complete-service.png`

---

### 6. Google Analytics 4 - Conversion Goals ⏱️ 30 min

**If you have GA4 setup:**

- [ ] Go to: analytics.google.com → Admin → Events
- [ ] Create Custom Event: "lead_form_submit"
- [ ] Parameters:
  ```
  event_name: lead_form_submit
  form_type: bezplatna_analiza
  landing_page: /pl/branze/spoldzielnie-mieszkaniowe
  ```
- [ ] Mark as Conversion: Yes
- [ ] Create another: "phone_click"
- [ ] Create another: "email_click"

**If you DON'T have GA4:**
- [ ] Skip for now (LinkedIn Insight Tag is enough for campaign tracking)

---

### 7. UTM Parameter Sheet ⏱️ 15 min

Create Google Sheet with campaign URLs:

| Campaign Name | Landing URL |
|--------------|-------------|
| Tender Disaster | `https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=tender-disaster&utm_content=spoldzielnie` |
| Case Study | `https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=case-study-3m&utm_content=spoldzielnie` |
| Complete Service | `https://robertkowalski1974.github.io/bimtakeoff-website/pl/branze/spoldzielnie-mieszkaniowe.html?utm_source=linkedin&utm_medium=paid&utm_campaign=complete-service&utm_content=spoldzielnie` |

- [ ] Save sheet
- [ ] Test each URL (should load landing page correctly)

---

### 8. Email Auto-Responder ⏱️ 20 min

**Setup in your email client (Gmail/Outlook/Pipedrive):**

**Template: "Dziękujemy za zgłoszenie"**

```
Temat: Potwierdzenie - Bezpłatna Analiza Przetargu

Dzień dobry,

Dziękujemy za przesłanie dokumentacji przetargowej.

W ciągu 48 godzin otrzymacie Państwo:
✅ Szczegółowy raport błędów i możliwości poprawy
✅ Szacowane potencjalne oszczędności
✅ Propozycję dalszej współpracy

W międzyczasie, jeśli macie Państwo pilne pytania:
📞 +48 508 209 313
✉️ info@bimtakeoff.com

Pozdrawiam,
[Imię]
BIM Takeoff
Expert Quantity Surveyor

---
2000+ Projektów | UK & Australia Standards
bimtakeoff.com
```

- [ ] Create template
- [ ] Test: Send yourself email, check formatting

---

## 🟢 PRIORYTET 2 - NICE TO HAVE (Dzień 3 - 2h)

### 9. LinkedIn Tag Helper - Verification ⏱️ 10 min

- [ ] Install: LinkedIn Insight Tag Helper (Chrome Extension)
- [ ] Visit: https://robertkowalski1974.github.io/bimtakeoff-website
- [ ] Click extension icon
- [ ] **Should see:** ✅ "LinkedIn Tag detected - Partner ID: [Your ID]"

**If not detected:**
- Check _quarto.yml (czy Partner ID jest podmieniony)
- Rebuild & redeploy
- Hard refresh browser (Cmd+Shift+R)

---

### 10. CRM/Spreadsheet dla Lead Tracking ⏱️ 30 min

**Google Sheet: "LinkedIn Campaign Leads - Nov 2025"**

**Columns:**
```
| Date | Name | Company | Email | Phone | Campaign Source | Status | Notes | Next Action |
```

**Status Options:**
- New Lead
- Contacted (1st outreach)
- Meeting Scheduled
- Audit Delivered
- Proposal Sent
- Won
- Lost

- [ ] Create sheet
- [ ] Share with team (if applicable)
- [ ] Setup notifications (Google Sheets → Tools → Notification rules)

---

### 11. LinkedIn Campaign Manager - Final Check ⏱️ 30 min

**Before launching campaigns:**

- [ ] Billing method added (Credit Card)
- [ ] Company Page selected in account dropdown
- [ ] Test budget: Start with 700 PLN for Campaign 1
- [ ] Audience saved:
  ```
  Name: "Spółdzielnie Mieszkaniowe - Warszawa/Kraków"
  Job Titles: Prezes Zarządu, Członek Zarządu, Dyrektor
  Company Size: 50-200 employees
  Industry: Real Estate, Property Management
  Location: Warsaw, Kraków
  ```
- [ ] Ad creative uploaded (Graphic 1: Tender Disaster)
- [ ] Landing URL with UTM: Ready to paste
- [ ] Campaign scheduled: NOT launched yet (launch gdy wszystko gotowe)

---

### 12. First Week Monitoring Plan ⏱️ 20 min

**Create calendar reminders:**

**Day 1 (Launch day):**
- [ ] 10:00 - Launch Campaign 1 (700 PLN)
- [ ] 15:00 - Check first 5 hours metrics
- [ ] 18:00 - End of day review

**Day 2:**
- [ ] 10:00 - Morning metrics review
- [ ] 14:00 - Respond to any leads (if any)
- [ ] 18:00 - End of day review

**Day 3:**
- [ ] 10:00 - 48h review
- [ ] Decision: Pause underperformers or continue?
- [ ] If CTR < 0.5% → pause, analyze, adjust

**Day 7:**
- [ ] Full week analysis
- [ ] Cost per lead calculation
- [ ] Decision: Scale (+50% budget) or pivot?

---

## 🔵 OPTIONAL - Future Enhancements (Week 2+)

### 13. Case Study PDF ⏱️ 2h
- Create "Jak spółdzielnia zaoszczędziła 3M PLN" PDF
- Even UK example translated to Polish is OK for start

### 14. Video Testimonial
- When you have first Polish client
- 60 second video for LinkedIn

### 15. Retargeting Audiences
- Setup Website Retargeting (requires 300+ visitors)
- Lookalike Audiences (requires 300+ matched profiles)

---

## Summary - Time Investment

**Total Time to Launch:** 6-7 hours over 3 days

| Priority | Tasks | Time | When |
|----------|-------|------|------|
| P0 - Critical | Insight Tag + Deploy + Lead Magnet | 2h | Today |
| P1 - Important | Graphics + GA4 + UTMs | 3h | Tomorrow |
| P2 - Nice to Have | Verification + CRM + Monitoring Plan | 2h | Day 3 |
| **TOTAL** | | **7h** | **3 days** |

**Launch Target:** 2025-11-11 (Monday)

---

## Quick Start Commands

```bash
# Check Partner ID in _quarto.yml
grep "_linkedin_partner_id" /Users/robertkowalski/Documents/bimtakeoff-website/_quarto.yml

# Rebuild site
cd /Users/robertkowalski/Documents/bimtakeoff-website && quarto render

# Deploy
git add . && git commit -m "LinkedIn Insight Tag + Campaign prep" && git push origin main

# Verify live
open https://robertkowalski1974.github.io/bimtakeoff-website
```

---

## Checklist Status

- [ ] P0 - LinkedIn Insight Tag Partner ID replaced
- [ ] P0 - Site rebuilt and deployed
- [ ] P0 - Lead Magnet PDF created
- [ ] P1 - 3 Campaign graphics created
- [ ] P1 - UTM parameters sheet created
- [ ] P1 - Email auto-responder setup
- [ ] P2 - Tag verification done
- [ ] P2 - CRM/tracking sheet created
- [ ] P2 - Monitoring calendar setup

**When all checked:** ✅ **READY TO LAUNCH CAMPAIGN**

---

## Questions/Issues?

**Stuck on something?** Ask for help with:
- LinkedIn Partner ID retrieval
- PDF creation (Checklist)
- Graphic design (can provide Canva templates)
- Campaign setup in LinkedIn Manager

**Good luck! 🚀**

---

**Created:** 2025-11-08  
**Launch Target:** 2025-11-11  
**Review:** After Week 1 of campaign
