// ============================================================================
// MAIN PDF GENERATION FUNCTION - ENHANCED VERSION 2.0
// ============================================================================

function generatePDFReport() {
  console.log('📝 generatePDFReport called - Enhanced v2.0');
  const calculatorData = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  
  if (!calculatorData || !calculatorData.projectValue) {
    console.error('❌ No calculator data available');
    alert('No calculator data available. Please complete the ROI calculator first.');
    return;
  }
  
  // Get jsPDF
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
  } else {
    console.error('❌ jsPDF not found');
    alert('PDF library not loaded properly. Please refresh the page and try again.');
    return;
  }
  
  console.log('🚀 Generating Enhanced PDF...');
  const doc = new jsPDF();
  
  // Extract data
  const projectValue = calculatorData.projectValue || 1000000;
  const totalSavings = calculatorData.savings || 50000;
  const roiPercentage = calculatorData.roi || 5;
  const currency = calculatorData.currency || 'PLN';
  const timeline = calculatorData.timeline || 'standard';
  const projectType = calculatorData.project_type || 'residential';
  
  // ENHANCED LANGUAGE DETECTION
  const urlPath = window.location.pathname.toLowerCase();
  const isPolishURL = urlPath.includes('/pl/');
  const documentLang = document.documentElement.lang || '';
  const isPolishLang = documentLang.toLowerCase().startsWith('pl');
  const dataLanguage = calculatorData.language || '';
  const isPolishData = dataLanguage.toLowerCase() === 'pl';
  const isPolishCurrency = currency === 'PLN';
  
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
  
  // ============================================================================
  // BRAND COLORS - Exact values from brand guidelines
  // ============================================================================
  const colors = {
    orange: [255, 153, 0],      // #FF9900 - Primary brand color
    green: [16, 185, 129],       // #10B981 - Success/savings color  
    gray: [107, 114, 128],       // #6B7280 - Secondary text
    darkGray: [44, 44, 44],      // #2C2C2C - Primary text
    lightGray: [248, 249, 250],  // #F8F9FA - Background
    white: [255, 255, 255],      // #FFFFFF
    lightOrange: [254, 243, 199],// #FEF3C7 - Light orange background
    lightGreen: [220, 252, 231]  // #DCFCE7 - Light green background
  };
  
  // ============================================================================
  // HELPER FUNCTIONS FOR CONSISTENT FORMATTING
  // ============================================================================
  
  // Format currency with proper locale
  function formatCurrency(amount, lang = 'en') {
    const locale = lang === 'pl' ? 'pl-PL' : 'en-US';
    return Math.round(amount).toLocaleString(locale) + ' ' + currency;
  }
  
  // Add page header with consistent styling
  function addPageHeader(doc, title, colors) {
    doc.setFillColor(...colors.orange);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(title, 105, 13, { align: 'center' });
  }
  
  // Add page footer with consistent styling
  function addPageFooter(doc, text, yPos, colors) {
    doc.setTextColor(...colors.gray);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(text, 105, yPos, { align: 'center' });
  }
  
  // Create metric box (used for key metrics on cover page)
  function createMetricBox(doc, x, y, width, height, label, value, bgColor, textColor, colors) {
    doc.setFillColor(...bgColor);
    doc.roundedRect(x, y, width, height, 3, 3, 'F');
    doc.setTextColor(...colors.gray);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(label, x + width/2, y + 10, { align: 'center' });
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(value, x + width/2, y + 22, { align: 'center' });
  }
  
  // ============================================================================
  // GENERATE PDF BASED ON LANGUAGE
  // ============================================================================
  
  if (isPolish) {
    console.log('🇵🇱 Generating Polish PDF...');
    generatePolishPDF(doc, {
      colors,
      projectValue,
      totalSavings,
      roiPercentage,
      currency,
      timeline,
      projectType,
      formatCurrency,
      addPageHeader,
      addPageFooter,
      createMetricBox
    });
    
    const fileName = 'BIM-Takeoff-Raport-ROI-' + Date.now() + '.pdf';
    doc.save(fileName);
    console.log('✅ Polish PDF generated:', fileName);
  } else {
    console.log('🇬🇧 Generating English PDF...');
    generateEnglishPDF(doc, {
      colors,
      projectValue,
      totalSavings,
      roiPercentage,
      currency,
      timeline,
      projectType,
      formatCurrency,
      addPageHeader,
      addPageFooter,
      createMetricBox
    });
    
    const fileName = 'BIM-Takeoff-ROI-Report-' + currency + '-' + Date.now() + '.pdf';
    doc.save(fileName);
    console.log('✅ English PDF generated:', fileName);
  }
}

// Make function available globally
window.manuallyGeneratePDF = generatePDFReport;
