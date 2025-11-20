# COMPREHENSIVE SEO IMPLEMENTATION PROMPT FOR BIM TAKEOFF BILINGUAL QUARTO WEBSITE

## INSTRUCTIONS FOR USE
Copy the entire "PROMPT TO USE IN NEW CHAT" section below and paste it into a new Claude conversation. This contains all context, research findings, and implementation requirements.

---

## PROMPT TO USE IN NEW CHAT

I need your help implementing a comprehensive SEO strategy for my bilingual Quarto website. Below is complete context about the project, research findings, and what needs to be implemented.

### PROJECT CONTEXT

**Website Details:**
- Technology: Quarto static site generator (version 1.4+)
- Hosting: GitHub Pages
- Repository: robertkowalski1974/bimtakeoff-website
- Current URL: https://robertkowalski1974.github.io/bimtakeoff-website/
- Future custom domain: bimtakeoff.com (not yet configured)

**Languages:**
- English (EN): Root directory - target markets: UK, Australia
- Polish (PL): /pl/ subdirectory - target market: Poland

**Project Location:**
- Local Mac machine: `/Users/robertkowalski/Documents/bimtakeoff-website`
- All implementation files should be created here
- Archive/documentation files: `/Users/robertkowalski/Documents/bimtakeoff-website/_archive/`

**Current File Structure:**
```
bimtakeoff-website/
├── _quarto.yml                 # Main English site configuration
├── index.qmd                   # English homepage
├── services/                   # English service pages
├── projects/                   # Case studies
├── about/                      # About pages
├── contact/                    # Contact pages
├── images/                     # Shared images (EN + PL)
├── css/                        # Stylesheets
├── js/                         # JavaScript files
├── pl/                         # Polish version
│   ├── _quarto.yml            # Polish site configuration
│   ├── index.qmd              # Polish homepage
│   └── uslugi/                # Polish service pages
├── docs/                       # Built site (GitHub Pages serves from here)
└── _archive/                   # Documentation and archive files
```

**Brand Identity:**
- Company: BIM Takeoff
- Industry: BIM quantity surveying, 5D cost estimation, construction takeoff services
- Brand colors: Orange #FF9900, Charcoal #2C2C2C, White #FFFFFF
- Current analytics: Google Tag Manager GTM-PLB9BH8W (already integrated)

**Current State:**
- ✅ Bilingual structure implemented (EN root + PL subdirectory)
- ✅ GTM integrated with container GTM-PLB9BH8W
- ✅ Basic content in both languages
- ✅ Language switcher working
- ❌ No hreflang tags
- ❌ No canonical tags
- ❌ No structured data (Schema.org)
- ❌ No sitemap optimization
- ❌ No robots.txt
- ❌ Images not optimized
- ❌ No GA4 language tracking configured
- ❌ Not verified in Google Search Console

### RESEARCH FINDINGS SUMMARY

**Technical SEO Priorities:**
1. Subdirectory structure (/pl/) is optimal for multilingual SEO - consolidates domain authority
2. Hreflang tags are CRITICAL for bilingual sites - must be bidirectional
3. Each language needs self-referencing canonical tags (never cross-language canonicals)
4. Schema.org markup significantly improves visibility (ProfessionalService, Service, FAQPage)
5. Quarto provides good SEO foundations but requires manual hreflang/schema implementation

**Keyword Opportunities:**

**English (UK/Australia):**
- "BIM quantity surveying services" - Medium competition
- "5D BIM cost estimation" - 500-2,000 monthly searches, growing 30% YoY
- "automated quantity takeoff" - Technical differentiator
- "construction cost consultant [city]" - Local targeting
- "BIM coordination services" - Lower competition

**Polish (BIGGEST OPPORTUNITY):**
- "kosztorysowanie BIM" - Low competition, growing 40% annually
- "przedmiar budowlany" - Traditional term with BIM opportunity
- "BIM 5D" - Technical term, almost zero quality Polish content
- "usługi kosztorysowe" - Professional service term
- "wycena kosztów budowy" - Broader market term
- **First-mover advantage in Polish market** - most competitors only have auto-translated content

**Performance Requirements:**
- LCP (Largest Contentful Paint): < 2.5 seconds
- INP (Interaction to Next Paint): < 200 milliseconds
- CLS (Cumulative Layout Shift): < 0.1
- Images: Convert to WebP, implement lazy loading
- Core Web Vitals directly impact rankings

### IMPLEMENTATION REQUIREMENTS

I need you to help me implement the following, **creating all necessary files with complete, production-ready code**:

#### PHASE 1: TECHNICAL FOUNDATION (Week 1-2) - HIGHEST PRIORITY

**1. Update _quarto.yml Configuration**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/_quarto.yml`
- Add: site-url, open-graph settings, twitter-card settings
- Configure: post-render scripts for hreflang and sitemap cleanup
- Include: GTM integration in html include-in-header

**2. Create Hreflang Implementation Script**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/scripts/add-hreflang.py`
- Requirements:
  - Bidirectional hreflang tags (EN ↔ PL)
  - Self-referencing tag for each page
  - x-default pointing to English version
  - Absolute URLs (not relative)
  - Process all HTML files in _site directory after render
- Must handle: index.qmd → index.html mapping, /pl/ subdirectory structure

**3. Create Canonical Tag Script** (if using pre-Quarto 1.4, otherwise use native support)
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/scripts/add-canonicals.py`
- Requirements:
  - Self-referencing canonical for each page
  - Extract URLs from sitemap.xml
  - Insert canonical tags in HTML head
  - NEVER cross-language canonicals

**4. Create Sitemap Cleanup Script**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/scripts/clean-sitemap.py`
- Requirements:
  - Remove /index.html from URLs
  - Ensure consistent trailing slashes
  - Keep unified sitemap (don't separate by language)

**5. Create robots.txt**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/robots.txt`
- Requirements:
  - Allow both / and /pl/
  - Reference sitemap
  - Block any draft/development directories

**6. Create Structured Data Templates**

**Organization Schema (Global):**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/includes/structured-data.html`
- Type: ProfessionalService
- Include: name, description, url, logo, contact info, areas served (GB, AU, PL), services offered

**Service Schema Template:**
- For use in service page frontmatter
- Type: Service
- Include: serviceType, provider, areaServed, description, offers

**FAQPage Schema Template:**
- For case study pages
- Type: FAQPage
- Include: questions and answers about projects/services

**7. Update Polish _quarto.yml**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/pl/_quarto.yml`
- Ensure: Proper site-url with /pl/ path
- Configure: Same post-render scripts
- Verify: Polish language metadata

#### PHASE 2: ANALYTICS SETUP (Week 2)

**8. GA4 Language Tracking Configuration**
- Create GTM variable for language detection (Page Language)
- Configure GA4 custom dimension for page_language
- Set up language switcher click tracking
- Configure form submission tracking (generate_lead conversion)
- Track phone click events
- Track email click events

Provide:
- Step-by-step GTM configuration instructions
- GA4 custom dimension setup
- Event tracking specifications

**9. Google Search Console Setup Guide**
- Verification method for GitHub Pages (HTML file)
- Sitemap submission process
- Language performance monitoring setup
- Hreflang validation steps

#### PHASE 3: CONTENT OPTIMIZATION (Week 3-4)

**10. Page Optimization Templates**

Create templates with proper frontmatter for:

**Service Page Template (English):**
```yaml
---
title: "[Service] | BIM Takeoff"
description: "150-160 character meta description with primary keyword"
canonical-url: "https://robertkowalski1974.github.io/bimtakeoff-website/services/[slug]/"
image: "/images/services/[service]-og.png"
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "[Service Name]",
          ...
        }
        </script>
---
```

**Service Page Template (Polish):**
Similar structure but with:
- Polish title and description
- Polish canonical URL with /pl/ prefix
- Polish service schema
- Proper Polish diacritics

**Case Study Template:**
- Include FAQPage schema
- ROI-focused content structure
- Image optimization guidelines

**Location Page Template:**
- LocalBusiness schema
- City-specific keyword targeting
- Google Business Profile integration points

**11. Image Optimization Script**
- Location: `/Users/robertkowalski/Documents/bimtakeoff-website/scripts/optimize-images.py`
- Requirements:
  - Convert JPG/PNG to WebP and AVIF
  - Maintain quality (WebP: 85, AVIF: 50)
  - Report file size savings
  - Process /images/ directory recursively

**12. Content Checklist for Each Page**
Provide checklist covering:
- Title tag optimization (50-60 chars, keyword at start)
- Meta description (150-160 chars, compelling CTA)
- H1/H2/H3 hierarchy
- Image alt text (descriptive, < 125 chars)
- Internal linking (3-5 per page)
- Mobile responsiveness
- Core Web Vitals compliance

#### PHASE 4: DEPLOYMENT & MONITORING (Week 5-6)

**13. Deployment Script Update**
- Update existing: `/Users/robertkowalski/Documents/bimtakeoff-website/deploy-bilingual.sh`
- Add: Post-render script execution
- Add: Image optimization step
- Add: Validation checks before push

**14. Pre-Launch Checklist**
Create comprehensive checklist covering:
- Technical SEO (hreflang, canonical, schema, sitemap, robots.txt)
- On-page SEO (titles, descriptions, headers, images, links)
- Performance (Core Web Vitals, image optimization, lazy loading)
- Analytics (GTM, GA4, GSC, conversion tracking)
- Content quality (both languages)

**15. Monitoring Dashboard Setup**
- Google Looker Studio template connecting GSC + GA4
- Language-specific performance tracking
- Conversion tracking by language
- Keyword ranking monitoring
- Core Web Vitals monitoring

**16. Monthly Reporting Template**
Structure with sections:
- Executive summary (traffic, conversions by language)
- Traffic analysis (country, device, source)
- Keyword performance (top 20 by language)
- Content performance (top pages)
- Technical health (CWV, indexing, errors)

### SPECIFIC REQUIREMENTS FOR ALL CODE/SCRIPTS

**For Python Scripts:**
- Python 3.8+ compatibility
- Include all necessary imports
- Add error handling
- Include progress logging
- Make executable (chmod +x)
- Add shebang (#!/usr/bin/env python3)
- Include docstrings explaining functionality

**For YAML Configuration:**
- Proper indentation (2 spaces)
- Complete configuration (no placeholders)
- Comments explaining each section
- Absolute URLs where required
- Proper escaping for special characters

**For Schema Markup:**
- Valid JSON-LD format
- All required properties included
- Absolute URLs for images/pages
- Test with Google Rich Results Test

**For Shell Scripts:**
- Bash compatibility
- Error checking after each step
- User feedback (echo statements)
- Make executable (chmod +x)

### POLISH CONTENT SPECIFIC REQUIREMENTS

**Critical Rules:**
- NEVER auto-translate - provide templates that require professional translation
- Always use proper Polish diacritics: ą, ć, ę, ł, ń, ó, ś, ź, ż
- Polish URLs should use Polish slugs: /pl/uslugi/ not /pl/services/
- Meta descriptions ~20% longer than English (Polish words are longer)
- Different keyword targeting than literal English translations
- Formal address forms (Pan/Pani) for professional context

**Polish Keywords to Target:**
- kosztorysowanie BIM
- przedmiar budowlany
- BIM 5D
- usługi kosztorysowe
- wycena kosztów budowy
- automatyczne przedmiarowanie
- zarządzanie kosztami budowy

### IMPLEMENTATION APPROACH

Please help me implement this in phases:

**IMMEDIATE (Today/This Week):**
1. Create all Python scripts (hreflang, canonical, sitemap cleanup, image optimization)
2. Update _quarto.yml with proper configuration
3. Create robots.txt
4. Create structured data templates
5. Make scripts executable and test them

**SHORT-TERM (Week 2):**
1. Configure GA4 language tracking (provide step-by-step GTM instructions)
2. Set up Google Search Console (provide verification guide)
3. Create page templates for services/locations/case studies
4. Create pre-launch checklist

**MEDIUM-TERM (Week 3-4):**
1. Content optimization templates and guidelines
2. Deploy scripts and verify functionality
3. Monitor initial indexing and traffic

**ONGOING:**
1. Content calendar recommendations
2. Monthly reporting structure
3. Optimization recommendations based on data

### OUTPUT FORMAT REQUIREMENTS

For each script/configuration file you create:
1. **Provide complete, production-ready code** (no placeholders or TODOs)
2. **Include file path** where it should be saved
3. **Explain what the code does** and why
4. **Provide testing instructions** to verify it works
5. **Include any dependencies** that need to be installed (pip install, etc.)

For GTM/GA4 configurations:
1. **Step-by-step instructions** with screenshots descriptions
2. **Exact values** to enter in each field
3. **Verification steps** to confirm it's working

For templates:
1. **Complete YAML frontmatter** with all required fields
2. **Content structure** with header hierarchy
3. **Example content** showing keyword placement
4. **Both English and Polish versions**

### QUESTIONS TO ADDRESS

As you implement, please also answer:

1. Should I use Quarto 1.4+ native canonical support or post-render script?
2. How should I handle the transition from GitHub Pages URL to custom domain (bimtakeoff.com) later?
3. What's the best way to version control the docs/ directory (built site)?
4. Should I create separate GA4 views/properties for EN and PL or use one with custom dimensions?
5. How frequently should post-render scripts run (every render, daily, weekly)?
6. Any Quarto-specific performance optimizations I should implement?

### SUCCESS CRITERIA

By the end of implementation, I should have:
- ✅ All pages with proper hreflang, canonical, and schema markup
- ✅ Sitemap optimized and submitted to GSC
- ✅ robots.txt properly configured
- ✅ Images optimized (WebP format, lazy loading)
- ✅ GA4 tracking languages separately with custom dimension
- ✅ Form conversions tracking properly
- ✅ GSC verified and monitoring both language versions
- ✅ Pre-launch checklist 100% complete
- ✅ First 5 service pages published and optimized (EN + PL)
- ✅ Core Web Vitals all green on key pages
- ✅ Comprehensive documentation for ongoing maintenance

### ADDITIONAL CONTEXT

**My technical skill level:**
- Comfortable with: Terminal, Git, basic Python, HTML/CSS
- Learning: Advanced Python scripting, GTM configuration
- Need detailed explanations for: Complex regex, advanced Quarto features

**Time available:**
- Can dedicate 2-3 hours per day to implementation
- Want to launch optimized site within 2-3 weeks
- Prefer phased approach with quick wins first

**Priority order:**
1. Technical foundation (hreflang, canonical, schema) - HIGHEST
2. Analytics setup (must track from day 1)
3. Content optimization templates
4. Ongoing monitoring and reporting

---

Please start by:
1. Confirming you understand the full scope
2. Recommending which Phase 1 items to tackle first
3. Creating the first set of critical scripts (hreflang + canonical + sitemap cleanup)
4. Providing updated _quarto.yml configuration

I'm ready to implement immediately. Let's build an SEO-optimized bilingual Quarto website that dominates UK, Australian, and Polish BIM markets!
