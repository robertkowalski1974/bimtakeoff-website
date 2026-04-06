#!/usr/bin/env python3
"""
Structured Data (JSON-LD) Implementation Script for BIM Takeoff Website
=======================================================================

This script injects page-specific JSON-LD structured data into built HTML
files in the docs/ directory. It runs as a Quarto post-render script and
adds schema.org markup for Articles, FAQPage, Service, and BreadcrumbList.

Schema types:
- Article: Publication pages (EN and PL)
- FAQPage: Any page with FAQ sections (faq-item class)
- Service: Service pages (EN and PL)
- BreadcrumbList: All nested pages (depth > 1)

Usage:
    python3 scripts/add-structured-data.py

Author: BIM Takeoff SEO Implementation
"""

import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser

# Configuration
SITE_DIR = Path("docs")
BASE_URL = "https://www.bimtakeoff.com"

# ---------------------------------------------------------------------------
# Lightweight HTML helpers (stdlib only, no BeautifulSoup)
# ---------------------------------------------------------------------------


def read_file(path):
    """Read file content as UTF-8 string."""
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def write_file(path, content):
    """Write content to file as UTF-8."""
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)


def extract_title(html):
    """Extract text from the first <title> tag and strip the ' | BIM Takeoff' suffix."""
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL | re.IGNORECASE)
    if not m:
        return ""
    raw = m.group(1).strip()
    # Decode HTML entities
    raw = raw.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    raw = raw.replace("&#39;", "'").replace("&quot;", '"')
    # Strip common suffixes
    raw = re.sub(r"\s*\|\s*BIM\s*Takeoff\s*$", "", raw, flags=re.IGNORECASE)
    # Strip leading "BIM Takeoff - " prefix that Quarto adds
    raw = re.sub(r"^BIM\s*Takeoff\s*-\s*", "", raw, flags=re.IGNORECASE)
    return raw.strip()


def extract_meta_description(html):
    """Extract content from <meta name="description"> or fallback to twitter/og."""
    # Try standard meta description first
    m = re.search(
        r'<meta\s[^>]*name=["\']description["\']\s[^>]*content=["\']([^"\']+)["\']',
        html, re.IGNORECASE,
    )
    if not m:
        m = re.search(
            r'<meta\s[^>]*content=["\']([^"\']+)["\']\s[^>]*name=["\']description["\']',
            html, re.IGNORECASE,
        )
    if m:
        return m.group(1).strip()

    # Fallback: twitter:description
    m = re.search(
        r'<meta\s[^>]*name=["\']twitter:description["\']\s[^>]*content=["\']([^"\']+)["\']',
        html, re.IGNORECASE,
    )
    if not m:
        m = re.search(
            r'<meta\s[^>]*content=["\']([^"\']+)["\']\s[^>]*name=["\']twitter:description["\']',
            html, re.IGNORECASE,
        )
    if m:
        return m.group(1).strip()

    # Fallback: og:description
    m = re.search(
        r'<meta\s[^>]*property=["\']og:description["\']\s[^>]*content=["\']([^"\']+)["\']',
        html, re.IGNORECASE,
    )
    if not m:
        m = re.search(
            r'<meta\s[^>]*content=["\']([^"\']+)["\']\s[^>]*property=["\']og:description["\']',
            html, re.IGNORECASE,
        )
    if m:
        return m.group(1).strip()

    return ""


def extract_date(html):
    """
    Extract publication date from HTML.

    Looks for (in order):
    1. <meta name="dcterms.date" content="YYYY-MM-DD">
    2. datetime="YYYY-MM-DD" attribute
    3. <p class="date"> containing a date-like string
    """
    # dcterms.date meta tag (Quarto standard)
    m = re.search(
        r'<meta\s[^>]*name=["\']dcterms\.date["\']\s[^>]*content=["\'](\d{4}-\d{2}-\d{2})["\']',
        html, re.IGNORECASE,
    )
    if not m:
        m = re.search(
            r'<meta\s[^>]*content=["\'](\d{4}-\d{2}-\d{2})["\']\s[^>]*name=["\']dcterms\.date["\']',
            html, re.IGNORECASE,
        )
    if m:
        return m.group(1)

    # datetime attribute
    m = re.search(r'datetime=["\'](\d{4}-\d{2}-\d{2})["\']', html)
    if m:
        return m.group(1)

    # <p class="date"> with a date pattern
    m = re.search(
        r'<p\s[^>]*class=["\'][^"\']*date[^"\']*["\'][^>]*>(.*?)</p>',
        html, re.DOTALL | re.IGNORECASE,
    )
    if m:
        date_text = re.sub(r"<[^>]+>", "", m.group(1)).strip()
        dm = re.search(r"(\d{4}-\d{2}-\d{2})", date_text)
        if dm:
            return dm.group(1)

    return ""


def extract_canonical_url(html):
    """Extract canonical URL from <link rel="canonical">."""
    m = re.search(
        r'<link\s[^>]*rel=["\']canonical["\']\s[^>]*href=["\']([^"\']+)["\']',
        html, re.IGNORECASE,
    )
    if not m:
        m = re.search(
            r'<link\s[^>]*href=["\']([^"\']+)["\']\s[^>]*rel=["\']canonical["\']',
            html, re.IGNORECASE,
        )
    if m:
        return m.group(1).strip()
    return ""


def strip_tags(html_fragment):
    """Remove all HTML tags and return plain text."""
    text = re.sub(r"<[^>]+>", "", html_fragment)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


# ---------------------------------------------------------------------------
# FAQ parser using html.parser
# ---------------------------------------------------------------------------


class FAQParser(HTMLParser):
    """
    Parse FAQ items from HTML.

    Expects structure:
        <div class="faq-item">
            <div class="faq-question">...<p><strong>Q: text</strong></p>...</div>
            <div class="faq-answer">...<p>A: text</p>...</div>
        </div>
    """

    def __init__(self):
        super().__init__()
        self.faqs = []  # list of (question, answer) tuples
        self._in_question = False
        self._in_answer = False
        self._depth_question = 0
        self._depth_answer = 0
        self._current_text = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        classes = attr_dict.get("class", "")

        if "faq-question" in classes:
            self._in_question = True
            self._depth_question = 1
            self._current_text = []
        elif self._in_question:
            self._depth_question += 1

        if "faq-answer" in classes:
            self._in_answer = True
            self._depth_answer = 1
            self._current_text = []
        elif self._in_answer:
            self._depth_answer += 1

    def handle_endtag(self, tag):
        if self._in_question:
            self._depth_question -= 1
            if self._depth_question <= 0:
                self._in_question = False
                q = " ".join(self._current_text).strip()
                # Strip leading "Q:" prefix
                q = re.sub(r"^Q:\s*", "", q)
                self.faqs.append([q, ""])
                self._current_text = []

        if self._in_answer:
            self._depth_answer -= 1
            if self._depth_answer <= 0:
                self._in_answer = False
                a = " ".join(self._current_text).strip()
                # Strip leading "A:" prefix
                a = re.sub(r"^A:\s*", "", a)
                if self.faqs:
                    self.faqs[-1][1] = a
                self._current_text = []

    def handle_data(self, data):
        if self._in_question or self._in_answer:
            text = data.strip()
            if text:
                self._current_text.append(text)


def extract_faqs(html):
    """Extract FAQ question/answer pairs from HTML content."""
    # Quick check: is there any faq-item at all?
    if "faq-item" not in html:
        return []

    parser = FAQParser()
    parser.feed(html)
    # Filter out pairs where question or answer is empty
    return [(q, a) for q, a in parser.faqs if q and a]


# ---------------------------------------------------------------------------
# URL / path helpers
# ---------------------------------------------------------------------------


def file_to_url(file_path, base_dir):
    """Convert a file path relative to docs/ into the canonical page URL."""
    relative = file_path.relative_to(base_dir)
    url_path = str(relative).replace("\\", "/")

    # Normalise index.html
    url_path = url_path.replace("/index.html", "/")
    if url_path == "index.html":
        url_path = "/"

    if not url_path.startswith("/"):
        url_path = "/" + url_path

    return BASE_URL + url_path


def is_pl_page(file_path, base_dir):
    """Check if a file is a Polish page."""
    relative = str(file_path.relative_to(base_dir)).replace("\\", "/")
    return relative.startswith("pl/")


def path_segments(file_path, base_dir):
    """
    Return URL path segments for breadcrumb generation.

    Example: docs/services/automated-quantity-takeoff.html
             -> ['services', 'automated-quantity-takeoff.html']
    """
    relative = str(file_path.relative_to(base_dir)).replace("\\", "/")
    parts = [p for p in relative.split("/") if p]
    return parts


# ---------------------------------------------------------------------------
# Breadcrumb label mapping
# ---------------------------------------------------------------------------

# English directory labels
EN_LABELS = {
    "services": "Services",
    "industries": "Industries",
    "resources": "Resources",
    "publications": "Publications",
    "about": "About",
    "contact": "Contact",
    "projects": "Projects",
}

# Polish directory labels
PL_LABELS = {
    "pl": "Strona Glowna",
    "uslugi": "Uslugi",
    "branze": "Branze",
    "zasoby": "Zasoby",
    "publikacje": "Publikacje",
    "kontakt": "Kontakt",
    "o-nas": "O Nas",
    "projekty": "Projekty",
}


def breadcrumb_label_for_segment(segment, is_pl):
    """Return a human-readable label for a URL path segment."""
    lookup = PL_LABELS if is_pl else EN_LABELS
    label = lookup.get(segment)
    if label:
        return label
    # Fallback: titlecase the slug
    return segment.replace("-", " ").replace("_", " ").title()


# ---------------------------------------------------------------------------
# Schema generators
# ---------------------------------------------------------------------------


def build_article_schema(html, page_url):
    """Build Article JSON-LD for a publication page."""
    title = extract_title(html)
    description = extract_meta_description(html)
    date = extract_date(html)
    canonical = extract_canonical_url(html) or page_url

    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "author": {
            "@type": "Person",
            "name": "Robert Kowalski",
            "jobTitle": "Quantity Surveyor & BIM 5D Cost Estimation Specialist",
            "knowsAbout": ["BIM 5D Cost Estimation", "Quantity Surveying", "Construction Cost Management"],
        },
        "publisher": {
            "@type": "Organization",
            "name": "BIM Takeoff",
            "url": "https://www.bimtakeoff.com",
        },
        "mainEntityOfPage": canonical,
    }

    if date:
        schema["datePublished"] = date
    if description:
        schema["description"] = description

    return schema


def build_faq_schema(faqs):
    """Build FAQPage JSON-LD from a list of (question, answer) tuples."""
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": a,
                },
            }
            for q, a in faqs
        ],
    }


def build_service_schema(html):
    """Build Service JSON-LD for a service page."""
    title = extract_title(html)
    description = extract_meta_description(html)

    schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": title,
        "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff",
            "url": "https://www.bimtakeoff.com",
        },
        "areaServed": ["United Kingdom", "Australia", "Poland"],
        "serviceType": "Construction Cost Estimation",
    }

    if description:
        schema["description"] = description

    return schema


def build_breadcrumb_schema(file_path, base_dir, html):
    """
    Build BreadcrumbList JSON-LD based on URL path structure.

    Only generated for pages with depth > 1 (not the homepage or top-level
    index pages).
    """
    segments = path_segments(file_path, base_dir)
    pl = is_pl_page(file_path, base_dir)

    # For PL pages, skip the 'pl' prefix in segment list for breadcrumb
    # building but include it in URLs
    if pl:
        # segments[0] == 'pl', segments[1:] are the real path
        if len(segments) <= 1:
            # PL homepage -- no breadcrumbs needed
            return None
        working_segments = segments[1:]  # e.g. ['uslugi', 'file.html']
        url_prefix = "/pl"
    else:
        if len(segments) <= 1:
            # EN homepage or top-level page with no directory nesting
            # For top-level pages like contact.html, still produce breadcrumbs
            # but only if they are actual content pages (not index.html)
            filename = segments[0] if segments else ""
            if filename == "index.html" or not filename.endswith(".html"):
                return None
            working_segments = segments
            url_prefix = ""
        else:
            working_segments = segments
            url_prefix = ""

    # Build breadcrumb items
    items = []
    home_name = "Strona Glowna" if pl else "Home"
    items.append({
        "@type": "ListItem",
        "position": 1,
        "name": home_name,
        "item": BASE_URL + ("/pl/" if pl else "/"),
    })

    # Build intermediate directory items
    accumulated_path = url_prefix
    position = 2

    for i, seg in enumerate(working_segments):
        is_last = i == len(working_segments) - 1

        if is_last:
            # Final segment -- the page itself
            if seg == "index.html":
                # Don't add index.html as a breadcrumb item; the directory
                # itself was already added in the previous iteration
                break
            # Use page title for the last item
            page_title = extract_title(html)
            if not page_title:
                page_title = breadcrumb_label_for_segment(
                    seg.replace(".html", ""), pl
                )
            last_item = {
                "@type": "ListItem",
                "position": position,
                "name": page_title,
            }
            items.append(last_item)
        else:
            # Intermediate directory
            accumulated_path += "/" + seg
            label = breadcrumb_label_for_segment(seg, pl)
            items.append({
                "@type": "ListItem",
                "position": position,
                "name": label,
                "item": BASE_URL + accumulated_path + "/",
            })
            position += 1

    if len(items) < 2:
        return None

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items,
    }


# ---------------------------------------------------------------------------
# Injection logic
# ---------------------------------------------------------------------------


def make_ld_json_tag(schema_obj):
    """Serialize a schema dict into a <script type="application/ld+json"> tag."""
    json_str = json.dumps(schema_obj, indent=2, ensure_ascii=False)
    return f'<script type="application/ld+json">\n{json_str}\n</script>'


def inject_schemas(html, schemas):
    """
    Inject one or more JSON-LD schema blocks into the HTML <head> section.

    Inserts just before the closing </head> tag. Does not remove existing
    structured data -- new schemas are appended.
    """
    if not schemas:
        return html

    blocks = "\n".join(make_ld_json_tag(s) for s in schemas)

    # Insert before </head>
    insertion_point = html.rfind("</head>")
    if insertion_point == -1:
        # No </head> found -- skip this file
        return html

    return html[:insertion_point] + blocks + "\n" + html[insertion_point:]


# ---------------------------------------------------------------------------
# File classification helpers
# ---------------------------------------------------------------------------


def is_publication_page(file_path, base_dir):
    """Check if a file is a publication page (EN or PL), excluding index.html."""
    relative = str(file_path.relative_to(base_dir)).replace("\\", "/")
    if relative.endswith("/index.html") or relative == "index.html":
        return False
    return (
        relative.startswith("resources/publications/")
        or relative.startswith("pl/zasoby/publikacje/")
    )


def is_service_page(file_path, base_dir):
    """Check if a file is a service page (EN or PL)."""
    relative = str(file_path.relative_to(base_dir)).replace("\\", "/")
    return (
        relative.startswith("services/")
        or relative.startswith("pl/uslugi/")
    )


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------


def collect_html_files(base_dir):
    """Collect all HTML files under base_dir, excluding site_libs and dot dirs."""
    html_files = list(base_dir.rglob("*.html"))
    return [
        f for f in html_files
        if "site_libs" not in str(f)
        and not any(part.startswith(".") for part in f.parts)
        # Skip files with spaces (duplicate copies)
        and " " not in str(f.name)
    ]


def process_file(file_path, base_dir):
    """
    Process a single HTML file and inject appropriate structured data.

    Returns a dict of schema types that were added.
    """
    html = read_file(file_path)
    page_url = file_to_url(file_path, base_dir)
    schemas = []
    added = {}

    # 1. Article schema for publication pages
    if is_publication_page(file_path, base_dir):
        schemas.append(build_article_schema(html, page_url))
        added["Article"] = True

    # 2. FAQPage schema for pages with FAQ sections
    faqs = extract_faqs(html)
    if faqs:
        schemas.append(build_faq_schema(faqs))
        added["FAQPage"] = True

    # 3. Service schema for service pages
    if is_service_page(file_path, base_dir):
        schemas.append(build_service_schema(html))
        added["Service"] = True

    # 4. BreadcrumbList for nested pages
    breadcrumb = build_breadcrumb_schema(file_path, base_dir, html)
    if breadcrumb:
        schemas.append(breadcrumb)
        added["BreadcrumbList"] = True

    if schemas:
        new_html = inject_schemas(html, schemas)
        write_file(file_path, new_html)

    return added


def main():
    """Main execution function."""
    print("=" * 70)
    print("BIM TAKEOFF - Structured Data (JSON-LD) Implementation Script")
    print("=" * 70)

    if not SITE_DIR.exists():
        print(f"ERROR: Site directory not found: {SITE_DIR}")
        print("Please run 'quarto render' first to build the site.")
        return

    print(f"Processing directory: {SITE_DIR.resolve()}")
    print(f"Base URL: {BASE_URL}")
    print()

    html_files = collect_html_files(SITE_DIR)
    print(f"Found {len(html_files)} HTML files to process")
    print()

    # Counters
    counts = {
        "Article": 0,
        "FAQPage": 0,
        "Service": 0,
        "BreadcrumbList": 0,
    }
    errors = 0

    for file_path in sorted(html_files):
        try:
            added = process_file(file_path, SITE_DIR)
            for schema_type in added:
                counts[schema_type] = counts.get(schema_type, 0) + 1
            if added:
                relative = str(file_path.relative_to(SITE_DIR))
                types = ", ".join(sorted(added.keys()))
                print(f"  + {relative}  [{types}]")
        except Exception as exc:
            errors += 1
            relative = str(file_path.relative_to(SITE_DIR))
            print(f"  ! ERROR processing {relative}: {exc}")

    # Summary
    print()
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    parts = []
    if counts["Article"]:
        parts.append(f"Article schema to {counts['Article']} publications")
    if counts["FAQPage"]:
        parts.append(f"FAQPage schema to {counts['FAQPage']} pages")
    if counts["Service"]:
        parts.append(f"Service schema to {counts['Service']} pages")
    if counts["BreadcrumbList"]:
        parts.append(f"BreadcrumbList to {counts['BreadcrumbList']} pages")

    if parts:
        print("Added " + ", ".join(parts))
    else:
        print("No structured data was added (no matching pages found).")

    if errors:
        print(f"Errors: {errors} files failed to process")

    print("=" * 70)


if __name__ == "__main__":
    main()
