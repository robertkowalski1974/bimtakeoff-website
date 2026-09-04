#!/usr/bin/env python3
"""
Hreflang Implementation Script for BIM Takeoff Bilingual Website
=================================================================

This script adds bidirectional hreflang tags to all HTML pages in the docs
directory (Quarto's GitHub Pages build output). It ensures proper language
targeting for Google Search across EN (UK/AU) and PL markets.

Key Features:
- Reads the EN <-> PL page map from scripts/page-map.json
- Bidirectional hreflang tags (EN <-> PL) for every mapped pair
- Self-referencing tag for each page
- x-default pointing to the English version (or self, for unmapped EN pages)
- Absolute URLs (required by Google)
- Idempotent: removes any existing hreflang tags before adding new ones
- Pages with no PL/EN counterpart get only their own language tag
  (plus x-default -> self for EN pages)

Usage:
    python3 scripts/add-hreflang.py

Author: BIM Takeoff SEO Implementation
Date: 2025-01-01
"""

import json
import logging
from pathlib import Path

from bs4 import BeautifulSoup

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration - resolved relative to this script's location so the script
# works regardless of the caller's current working directory.
SCRIPT_DIR = Path(__file__).resolve().parent
DOCS_DIR = SCRIPT_DIR.parent / "docs"
PAGE_MAP_PATH = SCRIPT_DIR / "page-map.json"
BASE_URL = "https://www.bimtakeoff.com"

EN_HREFLANG = "en-GB"
PL_HREFLANG = "pl"


def load_page_map(page_map_path: Path) -> dict:
    """Load the EN -> PL page map and build the reverse PL -> EN map too."""
    with open(page_map_path, "r", encoding="utf-8") as f:
        en_to_pl = json.load(f)
    pl_to_en = {v: k for k, v in en_to_pl.items()}
    return en_to_pl, pl_to_en


def normalize_url(file_path: Path, base_dir: Path) -> str:
    """
    Convert a file path under docs/ into a site-relative URL path matching
    the keys/values used in page-map.json, e.g.:

        docs/index.html               -> /index.html
        docs/services/foo.html        -> /services/foo.html
        docs/pl/index.html            -> /pl/index.html
    """
    relative_path = file_path.relative_to(base_dir)
    url_path = "/" + str(relative_path).replace("\\", "/")
    return url_path


def detect_language(url: str) -> str:
    """Detect page language ('en' or 'pl') from its site-relative URL path."""
    if url.startswith("/pl/") or url == "/pl":
        return "pl"
    return "en"


def build_hreflang_tags(url: str, en_to_pl: dict, pl_to_en: dict) -> list:
    """
    Build the full set of hreflang <link> tag strings for a given page URL.
    """
    lang = detect_language(url)
    tags = []

    if lang == "en":
        self_url = url
        pl_url = en_to_pl.get(url)

        tags.append(
            f'<link rel="alternate" hreflang="{EN_HREFLANG}" '
            f'href="{BASE_URL}{self_url}">'
        )

        if pl_url:
            tags.append(
                f'<link rel="alternate" hreflang="{PL_HREFLANG}" '
                f'href="{BASE_URL}{pl_url}">'
            )

        # x-default always points at the English version (self, for EN pages)
        tags.append(
            f'<link rel="alternate" hreflang="x-default" '
            f'href="{BASE_URL}{self_url}">'
        )
    else:
        self_url = url
        en_url = pl_to_en.get(url)

        if en_url:
            tags.append(
                f'<link rel="alternate" hreflang="{EN_HREFLANG}" '
                f'href="{BASE_URL}{en_url}">'
            )

        tags.append(
            f'<link rel="alternate" hreflang="{PL_HREFLANG}" '
            f'href="{BASE_URL}{self_url}">'
        )

        # x-default points at the English version when one exists; otherwise
        # there is nothing to point x-default at for a PL-only page.
        if en_url:
            tags.append(
                f'<link rel="alternate" hreflang="x-default" '
                f'href="{BASE_URL}{en_url}">'
            )

    return tags


def process_html_file(file_path: Path, base_dir: Path, en_to_pl: dict, pl_to_en: dict) -> bool:
    """Process a single HTML file to (re)add hreflang tags. Returns True on success."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")

        head = soup.find("head")
        if not head:
            logger.warning(f"No <head> found in {file_path}")
            return False

        # Remove existing hreflang tags first so the script is idempotent.
        for tag in head.find_all("link", rel="alternate", hreflang=True):
            tag.decompose()

        url = normalize_url(file_path, base_dir)
        hreflang_tags = build_hreflang_tags(url, en_to_pl, pl_to_en)

        for tag_html in hreflang_tags:
            new_tag = BeautifulSoup(tag_html, "html.parser").link
            head.append(new_tag)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(str(soup))

        logger.info(f"Added {len(hreflang_tags)} hreflang tags to: {url}")
        return True

    except Exception as e:
        logger.error(f"Error processing {file_path}: {str(e)}")
        return False


def main():
    """Main execution function."""

    logger.info("=" * 70)
    logger.info("BIM TAKEOFF - Hreflang Implementation Script")
    logger.info("=" * 70)

    if not DOCS_DIR.exists():
        logger.error(f"Docs directory not found: {DOCS_DIR}")
        logger.error("Please run 'quarto render' first to build the site.")
        return

    if not PAGE_MAP_PATH.exists():
        logger.error(f"Page map not found: {PAGE_MAP_PATH}")
        return

    en_to_pl, pl_to_en = load_page_map(PAGE_MAP_PATH)

    logger.info(f"Processing directory: {DOCS_DIR}")
    logger.info(f"Base URL: {BASE_URL}")
    logger.info(f"Loaded {len(en_to_pl)} EN<->PL page pairs from {PAGE_MAP_PATH.name}")
    logger.info("")

    # Drop any mapped pair where one side doesn't exist in this build yet
    # (e.g. docs/pl/... hasn't been rendered) so we never emit an hreflang
    # link to a file that isn't actually on the site, and never crash trying
    # to read/write a path that doesn't exist.
    en_to_pl_built = {}
    for en_url, pl_url in en_to_pl.items():
        en_file = DOCS_DIR / en_url.lstrip("/")
        pl_file = DOCS_DIR / pl_url.lstrip("/")
        if not en_file.exists():
            logger.warning(f"Mapped EN page not found in build, skipping pairing for: {en_url}")
            continue
        if not pl_file.exists():
            logger.warning(f"Mapped PL page not found in build, skipping pairing for: {pl_url}")
            continue
        en_to_pl_built[en_url] = pl_url
    pl_to_en_built = {v: k for k, v in en_to_pl_built.items()}

    en_to_pl, pl_to_en = en_to_pl_built, pl_to_en_built

    html_files = list(DOCS_DIR.rglob("*.html"))

    html_files = [
        f for f in html_files
        if not any(part.startswith('.') for part in f.parts)
        and 'site_libs' not in str(f)
    ]

    logger.info(f"Found {len(html_files)} HTML files to process")
    logger.info("")

    processed = 0
    failed = 0

    for html_file in html_files:
        if process_html_file(html_file, DOCS_DIR, en_to_pl, pl_to_en):
            processed += 1
        else:
            failed += 1

    logger.info("")
    logger.info("=" * 70)
    logger.info("SUMMARY")
    logger.info("=" * 70)
    logger.info(f"Successfully processed: {processed} files")
    if failed > 0:
        logger.info(f"Failed: {failed} files")
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
