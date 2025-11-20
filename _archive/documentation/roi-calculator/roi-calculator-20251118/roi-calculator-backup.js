// ROI Calculator Logic - BIM Takeoff
// Realistic calculations based on industry standards

// Configuration
const CONFIG = {
  // BIM Service typical costs (as % of project value)
  bimServiceCost: {
    residential: 0.008,     // 0.8%
    commercial: 0.010,      // 1.0%
    industrial: 0.009,      // 0.9%
    thermal: 0.012,         // 1.2%
    infrastructure: 0.011,  // 1.1%
    mixed: 0.010            // 1.0%
  },
  
  // Timeline factors (weeks)
  timelineWeeks: {
    quick: 1.5,
    standard: 5,
    detailed: 10
  },
  
  // BIM delivery time (days)
  bimDeliveryDays: 7,
  
  // Daily project management cost (PLN per day)
  dailyPMCost: 3500,
  
  // Industry standards
  targetAccuracy: 5,      // ±5% with BIM
  reworkFactor: 0.03,     // 3% of project typically rework
  changeOrderFactor: 0.08 // 8% change orders typical
};

// DOM Elements
let projectType, projectValue, projectValueInput, projectValueDisplay;
let timeline, costVariance, varianceDisplay;
let calculateBtn, resultsPanel;
let totalSavingsEl, timeSavingsEl, accuracyEl, roiEl;
let leadModal, thankyouModal, leadForm;

// Calculator state
let calculatedResults = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  attachEventListeners();
  console.log('ROI Calculator initialized');
});

function initializeElements() {
  // Input elements
  projectType = document.getElementById('project-type');
  projectValue = document.getElementById('project-value');
  projectValueInput = document.getElementById('project-value-input');
  projectValueDisplay = document.getElementById('project-value-display');
  costVariance = document.getElementById('cost-variance');
  varianceDisplay = document.getElementById('variance-display');
  
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
  document.getElementById('get-report-btn').addEventListener('click', function() {
    leadModal.style.display = 'flex';
  });
  
  // Modal close buttons
  document.getElementById('close-modal').addEventListener('click', function() {
    leadModal.style.display = 'none';
  });
  
  document.getElementById('maybe-later').addEventListener('click', function() {
    leadModal.style.display = 'none';
  });
  
  document.getElementById('close-thankyou').addEventListener('click', function() {
    thankyouModal.style.display = 'none';
  });
  
  // Lead form submission
  leadForm.addEventListener('submit', handleLeadSubmission);
  
  // Close modal on background click
  leadModal.addEventListener('click', function(e) {
    if (e.target === leadModal) {
      leadModal.style.display = 'none';
    }
  });
  
  thankyouModal.addEventListener('click', function(e) {
    if (e.target === thankyouModal) {
      thankyouModal.style.display = 'none';
    }
  });
}

function calculateROI() {
  // Get values
  const type = projectType.value;
  const value = parseInt(projectValue.value);
  const variance = parseInt(costVariance.value);
  const timelineType = document.querySelector('input[name="timeline"]:checked').value;
  
  // Calculate BIM service cost
  const bimCost = value * CONFIG.bimServiceCost[type];
  
  // 1. Time Savings
  const currentWeeks = CONFIG.timelineWeeks[timelineType];
  const currentDays = currentWeeks * 5; // Working days
  const bimDays = CONFIG.bimDeliveryDays;
  const daysSaved = currentDays - bimDays;
  const timeSavings = daysSaved * CONFIG.dailyPMCost;
  
  // 2. Cost Accuracy Savings
  // Difference between current variance and BIM accuracy
  const varianceImprovement = variance - CONFIG.targetAccuracy;
  const accuracySavings = value * (varianceImprovement / 100) * 0.5; // Conservative: 50% of variance improvement
  
  // 3. Rework Avoidance
  // Poor estimates lead to more rework
  const reworkFactor = (variance / 15); // Normalized to baseline
  const reworkSavings = value * CONFIG.reworkFactor * reworkFactor * 0.6; // 60% of rework is avoidable
  
  // 4. Change Order Reduction
  // Better estimates = fewer change orders
  const changeOrderReduction = value * CONFIG.changeOrderFactor * (variance / 20) * 0.4; // 40% reduction
  
  // Total savings
  const totalSavings = timeSavings + accuracySavings + reworkSavings + changeOrderReduction;
  
  // ROI calculation
  const roi = ((totalSavings - bimCost) / bimCost) * 100;
  
  // Store results
  calculatedResults = {
    totalSavings: totalSavings,
    timeSavings: daysSaved,
    accuracyFrom: variance,
    accuracyTo: CONFIG.targetAccuracy,
    roi: roi,
    breakdown: {
      timeSavings: timeSavings,
      accuracySavings: accuracySavings,
      reworkSavings: reworkSavings,
      changeOrderSavings: changeOrderReduction
    },
    inputs: {
      projectType: type,
      projectValue: value,
      variance: variance,
      timeline: timelineType
    }
  };
  
  // Display results
  displayResults();
  
  // Track event (Google Tag Manager)
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'roi_calculated',
      'project_value': value,
      'project_type': type,
      'estimated_savings': Math.round(totalSavings)
    });
  }
}

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
  
  // Animate numbers
  animateValue(totalSavingsEl, 0, calculatedResults.totalSavings, 1500, (val) => {
    return formatCurrency(val) + ' PLN';
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
    
    // Easing function (easeOutQuart)
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * eased;
    
    element.textContent = formatter(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function handleLeadSubmission(e) {
  e.preventDefault();
  
  // Get form data
  const leadData = {
    name: document.getElementById('lead-name').value,
    company: document.getElementById('lead-company').value,
    email: document.getElementById('lead-email').value,
    phone: document.getElementById('lead-phone').value,
    timeline: document.getElementById('lead-timeline').value,
    calculatorResults: calculatedResults,
    timestamp: new Date().toISOString(),
    source: 'ROI Calculator',
    pageUrl: window.location.href
  };
  
  // Log to console (in production, send to backend/CRM)
  console.log('Lead captured:', leadData);
  
  // Track conversion
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'lead_submitted',
      'lead_source': 'roi_calculator',
      'project_value': calculatedResults.inputs.projectValue,
      'estimated_savings': Math.round(calculatedResults.totalSavings)
    });
  }
  
  // TODO: Send to backend/Pipedrive/email service
  // Example:
  // fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(leadData)
  // });
  
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

function generatePDFReport(leadData) {
  // In production, this would call a backend service to generate PDF
  // For now, just log and show alert
  console.log('Generating PDF report for:', leadData.email);
  
  // Create a simple text report (placeholder)
  const reportContent = generateReportContent(leadData);
  
  // In production, you'd send this to a PDF generation service
  console.log('Report content:', reportContent);
  
  // Simulate PDF download (would be actual PDF in production)
  // const blob = new Blob([reportContent], { type: 'text/plain' });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = `BIM-Takeoff-ROI-Report-${Date.now()}.txt`;
  // a.click();
}

function generateReportContent(leadData) {
  const results = leadData.calculatorResults;
  
  return `
BIM TAKEOFF - ROI ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

CLIENT INFORMATION
Name: ${leadData.name}
Company: ${leadData.company}
Email: ${leadData.email}
Phone: ${leadData.phone}
Project Timeline: ${leadData.timeline}

PROJECT DETAILS
Type: ${results.inputs.projectType}
Value: ${formatCurrency(results.inputs.projectValue)} PLN
Current Variance: ±${results.inputs.variance}%
Timeline: ${results.inputs.timeline}

CALCULATED SAVINGS
Total Savings: ${formatCurrency(results.totalSavings)} PLN
ROI: ${Math.round(results.roi)}%

BREAKDOWN:
- Time Savings: ${formatCurrency(results.breakdown.timeSavings)} PLN (${results.timeSavings} days)
- Accuracy Improvement: ${formatCurrency(results.breakdown.accuracySavings)} PLN
- Rework Avoidance: ${formatCurrency(results.breakdown.reworkSavings)} PLN
- Change Order Reduction: ${formatCurrency(results.breakdown.changeOrderSavings)} PLN

NEXT STEPS:
1. Schedule consultation: contact@bimtakeoff.com
2. Review project documentation
3. Receive detailed quote within 24 hours
4. Start saving on your next project

Contact: +44 7832 049230 | contact@bimtakeoff.com
Website: www.bimtakeoff.com
`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}

// Utility: Format numbers with thousand separators
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateROI,
    CONFIG
  };
}
