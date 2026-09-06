# Szybki start

Aktualizacja: 6 września 2026 r.

Projekt główny generuje wersję angielską w `docs/`. Osobny projekt `pl/` generuje wersję polską w `docs/pl/`.

## Budowanie i podgląd

Wymagania: Git, Quarto 1.4.549 lub nowsze oraz Python 3. Uruchom w katalogu repozytorium:

```bash
python3 -m pip install -r requirements.txt
./build.sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Otwórz `http://127.0.0.1:8765/` oraz `http://127.0.0.1:8765/pl/`. Zatrzymaj serwer przez Ctrl+C.

Samo `quarto render` w katalogu głównym nie buduje całej strony dwujęzycznej. `build.sh` buduje obie wersje, przetwarza SEO i sprawdza odnośniki.

Polski podgląd pobiera wspólne style i skrypty z domeny produkcyjnej. Po publikacji zmian tych plików powtórz test polskiej strony.

## Edycja i publikacja

1. Edytuj pliki źródłowe. Nie edytuj ręcznie `docs/`.
2. Uruchom `./build.sh` i sprawdź wynik.
3. Sprawdź `git status`. Dodaj do commitu tylko pliki związane ze zmianą.
4. Po zatwierdzeniu zmian scal je do `main` i wyślij do GitHub.
5. Sprawdź powodzenie zadań **Build and Deploy** oraz **pages build and deployment**.
6. Sprawdź obie opublikowane wersje na komputerze i telefonie.

Nie używaj `git add .` w katalogu z niezwiązanymi zmianami. Starszy skrypt `deploy.sh` wykonuje właśnie tę operację.

Przy zmianie wspólnych stylów lub przełącznika języka zaktualizuj parametr wersji zasobów w obu plikach `_quarto.yml`. Szczegóły są w instrukcji głównej.

## Dokumentacja

- [README: budowanie, publikacja, formularze i testy](README.md)
- [CHANGELOG: opublikowane zmiany i wyniki kontroli](CHANGELOG.md)
- [Strona angielska](https://www.bimtakeoff.com/)
- [Strona polska](https://www.bimtakeoff.com/pl/)
