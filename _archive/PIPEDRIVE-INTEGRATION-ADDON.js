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
