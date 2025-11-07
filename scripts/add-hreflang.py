#!/usr/bin/env python3
"""
Hreflang Implementation Script for BIM Takeoff Bilingual Website
=================================================================

This script adds bidirectional hreflang tags to all HTML pages in the _site directory.
It ensures proper language targeting for Google Search across EN (UK/AU) and PL markets.

Key Features:
- Bidirectional hreflang tags (EN ↔ PL)
- Self-referencing tag for each page
- x-default pointing to English version
- Absolute URLs (required by Google)
- Handles index.html mapping correctly

Usage:
    python3 scripts/add-hreflang.py

Author: BIM Takeoff SEO Implementation
Date: 2025-01-01
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
SITE_DIR = Path("_site")  # Quarto builds to _site by default
BASE_URL = "https://robertkowalski1974.github.io/bimtakeoff-website"

# Language configuration
LANGUAGES = {
    'en': {
        'code': 'en-GB',  # Using British English as primary
        'path_prefix': '',
        'alternate': 'pl'
    },
    'pl': {
        'code': 'pl',
        'path_prefix': '/pl',
        'alternate': 'en'
    }
}


def normalize_url(file_path: Path, base_dir: Path) -> str:
    """
    Convert file path to normalized URL.
    
    Args:
        file_path: Path to HTML file
        base_dir: Base directory (_site)
    
    Returns:
        Normalized URL with trailing slash
    
    Example:
        _site/services/index.html -> /services/
        _site/pl/uslugi/index.html -> /pl/uslugi/
        _site/index.html -> /
    """
    relative_path = file_path.relative_to(base_dir)
    
    # Convert to URL path
    url_path = str(relative_path).replace('\\', '/')
    
    # Remove index.html
    url_path = url_path.replace('/index.html', '/')
    url_path = url_path.replace('index.html', '/')
    
    # Ensure leading slash
    if not url_path.startswith('/'):
        url_path = '/' + url_path
    
    # Ensure trailing slash for directories
    if not url_path.endswith('.html') and not url_path.endswith('/'):
        url_path += '/'
    
    return url_path


def get_alternate_url(current_url: str, current_lang: str) -> str:
    """
    Generate the alternate language URL for a given page.
    
    Rules:
    - EN page /services/ → PL page /pl/uslugi/
    - PL page /pl/uslugi/ → EN page /services/
    - Root / → /pl/
    
    Args:
        current_url: Current page URL
        current_lang: Current language code ('en' or 'pl')
    
    Returns:
        Alternate language URL or empty string if no direct translation exists
    """
    
    # URL mapping between English and Polish pages
    url_mappings = {
        # Homepage
        '/': '/pl/',
        '/pl/': '/',
        
        # Services
        '/services/': '/pl/uslugi/',
        '/services/cost-estimation-budget-planning/': '/pl/uslugi/kosztorysowanie-i-planowanie-budzetu/',
        '/services/trade-specific-specialist-services/': '/pl/uslugi/specjalistyczne-branzy-budowlane/',
        '/services/automated-quantity-takeoff/': '/pl/uslugi/automatyczny-przedmiar-obmiar/',
        '/services/quantity-surveying/': '/pl/uslugi/kosztorysowanie/',
        '/services/bim-coordination/': '/pl/uslugi/koordynacja-bim/',
        '/services/cost-estimation/': '/pl/uslugi/wycena-kosztow/',
        
        # About
        '/about/': '/pl/o-nas/',
        '/about/team/': '/pl/o-nas/zespol/',
        
        # Contact
        '/contact/': '/pl/kontakt/',
        
        # Projects/Case Studies
        '/projects/': '/pl/projekty/',
    }
    
    # Create reverse mapping for PL → EN
    reverse_mappings = {v: k for k, v in url_mappings.items()}
    
    if current_lang == 'en':
        return url_mappings.get(current_url, '')
    else:
        return reverse_mappings.get(current_url, '')


def create_hreflang_tags(current_url: str, current_lang: str) -> list:
    """
    Create all hreflang tags for a page.
    
    Args:
        current_url: Current page URL path
        current_lang: Current language ('en' or 'pl')
    
    Returns:
        List of hreflang link tags as strings
    """
    tags = []
    
    # Get absolute URL
    current_absolute = BASE_URL + current_url
    
    # Self-referencing hreflang
    lang_code = LANGUAGES[current_lang]['code']
    tags.append(f'<link rel="alternate" hreflang="{lang_code}" href="{current_absolute}" />')
    
    # Alternate language hreflang
    alternate_lang = LANGUAGES[current_lang]['alternate']
    alternate_url = get_alternate_url(current_url, current_lang)
    
    if alternate_url:
        alternate_absolute = BASE_URL + alternate_url
        alternate_code = LANGUAGES[alternate_lang]['code']
        tags.append(f'<link rel="alternate" hreflang="{alternate_code}" href="{alternate_absolute}" />')
        
        # x-default always points to English version
        if current_lang == 'en':
            tags.append(f'<link rel="alternate" hreflang="x-default" href="{current_absolute}" />')
        else:
            en_url = get_alternate_url(current_url, 'pl')
            if en_url:
                en_absolute = BASE_URL + en_url
                tags.append(f'<link rel="alternate" hreflang="x-default" href="{en_absolute}" />')
    else:
        # No alternate exists - only self-referencing and x-default
        if current_lang == 'en':
            tags.append(f'<link rel="alternate" hreflang="x-default" href="{current_absolute}" />')
    
    return tags


def detect_language(file_path: Path, base_dir: Path) -> str:
    """
    Detect page language from file path.
    
    Args:
        file_path: Path to HTML file
        base_dir: Base directory
    
    Returns:
        Language code ('en' or 'pl')
    """
    relative_path = str(file_path.relative_to(base_dir))
    
    if relative_path.startswith('pl/') or relative_path.startswith('pl\\'):
        return 'pl'
    else:
        return 'en'


def process_html_file(file_path: Path, base_dir: Path) -> bool:
    """
    Process a single HTML file to add hreflang tags.
    
    Args:
        file_path: Path to HTML file
        base_dir: Base directory
    
    Returns:
        True if file was modified, False otherwise
    """
    try:
        # Read file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Check if head exists
        head = soup.find('head')
        if not head:
            logger.warning(f"No <head> found in {file_path}")
            return False
        
        # Remove existing hreflang tags (for re-processing)
        existing_hreflang = head.find_all('link', rel='alternate', hreflang=True)
        for tag in existing_hreflang:
            tag.decompose()
        
        # Detect language and generate URL
        lang = detect_language(file_path, base_dir)
        url = normalize_url(file_path, base_dir)
        
        # Create hreflang tags
        hreflang_tags = create_hreflang_tags(url, lang)
        
        # Insert hreflang tags at end of head (before </head>)
        for tag_html in hreflang_tags:
            tag = BeautifulSoup(tag_html, 'html.parser').link
            head.append(tag)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        logger.info(f"✓ Added {len(hreflang_tags)} hreflang tags to: {url}")
        return True
        
    except Exception as e:
        logger.error(f"✗ Error processing {file_path}: {str(e)}")
        return False


def main():
    """Main execution function."""
    
    logger.info("=" * 70)
    logger.info("BIM TAKEOFF - Hreflang Implementation Script")
    logger.info("=" * 70)
    
    # Check if _site directory exists
    if not SITE_DIR.exists():
        logger.error(f"❌ Site directory not found: {SITE_DIR}")
        logger.error("Please run 'quarto render' first to build the site.")
        return
    
    logger.info(f"📁 Processing directory: {SITE_DIR.absolute()}")
    logger.info(f"🌐 Base URL: {BASE_URL}")
    logger.info("")
    
    # Find all HTML files
    html_files = list(SITE_DIR.rglob("*.html"))
    
    # Filter out unwanted directories
    html_files = [
        f for f in html_files 
        if not any(part.startswith('.') for part in f.parts)
        and 'site_libs' not in str(f)
    ]
    
    logger.info(f"Found {len(html_files)} HTML files to process")
    logger.info("")
    
    # Process each file
    processed = 0
    failed = 0
    
    for html_file in html_files:
        if process_html_file(html_file, SITE_DIR):
            processed += 1
        else:
            failed += 1
    
    # Summary
    logger.info("")
    logger.info("=" * 70)
    logger.info("SUMMARY")
    logger.info("=" * 70)
    logger.info(f"✓ Successfully processed: {processed} files")
    if failed > 0:
        logger.info(f"✗ Failed: {failed} files")
    logger.info("")
    logger.info("Hreflang implementation complete!")
    logger.info("Next steps:")
    logger.info("1. Run 'quarto preview' to test locally")
    logger.info("2. Validate hreflang tags using: https://validator.schema.org/")
    logger.info("3. Deploy to GitHub Pages")
    logger.info("4. Verify in Google Search Console > International Targeting")
    logger.info("=" * 70)


if __name__ == "__main__":
    main()
