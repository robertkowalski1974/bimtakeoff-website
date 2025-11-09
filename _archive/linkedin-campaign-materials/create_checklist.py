#!/usr/bin/env python3
"""
BIM Takeoff - Checklist Dobrego Przetargu
Professional tender quality checklist for Polish housing cooperatives
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import os

# BIM Takeoff Brand Colors
ORANGE = HexColor('#FF9900')
CHARCOAL = HexColor('#2C2C2C')
LIGHT_GRAY = HexColor('#F5F5F5')
WHITE = HexColor('#FFFFFF')
GRAY = HexColor('#666666')

def create_checklist():
    """Create the PDF checklist"""
    
    # Create PDF
    pdf_path = "Checklist_Dobrego_Przetargu.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4
    
    # Add background header
    c.setFillColor(CHARCOAL)
    c.rect(0, height - 80*mm, width, 80*mm, fill=1, stroke=0)
    
    # Logo/Company Name
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(30*mm, height - 30*mm, "BIM")
    c.setFillColor(ORANGE)
    c.drawString(63*mm, height - 30*mm, "TAKEOFF")
    
    # Tagline
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 10)
    c.drawString(30*mm, height - 38*mm, "UK & Australian Excellence in Construction Estimation")
    
    # Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(30*mm, height - 55*mm, "CHECKLIST DOBREGO PRZETARGU")
    
    # Subtitle
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 12)
    c.drawString(30*mm, height - 65*mm, "10 kluczowych punktów kontrolnych dla sukcesu Twojej inwestycji")
    
    # Checklist items
    checklist_items = [
        {
            "title": "Kompletność dokumentacji technicznej",
            "desc": "Czy dokumentacja zawiera wszystkie branże, detale i specyfikacje?"
        },
        {
            "title": "Aktualność kosztorysów i przedmiarów",
            "desc": "Czy wyceny oparte są na danych z ostatnich 6 miesięcy?"
        },
        {
            "title": "Precyzyjność STWiOR",
            "desc": "Czy specyfikacja techniczna nie pozostawia miejsca na interpretację?"
        },
        {
            "title": "Szczegółowy BOQ (Bill of Quantities)",
            "desc": "Czy przedmiar pozwala na porównanie ofert \"jabłko do jabłka\"?"
        },
        {
            "title": "Zabezpieczenie prawne zamawiającego",
            "desc": "Czy umowa chroni przed dodatkowymi roszczeniami wykonawcy?"
        },
        {
            "title": "Kryteria oceny multi-criteria",
            "desc": "Czy ocena nie opiera się tylko na najniższej cenie?"
        },
        {
            "title": "Harmonogram realistyczny z buforem",
            "desc": "Czy terminy uwzględniają sezonowość i potencjalne opóźnienia?"
        },
        {
            "title": "Weryfikacja wykonawców (due diligence)",
            "desc": "Czy sprawdzono referencje, kondycję finansową i zasoby?"
        },
        {
            "title": "Compliance z przepisami (PZP/BSR)",
            "desc": "Czy dokumentacja spełnia wymogi Prawa Zamówień Publicznych?"
        },
        {
            "title": "Plan zarządzania ryzykiem",
            "desc": "Czy zidentyfikowano ryzyka i przygotowano mitygacje?"
        }
    ]
    
    # Starting Y position for checklist
    y_position = height - 95*mm
    
    for i, item in enumerate(checklist_items, 1):
        # Checkbox
        c.setStrokeColor(CHARCOAL)
        c.setLineWidth(2)
        c.rect(30*mm, y_position - 5*mm, 5*mm, 5*mm, fill=0, stroke=1)
        
        # Item number in orange circle
        c.setFillColor(ORANGE)
        c.circle(20*mm, y_position - 2.5*mm, 6*mm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 12)
        number_width = c.stringWidth(str(i), "Helvetica-Bold", 12)
        c.drawString(20*mm - number_width/2, y_position - 4*mm, str(i))
        
        # Title
        c.setFillColor(CHARCOAL)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(38*mm, y_position - 2*mm, item["title"])
        
        # Description
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 9)
        c.drawString(38*mm, y_position - 7*mm, item["desc"])
        
        y_position -= 20*mm
    
    # Warning box
    y_position -= 5*mm
    c.setFillColor(HexColor('#FFF3E0'))
    c.rect(20*mm, y_position - 25*mm, width - 40*mm, 25*mm, fill=1, stroke=0)
    
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    c.rect(20*mm, y_position - 25*mm, width - 40*mm, 25*mm, fill=0, stroke=1)
    
    # Warning icon (!)
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(25*mm, y_position - 14*mm, "!")
    
    # Warning text
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(35*mm, y_position - 10*mm, "UWAGA: Brak choćby jednego punktu może kosztować 30-50% więcej!")
    c.setFont("Helvetica", 9)
    c.drawString(35*mm, y_position - 15*mm, "Profesjonalny przetarg to oszczędność 3-7 mln PLN na projekcie 20 mln PLN.")
    c.drawString(35*mm, y_position - 20*mm, "Nie ryzykuj - skorzystaj z międzynarodowego doświadczenia.")
    
    # CTA Section
    y_position -= 35*mm
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, width, y_position, fill=1, stroke=0)
    
    # CTA Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(30*mm, y_position - 15*mm, "POTRZEBUJESZ PROFESJONALNEGO WSPARCIA?")
    
    # Benefits
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 10)
    benefits = [
        "✓ 1,500+ projektów wycenionych (UK/Australia/Polska)",
        "✓ Specjalizacja: termomodernizacje i fire safety",
        "✓ Gwarancja 30% oszczędności lub zwrot opłaty",
        "✓ Darmowy audit Twojego przetargu w 48h"
    ]
    
    y_benefit = y_position - 25*mm
    for benefit in benefits:
        c.drawString(30*mm, y_benefit, benefit)
        y_benefit -= 6*mm
    
    # Contact CTA
    c.setFillColor(ORANGE)
    c.rect(30*mm, 15*mm, 60*mm, 12*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(38*mm, 20*mm, "ZAMÓW DARMOWY AUDIT")
    
    # Contact info
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 10)
    c.drawString(100*mm, 23*mm, "📧 contact@bimtakeoff.com")
    c.drawString(100*mm, 18*mm, "🌐 www.bimtakeoff.com/pl")
    
    # Footer
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(30*mm, 8*mm, "© 2025 BIM Takeoff | Kompleksowa obsługa: Wycena → Przetarg → Nadzór → Rozliczenie")
    
    # Save the PDF
    c.save()
    print(f"✅ PDF created: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    pdf_path = create_checklist()
    print(f"Checklist PDF has been created at: {pdf_path}")
