# BIM Takeoff website

Bilingual website for quantity takeoffs, priced bills and tender support for specialist subcontractors in the UK, Australia and Poland.

- [English website](https://www.bimtakeoff.com/)
- [Polish website](https://www.bimtakeoff.com/pl/)
- [Polish quick start](QUICK_START.md)
- [Release history and test results](CHANGELOG.md)

Last updated: 6 September 2026.

## Build and preview

Requirements: Git, Quarto 1.4.549 or later, and Python 3 with [requirements.txt](requirements.txt). CI uses Quarto 1.4.549 and Python 3.12.

Run from the repository root:

```bash
python3 -m pip install -r requirements.txt
./build.sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8765/` and `http://127.0.0.1:8765/pl/`. Stop the server with Ctrl+C.

[build.sh](build.sh) renders English to `docs/`, then the separate Polish project to `docs/pl/`. It runs SEO processing once over the combined output, checks internal references, and validates deployment files. A root-only `quarto render` is not a complete release build.

Set `PYTHON` to a suitable interpreter if the default Python lacks Beautiful Soup. Restricted macOS sessions can require permission for Quarto's architecture check.

Polish shared CSS and scripts use the live domain. Local Polish previews therefore use published shared assets. Check unpublished shared-asset changes separately, then repeat Polish checks after deployment.

## Source layout

| Location | Purpose |
|---|---|
| `_quarto.yml`, root `.qmd` files | English configuration and content |
| `pl/_quarto.yml`, `pl/**/*.qmd` | Separate Polish project |
| `services/`, `industries/`, `resources/` | English service, industry and resource pages |
| `css/`, `js/`, `images/`, `custom.scss` | Shared assets and theme |
| `scripts/page-map.json` | English/Polish page pairs |
| `scripts/build-language-switcher.py` | Generates the language-switching script |
| `scripts/check-links.py` | Checks rendered internal references |
| `docs/` | Tracked generated output served by Pages; never hand-edit |
| `.github/workflows/build-and-deploy.yml` | Build and publication workflow |

## Deployment

GitHub Pages serves `main:/docs` at `www.bimtakeoff.com`.

1. Review `git status` and preserve unrelated work.
2. Run `./build.sh`. Resolve build and link-check failures.
3. Stage only intended files. Review `git diff --cached` before committing.
4. Merge approved changes into `main` and push. Do not force-push.
5. Confirm **Build and Deploy** succeeds. It commits regenerated `docs/` with `Build site [skip ci]`.
6. Confirm **pages build and deployment** succeeds for the resulting commit.
7. Test the live site. A push or successful build alone does not prove live behaviour.
8. Pull the generated-site commit with `git pull --ff-only origin main` when the working tree permits it.

Pull requests are built and uploaded as preview artifacts without a generated-site commit. Changes confined to `docs/`, `_archive/`, or Markdown do not trigger the build workflow. Use `workflow_dispatch` when a deliberate rebuild is needed.

Generated `docs/` can be committed after a verified manual build, but never hand-edited. Resolve generated-file conflicts by rebuilding from merged source.

**Legacy fallback warning:** [deploy.sh](deploy.sh) runs `git add .`, not just `git add docs`. It can include unrelated or private untracked files. Prefer explicit staging. Its success message does not verify Pages deployment.

## Maintenance

### Language navigation

Add both rendered paths to [scripts/page-map.json](scripts/page-map.json), then run:

```bash
python3 scripts/build-language-switcher.py
```

Commit the map and regenerated `js/language-switcher.js`. The current-language link retains the current page and has `aria-current="page"`. The other link opens its counterpart, or that language's homepage when no pair exists. Test both directions and nested URLs.

### Shared assets and caching

Shared `styles.css`, `consent-banner.css`, and `language-switcher.js` references use `?v=20260906` in both Quarto configurations. Change the version in both configurations when these assets change. Keep preload and stylesheet URLs identical. Returning visitors otherwise can retain old code.

Do not replace Polish absolute asset URLs with root-relative paths without a full build and link check. Quarto can resolve them within the Polish project rather than the combined site root.

### Branding and content

Use BIM Orange `#FF9900`, charcoal `#2C2C2C`, and Inter. Keep readable contrast and visible focus states. Homepage copy accepts PDF, DWG and IFC inputs; a model is optional. Preserve the specialist-subcontractor positioning and evidence-backed package examples. Do not add unsupported accuracy or commercial claims.

## Enquiry forms

Active Pipedrive forms are embedded in [contact.qmd](contact.qmd) and [pl/kontakt.qmd](pl/kontakt.qmd). These files contain the public form URLs. Fields, styling, notifications and submission settings are maintained in Pipedrive, not generated by Quarto.

| Setting | English | Polish |
|---|---|---|
| Selector label | What do you need? | Czego potrzebujesz? |
| Choices | Quote / Free sample takeoff | Wycena / Bezpłatny przedmiar próbny |
| CRM selector field | Website enquiry type | Website enquiry type PL |
| Document-link label | Document download link | Link do pobrania dokumentacji |
| Shared CRM text field | Website document link | Website document link |
| Submit label | Request a quote | Poproś o wycenę |
| Confirmation path | `/contact-thank-you.html` | `/pl/kontakt-dziekujemy.html` |
| Lead prefix | Website enquiry | Zapytanie ze strony PL |

Selectors and document links are optional. Separate selector fields preserve localised choices. Name and email remain required. Upload accepts a file up to 20 MB; larger packs use the document-link field. Submissions save Leads owned by Robert Kowalski. Notifications are configured for the owner's `robert.kowalski@bimtakeoff.com` address.

Chat loading is excluded from both contact and confirmation routes. Preserve these exclusions when changing routing or shared scripts.

## Release checks

- Full bilingual build and internal-link check pass.
- Both homepages, service pages, contact pages and confirmation pages respond successfully.
- Language links retain the current page and switch to the correct counterpart.
- Desktop and mobile layouts have no horizontal overflow; cookie controls remain usable.
- Enquiry and sample links point to the intended contact sections.
- Both embedded forms display localised fields; chat does not cover contact pages.
- For authorised submission tests, use labelled internal details. Verify saved CRM fields and confirmation redirects. Record test records left behind.
- Record upload and notification-email tests separately. Lead creation does not prove either.

See [CHANGELOG.md](CHANGELOG.md) for release evidence and test limits.

© 2026 BIM Takeoff. All rights reserved.
