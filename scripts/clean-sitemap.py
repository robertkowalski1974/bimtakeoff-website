#!/usr/bin/env python3
"""
Sitemap Cleanup Script for BIM Takeoff Bilingual Website
=========================================================

This script cleans up the Quarto-generated sitemap.xml file to ensure
Google-friendly URLs with proper formatting.

Tasks:
- Remove /index.html from URLs
- Ensure consistent trailing slashes
- Maintain proper XML structure
- Keep unified sitemap (both EN and PL in one file)
- Validate XML syntax

Usage:
    python3 scripts/clean-sitemap.py

Author: BIM Takeoff SEO Implementation
Date: 2025-01-01
"""

import re
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration - resolved relative to this script's location so it works
# regardless of the caller's current working directory.
SCRIPT_DIR = Path(__file__).resolve().parent
DOCS_DIR = SCRIPT_DIR.parent / "docs"
SITEMAP_PATH = DOCS_DIR / "sitemap.xml"
BACKUP_PATH = DOCS_DIR / "sitemap.xml.backup"

# URLs that must never appear in the sitemap: draft/internal pages, stray
# duplicate-numbered files left behind by earlier builds, and the two
# Polish-language articles that were published under the EN /resources/
# path by mistake (see scripts/page-map.json / task 7 for their canonical
# PL-path twins).
EXCLUDED_EXACT_PATHS = {
    "QUICK_START.html",
    "roi-calculator-NEW.html",
    "resources/roi-calculator-NEW.html",
    "roi-calculator-thank-you.html",
    "resources/roi-calculator-thank-you.html",
    "kalkulator-roi-dziekujemy.html",
    "pl/zasoby/kalkulator-roi-dziekujemy.html",
    "coming-soon.html",
    "pl/coming-soon.html",
    "roi-report.html",
    "resources/roi-report.html",
    "resources/publications/ai-czy-zastapi-kosztorysantow.html",
    "resources/publications/ai-przedmiary-rzeczywistosc.html",
}


def is_excluded_url(url: str) -> bool:
    """
    Return True if this sitemap URL must be excluded:
    - QUICK_START.html
    - anything under /content/
    - the ROI calculator "NEW" draft, its thank-you pages, and roi-report
    - coming-soon pages (EN and PL)
    - any URL containing a stray " 2" / " 3" / "%202" / "%203" suffix left
      by duplicate file artifacts
    - the two Polish-language articles published under /resources/publications/
      (their canonical home is /pl/zasoby/publikacje/, see page-map.json)
    """
    if "/content/" in url:
        return True
    if " 2" in url or " 3" in url or "%202" in url or "%203" in url:
        return True

    for excluded in EXCLUDED_EXACT_PATHS:
        if url.endswith(excluded):
            return True

    return False


def backup_sitemap():
    """Create a backup of the original sitemap."""
    if SITEMAP_PATH.exists():
        import shutil
        shutil.copy(SITEMAP_PATH, BACKUP_PATH)
        logger.info(f"✓ Created backup: {BACKUP_PATH}")
        return True
    else:
        logger.error(f"❌ Sitemap not found: {SITEMAP_PATH}")
        return False


def clean_url(url: str) -> str:
    """
    Clean a URL to remove index.html and normalize format.
    
    Args:
        url: Original URL from sitemap
    
    Returns:
        Cleaned URL with proper formatting
    
    Examples:
        https://example.com/services/index.html -> https://example.com/services/
        https://example.com/pl/uslugi/index.html -> https://example.com/pl/uslugi/
        https://example.com/index.html -> https://example.com/
    """
    # Remove /index.html
    url = re.sub(r'/index\.html$', '/', url)
    
    # Remove index.html at root
    url = re.sub(r'^(.+)index\.html$', r'\1', url)
    
    # Ensure trailing slash for directories (URLs without file extensions)
    if not url.endswith('/') and not url.endswith('.html') and not url.endswith('.xml'):
        url += '/'
    
    return url


def process_sitemap(sitemap_path: Path) -> bool:
    """
    Process and clean the sitemap XML file.
    
    Args:
        sitemap_path: Path to sitemap.xml
    
    Returns:
        True if successful, False otherwise
    """
    try:
        # Parse XML
        ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        
        # Define namespace (sitemap uses xmlns)
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        # Find all URL elements
        url_elements = root.findall('.//ns:url', namespace)
        
        logger.info(f"Found {len(url_elements)} URLs in sitemap")
        logger.info("")
        
        cleaned_count = 0
        removed_count = 0
        
        for url_elem in url_elements:
            loc = url_elem.find('ns:loc', namespace)
            
            if loc is not None and loc.text:
                original_url = loc.text
                cleaned_url = clean_url(original_url)
                
                # Check for unwanted URLs (e.g., 404 pages, site_libs)
                should_remove = False

                if 'site_libs' in cleaned_url:
                    should_remove = True
                elif cleaned_url.endswith('404.html'):
                    should_remove = True
                elif cleaned_url.endswith('.css') or cleaned_url.endswith('.js'):
                    should_remove = True
                elif is_excluded_url(cleaned_url) or is_excluded_url(original_url):
                    should_remove = True
                
                if should_remove:
                    root.remove(url_elem)
                    removed_count += 1
                    logger.info(f"✗ Removed: {original_url}")
                elif original_url != cleaned_url:
                    loc.text = cleaned_url
                    cleaned_count += 1
                    logger.info(f"✓ Cleaned: {original_url}")
                    logger.info(f"       → {cleaned_url}")
        
        # Make sure every Polish page (built by the separate pl/ project) is listed
        SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
        listed = {u.find('ns:loc', namespace).text for u in root.findall('.//ns:url', namespace)
                  if u.find('ns:loc', namespace) is not None}
        added_count = 0
        pl_dir = DOCS_DIR / 'pl'
        if pl_dir.exists():
            for html in sorted(pl_dir.rglob('*.html')):
                rel = html.relative_to(DOCS_DIR).as_posix()
                if 'site_libs' in rel or ' ' in rel:
                    continue
                url = 'https://www.bimtakeoff.com/' + rel
                if is_excluded_url(url) or url in listed:
                    continue
                url_el = ET.SubElement(root, f'{{{SITEMAP_NS}}}url')
                ET.SubElement(url_el, f'{{{SITEMAP_NS}}}loc').text = url
                ET.SubElement(url_el, f'{{{SITEMAP_NS}}}lastmod').text = datetime.now().strftime('%Y-%m-%d')
                listed.add(url)
                added_count += 1
        logger.info(f"✓ Added {added_count} Polish URLs missing from the sitemap")

        # Update lastmod to current date
        current_date = datetime.now().strftime('%Y-%m-%d')
        for lastmod in root.findall('.//ns:lastmod', namespace):
            lastmod.text = current_date
        
        # Write back to file with proper XML declaration
        if hasattr(ET, 'indent'):
            ET.indent(tree, space='  ')
        tree.write(
            sitemap_path,
            encoding='utf-8',
            xml_declaration=True,
            method='xml'
        )
        
        logger.info("")
        logger.info(f"✓ Cleaned {cleaned_count} URLs")
        logger.info(f"✓ Removed {removed_count} unwanted URLs")
        logger.info(f"✓ Final URL count: {len(url_elements) - removed_count}")
        
        return True
        
    except ET.ParseError as e:
        logger.error(f"❌ XML parsing error: {str(e)}")
        return False
    except Exception as e:
        logger.error(f"❌ Error processing sitemap: {str(e)}")
        return False


def validate_sitemap(sitemap_path: Path) -> bool:
    """
    Validate sitemap XML structure and content.
    
    Args:
        sitemap_path: Path to sitemap.xml
    
    Returns:
        True if valid, False otherwise
    """
    try:
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        
        # Check root element
        if 'urlset' not in root.tag:
            logger.error("❌ Invalid root element (should be <urlset>)")
            return False
        
        # Check namespace
        if 'http://www.sitemaps.org/schemas/sitemap/0.9' not in root.tag:
            logger.warning("⚠ Missing or incorrect XML namespace")
        
        # Check for duplicate URLs
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = [loc.text for loc in root.findall('.//ns:loc', namespace)]
        
        duplicates = [url for url in urls if urls.count(url) > 1]
        if duplicates:
            logger.warning(f"⚠ Found {len(set(duplicates))} duplicate URLs")
            for dup in set(duplicates):
                logger.warning(f"  - {dup}")
        
        logger.info("✓ Sitemap XML structure is valid")
        return True
        
    except Exception as e:
        logger.error(f"❌ Validation error: {str(e)}")
        return False


def main():
    """Main execution function."""
    
    logger.info("=" * 70)
    logger.info("BIM TAKEOFF - Sitemap Cleanup Script")
    logger.info("=" * 70)
    
    # Check if sitemap exists
    if not SITEMAP_PATH.exists():
        logger.error(f"❌ Sitemap not found: {SITEMAP_PATH}")
        logger.error("Please run 'quarto render' first to generate sitemap.")
        return
    
    logger.info(f"📄 Processing sitemap: {SITEMAP_PATH.absolute()}")
    logger.info("")
    
    # Create backup
    if not backup_sitemap():
        return
    
    logger.info("")
    
    # Process sitemap
    if process_sitemap(SITEMAP_PATH):
        logger.info("")
        logger.info("✓ Sitemap processing complete!")
        logger.info("")
        
        # Validate
        validate_sitemap(SITEMAP_PATH)
        
        logger.info("")
        logger.info("=" * 70)
        logger.info("NEXT STEPS")
        logger.info("=" * 70)
        logger.info("1. Review cleaned sitemap: _site/sitemap.xml")
        logger.info("2. Validate using: https://www.xml-sitemaps.com/validate-xml-sitemap.html")
        logger.info("3. Submit to Google Search Console")
        logger.info("4. Submit to Bing Webmaster Tools")
        logger.info("5. Add sitemap URL to robots.txt")
        logger.info("")
        logger.info("Your sitemap is ready for search engines!")
        logger.info("=" * 70)
    else:
        logger.error("")
        logger.error("❌ Sitemap processing failed")
        logger.error(f"Backup preserved at: {BACKUP_PATH}")


if __name__ == "__main__":
    main()
