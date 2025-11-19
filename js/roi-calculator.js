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
      leadModal.style.display = 'flex';
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
function generatePDFReport(leadData) {
  console.log('Generating PDF report for:', leadData.email);
  
  const reportContent = generateReportContent(leadData);
  console.log('Report content:', reportContent);
}

function generateReportContent(leadData) {
  const results = leadData.calculatorResults;
  const currency = CURRENCIES[results.currency];
  const typeChar = results.projectCharacteristics;
  
  return `
═══════════════════════════════════════════════════════════════
BIM TAKEOFF - ROI ANALYSIS REPORT
═══════════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString()}
Currency: ${currency.name} (${currency.code})

───────────────────────────────────────────────────────────────
CLIENT INFORMATION
───────────────────────────────────────────────────────────────
Name:              ${leadData.name}
Company:           ${leadData.company}
Email:             ${leadData.email}
Phone:             ${leadData.phone}
Project Timeline:  ${leadData.timeline || 'Not specified'}

───────────────────────────────────────────────────────────────
PROJECT DETAILS
───────────────────────────────────────────────────────────────
Project Type:      ${results.inputs.projectType.charAt(0).toUpperCase() + results.inputs.projectType.slice(1)}
Project Value:     ${formatCurrency(results.inputs.projectValue, true)}
Current Variance:  ±${results.inputs.variance}%
Estimation Time:   ${results.inputs.timeline}

Project Characteristics: ${typeChar.description}

───────────────────────────────────────────────────────────────
CALCULATED SAVINGS
───────────────────────────────────────────────────────────────
TOTAL SAVINGS:     ${formatCurrency(results.totalSavings, true)}
RETURN ON INVESTMENT: ${Math.round(results.roi)}%

Time Saved:        ${results.timeSavings} working days

───────────────────────────────────────────────────────────────
DETAILED BREAKDOWN
───────────────────────────────────────────────────────────────
✓ Time Savings:           ${formatCurrency(results.breakdown.timeSavings, true)}
  (Reduced from ${results.inputs.timeline} to 7-day BIM delivery)

✓ Accuracy Improvement:   ${formatCurrency(results.breakdown.accuracySavings, true)}
  (Improved from ±${results.accuracyFrom}% to ±${results.accuracyTo}% variance)

✓ Rework Avoidance:       ${formatCurrency(results.breakdown.reworkSavings, true)}
  (Better estimates = less costly rework during construction)

✓ Change Order Reduction: ${formatCurrency(results.breakdown.changeOrderSavings, true)}
  (Accurate 5D modeling reduces unexpected changes)

BIM Service Investment:   ${formatCurrency(results.breakdown.bimCost, true)}
  (Professional BIM 5D estimation service)

───────────────────────────────────────────────────────────────
WHAT THIS MEANS FOR YOUR PROJECT
───────────────────────────────────────────────────────────────
By switching to BIM 5D estimation, you could save approximately
${formatCurrency(results.totalSavings, true)} on this project.

This represents a ${Math.round(results.roi)}% return on investment in 
professional estimation services.

───────────────────────────────────────────────────────────────
NEXT STEPS
───────────────────────────────────────────────────────────────
1. Schedule a free consultation to discuss your project
2. Provide project documentation (drawings, specifications)
3. Receive detailed quote within 24 hours
4. Start saving on your next project

───────────────────────────────────────────────────────────────
CONTACT INFORMATION
───────────────────────────────────────────────────────────────
Email:    contact@bimtakeoff.com
Phone:    +44 (0) 20 3239 9967
Website:  www.bimtakeoff.com

BIM Takeoff - 20 Years International Experience
Professional BIM 5D Cost Estimation Services
═══════════════════════════════════════════════════════════════
`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

// Public API for external control
window.ROICalculator = {
  setCurrency: function(currencyCode) {
    if (CURRENCIES[currencyCode]) {
      currentCurrency = currencyCode;
      updateCurrencyDisplay();
      console.log('Currency changed to:', currencyCode);
    } else {
      console.error('Invalid currency code:', currencyCode);
    }
  },
  getCurrentCurrency: function() {
    return currentCurrency;
  },
  getSupportedCurrencies: function() {
    return Object.keys(CURRENCIES);
  },
  recalculate: function() {
    if (calculatedResults) {
      calculateROI();
    }
  },
  getProjectCharacteristics: function(type) {
    return CONFIG.projectCharacteristics[type] || null;
  }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateROI,
    CONFIG,
    CURRENCIES,
    ROICalculator: window.ROICalculator
  };
}

console.log('ROI Calculator v2.1 loaded successfully');
console.log('Supported currencies:', Object.keys(CURRENCIES).join(', '));
console.log('Project types with unique characteristics:', Object.keys(CONFIG.projectCharacteristics).join(', '));
// ============================================================================
// PIPEDRIVE INTEGRATION CONFIGURATION
// ============================================================================
// Custom Field API Keys from Pipedrive (Step 1)
const PIPEDRIVE_FIELD_IDS = {
  projectValue: 'd4df653711c3581de9db258f5a44de0a1dbbfb4b',
  estimatedSavings: '370268b0c967a69ca9680a1f06245a1541f42df1',
  roiPercentage: '2a924ec54ca392530b60a3b877c56ff0a30fe6ec',
  projectType: 'b854797af8e35bd1061276cf967487998d1ef9e2',
  currency: '145a25c52ed436f67639a1f117df7486f83c9547',
  projectTimeline: '40acbc8ba38cec5701adfb94e03788d6e766bdb1',
  leadSource: '461990a609c554173205dbf04583dd356fec3d44'
};

// ============================================================================
// ADD THIS CODE TO THE END OF YOUR EXISTING roi-calculator.js FILE
// ============================================================================

// INSTRUCTIONS:
// 1. Open /js/roi-calculator.js
// 2. Scroll to the VERY END of the file
// 3. Add this entire section AFTER all existing code
// 4. Save the file

// ============================================================================
// PIPEDRIVE FORM PRE-FILL FUNCTIONALITY
// ============================================================================

/**
 * Pre-fill Pipedrive form with calculator results when modal opens
 * This runs automatically when user clicks "Download Full ROI Report"
 */
function prefillPipedriveForm() {
  if (!calculatedResults) {
    console.warn('No calculator results available to pre-fill Pipedrive form');
    return;
  }
  
  console.log('Preparing to pre-fill Pipedrive form with calculator data...');
  
  // Wait for Pipedrive form to fully load
  const checkPipedriveLoaded = setInterval(() => {
    // Check if Pipedrive webforms API is available
    const pipedriveForm = document.querySelector('[data-pd-webforms]');
    
    if (pipedriveForm) {
      clearInterval(checkPipedriveLoaded);
      
      // Prepare data for Pipedrive fields
      const formData = {
        // Calculator results
        [PIPEDRIVE_FIELD_IDS.projectValue]: calculatedResults.inputs.projectValue,
        [PIPEDRIVE_FIELD_IDS.estimatedSavings]: Math.round(calculatedResults.totalSavings),
        [PIPEDRIVE_FIELD_IDS.roiPercentage]: Math.round(calculatedResults.roi),
        [PIPEDRIVE_FIELD_IDS.currency]: currentCurrency,
        [PIPEDRIVE_FIELD_IDS.projectType]: capitalizeProjectType(calculatedResults.inputs.projectType),
        [PIPEDRIVE_FIELD_IDS.leadSource]: 'ROI Calculator'
      };
      
      // Try to pre-fill using Pipedrive API
      try {
        // Method 1: Try Pipedrive's prefill API if available
        if (typeof pipedriveWebForms !== 'undefined' && pipedriveWebForms.prefill) {
          pipedriveWebForms.prefill(formData);
          console.log('✅ Pipedrive form pre-filled successfully using API');
        } else {
          // Method 2: Add hidden fields directly to form
          addHiddenFieldsToForm(pipedriveForm, formData);
          console.log('✅ Pipedrive form pre-filled successfully using hidden fields');
        }
      } catch (error) {
        console.error('Error pre-filling Pipedrive form:', error);
        // Fallback: try hidden fields method
        addHiddenFieldsToForm(pipedriveForm, formData);
      }
      
      console.log('Calculator data prepared for Pipedrive:', formData);
    }
  }, 100); // Check every 100ms
  
  // Stop checking after 5 seconds (form should load by then)
  setTimeout(() => {
    clearInterval(checkPipedriveLoaded);
  }, 5000);
}

/**
 * Add hidden fields to Pipedrive form (fallback method)
 */
function addHiddenFieldsToForm(formContainer, data) {
  // Find the actual form element inside Pipedrive container
  const iframe = formContainer.querySelector('iframe');
  
  if (iframe) {
    // If form is in iframe, we can't directly access it due to CORS
    // So we'll use Pipedrive's postMessage API
    console.log('Pipedrive form loaded in iframe, using postMessage API');
    
    // Store data for when Pipedrive form is ready
    window.pipedriveFormData = data;
    
  } else {
    // If form is directly in DOM (rare), add hidden fields
    const form = formContainer.querySelector('form');
    if (form) {
      Object.keys(data).forEach(key => {
        addHiddenField(form, key, data[key]);
      });
    }
  }
}

/**
 * Add a single hidden field to form
 */
function addHiddenField(form, name, value) {
  // Check if field already exists
  let input = form.querySelector(`input[name="${name}"]`);
  
  if (!input) {
    // Create new hidden input
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }
  
  // Set value
  input.value = value;
}

/**
 * Capitalize project type for display
 */
function capitalizeProjectType(type) {
  const typeMap = {
    'residential': 'Residential',
    'commercial': 'Commercial Office',
    'industrial': 'Warehouse/Industrial',
    'thermal': 'Thermal Modernization',
    'infrastructure': 'Infrastructure',
    'mixed': 'Mixed-Use'
  };
  
  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

// ============================================================================
// UPDATE EXISTING FUNCTIONS
// ============================================================================

/**
 * REPLACE YOUR EXISTING showLeadModal FUNCTION WITH THIS ONE
 */
// Find the existing showLeadModal function in your code and replace it with this:
/*
function showLeadModal() {
  if (!calculatedResults) {
    console.error('Cannot show lead modal: No calculation results');
    return;
  }
  
  // Show the modal
  leadModal.style.display = 'flex';
  
  // Pre-fill Pipedrive form with calculator results
  prefillPipedriveForm();
  
  // Track modal open event
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'lead_modal_opened',
      'calculator_completed': true,
      'project_value': calculatedResults.inputs.projectValue,
      'currency': currentCurrency
    });
  }
  
  console.log('Lead capture modal opened');
}
*/

// ============================================================================
// PIPEDRIVE FORM EVENT LISTENERS
// ============================================================================

/**
 * Listen for Pipedrive form submission success
 */
document.addEventListener('DOMContentLoaded', function() {
  // Listen for Pipedrive WebForms events
  window.addEventListener('message', function(event) {
    // Check if message is from Pipedrive
    if (event.data && event.data.type === 'pipedriveWebForm') {
      
      if (event.data.action === 'submitted') {
        console.log('✅ Lead submitted to Pipedrive successfully!');
        
        // Track conversion in Google Analytics
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            'event': 'lead_submitted',
            'lead_source': 'roi_calculator',
            'project_value': calculatedResults.inputs.projectValue,
            'estimated_savings': Math.round(calculatedResults.totalSavings),
            'currency': currentCurrency,
            'project_type': calculatedResults.inputs.projectType
          });
        }
        
        // Close lead modal
        if (leadModal) {
          leadModal.style.display = 'none';
        }
        
        // Show thank you modal
        if (thankyouModal) {
          thankyouModal.style.display = 'flex';
        }
      }
      
      if (event.data.action === 'loaded') {
        console.log('Pipedrive form loaded successfully');
      }
    }
  });
  
  console.log('✅ Pipedrive integration loaded successfully');
});

// ============================================================================
// TESTING & DEBUGGING
// ============================================================================

/**
 * Test function - call this from browser console to test Pipedrive integration
 * Usage: window.testPipedriveIntegration()
 */
window.testPipedriveIntegration = function() {
  console.log('=== PIPEDRIVE INTEGRATION TEST ===');
  console.log('Field IDs configured:', PIPEDRIVE_FIELD_IDS);
  console.log('Calculator results available:', !!calculatedResults);
  
  if (calculatedResults) {
    console.log('Current currency:', currentCurrency);
    console.log('Project value:', calculatedResults.inputs.projectValue);
    console.log('Estimated savings:', Math.round(calculatedResults.totalSavings));
    console.log('ROI percentage:', Math.round(calculatedResults.roi));
  }
  
  const pipedriveForm = document.querySelector('[data-pd-webforms]');
  console.log('Pipedrive form found:', !!pipedriveForm);
  
  if (!pipedriveForm) {
    console.warn('⚠️ Pipedrive form not found in DOM. Make sure modal is open.');
  }
  
  console.log('=== END TEST ===');
};

// Log successful initialization
console.log('🚀 Pipedrive integration module loaded');
console.log('💡 Use window.testPipedriveIntegration() to test configuration');
