# BIM Takeoff PDF Format

Custom Quarto extension that applies BIM Takeoff brand guidelines to PDF outputs.

## Features

- **Brand Colors**: Automatic application of orange (#FF9900) and charcoal (#2C2C2C)
- **Typography**: Inter for headings, Lora for body text (per brand guidelines)
- **Formatted Sections**: H2 headings with 3pt orange underlines
- **Professional Layout**: A4 paper, proper margins, branded headers/footers
- **Orange Bullets**: Automatically styled list items
- **Callout Boxes**: Pre-styled info boxes with orange left border

## Installation

The extension is already installed in your Quarto project at:
```
_extensions/bimtakeoff-pdf/
```

## Usage

### Basic Document

Create a `.qmd` file with the following header:

```yaml
---
title: "Your Document Title"
subtitle: "Optional Subtitle"
author: "Your Name"
date: "2025-11-09"
format: bimtakeoff-pdf
---

# Your content here
```

### With Logo

```yaml
---
title: "Project Report"
author: "BIM Takeoff"
date: "2025-11-09"
logo: "images/BIM TAKEOFF V2-2.jpg"
format: bimtakeoff-pdf
---
```

### Render to PDF

```bash
quarto render document.qmd
```

## Typography

The format automatically applies:

- **Headings (H1-H3)**: Inter Bold, Charcoal color
- **H2 Headings**: Orange underline (3pt) - per brand guidelines
- **H3 Headings**: Orange color
- **Body Text**: Lora Regular, 11pt, 1.6 line spacing
- **Lists**: Orange bullet points

## Available Elements

### Callout Box

Create highlighted callout boxes with orange left border:

```markdown
::: {.biminfobox}
**Important Note**

This is a callout box with BIM Takeoff styling
:::
```

### Lists

Automatically styled with orange bullets:

```markdown
- First item (orange bullet)
- Second item
  - Nested item (orange circle)
```

### Links

All links are styled in orange (#FF9900) for consistency.

## Brand Compliance

This format ensures:
- ✅ Correct typography for print (Inter + Lora)
- ✅ Brand colors applied throughout
- ✅ 3pt orange underlines on H2 headings
- ✅ Professional spacing (32-48pt between sections)
- ✅ Branded header/footer
- ✅ Orange accents for emphasis

## Customization

You can override default settings in your document YAML:

```yaml
---
title: "Custom Document"
format:
  bimtakeoff-pdf:
    toc: true           # Enable table of contents
    number-sections: true  # Number sections
    fontsize: 12pt      # Change font size
---
```

## Requirements

- Quarto >= 1.2.0
- XeLaTeX (for font support)
- Inter font family installed
- Lora font family installed

## Troubleshooting

**Fonts not found:**
- Ensure Inter and Lora fonts are installed on your system
- macOS: Check /System/Library/Fonts/Supplemental/
- You may need to install fonts via Font Book

**PDF not generating:**
- Check that you have a LaTeX distribution installed (TinyTeX, MacTeX, etc.)
- Run: `quarto install tinytex` if needed

## Version

Version: 1.0.0
Last Updated: November 2025
