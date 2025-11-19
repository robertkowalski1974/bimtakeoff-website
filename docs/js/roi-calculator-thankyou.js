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
  
  // Colors
  const orange = [255, 153, 0];
  const green = [16, 185, 129];
  const gray = [107, 114, 128];
  const darkGray = [44, 44, 44];
  
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
  doc.setFillColor(248, 249, 250);
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
  
  // Contact info
  yPos = 250;
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont(undefined, 'normal');
  doc.text('Contact: info@bimtakeoff.com | +44 (0) 20 3239 9967', 105, yPos, { align: 'center' });
  doc.text('www.bimtakeoff.com', 105, yPos + 7, { align: 'center' });
  
  const fileName = 'BIM-Takeoff-ROI-Report-' + currency + '-' + Date.now() + '.pdf';
  doc.save(fileName);
  
  console.log('✅ PDF generated:', fileName);
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
