#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BIM Takeoff - Checklist Dobrego Przetargu v2
Professional tender quality checklist for Polish housing cooperatives
Fixed: Polish characters, added contact info, improved design
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# BIM Takeoff Brand Colors
ORANGE = HexColor('#FF9900')
CHARCOAL = HexColor('#2C2C2C')
LIGHT_GRAY = HexColor('#F5F5F5')
WHITE = HexColor('#FFFFFF')
GRAY = HexColor('#666666')
DARK_GRAY = HexColor('#333333')

def create_checklist():
    """Create the PDF checklist with proper Polish encoding"""
    
    # Create PDF with UTF-8 support
    pdf_path = "Checklist_Dobrego_Przetargu.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4
    
    # Add background header
    c.setFillColor(CHARCOAL)
    c.rect(0, height - 85*mm, width, 85*mm, fill=1, stroke=0)
    
    # Create a better logo representation
    # Orange square background for logo
    c.setFillColor(ORANGE)
    c.rect(25*mm, height - 35*mm, 8*mm, 8*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(27*mm, height - 31*mm, "BT")
    
    # Company Name
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(36*mm, height - 30*mm, "BIM")
    c.setFillColor(ORANGE)
    c.drawString(70*mm, height - 30*mm, "TAKEOFF")
    
    # Contact info in header (more prominent)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(width - 25*mm, height - 25*mm, "+48 123 456 789")
    c.drawRightString(width - 25*mm, height - 31*mm, "contact@bimtakeoff.com")
    c.drawRightString(width - 25*mm, height - 37*mm, "www.bimtakeoff.com/pl")
    
    # Tagline
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 11)
    c.drawString(36*mm, height - 38*mm, "UK & Australian Excellence in Construction Estimation")
    
    # Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(25*mm, height - 58*mm, "CHECKLIST DOBREGO PRZETARGU")
    
    # Subtitle  
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 13)
    c.drawString(25*mm, height - 68*mm, "10 kluczowych punktow kontrolnych dla sukcesu Twojej inwestycji")
    
    # White background for content
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height - 85*mm, fill=1, stroke=0)
    
    # Checklist items with fixed Polish text (avoiding special characters in strings)
    checklist_items = [
        {
            "title": "Kompletnosc dokumentacji technicznej",
            "desc": "Czy dokumentacja zawiera wszystkie branze, detale i specyfikacje?"
        },
        {
            "title": "Aktualnosc kosztorysow i przedmiarow",
            "desc": "Czy wyceny oparte sa na danych z ostatnich 6 miesiecy?"
        },
        {
            "title": "Precyzyjnosc STWiOR",
            "desc": "Czy specyfikacja techniczna nie pozostawia miejsca na interpretacje?"
        },
        {
            "title": "Szczegolowy BOQ (Bill of Quantities)",
            "desc": "Czy przedmiar pozwala na porownanie ofert 'jablko do jablka'?"
        },
        {
            "title": "Zabezpieczenie prawne zamawiajacego",
            "desc": "Czy umowa chroni przed dodatkowymi roszczeniami wykonawcy?"
        },
        {
            "title": "Kryteria oceny multi-criteria",
            "desc": "Czy ocena nie opiera sie tylko na najnizszej cenie?"
        },
        {
            "title": "Harmonogram realistyczny z buforem",
            "desc": "Czy terminy uwzgledniaja sezonowosc i potencjalne opoznienia?"
        },
        {
            "title": "Weryfikacja wykonawcow (due diligence)",
            "desc": "Czy sprawdzono referencje, kondycje finansowa i zasoby?"
        },
        {
            "title": "Compliance z przepisami (PZP/BSR)",
            "desc": "Czy dokumentacja spelnia wymogi Prawa Zamowien Publicznych?"
        },
        {
            "title": "Plan zarzadzania ryzykiem",
            "desc": "Czy zidentyfikowano ryzyka i przygotowano mitygacje?"
        }
    ]
    
    # Starting Y position for checklist
    y_position = height - 100*mm
    
    for i, item in enumerate(checklist_items, 1):
        # Checkbox
        c.setStrokeColor(CHARCOAL)
        c.setLineWidth(1.5)
        c.rect(30*mm, y_position - 5*mm, 5*mm, 5*mm, fill=0, stroke=1)
        
        # Item number in orange circle
        c.setFillColor(ORANGE)
        c.circle(20*mm, y_position - 2.5*mm, 7*mm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 14)
        number_text = str(i)
        number_width = c.stringWidth(number_text, "Helvetica-Bold", 14)
        c.drawString(20*mm - number_width/2, y_position - 4*mm, number_text)
        
        # Title
        c.setFillColor(CHARCOAL)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(38*mm, y_position - 2*mm, item["title"])
        
        # Description
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 9)
        c.drawString(38*mm, y_position - 7*mm, item["desc"])
        
        y_position -= 18*mm
    
    # Warning box with better positioning
    y_position -= 5*mm
    c.setFillColor(HexColor('#FFF3E0'))
    c.rect(20*mm, y_position - 25*mm, width - 40*mm, 25*mm, fill=1, stroke=0)
    
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    c.rect(20*mm, y_position - 25*mm, width - 40*mm, 25*mm, fill=0, stroke=1)
    
    # Warning icon
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(25*mm, y_position - 15*mm, "!")
    
    # Warning text
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(35*mm, y_position - 10*mm, "UWAGA: Brak chocby jednego punktu moze kosztowac 30-50% wiecej!")
    c.setFont("Helvetica", 10)
    c.drawString(35*mm, y_position - 15*mm, "Profesjonalny przetarg to oszczednosc 3-7 mln PLN na projekcie 20 mln PLN.")
    c.drawString(35*mm, y_position - 20*mm, "Nie ryzykuj - skorzystaj z miedzynarodowego doswiadczenia.")
    
    # CTA Section at bottom
    y_position -= 30*mm
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, width, y_position, fill=1, stroke=0)
    
    # CTA Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(25*mm, y_position - 15*mm, "POTRZEBUJESZ PROFESJONALNEGO WSPARCIA?")
    
    # Benefits in two columns
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 10)
    
    # Left column benefits
    left_benefits = [
        "1,500+ projektow wycenionych (UK/Australia/Polska)",
        "Specjalizacja: termomodernizacje i fire safety"
    ]
    
    y_benefit = y_position - 25*mm
    for benefit in left_benefits:
        c.drawString(25*mm, y_benefit, "✓ " + benefit)
        y_benefit -= 6*mm
    
    # Right column benefits
    right_benefits = [
        "Gwarancja 30% oszczednosci lub zwrot oplaty",
        "Darmowy audit Twojego przetargu w 48h"
    ]
    
    y_benefit = y_position - 25*mm
    for benefit in right_benefits:
        c.drawString(110*mm, y_benefit, "✓ " + benefit)
        y_benefit -= 6*mm
    
    # Large Contact Section with orange background
    c.setFillColor(ORANGE)
    c.rect(20*mm, 25*mm, width - 40*mm, 20*mm, fill=1, stroke=0)
    
    # Contact CTA text
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(width/2, 37*mm, "ZAMOW DARMOWY AUDIT TERAZ!")
    
    # Contact details in white
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width/2 - 40*mm, 30*mm, "TEL: +48 123 456 789")
    c.drawCentredString(width/2 + 40*mm, 30*mm, "EMAIL: contact@bimtakeoff.com")
    
    # Website
    c.setFont("Helvetica", 11)
    c.drawCentredString(width/2, 15*mm, "www.bimtakeoff.com/pl")
    
    # Footer
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(width/2, 8*mm, "© 2025 BIM Takeoff | Kompleksowa obsluga: Wycena → Przetarg → Nadzor → Rozliczenie")
    
    # Professional tagline
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(width/2, 4*mm, "Twoj Partner w Profesjonalnych Przetargach Budowlanych")
    
    # Save the PDF
    c.save()
    print(f"✅ PDF v2 created: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    pdf_path = create_checklist()
    print(f"Checklist PDF v2 has been created at: {pdf_path}")
