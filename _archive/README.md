# Archive Directory Structure

This directory contains archived files from the BIM Takeoff website project, organized by category.

**Last Updated:** 2025-11-20

## Directory Structure

### 📁 documentation/
Historical documentation files organized by topic:

- **pdf-implementation/** - PDF generation and reporting feature documentation
- **roi-calculator/** - ROI calculator development and iteration notes
- **polish-version/** - Polish language implementation documentation
- **seo-implementation/** - SEO, hreflang, and canonical tag implementation
- **pipedrive-integration/** - Pipedrive CRM integration documentation
- **service-pages/** - Service page development notes
- **industry-pages/** - Industry page development notes
- **publications/** - Publications section implementation notes

### 📁 old-code/
Archived JavaScript, CSS, and HTML files that have been replaced or are no longer used:
- Old versions of ROI calculator scripts
- Deprecated CSS files
- Test HTML files
- Backup implementations

### 📁 backup-files/
Backup copies of .qmd and other source files:
- Old .qmd versions
- Temporary backup files
- _files directories from Quarto renders

### 📁 guides-and-references/
Quick start guides, references, and how-to documents:
- Quick reference guides
- Implementation summaries
- Step-by-step guides
- Copy-paste references

### 📁 duplicate-html-files-20251120/
HTML files with duplicate names (space + number):
- Files like "index 2.html", "contact 3.html" etc.
- "site_libs 2" directory
- Test HTML files

### 📁 Other Preserved Directories
- **linkedin-campaign-materials/** - LinkedIn campaign assets
- **service-page-prompts/** - Prompts used for generating service pages
- **roi-pipedrive-redirect-solution/** - Specific implementation solution

## Cleanup History

### 2025-11-20 - Major Archive Organization
- Moved 74+ duplicate HTML files to dedicated folder
- Organized 128+ markdown documentation files by topic
- Consolidated old JavaScript, CSS, and HTML code files
- Moved test directories (_files) to backup-files
- Created organized structure with categorized subdirectories
- Created full backup: `bimtakeoff-backup-20251120-135847.tar.gz` (52MB)

## Backup Location

Full project backup (before cleanup) is stored in the project root:
- `bimtakeoff-backup-20251120-135847.tar.gz` (52MB)

## Notes

- All files in this archive are preserved for reference
- Files can be safely deleted after confirming the live website works correctly
- The backup tarball should be kept until the next major version is stable
- Documentation files may contain useful context for future development
