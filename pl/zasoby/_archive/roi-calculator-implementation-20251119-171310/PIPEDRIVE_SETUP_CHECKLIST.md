# PIPEDRIVE SETUP CHECKLIST
**For Polish ROI Calculator Implementation**

Print this page and check off items as you complete them.

---

## PART 1: CREATE WEB FORM (15 minutes)

### Step 1: Start Form Creation
- [ ] Log into Pipedrive
- [ ] Go to Settings → Web Forms
- [ ] Click "Create web form" button
- [ ] Name: "ROI Calculator - Polish"

### Step 2: Add Standard Fields
- [ ] Add "Person name" field → Label: "Imię i nazwisko" → Mark as REQUIRED
- [ ] Add "Email" field → Mark as REQUIRED
- [ ] Add "Phone" field → Label: "Telefon"
- [ ] Add "Organization name" field → Label: "Nazwa firmy"

### Step 3: Add Custom Fields
_(Create these in Settings → Data fields first if they don't exist)_

- [ ] "Typ projektu" (Dropdown)
  - [ ] Spółdzielnia mieszkaniowa
  - [ ] Deweloper
  - [ ] Komercyjny
  - [ ] Przemysłowy
  - [ ] Termomodernizacja
  - [ ] Infrastruktura

- [ ] "Wartość projektu" (Number field)

- [ ] "Szacowane oszczędności" (Number field)

- [ ] "ROI %" (Number field)

- [ ] "Waluta" (Text field) → Set default value: "PLN"

- [ ] "Źródło leadu" (Text field, hidden) → Default: "Kalkulator ROI PL"

- [ ] "Język" (Text field, hidden) → Default: "Polski"

- [ ] "Oś czasu projektu" (Dropdown)
  - [ ] Natychmiast (0-3 miesiące)
  - [ ] 1-3 miesiące
  - [ ] 3-6 miesięcy
  - [ ] 6-12 miesięcy
  - [ ] Badania

### Step 4: RODO Compliance
- [ ] Add "Privacy Policy" checkbox
- [ ] Mark as REQUIRED
- [ ] Set text: "Zgadzam się z polityką prywatności i wyrażam zgodę na kontakt"
- [ ] Add link to: https://bimtakeoff.com/pl/polityka-prywatnosci

### Step 5: Form Appearance
- [ ] Set primary color: #FF9900
- [ ] Submit button text: "Pobierz raport"
- [ ] Success message: "Dziękujemy! Twój raport zostanie wkrótce wysłany."
- [ ] Redirect URL: https://bimtakeoff.com/pl/zasoby/kalkulator-roi-dziekujemy

### Step 6: Save and Get Code
- [ ] Click "Save" button
- [ ] Click "Get embed code"
- [ ] Copy the form URL (it looks like: `https://webforms.pipedrive.com/f/aBcDeF123456`)
- [ ] Write it here: ________________________________

---

## PART 2: UPDATE CALCULATOR PAGE (2 minutes)

- [ ] Open file: `/pl/zasoby/kalkulator-roi.qmd` in text editor
- [ ] Find line ~215 (search for: `[POLISH_FORM_ID_HERE]`)
- [ ] Replace `[POLISH_FORM_ID_HERE]` with your form URL
- [ ] Save the file

**Example:**  
Before: `data-pd-webforms="https://webforms.pipedrive.com/f/[POLISH_FORM_ID_HERE]"`  
After: `data-pd-webforms="https://webforms.pipedrive.com/f/aBcDeF123456"`

---

## PART 3: CREATE EMAIL TEMPLATE (10 minutes)

### Step 1: Create Template
- [ ] Go to Settings → Email templates
- [ ] Click "New template"
- [ ] Template name: "ROI Calculator Report - Polish"

### Step 2: Set Subject Line
- [ ] Subject: `Twoja Analiza ROI BIM Takeoff - Oszczędź {{Szacowane oszczędności}} PLN`

### Step 3: Email Body
- [ ] Copy email template from QUICK_START_GUIDE.md
- [ ] Paste into email body
- [ ] Verify all merge fields work: {{Imię i nazwisko}}, {{Wartość projektu}}, etc.
- [ ] Add your Calendly link if available
- [ ] Save template

---

## PART 4: SET UP AUTOMATION (5 minutes)

### Step 1: Create Workflow
- [ ] Go to Automation → Create workflow
- [ ] Name: "Polish ROI Calculator Leads"

### Step 2: Set Trigger
- [ ] Trigger: "Deal is created"
- [ ] Filter: "Created by web form" = "ROI Calculator - Polish"

### Step 3: Add Actions
- [ ] Action 1: Send email → Select "ROI Calculator Report - Polish" template
- [ ] Action 2: Add note → Text: "Lead from Polish ROI Calculator - requires follow-up in Polish"
- [ ] Action 3: Add label → "PL Market"
- [ ] Action 4: Update field "Język" → Value: "Polski"
- [ ] (Optional) Action 5: Assign deal to Polish-speaking team member

### Step 4: Activate
- [ ] Review workflow
- [ ] Click "Activate workflow"
- [ ] Confirm activation

---

## PART 5: TEST EVERYTHING (10 minutes)

### Test Calculator Locally (if possible)
- [ ] Run: `cd /Users/robertkowalski/Documents/bimtakeoff-website`
- [ ] Run: `quarto preview`
- [ ] Open: http://localhost:4200/pl/zasoby/kalkulator-roi
- [ ] Fill calculator with test data
- [ ] Click "Oblicz Moje Oszczędności"
- [ ] Results show in Polish with PLN currency

### Test Form Submission
- [ ] Click "Pobierz Pełny Raport ROI"
- [ ] Modal opens with Pipedrive form
- [ ] Fill form with test data (use your real email for testing)
- [ ] Submit form

### Verify in Pipedrive (wait 1-2 minutes)
- [ ] New deal appears in Pipedrive
- [ ] Deal has "PL Market" label
- [ ] All custom fields populated correctly
- [ ] Email sent automatically
- [ ] Check your email inbox for Polish template

### Test PDF
- [ ] PDF downloaded after form submission
- [ ] PDF contains Polish content
- [ ] Formatting looks professional
- [ ] All data from calculator included

### Test Thank You Page
- [ ] Redirected to thank you page
- [ ] Page displays in Polish
- [ ] "Manual download" button works
- [ ] Contact links functional

---

## PART 6: DEPLOY TO PRODUCTION (5 minutes)

- [ ] All tests passed
- [ ] Run: `cd /Users/robertkowalski/Documents/bimtakeoff-website`
- [ ] Run: `quarto render`
- [ ] Check for any errors in render output
- [ ] Run: `./deploy.sh`
- [ ] Wait for deployment to complete
- [ ] Visit live site: https://bimtakeoff.com/pl/zasoby/kalkulator-roi
- [ ] Test calculator on live site
- [ ] Submit one test lead from live site
- [ ] Verify everything works

---

## POST-LAUNCH CHECKLIST

### Week 1 Monitoring
- [ ] Check Pipedrive daily for new Polish leads
- [ ] Respond to leads within 24 hours
- [ ] Track conversion rate (visits → leads)
- [ ] Monitor Google Analytics for Polish calculator traffic
- [ ] Check for JavaScript errors in browser console

### Optimization Tasks
- [ ] Review first 5-10 lead submissions for data quality
- [ ] Adjust form fields if needed
- [ ] A/B test email subject lines
- [ ] Optimize calculator copy based on user feedback
- [ ] Add tracking for abandonment points

---

## TROUBLESHOOTING CONTACTS

**Pipedrive Support:**
- Help Center: https://support.pipedrive.com
- Email: support@pipedrive.com
- Web Forms Guide: https://support.pipedrive.com/en/article/web-forms

**Technical Issues:**
- Check: `/pl/zasoby/_archive/roi-calculator-implementation-[date]/QUICK_START_GUIDE.md`
- Browser console for JavaScript errors
- Quarto render output for build errors

---

## SUCCESS! 🎉

When you've checked all boxes above, your Polish ROI Calculator is:
✅ Fully functional
✅ Capturing leads
✅ Sending automated emails
✅ Tracking analytics
✅ Ready to generate Polish market leads

---

**Completed by:** _________________ **Date:** _________________

**Notes/Issues encountered:**

_________________________________________________________________________

_________________________________________________________________________

_________________________________________________________________________

