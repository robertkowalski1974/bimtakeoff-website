#!/bin/bash

# Script to check which Polish industry pages need to be created
# Location: /Users/robertkowalski/Documents/bimtakeoff-website/_archive

EN_DIR="/Users/robertkowalski/Documents/bimtakeoff-website/industries"
PL_DIR="/Users/robertkowalski/Documents/bimtakeoff-website/pl/branze"

echo "English Industry Pages:"
ls -1 "$EN_DIR"/*.qmd

echo ""
echo "Polish Industry Pages (to be created):"
echo "1. centra-danych.qmd (from data-centers.qmd)"
echo "2. deweloperstwo-komercyjne.qmd (from commercial-development.qmd)"
echo "3. deweloperstwo-mieszkaniowe.qmd (from residential-development.qmd)"
echo "4. infrastruktura-i-roboty-inzynieryjne.qmd (from infrastructure-civil.qmd)"
echo "5. magazyny-logistyka.qmd (DONE)"
echo "6. obiekty-medyczne.qmd (from healthcare-medical.qmd)"
echo "7. przemysl-i-produkcja.qmd (from industrial-manufacturing.qmd)"
echo "8. remediacja.qmd (from remediation.qmd)"
echo "9. spoldzielnie-mieszkaniowe.qmd (from housing-associations.qmd)"

echo ""
echo "Polish Navbar Links to Add:"
echo "../branze/magazyny-logistyka.html"
echo "../branze/centra-danych.html"
echo "../branze/deweloperstwo-mieszkaniowe.html"
echo "../branze/remediacja.html"
echo "../branze/deweloperstwo-komercyjne.html"
echo "../branze/spoldzielnie-mieszkaniowe.html"
echo "../branze/obiekty-medyczne.html"
echo "../branze/przemysl-i-produkcja.html"
echo "../branze/infrastruktura-i-roboty-inzynieryjne.html"
