// ROI Calculator Thank You Page - PDF Generation
// Enhanced with proper Polish language detection

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎉 Thank you page DOMContentLoaded fired');
  
  const resultCard = document.getElementById('result-card');
  const errorCard = document.getElementById('error-card');
  const manualDownloadBtn = document.getElementById('manual-download-btn');
  const savingsDisplay = document.getElementById('display-savings');
  const roiDisplay = document.getElementById('display-roi');
  const valueDisplay = document.getElementById('display-value');
  const currencyElements = document.querySelectorAll('.currency');
  
  if (errorCard) {
    errorCard.style.display = 'none';
  }
  
  // Debug localStorage
  console.log('💾 LocalStorage data:', localStorage.getItem('bimtakeoff_calculator_data'));
  
  // Add manual download button listener
  if (manualDownloadBtn) {
    manualDownloadBtn.addEventListener('click', () => {
      console.log('📥 Manual download button clicked');
      generatePDFReport();
    });
  }
  
  // Load calculator data from localStorage
  function loadCalculatorData() {
    console.log('📊 Loading calculator data...');
    try {
      const stored = localStorage.getItem('bimtakeoff_calculator_data');
      console.log('💾 Raw stored data:', stored);
      
      if (!stored) {
        console.warn('⚠️ No calculator data in localStorage');
        return null;
      }
      
      const data = JSON.parse(stored);
      console.log('✅ Parsed calculator data:', data);
      return data;
    } catch (e) {
      console.error('❌ Error loading calculator data:', e);
      return null;
    }
  }
  
  // Load and display data
  const calculatorData = loadCalculatorData();
  console.log('📊 Calculator data after loading:', calculatorData);
  
  if (calculatorData) {
    // Display the calculated values
    if (savingsDisplay) savingsDisplay.textContent = Math.round(calculatorData.savings).toLocaleString();
    if (roiDisplay) roiDisplay.textContent = Math.round(calculatorData.roi) + '%';
    if (valueDisplay) valueDisplay.textContent = calculatorData.projectValue.toLocaleString();
    
    // Update currency displays
    currencyElements.forEach(el => {
      el.textContent = calculatorData.currency || 'PLN';
    });
    
    if (resultCard) resultCard.style.display = 'block';
    
    // Auto-generate PDF after a delay
    setTimeout(() => {
      console.log('⏰ Auto-generating PDF after 1.5 second delay...');
      attemptPDFGeneration();
    }, 1500);
  } else {
    // Show error if no data
    if (errorCard) errorCard.style.display = 'block';
    if (resultCard) resultCard.style.display = 'none';
    console.error('❌ No calculator data available to display');
  }
});

// Attempt to auto-generate PDF with better error handling
function attemptPDFGeneration() {
  console.log('🎯 attemptPDFGeneration() called');
  
  // First check if we have calculator data
  const calculatorData = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  
  if (!calculatorData || !calculatorData.projectValue) {
    console.warn('⚠️ No valid calculator data, skipping auto-generation');
    return;
  }
  
  // Check if jsPDF is loaded - check all possible locations
  const jspdfAvailable = (typeof window.jspdf !== 'undefined' && typeof window.jspdf.jsPDF !== 'undefined') || 
                          (typeof window.jsPDF !== 'undefined');
  
  console.log('📦 Checking jsPDF availability:', jspdfAvailable);
  
  if (!jspdfAvailable) {
    console.warn('⚠️ jsPDF not loaded yet, retrying in 500ms...');
    setTimeout(() => {
      attemptPDFGeneration();
    }, 500);
    return;
  }
  
  console.log('🚀 Generating PDF automatically...');
  generatePDFReport();
}

function generatePDFReport() {
  console.log('📝 generatePDFReport called');
  const calculatorData = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  
  console.log('🔍 Calculator data check:', !!calculatorData, 'Has projectValue:', !!calculatorData.projectValue);
  console.log('📦 jsPDF check - window.jspdf:', !!window.jspdf, 'window.jsPDF:', !!window.jsPDF);
  
  if (!calculatorData || !calculatorData.projectValue) {
    console.error('❌ No calculator data available');
    alert('No calculator data available. Please complete the ROI calculator first.');
    return;
  }
  
  console.log('📦 Attempting to get jsPDF from window.jspdf');
  console.log('🔍 window.jspdf =', window.jspdf);
  console.log('🔍 window.jsPDF =', window.jsPDF);
  
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
    console.log('✅ Got jsPDF from window.jspdf.jsPDF');
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
    console.log('✅ Got jsPDF from window.jsPDF');
  } else {
    console.error('❌ jsPDF not found in window object');
    alert('PDF library not loaded properly. Please refresh the page and try again.');
    return;
  }
  
  console.log('🚀 Generating PDF...');
  const doc = new jsPDF();
  
  // Extract data
  const projectValue = calculatorData.projectValue || 1000000;
  const totalSavings = calculatorData.savings || 50000;
  const roiPercentage = calculatorData.roi || 5;
  const currency = calculatorData.currency || 'PLN';
  const timeline = calculatorData.timeline || '3-6 months';
  const projectType = calculatorData.project_type || 'General Construction';
  
  // IMPROVED LANGUAGE DETECTION
  // Check multiple sources for language preference:
  // 1. Check URL path for /pl/
  // 2. Check document language attribute
  // 3. Check calculator data for language field
  // 4. Fall back to currency-based detection
  
  const urlPath = window.location.pathname.toLowerCase();
  const isPolishURL = urlPath.includes('/pl/');
  const documentLang = document.documentElement.lang || '';
  const isPolishLang = documentLang.toLowerCase().startsWith('pl');
  const dataLanguage = calculatorData.language || '';
  const isPolishData = dataLanguage.toLowerCase() === 'pl';
  const isPolishCurrency = currency === 'PLN';
  
  // Determine if we should generate Polish PDF
  const isPolish = isPolishURL || isPolishLang || isPolishData || isPolishCurrency;
  
  console.log('🌍 Language detection:', {
    urlPath,
    isPolishURL,
    documentLang,
    isPolishLang,
    dataLanguage,
    isPolishData,
    currency,
    isPolishCurrency,
    finalDecision: isPolish ? 'Polish' : 'English'
  });
  
  // Colors
  const orange = [255, 153, 0];
  const green = [16, 185, 129];
  const gray = [107, 114, 128];
  const darkGray = [44, 44, 44];
  const lightGray = [248, 249, 250];
  
  if (isPolish) {
    // ===== POLISH VERSION =====
    console.log('🇵🇱 Generating Polish PDF...');
    
    // ===== PAGE 1: COVER PAGE =====
    generateCoverPagePL(doc, { orange, green, gray, darkGray, lightGray, projectValue, totalSavings, roiPercentage, currency });
    
    // ===== PAGE 2: EXECUTIVE SUMMARY =====
    doc.addPage();
    generateExecutiveSummaryPL(doc, { orange, gray, darkGray, projectValue, totalSavings, roiPercentage, currency, timeline, projectType });
    
    // ===== PAGE 3: DETAILED BREAKDOWN =====
    doc.addPage();
    generateDetailedBreakdownPL(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency });
    
    // ===== PAGE 4: SERVICE DELIVERABLES =====
    doc.addPage();
    generateServiceDeliverablesPL(doc, { orange, gray, darkGray, timeline });
    
    // ===== PAGE 5: NEXT STEPS =====
    doc.addPage();
    generateNextStepsPL(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency });
    
    const fileName = 'BIM-Takeoff-Raport-ROI-' + Date.now() + '.pdf';
    doc.save(fileName);
    console.log('✅ Polish PDF generated:', fileName);
  } else {
    // ===== ENGLISH VERSION =====
    console.log('🇬🇧 Generating English PDF...');
    
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
    console.log('✅ English PDF generated:', fileName);
  }
}

// ========================================
// ENGLISH VERSION FUNCTIONS
// ========================================

function generateCoverPage(doc, { orange, green, gray, darkGray, lightGray, projectValue, totalSavings, roiPercentage, currency }) {
  // Header background
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 60, 'F');
  
  // Logo placeholder
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 15, 40, 15, 'F');
  doc.setTextColor(...orange);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('BIM TAKEOFF', 35, 24, { align: 'center' });
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('ROI ANALYSIS REPORT', 105, 30, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text('Professional Cost Estimation Services', 105, 40, { align: 'center' });
  
  // Date
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 50, { align: 'center' });
  
  // Main metrics section
  let yPos = 80;
  
  // Project Value Box
  doc.setFillColor(...lightGray);
  doc.roundedRect(20, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('PROJECT VALUE', 47.5, yPos + 10, { align: 'center' });
  doc.setTextColor(...darkGray);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  const formattedValue = currency === 'PLN' 
    ? projectValue.toLocaleString('pl-PL') + ' PLN'
    : currency + ' ' + projectValue.toLocaleString('en-US');
  doc.text(formattedValue, 47.5, yPos + 22, { align: 'center' });
  
  // Estimated Savings Box
  doc.setFillColor(...green);
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(77.5, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('ESTIMATED SAVINGS', 105, yPos + 10, { align: 'center' });
  doc.setTextColor(...green);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  const formattedSavings = currency === 'PLN' 
    ? totalSavings.toLocaleString('pl-PL') + ' PLN'
    : currency + ' ' + totalSavings.toLocaleString('en-US');
  doc.text(formattedSavings, 105, yPos + 22, { align: 'center' });
  
  // ROI Percentage Box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(135, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('RETURN ON INVESTMENT', 162.5, yPos + 10, { align: 'center' });
  doc.setTextColor(...orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(roiPercentage + '%', 162.5, yPos + 22, { align: 'center' });
  
  // Key benefits section
  yPos = 130;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('KEY BENEFITS', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(11);
  const benefits = [
    '✓  3-10 days turnaround vs 6-8 weeks traditional',
    '✓  ±3-5% accuracy guaranteed',
    '✓  BSR compliance and regulatory expertise',
    '✓  20+ years international experience',
    '✓  2000+ projects completed globally'
  ];
  
  yPos += 10;
  benefits.forEach(benefit => {
    doc.setTextColor(...green);
    doc.text('✓', 25, yPos);
    doc.setTextColor(...darkGray);
    doc.text(benefit.substring(3), 32, yPos);
    yPos += 8;
  });
  
  // Call to action box
  yPos = 200;
  doc.setFillColor(...orange);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('YOUR POTENTIAL ANNUAL SAVINGS:', 105, yPos + 15, { align: 'center' });
  doc.setFontSize(20);
  const annualSavings = Math.round(totalSavings * 3);
  const formattedAnnual = currency === 'PLN' 
    ? annualSavings.toLocaleString('pl-PL') + ' PLN'
    : currency + ' ' + annualSavings.toLocaleString('en-US');
  doc.text(formattedAnnual, 105, yPos + 28, { align: 'center' });
  
  // Footer
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('www.bimtakeoff.com | enquiry@bimtakeoff.com | +61 480 373 900', 105, 280, { align: 'center' });
}

function generateExecutiveSummary(doc, { orange, gray, darkGray, projectValue, totalSavings, roiPercentage, currency, timeline, projectType }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('EXECUTIVE SUMMARY', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Project overview
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Project Overview', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  yPos += 8;
  doc.text(`Project Type: ${projectType}`, 25, yPos);
  yPos += 6;
  const formattedValue = currency === 'PLN' 
    ? projectValue.toLocaleString('pl-PL') + ' PLN'
    : currency + ' ' + projectValue.toLocaleString('en-US');
  doc.text(`Total Project Value: ${formattedValue}`, 25, yPos);
  yPos += 6;
  doc.text(`Implementation Timeline: ${timeline}`, 25, yPos);
  
  // Financial impact
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Financial Impact Analysis', 20, yPos);
  
  // Create table for financial breakdown
  yPos += 10;
  const tableData = [
    ['Cost Reduction Area', 'Traditional Method', 'With BIM Takeoff', 'Savings'],
    ['Estimation Time', '6-8 weeks', '3-10 days', '75% reduction'],
    ['Accuracy Rate', '±10-15%', '±3-5%', '67% improvement'],
    ['Rework Costs', '5-10% of budget', '<2% of budget', `${Math.round(projectValue * 0.06).toLocaleString()} ${currency}`],
    ['Change Orders', '15-20% typical', '5-8% typical', `${Math.round(projectValue * 0.12).toLocaleString()} ${currency}`]
  ];
  
  // Table header
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  
  const colWidths = [50, 35, 35, 50];
  let xPos = 22;
  tableData[0].forEach((header, i) => {
    doc.text(header, xPos, yPos + 5);
    xPos += colWidths[i];
  });
  
  // Table rows
  doc.setFont(undefined, 'normal');
  yPos += 10;
  for (let i = 1; i < tableData.length; i++) {
    xPos = 22;
    tableData[i].forEach((cell, j) => {
      doc.text(cell, xPos, yPos);
      xPos += colWidths[j];
    });
    yPos += 7;
  }
  
  // Strategic advantages
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Strategic Advantages', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  yPos += 8;
  const advantages = [
    'Faster bid turnaround enables more tender opportunities',
    'Higher accuracy reduces contingency requirements',
    'Digital twin creation for facility management',
    'Improved stakeholder communication with 3D visualization',
    'Risk mitigation through clash detection and coordination'
  ];
  
  advantages.forEach(adv => {
    doc.text('•  ' + adv, 25, yPos);
    yPos += 7;
  });
  
  // Recommendation box
  yPos += 10;
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(20, yPos, 170, 35, 3, 3, 'F');
  doc.setTextColor(...green);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('RECOMMENDATION', 30, yPos + 10);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  const recText = `Based on the analysis, implementing BIM Takeoff services will deliver an estimated ${roiPercentage}% ROI, ` +
    `saving approximately ${totalSavings.toLocaleString()} ${currency} per project. With your project pipeline, ` +
    `this translates to annual savings of ${(totalSavings * 3).toLocaleString()} ${currency} or more.`;
  
  const lines = doc.splitTextToSize(recText, 150);
  yPos += 18;
  lines.forEach(line => {
    doc.text(line, 30, yPos);
    yPos += 5;
  });
}

function generateDetailedBreakdown(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('DETAILED SAVINGS ANALYSIS', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Cost comparison chart
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Cost Comparison Breakdown', 20, yPos);
  
  yPos += 10;
  
  // Draw comparison bars
  const comparisons = [
    { label: 'Estimation Process', traditional: 25000, bimtakeoff: 8000 },
    { label: 'Rework & Corrections', traditional: 15000, bimtakeoff: 3000 },
    { label: 'Project Delays', traditional: 30000, bimtakeoff: 5000 },
    { label: 'Administrative Overhead', traditional: 12000, bimtakeoff: 4000 },
    { label: 'Quality Assurance', traditional: 8000, bimtakeoff: 2000 }
  ];
  
  const maxValue = 35000;
  const barWidth = 160;
  
  comparisons.forEach(comp => {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(comp.label, 20, yPos);
    yPos += 5;
    
    // Traditional bar (gray)
    doc.setFillColor(...gray);
    const tradWidth = (comp.traditional / maxValue) * barWidth;
    doc.rect(20, yPos, tradWidth, 6, 'F');
    
    // BIM Takeoff bar (green)
    yPos += 8;
    doc.setFillColor(...green);
    const bimWidth = (comp.bimtakeoff / maxValue) * barWidth;
    doc.rect(20, yPos, bimWidth, 6, 'F');
    
    // Values
    doc.setTextColor(...darkGray);
    doc.setFontSize(9);
    doc.text(`${comp.traditional.toLocaleString()} ${currency}`, 20 + tradWidth + 2, yPos - 4);
    doc.text(`${comp.bimtakeoff.toLocaleString()} ${currency}`, 20 + bimWidth + 2, yPos + 5);
    
    yPos += 15;
  });
  
  // Legend
  doc.setFillColor(...gray);
  doc.rect(20, yPos, 10, 5, 'F');
  doc.text('Traditional Method', 32, yPos + 4);
  doc.setFillColor(...green);
  doc.rect(80, yPos, 10, 5, 'F');
  doc.text('With BIM Takeoff', 92, yPos + 4);
  
  // Time savings analysis
  yPos += 20;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Time Savings Analysis', 20, yPos);
  
  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const timeData = [
    ['Phase', 'Traditional', 'BIM Takeoff', 'Time Saved'],
    ['Initial Takeoff', '3 weeks', '2 days', '19 days'],
    ['Verification', '2 weeks', '1 day', '13 days'],
    ['Revisions', '1 week', '4 hours', '6.5 days'],
    ['Final Review', '3 days', '2 hours', '2.75 days']
  ];
  
  // Time savings table
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  
  let xPos = 22;
  const timeColWidths = [40, 35, 35, 60];
  timeData[0].forEach((header, i) => {
    doc.text(header, xPos, yPos + 5);
    xPos += timeColWidths[i];
  });
  
  doc.setFont(undefined, 'normal');
  yPos += 10;
  for (let i = 1; i < timeData.length; i++) {
    xPos = 22;
    timeData[i].forEach((cell, j) => {
      if (j === 3) {
        doc.setTextColor(...green);
      } else {
        doc.setTextColor(...darkGray);
      }
      doc.text(cell, xPos, yPos);
      xPos += timeColWidths[j];
    });
    yPos += 7;
  }
  
  // Bottom summary
  yPos += 10;
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(20, yPos, 170, 25, 3, 3, 'F');
  doc.setTextColor(...orange);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL PROJECT SAVINGS', 30, yPos + 10);
  doc.setFontSize(14);
  doc.text(`${totalSavings.toLocaleString()} ${currency}`, 30, yPos + 20);
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Equivalent to 41.25 days saved per project', 110, yPos + 15);
}

function generateServiceDeliverables(doc, { orange, gray, darkGray, timeline }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('SERVICE DELIVERABLES', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Core services
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Core Service Components', 20, yPos);
  
  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const services = [
    {
      title: '3D BIM Model Creation',
      description: 'Complete digital twin of your project with LOD 300-400 accuracy'
    },
    {
      title: 'Quantity Takeoff Reports',
      description: 'Detailed Bills of Quantities in your preferred format (Excel, CostX, Buildsoft)'
    },
    {
      title: 'Clash Detection Analysis',
      description: 'Identify and resolve conflicts before construction begins'
    },
    {
      title: '5D Cost Integration',
      description: 'Real-time cost tracking linked to 3D model elements'
    },
    {
      title: 'Change Management',
      description: 'Track and quantify all design changes with cost implications'
    }
  ];
  
  services.forEach(service => {
    doc.setFont(undefined, 'bold');
    doc.text('• ' + service.title, 25, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    const descLines = doc.splitTextToSize(service.description, 160);
    descLines.forEach(line => {
      doc.text(line, 30, yPos);
      yPos += 5;
    });
    yPos += 3;
  });
  
  // Implementation timeline
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Implementation Timeline: ' + timeline, 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Timeline phases
  const phases = [
    { week: 'Week 1-2', task: 'Initial setup and model creation', status: 'Quick Start' },
    { week: 'Week 3-4', task: 'Quantity extraction and verification', status: 'Core Delivery' },
    { week: 'Week 5-6', task: 'Quality assurance and reporting', status: 'Final Review' },
    { week: 'Ongoing', task: 'Change management and updates', status: 'Continuous Support' }
  ];
  
  phases.forEach(phase => {
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 12, 'F');
    doc.setFont(undefined, 'bold');
    doc.text(phase.week, 25, yPos + 8);
    doc.setFont(undefined, 'normal');
    doc.text(phase.task, 55, yPos + 8);
    doc.setTextColor(...orange);
    doc.text(phase.status, 145, yPos + 8);
    doc.setTextColor(...darkGray);
    yPos += 14;
  });
  
  // Support services
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Included Support Services', 20, yPos);
  
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const support = [
    '24/7 project portal access',
    'Dedicated project manager',
    'Weekly progress reports',
    'Unlimited revisions during project',
    'Post-project support for 30 days'
  ];
  
  support.forEach(item => {
    doc.text('✓ ' + item, 25, yPos);
    yPos += 6;
  });
}

function generateNextSteps(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('NEXT STEPS', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Immediate actions
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Recommended Immediate Actions', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const actions = [
    {
      step: '1',
      action: 'Schedule Discovery Call',
      detail: 'Book a 30-minute consultation to discuss your specific project requirements',
      timeline: 'This Week'
    },
    {
      step: '2',
      action: 'Project Assessment',
      detail: 'Share project drawings for a detailed feasibility assessment',
      timeline: 'Week 2'
    },
    {
      step: '3',
      action: 'Pilot Project',
      detail: 'Start with a smaller project to demonstrate value and ROI',
      timeline: 'Week 3-4'
    },
    {
      step: '4',
      action: 'Full Implementation',
      detail: 'Scale to full project portfolio based on pilot results',
      timeline: 'Month 2+'
    }
  ];
  
  actions.forEach(action => {
    // Step number in circle
    doc.setFillColor(...orange);
    doc.circle(25, yPos - 2, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text(action.step, 25, yPos, { align: 'center' });
    
    // Action details
    doc.setTextColor(...darkGray);
    doc.setFont(undefined, 'bold');
    doc.text(action.action, 35, yPos);
    doc.setTextColor(...orange);
    doc.setFontSize(9);
    doc.text(action.timeline, 165, yPos, { align: 'right' });
    
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    const detailLines = doc.splitTextToSize(action.detail, 145);
    detailLines.forEach(line => {
      doc.text(line, 35, yPos);
      yPos += 4;
    });
    yPos += 8;
  });
  
  // Contact information
  yPos += 5;
  doc.setFillColor(...lightGray);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Save ' + totalSavings.toLocaleString() + ' ' + currency + '?', 105, yPos + 10, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Contact our team today:', 105, yPos + 18, { align: 'center' });
  
  doc.setTextColor(...orange);
  doc.text('enquiry@bimtakeoff.com | +61 480 373 900', 105, yPos + 26, { align: 'center' });
  doc.text('www.bimtakeoff.com', 105, yPos + 33, { align: 'center' });
  
  // Final CTA
  yPos += 50;
  doc.setFillColor(...green);
  doc.roundedRect(40, yPos, 130, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('BOOK YOUR FREE CONSULTATION', 105, yPos + 10, { align: 'center' });
  
  // Footer
  doc.setTextColor(...gray);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.text('© 2024 BIM Takeoff. All rights reserved.', 105, 280, { align: 'center' });
  doc.text('This report is confidential and prepared specifically for your organization.', 105, 285, { align: 'center' });
}

// ========================================
// POLISH VERSION FUNCTIONS
// ========================================

function generateCoverPagePL(doc, { orange, green, gray, darkGray, lightGray, projectValue, totalSavings, roiPercentage, currency }) {
  // Header background
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 60, 'F');
  
  // Logo placeholder
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 15, 40, 15, 'F');
  doc.setTextColor(...orange);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('BIM TAKEOFF', 35, 24, { align: 'center' });
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('RAPORT ANALIZY ROI', 105, 30, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text('Profesjonalna Wycena Kosztorysowa', 105, 40, { align: 'center' });
  
  // Date
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text(`Wygenerowano: ${new Date().toLocaleDateString('pl-PL')}`, 105, 50, { align: 'center' });
  
  // Main metrics section
  let yPos = 80;
  
  // Project Value Box
  doc.setFillColor(...lightGray);
  doc.roundedRect(20, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('WARTOŚĆ PROJEKTU', 47.5, yPos + 10, { align: 'center' });
  doc.setTextColor(...darkGray);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  const formattedValue = projectValue.toLocaleString('pl-PL') + ' ' + currency;
  doc.text(formattedValue, 47.5, yPos + 22, { align: 'center' });
  
  // Estimated Savings Box
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(77.5, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('SZACOWANE OSZCZĘDNOŚCI', 105, yPos + 10, { align: 'center' });
  doc.setTextColor(...green);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  const formattedSavings = totalSavings.toLocaleString('pl-PL') + ' ' + currency;
  doc.text(formattedSavings, 105, yPos + 22, { align: 'center' });
  
  // ROI Percentage Box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(135, yPos, 55, 35, 3, 3, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text('ZWROT Z INWESTYCJI', 162.5, yPos + 10, { align: 'center' });
  doc.setTextColor(...orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(roiPercentage + '%', 162.5, yPos + 22, { align: 'center' });
  
  // Key benefits section
  yPos = 130;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('KLUCZOWE KORZYŚCI', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(11);
  const benefits = [
    '✓  3-10 dni realizacji vs 6-8 tygodni tradycyjnie',
    '✓  Gwarantowana dokładność ±3-5%',
    '✓  Zgodność z BSR i wymogami prawnymi',
    '✓  20+ lat międzynarodowego doświadczenia',
    '✓  2000+ zrealizowanych projektów globalnie'
  ];
  
  yPos += 10;
  benefits.forEach(benefit => {
    doc.setTextColor(...green);
    doc.text('✓', 25, yPos);
    doc.setTextColor(...darkGray);
    doc.text(benefit.substring(3), 32, yPos);
    yPos += 8;
  });
  
  // Call to action box
  yPos = 200;
  doc.setFillColor(...orange);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('TWOJE POTENCJALNE ROCZNE OSZCZĘDNOŚCI:', 105, yPos + 15, { align: 'center' });
  doc.setFontSize(20);
  const annualSavings = Math.round(totalSavings * 3);
  const formattedAnnual = annualSavings.toLocaleString('pl-PL') + ' ' + currency;
  doc.text(formattedAnnual, 105, yPos + 28, { align: 'center' });
  
  // Footer
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('www.bimtakeoff.com | enquiry@bimtakeoff.com | +61 480 373 900', 105, 280, { align: 'center' });
}

function generateExecutiveSummaryPL(doc, { orange, gray, darkGray, projectValue, totalSavings, roiPercentage, currency, timeline, projectType }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('PODSUMOWANIE WYKONAWCZE', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Project overview
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Przegląd Projektu', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  yPos += 8;
  doc.text(`Typ Projektu: ${projectType}`, 25, yPos);
  yPos += 6;
  const formattedValue = projectValue.toLocaleString('pl-PL') + ' ' + currency;
  doc.text(`Całkowita Wartość Projektu: ${formattedValue}`, 25, yPos);
  yPos += 6;
  doc.text(`Czas Wdrożenia: ${timeline}`, 25, yPos);
  
  // Financial impact
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Analiza Wpływu Finansowego', 20, yPos);
  
  // Create table for financial breakdown
  yPos += 10;
  const tableData = [
    ['Obszar Redukcji Kosztów', 'Metoda Tradycyjna', 'Z BIM Takeoff', 'Oszczędności'],
    ['Czas Wyceny', '6-8 tygodni', '3-10 dni', '75% redukcji'],
    ['Dokładność', '±10-15%', '±3-5%', '67% poprawa'],
    ['Koszty Poprawek', '5-10% budżetu', '<2% budżetu', `${Math.round(projectValue * 0.06).toLocaleString('pl-PL')} ${currency}`],
    ['Zmiany w Projekcie', '15-20% typowo', '5-8% typowo', `${Math.round(projectValue * 0.12).toLocaleString('pl-PL')} ${currency}`]
  ];
  
  // Table header
  const lightGray = [248, 249, 250];
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  
  const colWidths = [50, 35, 35, 50];
  let xPos = 22;
  tableData[0].forEach((header, i) => {
    doc.text(header, xPos, yPos + 5);
    xPos += colWidths[i];
  });
  
  // Table rows
  doc.setFont(undefined, 'normal');
  yPos += 10;
  for (let i = 1; i < tableData.length; i++) {
    xPos = 22;
    tableData[i].forEach((cell, j) => {
      doc.text(cell, xPos, yPos);
      xPos += colWidths[j];
    });
    yPos += 7;
  }
  
  // Strategic advantages
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Przewagi Strategiczne', 20, yPos);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  yPos += 8;
  const advantages = [
    'Szybsze przygotowanie ofert umożliwia więcej przetargów',
    'Wyższa dokładność redukuje wymagane rezerwy',
    'Tworzenie cyfrowego bliźniaka do zarządzania obiektem',
    'Lepsza komunikacja z interesariuszami dzięki wizualizacji 3D',
    'Ograniczenie ryzyka poprzez wykrywanie kolizji'
  ];
  
  advantages.forEach(adv => {
    doc.text('•  ' + adv, 25, yPos);
    yPos += 7;
  });
  
  // Recommendation box
  yPos += 10;
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(20, yPos, 170, 35, 3, 3, 'F');
  doc.setTextColor(...green);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('REKOMENDACJA', 30, yPos + 10);
  doc.setTextColor(...darkGray);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  const recText = `Na podstawie analizy, wdrożenie usług BIM Takeoff przyniesie szacowany ${roiPercentage}% zwrot z inwestycji, ` +
    `oszczędzając około ${totalSavings.toLocaleString('pl-PL')} ${currency} na projekt. Przy Państwa portfolio projektów, ` +
    `przekłada się to na roczne oszczędności ${(totalSavings * 3).toLocaleString('pl-PL')} ${currency} lub więcej.`;
  
  const lines = doc.splitTextToSize(recText, 150);
  yPos += 18;
  lines.forEach(line => {
    doc.text(line, 30, yPos);
    yPos += 5;
  });
}

function generateDetailedBreakdownPL(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('SZCZEGÓŁOWA ANALIZA OSZCZĘDNOŚCI', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Cost comparison chart
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Zestawienie Porównawcze Kosztów', 20, yPos);
  
  yPos += 10;
  
  // Draw comparison bars
  const comparisons = [
    { label: 'Proces Wyceny', traditional: 25000, bimtakeoff: 8000 },
    { label: 'Poprawki i Korekty', traditional: 15000, bimtakeoff: 3000 },
    { label: 'Opóźnienia Projektu', traditional: 30000, bimtakeoff: 5000 },
    { label: 'Koszty Administracyjne', traditional: 12000, bimtakeoff: 4000 },
    { label: 'Kontrola Jakości', traditional: 8000, bimtakeoff: 2000 }
  ];
  
  const maxValue = 35000;
  const barWidth = 160;
  
  comparisons.forEach(comp => {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(comp.label, 20, yPos);
    yPos += 5;
    
    // Traditional bar (gray)
    doc.setFillColor(...gray);
    const tradWidth = (comp.traditional / maxValue) * barWidth;
    doc.rect(20, yPos, tradWidth, 6, 'F');
    
    // BIM Takeoff bar (green)
    yPos += 8;
    doc.setFillColor(...green);
    const bimWidth = (comp.bimtakeoff / maxValue) * barWidth;
    doc.rect(20, yPos, bimWidth, 6, 'F');
    
    // Values
    doc.setTextColor(...darkGray);
    doc.setFontSize(9);
    doc.text(`${comp.traditional.toLocaleString('pl-PL')} ${currency}`, 20 + tradWidth + 2, yPos - 4);
    doc.text(`${comp.bimtakeoff.toLocaleString('pl-PL')} ${currency}`, 20 + bimWidth + 2, yPos + 5);
    
    yPos += 15;
  });
  
  // Legend
  doc.setFillColor(...gray);
  doc.rect(20, yPos, 10, 5, 'F');
  doc.text('Metoda Tradycyjna', 32, yPos + 4);
  doc.setFillColor(...green);
  doc.rect(80, yPos, 10, 5, 'F');
  doc.text('Z BIM Takeoff', 92, yPos + 4);
  
  // Time savings analysis
  yPos += 20;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Analiza Oszczędności Czasu', 20, yPos);
  
  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const timeData = [
    ['Etap', 'Tradycyjnie', 'BIM Takeoff', 'Czas Zaoszczędzony'],
    ['Wstępny Przedmiar', '3 tygodnie', '2 dni', '19 dni'],
    ['Weryfikacja', '2 tygodnie', '1 dzień', '13 dni'],
    ['Poprawki', '1 tydzień', '4 godziny', '6,5 dnia'],
    ['Przegląd Końcowy', '3 dni', '2 godziny', '2,75 dnia']
  ];
  
  // Time savings table
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  
  let xPos = 22;
  const timeColWidths = [40, 35, 35, 60];
  timeData[0].forEach((header, i) => {
    doc.text(header, xPos, yPos + 5);
    xPos += timeColWidths[i];
  });
  
  doc.setFont(undefined, 'normal');
  yPos += 10;
  for (let i = 1; i < timeData.length; i++) {
    xPos = 22;
    timeData[i].forEach((cell, j) => {
      if (j === 3) {
        doc.setTextColor(...green);
      } else {
        doc.setTextColor(...darkGray);
      }
      doc.text(cell, xPos, yPos);
      xPos += timeColWidths[j];
    });
    yPos += 7;
  }
  
  // Bottom summary
  yPos += 10;
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(20, yPos, 170, 25, 3, 3, 'F');
  doc.setTextColor(...orange);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('CAŁKOWITE OSZCZĘDNOŚCI PROJEKTU', 30, yPos + 10);
  doc.setFontSize(14);
  doc.text(`${totalSavings.toLocaleString('pl-PL')} ${currency}`, 30, yPos + 20);
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Równowartość 41,25 dni zaoszczędzonych na projekt', 110, yPos + 15);
}

function generateServiceDeliverablesPL(doc, { orange, gray, darkGray, timeline }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('ZAKRES USŁUG', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Core services
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Główne Komponenty Usługi', 20, yPos);
  
  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const services = [
    {
      title: 'Tworzenie Modelu BIM 3D',
      description: 'Kompletny cyfrowy bliźniak projektu z dokładnością LOD 300-400'
    },
    {
      title: 'Raporty Przedmiarowe',
      description: 'Szczegółowe zestawienia ilościowe w preferowanym formacie (Excel, CostX, Buildsoft)'
    },
    {
      title: 'Analiza Wykrywania Kolizji',
      description: 'Identyfikacja i rozwiązanie konfliktów przed rozpoczęciem budowy'
    },
    {
      title: 'Integracja Kosztów 5D',
      description: 'Śledzenie kosztów w czasie rzeczywistym powiązane z elementami modelu 3D'
    },
    {
      title: 'Zarządzanie Zmianami',
      description: 'Śledzenie i kwantyfikacja wszystkich zmian projektowych z implikacjami kosztowymi'
    }
  ];
  
  services.forEach(service => {
    doc.setFont(undefined, 'bold');
    doc.text('• ' + service.title, 25, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    const descLines = doc.splitTextToSize(service.description, 160);
    descLines.forEach(line => {
      doc.text(line, 30, yPos);
      yPos += 5;
    });
    yPos += 3;
  });
  
  // Implementation timeline
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Harmonogram Wdrożenia: ' + timeline, 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Timeline phases
  const phases = [
    { week: 'Tydzień 1-2', task: 'Wstępna konfiguracja i tworzenie modelu', status: 'Szybki Start' },
    { week: 'Tydzień 3-4', task: 'Ekstrakcja ilości i weryfikacja', status: 'Główna Dostawa' },
    { week: 'Tydzień 5-6', task: 'Kontrola jakości i raportowanie', status: 'Przegląd Końcowy' },
    { week: 'Na bieżąco', task: 'Zarządzanie zmianami i aktualizacje', status: 'Ciągłe Wsparcie' }
  ];
  
  phases.forEach(phase => {
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 12, 'F');
    doc.setFont(undefined, 'bold');
    doc.text(phase.week, 25, yPos + 8);
    doc.setFont(undefined, 'normal');
    doc.text(phase.task, 55, yPos + 8);
    doc.setTextColor(...orange);
    doc.text(phase.status, 145, yPos + 8);
    doc.setTextColor(...darkGray);
    yPos += 14;
  });
  
  // Support services
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Zawarte Usługi Wsparcia', 20, yPos);
  
  yPos += 8;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const support = [
    'Dostęp do portalu projektu 24/7',
    'Dedykowany kierownik projektu',
    'Tygodniowe raporty postępu',
    'Nieograniczone poprawki podczas projektu',
    'Wsparcie po zakończeniu projektu przez 30 dni'
  ];
  
  support.forEach(item => {
    doc.text('✓ ' + item, 25, yPos);
    yPos += 6;
  });
}

function generateNextStepsPL(doc, { orange, green, gray, darkGray, lightGray, totalSavings, currency }) {
  // Page header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('NASTĘPNE KROKI', 105, 13, { align: 'center' });
  
  let yPos = 35;
  
  // Immediate actions
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Zalecane Działania Natychmiastowe', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const actions = [
    {
      step: '1',
      action: 'Umów Rozmowę Odkrywczą',
      detail: 'Zarezerwuj 30-minutową konsultację, aby omówić konkretne wymagania projektu',
      timeline: 'Ten Tydzień'
    },
    {
      step: '2',
      action: 'Ocena Projektu',
      detail: 'Udostępnij rysunki projektowe do szczegółowej oceny wykonalności',
      timeline: 'Tydzień 2'
    },
    {
      step: '3',
      action: 'Projekt Pilotażowy',
      detail: 'Rozpocznij od mniejszego projektu, aby zademonstrować wartość i ROI',
      timeline: 'Tydzień 3-4'
    },
    {
      step: '4',
      action: 'Pełne Wdrożenie',
      detail: 'Skaluj do pełnego portfolio projektów na podstawie wyników pilotażu',
      timeline: 'Miesiąc 2+'
    }
  ];
  
  actions.forEach(action => {
    // Step number in circle
    doc.setFillColor(...orange);
    doc.circle(25, yPos - 2, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text(action.step, 25, yPos, { align: 'center' });
    
    // Action details
    doc.setTextColor(...darkGray);
    doc.setFont(undefined, 'bold');
    doc.text(action.action, 35, yPos);
    doc.setTextColor(...orange);
    doc.setFontSize(9);
    doc.text(action.timeline, 165, yPos, { align: 'right' });
    
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    const detailLines = doc.splitTextToSize(action.detail, 145);
    detailLines.forEach(line => {
      doc.text(line, 35, yPos);
      yPos += 4;
    });
    yPos += 8;
  });
  
  // Contact information
  yPos += 5;
  doc.setFillColor(...lightGray);
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Gotowy zaoszczędzić ' + totalSavings.toLocaleString('pl-PL') + ' ' + currency + '?', 105, yPos + 10, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Skontaktuj się z naszym zespołem już dziś:', 105, yPos + 18, { align: 'center' });
  
  doc.setTextColor(...orange);
  doc.text('enquiry@bimtakeoff.com | +61 480 373 900', 105, yPos + 26, { align: 'center' });
  doc.text('www.bimtakeoff.com/pl', 105, yPos + 33, { align: 'center' });
  
  // Final CTA
  yPos += 50;
  doc.setFillColor(...green);
  doc.roundedRect(40, yPos, 130, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('ZAREZERWUJ BEZPŁATNĄ KONSULTACJĘ', 105, yPos + 10, { align: 'center' });
  
  // Footer
  doc.setTextColor(...gray);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.text('© 2024 BIM Takeoff. Wszelkie prawa zastrzeżone.', 105, 280, { align: 'center' });
  doc.text('Raport jest poufny i przygotowany specjalnie dla Państwa organizacji.', 105, 285, { align: 'center' });
}

// Make functions available globally
window.manuallyGeneratePDF = generatePDFReport;

console.log('💡 ROI Calculator Thank You page JavaScript loaded');