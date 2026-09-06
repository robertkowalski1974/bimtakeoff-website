# Release history

## 2026-09-06 — First wave of website fixes

Status: merged into `main`, pushed to GitHub and verified live on 6 September 2026.

### Published changes

- Fixed language switching: retain the current-language page; open the other language's counterpart or homepage fallback.
- Improved both homepages with darker hero overlays and clearer PDF, DWG and IFC input wording.
- Rewrote the English quantity-takeoff service page around inputs, deliverables, scope and process. Retained its URL.
- Updated the Polish quantity-takeoff heading, introduction and poster path. A BIM model is optional.
- Fixed mobile consent-panel sizing so both buttons remain visible.
- Excluded chat from English and Polish contact and confirmation routes.
- Added quote/sample guidance and document-link instructions to both contact pages.
- Added optional localised enquiry selectors and document-link fields to both Pipedrive forms. Updated introductions, orange styling and submit labels.
- Versioned shared assets after live testing exposed cached navigation code for returning visitors.

Changes retain BIM Orange, charcoal and Inter, and preserve the specialist-subcontractor offer. This release is not a site-wide review of older numeric claims.

### Deployment evidence

| Record | Revision or result |
|---|---|
| Main implementation | `5208dd4` |
| Merge with remote main | `d3b5bee` |
| Asset-version follow-up | `1e6b9e3` |
| Final generated-site commit | `cb8e4e6` |
| [Build and Deploy](https://github.com/robertkowalski1974/bimtakeoff-website/actions/runs/34039294011) | Success |
| [Final Pages deployment](https://github.com/robertkowalski1974/bimtakeoff-website/actions/runs/34039376786) | Success |

Generated sitemap merge conflicts were resolved by rebuilding from merged source. Unrelated untracked files were not staged.

### Verification completed

- Final local build: `Build OK.`, 5,939 internal references checked, no broken internal links. Earlier pre-versioning builds checked 5,943 references.
- Language-switcher logic: 83 route cases passed, including both directions, homepage variants and unmapped routes.
- Live HTTP checks: both homepages, both contact pages, both confirmation pages and both quantity-takeoff service pages returned HTTP 200.
- Live browser checks: correct language targets and current-language marker; revised hero styling; correct enquiry links; English and Polish mobile homepages without horizontal overflow.
- Polish mobile consent panel: both buttons visible; essential-only action tested.
- Contact checks: embedded fields present; Polish mobile contact page without horizontal overflow and without chat. Loader logic also checked for both languages' contact and confirmation routes.
- English service page: expected PDF/DWG/IFC headline, correct language targets and no broken loaded images.
- EN and PL form submissions: both reached confirmation pages and created Pipedrive leads with the selected enquiry type and document link.

### Internal test records retained

Two labelled test leads were left in Pipedrive:

- `Website enquiry Website QA test EN 2026-09-06` — Free sample takeoff; document link `https://www.bimtakeoff.com/`.
- `Zapytanie ze strony PL Website QA test PL 2026-09-06` — Wycena; document link `https://www.bimtakeoff.com/pl/`.

Both used Robert's company email and messages stating that no quote or contact was required. No client documents were uploaded.

### Test limits and follow-up

- Actual file-upload delivery was not tested.
- Notification recipients were checked in form settings; notification-email delivery was not verified.
- This was targeted release QA, not a full accessibility, cross-browser, analytics or performance audit.
- Review or archive the two internal test leads when appropriate. They were not deleted during this release.

See [README.md](README.md) for current maintenance and deployment instructions.
