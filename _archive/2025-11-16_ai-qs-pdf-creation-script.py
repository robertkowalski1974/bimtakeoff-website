from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import datetime

# BIM Takeoff Brand Colors
BIM_ORANGE = HexColor('#FF9900')
BIM_CHARCOAL = HexColor('#2C2C2C')
BIM_WHITE = HexColor('#FFFFFF')
BIM_LIGHT_GRAY = HexColor('#F0F0F0')
BIM_MEDIUM_GRAY = HexColor('#757575')
BIM_DARK_GRAY = HexColor('#404040')

# Create PDF
filename = "/mnt/user-data/outputs/will-ai-replace-quantity-surveyors.pdf"
doc = SimpleDocTemplate(
    filename,
    pagesize=letter,
    rightMargin=72,
    leftMargin=72,
    topMargin=72,
    bottomMargin=72,
)

# Container for the 'Flowable' objects
story = []

# Define custom styles
styles = getSampleStyleSheet()

# Title style - Charcoal, Bold
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=36,
    textColor=BIM_CHARCOAL,
    spaceAfter=12,
    alignment=TA_LEFT,
    fontName='Helvetica-Bold',
    leading=42
)

# Subtitle style - Medium Gray
subtitle_style = ParagraphStyle(
    'CustomSubtitle',
    parent=styles['Normal'],
    fontSize=16,
    textColor=BIM_MEDIUM_GRAY,
    spaceAfter=30,
    alignment=TA_LEFT,
    fontName='Helvetica',
    leading=20
)

# Heading 1 - Charcoal, Bold with Orange underline (simulated)
h1_style = ParagraphStyle(
    'CustomH1',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=BIM_CHARCOAL,
    spaceAfter=12,
    spaceBefore=20,
    fontName='Helvetica-Bold',
    leading=28
)

# Heading 2 - Charcoal, Semi-bold
h2_style = ParagraphStyle(
    'CustomH2',
    parent=styles['Heading2'],
    fontSize=18,
    textColor=BIM_CHARCOAL,
    spaceAfter=10,
    spaceBefore=16,
    fontName='Helvetica-Bold',
    leading=22
)

# Heading 3 - Orange, Bold
h3_style = ParagraphStyle(
    'CustomH3',
    parent=styles['Heading3'],
    fontSize=14,
    textColor=BIM_ORANGE,
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold',
    leading=18
)

# Body text - Charcoal
body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontSize=11,
    textColor=BIM_CHARCOAL,
    spaceAfter=12,
    alignment=TA_JUSTIFY,
    fontName='Times-Roman',
    leading=14
)

# Callout box style
callout_style = ParagraphStyle(
    'Callout',
    parent=styles['Normal'],
    fontSize=12,
    textColor=BIM_CHARCOAL,
    spaceAfter=12,
    alignment=TA_JUSTIFY,
    fontName='Times-Roman',
    leading=16,
    leftIndent=20,
    rightIndent=20
)

# Bold body
bold_body_style = ParagraphStyle(
    'BoldBody',
    parent=body_style,
    fontName='Times-Bold'
)

# List item style
list_style = ParagraphStyle(
    'ListItem',
    parent=body_style,
    leftIndent=20,
    bulletIndent=10
)

# Add cover page with branding
story.append(Spacer(1, 1*inch))

# Title
story.append(Paragraph("Will AI Replace Quantity Surveyors?", title_style))

# Subtitle
story.append(Paragraph("The Reality Behind Construction's Digital Revolution", subtitle_style))

# Author and date
story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("<i>A data-driven perspective on artificial intelligence adoption in the construction industry</i>", 
                       ParagraphStyle('Italic', parent=body_style, fontSize=12, textColor=BIM_MEDIUM_GRAY, alignment=TA_LEFT)))

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("BIM Takeoff | November 2025", 
                       ParagraphStyle('Date', parent=body_style, fontSize=10, textColor=BIM_MEDIUM_GRAY)))

# Orange divider line
from reportlab.platypus import Table
divider = Table([['']], colWidths=[6.5*inch], rowHeights=[3])
divider.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BIM_ORANGE),
]))
story.append(Spacer(1, 0.5*inch))
story.append(divider)

story.append(PageBreak())

# Main content
story.append(Paragraph("The £495,680 Question", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

# Callout box
callout_content = """A recent study by C-Link revealed a striking figure: a Tier 1 main contractor spending approximately 16,000 hours annually on tender analysis alone - equivalent to £495,680 in quantity surveying time. With AI promising to cut these efforts by up to 50%, the construction industry stands at a crossroads that demands our attention."""
callout_table = Table([[Paragraph(callout_content, callout_style)]], colWidths=[6.5*inch])
callout_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BIM_LIGHT_GRAY),
    ('LEFTPADDING', (0, 0), (-1, -1), 15),
    ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ('TOPPADDING', (0, 0), (-1, -1), 15),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
    ('LINEBELOW', (0, 0), (0, 0), 4, BIM_ORANGE),
]))
story.append(callout_table)
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("""As someone deeply embedded in the quantity surveying and estimation sector, I've been following the rapid evolution of AI in our industry with both excitement and measured skepticism. The question on everyone's mind isn't whether AI will transform our profession - it already is - but rather how we, as construction professionals, will adapt and thrive alongside these powerful tools.""", body_style))

story.append(Spacer(1, 0.3*inch))

# The Current State section
story.append(Paragraph("The Current State: AI Is Already Here", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("""According to research from the Australian Institute of Quantity Surveyors (AIQS), BIM adoption has increased by 37% over the past two years, with AI-enhanced systems now automatically extracting quantities from complex models. Machine learning algorithms are creating dynamic cost models, analysing historical data to predict future expenditures with unprecedented accuracy.""", body_style))

story.append(Paragraph("Three Key Applications Reshaping Daily Work", h2_style))

story.append(Paragraph("<b>1. Automated Quantity Take-offs</b>", h3_style))
story.append(Paragraph("""AI-powered BIM systems can interpret complex model data and provide precise material measurements in seconds rather than hours. This isn't future technology - it's happening now across major construction firms globally.""", body_style))

story.append(Paragraph("<b>2. Predictive Cost Modeling</b>", h3_style))
story.append(Paragraph("""Machine learning algorithms analyse vast datasets of historical project costs, enabling more reliable estimates and early warning systems for cost overruns. A 2024 study published in Construction Engineering and Management demonstrates accuracy improvements of up to 40% in cost predictions.""", body_style))

story.append(Paragraph("<b>3. Intelligent Document Processing</b>", h3_style))
story.append(Paragraph("""AI systems can scan contracts, extract rates from PDFs, and flag problematic clauses instantly - tasks that previously consumed days of manual effort. Civils.ai reports their clients have cut data entry efforts by 50% while significantly reducing human error.""", body_style))

story.append(PageBreak())

# Will AI Replace Us section
story.append(Paragraph("Will AI Replace Us? The Evidence Says No", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

callout_content2 = """Despite the dramatic efficiency gains, multiple academic studies and industry analyses point to a clear conclusion: AI will change quantity surveying, but it won't replace surveyors entirely. Instead, AI will be a powerful tool that supports and enhances their work."""
callout_table2 = Table([[Paragraph(callout_content2, callout_style)]], colWidths=[6.5*inch])
callout_table2.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), HexColor('#f0f8ff')),
    ('LEFTPADDING', (0, 0), (-1, -1), 15),
    ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ('TOPPADDING', (0, 0), (-1, -1), 15),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
    ('LINEBELOW', (0, 0), (0, 0), 4, HexColor('#0066cc')),
]))
story.append(callout_table2)
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("""Research from Altus Group and Microsoft's 2023 report suggests that 44% of the average Australian worker's hours could be freed up to focus on higher-order tasks, but this doesn't mean replacement - it means evolution. The construction industry requires what AI currently cannot provide:""", body_style))

story.append(Spacer(1, 0.2*inch))

# Create a list of what AI cannot provide
competencies = [
    ("Practical Experience", "Practical construction experience and site knowledge that only comes from years of hands-on work."),
    ("Relationship Management", "Complex stakeholder relationship management and client communication that requires emotional intelligence."),
    ("Ethical Judgment", "Ethical judgment and professional responsibility that machines cannot replicate."),
    ("Creative Problem-Solving", "Creative problem-solving in unique situations where precedent doesn't exist."),
    ("Value Engineering", "Value engineering and strategic cost advice that considers multiple competing factors."),
    ("Human Intuition", "Human intuition for risk assessment that goes beyond pattern recognition.")
]

for title, desc in competencies:
    story.append(Paragraph(f"<b>• {title}:</b> {desc}", list_style))

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("""As noted in recent RICS guidance, AI will take over routine and data-heavy tasks, allowing surveyors to focus on critical thinking, judgment, and building strong relationships with clients - competencies that remain distinctly human.""", body_style))

story.append(PageBreak())

# The Real Obstacles section
story.append(Paragraph("The Real Obstacles: Why AI Adoption Remains Slow", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("""Despite the clear benefits, a comprehensive PRISMA review published in 2022 identified significant barriers to AI adoption in construction. Understanding these challenges is crucial for strategic planning.""", body_style))

story.append(Paragraph("1. Data Integration and Quality Issues", h2_style))
story.append(Paragraph("""The construction industry's fragmented nature creates significant data acquisition and standardisation challenges. Most algorithms require accurate data for training. Collecting large datasets is costly and time-consuming for most construction companies. Unlike industries with standardised processes, each construction project is unique, making data collection and application complex.""", body_style))

story.append(Paragraph("2. High Implementation Costs", h2_style))
story.append(Paragraph("""Research from Singapore and the UAE consistently identifies high cost of AI implementation and maintenance as primary barriers. For small to medium enterprises, which constitute the majority of construction firms, initial investment requirements can be prohibitive, with ROI timelines often unclear.""", body_style))

story.append(Paragraph("<b>Typical Costs:</b>", bold_body_style))
costs = [
    "AI software licenses: £10,000-50,000+ annually",
    "Hardware upgrades: £5,000-20,000 per workstation",
    "Training programs: £2,000-5,000 per employee",
    "Integration consultants: £100,000-500,000+ for enterprise deployments"
]
for cost in costs:
    story.append(Paragraph(f"• {cost}", list_style))

story.append(Paragraph("3. Skills Gap and Resistance to Change", h2_style))
story.append(Paragraph("""Approximately 70% of construction organizations report difficulty finding employees with the necessary skills in machine learning and artificial intelligence. Combined with cultural resistance - where 60% of construction experts cite resistance to new technologies as a major obstacle - the human factor becomes a significant barrier.""", body_style))

story.append(Paragraph("4. Technical Infrastructure Limitations", h2_style))
story.append(Paragraph("""Many construction companies lack the necessary IT infrastructure to support AI systems. Cloud computing adoption, essential for many AI applications, faces its own barriers in the construction sector, particularly regarding data security and bandwidth requirements on remote sites.""", body_style))

story.append(Paragraph("5. Regulatory and Ethical Concerns", h2_style))
story.append(Paragraph("""The absence of clear legal frameworks and industry standards for AI use in construction creates uncertainty. Data privacy concerns, liability questions for AI-driven decisions, and the lack of standardised guidelines compound adoption challenges.""", body_style))

story.append(PageBreak())

# The Path Forward section
story.append(Paragraph("The Path Forward: Augmentation, Not Replacement", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

callout_content3 = """The future of quantity surveying lies not in human versus machine, but in human with machine. McKinsey's designation of 2023 as the "breakout year" for generative AI signals a paradigm shift, with the technology expected to contribute up to AU$115 billion annually to Australia's economy alone."""
callout_table3 = Table([[Paragraph(callout_content3, callout_style)]], colWidths=[6.5*inch])
callout_table3.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), HexColor('#e8f5e9')),
    ('LEFTPADDING', (0, 0), (-1, -1), 15),
    ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ('TOPPADDING', (0, 0), (-1, -1), 15),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
    ('LINEBELOW', (0, 0), (0, 0), 4, HexColor('#4caf50')),
]))
story.append(callout_table3)
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Strategic Recommendations for Professionals", h2_style))

recommendations = [
    ("Embrace Continuous Learning", "Develop AI literacy without abandoning core QS competencies. Understanding how to craft effective AI prompts and interpret outputs will become as essential as reading drawings."),
    ("Focus on Value-Added Services", "As AI handles routine tasks, position yourself in areas requiring human expertise - client relationships, strategic advice, risk management, and complex problem-solving."),
    ("Invest in Data Management", "Companies that systematically collect and organise project data today will have significant competitive advantages tomorrow. Start building comprehensive project databases now."),
    ("Collaborate, Don't Compete", "View AI as a junior colleague that handles repetitive tasks, allowing you to focus on professional judgment and strategic decision-making."),
    ("Lead the Change", "Those who actively participate in AI integration will shape how it's implemented, ensuring human expertise remains valued and central to the profession.")
]

for title, desc in recommendations:
    story.append(Paragraph(f"<b>{title}:</b> {desc}", body_style))
    story.append(Spacer(1, 0.15*inch))

story.append(PageBreak())

# The Bottom Line section
story.append(Paragraph("The Bottom Line", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

# Dark box for bottom line
bottom_line_content = """<b>AI in Construction: Revolution, Not Replacement</b><br/><br/>AI in construction isn't about replacement - it's about revolution in how we work. The construction industry has always been slow to adopt new technologies, but those who embrace this change strategically will find themselves at a significant advantage.<br/><br/>The question isn't whether AI will replace quantity surveyors - extensive research clearly indicates it won't. <b>The real question is: How quickly can we adapt to leverage these tools effectively while maintaining the human elements that make our profession invaluable?</b><br/><br/>As we stand at this technological inflection point, remember that every previous industrial revolution created more opportunities than it eliminated. The key is positioning ourselves not as victims of change, but as its architects."""

bottom_line_style = ParagraphStyle(
    'BottomLine',
    parent=callout_style,
    textColor=BIM_WHITE,
    fontSize=11,
    leading=15
)

bottom_line_table = Table([[Paragraph(bottom_line_content, bottom_line_style)]], colWidths=[6.5*inch])
bottom_line_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BIM_CHARCOAL),
    ('LEFTPADDING', (0, 0), (-1, -1), 25),
    ('RIGHTPADDING', (0, 0), (-1, -1), 25),
    ('TOPPADDING', (0, 0), (-1, -1), 25),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 25),
    ('LINEABOVE', (0, 0), (0, 0), 3, BIM_ORANGE),
]))
story.append(bottom_line_table)
story.append(Spacer(1, 0.5*inch))

# CTA section
cta_content = """<b>Ready to Embrace the AI Revolution?</b><br/><br/>BIM Takeoff combines cutting-edge AI-enhanced BIM 5D technology with 20 years of professional quantity surveying experience. We deliver the speed of automation with the accuracy of human expertise.<br/><br/>✓ AI-Enhanced BIM 5D Technology<br/>✓ ±3-5% Estimation Accuracy<br/>✓ 3-10 Day Delivery Timeline<br/><br/>Contact us at www.bimtakeoff.com"""

cta_style = ParagraphStyle(
    'CTA',
    parent=callout_style,
    textColor=BIM_WHITE,
    fontSize=11,
    leading=15,
    alignment=TA_CENTER
)

cta_table = Table([[Paragraph(cta_content, cta_style)]], colWidths=[6.5*inch])
cta_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BIM_CHARCOAL),
    ('LEFTPADDING', (0, 0), (-1, -1), 25),
    ('RIGHTPADDING', (0, 0), (-1, -1), 25),
    ('TOPPADDING', (0, 0), (-1, -1), 25),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 25),
    ('LINEABOVE', (0, 0), (0, 0), 3, BIM_ORANGE),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
]))
story.append(cta_table)

story.append(PageBreak())

# References section
story.append(Paragraph("Key Academic References", h1_style))
story.append(divider)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("This article draws on extensive research from leading academic and industry sources:", body_style))
story.append(Spacer(1, 0.2*inch))

references = [
    "PRISMA Review: 'Opportunities and Adoption Challenges of AI in the Construction Industry' - Regona et al. (2022)",
    "Construction Engineering and Management: 'AI-augmented construction cost estimation: Natural Language Processing model' (2025)",
    "Journal of Construction Engineering and Management: 'Artificial Intelligence in Construction Project Management: Evolution and Future Trends' (2024)",
    "Supply Chain Management: 'Identifying issues in adoption of AI practices in Construction Supply Chains' (2023)",
    "Altus Group & AIQS: 'Cracking the Code: How Will AI Transform Quantity Surveying?' - Cody Bui (2024)",
    "Microsoft & Tech Council of Australia: 'Generative AI Economic Impact Report' (2023)",
    "C-Link Research: Tender analysis time and cost study (2024)",
    "RICS Guidance: AI and automation in quantity surveying practice (2024)"
]

for ref in references:
    story.append(Paragraph(f"• {ref}", list_style))

story.append(Spacer(1, 0.5*inch))

# Footer
footer_style = ParagraphStyle(
    'Footer',
    parent=body_style,
    fontSize=9,
    textColor=BIM_MEDIUM_GRAY,
    alignment=TA_CENTER
)

story.append(Paragraph("_______________________________________________", footer_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("© 2025 BIM Takeoff | www.bimtakeoff.com", footer_style))
story.append(Paragraph("Professional Construction Cost Estimation & Quantity Surveying Services", footer_style))

# Build PDF
doc.build(story)

print(f"PDF created successfully: {filename}")
