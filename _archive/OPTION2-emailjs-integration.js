// ROI Calculator - EmailJS Integration
// FREE email sending using EmailJS service
// Signup: https://www.emailjs.com/ (Free tier: 200 emails/month)

// ============================================================================
// SETUP INSTRUCTIONS
// ============================================================================
// 1. Go to https://www.emailjs.com/
// 2. Sign up (free)
// 3. Create email service (Gmail, Outlook, etc.)
// 4. Create email template with these variables:
//    {{to_email}}, {{from_name}}, {{company}}, {{report_content}}
// 5. Get your PUBLIC KEY, SERVICE ID, TEMPLATE ID
// 6. Replace the values below

// ============================================================================
// CONFIGURATION (Replace with your EmailJS credentials)
// ============================================================================
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',      // Get from EmailJS dashboard
  serviceId: 'YOUR_SERVICE_ID_HERE',      // Your email service ID
  templateId: 'YOUR_TEMPLATE_ID_HERE'     // Your template ID
};

// ============================================================================
// LOAD EMAILJS LIBRARY
// ============================================================================
// Add this to your HTML <head> section in roi-calculator.qmd:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// ============================================================================
// INITIALIZE EMAILJS (Add to DOMContentLoaded)
// ============================================================================
// Add this line in initializeElements() function:
emailjs.init(EMAILJS_CONFIG.publicKey);

// ============================================================================
// REPLACE handleLeadSubmission FUNCTION
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
    source: 'ROI Calculator'
  };
  
  // Generate report content
  const reportContent = generateReportContent(leadData);
  
  // Prepare email parameters
  const emailParams = {
    to_email: leadData.email,
    from_name: leadData.name,
    company: leadData.company || 'N/A',
    phone: leadData.phone || 'N/A',
    project_timeline: leadData.timeline || 'Not specified',
    report_content: reportContent
  };
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    emailParams
  )
  .then(function(response) {
    console.log('Email sent successfully!', response);
    
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
    
    // Reset form
    leadForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  })
  .catch(function(error) {
    console.error('Email send failed:', error);
    alert('Sorry, there was an error sending your report. Please try again or contact us directly at info@bimtakeoff.com');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// ============================================================================
// BENEFITS
// ============================================================================
// ✅ FREE (200 emails/month)
// ✅ REAL email delivery
// ✅ Professional email templates
// ✅ No backend code needed
// ✅ Works on GitHub Pages
// ✅ 5-minute setup

// ============================================================================
// EXAMPLE EMAIL TEMPLATE (Create in EmailJS dashboard)
// ============================================================================
/*
Subject: Your BIM Takeoff ROI Analysis Report

Hi {{from_name}},

Thank you for using our ROI Calculator! Here's your personalized analysis:

Company: {{company}}
Phone: {{phone}}
Project Timeline: {{project_timeline}}

──────────────────────────────────────────
YOUR ROI ANALYSIS REPORT
──────────────────────────────────────────

{{report_content}}

──────────────────────────────────────────
NEXT STEPS
──────────────────────────────────────────

Ready to discuss your project? Reply to this email or call us at:
📞 +44 (0) 20 3239 9967
📧 info@bimtakeoff.com

Best regards,
BIM Takeoff Team
Professional BIM 5D Cost Estimation Services
*/
