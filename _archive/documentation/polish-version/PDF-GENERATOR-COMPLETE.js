// PDF REPORT GENERATOR - Complete Solution
// This generates a professional PDF report directly in the browser
// No backend needed, works immediately!

// ============================================================================
// STEP 1: Add this library to your roi-calculator.qmd file
// Add this in the YAML header or before your calculator div:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// ============================================================================

/**
 * Generate and download PDF report with calculator results
 * Called after Pipedrive form submission
 */
function generatePDFReport(leadData) {
  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Get calculator data
  const projectValue = calculatedResults.inputs.projectValue;
  const totalSavings = Math.round(calculatedResults.totalSavings);
  const roiPercentage = Math.round(calculatedResults.roi);
  const projectType = calculatedResults.inputs.projectType;
  
  // Color scheme
  const orange = [255, 153, 0];
  const green = [16, 185, 129];
  const gray = [107, 114, 128];
  const darkGray = [44, 44, 44];
  
  // ============================================================================
  // PAGE 1: COVER & SUMMARY
  // ============================================================================
  
  // Header background
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('ROI ANALYSIS REPORT', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('BIM Takeoff - Construction Cost Optimization', 105, 30, { align: 'center' });
  
  // Date
  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 50, { align: 'center' });
  
  // Main metrics boxes
  let yPos = 70;
  
  // Project Value Box
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.text('PROJECT VALUE', 47.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(projectValue, currentCurrency), 47.5, yPos + 20, { align: 'center' });
  
  // Estimated Savings Box
  doc.setFillColor(240, 253, 244);
  doc.rect(77.5, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('ESTIMATED SAVINGS', 105, yPos + 8, { align: 'center' });
  doc.setTextColor(...green);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(formatCurrency(totalSavings, currentCurrency), 105, yPos + 20, { align: 'center' });
  
  // ROI Box
  doc.setFillColor(255, 247, 237);
  doc.rect(135, yPos, 55, 30, 'F');
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('RETURN ON INVESTMENT', 162.5, yPos + 8, { align: 'center' });
  doc.setTextColor(...orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(`${roiPercentage}%`, 162.5, yPos + 20, { align: 'center' });
  
  // Detailed Breakdown Section
  yPos = 110;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Cost Breakdown Analysis', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Table header
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.text('Cost Category', 25, yPos + 5);
  doc.text('Traditional Method', 90, yPos + 5, { align: 'right' });
  doc.text('With BIM Takeoff', 130, yPos + 5, { align: 'right' });
  doc.text('Savings', 170, yPos + 5, { align: 'right' });
  
  yPos += 10;
  
  // Table rows
  const costBreakdown = [
    ['Estimation Errors (5%)', projectValue * 0.05, projectValue * 0.005, projectValue * 0.045],
    ['Material Waste (3%)', projectValue * 0.03, projectValue * 0.01, projectValue * 0.02],
    ['Rework Costs (4%)', projectValue * 0.04, projectValue * 0.01, projectValue * 0.03],
    ['Change Orders (3%)', projectValue * 0.03, projectValue * 0.005, projectValue * 0.025],
    ['Time Delays (2%)', projectValue * 0.02, 0, projectValue * 0.02]
  ];
  
  doc.setTextColor(...gray);
  costBreakdown.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(20, yPos - 2, 170, 7, 'F');
    }
    
    doc.text(row[0], 25, yPos + 3);
    doc.text(formatCurrency(row[1], currentCurrency), 90, yPos + 3, { align: 'right' });
    doc.text(formatCurrency(row[2], currentCurrency), 130, yPos + 3, { align: 'right' });
    doc.setTextColor(...green);
    doc.text(formatCurrency(row[3], currentCurrency), 170, yPos + 3, { align: 'right' });
    doc.setTextColor(...gray);
    yPos += 8;
  });
  
  // Total row
  doc.setFillColor(...orange);
  doc.rect(20, yPos, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL', 25, yPos + 6);
  doc.text(formatCurrency(projectValue * 0.17, currentCurrency), 90, yPos + 6, { align: 'right' });
  doc.text(formatCurrency(projectValue * 0.03, currentCurrency), 130, yPos + 6, { align: 'right' });
  doc.text(formatCurrency(totalSavings, currentCurrency), 170, yPos + 6, { align: 'right' });
  
  // Implementation Timeline
  yPos += 20;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.text('Implementation Timeline', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const timeline = [
    ['Days 1-3', 'Initial Assessment', 'Analyze project documentation, create preliminary schedules'],
    ['Days 4-5', 'Detailed Estimation', 'BIM 5D modeling, quantity extraction, market rates'],
    ['Day 6', 'Review & Delivery', 'Final review, value engineering, report delivery']
  ];
  
  timeline.forEach((phase, index) => {
    // Timeline circle
    doc.setFillColor(...orange);
    doc.circle(25, yPos, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`${index + 1}`, 25, yPos + 1, { align: 'center' });
    
    // Timeline content
    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(phase[0] + ': ' + phase[1], 33, yPos);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...gray);
    doc.text(phase[2], 33, yPos + 5);
    
    yPos += 15;
  });
  
  // ============================================================================
  // PAGE 2: DETAILED ANALYSIS
  // ============================================================================
  
  doc.addPage();
  yPos = 20;
  
  // Header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Detailed Analysis & Recommendations', 105, 18, { align: 'center' });
  
  yPos = 45;
  
  // Risk Analysis
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Risk Analysis for ${capitalizeProjectType(projectType)} Projects`, 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  const risks = [
    [`Quantity errors in structural elements`, projectValue * 0.036],
    [`MEP coordination clashes`, projectValue * 0.044],
    [`Facade measurement discrepancies`, projectValue * 0.019],
    [`Foundation over-excavation`, projectValue * 0.015],
    [`Missing scope items`, projectValue * 0.028]
  ];
  
  doc.text('Without BIM Takeoff, your project faces these risks:', 20, yPos);
  yPos += 8;
  
  risks.forEach(risk => {
    doc.setTextColor(...gray);
    doc.text(`• ${risk[0]}:`, 25, yPos);
    doc.setTextColor(220, 38, 38); // Red
    doc.text(formatCurrency(risk[1], currentCurrency), 170, yPos, { align: 'right' });
    yPos += 7;
  });
  
  // Total risk
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...darkGray);
  doc.text('Total Risk Exposure:', 25, yPos);
  doc.setTextColor(220, 38, 38);
  doc.text(formatCurrency(projectValue * 0.142, currentCurrency), 170, yPos, { align: 'right' });
  
  // Value Propositions
  yPos += 15;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('What You Get With BIM Takeoff', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const benefits = [
    ['Accuracy & Speed', [
      '±5% accuracy (vs. ±15-20% traditional)',
      '3-day turnaround (vs. 6-8 weeks)',
      'Automated clash detection',
      'Real-time cost updates'
    ]],
    ['Risk Mitigation', [
      'Identify scope gaps before tender',
      'Catch design inconsistencies',
      'Prevent material over-ordering',
      'Avoid costly variations'
    ]],
    ['Competitive Advantage', [
      'Win more tenders with accurate pricing',
      'Faster response to tender invitations',
      'Professional documentation',
      'Value engineering opportunities'
    ]]
  ];
  
  benefits.forEach(section => {
    doc.setTextColor(...orange);
    doc.setFont(undefined, 'bold');
    doc.text(section[0], 20, yPos);
    yPos += 7;
    
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    section[1].forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 6;
    });
    yPos += 3;
  });
  
  // Industry Benchmarks
  yPos += 5;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Industry Benchmarks', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  
  doc.text(`Your Project Type: ${capitalizeProjectType(projectType)}`, 20, yPos);
  yPos += 7;
  doc.text(`Industry Average Cost Overrun: 27%`, 20, yPos);
  yPos += 7;
  doc.text(`With BIM Takeoff: <5%`, 20, yPos);
  yPos += 7;
  doc.text(`Typical ROI for Your Sector: 600-900%`, 20, yPos);
  yPos += 7;
  doc.setTextColor(...green);
  doc.setFont(undefined, 'bold');
  doc.text(`Your Calculated ROI: ${roiPercentage}% ✓`, 20, yPos);
  
  // ============================================================================
  // PAGE 3: NEXT STEPS & CONTACT
  // ============================================================================
  
  doc.addPage();
  yPos = 20;
  
  // Header
  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Your Next Steps', 105, 18, { align: 'center' });
  
  yPos = 45;
  
  // Call to Action
  doc.setFillColor(254, 243, 199); // Light yellow
  doc.rect(20, yPos, 170, 40, 'F');
  doc.setTextColor(146, 64, 14); // Dark yellow
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Ready to Save ${formatCurrency(totalSavings, currentCurrency)}?`, 105, yPos + 10, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text('Get started with a free consultation and sample estimate', 105, yPos + 20, { align: 'center' });
  
  doc.setTextColor(59, 130, 246); // Blue
  doc.textWithLink('Schedule Free Consultation', 105, yPos + 30, {
    url: 'https://calendly.com/bimtakeoff/consultation',
    align: 'center'
  });
  
  yPos += 50;
  
  // Action Plan
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Your Action Plan', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const actions = [
    ['This Week', 'Schedule free consultation', 'Discuss your specific project needs'],
    ['Next Week', 'Provide sample drawings', 'Receive test estimate for accuracy verification'],
    ['Week 3', 'Review proposal', 'Approve framework agreement for ongoing support'],
    ['Ongoing', 'Submit projects as needed', 'Receive estimates within 3 days']
  ];
  
  actions.forEach((action, index) => {
    // Checkbox
    doc.rect(25, yPos - 3, 3, 3);
    
    // Action details
    doc.setTextColor(...orange);
    doc.setFont(undefined, 'bold');
    doc.text(action[0], 32, yPos);
    doc.setTextColor(...darkGray);
    doc.text(': ' + action[1], 55, yPos);
    doc.setTextColor(...gray);
    doc.setFont(undefined, 'normal');
    doc.text(action[2], 32, yPos + 5);
    
    yPos += 15;
  });
  
  // Resources
  yPos += 5;
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Free Resources', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(59, 130, 246);
  
  doc.textWithLink('• 37-Point Tender Checklist (Polish)', 25, yPos, {
    url: 'https://bimtakeoff.com/pl/checklist-przetargu'
  });
  yPos += 7;
  
  doc.textWithLink('• BIM Implementation Guide for Poland', 25, yPos, {
    url: 'https://bimtakeoff.com/resources/bim-guide-poland'
  });
  yPos += 7;
  
  doc.textWithLink('• Sample BoQ Template', 25, yPos, {
    url: 'https://bimtakeoff.com/resources/sample-boq'
  });
  
  // Contact Information
  yPos += 20;
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 170, 35, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Contact Information', 105, yPos + 8, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...gray);
  doc.text('Robert Kowalski - Managing Director', 105, yPos + 16, { align: 'center' });
  doc.text('📧 robert@bimtakeoff.com | 📱 WhatsApp: +48 XXX XXX XXX', 105, yPos + 22, { align: 'center' });
  doc.text('🌐 www.bimtakeoff.com', 105, yPos + 28, { align: 'center' });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text(`This report is confidential and prepared specifically for ${leadData.name || 'you'}`, 105, 280, { align: 'center' });
  doc.text(`Valid for 30 days from ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
  
  // ============================================================================
  // SAVE THE PDF
  // ============================================================================
  
  // Generate filename
  const fileName = `BIM-Takeoff-ROI-Report-${(leadData.name || 'Client').replace(/\s+/g, '-')}-${Date.now()}.pdf`;
  
  // Download the PDF
  doc.save(fileName);
  
  console.log('PDF Report generated and downloaded:', fileName);
  
  // Track event
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'pdf_report_downloaded',
      'project_value': projectValue,
      'estimated_savings': totalSavings,
      'roi': roiPercentage,
      'lead_name': leadData.name
    });
  }
}

/**
 * Helper function to capitalize project type
 */
function capitalizeProjectType(type) {
  const typeMap = {
    'residential': 'Residential Complex',
    'commercial': 'Commercial Building',
    'industrial': 'Industrial Facility',
    'infrastructure': 'Infrastructure Project',
    'mixed': 'Mixed-Use Development'
  };
  return typeMap[type] || type;
}

// ============================================================================
// IMPLEMENTATION INSTRUCTIONS
// ============================================================================

// 1. Add jsPDF library to your roi-calculator.qmd file
//    Add this line in the <head> section or before your calculator:
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

// 2. Update your form submission handler
//    After Pipedrive form submits successfully, call:
//    generatePDFReport({ name: 'Client Name', email: 'client@email.com' });

// 3. The function should be called here (around line 280 in roi-calculator.js):
//    Instead of showing thank you modal, generate and download PDF:
/*
// OLD CODE:
document.getElementById('thankyou-modal').style.display = 'flex';

// NEW CODE:
generatePDFReport({
  name: document.querySelector('[name="person_name"]').value,
  email: document.querySelector('[name="person_email"]').value
});
document.getElementById('thankyou-modal').style.display = 'flex';
*/

// 4. Test the flow:
//    - Fill calculator
//    - Submit Pipedrive form
//    - PDF downloads automatically
//    - Check Pipedrive for new lead

// ============================================================================