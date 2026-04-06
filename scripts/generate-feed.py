#!/usr/bin/env python3
"""
Post-render script to generate Atom XML feeds for BIM Takeoff publications.

Reads .qmd files from resources/publications/ and pl/zasoby/publikacje/,
extracts YAML frontmatter, and generates Atom feeds at docs/feed.xml
and docs/pl/feed.xml.
"""

import os
import re
import xml.etree.ElementTree as ET
from xml.dom import minidom


def parse_frontmatter(filepath):
    """Extract YAML frontmatter fields from a .qmd file using regex."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Match content between --- delimiters
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None

    yaml_block = match.group(1)

    def extract_field(field_name):
        # Match field: "value" or field: value (unquoted)
        pattern = rf'^{field_name}\s*:\s*"(.+?)"\s*$|^{field_name}\s*:\s*(.+?)\s*$'
        m = re.search(pattern, yaml_block, re.MULTILINE)
        if m:
            return m.group(1) if m.group(1) is not None else m.group(2)
        return None

    title = extract_field("title")
    date = extract_field("date")
    description = extract_field("description")
    author = extract_field("author")

    if not title or not date:
        return None

    return {
        "title": title,
        "date": date,
        "description": description or "",
        "author": author or "Robert Kowalski",
    }


def strip_brand_suffix(title):
    """Remove ' | BIM Takeoff' suffix from title."""
    return re.sub(r"\s*\|\s*BIM Takeoff\s*$", "", title)


def build_atom_feed(entries, feed_config):
    """Build an Atom XML feed from entries and feed configuration."""
    # Register namespace to avoid ns0: prefix
    ET.register_namespace("", "http://www.w3.org/2005/Atom")

    feed = ET.Element("feed", xmlns="http://www.w3.org/2005/Atom")

    ET.SubElement(feed, "title").text = feed_config["title"]
    ET.SubElement(feed, "subtitle").text = feed_config["subtitle"]

    link_self = ET.SubElement(feed, "link")
    link_self.set("href", feed_config["self_link"])
    link_self.set("rel", "self")

    link_alt = ET.SubElement(feed, "link")
    link_alt.set("href", feed_config["alt_link"])

    ET.SubElement(feed, "id").text = feed_config["id"]

    # Sort entries by date descending
    entries.sort(key=lambda e: e["date"], reverse=True)

    if entries:
        ET.SubElement(feed, "updated").text = entries[0]["date"] + "T00:00:00Z"
    else:
        ET.SubElement(feed, "updated").text = "1970-01-01T00:00:00Z"

    author_el = ET.SubElement(feed, "author")
    ET.SubElement(author_el, "name").text = "Robert Kowalski"
    ET.SubElement(author_el, "email").text = "info@bimtakeoff.com"

    for entry_data in entries:
        entry = ET.SubElement(feed, "entry")

        ET.SubElement(entry, "title").text = strip_brand_suffix(entry_data["title"])

        entry_link = ET.SubElement(entry, "link")
        entry_link.set("href", entry_data["url"])

        ET.SubElement(entry, "id").text = entry_data["url"]
        ET.SubElement(entry, "updated").text = entry_data["date"] + "T00:00:00Z"
        ET.SubElement(entry, "summary").text = entry_data["description"]

        entry_author = ET.SubElement(entry, "author")
        ET.SubElement(entry_author, "name").text = entry_data["author"]

    return feed


def prettify_xml(element):
    """Return a pretty-printed XML string with proper declaration."""
    rough = ET.tostring(element, encoding="unicode", xml_declaration=False)
    # Parse with minidom for pretty printing
    dom = minidom.parseString(rough)
    pretty = dom.toprettyxml(indent="  ", encoding=None)
    # minidom adds its own declaration; replace it with our preferred one
    lines = pretty.split("\n")
    # Remove the minidom declaration line and any leading blank lines
    if lines and lines[0].startswith("<?xml"):
        lines[0] = '<?xml version="1.0" encoding="UTF-8"?>'
    # Remove trailing blank lines
    while lines and lines[-1].strip() == "":
        lines.pop()
    return "\n".join(lines) + "\n"


def collect_entries(publications_dir, base_url):
    """Scan a directory for .qmd files and return feed entries."""
    entries = []

    if not os.path.isdir(publications_dir):
        return entries

    for filename in os.listdir(publications_dir):
        if not filename.endswith(".qmd"):
            continue
        if filename == "index.qmd":
            continue

        filepath = os.path.join(publications_dir, filename)
        meta = parse_frontmatter(filepath)
        if meta is None:
            continue

        # Derive HTML filename from .qmd filename
        html_name = filename.replace(".qmd", ".html")
        url = base_url.rstrip("/") + "/" + html_name

        entries.append(
            {
                "title": meta["title"],
                "date": meta["date"],
                "description": meta["description"],
                "author": meta["author"],
                "url": url,
            }
        )

    return entries


def write_feed(feed_element, output_path):
    """Write the Atom feed XML to disk."""
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.isdir(output_dir):
        os.makedirs(output_dir, exist_ok=True)

    xml_str = prettify_xml(feed_element)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(xml_str)


def main():
    # Determine project root (script is in scripts/)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    # --- English feed ---
    en_pub_dir = os.path.join(project_root, "resources", "publications")
    en_base_url = "https://www.bimtakeoff.com/resources/publications"
    en_entries = collect_entries(en_pub_dir, en_base_url)

    en_feed_config = {
        "title": "BIM Takeoff Research & Publications",
        "subtitle": "Expert analysis on BIM 5D cost estimation, AI in construction, and industry trends",
        "self_link": "https://www.bimtakeoff.com/feed.xml",
        "alt_link": "https://www.bimtakeoff.com/resources/publications/",
        "id": "https://www.bimtakeoff.com/",
    }

    en_feed = build_atom_feed(en_entries, en_feed_config)
    en_output = os.path.join(project_root, "docs", "feed.xml")
    write_feed(en_feed, en_output)

    # --- Polish feed ---
    pl_pub_dir = os.path.join(project_root, "pl", "zasoby", "publikacje")
    pl_base_url = "https://www.bimtakeoff.com/pl/zasoby/publikacje"
    pl_entries = collect_entries(pl_pub_dir, pl_base_url)

    pl_feed_config = {
        "title": "BIM Takeoff - Badania i Publikacje",
        "subtitle": "Eksperckie analizy kosztorysowania BIM 5D, AI w budownictwie i trendow branzowych",
        "self_link": "https://www.bimtakeoff.com/pl/feed.xml",
        "alt_link": "https://www.bimtakeoff.com/pl/zasoby/publikacje/",
        "id": "https://www.bimtakeoff.com/pl/",
    }

    pl_feed = build_atom_feed(pl_entries, pl_feed_config)
    pl_output = os.path.join(project_root, "docs", "pl", "feed.xml")
    write_feed(pl_feed, pl_output)

    print(
        f"Generated feed.xml with {len(en_entries)} entries, "
        f"pl/feed.xml with {len(pl_entries)} entries"
    )


if __name__ == "__main__":
    main()
