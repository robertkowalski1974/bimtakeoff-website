// ROI Calculator Thank You Page - PDF Generation
// ENHANCED VERSION with proper Unicode support and professional design
// Version: 2.0 - November 19, 2025

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎉 Thank you page DOMContentLoaded fired - Enhanced PDF v2.0');

  // Get elements
  const loadingState = document.getElementById('loading-state');
  const successState = document.getElementById('success-state');
  const errorState = document.getElementById('error-state');
  const manualDownloadBtn = document.getElementById('manual-download-btn');
  const savingsSummary = document.getElementById('savings-summary');

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
    // Populate the savings summary
    if (savingsSummary) {
      const currency = calculatorData.currency || 'PLN';
      const isPolish = window.location.pathname.includes('/pl/');

      savingsSummary.innerHTML = `
        <h2 style="color: #FF9900; font-size: 1.8rem; margin: 0 0 16px 0;">
          ${isPolish ? 'Twoje Oszczędności' : 'Your Savings'}
        </h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div style="text-align: center;">
            <p style="color: #6B7280; font-size: 0.9rem; margin: 0 0 8px 0;">
              ${isPolish ? 'Wartość Projektu' : 'Project Value'}
            </p>
            <p style="color: #2C2C2C; font-size: 1.5rem; font-weight: 700; margin: 0;">
              ${Math.round(calculatorData.projectValue).toLocaleString(isPolish ? 'pl-PL' : 'en-US')} ${currency}
            </p>
          </div>
          <div style="text-align: center;">
            <p style="color: #6B7280; font-size: 0.9rem; margin: 0 0 8px 0;">
              ${isPolish ? 'Oszczędności' : 'Savings'}
            </p>
            <p style="color: #10B981; font-size: 1.5rem; font-weight: 700; margin: 0;">
              ${Math.round(calculatorData.savings).toLocaleString(isPolish ? 'pl-PL' : 'en-US')} ${currency}
            </p>
          </div>
        </div>
        <div style="text-align: center; background: #F5F5F5; padding: 16px; border-radius: 8px;">
          <p style="color: #6B7280; font-size: 0.9rem; margin: 0 0 8px 0;">
            ${isPolish ? 'Zwrot z Inwestycji' : 'Return on Investment'}
          </p>
          <p style="color: #FF9900; font-size: 2rem; font-weight: 700; margin: 0;">
            ${Math.round(calculatorData.roi)}%
          </p>
        </div>
      `;
    }

    // Hide loading, show success
    if (loadingState) loadingState.style.display = 'none';
    if (successState) successState.style.display = 'block';
    if (errorState) errorState.style.display = 'none';

    // Auto-generate PDF after a delay
    setTimeout(() => {
      console.log('⏰ Auto-generating PDF after 1.5 second delay...');
      attemptPDFGeneration();
    }, 1500);
  } else {
    // Show error if no data
    console.error('❌ No calculator data available to display');
    if (loadingState) loadingState.style.display = 'none';
    if (successState) successState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
  }
});

// Attempt to auto-generate PDF with better error handling
function attemptPDFGeneration() {
  console.log('🎯 attemptPDFGeneration() called');
  
  const calculatorData = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  
  if (!calculatorData || !calculatorData.projectValue) {
    console.warn('⚠️ No valid calculator data, skipping auto-generation');
    return;
  }
  
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
