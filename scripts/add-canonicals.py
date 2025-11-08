#!/usr/bin/env python3
"""
Canonical Tag Implementation Script for BIM Takeoff Bilingual Website
=====================================================================

This script adds self-referencing canonical tags to all HTML pages.
Canonical tags prevent duplicate content issues and consolidate ranking signals.

Critical Rules:
- Each page must have a self-referencing canonical tag
- NEVER cross-language canonicals (EN should not canonical to PL or vice versa)
- Use absolute URLs
- Match the exact URL in browser (including trailing slashes)

Usage:
    python3 scripts/add-canonicals.py

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
SITE_DIR = Path("docs")
BASE_URL = "https://robertkowalski1974.github.io/bimtakeoff-website"


def normalize_url(file_path: Path, base_dir: Path) -> str:
    """
    Convert file path to normalized canonical URL.
    
    Args:
        file_path: Path to HTML file
        base_dir: Base directory (_site)
    
    Returns:
        Normalized URL with trailing slash and absolute base URL
    
    Example:
        _site/services/index.html -> https://robertkowalski1974.github.io/bimtakeoff-website/services/
        _site/pl/uslugi/index.html -> https://robertkowalski1974.github.io/bimtakeoff-website/pl/uslugi/
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
    
    # Combine with base URL
    canonical_url = BASE_URL + url_path
    
    return canonical_url


def process_html_file(file_path: Path, base_dir: Path) -> bool:
    """
    Process a single HTML file to add canonical tag.
    
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
        
        # Remove existing canonical tags (for re-processing)
        existing_canonical = head.find_all('link', rel='canonical')
        for tag in existing_canonical:
            tag.decompose()
        
        # Generate canonical URL
        canonical_url = normalize_url(file_path, base_dir)
        
        # Create canonical tag
        canonical_tag = soup.new_tag('link', rel='canonical', href=canonical_url)
        
        # Insert canonical tag at the beginning of head (best practice)
        # Place after charset and before other meta tags
        charset_tag = head.find('meta', charset=True)
        if charset_tag:
            charset_tag.insert_after(canonical_tag)
        else:
            # If no charset, insert as first element in head
            head.insert(0, canonical_tag)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        logger.info(f"✓ Added canonical tag: {canonical_url}")
        return True
        
    except Exception as e:
        logger.error(f"✗ Error processing {file_path}: {str(e)}")
        return False


def validate_canonical_url(url: str) -> bool:
    """
    Validate canonical URL format.
    
    Args:
        url: Canonical URL to validate
    
    Returns:
        True if valid, False otherwise
    """
    # Must be absolute URL
    if not url.startswith('http://') and not url.startswith('https://'):
        return False
    
    # Must not contain fragments or query parameters (in most cases)
    if '#' in url:
        logger.warning(f"Canonical URL contains fragment: {url}")
    
    # Should end with / or .html
    if not url.endswith('/') and not url.endswith('.html'):
        logger.warning(f"Canonical URL may need trailing slash: {url}")
    
    return True


def main():
    """Main execution function."""
    
    logger.info("=" * 70)
    logger.info("BIM TAKEOFF - Canonical Tag Implementation Script")
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
    logger.info("Canonical tag implementation complete!")
    logger.info("")
    logger.info("✓ Each page now has a self-referencing canonical tag")
    logger.info("✓ No cross-language canonicals (EN/PL independent)")
    logger.info("✓ Using absolute URLs as required by Google")
    logger.info("")
    logger.info("Next steps:")
    logger.info("1. Run 'quarto preview' to verify canonical tags")
    logger.info("2. Check canonical tags in browser DevTools > Network > HTML")
    logger.info("3. Use Google's URL Inspection Tool to verify Google sees them")
    logger.info("4. Monitor in Search Console > Coverage report")
    logger.info("=" * 70)


if __name__ == "__main__":
    main()
