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

  // Add BIM Takeoff logo (centered) - SVG version for better quality
  const logoSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="78cf68e775"><path d="M 84 145.988281 L 181.039062 145.988281 L 181.039062 188 L 84 188 Z M 84 145.988281 " clip-rule="nonzero"/></clipPath><clipPath id="3126038832"><path d="M 74.539062 187 L 172 187 L 172 229 L 74.539062 229 Z M 74.539062 187 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#78cf68e775)"><path fill="#ffffff" d="M 84.457031 187.492188 L 100.488281 187.492188 L 113.113281 171.527344 L 97.082031 171.527344 Z M 165.28125 145.984375 L 131.730469 187.492188 L 147.761719 187.492188 L 181.3125 145.984375 Z M 133.15625 156.414062 L 108.09375 187.492188 L 124.125 187.492188 L 149.1875 156.414062 L 133.15625 156.414062 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#3126038832)"><path fill="#ffffff" d="M 171.398438 187.492188 L 155.367188 187.492188 L 142.742188 203.457031 L 158.777344 203.457031 Z M 90.574219 229 L 124.125 187.492188 L 108.09375 187.492188 L 74.542969 229 Z M 122.699219 218.570312 L 147.761719 187.492188 L 131.730469 187.492188 L 106.667969 218.570312 L 122.699219 218.570312 " fill-opacity="1" fill-rule="nonzero"/></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(179.820446, 186.428162)"><g><path d="M 3.546875 -34.171875 L 19.15625 -34.171875 C 22.738281 -34.171875 25.488281 -33.40625 27.40625 -31.875 C 29.289062 -30.300781 30.234375 -28.203125 30.234375 -25.578125 C 30.234375 -23.953125 29.785156 -22.5 28.890625 -21.21875 C 27.992188 -19.90625 26.8125 -18.960938 25.34375 -18.390625 C 27.320312 -17.898438 28.890625 -16.9375 30.046875 -15.5 C 31.203125 -14.0625 31.78125 -12.253906 31.78125 -10.078125 C 31.78125 -7.066406 30.785156 -4.632812 28.796875 -2.78125 C 26.785156 -0.925781 24.175781 0 20.96875 0 L 3.546875 0 Z M 9.40625 -29.328125 L 9.40625 -19.921875 L 17.5625 -19.921875 C 19.875 -19.921875 21.570312 -20.289062 22.65625 -21.03125 C 23.738281 -21.726562 24.28125 -22.925781 24.28125 -24.625 C 24.28125 -26.539062 23.722656 -27.804688 22.609375 -28.421875 C 21.453125 -29.023438 19.835938 -29.328125 17.765625 -29.328125 Z M 9.40625 -15.59375 L 9.40625 -4.890625 L 18.390625 -4.890625 C 20.691406 -4.890625 22.5 -5.273438 23.8125 -6.046875 C 25.125 -6.816406 25.78125 -8.207031 25.78125 -10.21875 C 25.78125 -11.34375 25.585938 -12.289062 25.203125 -13.0625 C 24.785156 -13.789062 24.207031 -14.332031 23.46875 -14.6875 C 22.695312 -15.039062 21.914062 -15.28125 21.125 -15.40625 C 20.320312 -15.53125 19.375 -15.59375 18.28125 -15.59375 Z M 9.40625 -15.59375 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(212.652388, 186.428162)"><g><path d="M 9.703125 -34.171875 L 9.703125 0 L 3.640625 0 L 3.640625 -34.171875 Z M 9.703125 -34.171875 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(225.036371, 186.428162)"><g><path d="M 39.125 -34.171875 L 39.125 0 L 33.40625 0 L 33.40625 -26.359375 L 23.90625 0 L 19.015625 0 L 9.265625 -26.359375 L 9.265625 0 L 3.59375 0 L 3.59375 -34.171875 L 12 -34.171875 L 21.546875 -7.4375 L 30.765625 -34.171875 Z M 39.125 -34.171875 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(181.320446, 213.35688)"><g><path d="M 14.65625 -17.796875 L 14.65625 -15.09375 L 8.96875 -15.09375 L 8.96875 0 L 5.84375 0 L 5.84375 -15.09375 L 0.171875 -15.09375 L 0.171875 -17.796875 Z M 14.65625 -17.796875 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(195.643085, 213.35688)"><g><path d="M 1.375 -8.921875 C 1.675781 -11.835938 3.5625 -13.296875 7.03125 -13.296875 C 8.644531 -13.296875 9.9375 -12.976562 10.90625 -12.34375 C 11.851562 -11.71875 12.328125 -10.738281 12.328125 -9.40625 L 12.328125 -2.84375 C 12.328125 -2.476562 12.375 -2.226562 12.46875 -2.09375 C 12.550781 -1.96875 12.726562 -1.90625 13 -1.90625 C 13.195312 -1.90625 13.414062 -1.921875 13.65625 -1.953125 L 13.65625 0.046875 C 12.914062 0.234375 12.296875 0.328125 11.796875 0.328125 C 10.578125 0.328125 9.878906 -0.1875 9.703125 -1.21875 C 8.617188 -0.1875 7.109375 0.328125 5.171875 0.328125 C 3.835938 0.328125 2.78125 -0.0195312 2 -0.71875 C 1.21875 -1.40625 0.828125 -2.34375 0.828125 -3.53125 C 0.828125 -3.894531 0.867188 -4.234375 0.953125 -4.546875 C 1.035156 -4.867188 1.132812 -5.144531 1.25 -5.375 C 1.351562 -5.601562 1.53125 -5.820312 1.78125 -6.03125 C 2.007812 -6.226562 2.207031 -6.394531 2.375 -6.53125 C 2.519531 -6.65625 2.78125 -6.78125 3.15625 -6.90625 C 3.5 -7.019531 3.765625 -7.109375 3.953125 -7.171875 C 4.117188 -7.222656 4.414062 -7.28125 4.84375 -7.34375 C 5.28125 -7.414062 5.570312 -7.46875 5.71875 -7.5 C 5.851562 -7.519531 6.144531 -7.550781 6.59375 -7.59375 C 7.613281 -7.726562 8.304688 -7.847656 8.671875 -7.953125 C 9.035156 -8.035156 9.285156 -8.164062 9.421875 -8.34375 C 9.535156 -8.476562 9.59375 -8.789062 9.59375 -9.28125 C 9.59375 -10.570312 8.710938 -11.21875 6.953125 -11.21875 C 6.015625 -11.21875 5.332031 -11.046875 4.90625 -10.703125 C 4.46875 -10.347656 4.191406 -9.753906 4.078125 -8.921875 Z M 9.578125 -6.46875 C 9.359375 -6.351562 9.109375 -6.253906 8.828125 -6.171875 C 8.546875 -6.078125 8.320312 -6.019531 8.15625 -6 C 7.96875 -5.96875 7.691406 -5.925781 7.328125 -5.875 C 6.941406 -5.820312 6.691406 -5.789062 6.578125 -5.78125 C 6.222656 -5.726562 5.945312 -5.6875 5.75 -5.65625 C 5.550781 -5.601562 5.3125 -5.523438 5.03125 -5.421875 C 4.726562 -5.328125 4.5 -5.210938 4.34375 -5.078125 C 4.175781 -4.921875 4.035156 -4.726562 3.921875 -4.5 C 3.804688 -4.25 3.75 -3.957031 3.75 -3.625 C 3.75 -3.007812 3.957031 -2.535156 4.375 -2.203125 C 4.769531 -1.867188 5.335938 -1.703125 6.078125 -1.703125 C 7.335938 -1.703125 8.3125 -2.039062 9 -2.71875 C 9.382812 -3.101562 9.578125 -3.847656 9.578125 -4.953125 Z M 9.578125 -6.46875 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(209.04087, 213.35688)"><g><path d="M 12.953125 -12.90625 L 8 -8.171875 L 13.40625 0 L 9.921875 0 L 6 -6.21875 L 4.296875 -4.625 L 4.296875 0 L 1.53125 0 L 1.53125 -17.796875 L 4.296875 -17.796875 L 4.296875 -7.78125 L 9.453125 -12.90625 Z M 12.953125 -12.90625 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(221.963735, 213.35688)"><g><path d="M 13.046875 -4.03125 C 12.734375 -2.625 12.050781 -1.53125 11 -0.75 C 9.9375 0.03125 8.671875 0.421875 7.203125 0.421875 C 5.253906 0.421875 3.710938 -0.207031 2.578125 -1.46875 C 1.421875 -2.71875 0.84375 -4.328125 0.84375 -6.296875 C 0.84375 -8.316406 1.4375 -9.984375 2.625 -11.296875 C 3.789062 -12.617188 5.28125 -13.28125 7.09375 -13.28125 C 8.976562 -13.28125 10.472656 -12.632812 11.578125 -11.34375 C 12.671875 -10.050781 13.21875 -8.285156 13.21875 -6.046875 L 13.21875 -5.75 L 3.703125 -5.75 C 3.734375 -4.445312 4.054688 -3.445312 4.671875 -2.75 C 5.285156 -2.03125 6.144531 -1.671875 7.25 -1.671875 C 8.03125 -1.671875 8.671875 -1.863281 9.171875 -2.25 C 9.660156 -2.613281 10.046875 -3.207031 10.328125 -4.03125 Z M 10.375 -7.65625 C 10.289062 -8.738281 9.957031 -9.59375 9.375 -10.21875 C 8.769531 -10.84375 8.003906 -11.15625 7.078125 -11.15625 C 6.140625 -11.15625 5.390625 -10.851562 4.828125 -10.25 C 4.242188 -9.644531 3.882812 -8.78125 3.75 -7.65625 Z M 10.375 -7.65625 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(235.361521, 213.35688)"><g><path d="M 7.46875 -13.28125 C 9.4375 -13.28125 11.003906 -12.660156 12.171875 -11.421875 C 13.335938 -10.191406 13.921875 -8.535156 13.921875 -6.453125 C 13.921875 -4.347656 13.347656 -2.679688 12.203125 -1.453125 C 11.035156 -0.210938 9.457031 0.40625 7.46875 0.40625 C 5.457031 0.40625 3.859375 -0.210938 2.671875 -1.453125 C 1.492188 -2.679688 0.90625 -4.347656 0.90625 -6.453125 C 0.90625 -8.535156 1.503906 -10.191406 2.703125 -11.421875 C 3.878906 -12.660156 5.46875 -13.28125 7.46875 -13.28125 Z M 7.421875 -11.03125 C 6.285156 -11.03125 5.394531 -10.617188 4.75 -9.796875 C 4.101562 -8.984375 3.78125 -7.867188 3.78125 -6.453125 C 3.78125 -5.003906 4.101562 -3.867188 4.75 -3.046875 C 5.394531 -2.234375 6.296875 -1.828125 7.453125 -1.828125 C 8.566406 -1.828125 9.445312 -2.242188 10.09375 -3.078125 C 10.726562 -3.890625 11.046875 -5.019531 11.046875 -6.46875 C 11.046875 -7.882812 10.726562 -9.003906 10.09375 -9.828125 C 9.445312 -10.628906 8.554688 -11.03125 7.421875 -11.03125 Z M 7.421875 -11.03125 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(249.684161, 213.35688)"><g><path d="M 7.90625 -17.828125 L 7.90625 -15.625 C 7.351562 -15.675781 6.9375 -15.703125 6.65625 -15.703125 C 6.070312 -15.703125 5.675781 -15.601562 5.46875 -15.40625 C 5.269531 -15.1875 5.171875 -14.769531 5.171875 -14.15625 L 5.171875 -12.90625 L 7.625 -12.90625 L 7.625 -10.828125 L 5.203125 -10.828125 L 5.203125 0 L 2.375 0 L 2.375 -10.828125 L 0.25 -10.828125 L 0.25 -12.90625 L 2.375 -12.90625 L 2.375 -13.921875 C 2.375 -15.273438 2.664062 -16.273438 3.25 -16.921875 C 3.832031 -17.578125 4.816406 -17.90625 6.203125 -17.90625 C 6.765625 -17.90625 7.332031 -17.878906 7.90625 -17.828125 Z M 7.90625 -17.828125 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(257.057904, 213.35688)"><g><path d="M 7.90625 -17.828125 L 7.90625 -15.625 C 7.351562 -15.675781 6.9375 -15.703125 6.65625 -15.703125 C 6.070312 -15.703125 5.675781 -15.601562 5.46875 -15.40625 C 5.269531 -15.1875 5.171875 -14.769531 5.171875 -14.15625 L 5.171875 -12.90625 L 7.625 -12.90625 L 7.625 -10.828125 L 5.203125 -10.828125 L 5.203125 0 L 2.375 0 L 2.375 -10.828125 L 0.25 -10.828125 L 0.25 -12.90625 L 2.375 -12.90625 L 2.375 -13.921875 C 2.375 -15.273438 2.664062 -16.273438 3.25 -16.921875 C 3.832031 -17.578125 4.816406 -17.90625 6.203125 -17.90625 C 6.765625 -17.90625 7.332031 -17.878906 7.90625 -17.828125 Z M 7.90625 -17.828125 "/></g></g></g></svg>';
  const logoWidth = 50;
  const logoHeight = 14;
  const pageWidth = 210;
  const logoX = (pageWidth - logoWidth) / 2;
  doc.addSvgAsImage(logoSVG, logoX, 58, logoWidth, logoHeight);

  let yPos = 80;
  
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
