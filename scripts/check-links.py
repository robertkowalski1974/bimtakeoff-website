#!/usr/bin/env python3
"""Check internal links in the built site.

Usage: python3 scripts/check-links.py [docs]

Walks every .html file, collects href/src/link/script targets, resolves the
internal ones against the docs/ tree and reports targets that do not exist.
Exit code 1 when any broken internal link is found.
"""
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

docs = Path(sys.argv[1] if len(sys.argv) > 1 else "docs").resolve()
ATTR = re.compile(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']', re.I)
SKIP_PREFIX = ("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "#", "//")
broken = {}
checked = 0
for html in docs.rglob("*.html"):
    if "site_libs" in html.parts:
        continue
    text = html.read_text(encoding="utf-8", errors="ignore")
    for raw in ATTR.findall(text):
        if raw.startswith(SKIP_PREFIX):
            continue
        path = unquote(urlsplit(raw).path)
        if not path:
            continue
        target = (docs / path.lstrip("/")) if path.startswith("/") else (html.parent / path)
        target = target.resolve()
        checked += 1
        if target.is_dir():
            target = target / "index.html"
        if not target.exists():
            broken.setdefault(raw, set()).add(str(html.relative_to(docs)))
print(f"checked {checked} internal references")
if broken:
    print(f"BROKEN: {len(broken)} distinct targets")
    for raw, pages in sorted(broken.items(), key=lambda kv: -len(kv[1]))[:40]:
        sample = sorted(pages)[0]
        print(f"  {raw}  ({len(pages)} page(s), e.g. {sample})")
    sys.exit(1)
print("no broken internal links")
