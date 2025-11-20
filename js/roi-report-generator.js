// ROI Report Generator - Print-Optimized HTML
// Generates beautiful print-ready reports from calculator data

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎉 ROI Report Generator loaded');

  // Detect language
  const isPolish = window.location.pathname.includes('/pl/');
  
  // Load calculator data
  const calculatorData = loadCalculatorData();
  
  if (!calculatorData || !calculatorData.projectValue) {
    showError();
    return;
  }
  
  // Generate report
  generateReport(calculatorData, isPolish);
  
  // Setup buttons
  setupButtons(isPolish);
});

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

function showError() {
  document.querySelector('.loading-state').innerHTML = `
    <div style="text-align: center; padding: 60px 20px;">
      <h2 style="color: #6B7280; margin-bottom: 20px;">No Calculator Data Found</h2>
      <p style="color: #9CA3AF; margin-bottom: 30px;">Please complete the ROI calculator first.</p>
      <a href="${window.location.pathname.includes('/pl/') ? '/pl/zasoby/kalkulator-roi.html' : '/resources/roi-calculator.html'}" 
         style="background: #FF9900; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">
        Go to Calculator
      </a>
    </div>
  `;
}

function setupButtons(isPolish) {
  const downloadBtn = document.getElementById('download-pdf-btn');
  const backBtn = document.getElementById('back-btn');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();
    });
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = isPolish ? 
        '/pl/zasoby/kalkulator-roi-dziekujemy.html' : 
        '/resources/roi-calculator-thank-you.html';
    });
  }
}

function generateReport(data, isPolish) {
  const projectValue = data.projectValue || 1000000;
  const totalSavings = data.savings || 50000;
  const roiPercentage = data.roi || 5;
  const currency = data.currency || 'PLN';
  const timeline = data.timeline || 'standard';
  const projectType = data.project_type || 'residential';
  const annualSavings = totalSavings * 3;
  
  const locale = isPolish ? 'pl-PL' : 'en-US';
  const fmt = (amount) => Math.round(amount).toLocaleString(locale) + ' ' + currency;
  
  const content = isPolish ? 
    generatePolishReport(projectValue, totalSavings, roiPercentage, currency, timeline, projectType, annualSavings, fmt) :
    generateEnglishReport(projectValue, totalSavings, roiPercentage, currency, timeline, projectType, annualSavings, fmt);
  
  document.getElementById('report-content').innerHTML = content;
  document.getElementById('report-content').style.display = 'block';
  document.querySelector('.loading-state').style.display = 'none';
}

function generateEnglishReport(projectValue, totalSavings, roiPercentage, currency, timeline, projectType, annualSavings, fmt) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
    <!-- PAGE 1: COVER -->
    <div class="report-page">
      <div class="page-header">
        <h1 class="report-title">ROI ANALYSIS REPORT</h1>
        <p class="report-subtitle">Professional Cost Estimation Services</p>
        <p class="report-date">Generated: ${today}</p>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-box gray">
          <div class="metric-label">Project Value</div>
          <div class="metric-value dark">${fmt(projectValue)}</div>
        </div>
        <div class="metric-box green">
          <div class="metric-label">Estimated Savings</div>
          <div class="metric-value green">${fmt(totalSavings)}</div>
        </div>
        <div class="metric-box orange">
          <div class="metric-label">Return on Investment</div>
          <div class="metric-value orange">${roiPercentage}%</div>
        </div>
      </div>
      
      <h2 class="section-heading">Key Benefits</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>3-10 days turnaround vs 6-8 weeks traditional</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>±3-5% accuracy guaranteed</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>BSR compliance and regulatory expertise</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>20+ years international experience</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>2000+ projects completed globally</span>
        </div>
      </div>
      
      <div class="cta-box">
        <div class="cta-heading">YOUR POTENTIAL ANNUAL SAVINGS:</div>
        <div class="cta-value">${fmt(annualSavings)}</div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- PAGE 2: EXECUTIVE SUMMARY -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>EXECUTIVE SUMMARY</h1>
      </div>
      
      <h2 class="section-heading">Project Overview</h2>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Total Project Value:</strong> ${fmt(projectValue)}</p>
      <p><strong>Implementation Timeline:</strong> ${timeline}</p>
      
      <h2 class="section-heading">Financial Impact Analysis</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Cost Reduction Area</th>
            <th>Traditional Method</th>
            <th>With BIM Takeoff</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Estimation Time</td>
            <td>6-8 weeks</td>
            <td>3-10 days</td>
            <td>75% reduction</td>
          </tr>
          <tr>
            <td>Accuracy Rate</td>
            <td>±10-15%</td>
            <td>±3-5%</td>
            <td>67% improvement</td>
          </tr>
          <tr>
            <td>Rework Costs</td>
            <td>5-10% of budget</td>
            <td>&lt;2% of budget</td>
            <td>${fmt(projectValue * 0.06)}</td>
          </tr>
          <tr>
            <td>Change Orders</td>
            <td>15-20% typical</td>
            <td>5-8% typical</td>
            <td>${fmt(projectValue * 0.12)}</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="section-heading">Strategic Advantages</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Faster bid turnaround enables more tender opportunities</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Higher accuracy reduces contingency requirements</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Digital twin creation for facility management</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Improved stakeholder communication with 3D visualization</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Risk mitigation through clash detection and coordination</span>
        </div>
      </div>
      
      <div class="info-box green">
        <div class="info-box-title">RECOMMENDATION</div>
        <div class="info-box-content">
          Based on the analysis, implementing BIM Takeoff services will deliver an estimated ${roiPercentage}% ROI, 
          saving approximately ${fmt(totalSavings)} per project. With your project pipeline, this translates to 
          annual savings of ${fmt(annualSavings)} or more.
        </div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- PAGE 3: DETAILED BREAKDOWN -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>DETAILED SAVINGS ANALYSIS</h1>
      </div>
      
      <h2 class="section-heading">Cost Comparison Breakdown</h2>
      <div class="comparison-section">
        ${generateComparisonBar('Estimation Process', 25000, 8000, fmt)}
        ${generateComparisonBar('Rework & Corrections', 15000, 3000, fmt)}
        ${generateComparisonBar('Project Delays', 30000, 5000, fmt)}
        ${generateComparisonBar('Administrative Overhead', 12000, 4000, fmt)}
        ${generateComparisonBar('Quality Assurance', 8000, 2000, fmt)}
      </div>
      
      <h2 class="section-heading">Time Savings Analysis</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Traditional</th>
            <th>BIM Takeoff</th>
            <th>Time Saved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial Takeoff</td>
            <td>3 weeks</td>
            <td>2 days</td>
            <td style="color: #10B981; font-weight: 600;">19 days</td>
          </tr>
          <tr>
            <td>Verification</td>
            <td>2 weeks</td>
            <td>1 day</td>
            <td style="color: #10B981; font-weight: 600;">13 days</td>
          </tr>
          <tr>
            <td>Revisions</td>
            <td>1 week</td>
            <td>4 hours</td>
            <td style="color: #10B981; font-weight: 600;">6.5 days</td>
          </tr>
          <tr>
            <td>Final Review</td>
            <td>3 days</td>
            <td>2 hours</td>
            <td style="color: #10B981; font-weight: 600;">2.75 days</td>
          </tr>
        </tbody>
      </table>
      
      <div class="cta-box">
        <div class="cta-heading">TOTAL PROJECT SAVINGS</div>
        <div class="cta-value">${fmt(totalSavings)}</div>
        <p style="margin-top: 15px; font-size: 16px;">Equivalent to 41.25 days saved per project</p>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- PAGE 4: SERVICE DELIVERABLES -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>SERVICE DELIVERABLES</h1>
      </div>
      
      <h2 class="section-heading">Core Service Components</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>3D BIM Model Creation:</strong> Complete digital twin of your project with LOD 300-400 accuracy</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Quantity Takeoff Reports:</strong> Detailed Bills of Quantities in your preferred format (Excel, CostX, Buildsoft)</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Clash Detection Analysis:</strong> Identify and resolve conflicts before construction begins</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>5D Cost Integration:</strong> Real-time cost tracking linked to 3D model elements</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Change Management:</strong> Track and quantify all design changes with cost implications</span>
        </div>
      </div>
      
      <h2 class="section-heading">Implementation Timeline: ${timeline}</h2>
      <div class="timeline-phase">
        <div class="timeline-week">Week 1-2</div>
        <div class="timeline-task">Initial setup and model creation</div>
        <div class="timeline-status">Quick Start</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Week 3-4</div>
        <div class="timeline-task">Quantity extraction and verification</div>
        <div class="timeline-status">Core Delivery</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Week 5-6</div>
        <div class="timeline-task">Quality assurance and reporting</div>
        <div class="timeline-status">Final Review</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Ongoing</div>
        <div class="timeline-task">Change management and updates</div>
        <div class="timeline-status">Continuous Support</div>
      </div>
      
      <h2 class="section-heading">Included Support Services</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>24/7 project portal access</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Dedicated project manager</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Weekly progress reports</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Unlimited revisions during project</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Post-project support for 30 days</span>
        </div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- PAGE 5: NEXT STEPS -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>NEXT STEPS</h1>
      </div>
      
      <h2 class="section-heading">Recommended Immediate Actions</h2>
      
      <div class="action-step">
        <div class="action-number">1</div>
        <div class="action-content">
          <div class="action-title">Schedule Discovery Call</div>
          <div class="action-detail">Book a 30-minute consultation to discuss your specific project requirements</div>
          <div class="action-timeline">This Week</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">2</div>
        <div class="action-content">
          <div class="action-title">Project Assessment</div>
          <div class="action-detail">Share project drawings for a detailed feasibility assessment</div>
          <div class="action-timeline">Week 2</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">3</div>
        <div class="action-content">
          <div class="action-title">Pilot Project</div>
          <div class="action-detail">Start with a smaller project to demonstrate value and ROI</div>
          <div class="action-timeline">Week 3-4</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">4</div>
        <div class="action-content">
          <div class="action-title">Full Implementation</div>
          <div class="action-detail">Scale to full project portfolio based on pilot results</div>
          <div class="action-timeline">Month 2+</div>
        </div>
      </div>
      
      <div class="contact-box">
        <div class="contact-heading">Ready to Save ${fmt(totalSavings)}?</div>
        <div class="contact-subheading">Contact our team today:</div>
        <div class="contact-details">info@bimtakeoff.com | +48 508 209 313</div>
        <div class="contact-details">www.bimtakeoff.com</div>
        <div class="cta-button">BOOK YOUR FREE CONSULTATION</div>
      </div>
      
      <div class="page-footer">
        © 2024 BIM Takeoff. All rights reserved.<br>
        This report is confidential and prepared specifically for your organization.
      </div>
    </div>
  `;
}

function generatePolishReport(projectValue, totalSavings, roiPercentage, currency, timeline, projectType, annualSavings, fmt) {
  const today = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
    <!-- STRONA 1: OKŁADKA -->
    <div class="report-page">
      <div class="page-header">
        <h1 class="report-title">RAPORT ANALIZY ROI</h1>
        <p class="report-subtitle">Profesjonalna Wycena Kosztorysowa</p>
        <p class="report-date">Wygenerowano: ${today}</p>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-box gray">
          <div class="metric-label">Wartość Projektu</div>
          <div class="metric-value dark">${fmt(projectValue)}</div>
        </div>
        <div class="metric-box green">
          <div class="metric-label">Szacowane Oszczędności</div>
          <div class="metric-value green">${fmt(totalSavings)}</div>
        </div>
        <div class="metric-box orange">
          <div class="metric-label">Zwrot z Inwestycji</div>
          <div class="metric-value orange">${roiPercentage}%</div>
        </div>
      </div>
      
      <h2 class="section-heading">Kluczowe Korzyści</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>3-10 dni realizacji vs 6-8 tygodni tradycyjnie</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Gwarantowana dokładność ±3-5%</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Zgodność z BSR i wymogami prawnymi</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>20+ lat międzynarodowego doświadczenia</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>2000+ zrealizowanych projektów globalnie</span>
        </div>
      </div>
      
      <div class="cta-box">
        <div class="cta-heading">TWOJE POTENCJALNE ROCZNE OSZCZĘDNOŚCI:</div>
        <div class="cta-value">${fmt(annualSavings)}</div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- STRONA 2: PODSUMOWANIE WYKONAWCZE -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>PODSUMOWANIE WYKONAWCZE</h1>
      </div>
      
      <h2 class="section-heading">Przegląd Projektu</h2>
      <p><strong>Typ Projektu:</strong> ${projectType}</p>
      <p><strong>Całkowita Wartość Projektu:</strong> ${fmt(projectValue)}</p>
      <p><strong>Czas Wdrożenia:</strong> ${timeline}</p>
      
      <h2 class="section-heading">Analiza Wpływu Finansowego</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Obszar Redukcji Kosztów</th>
            <th>Metoda Tradycyjna</th>
            <th>Z BIM Takeoff</th>
            <th>Oszczędności</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Czas Wyceny</td>
            <td>6-8 tygodni</td>
            <td>3-10 dni</td>
            <td>75% redukcji</td>
          </tr>
          <tr>
            <td>Dokładność</td>
            <td>±10-15%</td>
            <td>±3-5%</td>
            <td>67% poprawa</td>
          </tr>
          <tr>
            <td>Koszty Poprawek</td>
            <td>5-10% budżetu</td>
            <td>&lt;2% budżetu</td>
            <td>${fmt(projectValue * 0.06)}</td>
          </tr>
          <tr>
            <td>Zmiany w Projekcie</td>
            <td>15-20% typowo</td>
            <td>5-8% typowo</td>
            <td>${fmt(projectValue * 0.12)}</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="section-heading">Przewagi Strategiczne</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Szybsze przygotowanie ofert umożliwia więcej przetargów</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Wyższa dokładność redukuje wymagane rezerwy</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Tworzenie cyfrowego bliźniaka do zarządzania obiektem</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Lepsza komunikacja z interesariuszami dzięki wizualizacji 3D</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span>Ograniczenie ryzyka poprzez wykrywanie kolizji</span>
        </div>
      </div>
      
      <div class="info-box green">
        <div class="info-box-title">REKOMENDACJA</div>
        <div class="info-box-content">
          Na podstawie analizy, wdrożenie usług BIM Takeoff przyniesie szacowany ${roiPercentage}% zwrot z inwestycji, 
          oszczędzając około ${fmt(totalSavings)} na projekt. Przy Państwa portfolio projektów, przekłada się to na 
          roczne oszczędności ${fmt(annualSavings)} lub więcej.
        </div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- STRONA 3: SZCZEGÓŁOWA ANALIZA -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>SZCZEGÓŁOWA ANALIZA OSZCZĘDNOŚCI</h1>
      </div>
      
      <h2 class="section-heading">Zestawienie Porównawcze Kosztów</h2>
      <div class="comparison-section">
        ${generateComparisonBar('Proces Wyceny', 25000, 8000, fmt)}
        ${generateComparisonBar('Poprawki i Korekty', 15000, 3000, fmt)}
        ${generateComparisonBar('Opóźnienia Projektu', 30000, 5000, fmt)}
        ${generateComparisonBar('Koszty Administracyjne', 12000, 4000, fmt)}
        ${generateComparisonBar('Kontrola Jakości', 8000, 2000, fmt)}
      </div>
      
      <h2 class="section-heading">Analiza Oszczędności Czasu</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Etap</th>
            <th>Tradycyjnie</th>
            <th>BIM Takeoff</th>
            <th>Czas Zaoszczędzony</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wstępny Przedmiar</td>
            <td>3 tygodnie</td>
            <td>2 dni</td>
            <td style="color: #10B981; font-weight: 600;">19 dni</td>
          </tr>
          <tr>
            <td>Weryfikacja</td>
            <td>2 tygodnie</td>
            <td>1 dzień</td>
            <td style="color: #10B981; font-weight: 600;">13 dni</td>
          </tr>
          <tr>
            <td>Poprawki</td>
            <td>1 tydzień</td>
            <td>4 godziny</td>
            <td style="color: #10B981; font-weight: 600;">6,5 dnia</td>
          </tr>
          <tr>
            <td>Przegląd Końcowy</td>
            <td>3 dni</td>
            <td>2 godziny</td>
            <td style="color: #10B981; font-weight: 600;">2,75 dnia</td>
          </tr>
        </tbody>
      </table>
      
      <div class="cta-box">
        <div class="cta-heading">CAŁKOWITE OSZCZĘDNOŚCI PROJEKTU</div>
        <div class="cta-value">${fmt(totalSavings)}</div>
        <p style="margin-top: 15px; font-size: 16px;">Równowartość 41,25 dni zaoszczędzonych na projekt</p>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- STRONA 4: ZAKRES USŁUG -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>ZAKRES USŁUG</h1>
      </div>
      
      <h2 class="section-heading">Główne Komponenty Usługi</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Tworzenie Modelu BIM 3D:</strong> Kompletny cyfrowy bliźniak projektu z dokładnością LOD 300-400</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Raporty Przedmiarowe:</strong> Szczegółowe zestawienia ilościowe w preferowanym formacie (Excel, CostX, Buildsoft)</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Analiza Wykrywania Kolizji:</strong> Identyfikacja i rozwiązanie konfliktów przed rozpoczęciem budowy</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Integracja Kosztów 5D:</strong> Śledzenie kosztów w czasie rzeczywistym powiązane z elementami modelu 3D</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">•</span>
          <span><strong>Zarządzanie Zmianami:</strong> Śledzenie i kwantyfikacja wszystkich zmian projektowych z implikacjami kosztowymi</span>
        </div>
      </div>
      
      <h2 class="section-heading">Harmonogram Wdrożenia: ${timeline}</h2>
      <div class="timeline-phase">
        <div class="timeline-week">Tydzień 1-2</div>
        <div class="timeline-task">Wstępna konfiguracja i tworzenie modelu</div>
        <div class="timeline-status">Szybki Start</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Tydzień 3-4</div>
        <div class="timeline-task">Ekstrakcja ilości i weryfikacja</div>
        <div class="timeline-status">Główna Dostawa</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Tydzień 5-6</div>
        <div class="timeline-task">Kontrola jakości i raportowanie</div>
        <div class="timeline-status">Przegląd Końcowy</div>
      </div>
      <div class="timeline-phase">
        <div class="timeline-week">Na bieżąco</div>
        <div class="timeline-task">Zarządzanie zmianami i aktualizacje</div>
        <div class="timeline-status">Ciągłe Wsparcie</div>
      </div>
      
      <h2 class="section-heading">Zawarte Usługi Wsparcia</h2>
      <div class="benefits-list">
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Dostęp do portalu projektu 24/7</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Dedykowany kierownik projektu</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Tygodniowe raporty postępu</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Nieograniczone poprawki podczas projektu</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">✓</span>
          <span>Wsparcie po zakończeniu projektu przez 30 dni</span>
        </div>
      </div>
      
      <div class="page-footer">
        www.bimtakeoff.com | info@bimtakeoff.com | +48 508 209 313
      </div>
    </div>

    <!-- STRONA 5: NASTĘPNE KROKI -->
    <div class="report-page">
      <div class="page-header-simple">
        <h1>NASTĘPNE KROKI</h1>
      </div>
      
      <h2 class="section-heading">Zalecane Działania Natychmiastowe</h2>
      
      <div class="action-step">
        <div class="action-number">1</div>
        <div class="action-content">
          <div class="action-title">Umów Rozmowę Odkrywczą</div>
          <div class="action-detail">Zarezerwuj 30-minutową konsultację, aby omówić konkretne wymagania projektu</div>
          <div class="action-timeline">Ten Tydzień</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">2</div>
        <div class="action-content">
          <div class="action-title">Ocena Projektu</div>
          <div class="action-detail">Udostępnij rysunki projektowe do szczegółowej oceny wykonalności</div>
          <div class="action-timeline">Tydzień 2</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">3</div>
        <div class="action-content">
          <div class="action-title">Projekt Pilotażowy</div>
          <div class="action-detail">Rozpocznij od mniejszego projektu, aby zademonstrować wartość i ROI</div>
          <div class="action-timeline">Tydzień 3-4</div>
        </div>
      </div>
      
      <div class="action-step">
        <div class="action-number">4</div>
        <div class="action-content">
          <div class="action-title">Pełne Wdrożenie</div>
          <div class="action-detail">Skaluj do pełnego portfolio projektów na podstawie wyników pilotażu</div>
          <div class="action-timeline">Miesiąc 2+</div>
        </div>
      </div>
      
      <div class="contact-box">
        <div class="contact-heading">Gotowy zaoszczędzić ${fmt(totalSavings)}?</div>
        <div class="contact-subheading">Skontaktuj się z naszym zespołem już dziś:</div>
        <div class="contact-details">info@bimtakeoff.com | +48 508 209 313</div>
        <div class="contact-details">www.bimtakeoff.com/pl</div>
        <div class="cta-button">ZAREZERWUJ BEZPŁATNĄ KONSULTACJĘ</div>
      </div>
      
      <div class="page-footer">
        © 2024 BIM Takeoff. Wszelkie prawa zastrzeżone.<br>
        Raport jest poufny i przygotowany specjalnie dla Państwa organizacji.
      </div>
    </div>
  `;
}

function generateComparisonBar(label, traditional, bimtakeoff, fmt) {
  const maxValue = 35000;
  const tradWidth = (traditional / maxValue) * 100;
  const bimWidth = (bimtakeoff / maxValue) * 100;
  
  return `
    <div class="comparison-item">
      <div class="comparison-label">${label}</div>
      <div class="comparison-bars">
        <div class="comparison-bar">
          <div class="bar-fill gray" style="width: ${tradWidth}%;">Traditional</div>
          <div class="bar-value">${fmt(traditional)}</div>
        </div>
        <div class="comparison-bar">
          <div class="bar-fill green" style="width: ${bimWidth}%;">BIM Takeoff</div>
          <div class="bar-value">${fmt(bimtakeoff)}</div>
        </div>
      </div>
    </div>
  `;
}

console.log('✅ ROI Report Generator loaded successfully');
