# Naprawa Linków w Stopce - 8 Listopada 2024

## Problem
Linki "Polityka Prywatności" i "Warunki Współpracy" w stopce strony polskiej prowadziły do `coming-soon.qmd` zamiast do właściwych stron polskich.

## Lokalizacja
Plik: `/pl/_quarto.yml`
Sekcja: `page-footer` → `center`

## Zmiana

### Przed:
```yaml
center: |
  **Informacje**<br>
  [Polityka Prywatności](coming-soon.qmd) | [Warunki Współpracy](coming-soon.qmd)
```

### Po:
```yaml
center: |
  **Informacje**<br>
  [Polityka Prywatności](polityka-prywatnosci.qmd) | [Warunki Współpracy](regulamin.qmd)
```

## Weryfikacja
Sprawdzono że pliki docelowe istnieją:
- ✅ `/pl/polityka-prywatnosci.qmd`
- ✅ `/pl/regulamin.qmd`

## Następne Kroki
1. Przebudować stronę Quarto: `quarto render`
2. Przetestować linki w stopce na stronie lokalnej
3. Wdrożyć zmiany na produkcję

## Status
✅ Naprawiono - wymaga przebudowania strony
