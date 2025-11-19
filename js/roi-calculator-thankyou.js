// ROI Calculator - Thank You Page with Auto PDF Generation
console.log('🎉 Thank you page loaded');

const CURRENCIES = {
  PLN: { symbol: 'zł', code: 'PLN', name: 'Polish Złoty', locale: 'pl-PL', suffix: true },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound', locale: 'en-GB', suffix: false },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'de-DE', suffix: false },
  USD: { symbol: '$', code: 'USD', name: 'US Dollar', locale: 'en-US', suffix: false },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar', locale: 'en-AU', suffix: false }
};

let loadingState, successState, errorState, savingsSummary, manualDownloadBtn;
let calculatorData = null;

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing thank you page...');
  initializeElements();
  loadCalculatorData();
  setTimeout(() => attemptPDFGeneration(), 1500);
});

function initializeElements() {
  loadingState = document.getElementById('loading-state');
  successState = document.getElementById('success-state');
  errorState = document.getElementById('error-state');
  savingsSummary = document.getElementById('savings-summary');
  manualDownloadBtn = document.getElementById('manual-download-btn');
  
  if (manualDownloadBtn) {
    manualDownloadBtn.addEventListener('click', () => generatePDFReport());
  }
}

function loadCalculatorData() {
  try {
    const stored = localStorage.getItem('bimtakeoff_calculator_data');
    if (stored) {
      calculatorData = JSON.parse(stored);
      console.log('✅ Calculator data loaded:', calculatorData);
      return true;
    }
    console.warn('⚠️ No calculator data found');
    return false;
  } catch (error) {
    console.error('❌ Failed to load data:', error);
    return false;
  }
}

function attemptPDFGeneration() {
  if (!calculatorData || typeof window.jspdf === 'undefined') {
    showErrorState();
    return;
  }
  
  try {
    console.log('🚀 Generating PDF...');
    generatePDFReport();
    showSuccessState();
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    showErrorState();
  }
}

function generatePDFReport() {
  if (!calculatorData) {
    alert('No calculator data available');
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const projectValue = calculatorData.project_value;
  const totalSavings = calculatorData.estimated_savings;
  const roiPercentage = calculatorData.roi_percentage;
  const currency = calculatorData.currency || 'PLN';
  const timeline = calculatorData.timeline || '3-6 months';
  const projectType = calculatorData.project_type || 'General Construction';
  
  // Colors
  const orange = [255, 153, 0];
  const green = [16, 185, 129];
  const gray = [107, 114, 128];
  const darkGray = [44, 44, 44];
  const lightGray = [248, 249, 250];
  
  // ===== PAGE 1: COVER PAGE =====
  generateCoverPage(doc, { orange, green, gray, darkGray, lightGray, projectValue, totalSavings, roiPercentage, currency });
  
  // ===== PAGE 2: EXECUTIVE SUMMARY =====
  doc.addPage();
  generateExecutiveSummary(doc, { orange, gray, darkGray, projectValue, totalSavings, roiPercentage, currency, timeline, projectType });
  
  // ===== PAGE 3: DETAILED BREAKDOWN =====
  doc.addPage();
  generateDetailedBreakdown(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency });
  
  // ===== PAGE 4: SERVICE DELIVERABLES =====
  doc.addPage();
  generateServiceDeliverables(doc, { orange, gray, darkGray, timeline });
  
  // ===== PAGE 5: NEXT STEPS =====
  doc.addPage();
  generateNextSteps(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency });
  
  const fileName = 'BIM-Takeoff-ROI-Report-' + currency + '-' + Date.now() + '.pdf';
  doc.save(fileName);
  
  console.log('✅ Enhanced PDF generated:', fileName);
}

function generateCoverPage(doc, { orange, green, gray, darkGray, lightGray, projectValue, totalSavings, roiPercentage, currency }) {
  // Header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('ROI ANALYSIS REPORT', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('BIM Takeoff - Professional Cost Estimation', 105, 30, { align: 'center' });
  
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('Generated: ' + new Date().toLocaleDateString('en-GB'), 105, 50, { align: 'center' });
  
  let yPos = 70;
  
  // Main metrics
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.text('PROJECT VALUE', 47.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(projectValue, currency), 47.5, yPos + 20, { align: 'center' });
  
  doc.setFillColor(240, 253, 244);
  doc.rect(77.5, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('ESTIMATED SAVINGS', 105, yPos + 8, { align: 'center' });
  doc.setTextColor(...green);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(totalSavings, currency), 105, yPos + 20, { align: 'center' });
  
  doc.setFillColor(255, 247, 237);
  doc.rect(135, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('ROI', 162.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(roiPercentage + '%', 162.5, yPos + 20, { align: 'center' });
  
  // Key Highlights
  yPos = 120;
  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Why Choose BIM Takeoff?', 20, yPos);
  
  yPos += 15;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const highlights = [
    '• 3-5% cost accuracy vs 10-15% industry standard',
    '• 3-10 day turnaround vs 6-8 weeks traditional methods',
    '• BIM 5D technology for superior precision',
    '• 20 years international experience (UK, EU, Australia)',
    '• ISO 19650 compliant processes',
    '• Dedicated project manager assigned'
  ];
  
  highlights.forEach(highlight => {
    doc.text(highlight, 20, yPos);
    yPos += 8;
  });
  
  // Contact info footer
  yPos = 270;
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.text('Contact: info@bimtakeoff.com | +44 (0) 20 3239 9967', 105, yPos, { align: 'center' });
  doc.text('www.bimtakeoff.com', 105, yPos + 7, { align: 'center' });
}

function generateExecutiveSummary(doc, { orange, gray, darkGray, projectValue, totalSavings, roiPercentage, currency, timeline, projectType }) {
  addPageHeader(doc, 'Executive Summary', orange, gray);
  
  let yPos = 50;
  
  // Project Overview
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Project Overview', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  doc.text('Project Type: ' + projectType, 20, yPos);
  yPos += 7;
  doc.text('Project Value: ' + formatCurrency(projectValue, currency), 20, yPos);
  yPos += 7;
  doc.text('Estimated Timeline: ' + timeline, 20, yPos);
  
  yPos += 15;
  
  // Financial Impact
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Financial Impact Analysis', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const savingsPercent = ((totalSavings / projectValue) * 100).toFixed(1);
  
  const lines = doc.splitTextToSize(
    'Our BIM 5D analysis indicates potential cost savings of ' + formatCurrency(totalSavings, currency) + 
    ' (' + savingsPercent + '% of project value) through early detection of design conflicts, optimized ' +
    'material quantities, and elimination of cost overruns. This represents a ' + roiPercentage + '% return on ' +
    'investment when compared to traditional estimation methods.',
    170
  );
  
  lines.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });
  
  yPos += 10;
  
  // How We Save You Money
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('How We Save You Money', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const savingsPoints = [
    {
      title: '1. Design Clash Detection',
      desc: 'Identify conflicts before construction begins, avoiding costly rework'
    },
    {
      title: '2. Accurate Material Quantification',
      desc: 'Precise measurements reduce over-ordering and waste'
    },
    {
      title: '3. Optimized Procurement',
      desc: 'Better quantity data enables competitive bidding and bulk discounts'
    },
    {
      title: '4. Risk Mitigation',
      desc: 'Early identification of potential cost overruns and schedule delays'
    },
    {
      title: '5. Value Engineering',
      desc: 'Alternative material and method recommendations for cost optimization'
    }
  ];
  
  savingsPoints.forEach(point => {
    doc.setFont(undefined, 'bold');
    doc.text(point.title, 20, yPos);
    yPos += 6;
    doc.setFont(undefined, 'normal');
    const descLines = doc.splitTextToSize(point.desc, 165);
    descLines.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 5;
    });
    yPos += 3;
  });
  
  addPageFooter(doc, gray);
}

function generateDetailedBreakdown(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  addPageHeader(doc, 'Detailed Savings Breakdown', orange, gray);
  
  let yPos = 50;
  
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont(undefined, 'normal');
  doc.text('Based on industry benchmarks and our 20+ years of experience across 2,000+ projects', 20, yPos);
  
  yPos += 15;
  
  // Savings categories with percentages
  const savingsCategories = [
    { category: 'Design Clash Resolution', percentage: 35, color: [16, 185, 129] },
    { category: 'Material Waste Reduction', percentage: 25, color: [59, 130, 246] },
    { category: 'Procurement Optimization', percentage: 20, color: [249, 115, 22] },
    { category: 'Schedule Acceleration', percentage: 12, color: [168, 85, 247] },
    { category: 'Risk Contingency Reduction', percentage: 8, color: [236, 72, 153] }
  ];
  
  savingsCategories.forEach(item => {
    const amount = (totalSavings * item.percentage) / 100;
    
    // Category bar
    doc.setFillColor(...lightGray);
    doc.rect(20, yPos, 170, 20, 'F');
    
    doc.setFillColor(...item.color);
    const barWidth = (item.percentage / 100) * 140;
    doc.rect(22, yPos + 2, barWidth, 16, 'F');
    
    // Text
    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(item.category, 25, yPos + 8);
    
    doc.setFont(undefined, 'normal');
    doc.text(item.percentage + '%', 25, yPos + 15);
    
    doc.setTextColor(...item.color);
    doc.setFont(undefined, 'bold');
    doc.text(formatCurrency(amount, currency), 185, yPos + 12, { align: 'right' });
    
    yPos += 25;
  });
  
  yPos += 10;
  
  // Total savings box
  doc.setFillColor(...green);
  doc.rect(20, yPos, 170, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL ESTIMATED SAVINGS', 25, yPos + 10);
  doc.text(formatCurrency(totalSavings, currency), 185, yPos + 10, { align: 'right' });
  
  yPos += 25;
  
  // Additional value
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Additional Value Beyond Direct Savings', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const additionalValues = [
    'Improved stakeholder confidence through professional documentation',
    'Enhanced project predictability and reduced financial risk',
    'Better contractor bid quality with accurate quantities',
    'Accelerated project approvals with comprehensive reports',
    'Long-term asset management data for facility operations'
  ];
  
  additionalValues.forEach(value => {
    doc.text('• ' + value, 20, yPos);
    yPos += 7;
  });
  
  addPageFooter(doc, gray);
}

function generateServiceDeliverables(doc, { orange, gray, darkGray, timeline }) {
  addPageHeader(doc, 'What You Receive', orange, gray);
  
  let yPos = 50;
  
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont(undefined, 'normal');
  doc.text('Comprehensive BIM 5D takeoff package delivered within ' + timeline, 20, yPos);
  
  yPos += 15;
  
  const deliverables = [
    {
      title: 'Complete Bill of Quantities',
      items: [
        'Detailed element-by-element breakdown',
        'Material specifications and classifications',
        'Volume, area, and length calculations',
        'Export-ready formats (Excel, CSV, IFC)'
      ]
    },
    {
      title: 'BIM Coordination Report',
      items: [
        'Clash detection analysis',
        'Design inconsistency identification',
        'Quantity verification against drawings',
        'Recommended resolutions'
      ]
    },
    {
      title: 'Cost Estimate Package',
      items: [
        'Elemental cost breakdown',
        'Material cost analysis',
        'Labor hour estimates',
        'Risk allowances and contingencies'
      ]
    },
    {
      title: 'Technical Documentation',
      items: [
        'Methodology report',
        'Assumption register',
        'Quality assurance certificates',
        'ISO 19650 compliance documentation'
      ]
    }
  ];
  
  deliverables.forEach(deliverable => {
    doc.setFontSize(11);
    doc.setTextColor(...darkGray);
    doc.setFont(undefined, 'bold');
    doc.text(deliverable.title, 20, yPos);
    
    yPos += 8;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...gray);
    
    deliverable.items.forEach(item => {
      doc.text('• ' + item, 25, yPos);
      yPos += 6;
    });
    
    yPos += 5;
  });
  
  addPageFooter(doc, gray);
}

function generateNextSteps(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  addPageHeader(doc, 'Next Steps', orange, gray);
  
  let yPos = 50;
  
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Let\'s Get Started', 20, yPos);
  
  yPos += 12;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  doc.text('Our team is ready to help you achieve these savings. Here\'s what happens next:', 20, yPos);
  
  yPos += 15;
  
  const steps = [
    {
      step: '1',
      title: 'Initial Consultation',
      desc: 'Free 30-minute discussion about your project requirements, timeline, and specific challenges',
      timeline: 'Within 24 hours'
    },
    {
      step: '2',
      title: 'Project Assessment',
      desc: 'Review of your drawings and documents to provide a detailed proposal and firm price quote',
      timeline: '1-2 business days'
    },
    {
      step: '3',
      title: 'Kick-off Meeting',
      desc: 'Detailed briefing with your assigned project manager to align on deliverables and schedule',
      timeline: 'Upon approval'
    },
    {
      step: '4',
      title: 'Delivery & Review',
      desc: 'Complete takeoff package delivered with walkthrough session and Q&A support',
      timeline: 'Per agreed schedule'
    }
  ];
  
  steps.forEach(step => {
    doc.setFillColor(...lightGray);
    doc.rect(20, yPos, 170, 25, 'F');
    
    // Step number circle
    doc.setFillColor(...orange);
    doc.circle(30, yPos + 12, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(step.step, 30, yPos + 14, { align: 'center' });
    
    // Step title
    doc.setTextColor(...darkGray);
    doc.setFontSize(11);
    doc.text(step.title, 40, yPos + 8);
    
    // Timeline
    doc.setTextColor(...orange);
    doc.setFontSize(8);
    doc.text(step.timeline, 185, yPos + 8, { align: 'right' });
    
    // Description
    doc.setTextColor(...gray);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    const descLines = doc.splitTextToSize(step.desc, 145);
    let descY = yPos + 15;
    descLines.forEach(line => {
      doc.text(line, 40, descY);
      descY += 5;
    });
    
    yPos += 30;
  });
  
  yPos += 10;
  
  // Contact CTA box
  doc.setFillColor(...green);
  doc.rect(20, yPos, 170, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Save ' + Math.round(totalSavings).toLocaleString() + ' ' + currency + '?', 105, yPos + 12, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text('Contact us today to schedule your free consultation', 105, yPos + 22, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('info@bimtakeoff.com | +44 (0) 20 3239 9967', 105, yPos + 30, { align: 'center' });
  
  addPageFooter(doc, gray);
}

function addPageHeader(doc, title, orange, gray) {
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(title, 105, 16, { align: 'center' });
}

function addPageFooter(doc, gray) {
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont(undefined, 'normal');
  doc.text('www.bimtakeoff.com | info@bimtakeoff.com | +44 (0) 20 3239 9967', 105, 285, { align: 'center' });
  doc.text('Page ' + doc.internal.getNumberOfPages(), 105, 290, { align: 'center' });
}

function formatCurrency(amount, currencyCode) {
  const currency = CURRENCIES[currencyCode];
  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(amount));
  
  return currency.suffix ? formatted + ' ' + currencyCode : currencyCode + ' ' + formatted;
}

function showSuccessState() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  successState.style.display = 'block';
  
  if (calculatorData && savingsSummary) {
    savingsSummary.innerHTML = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;"><div style="background: #F0FDF4; padding: 20px; border-radius: 8px; text-align: center;"><p style="margin: 0; color: var(--bim-medium-gray); font-size: 12px; text-transform: uppercase;">Project Value</p><p style="margin: 8px 0 0 0; color: var(--bim-charcoal); font-size: 24px; font-weight: 700;">' + formatCurrency(calculatorData.project_value, calculatorData.currency) + '</p></div><div style="background: #FFF7ED; padding: 20px; border-radius: 8px; text-align: center;"><p style="margin: 0; color: var(--bim-medium-gray); font-size: 12px; text-transform: uppercase;">Your ROI</p><p style="margin: 8px 0 0 0; color: var(--bim-orange); font-size: 32px; font-weight: 700;">' + calculatorData.roi_percentage + '%</p></div></div><div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 24px; border-radius: 8px; text-align: center; color: white;"><p style="margin: 0; font-size: 14px; opacity: 0.9;">Estimated Savings</p><p style="margin: 8px 0 0 0; font-size: 36px; font-weight: 700;">' + formatCurrency(calculatorData.estimated_savings, calculatorData.currency) + '</p></div>';
  }
  
  console.log('✅ Success state shown');
}

function showErrorState() {
  loadingState.style.display = 'none';
  successState.style.display = 'none';
  errorState.style.display = 'block';
  console.log('⚠️ Error state shown');
}

window.manuallyGeneratePDF = generatePDFReport;
console.log('✅ Thank you page script loaded');
