# POLISH ROI CALCULATOR - COMPLETE SYSTEM DIAGRAM

## 📊 SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        POLISH ROI CALCULATOR FLOW                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│   USER ARRIVES      │
│  bimtakeoff.com/pl  │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│  Visits Calculator  │
│  /pl/zasoby/        │
│  kalkulator-roi     │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐     ┌──────────────────────────┐
│  JavaScript Detects │────→│  Language: Polish         │
│  URL contains /pl/  │     │  Currency: PLN (default)  │
└──────────┬──────────┘     │  Locale: pl-PL            │
           │                └──────────────────────────┘
           v
┌─────────────────────┐
│   User Fills Form   │
│  • Project type     │
│  • Project value    │
│  • Timeline         │
│  • Cost variance    │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│  Clicks "Oblicz"    │
│  (Calculate)        │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐     ┌──────────────────────────┐
│  ROI Calculated     │────→│  Results Display:         │
│  in JavaScript      │     │  • Total savings in PLN   │
└──────────┬──────────┘     │  • Time savings (dni)     │
           │                │  • Accuracy improvement   │
           │                │  • ROI percentage         │
           │                └──────────────────────────┘
           v
┌─────────────────────┐
│  User Clicks        │
│  "Pobierz Pełny     │
│   Raport ROI"       │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐     ┌──────────────────────────┐
│  Modal Opens with   │────→│  PIPEDRIVE FORM           │
│  Pipedrive Form     │     │  (Polish fields)          │
└─────────────────────┘     │  • Imię i nazwisko        │
                            │  • Email                  │
                            │  • Telefon                │
                            │  • Nazwa firmy            │
                            │  • Typ projektu           │
                            │  • Wartość projektu       │
                            │  • RODO checkbox ✓        │
                            └────────────┬──────────────┘
                                         │
                                         v
                            ┌────────────────────────┐
                            │  User Submits Form     │
                            └────────────┬───────────┘
                                         │
                     ┌───────────────────┴───────────────────┐
                     │                                       │
                     v                                       v
        ┌────────────────────────┐           ┌──────────────────────────┐
        │  PIPEDRIVE CREATES     │           │  PDF GENERATED           │
        │  NEW DEAL              │           │  • Polish content        │
        │  • All fields captured │           │  • Calculator results    │
        │  • Label: "PL Market"  │           │  • Professional format   │
        │  • Language: Polski    │           │  • Auto-download         │
        │  • Source: Calculator  │           └──────────┬───────────────┘
        └────────────┬───────────┘                      │
                     │                                   │
                     v                                   │
        ┌────────────────────────┐                      │
        │  AUTOMATION TRIGGERS   │                      │
        │  • Send Polish email   │                      │
        │  • Add note            │                      │
        │  • Assign to team      │                      │
        └────────────┬───────────┘                      │
                     │                                   │
                     v                                   │
        ┌────────────────────────┐                      │
        │  EMAIL SENT TO USER    │                      │
        │  (Polish template)     │                      │
        │  • Calculation summary │                      │
        │  • Next steps          │                      │
        │  • Contact info        │                      │
        └────────────────────────┘                      │
                                                         │
                     ┌───────────────────────────────────┘
                     │
                     v
        ┌────────────────────────┐
        │  THANK YOU PAGE        │
        │  /kalkulator-roi-      │
        │  dziekujemy            │
        │  • Polish language     │
        │  • Manual PDF button   │
        │  • Contact CTAs        │
        │  • Resources           │
        └────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      GOOGLE ANALYTICS TRACKING                           │
├─────────────────────────────────────────────────────────────────────────┤
│  Event 1: page_view           → calculator_language: 'pl'               │
│  Event 2: roi_calculated      → currency: 'PLN', project_value          │
│  Event 3: lead_modal_opened   → calculator_completed: true              │
│  Event 4: lead_submitted      → form_language: 'pl', market: 'Poland'  │
│  Event 5: pdf_downloaded      → lead_name, estimated_savings            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW DIAGRAM

```
┌──────────────────────────────────────────────────────────────┐
│                     DATA CAPTURE POINTS                       │
└──────────────────────────────────────────────────────────────┘

STAGE 1: Calculator Input
┌─────────────────────┐
│  User Enters:       │
│  • Project type     │──┐
│  • Project value    │  │
│  • Timeline         │  │  Stored in JavaScript
│  • Cost variance    │  │  (calculatedResults object)
│  • Currency (PLN)   │  │
└─────────────────────┘  │
                         │
STAGE 2: Calculation     │
┌─────────────────────┐  │
│  JavaScript         │  │
│  Calculates:        │◄─┘
│  • Total savings    │──┐
│  • Time saved       │  │
│  • Accuracy gain    │  │  Displayed to user
│  • ROI %            │  │  in Polish
└─────────────────────┘  │
                         │
STAGE 3: Lead Capture    │
┌─────────────────────┐  │
│  Pipedrive Form:    │◄─┘
│  • Name             │──┐
│  • Email            │  │
│  • Phone            │  │  Sent to Pipedrive
│  • Company          │  │  via WebForm API
│  • + Calculator     │  │
│    data (pre-fill)  │  │
└─────────────────────┘  │
                         │
STAGE 4: Pipedrive       │
┌─────────────────────┐  │
│  Deal Created:      │◄─┘
│  • Person info      │──┐
│  • Organization     │  │
│  • Custom fields    │  │  Stored in CRM
│    - Project value  │  │  Triggers automation
│    - Est. savings   │  │
│    - ROI %          │  │
│    - Currency       │  │
│    - Source: PL ROI │  │
└─────────────────────┘  │
                         │
STAGE 5: Automation      │
┌─────────────────────┐  │
│  Actions Triggered: │◄─┘
│  • Email sent       │
│  • Labels added     │
│  • Note added       │
│  • Deal assigned    │
└─────────────────────┘
```

---

## 🌐 FILE LOCATIONS MAP

```
/Users/robertkowalski/Documents/bimtakeoff-website/
│
├── /js/
│   ├── roi-calculator.js ✅ (Enhanced with Polish support)
│   └── jspdf.umd.min.js ✅ (For PDF generation)
│
├── /pl/
│   └── /zasoby/
│       ├── kalkulator-roi.qmd ✅ (NEEDS FORM ID)
│       │   └── Line ~215: [POLISH_FORM_ID_HERE]
│       │
│       ├── kalkulator-roi-dziekujemy.qmd ✅ (Thank you page)
│       │
│       └── /_archive/
│           └── /roi-calculator-implementation-[timestamp]/
│               ├── README.md ✅
│               ├── QUICK_REFERENCE.md ✅
│               ├── PIPEDRIVE_SETUP_CHECKLIST.md ✅
│               ├── QUICK_START_GUIDE.md ✅
│               ├── IMPLEMENTATION_SUMMARY.md ✅
│               ├── IMPLEMENTATION_CHANGELOG.md ✅
│               └── kalkulator-roi.qmd.backup ✅
│
└── /resources/
    └── roi-calculator.qmd (English version - unchanged)
```

---

## 🎯 INTEGRATION POINTS

```
┌──────────────────────────────────────────────────────────────┐
│                   EXTERNAL INTEGRATIONS                       │
└──────────────────────────────────────────────────────────────┘

1. PIPEDRIVE WEB FORMS
   ┌─────────────────────────────────────────────┐
   │  Input:  Form submission with fields        │
   │  Output: New deal in Pipedrive              │
   │  URL:    webforms.pipedrive.com/f/[ID]      │
   └─────────────────────────────────────────────┘

2. PIPEDRIVE AUTOMATION
   ┌─────────────────────────────────────────────┐
   │  Trigger: Deal created from Polish form     │
   │  Actions:                                   │
   │    • Send email (Polish template)           │
   │    • Add label "PL Market"                  │
   │    • Set language field "Polski"            │
   │    • Add note about source                  │
   └─────────────────────────────────────────────┘

3. GOOGLE ANALYTICS
   ┌─────────────────────────────────────────────┐
   │  Events tracked via dataLayer.push()        │
   │  Parameters include:                        │
   │    • calculator_language: 'pl'              │
   │    • currency: 'PLN'                        │
   │    • market: 'Poland'                       │
   │    • All project values                     │
   └─────────────────────────────────────────────┘

4. jsPDF LIBRARY
   ┌─────────────────────────────────────────────┐
   │  Client-side PDF generation                 │
   │  Content: Polish language report            │
   │  Trigger: After form submission             │
   │  Output: Auto-download to user's device     │
   └─────────────────────────────────────────────┘
```

---

## ⚡ WHAT HAPPENS IN 60 SECONDS

```
TIME    ACTION                              WHERE
─────   ─────────────────────────────────  ──────────────────
0:00    User lands on calculator page      Browser
        Language detected: Polish          JavaScript
        Currency set: PLN                  JavaScript

0:10    User adjusts sliders               Browser
        Values update in real-time         JavaScript
        Polish number format applied       Intl.NumberFormat

0:30    User clicks "Oblicz"               Browser
        Calculations run                   JavaScript
        Results display in Polish/PLN      DOM Update

0:45    User clicks "Pobierz Raport"       Browser
        Modal opens                        CSS/JavaScript
        Pipedrive form loads               Iframe

0:50    User fills form + RODO consent     Pipedrive
        Clicks "Pobierz raport"            Form Submit

0:55    Form submits to Pipedrive          API Call
        Deal created                       Pipedrive DB
        Automation triggers                Pipedrive
        Email queues                       Pipedrive

0:58    PDF generates                      jsPDF (Client)
        File downloads                     Browser

0:59    Thank you page loads               Browser
        User sees confirmation             Polish UI

1:00    Email arrives in inbox             Email Client
        Lead in Pipedrive CRM              Pipedrive
        ✅ COMPLETE!
```

---

## 🔒 RODO/GDPR COMPLIANCE

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA PRIVACY MEASURES                      │
└──────────────────────────────────────────────────────────────┘

✅ RODO Consent Checkbox (Required)
   └─→ Must check before form submission
   └─→ Links to privacy policy

✅ Clear Data Usage Statement
   └─→ "Twoje dane są bezpieczne i zgodne z RODO"
   └─→ "Nigdy nie udostępnimy Twoich informacji"

✅ Privacy Policy Link
   └─→ bimtakeoff.com/pl/polityka-prywatnosci

✅ User Control
   └─→ Can close modal without submitting
   └─→ "Może Później" button available

✅ Secure Transmission
   └─→ HTTPS only
   └─→ Pipedrive secure forms

✅ Data Minimization
   └─→ Only essential fields collected
   └─→ Optional fields clearly marked
```

---

## 🎨 POLISH LANGUAGE FEATURES

```
┌──────────────────────────────────────────────────────────────┐
│                    LOCALIZATION DETAILS                       │
└──────────────────────────────────────────────────────────────┘

NUMBER FORMATTING:
• English: 5,000,000 PLN
• Polish:  5 000 000 PLN
• Implementation: Intl.NumberFormat('pl-PL')

CURRENCY DISPLAY:
• Symbol: zł
• Position: After number
• Format: "1 000 000 zł"

DATE FORMAT:
• Polish: DD.MM.YYYY
• Example: 19.11.2025

PROJECT TYPES (Translated):
✓ Residential → Mieszkaniowy (Budownictwo wielorodzinne)
✓ Commercial → Komercyjny (Biura, Handel)
✓ Industrial → Przemysłowy (Magazyny, Logistyka)
✓ Thermal → Termomodernizacja
✓ Infrastructure → Infrastruktura
✓ Mixed → Zabudowa Mieszana

TIMELINE OPTIONS (Translated):
✓ Quick → Szybka wycena (1-2 tygodnie)
✓ Standard → Standardowy proces (4-6 tygodni)
✓ Detailed → Szczegółowe zamówienie (8-12 tygodni)

UI LABELS:
✓ Calculate My Savings → Oblicz Moje Oszczędności
✓ Download Full Report → Pobierz Pełny Raport ROI
✓ Thank You → Dziękujemy
✓ Your Savings → Twoje Oszczędności
```

---

**Created:** 2025-11-19  
**Status:** Complete system ready for Pipedrive configuration  
**Next Step:** Create Pipedrive form and update form ID

