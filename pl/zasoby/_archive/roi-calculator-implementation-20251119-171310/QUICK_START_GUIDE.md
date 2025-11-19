# POLISH ROI CALCULATOR - QUICK START GUIDE
**Created:** 2025-11-19  
**Status:** Ready for Pipedrive Configuration

## ✅ WHAT HAS BEEN COMPLETED

### 1. Polish Calculator Page (`/pl/zasoby/kalkulator-roi.qmd`)
- ✅ Complete Polish translation of all UI elements
- ✅ Polish-specific formatting (currency, numbers)
- ✅ PLN currency as default
- ✅ Polish project type descriptions
- ✅ Polish form labels and buttons
- ✅ Pipedrive form integration structure (needs Form ID)
- ✅ RODO compliance messaging
- ✅ Polish phone number (+48 508 209 313)
- ✅ Professional Polish branding

### 2. Polish Thank You Page (`/pl/zasoby/kalkulator-roi-dziekujemy.qmd`)
- ✅ Complete Polish language version
- ✅ Loading and success states
- ✅ Manual PDF download button
- ✅ Benefits showcase
- ✅ Case study statistics
- ✅ Free resources links
- ✅ Contact CTA section
- ✅ Mobile responsive design

### 3. JavaScript Calculator (`/js/roi-calculator.js`)
- ✅ Language detection from URL (`/pl/` = Polish)
- ✅ Automatic PLN currency default for Polish
- ✅ Polish number formatting (space separators)
- ✅ Currency symbol positioning (zł after number)
- ✅ Multi-language support infrastructure
- ✅ Google Analytics tracking by language
- ✅ Pipedrive integration hooks
- ✅ PDF generation with Polish content

### 4. File Structure
```
/pl/zasoby/
├── kalkulator-roi.qmd ✅
├── kalkulator-roi-dziekujemy.qmd ✅
└── _archive/
    └── roi-calculator-implementation-[timestamp]/ ✅
        ├── IMPLEMENTATION_CHANGELOG.md ✅
        ├── QUICK_START_GUIDE.md ✅ (this file)
        └── kalkulator-roi.qmd.backup ✅
```

---

## 🔧 WHAT YOU NEED TO DO NOW

### STEP 1: Create Polish Pipedrive Web Form (15 minutes)

1. **Log into Pipedrive**
   - Go to Settings → Web Forms
   - Click "Create web form"

2. **Configure Form Settings**
   - **Form name:** ROI Calculator - Polish
   - **Language:** Polish (if available) or English
   - **Success page:** `https://bimtakeoff.com/pl/zasoby/kalkulator-roi-dziekujemy`

3. **Add These Fields (in Polish):**

   **Standard Fields:**
   - ☑ Imię i nazwisko (Full name) - **REQUIRED**
   - ☑ Email - **REQUIRED**
   - ☑ Telefon (Phone)
   - ☑ Nazwa firmy (Company name)

   **Custom Fields (create if don't exist):**
   - ☑ Typ projektu (Project type) - Dropdown
     - Options: Spółdzielnia, Deweloper, Komercyjny, Przemysłowy, Termomodernizacja, Infrastruktura
   - ☑ Wartość projektu (Project value) - Number field
   - ☑ Szacowane oszczędności (Estimated savings) - Number field
   - ☑ ROI % - Number field
   - ☑ Waluta (Currency) - Text field (pre-fill: PLN)
   - ☑ Źródło leadu (Lead source) - Hidden field (value: "Kalkulator ROI PL")
   - ☑ Język (Language) - Hidden field (value: "Polski")
   - ☑ Oś czasu projektu (Project timeline) - Dropdown
     - Options: Natychmiast, 1-3 miesiące, 3-6 miesięcy, 6+ miesięcy

4. **RODO Compliance**
   - ☑ Add mandatory RODO consent checkbox
   - Text: "Zgadzam się z polityką prywatności i wyrażam zgodę na kontakt w sprawie usług BIM Takeoff"
   - Link to: `https://bimtakeoff.com/pl/polityka-prywatnosci`

5. **Form Appearance**
   - Primary color: #FF9900 (BIM orange)
   - Button text: "Pobierz raport" (Download report)
   - Success message: "Dziękujemy! Twój raport zostanie wkrótce wysłany."

6. **Get the Form Code**
   - After saving, click "Embed code"
   - Copy the data-pd-webforms URL
   - It will look like: `https://webforms.pipedrive.com/f/aBcDeF123456`

7. **Update the Calculator Page**
   - Open: `/pl/zasoby/kalkulator-roi.qmd`
   - Find line ~215: `data-pd-webforms="https://webforms.pipedrive.com/f/[POLISH_FORM_ID_HERE]"`
   - Replace `[POLISH_FORM_ID_HERE]` with your actual form ID
   - Example: `data-pd-webforms="https://webforms.pipedrive.com/f/aBcDeF123456"`

### STEP 2: Create Polish Email Template (10 minutes)

1. **In Pipedrive**
   - Go to Settings → Email templates
   - Click "New template"

2. **Template Configuration**
   - **Name:** ROI Calculator Report - Polish
   - **Subject:** `Twoja Analiza ROI BIM Takeoff - Oszczędź {{Szacowane oszczędności}} PLN`

3. **Email Body** (use this template):

```
Szanowny/a {{Imię i nazwisko}},

Dziękujemy za skorzystanie z naszego Kalkulatora ROI BIM 5D! 

Na podstawie podanych informacji, oto Twoja spersonalizowana analiza:

══════════════════════════════════════════
PODSUMOWANIE ANALIZY ROI
══════════════════════════════════════════

Wartość projektu:        {{Wartość projektu}} {{Waluta}}
Szacowane oszczędności:  {{Szacowane oszczędności}} {{Waluta}}
Zwrot z inwestycji:      {{ROI %}}%
Typ projektu:            {{Typ projektu}}

══════════════════════════════════════════
CO TE OSZCZĘDNOŚCI OZNACZAJĄ DLA CIEBIE
══════════════════════════════════════════

Dzięki kosztorysowaniu BIM 5D możesz zaoszczędzić około 
{{Szacowane oszczędności}} {{Waluta}} na swoim projekcie poprzez:

• Szybsze kosztorysowanie (3-10 dni vs 6-8 tygodni)
• Dokładność ±5% (vs ±15-25% tradycyjnie)
• Redukcja zmian projektowych
• Lepsze decyzje zakupowe
• Wykrywanie kolizji przed budową
• Optymalizacja materiałów

To reprezentuje {{ROI %}}% zwrotu z inwestycji!

══════════════════════════════════════════
NASTĘPNE KROKI
══════════════════════════════════════════

Umówmy bezpłatną 15-minutową konsultację, aby omówić jak możemy 
pomóc osiągnąć te oszczędności w Twoim projekcie.

📅 Umów się: [dodaj link Calendly]
📞 Zadzwoń: +48 508 209 313
📧 Odpowiedz na ten email

══════════════════════════════════════════
O BIM TAKEOFF
══════════════════════════════════════════

✓ 20+ lat międzynarodowego doświadczenia
✓ 2000+ zrealizowanych projektów
✓ Zgodność z ISO 19650 i BIM 2030
✓ Specjalizacja w polskim rynku

Z poważaniem,

Robert Kowalski
Założyciel i Główny Kosztorysant
BIM Takeoff

🌐 www.bimtakeoff.com/pl
📧 info@bimtakeoff.com
☎️ +48 508 209 313

P.S. Dla spółdzielni mieszkaniowych oferujemy bezpłatny audyt 
pierwszego przetargu - sprawdź naszą specjalną ofertę!
```

### STEP 3: Set Up Automation (5 minutes)

1. **Create Workflow**
   - In Pipedrive: Automation → Create new workflow
   - Name: "Polish ROI Calculator Leads"

2. **Trigger:**
   - When: Deal is created
   - From: Your new Polish web form

3. **Actions:**
   - Action 1: Send email (use Polish template above)
   - Action 2: Add note: "Lead from Polish ROI Calculator - requires follow-up in Polish"
   - Action 3: Add label: "PL Market"
   - Action 4: Set language field to "Polish"
   - Action 5: (Optional) Assign to Polish-speaking team member

### STEP 4: Test Everything (10 minutes)

1. **Test Calculator**
   - Go to: `http://localhost:4200/pl/zasoby/kalkulator-roi` (if running locally)
   - Or deploy first and test on live site
   - Fill in project details
   - Click "Oblicz Moje Oszczędności"
   - Verify results show in Polish with PLN currency

2. **Test Form Submission**
   - Click "Pobierz Pełny Raport ROI"
   - Pipedrive form should load
   - Fill out form with test data
   - Submit form

3. **Verify in Pipedrive**
   - Check if new deal created
   - Verify all custom fields populated
   - Check if email sent
   - Verify lead has Polish language tag

4. **Test PDF Generation**
   - After form submission, PDF should download
   - Open PDF and verify Polish content
   - Check formatting and branding

### STEP 5: Deploy to Production

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Preview locally first
quarto preview

# If everything looks good, render and deploy
quarto render
./deploy.sh
```

---

## 📊 GOOGLE ANALYTICS SETUP (Optional but Recommended)

### Events to Track:

1. **Calculator View**
   - Event: `page_view`
   - Parameters: `page_language: 'pl'`, `page_path: '/pl/zasoby/kalkulator-roi'`

2. **Calculator Completed**
   - Event: `roi_calculated`
   - Parameters:
     - `calculator_language: 'pl'`
     - `currency: 'PLN'`
     - `project_value: [number]`
     - `estimated_savings: [number]`

3. **Lead Form Opened**
   - Event: `lead_modal_opened`
   - Parameters: `calculator_language: 'pl'`

4. **Form Submitted**
   - Event: `lead_submitted`
   - Parameters:
     - `form_language: 'pl'`
     - `lead_source: 'roi_calculator'`
     - `project_value: [number]`

### Goals to Set Up:

1. **Goal: Polish ROI Calculation**
   - Type: Event
   - Event name: `roi_calculated`
   - Condition: `calculator_language = 'pl'`

2. **Goal: Polish Lead Submission**
   - Type: Event
   - Event name: `lead_submitted`
   - Condition: `form_language = 'pl'`

---

## 🐛 TROUBLESHOOTING

### Issue: Form doesn't load
**Solution:** Check that Pipedrive form ID is correct in `kalkulator-roi.qmd`

### Issue: Numbers display incorrectly in Polish
**Solution:** Calculator automatically uses Polish locale for PLN. If issue persists, check browser console for JavaScript errors.

### Issue: PDF doesn't download
**Solution:** 
1. Check that jsPDF library is loading (`/js/jspdf.umd.min.js`)
2. Check browser console for errors
3. Try manual download button on thank you page

### Issue: Emails not sending
**Solution:**
1. Verify automation is active in Pipedrive
2. Check email template is correctly configured
3. Verify custom fields match between form and template

### Issue: Wrong currency showing
**Solution:** Polish page should default to PLN. Check that URL contains `/pl/` path.

---

## 📱 MOBILE TESTING CHECKLIST

- [ ] Calculator displays correctly on mobile
- [ ] Form fields are easily tappable
- [ ] Modal scrolls properly on small screens
- [ ] Currency and number formatting readable
- [ ] Buttons are large enough for touch
- [ ] Results panel scrolls into view after calculation

---

## 🎯 SUCCESS METRICS TO TRACK

### Week 1:
- [ ] 10+ calculator sessions
- [ ] 3+ form submissions
- [ ] 0 JavaScript errors
- [ ] Form successfully creates Pipedrive deals

### Month 1:
- [ ] 100+ calculator sessions
- [ ] 20+ qualified leads
- [ ] 5% conversion rate (session → lead)
- [ ] 2+ meetings booked

### Month 3:
- [ ] 500+ sessions
- [ ] 100+ leads
- [ ] 10% conversion rate
- [ ] 1-2 clients signed

---

## 📞 NEED HELP?

**Implementation Questions:**
- Check `/pl/zasoby/_archive/PL-ROI-CALCULATOR-IMPLEMENTATION-PLAN.md` for detailed technical documentation

**Pipedrive Questions:**
- Pipedrive Support: https://support.pipedrive.com
- Web Forms Documentation: https://support.pipedrive.com/en/article/web-forms

**Technical Issues:**
- Check browser console for JavaScript errors
- Review Quarto render output for build errors
- Test in multiple browsers (Chrome, Firefox, Safari)

---

## ✅ PRE-LAUNCH CHECKLIST

Before going live with Polish calculator:

- [ ] Polish Pipedrive form created
- [ ] Form ID updated in `kalkulator-roi.qmd`
- [ ] Polish email template created
- [ ] Automation workflow configured
- [ ] Test submission completed successfully
- [ ] Pipedrive deal created correctly
- [ ] Email received in Polish
- [ ] PDF downloads correctly
- [ ] Thank you page displays properly
- [ ] Mobile testing completed
- [ ] Google Analytics goals configured
- [ ] Team briefed on Polish lead handling
- [ ] Polish response templates prepared
- [ ] Calendly link updated (if needed)

---

## 🚀 READY TO LAUNCH!

Once you've completed steps 1-5 above, your Polish ROI calculator will be fully functional and ready to generate leads from the Polish market.

The calculator will:
- ✅ Display entirely in Polish
- ✅ Default to PLN currency
- ✅ Use Polish number formatting
- ✅ Capture leads in Pipedrive
- ✅ Send automated Polish emails
- ✅ Generate PDF reports
- ✅ Track analytics separately for Polish market

**Last updated:** 2025-11-19  
**Next review:** After first 10 Polish leads captured

