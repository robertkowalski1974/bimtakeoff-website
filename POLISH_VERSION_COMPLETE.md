# BIM Takeoff - Kompletna Dwujęzyczna Strona WWW
## English + Polish Versions

**Status:** ✅ COMPLETED  
**Date:** October 25, 2025  
**Location:** `/Users/robertkowalski/Documents/bimtakeoff-website`

---

## 🎉 Co Zostało Ukończone

### 1. **Kompletna Polska Wersja Strony**
- ✅ Pełne tłumaczenie strony głównej (pl/index.qmd)
- ✅ Polska strona "Coming Soon" (pl/coming-soon.qmd)
- ✅ Polska konfiguracja Quarto (pl/_quarto.yml)
- ✅ Polskie menu nawigacyjne
- ✅ Polska stopka z prawami autorskimi
- ✅ Przełącznik języków (PL/EN) w obu wersjach

### 2. **Poprawiona Angielska Wersja**
- ✅ Zaktualizowane linki do wersji polskiej
- ✅ Przełącznik języków działa poprawnie

### 3. **Skrypty Wdrożeniowe**
- ✅ `deploy-bilingual.sh` - automatyczne wdrożenie obu wersji
- ✅ Kolorowe komunikaty statusu
- ✅ Automatyczne sprawdzanie błędów

---

## 📁 Struktura Projektu

```
bimtakeoff-website/
│
├── index.qmd                    # Główna strona angielska
├── coming-soon.qmd              # Angielska strona "wkrótce"
├── _quarto.yml                  # Główna konfiguracja (EN)
│
├── pl/                          # Katalog wersji polskiej
│   ├── index.qmd                # Główna strona polska
│   ├── coming-soon.qmd          # Polska strona "wkrótce"
│   ├── _quarto.yml              # Polska konfiguracja
│   └── README.md                # Dokumentacja polska
│
├── images/                      # Współdzielone obrazy
│   ├── BIM TAKEOFF V2-2.jpg
│   ├── bim-technology.png
│   ├── bim-workflow.png
│   ├── construction-site.png
│   ├── data-analysis.png
│   ├── header-background.jpg
│   └── hero-video.mp4
│
├── css/
│   └── styles.css               # Współdzielone style
│
├── custom.scss                  # Współdzielone style SCSS
│
├── deploy-bilingual.sh          # Skrypt wdrożeniowy
│
└── docs/                        # Wygenerowane pliki (GitHub Pages)
    ├── index.html               # Angielska strona
    └── pl/
        └── index.html           # Polska strona
```

---

## 🚀 Jak Używać

### Metoda 1: Automatyczne Wdrożenie (ZALECANE)

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
chmod +x deploy-bilingual.sh
./deploy-bilingual.sh "Your commit message here"
```

Ten skrypt automatycznie:
1. ✅ Buduje wersję angielską
2. ✅ Buduje wersję polską
3. ✅ Dodaje zmiany do git
4. ✅ Tworzy commit
5. ✅ Pushuje do GitHub

### Metoda 2: Manualne Kroki

#### Tylko Budowanie (bez wdrożenia):
```bash
# Buduj angielską
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render

# Buduj polską
cd pl
quarto render
cd ..
```

#### Pełne Wdrożenie Manualne:
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Buduj obie wersje
quarto render
cd pl && quarto render && cd ..

# Git operations
git add .
git commit -m "Update website"
git push origin main
```

---

## 🌐 Adresy URL

Po wdrożeniu, strona będzie dostępna pod adresami:

- **🇬🇧 Wersja Angielska:** https://robertkowalski1974.github.io/bimtakeoff-website/
- **🇵🇱 Wersja Polska:** https://robertkowalski1974.github.io/bimtakeoff-website/pl/

**Uwaga:** GitHub Pages może potrzebować 2-5 minut na aktualizację po push.

---

## 🔧 Edycja Zawartości

### Edytowanie Polskiej Wersji:
```bash
# Otwórz główną stronę polską
nano /Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd

# Lub użyj swojego ulubionego edytora:
code /Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd
```

### Edytowanie Angielskiej Wersji:
```bash
nano /Users/robertkowalski/Documents/bimtakeoff-website/index.qmd
```

### Edytowanie Menu Nawigacyjnego:

**Polska:**
```bash
nano /Users/robertkowalski/Documents/bimtakeoff-website/pl/_quarto.yml
```

**Angielska:**
```bash
nano /Users/robertkowalski/Documents/bimtakeoff-website/_quarto.yml
```

---

## 📋 Zawartość Polskiej Strony

### Przetłumaczone Sekcje:

1. **Sekcja Hero**
   - Tytuł: "Ekspertiza w Przedmiarach i Kosztorysowaniu dla Doskonałości w Budownictwie"
   - Podtytuł z kluczowymi statystykami
   - Przyciski CTA: "SKONTAKTUJ SIĘ" i "ZOBACZ USŁUGI"

2. **O Nas**
   - Doskonałość w Kosztorysowaniu
   - Specjalistyczna Wiedza Branżowa
   - Eksperci od Przepisów BSR/HRB

3. **Dlaczego My?** (6 kart)
   - Precyzja Oparta na Doświadczeniu
   - Szybka Realizacja Bez Kompromisów
   - Inteligentne Budżetowanie Chroniące Marże
   - Dokumentacja Gotowa do Audytu
   - Specjalistyczna Wiedza Branżowa
   - Zgodność z Ustawą o Bezpieczeństwie Budynków

4. **Nasze Usługi** (12 usług)
   - Kosztorysowanie i Planowanie Budżetu
   - Specjalistyczne Usługi Branżowe
   - Zautomatyzowany Przedmiar Ilości
   - Szybka Kontrola Kosztów
   - Modelowanie Kosztów BREEAM/ESG
   - Precyzja Infrastruktury MEP
   - Analiza Wieloscenariuszowa
   - Kompleksowe Raportowanie
   - Pisanie Ofert i Zarządzanie Przetargami
   - Tradycyjny Przedmiar Ilości
   - Zarządzanie Danymi Budowlanymi
   - Logistyka Budowlana

5. **Specjalistyczna Ekspertyza Branżowa** (8 sektorów)
   - Magazyny i Logistyka
   - Centra Danych
   - Deweloperstwo Mieszkaniowe
   - Remediacja
   - Deweloperstwo Komercyjne
   - Opieka Zdrowotna i Obiekty Medyczne
   - Przemysł i Produkcja
   - Infrastruktura i Roboty Inżynieryjne

6. **Sekcja Zaufania**
   - Doświadczeni Kosztorysanci
   - ISO 19650
   - 20 Lat Doświadczenia

7. **Nasz Proces** (5 kroków)
   - Przesłanie Modelu + Kick-off
   - Zautomatyzowany Przedmiar + Przegląd
   - Analiza Kosztów
   - Dostarczenie Szczegółowego Raportu
   - Prezentacja + Q&A

8. **FAQ** (6 pytań)
   - Międzynarodowe bazy cenowe
   - Szybkie zmiany projektowe
   - Bieżąca kontrola kosztów
   - Formaty plików
   - Wielkość projektów
   - Co nas wyróżnia

9. **Call-to-Action**
   - Zaplanuj Konsultację
   - Oblicz Swoje Oszczędności

---

## 🎨 Brand Identity

Zachowane kolory i styl marki BIM Takeoff:
- **Pomarańczowy:** #FF9900 (kolor akcentu)
- **Grafitowy:** #2C2C2C (kolor główny)
- **Biały:** #FFFFFF (tekst na ciemnym tle)
- **Jasny szary:** #F0F0F0 (tło sekcji)

---

## 🔍 SEO i Metadane

### Polska Wersja:
- **Title:** "BIM Takeoff | Profesjonalne Usługi Przedmiarowe i Kosztorysowe"
- **Description:** "Profesjonalne Kosztorysowanie BIM 5D | 20 Lat Międzynarodowego Doświadczenia"
- **Language:** pl-PL

### Angielska Wersja:
- **Title:** "BIM Takeoff | Professional QS & Cost Estimation Services"
- **Description:** "Professional BIM 5D Cost Estimation | 20 Years International Experience"
- **Language:** en-GB

---

## 📊 Google Analytics

Obie wersje są zintegrowane z Google Tag Manager:
- **GTM ID:** GTM-PLB9BH8W
- Automatyczne śledzenie pageviews
- Automatyczne śledzenie eventów

---

## 🐛 Rozwiązywanie Problemów

### Problem: Strona polska nie wyświetla się poprawnie

**Rozwiązanie:**
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website/pl
quarto render
cd ..
git add .
git commit -m "Fix Polish version"
git push origin main
```

### Problem: Obrazy nie ładują się w wersji polskiej

**Sprawdź:**
1. Czy ścieżki obrazów używają `../images/` (nie `images/`)
2. Czy pliki obrazów istnieją w katalogu `/images/`

**Przykład poprawnej ścieżki:**
```markdown
![Opis](../images/bim-technology.png)
```

### Problem: CSS nie działa

**Sprawdź:**
1. Czy ścieżki w `pl/_quarto.yml` wskazują na `../css/styles.css`
2. Czy ścieżki SCSS wskazują na `../custom.scss`

### Problem: Git push fails

```bash
# Sprawdź status
git status

# Sprawdź remote
git remote -v

# Spróbuj ponownie
git pull origin main
git push origin main
```

---

## 📚 Dodatkowe Zasoby

### Dokumentacja Quarto:
- https://quarto.org/docs/websites/

### Dokumentacja GitHub Pages:
- https://docs.github.com/pages

### Bootstrap Icons:
- https://icons.getbootstrap.com/

---

## 🔮 Następne Kroki (Opcjonalne)

1. **Dedykowane Podstrony:**
   - Stworzyć dedykowane strony dla każdej usługi
   - Stworzyć dedykowane strony dla każdej branży
   - Stworzyć stronę portfolio z case studies
   - Stworzyć stronę kontaktową z formularzem

2. **Zaawansowane SEO:**
   - Dodać sitemap.xml z wersjami językowymi
   - Dodać tagi hreflang dla międzynarodowego SEO
   - Dodać structured data (JSON-LD)
   - Optymalizować meta description dla każdej podstrony

3. **Funkcjonalność:**
   - Dodać formularz kontaktowy (Formspree, Netlify Forms)
   - Dodać newsletter signup
   - Dodać live chat (Tawk.to, Intercom)
   - Dodać kalkulator ROI

4. **Content:**
   - Napisać blog posts (case studies)
   - Dodać testimonials od klientów
   - Stworzyć video case studies
   - Dodać downloadable resources (PDF guides)

---

## 📞 Wsparcie

W razie pytań lub potrzeby pomocy:

- **Email:** info@bimtakeoff.com
- **Tel:** +44 (0) 20 3239 9967
- **GitHub:** https://github.com/robertkowalski1974/bimtakeoff-website

---

## ✅ Checklist Wdrożeniowa

Przed finalnym wdrożeniem, upewnij się że:

- [ ] Obie wersje (EN + PL) renderują się poprawnie lokalnie
- [ ] Wszystkie linki działają
- [ ] Obrazy ładują się poprawnie
- [ ] Przełącznik języków działa
- [ ] Mobile responsiveness jest OK
- [ ] Google Tag Manager jest aktywny
- [ ] Informacje kontaktowe są poprawne
- [ ] Metadata SEO są poprawne
- [ ] Git push zakończył się sukcesem
- [ ] Strona wyświetla się na GitHub Pages

---

**🎉 Gratulacje! Twoja dwujęzyczna strona BIM Takeoff jest gotowa!**

---

*Dokument stworzony: 25 października 2025*  
*Ostatnia aktualizacja: 25 października 2025*  
*Wersja: 1.0*
