// INSTANT REPORT SOLUTION - No Email Required
// Add this to your roi-calculator.js file

/**
 * Generate and display instant report after form submission
 * This replaces the thank you modal with a full report
 */
function showInstantReport(leadData) {
  const reportContainer = document.getElementById('thankyou-modal');
  
  if (!reportContainer || !calculatedResults) {
    console.error('Cannot display report - missing data');
    return;
  }
  
  // Calculate all values
  const projectValue = calculatedResults.inputs.projectValue;
  const totalSavings = Math.round(calculatedResults.totalSavings);
  const roiPercentage = Math.round(calculatedResults.roi);
  const yearlySavings = Math.round(totalSavings / 3); // Assuming 3 year project
  
  // Generate comprehensive report HTML
  const reportHTML = `
    <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
      <span class="close-modal" onclick="this.closest('.modal').style.display='none'">&times;</span>
      
      <!-- Report Header -->
      <div style="background: linear-gradient(135deg, #FF9900 0%, #FF7700 100%); color: white; padding: 30px; margin: -30px -30px 30px -30px; text-align: center;">
        <h2 style="margin: 0; font-size: 28px;">Your Personalized ROI Report</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">BIM Takeoff Cost Optimization Analysis</p>
      </div>
      
      <!-- Key Metrics -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase;">Project Value</p>
          <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: bold; color: #2C2C2C;">
            ${formatCurrency(projectValue, currentCurrency)}
          </p>
        </div>
        <div style="text-align: center; padding: 20px; background: #f0fdf4; border-radius: 8px;">
          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase;">Total Savings</p>
          <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: bold; color: #10B981;">
            ${formatCurrency(totalSavings, currentCurrency)}
          </p>
        </div>
        <div style="text-align: center; padding: 20px; background: #fff7ed; border-radius: 8px;">
          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase;">ROI</p>
          <p style="margin: 8px 0 0 0; font-size: 32px; font-weight: bold; color: #FF9900;">
            ${roiPercentage}%
          </p>
        </div>
      </div>
      
      <!-- Detailed Breakdown -->
      <h3 style="color: #2C2C2C; margin-top: 30px;">📊 Detailed Cost Breakdown</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr style="background: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #e5e5e5;"><strong>Cost Category</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;"><strong>Traditional Method</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;"><strong>With BIM Takeoff</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;"><strong>Savings</strong></td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e5e5;">Estimation Errors (5%)</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.05, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.005, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;">${formatCurrency(projectValue * 0.045, currentCurrency)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e5e5;">Material Waste (3%)</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.03, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.01, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;">${formatCurrency(projectValue * 0.02, currentCurrency)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e5e5;">Rework Costs (4%)</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.04, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.01, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;">${formatCurrency(projectValue * 0.03, currentCurrency)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e5e5;">Time Delays (2%)</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.02, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(0, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;">${formatCurrency(projectValue * 0.02, currentCurrency)}</td>
        </tr>
        <tr style="background: #f8f9fa; font-weight: bold;">
          <td style="padding: 12px; border: 1px solid #e5e5e5;">Total</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.14, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right;">${formatCurrency(projectValue * 0.025, currentCurrency)}</td>
          <td style="padding: 12px; border: 1px solid #e5e5e5; text-align: right; color: #10B981;">${formatCurrency(totalSavings, currentCurrency)}</td>
        </tr>
      </table>
      
      <!-- Timeline -->
      <h3 style="color: #2C2C2C;">⏱️ Implementation Timeline</h3>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <div style="display: grid; grid-template-columns: auto 1fr; gap: 15px;">
          <span style="background: #FF9900; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
          <div>
            <strong>Days 1-3: Initial Assessment</strong>
            <p style="margin: 5px 0 0 0; color: #6B7280;">We analyze your project documentation and create preliminary quantity schedules</p>
          </div>
          <span style="background: #FF9900; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
          <div>
            <strong>Days 4-5: Detailed Estimation</strong>
            <p style="margin: 5px 0 0 0; color: #6B7280;">BIM 5D modeling extracts accurate quantities and applies current market rates</p>
          </div>
          <span style="background: #FF9900; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
          <div>
            <strong>Day 6: Review & Delivery</strong>
            <p style="margin: 5px 0 0 0; color: #6B7280;">Final review, value engineering recommendations, and comprehensive report delivery</p>
          </div>
        </div>
      </div>
      
      <!-- Value Propositions -->
      <h3 style="color: #2C2C2C;">✅ What You Get With BIM Takeoff</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div>
          <h4 style="color: #FF9900; margin-bottom: 10px;">Accuracy & Speed</h4>
          <ul style="color: #6B7280; line-height: 1.8;">
            <li>±5% accuracy (vs. ±15-20% traditional)</li>
            <li>3-day turnaround (vs. 6-8 weeks)</li>
            <li>Automated clash detection</li>
            <li>Real-time cost updates</li>
          </ul>
        </div>
        <div>
          <h4 style="color: #FF9900; margin-bottom: 10px;">Risk Mitigation</h4>
          <ul style="color: #6B7280; line-height: 1.8;">
            <li>Identify scope gaps before tender</li>
            <li>Catch design inconsistencies</li>
            <li>Prevent material over-ordering</li>
            <li>Avoid costly variations</li>
          </ul>
        </div>
      </div>
      
      <!-- Next Steps CTA -->
      <div style="background: #FEF3C7; border: 2px solid #FCD34D; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
        <h3 style="margin-top: 0; color: #92400E;">🚀 Ready to Save ${formatCurrency(totalSavings, currentCurrency)}?</h3>
        <p style="color: #92400E; margin: 15px 0;">Get started with a free consultation and sample estimate</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <button onclick="window.open('https://calendly.com/bimtakeoff/consultation', '_blank')" 
                  style="background: #FF9900; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;">
            Schedule Free Consultation
          </button>
          <button onclick="downloadReport()" 
                  style="background: white; color: #FF9900; border: 2px solid #FF9900; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;">
            Download This Report
          </button>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e5e5; margin-top: 30px;">
        <p style="color: #6B7280; margin: 0;">
          Questions? Contact Robert Kowalski<br>
          📧 robert@bimtakeoff.com | 📱 WhatsApp: [Your Number]<br>
          🌐 www.bimtakeoff.com
        </p>
      </div>
    </div>
  `;
  
  // Replace modal content
  reportContainer.innerHTML = reportHTML;
  reportContainer.style.display = 'flex';
  
  // Log success
  console.log('Instant report displayed for:', leadData.email);
  
  // Track in analytics
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'report_displayed',
      'report_type': 'instant',
      'project_value': projectValue,
      'estimated_savings': totalSavings,
      'roi': roiPercentage
    });
  }
}

/**
 * Download report as HTML file
 */
function downloadReport() {
  if (!calculatedResults) {
    alert('No report data available');
    return;
  }
  
  // Get the report content
  const reportContent = document.querySelector('#thankyou-modal .modal-content');
  if (!reportContent) {
    alert('Report not found');
    return;
  }
  
  // Create full HTML document
  const fullHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BIM Takeoff ROI Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 12px; border: 1px solid #e5e5e5; }
        @media print {
            button { display: none; }
        }
    </style>
</head>
<body>
    ${reportContent.innerHTML}
</body>
</html>
  `;
  
  // Create download
  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `BIM-Takeoff-ROI-Report-${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('Report downloaded');
}

/**
 * Update the form submission to show instant report
 * Find the line where thankyou-modal is displayed and replace with:
 */
// Instead of just showing thank you:
// document.getElementById('thankyou-modal').style.display = 'flex';

// Show the detailed report:
showInstantReport({
  name: formData.get('name'),
  email: formData.get('email'),
  company: formData.get('company')
});

// ============================================================================
// IMPLEMENTATION INSTRUCTIONS:
// 1. Copy this entire code to the END of roi-calculator.js
// 2. Find where the form submission shows thankyou-modal (around line 280)
// 3. Replace with showInstantReport() call
// 4. Test: Fill calculator → Submit form → See instant report!
// ============================================================================