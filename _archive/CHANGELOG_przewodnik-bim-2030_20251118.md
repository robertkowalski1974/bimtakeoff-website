# Changelog - Przewodnik BIM 2030

## Data: 18 listopada 2025, 09:18

### Problem
Strona przewodnik-bim-2030.html miała następujące problemy:
1. Hero banner - nieruchomy zamiast filmu
2. Headlines na hero banner nieczytelny i niezgodny z resztą stron
3. Spis treści na hero banner - nieczytelny i nietypowy
4. Kontakt - inny niż na innych stronach

### Rozwiązanie

#### 1. Hero Banner z Video Background
- Dodano sekcję `.hero-video-bg` z video autoplay, muted, loop
- Video źródło: `../../images/hero-video.mp4`
- Poster fallback: `../../images/header-background.jpg`
- Zgodne ze stylem strony głównej (index.qmd)

#### 2. Poprawione Headlines
- Zmieniono strukturę na:
  - Mały nagłówek (h3): "Przewodnik BIM 2030 dla Polski"
  - Główny nagłówek (h1): "Wymagania Prawne i Praktyczne Wdrożenie"
- Dodano `.hero-title` i `.hero-subtitle` dla spójności
- Czytelny tekst na tle video

#### 3. Spis Treści (TOC)
- Usunięto TOC z hero banner
- Przeniesieno do prawej kolumny artykułu: `toc-location: right`
- TOC teraz widoczny tylko w treści artykułu, nie w hero section

#### 4. Sekcja Kontaktowa
- Dodano standardową sekcję kontaktową na końcu strony
- HTML section z gradient background (#2C2C2C do #1a1a1a)
- Trzy ikony kontaktowe (telefon, email, strona www)
- Call-to-action buttons: "Umów Konsultację" i "Zadzwoń Teraz"
- Zgodne ze stylem strony kontaktowej (kontakt.qmd)

#### 5. Dodatkowe Poprawki
- Dodano `page-layout: full` dla pełnej szerokości hero banner
- Poprawiono ścieżki do obrazów (dodano `../../` dla poprawnego względnego linku)
- Dodano responsywne style CSS dla urządzeń mobilnych
- Zachowano cały oryginalny content artykułu

### Pliki Zmodyfikowane
- `/pl/zasoby/przewodnik-bim-2030.qmd`

### Pliki Archiwizowane
- `przewodnik-bim-2030_original_20251118_091805.qmd` - oryginalna wersja przed zmianami

### Testowanie
Po zmianach należy:
1. Zbudować stronę: `quarto render` w katalogu głównym
2. Sprawdzić: `http://localhost:6252/pl/zasoby/przewodnik-bim-2030.html`
3. Zweryfikować:
   - Hero banner z video tłem
   - Czytelne nagłówki
   - TOC w prawej kolumnie (nie w hero)
   - Sekcja kontaktowa na dole strony
   - Responsywność na mobile

### Następne Kroki
1. Przetestować stronę lokalnie
2. Jeśli OK, wykonać commit do Git
3. Push do GitHub Pages dla aktualizacji live
