// ROI Calculator Logic - BIM Takeoff (Enhanced & Currency-Agnostic)
// Version 2.1 - Multi-currency + Project Type Impact
// Realistic calculations based on industry standards

// ============================================================================
// CURRENCY CONFIGURATION
// ============================================================================
const CURRENCIES = {
  PLN: {
    symbol: 'zł',
    code: 'PLN',
    name: 'Polish Złoty',
    locale: 'pl-PL',
    dailyPMCost: 3500,      // Daily project management cost in PLN
    suffix: true             // Symbol after number
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    name: 'British Pound',
    locale: 'en-GB',
    dailyPMCost: 800,       // Daily project management cost in GBP
    suffix: false           // Symbol before number
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
    locale: 'de-DE',
    dailyPMCost: 900,       // Daily project management cost in EUR
    suffix: false
  },
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    locale: 'en-US',
    dailyPMCost: 950,       // Daily project management cost in USD
    suffix: false
  },
  AUD: {
    symbol: 'A$',
    code: 'AUD',
    name: 'Australian Dollar',
    locale: 'en-AU',
    dailyPMCost: 1450,      // Daily project management cost in AUD
    suffix: false
  }
};

// ============================================================================
// CALCULATOR STATE
// ============================================================================
let currentCurrency = 'PLN'; // Default currency

// ============================================================================
// CORE CONFIGURATION
// ============================================================================
const CONFIG = {
  // BIM Service costs (as % of project value)
  bimServiceCost: {
    residential: 0.008,     // 0.8%
    commercial: 0.010,      // 1.0%
    industrial: 0.009,      // 0.9%
    thermal: 0.012,         // 1.2%
    infrastructure: 0.011,  // 1.1%
    mixed: 0.010            // 1.0%
  },
  
  // PROJECT TYPE CHARACTERISTICS
  // These multipliers significantly affect savings calculations
  projectCharacteristics: {
    residential: {
      reworkMultiplier: 1.3,      // 30% more rework than baseline (repetitive work, more defects)
      changeOrderMultiplier: 0.9, // 10% fewer change orders (simpler scope)
      accuracyImpact: 1.0,        // Standard accuracy improvement value
      complexityFactor: 0.9,      // Less complex than commercial
      description: 'Higher rework potential due to repetitive units'
    },
    commercial: {
      reworkMultiplier: 1.0,      // Baseline rework rate
      changeOrderMultiplier: 1.4, // 40% more change orders (client changes, fit-outs)
      accuracyImpact: 1.2,        // Higher value from accuracy (more expensive)
      complexityFactor: 1.2,      // More complex than residential
      description: 'Higher change orders, complex client requirements'
    },
    industrial: {
      reworkMultiplier: 0.8,      // 20% less rework (simpler, larger scale)
      changeOrderMultiplier: 0.7, // 30% fewer change orders (stable scope)
      accuracyImpact: 1.1,        // Good accuracy value (large volumes)
      complexityFactor: 0.8,      // Less complex building types
      description: 'Simpler scope but large scale benefits'
    },
    thermal: {
      reworkMultiplier: 1.2,      // 20% more rework (existing building surprises)
      changeOrderMultiplier: 1.3, // 30% more change orders (hidden conditions)
      accuracyImpact: 1.3,        // Higher accuracy value (risk of unknowns)
      complexityFactor: 1.1,      // Moderate complexity
      description: 'Existing building risks and hidden conditions'
    },
    infrastructure: {
      reworkMultiplier: 0.9,      // 10% less rework (controlled conditions)
      changeOrderMultiplier: 1.1, // 10% more change orders (site conditions)
      accuracyImpact: 1.4,        // Highest accuracy value (massive scale)
      complexityFactor: 1.3,      // High complexity
      description: 'Large scale with high accuracy requirements'
    },
    mixed: {
      reworkMultiplier: 1.1,      // 10% more rework (coordination complexity)
      changeOrderMultiplier: 1.2, // 20% more change orders (multiple uses)
      accuracyImpact: 1.1,        // Above average accuracy value
      complexityFactor: 1.2,      // High complexity
      description: 'Multiple use types increase coordination needs'
    }
  },
  
  // Timeline factors (weeks)
  timelineWeeks: {
    quick: 1.5,
    standard: 5,
    detailed: 10
  },
  
  // BIM delivery time (days)
  bimDeliveryDays: 7,
  
  // Base industry standards (before project type multipliers)
  targetAccuracy: 5,      // ±5% with BIM
  baseReworkFactor: 0.03,     // 3% base rework rate
  baseChangeOrderFactor: 0.08 // 8% base change order rate
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================
let projectType, projectValue, projectValueInput, projectValueDisplay;
let timeline, costVariance, varianceDisplay;
let calculateBtn, resultsPanel;
let totalSavingsEl, timeSavingsEl, accuracyEl, roiEl;
let leadModal, thankyouModal, leadForm;
let currencySelector;

// Calculator state
let calculatedResults = null;

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  attachEventListeners();
  updateCurrencyDisplay();
  console.log('ROI Calculator v2.1 initialized - Project Type Impact Enabled');
});

function initializeElements() {
  // Input elements
  projectType = document.getElementById('project-type');
  projectValue = document.getElementById('project-value');
  projectValueInput = document.getElementById('project-value-input');
  projectValueDisplay = document.getElementById('project-value-display');
  costVariance = document.getElementById('cost-variance');
  varianceDisplay = document.getElementById('variance-display');
  currencySelector = document.getElementById('currency-selector');
  
  // Buttons
  calculateBtn = document.getElementById('calculate-btn');
  
  // Results
  resultsPanel = document.getElementById('results-panel');
  totalSavingsEl = document.getElementById('total-savings');
  timeSavingsEl = document.getElementById('time-savings');
  accuracyEl = document.getElementById('accuracy-improvement');
  roiEl = document.getElementById('roi-percentage');
  
  // Modals
  leadModal = document.getElementById('lead-modal');
  thankyouModal = document.getElementById('thankyou-modal');
  leadForm = document.getElementById('lead-form');
}

function attachEventListeners() {
  // Currency selector
  if (currencySelector) {
    currencySelector.addEventListener('change', function() {
      currentCurrency = this.value;
      updateCurrencyDisplay();
      // Recalculate if results already shown
      if (calculatedResults) {
        calculateROI();
      }
    });
  }
  
  // Slider sync with input
  projectValue.addEventListener('input', function() {
    const value = parseInt(this.value);
    projectValueInput.value = value;
    projectValueDisplay.textContent = formatCurrency(value);
  });
  
  projectValueInput.addEventListener('input', function() {
    let value = parseInt(this.value);
    if (isNaN(value)) value = 500000;
    if (value < 500000) value = 500000;
    if (value > 50000000) value = 50000000;
    
    projectValue.value = value;
    projectValueDisplay.textContent = formatCurrency(value);
  });
  
  // Variance slider
  costVariance.addEventListener('input', function() {
    varianceDisplay.textContent = this.value + '%';
  });
  
  // Calculate button
  calculateBtn.addEventListener('click', calculateROI);
  
  // Get report button
  const getReportBtn = document.getElementById('get-report-btn');
  if (getReportBtn) {
    getReportBtn.addEventListener('click', function() {
      // ✅ FIXED: Do NOT generate PDF here - only show modal
      // PDF will be generated AFTER Pipedrive form is submitted
      
      leadModal.style.display = 'flex';
      
      // Pre-fill Pipedrive form with calculator data
      prefillPipedriveForm();
      
      // Track modal open
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': 'lead_modal_opened',
          'calculator_completed': true,
          'project_value': calculatedResults.inputs.projectValue,
          'currency': currentCurrency
        });
      }

    });
  }
  
  // Modal close buttons
  const closeModal = document.getElementById('close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      leadModal.style.display = 'none';
    });
  }
  
  const maybeLater = document.getElementById('maybe-later');
  if (maybeLater) {
    maybeLater.addEventListener('click', function() {
      leadModal.style.display = 'none';
    });
  }
  
  const closeThankyou = document.getElementById('close-thankyou');
  if (closeThankyou) {
    closeThankyou.addEventListener('click', function() {
      thankyouModal.style.display = 'none';
    });
  }
  
  // Lead form submission
  if (leadForm) {
    leadForm.addEventListener('submit', handleLeadSubmission);
  }
  
  // Close modals on background click
  if (leadModal) {
    leadModal.addEventListener('click', function(e) {
      if (e.target === leadModal) {
        leadModal.style.display = 'none';
      }
    });
  }
  
  if (thankyouModal) {
    thankyouModal.addEventListener('click', function(e) {
      if (e.target === thankyouModal) {
        thankyouModal.style.display = 'none';
      }
    });
  }
}

// ============================================================================
// CURRENCY MANAGEMENT
// ============================================================================
function updateCurrencyDisplay() {
  // Update all currency labels on the page
  const currencyLabels = document.querySelectorAll('.currency-label');
  currencyLabels.forEach(label => {
    label.textContent = CURRENCIES[currentCurrency].code;
  });
  
  // Update current displayed value
  if (projectValueDisplay) {
    projectValueDisplay.textContent = formatCurrency(parseInt(projectValue.value));
  }
}

function formatCurrency(amount, showCode = false) {
  const currency = CURRENCIES[currentCurrency];
  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(amount));
  
  if (showCode) {
    return currency.suffix ? `${formatted} ${currency.code}` : `${currency.code} ${formatted}`;
  }
  
  return formatted;
}

function getCurrencySymbol() {
  return CURRENCIES[currentCurrency].symbol;
}

function getDailyPMCost() {
  return CURRENCIES[currentCurrency].dailyPMCost;
}

// ============================================================================
// ROI CALCULATION (Enhanced with Project Type Impact)
// ============================================================================
function calculateROI() {
  // Get values
  const type = projectType.value;
  const value = parseInt(projectValue.value);
  const variance = parseInt(costVariance.value);
  const timelineType = document.querySelector('input[name="timeline"]:checked')?.value || 'standard';
  
  // Get project characteristics
  const typeChar = CONFIG.projectCharacteristics[type];
  
  // Get currency-specific daily PM cost
  const dailyPMCost = getDailyPMCost();
  
  // Calculate BIM service cost
  const bimCost = value * CONFIG.bimServiceCost[type];
  
  console.log(`Calculating ROI for ${type} project:`, typeChar.description);
  
  // 1. Time Savings (affected by complexity)
  const currentWeeks = CONFIG.timelineWeeks[timelineType];
  const currentDays = currentWeeks * 5; // Working days
  const bimDays = CONFIG.bimDeliveryDays * typeChar.complexityFactor; // Complex projects take slightly longer
  const daysSaved = currentDays - bimDays;
  const timeSavings = daysSaved * dailyPMCost;
  
  // 2. Cost Accuracy Savings (AFFECTED BY PROJECT TYPE)
  const varianceImprovement = variance - CONFIG.targetAccuracy;
  const accuracySavings = value * (varianceImprovement / 100) * 0.5 * typeChar.accuracyImpact;
  
  // 3. Rework Avoidance (AFFECTED BY PROJECT TYPE)
  const varianceNormalized = (variance / 15); // Normalized to baseline
  const projectReworkFactor = CONFIG.baseReworkFactor * typeChar.reworkMultiplier;
  const reworkSavings = value * projectReworkFactor * varianceNormalized * 0.6;
  
  // 4. Change Order Reduction (AFFECTED BY PROJECT TYPE)
  const projectChangeOrderFactor = CONFIG.baseChangeOrderFactor * typeChar.changeOrderMultiplier;
  const changeOrderReduction = value * projectChangeOrderFactor * (variance / 20) * 0.4;
  
  // Total savings
  const totalSavings = timeSavings + accuracySavings + reworkSavings + changeOrderReduction;
  
  // ROI calculation
  const roi = ((totalSavings - bimCost) / bimCost) * 100;
  
  // Log calculation details
  console.log('Calculation breakdown:', {
    projectType: type,
    timeSavings: Math.round(timeSavings),
    accuracySavings: Math.round(accuracySavings),
    reworkSavings: Math.round(reworkSavings),
    changeOrderReduction: Math.round(changeOrderReduction),
    totalSavings: Math.round(totalSavings),
    bimCost: Math.round(bimCost),
    roi: Math.round(roi)
  });
  
  // Store results
  calculatedResults = {
    totalSavings: totalSavings,
    timeSavings: daysSaved,
    accuracyFrom: variance,
    accuracyTo: CONFIG.targetAccuracy,
    roi: roi,
    currency: currentCurrency,
    breakdown: {
      timeSavings: timeSavings,
      accuracySavings: accuracySavings,
      reworkSavings: reworkSavings,
      changeOrderSavings: changeOrderReduction,
      bimCost: bimCost
    },
    inputs: {
      projectType: type,
      projectValue: value,
      variance: variance,
      timeline: timelineType
    },
    projectCharacteristics: typeChar
  };
  
  // Display results
  displayResults();
  
  // Track event (Google Tag Manager)
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'roi_calculated',
      'project_value': value,
      'project_type': type,
      'estimated_savings': Math.round(totalSavings),
      'currency': currentCurrency
    });
  }
}

// ============================================================================
// RESULTS DISPLAY
// ============================================================================
function displayResults() {
  if (!calculatedResults) return;
  
  // Show results panel with animation
  resultsPanel.style.opacity = '0';
  resultsPanel.style.transform = 'translateY(20px)';
  resultsPanel.style.pointerEvents = 'auto';
  
  setTimeout(() => {
    resultsPanel.style.opacity = '1';
    resultsPanel.style.transform = 'translateY(0)';
  }, 100);
  
  // Animate numbers with currency
  animateValue(totalSavingsEl, 0, calculatedResults.totalSavings, 1500, (val) => {
    return formatCurrency(val) + ' ' + CURRENCIES[currentCurrency].code;
  });
  
  animateValue(timeSavingsEl, 0, calculatedResults.timeSavings, 1200, (val) => {
    return Math.round(val) + ' days';
  });
  
  accuracyEl.textContent = `±${calculatedResults.accuracyFrom}% → ±${calculatedResults.accuracyTo}%`;
  
  animateValue(roiEl, 0, calculatedResults.roi, 1500, (val) => {
    return Math.round(val) + '%';
  });
  
  // Scroll to results on mobile
  if (window.innerWidth < 768) {
    setTimeout(() => {
      resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }
}

function animateValue(element, start, end, duration, formatter) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutQuart) - smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * eased;
    
    element.textContent = formatter(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================================================
// LEAD CAPTURE
// ============================================================================
function handleLeadSubmission(e) {
  e.preventDefault();
  
  // Get form data
  const leadData = {
    name: document.getElementById('lead-name')?.value || '',
    company: document.getElementById('lead-company')?.value || '',
    email: document.getElementById('lead-email')?.value || '',
    phone: document.getElementById('lead-phone')?.value || '',
    timeline: document.getElementById('lead-timeline')?.value || '',
    calculatorResults: calculatedResults,
    timestamp: new Date().toISOString(),
    source: 'ROI Calculator',
    pageUrl: window.location.href,
    userAgent: navigator.userAgent
  };
  
  // Log to console (in production, send to backend/CRM)
  console.log('Lead captured:', leadData);
  
  // Track conversion
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'lead_submitted',
      'lead_source': 'roi_calculator',
      'project_value': calculatedResults.inputs.projectValue,
      'estimated_savings': Math.round(calculatedResults.totalSavings),
      'currency': currentCurrency
    });
  }
  
  // Show thank you modal
  leadModal.style.display = 'none';
  thankyouModal.style.display = 'flex';
  
  // Generate and download PDF (placeholder)
  setTimeout(() => {
    generatePDFReport(leadData);
  }, 1000);
  
  // Reset form
  leadForm.reset();
}

// ============================================================================
// PDF REPORT GENERATION
// ============================================================================
// ============================================================================
// PDF TRANSLATIONS - Multi-language Support
// ============================================================================
const PDF_TRANSLATIONS = {
  en: {
    // Page 1 - Cover
    reportTitle: 'ROI ANALYSIS REPORT',
    reportSubtitle: 'BIM Takeoff - Construction Cost Optimization',
    generated: 'Generated',
    projectValue: 'PROJECT VALUE',
    estimatedSavings: 'ESTIMATED SAVINGS',
    returnOnInvestment: 'RETURN ON INVESTMENT',
    costBreakdownAnalysis: 'Cost Breakdown Analysis',
    
    // Table headers
    costCategory: 'Cost Category',
    traditionalMethod: 'Traditional Method',
    withBimTakeoff: 'With BIM Takeoff',
    savings: 'Savings',
    total: 'TOTAL',
    
    // Cost categories
    estimationErrors: 'Estimation Errors (5%)',
    materialWaste: 'Material Waste (3%)',
    reworkCosts: 'Rework Costs (4%)',
    changeOrders: 'Change Orders (3%)',
    timeDelays: 'Time Delays (2%)',
    
    // Timeline
    implementationTimeline: 'Implementation Timeline',
    days13: 'Days 1-3',
    days45: 'Days 4-5',
    day6: 'Day 6',
    initialAssessment: 'Initial Assessment',
    detailedEstimation: 'Detailed Estimation',
    reviewDelivery: 'Review & Delivery',
    analyzeDocumentation: 'Analyze project documentation, create preliminary schedules',
    bimModeling: 'BIM 5D modeling, quantity extraction, market rates',
    finalReview: 'Final review, value engineering, report delivery',
    
    // Page 2 - Analysis
    detailedAnalysisRecommendations: 'Detailed Analysis & Recommendations',
    riskAnalysisFor: 'Risk Analysis for',
    projects: 'Projects',
    withoutBimRisks: 'Without BIM Takeoff, your project faces these risks:',
    quantityErrors: 'Quantity errors in structural elements',
    mepClashes: 'MEP coordination clashes',
    facadeDiscrepancies: 'Facade measurement discrepancies',
    foundationOverExcavation: 'Foundation over-excavation',
    missingScopeItems: 'Missing scope items',
    totalRiskExposure: 'Total Risk Exposure:',
    
    // Benefits
    whatYouGet: 'What You Get With BIM Takeoff',
    accuracySpeed: 'Accuracy & Speed',
    accuracyVsTraditional: '±5% accuracy (vs. ±15-20% traditional)',
    turnaroundTime: '3-day turnaround (vs. 6-8 weeks)',
    automatedClashDetection: 'Automated clash detection',
    realTimeCostUpdates: 'Real-time cost updates',
    
    riskMitigation: 'Risk Mitigation',
    identifyScopeGaps: 'Identify scope gaps before tender',
    catchInconsistencies: 'Catch design inconsistencies',
    preventOverOrdering: 'Prevent material over-ordering',
    avoidCostlyVariations: 'Avoid costly variations',
    
    competitiveAdvantage: 'Competitive Advantage',
    winMoreTenders: 'Win more tenders with accurate pricing',
    fasterResponse: 'Faster response to tender invitations',
    professionalDocumentation: 'Professional documentation',
    valueEngineering: 'Value engineering opportunities',
    
    // Industry benchmarks
    industryBenchmarks: 'Industry Benchmarks',
    yourProjectType: 'Your Project Type:',
    industryAverageCostOverrun: 'Industry Average Cost Overrun: 27%',
    withBimTakeoffAccuracy: 'With BIM Takeoff: <5%',
    typicalRoiForSector: 'Typical ROI for Your Sector: 600-900%',
    yourCalculatedRoi: 'Your Calculated ROI:',
    
    // Page 3 - Next Steps
    yourNextSteps: 'Your Next Steps',
    readyToSave: 'Ready to Save',
    getFreeConsultation: 'Get started with a free consultation and sample estimate',
    scheduleFreeConsultation: 'Schedule Free Consultation',
    
    // Action Plan
    yourActionPlan: 'Your Action Plan',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',
    week3: 'Week 3',
    ongoing: 'Ongoing',
    scheduleFreeConsultationAction: 'Schedule free consultation',
    discussNeeds: 'Discuss your specific project needs',
    provideSampleDrawings: 'Provide sample drawings',
    receiveTestEstimate: 'Receive test estimate for accuracy verification',
    reviewProposal: 'Review proposal',
    approveFramework: 'Approve framework agreement for ongoing support',
    submitProjects: 'Submit projects as needed',
    receiveEstimates: 'Receive estimates within 3 days',
    
    // Resources
    freeResources: 'Free Resources',
    tenderChecklist: '37-Point Tender Checklist (Polish)',
    bimImplementationGuide: 'BIM Implementation Guide for Poland',
    sampleBoqTemplate: 'Sample BoQ Template',
    
    // Contact
    contactInformation: 'Contact Information',
    managingDirector: 'Managing Director',
    website: 'www.bimtakeoff.com',
    
    // Footer
    confidentialReport: 'This report is confidential and prepared specifically for',
    validFor30Days: 'Valid for 30 days from',
    
    // Project types
    projectTypes: {
      residential: 'Residential Complex',
      commercial: 'Commercial Building',
      industrial: 'Industrial Facility',
      infrastructure: 'Infrastructure Project',
      mixed: 'Mixed-Use Development',
      thermal: 'Thermal Modernization'
    }
  },
  
  pl: {
    // Strona 1 - Okładka
    reportTitle: 'RAPORT ANALIZY ROI',
    reportSubtitle: 'BIM Takeoff - Optymalizacja Kosztów Budowy',
    generated: 'Wygenerowano',
    projectValue: 'WARTOŚĆ PROJEKTU',
    estimatedSavings: 'SZACOWANE OSZCZĘDNOŚCI',
    returnOnInvestment: 'ZWROT Z INWESTYCJI',
    costBreakdownAnalysis: 'Analiza Rozbicia Kosztów',
    
    // Nagłówki tabeli
    costCategory: 'Kategoria Kosztów',
    traditionalMethod: 'Metoda Tradycyjna',
    withBimTakeoff: 'Z BIM Takeoff',
    savings: 'Oszczędności',
    total: 'SUMA',
    
    // Kategorie kosztów
    estimationErrors: 'Błędy Kosztorysowania (5%)',
    materialWaste: 'Marnotrawstwo Materiałów (3%)',
    reworkCosts: 'Koszty Przeróbek (4%)',
    changeOrders: 'Zamówienia Zmian (3%)',
    timeDelays: 'Opóźnienia Czasowe (2%)',
    
    // Harmonogram
    implementationTimeline: 'Harmonogram Wdrożenia',
    days13: 'Dni 1-3',
    days45: 'Dni 4-5',
    day6: 'Dzień 6',
    initialAssessment: 'Wstępna Ocena',
    detailedEstimation: 'Szczegółowy Kosztorys',
    reviewDelivery: 'Przegląd i Dostawa',
    analyzeDocumentation: 'Analiza dokumentacji projektowej, utworzenie wstępnych harmonogramów',
    bimModeling: 'Modelowanie BIM 5D, ekstrakcja ilości, stawki rynkowe',
    finalReview: 'Przegląd końcowy, inżynieria wartości, dostawa raportu',
    
    // Strona 2 - Analiza
    detailedAnalysisRecommendations: 'Szczegółowa Analiza i Rekomendacje',
    riskAnalysisFor: 'Analiza Ryzyka dla Projektów',
    projects: '',
    withoutBimRisks: 'Bez BIM Takeoff, Twój projekt napotyka następujące ryzyka:',
    quantityErrors: 'Błędy ilościowe w elementach konstrukcyjnych',
    mepClashes: 'Kolizje koordynacji MEP',
    facadeDiscrepancies: 'Rozbieżności w pomiarach elewacji',
    foundationOverExcavation: 'Nadmierne wykopy fundamentów',
    missingScopeItems: 'Brakujące elementy zakresu',
    totalRiskExposure: 'Całkowite Narażenie na Ryzyko:',
    
    // Korzyści
    whatYouGet: 'Co Otrzymujesz z BIM Takeoff',
    accuracySpeed: 'Dokładność i Szybkość',
    accuracyVsTraditional: '±5% dokładności (vs. ±15-20% tradycyjne)',
    turnaroundTime: '3-dniowy czas realizacji (vs. 6-8 tygodni)',
    automatedClashDetection: 'Automatyczna detekcja kolizji',
    realTimeCostUpdates: 'Aktualizacje kosztów w czasie rzeczywistym',
    
    riskMitigation: 'Minimalizacja Ryzyka',
    identifyScopeGaps: 'Identyfikacja luk w zakresie przed przetargiem',
    catchInconsistencies: 'Wychwytywanie niespójności projektowych',
    preventOverOrdering: 'Zapobieganie nadmiernym zamówieniom materiałów',
    avoidCostlyVariations: 'Unikanie kosztownych zmian',
    
    competitiveAdvantage: 'Przewaga Konkurencyjna',
    winMoreTenders: 'Wygraj więcej przetargów dzięki dokładnej wycenie',
    fasterResponse: 'Szybsza odpowiedź na zaproszenia do przetargu',
    professionalDocumentation: 'Profesjonalna dokumentacja',
    valueEngineering: 'Możliwości inżynierii wartości',
    
    // Benchmarki branżowe
    industryBenchmarks: 'Benchmarki Branżowe',
    yourProjectType: 'Twój Typ Projektu:',
    industryAverageCostOverrun: 'Średnie Przekroczenie Kosztów w Branży: 27%',
    withBimTakeoffAccuracy: 'Z BIM Takeoff: <5%',
    typicalRoiForSector: 'Typowy ROI dla Twojego Sektora: 600-900%',
    yourCalculatedRoi: 'Twój Obliczony ROI:',
    
    // Strona 3 - Następne Kroki
    yourNextSteps: 'Twoje Następne Kroki',
    readyToSave: 'Gotowy Zaoszczędzić',
    getFreeConsultation: 'Rozpocznij od bezpłatnej konsultacji i próbnego kosztorysu',
    scheduleFreeConsultation: 'Zaplanuj Bezpłatną Konsultację',
    
    // Plan działania
    yourActionPlan: 'Twój Plan Działania',
    thisWeek: 'Ten Tydzień',
    nextWeek: 'Następny Tydzień',
    week3: 'Tydzień 3',
    ongoing: 'Ciągłe',
    scheduleFreeConsultationAction: 'Zaplanuj bezpłatną konsultację',
    discussNeeds: 'Omów specyficzne potrzeby projektu',
    provideSampleDrawings: 'Dostarcz przykładowe rysunki',
    receiveTestEstimate: 'Otrzymaj testowy kosztorys do weryfikacji dokładności',
    reviewProposal: 'Przejrzyj propozycję',
    approveFramework: 'Zatwierdź umowę ramową na stałą współpracę',
    submitProjects: 'Przesyłaj projekty według potrzeb',
    receiveEstimates: 'Otrzymuj kosztorysy w ciągu 3 dni',
    
    // Zasoby
    freeResources: 'Darmowe Zasoby',
    tenderChecklist: 'Lista Kontrolna Przetargu (37 Punktów)',
    bimImplementationGuide: 'Przewodnik Wdrażania BIM dla Polski',
    sampleBoqTemplate: 'Przykładowy Szablon PW',
    
    // Kontakt
    contactInformation: 'Informacje Kontaktowe',
    managingDirector: 'Dyrektor Zarządzający',
    website: 'www.bimtakeoff.com',
    
    // Stopka
    confidentialReport: 'Ten raport jest poufny i przygotowany specjalnie dla',
    validFor30Days: 'Ważny przez 30 dni od',
    
    // Typy projektów
    projectTypes: {
      residential: 'Kompleks Mieszkaniowy',
      commercial: 'Budynek Komercyjny',
      industrial: 'Obiekt Przemysłowy',
      infrastructure: 'Projekt Infrastrukturalny',
      mixed: 'Zabudowa Wielofunkcyjna',
      thermal: 'Modernizacja Cieplna'
    }
  }
};

/**
 * Detect page language automatically
 * Returns 'pl' for Polish pages, 'en' for everything else
 */
function detectPageLanguage() {
  // Check HTML lang attribute
  const htmlLang = document.documentElement.lang;
  if (htmlLang && htmlLang.startsWith('pl')) {
    return 'pl';
  }
  
  // Check URL for /pl/ segment
  if (window.location.pathname.includes('/pl/')) {
    return 'pl';
  }
  
  // Default to English
  return 'en';
}

/**
 * Get translation for current page language
 */
function getTranslation(key, subkey = null) {
  const lang = detectPageLanguage();
  const translations = PDF_TRANSLATIONS[lang] || PDF_TRANSLATIONS['en'];
  
  if (subkey) {
    return translations[key]?.[subkey] || PDF_TRANSLATIONS['en'][key]?.[subkey] || '';
  }
  
  return translations[key] || PDF_TRANSLATIONS['en'][key] || key;
}

  
  // Header background
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('ROI ANALYSIS REPORT', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('BIM Takeoff - Construction Cost Optimization', 105, 30, { align: 'center' });
  
  // Date
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 50, { align: 'center' });
  
  // Main metrics boxes
  let yPos = 70;
  
  // Project Value Box
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.text('PROJECT VALUE', 47.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(projectValue, currentCurrency), 47.5, yPos + 20, { align: 'center' });
  
  // Estimated Savings Box
  doc.setFillColor(240, 253, 244);
  doc.rect(77.5, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('ESTIMATED SAVINGS', 105, yPos + 8, { align: 'center' });
  doc.setTextColor(...green);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(totalSavings, currentCurrency), 105, yPos + 20, { align: 'center' });
  
  // ROI Box
  doc.setFillColor(255, 247, 237);
  doc.rect(135, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('RETURN ON INVESTMENT', 162.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(`${roiPercentage}%`, 162.5, yPos + 20, { align: 'center' });
  
  // Detailed Breakdown Section
  yPos = 110;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Cost Breakdown Analysis', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Table header
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.text('Cost Category', 25, yPos + 5);
  doc.text('Traditional Method', 90, yPos + 5, { align: 'right' });
  doc.text('With BIM Takeoff', 130, yPos + 5, { align: 'right' });
  doc.text('Savings', 170, yPos + 5, { align: 'right' });
  
  yPos += 10;
  
  // Table rows
  const costBreakdown = [
    ['Estimation Errors (5%)', projectValue * 0.05, projectValue * 0.005, projectValue * 0.045],
    ['Material Waste (3%)', projectValue * 0.03, projectValue * 0.01, projectValue * 0.02],
    ['Rework Costs (4%)', projectValue * 0.04, projectValue * 0.01, projectValue * 0.03],
    ['Change Orders (3%)', projectValue * 0.03, projectValue * 0.005, projectValue * 0.025],
    ['Time Delays (2%)', projectValue * 0.02, 0, projectValue * 0.02]
  ];
  
  doc.setTextColor(...gray);
  costBreakdown.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(20, yPos - 2, 170, 7, 'F');
    }
    
    doc.text(row[0], 25, yPos + 3);
    doc.text(formatCurrency(row[1], currentCurrency), 90, yPos + 3, { align: 'right' });
    doc.text(formatCurrency(row[2], currentCurrency), 130, yPos + 3, { align: 'right' });
    doc.setTextColor(...green);
    doc.text(formatCurrency(row[3], currentCurrency), 170, yPos + 3, { align: 'right' });
    doc.setTextColor(...gray);
    yPos += 8;
  });
  
  // Total row
  doc.setFillColor(...orange);
  doc.rect(20, yPos, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL', 25, yPos + 6);
  doc.text(formatCurrency(projectValue * 0.17, currentCurrency), 90, yPos + 6, { align: 'right' });
  doc.text(formatCurrency(projectValue * 0.03, currentCurrency), 130, yPos + 6, { align: 'right' });
  doc.text(formatCurrency(totalSavings, currentCurrency), 170, yPos + 6, { align: 'right' });
  
  // Implementation Timeline
  yPos += 20;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.text('Implementation Timeline', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const timeline = [
    ['Days 1-3', 'Initial Assessment', 'Analyze project documentation, create preliminary schedules'],
    ['Days 4-5', 'Detailed Estimation', 'BIM 5D modeling, quantity extraction, market rates'],
    ['Day 6', 'Review & Delivery', 'Final review, value engineering, report delivery']
  ];
  
  timeline.forEach((phase, index) => {
    // Timeline circle
    doc.setFillColor(...orange);
    doc.circle(25, yPos, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`${index + 1}`, 25, yPos + 1, { align: 'center' });
    
    // Timeline content
    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(phase[0] + ': ' + phase[1], 33, yPos);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...gray);
    doc.text(phase[2], 33, yPos + 5);
    
    yPos += 15;
  });
  
  // ============================================================================
  // PAGE 2: DETAILED ANALYSIS
  // ============================================================================
  
  doc.addPage();
  yPos = 20;
  
  // Header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Detailed Analysis & Recommendations', 105, 18, { align: 'center' });
  
  yPos = 45;
  
  // Risk Analysis
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Risk Analysis for ${capitalizeProjectType(projectType)} Projects`, 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const risks = [
    [`Quantity errors in structural elements`, projectValue * 0.036],
    [`MEP coordination clashes`, projectValue * 0.044],
    [`Facade measurement discrepancies`, projectValue * 0.019],
    [`Foundation over-excavation`, projectValue * 0.015],
    [`Missing scope items`, projectValue * 0.028]
  ];
  
  doc.text('Without BIM Takeoff, your project faces these risks:', 20, yPos);
  yPos += 8;
  
  risks.forEach(risk => {
    doc.setTextColor(...gray);
    doc.text(`• ${risk[0]}:`, 25, yPos);
    doc.setTextColor(220, 38, 38); // Red
    doc.text(formatCurrency(risk[1], currentCurrency), 170, yPos, { align: 'right' });
    yPos += 7;
  });
  
  // Total risk
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...darkGray);
  doc.text('Total Risk Exposure:', 25, yPos);
  doc.setTextColor(220, 38, 38);
  doc.text(formatCurrency(projectValue * 0.142, currentCurrency), 170, yPos, { align: 'right' });
  
  // Value Propositions
  yPos += 15;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('What You Get With BIM Takeoff', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const benefits = [
    ['Accuracy & Speed', [
      '±5% accuracy (vs. ±15-20% traditional)',
      '3-day turnaround (vs. 6-8 weeks)',
      'Automated clash detection',
      'Real-time cost updates'
    ]],
    ['Risk Mitigation', [
      'Identify scope gaps before tender',
      'Catch design inconsistencies',
      'Prevent material over-ordering',
      'Avoid costly variations'
    ]],
    ['Competitive Advantage', [
      'Win more tenders with accurate pricing',
      'Faster response to tender invitations',
      'Professional documentation',
      'Value engineering opportunities'
    ]]
  ];
  
  benefits.forEach(section => {
    doc.setTextColor(...orange);
    doc.setFont(undefined, 'bold');
    doc.text(section[0], 20, yPos);
    yPos += 7;
    
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    section[1].forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 6;
    });
    yPos += 3;
  });
  
  // Industry Benchmarks
  yPos += 5;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Industry Benchmarks', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  doc.text(`Your Project Type: ${capitalizeProjectType(projectType)}`, 20, yPos);
  yPos += 7;
  doc.text(`Industry Average Cost Overrun: 27%`, 20, yPos);
  yPos += 7;
  doc.text(`With BIM Takeoff: <5%`, 20, yPos);
  yPos += 7;
  doc.text(`Typical ROI for Your Sector: 600-900%`, 20, yPos);
  yPos += 7;
  doc.setTextColor(...green);
  doc.setFont(undefined, 'bold');
  doc.text(`Your Calculated ROI: ${roiPercentage}% ✓`, 20, yPos);
  
  // ============================================================================
  // PAGE 3: NEXT STEPS & CONTACT
  // ============================================================================
  
  doc.addPage();
  yPos = 20;
  
  // Header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Your Next Steps', 105, 18, { align: 'center' });
  
  yPos = 45;
  
  // Call to Action
  doc.setFillColor(254, 243, 199); // Light yellow
  doc.rect(20, yPos, 170, 40, 'F');
  doc.setTextColor(146, 64, 14); // Dark yellow
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Ready to Save ${formatCurrency(totalSavings, currentCurrency)}?`, 105, yPos + 10, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text('Get started with a free consultation and sample estimate', 105, yPos + 20, { align: 'center' });
  
  doc.setTextColor(59, 130, 246); // Blue
  doc.textWithLink('Schedule Free Consultation', 105, yPos + 30, {
    url: 'https://calendly.com/bimtakeoff/consultation',
    align: 'center'
  });
  
  yPos += 50;
  
  // Action Plan
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Your Action Plan', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const actions = [
    ['This Week', 'Schedule free consultation', 'Discuss your specific project needs'],
    ['Next Week', 'Provide sample drawings', 'Receive test estimate for accuracy verification'],
    ['Week 3', 'Review proposal', 'Approve framework agreement for ongoing support'],
    ['Ongoing', 'Submit projects as needed', 'Receive estimates within 3 days']
  ];
  
  actions.forEach((action, index) => {
    // Checkbox
    doc.rect(25, yPos - 3, 3, 3);
    
    // Action details
    doc.setTextColor(...orange);
    doc.setFont(undefined, 'bold');
    doc.text(action[0], 32, yPos);
    doc.setTextColor(...darkGray);
    doc.text(': ' + action[1], 55, yPos);
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    doc.text(action[2], 32, yPos + 5);
    
    yPos += 15;
  });
  
  // Resources
  yPos += 5;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Free Resources', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(59, 130, 246);
  
  doc.textWithLink('• 37-Point Tender Checklist (Polish)', 25, yPos, {
    url: 'https://bimtakeoff.com/pl/checklist-przetargu'
  });
  yPos += 7;
  
  doc.textWithLink('• BIM Implementation Guide for Poland', 25, yPos, {
    url: 'https://bimtakeoff.com/resources/bim-guide-poland'
  });
  yPos += 7;
  
  doc.textWithLink('• Sample BoQ Template', 25, yPos, {
    url: 'https://bimtakeoff.com/resources/sample-boq'
  });
  
  // Contact Information
  yPos += 20;
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 170, 35, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Contact Information', 105, yPos + 8, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  doc.text('Robert Kowalski - Managing Director', 105, yPos + 16, { align: 'center' });
  doc.text('📧 robert@bimtakeoff.com | 📱 WhatsApp: +48 XXX XXX XXX', 105, yPos + 22, { align: 'center' });
  doc.text('🌐 www.bimtakeoff.com', 105, yPos + 28, { align: 'center' });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text(`This report is confidential and prepared specifically for ${leadData.name || 'you'}`, 105, 280, { align: 'center' });
  doc.text(`Valid for 30 days from ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
  
  // ============================================================================
  // SAVE THE PDF
  // ============================================================================
  
  // Generate filename
  const fileName = `BIM-Takeoff-ROI-Report-${(leadData.name || 'Client').replace(/\s+/g, '-')}-${Date.now()}.pdf`;
  
  // Download the PDF
  doc.save(fileName);
  
  console.log('PDF Report generated and downloaded:', fileName);
  
  // Track event
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'pdf_report_downloaded',
      'project_value': projectValue,
      'estimated_savings': totalSavings,
      'roi': roiPercentage,
      'lead_name': leadData.name
    });
  }
}

/**
 * Helper function to capitalize project type
 */
function capitalizeProjectType(type) {
  const typeMap = {
    'residential': 'Residential Complex',
    'commercial': 'Commercial Building',
    'industrial': 'Industrial Facility',
    'infrastructure': 'Infrastructure Project',
    'mixed': 'Mixed-Use Development'
  };
  return typeMap[type] || type;
}

// ============================================================================
// IMPLEMENTATION INSTRUCTIONS
// ============================================================================

// 1. Add jsPDF library to your roi-calculator.qmd file
//    Add this line in the <head> section or before your calculator:
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

// 2. Update your form submission handler
//    After Pipedrive form submits successfully, call:
//    generatePDFReport({ name: 'Client Name', email: 'client@email.com' });

// 3. The function should be called here (around line 280 in roi-calculator.js):
//    Instead of showing thank you modal, generate and download PDF:
/*
// OLD CODE:
document.getElementById('thankyou-modal').style.display = 'flex';

// NEW CODE:
generatePDFReport({
  name: document.querySelector('[name="person_name"]').value,
  email: document.querySelector('[name="person_email"]').value
});
document.getElementById('thankyou-modal').style.display = 'flex';
*/

// 4. Test the flow:
//    - Fill calculator
//    - Submit Pipedrive form
//    - PDF downloads automatically
//    - Check Pipedrive for new lead

// ============================================================================
// ============================================================================
// MANUAL PDF GENERATION & TESTING
// ============================================================================

/**
 * Manual PDF generation function - can be called from browser console
 * Usage: window.manuallyGeneratePDF()
 */
window.manuallyGeneratePDF = function() {
  console.log('🚀 Manual PDF generation triggered');
  
  if (!calculatedResults) {
    console.error('❌ No calculation results available. Please calculate ROI first.');
    alert('Please calculate your ROI first before downloading the report.');
    return;
  }
  
  if (typeof window.jspdf === 'undefined') {
    console.error('❌ jsPDF library not loaded');
    alert('PDF library not loaded. Please refresh the page and try again.');
    return;
  }
  
  try {
    const leadData = {
      name: 'Manual Download',
      email: '',
      calculatorResults: calculatedResults
    };
    
    generatePDFReport(leadData);
    console.log('✅ PDF generated successfully');
    alert('PDF report downloaded successfully!');
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    console.error('Error stack:', error.stack);
    alert('Failed to generate PDF. Check console for details.');
  }
};

/**
 * Add manual download button to thank you modal
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Adding manual PDF download button to thank you modal...');
  
  const thankyouModal = document.getElementById('thankyou-modal');
  if (thankyouModal) {
    // Wait a bit for modal content to be ready
    setTimeout(() => {
      const modalContent = thankyouModal.querySelector('.modal-content');
      if (modalContent && !document.getElementById('manual-pdf-btn')) {
        // Find the contact section div
        const contactSection = modalContent.querySelector('div[style*="background: var(--bim-light-gray)"]');
        if (contactSection) {
          // Create manual PDF button
          const pdfButton = document.createElement('button');
          pdfButton.id = 'manual-pdf-btn';
          pdfButton.style.cssText = `
            width: 100%;
            padding: 14px 32px;
            background: #10B981;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 16px;
            font-size: 16px;
          `;
          pdfButton.textContent = '📄 Download PDF Report';
          
          pdfButton.addEventListener('click', function() {
            console.log('Manual PDF button clicked');
            window.manuallyGeneratePDF();
          });
          
          pdfButton.addEventListener('mouseenter', function() {
            this.style.background = '#059669';
            this.style.transform = 'translateY(-2px)';
          });
          
          pdfButton.addEventListener('mouseleave', function() {
            this.style.background = '#10B981';
            this.style.transform = 'translateY(0)';
          });
          
          // Insert button after the consultation link
          contactSection.appendChild(pdfButton);
          console.log('✅ Manual PDF download button added');
        }
      }
    }, 1000);
  }
});

console.log('✅ Manual PDF generation functions loaded');
console.log('💡 To manually generate PDF, open browser console and run: window.manuallyGeneratePDF()');

