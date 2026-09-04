#!/usr/bin/env python3
"""
Language Switcher Generator for BIM Takeoff Bilingual Website
===============================================================

Regenerates js/language-switcher.js from scripts/page-map.json.

The navbar language switcher needs to know, for the page currently being
viewed, which page path is its counterpart in the other language. Since the
site is static (Quarto/GitHub Pages), that lookup table is inlined into the
JS as a plain object rather than fetched at runtime.

Run this script whenever scripts/page-map.json changes, then commit the
regenerated js/language-switcher.js alongside it.

Usage:
    python3 scripts/build-language-switcher.py
"""

import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
PAGE_MAP_PATH = SCRIPT_DIR / "page-map.json"
OUTPUT_PATH = REPO_ROOT / "js" / "language-switcher.js"

TEMPLATE = """/**
 * Language Switcher for BIM Takeoff Bilingual Website
 * =====================================================
 *
 * GENERATED FILE - do not hand-edit.
 * Source of truth: scripts/page-map.json
 * Regenerate with: python3 scripts/build-language-switcher.py
 *
 * On DOMContentLoaded, finds the navbar links whose text is exactly "PL"
 * or "EN" and, if the current page has a mapped counterpart, rewrites the
 * link's href to point at it. Pages with no mapped counterpart keep the
 * default href (site root "/" or "/pl/") already in the markup.
 */
(function () {
  "use strict";

  // EN path -> PL path. Generated from scripts/page-map.json.
  var EN_TO_PL = __EN_TO_PL__;

  // PL path -> EN path (reverse of EN_TO_PL).
  var PL_TO_EN = {};
  for (var enPath in EN_TO_PL) {
    if (Object.prototype.hasOwnProperty.call(EN_TO_PL, enPath)) {
      PL_TO_EN[EN_TO_PL[enPath]] = enPath;
    }
  }

  function normalizePath(pathname) {
    if (pathname === "/" ) {
      return "/index.html";
    }
    if (pathname === "/pl" || pathname === "/pl/") {
      return "/pl/index.html";
    }
    return pathname;
  }

  function findCounterpart(pathname) {
    var normalized = normalizePath(pathname);
    if (Object.prototype.hasOwnProperty.call(EN_TO_PL, normalized)) {
      return EN_TO_PL[normalized];
    }
    if (Object.prototype.hasOwnProperty.call(PL_TO_EN, normalized)) {
      return PL_TO_EN[normalized];
    }
    return null;
  }

  function isLangLink(el) {
    var text = (el.textContent || "").trim();
    return text === "PL" || text === "EN";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var counterpart = findCounterpart(window.location.pathname);
    if (!counterpart) {
      // No mapped twin for this page - leave the default nav hrefs
      // ("/" and "/pl/") exactly as rendered.
      return;
    }

    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (isLangLink(link)) {
        link.setAttribute("href", counterpart);
      }
    }
  });
})();
"""


def main():
    with open(PAGE_MAP_PATH, "r", encoding="utf-8") as f:
        page_map = json.load(f)

    page_map_json = json.dumps(page_map, indent=2, ensure_ascii=False)
    # Indent the embedded object body one level to match surrounding code.
    page_map_json = page_map_json.replace("\n", "\n  ")

    output = TEMPLATE.replace("__EN_TO_PL__", page_map_json)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"Wrote {OUTPUT_PATH} from {len(page_map)} page-map entries.")


if __name__ == "__main__":
    main()
