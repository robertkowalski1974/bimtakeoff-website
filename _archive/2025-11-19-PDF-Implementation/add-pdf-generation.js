// ADD THIS CODE TO roi-calculator.js
// Replace the existing getReportBtn.addEventListener code (around line 223-240)
// with this enhanced version that generates PDF immediately:

const getReportBtn = document.getElementById('get-report-btn');
if (getReportBtn) {
  getReportBtn.addEventListener('click', function() {
    // ⚡ GENERATE PDF IMMEDIATELY when button is clicked!
    if (calculatedResults && typeof generatePDFReport === 'function') {
      try {
        generatePDFReport({
          name: 'Valued Client', // Generic name since we don't have it yet
          email: '' // User will provide via Pipedrive form
        });
        console.log('✅ PDF Report generated and downloaded');
      } catch (error) {
        console.error('❌ PDF generation failed:', error);
      }
    } else {
      console.warn('⚠️ PDF generator not available or no calculation results');
    }
    
    // Show Pipedrive form modal
    leadModal.style.display = 'flex';
    
    // Pre-fill Pipedrive form with calculator data
    prefillPipedriveForm();
    
    // Track modal open
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        'event': 'lead_modal_opened',
        'calculator_completed': true,
        'project_value': calculatedResults.inputs.projectValue,
        'currency': currentCurrency,
        'pdf_generated': true
      });
    }
  });
}
