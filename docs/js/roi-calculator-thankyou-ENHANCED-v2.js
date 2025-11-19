// ROI Calculator Thank You Page - PDF Generation
// ENHANCED VERSION 2.0 - Professional Quality with Full Unicode Support
// Date: November 19, 2025

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎉 Thank you page loaded - Enhanced PDF v2.0');

  const loadingState = document.getElementById('loading-state');
  const successState = document.getElementById('success-state');
  const errorState = document.getElementById('error-state');
  const manualDownloadBtn = document.getElementById('manual-download-btn');
  const savingsSummary = document.getElementById('savings-summary');

  if (manualDownloadBtn) {
    manualDownloadBtn.addEventListener('click', () => {
      console.log('📥 Manual download clicked');
      generatePDFReport();
    });
  }

  function loadCalculatorData() {
    try {
      const stored = localStorage.getItem('bimtakeoff_calculator_data');
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading data:', e);
      return null;
    }
  }

  const calculatorData = loadCalculatorData();

  if (calculatorData) {
    const currency = calculatorData.currency || 'PLN';
    const isPolish = window.location.pathname.includes('/pl/');

    if (savingsSummary) {
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

    if (loadingState) loadingState.style.display = 'none';
    if (successState) successState.style.display = 'block';
    if (errorState) errorState.style.display = 'none';

    setTimeout(() => attemptPDFGeneration(), 1500);
  } else {
    if (loadingState) loadingState.style.display = 'none';
    if (successState) successState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
  }
});

function attemptPDFGeneration() {
  const data = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  if (!data || !data.projectValue) return;
  
  const jspdfAvailable = (typeof window.jspdf !== 'undefined' && typeof window.jspdf.jsPDF !== 'undefined') || 
                          (typeof window.jsPDF !== 'undefined');
  
  if (!jspdfAvailable) {
    setTimeout(() => attemptPDFGeneration(), 500);
    return;
  }
  
  generatePDFReport();
}

// ============================================================================
// MAIN PDF GENERATION FUNCTION
// ============================================================================

function generatePDFReport() {
  console.log('📝 Generating Enhanced PDF v2.0');
  
  const calculatorData = JSON.parse(localStorage.getItem('bimtakeoff_calculator_data') || '{}');
  
  if (!calculatorData || !calculatorData.projectValue) {
    alert('No calculator data available. Please complete the ROI calculator first.');
    return;
  }
  
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
  } else {
    alert('PDF library not loaded. Please refresh and try again.');
    return;
  }
  
  const doc = new jsPDF();
  
  // Extract data
  const projectValue = calculatorData.projectValue || 1000000;
  const totalSavings = calculatorData.savings || 50000;
  const roiPercentage = calculatorData.roi || 5;
  const currency = calculatorData.currency || 'PLN';
  const timeline = calculatorData.timeline || 'standard';
  const projectType = calculatorData.project_type || 'residential';
  
  // Language detection
  const urlPath = window.location.pathname.toLowerCase();
  const isPolish = urlPath.includes('/pl/') || currency === 'PLN';
  
  console.log(`🌍 Generating ${isPolish ? 'Polish' : 'English'} PDF`);
  
  // Brand colors (exact from guidelines)
  const C = {
    orange: [255, 153, 0],
    green: [16, 185, 129],
    gray: [107, 114, 128],
    darkGray: [44, 44, 44],
    lightGray: [248, 249, 250],
    white: [255, 255, 255],
    lightOrange: [254, 243, 199],
    lightGreen: [220, 252, 231]
  };
  
  // Helper functions
  const fmt = (amount) => {
    const locale = isPolish ? 'pl-PL' : 'en-US';
    return Math.round(amount).toLocaleString(locale) + ' ' + currency;
  };
  
  const addHeader = (title) => {
    doc.setFillColor(...C.orange);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(...C.white);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(title, 105, 13, { align: 'center' });
  };
  
  const addFooter = (text, y = 280) => {
    doc.setTextColor(...C.gray);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(text, 105, y, { align: 'center' });
  };
  
  // ============================================================================
  // PAGE 1: COVER PAGE
  // ============================================================================
  
  // Header
  doc.setFillColor(...C.orange);
  doc.rect(0, 0, 210, 60, 'F');
  
  // Logo
  doc.setFillColor(...C.white);
  doc.rect(15, 15, 40, 15, 'F');
  doc.setTextColor(...C.orange);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('BIM TAKEOFF', 35, 24, { align: 'center' });
  
  // Title
  doc.setTextColor(...C.white);
  doc.setFontSize(28);
  doc.text(isPolish ? 'RAPORT ANALIZY ROI' : 'ROI ANALYSIS REPORT', 105, 30, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'Profesjonalna Wycena Kosztorysowa' : 'Professional Cost Estimation Services', 105, 40, { align: 'center' });
  
  // Date
  doc.setTextColor(...C.gray);
  doc.setFontSize(10);
  const dateStr = new Date().toLocaleDateString(isPolish ? 'pl-PL' : 'en-US');
  doc.text((isPolish ? 'Wygenerowano: ' : 'Generated: ') + dateStr, 105, 50, { align: 'center' });
  
  // Key metrics
  let y = 80;
  
  // Project Value
  doc.setFillColor(...C.lightGray);
  doc.roundedRect(20, y, 55, 35, 3, 3, 'F');
  doc.setTextColor(...C.gray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'WARTOŚĆ PROJEKTU' : 'PROJECT VALUE', 47.5, y + 10, { align: 'center' });
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(fmt(projectValue), 47.5, y + 22, { align: 'center' });
  
  // Savings
  doc.setFillColor(...C.lightGreen);
  doc.roundedRect(77.5, y, 55, 35, 3, 3, 'F');
  doc.setTextColor(...C.gray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'SZACOWANE OSZCZĘDNOŚCI' : 'ESTIMATED SAVINGS', 105, y + 10, { align: 'center' });
  doc.setTextColor(...C.green);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(fmt(totalSavings), 105, y + 22, { align: 'center' });
  
  // ROI
  doc.setFillColor(...C.lightOrange);
  doc.roundedRect(135, y, 55, 35, 3, 3, 'F');
  doc.setTextColor(...C.gray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'ZWROT Z INWESTYCJI' : 'RETURN ON INVESTMENT', 162.5, y + 10, { align: 'center' });
  doc.setTextColor(...C.orange);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(roiPercentage + '%', 162.5, y + 22, { align: 'center' });
  
  // Benefits
  y = 130;
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'KLUCZOWE KORZYŚCI' : 'KEY BENEFITS', 20, y);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(11);
  
  const benefits = isPolish ? [
    '3-10 dni realizacji vs 6-8 tygodni tradycyjnie',
    'Gwarantowana dokładność ±3-5%',
    'Zgodność z BSR i wymogami prawnymi',
    '20+ lat międzynarodowego doświadczenia',
    '2000+ zrealizowanych projektów globalnie'
  ] : [
    '3-10 days turnaround vs 6-8 weeks traditional',
    '±3-5% accuracy guaranteed',
    'BSR compliance and regulatory expertise',
    '20+ years international experience',
    '2000+ projects completed globally'
  ];
  
  y += 10;
  benefits.forEach(benefit => {
    doc.setTextColor(...C.green);
    doc.text('✓', 25, y);
    doc.setTextColor(...C.darkGray);
    doc.text(benefit, 32, y);
    y += 8;
  });
  
  // CTA Box
  y = 200;
  doc.setFillColor(...C.orange);
  doc.roundedRect(20, y, 170, 40, 3, 3, 'F');
  doc.setTextColor(...C.white);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'TWOJE POTENCJALNE ROCZNE OSZCZĘDNOŚCI:' : 'YOUR POTENTIAL ANNUAL SAVINGS:', 105, y + 15, { align: 'center' });
  doc.setFontSize(20);
  doc.text(fmt(totalSavings * 3), 105, y + 28, { align: 'center' });
  
  addFooter('www.bimtakeoff.com | enquiry@bimtakeoff.com | +61 480 373 900');
  
  // ============================================================================
  // PAGE 2: EXECUTIVE SUMMARY
  // ============================================================================
  
  doc.addPage();
  addHeader(isPolish ? 'PODSUMOWANIE WYKONAWCZE' : 'EXECUTIVE SUMMARY');
  
  y = 35;
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Przegląd Projektu' : 'Project Overview', 20, y);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  y += 8;
  doc.text((isPolish ? 'Typ Projektu: ' : 'Project Type: ') + projectType, 25, y);
  y += 6;
  doc.text((isPolish ? 'Całkowita Wartość Projektu: ' : 'Total Project Value: ') + fmt(projectValue), 25, y);
  y += 6;
  doc.text((isPolish ? 'Czas Wdrożenia: ' : 'Implementation Timeline: ') + timeline, 25, y);
  
  // Financial Impact Table
  y += 15;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Analiza Wpływu Finansowego' : 'Financial Impact Analysis', 20, y);
  
  y += 10;
  const tableData = isPolish ? [
    ['Obszar Redukcji Kosztów', 'Metoda Tradycyjna', 'Z BIM Takeoff', 'Oszczędności'],
    ['Czas Wyceny', '6-8 tygodni', '3-10 dni', '75% redukcji'],
    ['Dokładność', '±10-15%', '±3-5%', '67% poprawa'],
    ['Koszty Poprawek', '5-10% budżetu', '<2% budżetu', fmt(projectValue * 0.06)],
    ['Zmiany w Projekcie', '15-20% typowo', '5-8% typowo', fmt(projectValue * 0.12)]
  ] : [
    ['Cost Reduction Area', 'Traditional Method', 'With BIM Takeoff', 'Savings'],
    ['Estimation Time', '6-8 weeks', '3-10 days', '75% reduction'],
    ['Accuracy Rate', '±10-15%', '±3-5%', '67% improvement'],
    ['Rework Costs', '5-10% of budget', '<2% of budget', fmt(projectValue * 0.06)],
    ['Change Orders', '15-20% typical', '5-8% typical', fmt(projectValue * 0.12)]
  ];
  
  // Table header
  doc.setFillColor(...C.lightGray);
  doc.rect(20, y, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...C.darkGray);
  
  const colWidths = [50, 35, 35, 50];
  let x = 22;
  tableData[0].forEach((header, i) => {
    doc.text(header, x, y + 5);
    x += colWidths[i];
  });
  
  // Table rows
  doc.setFont(undefined, 'normal');
  y += 10;
  for (let i = 1; i < tableData.length; i++) {
    x = 22;
    tableData[i].forEach((cell, j) => {
      doc.text(cell, x, y);
      x += colWidths[j];
    });
    y += 7;
  }
  
  // Strategic Advantages
  y += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Przewagi Strategiczne' : 'Strategic Advantages', 20, y);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  y += 8;
  
  const advantages = isPolish ? [
    'Szybsze przygotowanie ofert umożliwia więcej przetargów',
    'Wyższa dokładność redukuje wymagane rezerwy',
    'Tworzenie cyfrowego bliźniaka do zarządzania obiektem',
    'Lepsza komunikacja z interesariuszami dzięki wizualizacji 3D',
    'Ograniczenie ryzyka poprzez wykrywanie kolizji'
  ] : [
    'Faster bid turnaround enables more tender opportunities',
    'Higher accuracy reduces contingency requirements',
    'Digital twin creation for facility management',
    'Improved stakeholder communication with 3D visualization',
    'Risk mitigation through clash detection and coordination'
  ];
  
  advantages.forEach(adv => {
    doc.text('•  ' + adv, 25, y);
    y += 7;
  });
  
  // Recommendation box
  y += 10;
  doc.setFillColor(...C.lightGreen);
  doc.roundedRect(20, y, 170, 35, 3, 3, 'F');
  doc.setTextColor(...C.green);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'REKOMENDACJA' : 'RECOMMENDATION', 30, y + 10);
  
  doc.setTextColor(...C.darkGray);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const recText = isPolish ?
    `Na podstawie analizy, wdrożenie usług BIM Takeoff przyniesie szacowany ${roiPercentage}% zwrot z inwestycji, oszczędzając około ${fmt(totalSavings)} na projekt. Przy Państwa portfolio projektów, przekłada się to na roczne oszczędności ${fmt(totalSavings * 3)} lub więcej.` :
    `Based on the analysis, implementing BIM Takeoff services will deliver an estimated ${roiPercentage}% ROI, saving approximately ${fmt(totalSavings)} per project. With your project pipeline, this translates to annual savings of ${fmt(totalSavings * 3)} or more.`;
  
  const lines = doc.splitTextToSize(recText, 150);
  y += 18;
  lines.forEach(line => {
    doc.text(line, 30, y);
    y += 5;
  });
  
  // ============================================================================
  // PAGE 3: DETAILED BREAKDOWN
  // ============================================================================
  
  doc.addPage();
  addHeader(isPolish ? 'SZCZEGÓŁOWA ANALIZA OSZCZĘDNOŚCI' : 'DETAILED SAVINGS ANALYSIS');
  
  y = 35;
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Zestawienie Porównawcze Kosztów' : 'Cost Comparison Breakdown', 20, y);
  
  y += 10;
  
  // Cost comparison bars
  const comparisons = [
    { label: isPolish ? 'Proces Wyceny' : 'Estimation Process', traditional: 25000, bimtakeoff: 8000 },
    { label: isPolish ? 'Poprawki i Korekty' : 'Rework & Corrections', traditional: 15000, bimtakeoff: 3000 },
    { label: isPolish ? 'Opóźnienia Projektu' : 'Project Delays', traditional: 30000, bimtakeoff: 5000 },
    { label: isPolish ? 'Koszty Administracyjne' : 'Administrative Overhead', traditional: 12000, bimtakeoff: 4000 },
    { label: isPolish ? 'Kontrola Jakości' : 'Quality Assurance', traditional: 8000, bimtakeoff: 2000 }
  ];
  
  const maxValue = 35000;
  const barWidth = 160;
  
  comparisons.forEach(comp => {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(comp.label, 20, y);
    y += 5;
    
    // Traditional bar
    doc.setFillColor(...C.gray);
    const tradWidth = (comp.traditional / maxValue) * barWidth;
    doc.rect(20, y, tradWidth, 6, 'F');
    
    // BIM Takeoff bar
    y += 8;
    doc.setFillColor(...C.green);
    const bimWidth = (comp.bimtakeoff / maxValue) * barWidth;
    doc.rect(20, y, bimWidth, 6, 'F');
    
    // Values
    doc.setTextColor(...C.darkGray);
    doc.setFontSize(9);
    doc.text(fmt(comp.traditional), 20 + tradWidth + 2, y - 4);
    doc.text(fmt(comp.bimtakeoff), 20 + bimWidth + 2, y + 5);
    
    y += 15;
  });
  
  // Legend
  doc.setFillColor(...C.gray);
  doc.rect(20, y, 10, 5, 'F');
  doc.text(isPolish ? 'Metoda Tradycyjna' : 'Traditional Method', 32, y + 4);
  doc.setFillColor(...C.green);
  doc.rect(80, y, 10, 5, 'F');
  doc.text('With BIM Takeoff', 92, y + 4);
  
  // Time savings
  y += 20;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Analiza Oszczędności Czasu' : 'Time Savings Analysis', 20, y);
  
  y += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const timeData = isPolish ? [
    ['Etap', 'Tradycyjnie', 'BIM Takeoff', 'Czas Zaoszczędzony'],
    ['Wstępny Przedmiar', '3 tygodnie', '2 dni', '19 dni'],
    ['Weryfikacja', '2 tygodnie', '1 dzień', '13 dni'],
    ['Poprawki', '1 tydzień', '4 godziny', '6,5 dnia'],
    ['Przegląd Końcowy', '3 dni', '2 godziny', '2,75 dnia']
  ] : [
    ['Phase', 'Traditional', 'BIM Takeoff', 'Time Saved'],
    ['Initial Takeoff', '3 weeks', '2 days', '19 days'],
    ['Verification', '2 weeks', '1 day', '13 days'],
    ['Revisions', '1 week', '4 hours', '6.5 days'],
    ['Final Review', '3 days', '2 hours', '2.75 days']
  ];
  
  // Time savings table
  doc.setFillColor(...C.lightGray);
  doc.rect(20, y, 170, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  
  x = 22;
  const timeColWidths = [40, 35, 35, 60];
  timeData[0].forEach((header, i) => {
    doc.text(header, x, y + 5);
    x += timeColWidths[i];
  });
  
  doc.setFont(undefined, 'normal');
  y += 10;
  for (let i = 1; i < timeData.length; i++) {
    x = 22;
    timeData[i].forEach((cell, j) => {
      if (j === 3) {
        doc.setTextColor(...C.green);
      } else {
        doc.setTextColor(...C.darkGray);
      }
      doc.text(cell, x, y);
      x += timeColWidths[j];
    });
    y += 7;
  }
  
  // Bottom summary
  y += 10;
  doc.setFillColor(...C.lightOrange);
  doc.roundedRect(20, y, 170, 25, 3, 3, 'F');
  doc.setTextColor(...C.orange);
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'CAŁKOWITE OSZCZĘDNOŚCI PROJEKTU' : 'TOTAL PROJECT SAVINGS', 30, y + 10);
  doc.setFontSize(14);
  doc.text(fmt(totalSavings), 30, y + 20);
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'Równowartość 41,25 dni zaoszczędzonych na projekt' : 'Equivalent to 41.25 days saved per project', 110, y + 15);
  
  // ============================================================================
  // PAGE 4: SERVICE DELIVERABLES
  // ============================================================================
  
  doc.addPage();
  addHeader(isPolish ? 'ZAKRES USŁUG' : 'SERVICE DELIVERABLES');
  
  y = 35;
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Główne Komponenty Usługi' : 'Core Service Components', 20, y);
  
  y += 10;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const services = isPolish ? [
    { title: 'Tworzenie Modelu BIM 3D', description: 'Kompletny cyfrowy bliźniak projektu z dokładnością LOD 300-400' },
    { title: 'Raporty Przedmiarowe', description: 'Szczegółowe zestawienia ilościowe w preferowanym formacie (Excel, CostX, Buildsoft)' },
    { title: 'Analiza Wykrywania Kolizji', description: 'Identyfikacja i rozwiązanie konfliktów przed rozpoczęciem budowy' },
    { title: 'Integracja Kosztów 5D', description: 'Śledzenie kosztów w czasie rzeczywistym powiązane z elementami modelu 3D' },
    { title: 'Zarządzanie Zmianami', description: 'Śledzenie i kwantyfikacja wszystkich zmian projektowych z implikacjami kosztowymi' }
  ] : [
    { title: '3D BIM Model Creation', description: 'Complete digital twin of your project with LOD 300-400 accuracy' },
    { title: 'Quantity Takeoff Reports', description: 'Detailed Bills of Quantities in your preferred format (Excel, CostX, Buildsoft)' },
    { title: 'Clash Detection Analysis', description: 'Identify and resolve conflicts before construction begins' },
    { title: '5D Cost Integration', description: 'Real-time cost tracking linked to 3D model elements' },
    { title: 'Change Management', description: 'Track and quantify all design changes with cost implications' }
  ];
  
  services.forEach(service => {
    doc.setFont(undefined, 'bold');
    doc.text('• ' + service.title, 25, y);
    doc.setFont(undefined, 'normal');
    y += 5;
    const descLines = doc.splitTextToSize(service.description, 160);
    descLines.forEach(line => {
      doc.text(line, 30, y);
      y += 5;
    });
    y += 3;
  });
  
  // Implementation timeline
  y += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text((isPolish ? 'Harmonogram Wdrożenia: ' : 'Implementation Timeline: ') + timeline, 20, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const phases = isPolish ? [
    { week: 'Tydzień 1-2', task: 'Wstępna konfiguracja i tworzenie modelu', status: 'Szybki Start' },
    { week: 'Tydzień 3-4', task: 'Ekstrakcja ilości i weryfikacja', status: 'Główna Dostawa' },
    { week: 'Tydzień 5-6', task: 'Kontrola jakości i raportowanie', status: 'Przegląd Końcowy' },
    { week: 'Na bieżąco', task: 'Zarządzanie zmianami i aktualizacje', status: 'Ciągłe Wsparcie' }
  ] : [
    { week: 'Week 1-2', task: 'Initial setup and model creation', status: 'Quick Start' },
    { week: 'Week 3-4', task: 'Quantity extraction and verification', status: 'Core Delivery' },
    { week: 'Week 5-6', task: 'Quality assurance and reporting', status: 'Final Review' },
    { week: 'Ongoing', task: 'Change management and updates', status: 'Continuous Support' }
  ];
  
  phases.forEach(phase => {
    doc.setFillColor(248, 249, 250);
    doc.rect(20, y, 170, 12, 'F');
    doc.setFont(undefined, 'bold');
    doc.text(phase.week, 25, y + 8);
    doc.setFont(undefined, 'normal');
    doc.text(phase.task, 55, y + 8);
    doc.setTextColor(...C.orange);
    doc.text(phase.status, 145, y + 8);
    doc.setTextColor(...C.darkGray);
    y += 14;
  });
  
  // Support services
  y += 5;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Zawarte Usługi Wsparcia' : 'Included Support Services', 20, y);
  
  y += 8;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  
  const support = isPolish ? [
    'Dostęp do portalu projektu 24/7',
    'Dedykowany kierownik projektu',
    'Tygodniowe raporty postępu',
    'Nieograniczone poprawki podczas projektu',
    'Wsparcie po zakończeniu projektu przez 30 dni'
  ] : [
    '24/7 project portal access',
    'Dedicated project manager',
    'Weekly progress reports',
    'Unlimited revisions during project',
    'Post-project support for 30 days'
  ];
  
  support.forEach(item => {
    doc.text('✓ ' + item, 25, y);
    y += 6;
  });
  
  // ============================================================================
  // PAGE 5: NEXT STEPS
  // ============================================================================
  
  doc.addPage();
  addHeader(isPolish ? 'NASTĘPNE KROKI' : 'NEXT STEPS');
  
  y = 35;
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'Zalecane Działania Natychmiastowe' : 'Recommended Immediate Actions', 20, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  const actions = isPolish ? [
    { step: '1', action: 'Umów Rozmowę Odkrywczą', detail: 'Zarezerwuj 30-minutową konsultację, aby omówić konkretne wymagania projektu', timeline: 'Ten Tydzień' },
    { step: '2', action: 'Ocena Projektu', detail: 'Udostępnij rysunki projektowe do szczegółowej oceny wykonalności', timeline: 'Tydzień 2' },
    { step: '3', action: 'Projekt Pilotażowy', detail: 'Rozpocznij od mniejszego projektu, aby zademonstrować wartość i ROI', timeline: 'Tydzień 3-4' },
    { step: '4', action: 'Pełne Wdrożenie', detail: 'Skaluj do pełnego portfolio projektów na podstawie wyników pilotażu', timeline: 'Miesiąc 2+' }
  ] : [
    { step: '1', action: 'Schedule Discovery Call', detail: 'Book a 30-minute consultation to discuss your specific project requirements', timeline: 'This Week' },
    { step: '2', action: 'Project Assessment', detail: 'Share project drawings for a detailed feasibility assessment', timeline: 'Week 2' },
    { step: '3', action: 'Pilot Project', detail: 'Start with a smaller project to demonstrate value and ROI', timeline: 'Week 3-4' },
    { step: '4', action: 'Full Implementation', detail: 'Scale to full project portfolio based on pilot results', timeline: 'Month 2+' }
  ];
  
  actions.forEach(action => {
    // Step number in circle
    doc.setFillColor(...C.orange);
    doc.circle(25, y - 2, 4, 'F');
    doc.setTextColor(...C.white);
    doc.setFont(undefined, 'bold');
    doc.text(action.step, 25, y, { align: 'center' });
    
    // Action details
    doc.setTextColor(...C.darkGray);
    doc.setFont(undefined, 'bold');
    doc.text(action.action, 35, y);
    doc.setTextColor(...C.orange);
    doc.setFontSize(9);
    doc.text(action.timeline, 165, y, { align: 'right' });
    
    doc.setTextColor(...C.gray);
    doc.setFont(undefined, 'normal');
    y += 5;
    const detailLines = doc.splitTextToSize(action.detail, 145);
    detailLines.forEach(line => {
      doc.text(line, 35, y);
      y += 4;
    });
    y += 8;
  });
  
  // Contact information
  y += 5;
  doc.setFillColor(...C.lightGray);
  doc.roundedRect(20, y, 170, 40, 3, 3, 'F');
  
  doc.setTextColor(...C.darkGray);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text((isPolish ? 'Gotowy zaoszczędzić ' : 'Ready to Save ') + fmt(totalSavings) + '?', 105, y + 10, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(isPolish ? 'Skontaktuj się z naszym zespołem już dziś:' : 'Contact our team today:', 105, y + 18, { align: 'center' });
  
  doc.setTextColor(...C.orange);
  doc.text('enquiry@bimtakeoff.com | +61 480 373 900', 105, y + 26, { align: 'center' });
  doc.text(isPolish ? 'www.bimtakeoff.com/pl' : 'www.bimtakeoff.com', 105, y + 33, { align: 'center' });
  
  // Final CTA
  y += 50;
  doc.setFillColor(...C.green);
  doc.roundedRect(40, y, 130, 15, 3, 3, 'F');
  doc.setTextColor(...C.white);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(isPolish ? 'ZAREZERWUJ BEZPŁATNĄ KONSULTACJĘ' : 'BOOK YOUR FREE CONSULTATION', 105, y + 10, { align: 'center' });
  
  // Footer
  doc.setTextColor(...C.gray);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.text('© 2024 BIM Takeoff. ' + (isPolish ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'), 105, 280, { align: 'center' });
  doc.text(isPolish ? 'Raport jest poufny i przygotowany specjalnie dla Państwa organizacji.' : 'This report is confidential and prepared specifically for your organization.', 105, 285, { align: 'center' });
  
  // ============================================================================
  // SAVE PDF
  // ============================================================================
  
  const fileName = isPolish ? 
    'BIM-Takeoff-Raport-ROI-' + Date.now() + '.pdf' :
    'BIM-Takeoff-ROI-Report-' + currency + '-' + Date.now() + '.pdf';
  
  doc.save(fileName);
  console.log(`✅ PDF generated successfully: ${fileName}`);
}

// Make function available globally
window.manuallyGeneratePDF = generatePDFReport;

console.log('💡 Enhanced ROI Calculator Thank You page loaded - v2.0');