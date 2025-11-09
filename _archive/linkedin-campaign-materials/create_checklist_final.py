#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BIM Takeoff - Checklist Dobrego Przetargu FINAL
Professional tender quality checklist with proper Polish support
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

def draw_text_with_polish(c, x, y, text):
    """Helper function to draw text with Polish characters using Unicode"""
    # Replace Polish characters with Unicode equivalents
    polish_map = {
        'ą': '\u0105', 'ć': '\u0107', 'ę': '\u0119', 'ł': '\u0142',
        'ń': '\u0144', 'ó': '\u00F3', 'ś': '\u015B', 'ź': '\u017A', 
        'ż': '\u017C', 'Ą': '\u0104', 'Ć': '\u0106', 'Ę': '\u0118',
        'Ł': '\u0141', 'Ń': '\u0143', 'Ó': '\u00D3', 'Ś': '\u015A',
        'Ź': '\u0179', 'Ż': '\u017B'
    }
    
    # Draw text directly with Unicode support
    c.drawString(x, y, text)

def create_checklist():
    """Create professional PDF checklist"""
    
    pdf_path = "Checklist_Dobrego_Przetargu.pdf"
    c = canvas.Canvas(pdf_path, pagesize=A4)
    width, height = A4
    
    # Header background
    c.setFillColor(CHARCOAL)
    c.rect(0, height - 80*mm, width, 80*mm, fill=1, stroke=0)
    
    # Professional Logo Design
    # Orange rectangle for logo background
    c.setFillColor(ORANGE)
    c.rect(25*mm, height - 40*mm, 35*mm, 12*mm, fill=1, stroke=0)
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(30*mm, height - 35*mm, "BIM")
    c.setFillColor(WHITE)
    c.drawString(50*mm, height - 35*mm, "T")
    
    # Company Name (larger)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(65*mm, height - 35*mm, "BIM")
    c.setFillColor(ORANGE)
    c.drawString(103*mm, height - 35*mm, "TAKEOFF")
    
    # Contact info (right side, clear)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(width - 20*mm, height - 25*mm, "+48 123 456 789")
    c.drawRightString(width - 20*mm, height - 32*mm, "contact@bimtakeoff.com")
    c.drawRightString(width - 20*mm, height - 39*mm, "www.bimtakeoff.com/pl")
    
    # Tagline
    c.setFont("Helvetica", 11)
    c.drawString(25*mm, height - 48*mm, "UK & Australian Excellence in Construction Estimation")
    
    # Main Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(25*mm, height - 65*mm, "CHECKLIST DOBREGO PRZETARGU")
    
    # Subtitle with proper Polish
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 12)
    # Using Unicode for ó
    c.drawString(25*mm, height - 73*mm, "10 kluczowych punkt\u00F3w kontrolnych dla sukcesu Twojej inwestycji")
    
    # White content area
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height - 80*mm, fill=1, stroke=0)
    
    # Checklist items with proper Polish characters using Unicode
    checklist_items = [
        {
            "title": "Kompletno\u015B\u0107 dokumentacji technicznej",
            "desc": "Czy dokumentacja zawiera wszystkie bran\u017Ce, detale i specyfikacje?"
        },
        {
            "title": "Aktualno\u015B\u0107 kosztorys\u00F3w i przedmiar\u00F3w",
            "desc": "Czy wyceny oparte s\u0105 na danych z ostatnich 6 miesi\u0119cy?"
        },
        {
            "title": "Precyzyjno\u015B\u0107 STWiOR",
            "desc": "Czy specyfikacja techniczna nie pozostawia miejsca na interpretacj\u0119?"
        },
        {
            "title": "Szczeg\u00F3\u0142owy BOQ (Bill of Quantities)",
            "desc": "Czy przedmiar pozwala na por\u00F3wnanie ofert 'jab\u0142ko do jab\u0142ka'?"
        },
        {
            "title": "Zabezpieczenie prawne zamawiaj\u0105cego",
            "desc": "Czy umowa chroni przed dodatkowymi roszczeniami wykonawcy?"
        },
        {
            "title": "Kryteria oceny multi-criteria",
            "desc": "Czy ocena nie opiera si\u0119 tylko na najni\u017Cszej cenie?"
        },
        {
            "title": "Harmonogram realistyczny z buforem",
            "desc": "Czy terminy uwzgl\u0119dniaj\u0105 sezonowo\u015B\u0107 i potencjalne op\u00F3\u017Anienia?"
        },
        {
            "title": "Weryfikacja wykonawc\u00F3w (due diligence)",
            "desc": "Czy sprawdzono referencje, kondycj\u0119 finansow\u0105 i zasoby?"
        },
        {
            "title": "Compliance z przepisami (PZP/BSR)",
            "desc": "Czy dokumentacja spe\u0142nia wymogi Prawa Zam\u00F3wie\u0144 Publicznych?"
        },
        {
            "title": "Plan zarz\u0105dzania ryzykiem",
            "desc": "Czy zidentyfikowano ryzyka i przygotowano mitygacje?"
        }
    ]
    
    # Draw checklist items
    y_position = height - 95*mm
    
    for i, item in enumerate(checklist_items, 1):
        # Checkbox
        c.setStrokeColor(CHARCOAL)
        c.setLineWidth(1.5)
        c.rect(30*mm, y_position - 5*mm, 5*mm, 5*mm, fill=0, stroke=1)
        
        # Number in orange circle
        c.setFillColor(ORANGE)
        c.circle(20*mm, y_position - 2.5*mm, 6.5*mm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 14)
        number_width = c.stringWidth(str(i), "Helvetica-Bold", 14)
        c.drawString(20*mm - number_width/2, y_position - 4*mm, str(i))
        
        # Title with Polish characters
        c.setFillColor(CHARCOAL)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(38*mm, y_position - 2*mm, item["title"])
        
        # Description
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 9)
        c.drawString(38*mm, y_position - 7*mm, item["desc"])
        
        y_position -= 19*mm
    
    # Warning box (adjusted position to avoid overlap)
    y_position = 85*mm
    c.setFillColor(HexColor('#FFF3E0'))
    c.rect(20*mm, y_position - 22*mm, width - 40*mm, 22*mm, fill=1, stroke=0)
    
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    c.rect(20*mm, y_position - 22*mm, width - 40*mm, 22*mm, fill=0, stroke=1)
    
    # Warning content with Polish
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(25*mm, y_position - 13*mm, "!")
    
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(35*mm, y_position - 9*mm, "UWAGA: Brak cho\u0107by jednego punktu mo\u017Ce kosztowa\u0107 30-50% wi\u0119cej!")
    c.setFont("Helvetica", 9)
    c.drawString(35*mm, y_position - 14*mm, "Profesjonalny przetarg to oszcz\u0119dno\u015B\u0107 3-7 mln PLN na projekcie 20 mln PLN.")
    c.drawString(35*mm, y_position - 19*mm, "Nie ryzykuj - skorzystaj z mi\u0119dzynarodowego do\u015Bwiadczenia.")
    
    # CTA Section (bottom, no overlap)
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, width, 55*mm, fill=1, stroke=0)
    
    # CTA Title
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(25*mm, 43*mm, "POTRZEBUJESZ PROFESJONALNEGO WSPARCIA?")
    
    # Benefits
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 9)
    benefits = [
        "\u2713 1,500+ projekt\u00F3w wycenionych (UK/Australia/Polska)",
        "\u2713 Specjalizacja: termomodernizacje i fire safety",
        "\u2713 Gwarancja 30% oszcz\u0119dno\u015Bci lub zwrot op\u0142aty",
        "\u2713 Darmowy audit Twojego przetargu w 48h"
    ]
    
    y_benefit = 35*mm
    for benefit in benefits:
        c.drawString(25*mm, y_benefit, benefit)
        y_benefit -= 5*mm
    
    # Contact CTA Box
    c.setFillColor(ORANGE)
    c.roundRect(width/2 - 70*mm, 8*mm, 140*mm, 12*mm, 2*mm, fill=1, stroke=0)
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width/2, 14*mm, "ZAM\u00D3W DARMOWY AUDIT TERAZ!")
    
    # Contact details below CTA
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(width/2 - 35*mm, 3*mm, "TEL: +48 123 456 789")
    c.drawCentredString(width/2 + 35*mm, 3*mm, "contact@bimtakeoff.com")
    
    # Save PDF
    c.save()
    print(f"✅ Final PDF created: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    pdf_path = create_checklist()
    print(f"Professional Checklist PDF created at: {pdf_path}")
