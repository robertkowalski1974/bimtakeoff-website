# Instrukcja generowania dokumentu Word

## Wymagania
1. Node.js zainstalowany na komputerze
2. Pakiet `docx` zainstalowany: `npm install docx`
3. Logo BIM Takeoff (plik JPG) w tym samym folderze co skrypt

## Kroki

1. **Skopiuj plik logo** do folderu `/docs/resources/`:
   - Plik: `BIM TAKEOFF V2-2.jpg`

2. **Uruchom skrypt** (z folderu `/docs/resources/`):
   ```bash
   cd /Users/robertkowalski/Documents/bimtakeoff-website/docs/resources
   node create_checklist_word.js
   ```

3. **Plik zostanie wygenerowany** jako:
   - `Checklist_Dobrego_Przetargu.docx`

## Edycja dokumentu

1. Otwórz plik w Microsoft Word
2. Polskie znaki będą wyświetlane poprawnie
3. Możesz edytować:
   - Tekst (wszystkie polskie znaki działają)
   - Kolory
   - Formatowanie
   - Logo (podmień na lepsze)
   - Dane kontaktowe

4. **Zapisz jako PDF**:
   - File → Export → Create PDF/XPS
   - Wybierz lokalizację: `/docs/resources/`
   - Nazwa: `Checklist_Dobrego_Przetargu.pdf`

## Uwagi
- Dokument używa czcionki Arial (uniwersalna)
- Kolory brandowe: Orange (#FF9900), Charcoal (#2C2C2C)
- Numeracja automatyczna (1-10)
- Tabela z benefitami (szare tło)
- Kontakt wyróżniony na żółtym tle

## Problemy?
Jeśli brakuje pakietu `docx`:
```bash
npm install -g docx
```

Jeśli nie ma logo, tymczasowo usuń sekcję z logo ze skryptu.
