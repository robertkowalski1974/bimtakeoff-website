#!/usr/bin/env python3
"""
Complete Sitemap Generator for BIM Takeoff Website
===================================================

This script generates a complete sitemap.xml with all pages including:
- New service pages (Automated Quantity Takeoff)
- Both English and Polish versions
- Proper priority and change frequency settings

Author: BIM Takeoff SEO Implementation
Date: November 7, 2025
"""

from datetime import datetime
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

BASE_URL = "https://robertkowalski1974.github.io/bimtakeoff-website"

# Define all pages with their properties
PAGES = [
    # English Pages
    {'url': '/', 'priority': '1.0', 'changefreq': 'weekly', 'lang': 'en'},
    {'url': '/contact/', 'priority': '0.8', 'changefreq': 'monthly', 'lang': 'en'},
    
    # English Services
    {'url': '/services/cost-estimation-budget-planning/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'en'},
    {'url': '/services/trade-specific-specialist-services/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'en'},
    {'url': '/services/automated-quantity-takeoff/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'en'},
    
    # Polish Pages
    {'url': '/pl/', 'priority': '1.0', 'changefreq': 'weekly', 'lang': 'pl'},
    {'url': '/pl/kontakt/', 'priority': '0.8', 'changefreq': 'monthly', 'lang': 'pl'},
    
    # Polish Services
    {'url': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'pl'},
    {'url': '/pl/uslugi/specjalistyczne-branzy-budowlane/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'pl'},
    {'url': '/pl/uslugi/automatyczny-przedmiar-obmiar/', 'priority': '0.9', 'changefreq': 'monthly', 'lang': 'pl'},
]

def generate_sitemap():
    """Generate complete sitemap.xml"""
    
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    sitemap.append('        xmlns:xhtml="http://www.w3.org/1999/xhtml">')
    
    for page in PAGES:
        url = BASE_URL + page['url']
        
        sitemap.append('  <url>')
        sitemap.append(f'    <loc>{url}</loc>')
        sitemap.append(f'    <lastmod>{current_date}</lastmod>')
        sitemap.append(f'    <changefreq>{page["changefreq"]}</changefreq>')
        sitemap.append(f'    <priority>{page["priority"]}</priority>')
        sitemap.append('  </url>')
    
    sitemap.append('</urlset>')
    
    return '\n'.join(sitemap)

def main():
    """Main execution"""
    
    logger.info("=" * 70)
    logger.info("BIM TAKEOFF - Sitemap Generator")
    logger.info("=" * 70)
    
    # Generate sitemap
    sitemap_content = generate_sitemap()
    
    # Write to docs directory (GitHub Pages serves from /docs)
    output_path = Path("docs/sitemap.xml")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    logger.info(f"✓ Sitemap generated: {output_path}")
    logger.info(f"✓ Total URLs: {len(PAGES)}")
    logger.info(f"✓ Last modified: {datetime.now().strftime('%Y-%m-%d')}")
    logger.info("")
    logger.info("Sitemap includes:")
    logger.info("  - Homepage (EN + PL)")
    logger.info("  - Contact pages (EN + PL)")
    logger.info("  - Cost Estimation & Budget Planning (EN + PL)")
    logger.info("  - Trade-Specific Services (EN + PL)")
    logger.info("  - Automated Quantity Takeoff (EN + PL) ⭐ NEW")
    logger.info("")
    logger.info("Sitemap URL: https://robertkowalski1974.github.io/bimtakeoff-website/sitemap.xml")
    logger.info("=" * 70)

if __name__ == "__main__":
    main()
