# SZABLON SCHEMA USŁUG - POLSKI

Ten szablon pokazuje jak dodać schemat Service do stron usług w polskiej wersji.
Skopiuj sekcję frontmatter do swoich plików .qmd z usługami.

## Przykład: Strona Usługi Kosztorysowania BIM 5D

```yaml
---
title: "Kosztorysowanie BIM 5D | Usługi Kosztorysowe | BIM Takeoff"
description: "Profesjonalne kosztorysowanie BIM 5D dla projektów budowlanych. Dokładne przedmiary, planowanie budżetu i kontrola kosztów. 20+ lat doświadczenia w EU, UK i Australii."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Kosztorysowanie BIM 5D",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff",
            "alternateName": "BIM Takeoff Polska",
            "url": "https://robertkowalski1974.github.io/bimtakeoff-website/pl",
            "telephone": "+48-508-209-313",
            "email": "info@bimtakeoff.com"
          },
          "areaServed": [
            {
              "@type": "Country",
              "name": "Polska"
            },
            {
              "@type": "Country",
              "name": "United Kingdom"
            },
            {
              "@type": "Country",
              "name": "Australia"
            }
          ],
          "description": "Profesjonalne usługi kosztorysowania BIM 5D dla projektów budowlanych. Oferujemy dokładne przedmiary, planowanie budżetu oraz bieżącą kontrolę kosztów z wykorzystaniem technologii Building Information Modeling.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceRange": "$$"
          },
          "category": "Usługi Kosztorysowe Budownictwo",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Usługi Kosztorysowania BIM",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Automatyczny Przedmiar z Modeli BIM",
                  "description": "Automatyczne wydobycie ilości z modeli 3D BIM"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Planowanie Budżetu i Kosztorysowanie",
                  "description": "Szczegółowe kosztorysy i przygotowanie budżetu"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bieżąca Kontrola Kosztów",
                  "description": "Monitorowanie kosztów w czasie rzeczywistym"
                }
              }
            ]
          }
        }
        </script>
---

# Treść strony usługi...
```

## Szablony dla Różnych Usług

### Usługi Przedmiarowe

```yaml
---
title: "Przedmiar Budowlany | Obmiar | Usługi Kosztorysowe | BIM Takeoff"
description: "Profesjonalny przedmiar i obmiar budowlany. Zgodność z KNR/KNNR. Dokładne wyceny kosztów budowy. Doświadczenie na rynkach EU, UK i Australii."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Przedmiar Budowlany",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff",
            "url": "https://robertkowalski1974.github.io/bimtakeoff-website/pl"
          },
          "areaServed": ["PL", "GB", "AU"],
          "description": "Profesjonalne usługi przedmiarowe i obmiarowe zgodne z polskimi normami KNR i KNNR. Dokładne zestawienia ilości materiałów i robocizny.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
        </script>
---
```

### Koordynacja BIM

```yaml
---
title: "Koordynacja BIM | Zarządzanie Modelami | BIM Takeoff"
description: "Profesjonalna koordynacja BIM i wykrywanie kolizji. Zapewnij integralność projektu i zmniejsz konflikty na budowie dzięki ekspertom BIM."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Koordynacja BIM",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff"
          },
          "description": "Koordynacja BIM, wykrywanie kolizji oraz zarządzanie modelami dla zapewnienia sukcesu projektu.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
        </script>
---
```

### Wycena Kosztów Budowy

```yaml
---
title: "Wycena Kosztów Budowy | Szacowanie Budżetu | BIM Takeoff"
description: "Profesjonalna wycena kosztów budowy i szacowanie budżetu. Dokładne kosztorysy inwestorskie, ofertowe i powykonawcze. 20+ lat doświadczenia."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Wycena Kosztów Budowy",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff"
          },
          "description": "Kompleksowa wycena kosztów budowy - kosztorysy inwestorskie, ofertowe i powykonawcze zgodne z polskimi przepisami.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
        </script>
---
```

## Jak Użyć Tego Szablonu

1. **Skopiuj frontmatter** (wszystko pomiędzy znacznikami `---`)
2. **Wklej na górze** pliku .qmd z usługą
3. **Dostosuj:**
   - `title`: Nazwa usługi + " | BIM Takeoff"
   - `description`: 150-160 znaków, zawierająca słowo kluczowe
   - `serviceType`: Konkretna nazwa usługi
   - `description` (w JSON): Szczegółowy opis usługi
   - `itemListElement`: Lista konkretnych ofert (opcjonalnie)

4. **Aktualizuj URLe:**
   - Użyj pełnych URLi: `https://robertkowalski1974.github.io/bimtakeoff-website/pl/`
   - Zaktualizuj przy migracji na domenę niestandardową

## Najlepsze Praktyki SEO dla Polskiego Rynku

### Tytuł (50-60 znaków)
- Format: "[Nazwa Usługi] | BIM Takeoff"
- Przykład: "Kosztorysowanie BIM 5D | BIM Takeoff"
- Słowo kluczowe na początku

### Meta Opis (170-180 znaków dla polskiego)
**UWAGA:** Polski wymaga ~20% więcej znaków niż angielski!
- Zawieraj słowo kluczowe
- Dodaj lokalizację jeśli istotna
- Wezwanie do działania
- Przykład: "Profesjonalne kosztorysowanie BIM 5D dla projektów budowlanych w Polsce, UK i Australii. Dokładne przedmiary i planowanie budżetu. Skontaktuj się z nami już dziś i zaoszczędź do 30% kosztów!"

### Słowa Kluczowe Typu Usługi
Wybierz najbardziej konkretne, wyszukiwane określenie:
- ✅ "Kosztorysowanie BIM 5D" (konkretne, wyszukiwane)
- ✅ "Przedmiar budowlany" (termin branżowy)
- ✅ "Usługi kosztorysowe" (profesjonalne)
- ❌ "Usługi" (zbyt ogólne)
- ❌ "Budowanie rzeczy" (nieprofesjonalne)

## Polskie Słowa Kluczowe Branżowe

### Podstawowe terminy:
- Kosztorysowanie / kosztorysant
- Przedmiar budowlany
- Obmiar budowlany
- Wycena kosztów budowy
- Szacowanie budżetu

### Terminy BIM:
- BIM 5D
- Model BIM
- Koordynacja BIM
- Automatyczne przedmiarowanie
- Zarządzanie kosztami budowy

### Normy polskie:
- Zgodność z KNR (Katalog Nakładów Rzeczowych)
- Zgodność z KNNR
- Kosztorys zgodny z polskimi normami
- Przedmiar zgodny z STWiORB

## Testowanie

Po dodaniu schematu do strony usługi:

1. **Zrenderuj stronę:**
   ```bash
   quarto render
   ```

2. **Testuj z Google:**
   - https://search.google.com/test/rich-results
   - Wklej URL strony usługi
   - Powinien wykryć schemat Service

3. **Waliduj JSON-LD:**
   - https://validator.schema.org/
   - Wklej URL strony usługi
   - Nie powinno być błędów

## Przykłady Dobrych Opisów Usług

### Dla Kosztorysowania BIM 5D:
"Profesjonalne usługi kosztorysowania BIM 5D łączące modelowanie 3D z danymi o kosztach i harmonogramie w czasie rzeczywistym. Wydobywamy dokładne ilości, tworzymy szczegółowe kosztorysy i zapewniamy bieżącą kontrolę kosztów przez cały cykl życia Twojego projektu budowlanego."

### Dla Przedmiaru Budowlanego:
"Kompleksowe usługi przedmiarowe i obmiarowe zgodne z polskimi normami KNR i KNNR. Dokładne zestawienia ilości materiałów i robocizny dla projektów wszystkich skal. Doświadczenie na rynkach polskim, brytyjskim i australijskim."

### Dla Automatycznego Przedmiarowania:
"Automatyczne wydobycie ilości z modeli BIM i rysunków 2D. Szybkie, dokładne pomiary wykonywane zaawansowanym oprogramowaniem, redukujące błędy manualne i oszczędzające do 80% czasu w porównaniu z tradycyjnymi metodami."

## Uwaga o Specyfice Polskiego Rynku

### Ważne terminy dla SEO:
- "kosztorysowanie BIM" - Niska konkurencja, rosnące wyszukiwania
- "przedmiar budowlany" - Tradycyjny termin z możliwością BIM
- "BIM 5D" - Termin techniczny, prawie zero jakościowej treści PL
- "usługi kosztorysowe" - Profesjonalne zapytania
- "wycena kosztów budowy" - Szerszy rynek

### Przewaga pierwszego gracza:
Większość konkurencji ma tylko automatycznie tłumaczone treści.
Wysokiej jakości polski content = OGROMNA przewaga SEO!

---

**Utworzono:** 2025-11-01  
**Dla:** BIM Takeoff Strona Dwujęzyczna  
**Faza:** 1, Priorytet 2
