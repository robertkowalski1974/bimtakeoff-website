const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, 
        AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

// BIM Takeoff Brand Colors
const ORANGE = "FF9900";
const CHARCOAL = "2C2C2C";
const GRAY = "666666";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F5F5F5";

// Create the document
const doc = new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: "Arial",
                    size: 22 // 11pt default
                }
            }
        },
        paragraphStyles: [
            {
                id: "Title",
                name: "Title",
                basedOn: "Normal",
                run: {
                    size: 48, // 24pt
                    bold: true,
                    color: ORANGE,
                    font: "Arial"
                },
                paragraph: {
                    spacing: { before: 240, after: 480 },
                    alignment: AlignmentType.CENTER
                }
            },
            {
                id: "Subtitle",
                name: "Subtitle",
                basedOn: "Normal",
                run: {
                    size: 28, // 14pt
                    color: CHARCOAL,
                    font: "Arial"
                },
                paragraph: {
                    spacing: { before: 120, after: 240 },
                    alignment: AlignmentType.CENTER
                }
            },
            {
                id: "ChecklistItem",
                name: "Checklist Item",
                basedOn: "Normal",
                run: {
                    size: 24, // 12pt
                    bold: true,
                    color: CHARCOAL,
                    font: "Arial"
                },
                paragraph: {
                    spacing: { before: 120, after: 60 }
                }
            },
            {
                id: "ChecklistDesc",
                name: "Checklist Description",
                basedOn: "Normal",
                run: {
                    size: 20, // 10pt
                    color: GRAY,
                    font: "Arial"
                },
                paragraph: {
                    spacing: { before: 0, after: 180 },
                    indent: { left: 720 }
                }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: "checklist",
                levels: [{
                    level: 0,
                    format: LevelFormat.DECIMAL,
                    text: "%1.",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 }
                        },
                        run: {
                            color: ORANGE,
                            bold: true,
                            size: 28
                        }
                    }
                }]
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                margin: {
                    top: 1440,
                    right: 1440,
                    bottom: 1440,
                    left: 1440
                }
            }
        },
        children: [
            // Logo - path updated for local use
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 240 },
                children: [
                    new ImageRun({
                        type: "jpg",
                        data: fs.readFileSync("./BIM TAKEOFF V2-2.jpg"), // Update path when running locally
                        transformation: {
                            width: 250,
                            height: 80
                        },
                        altText: {
                            title: "BIM Takeoff Logo",
                            description: "BIM Takeoff company logo",
                            name: "Logo"
                        }
                    })
                ]
            }),
            
            // Company tagline
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 },
                children: [
                    new TextRun({
                        text: "UK & Australian Excellence in Construction Estimation",
                        size: 24,
                        italics: true,
                        color: GRAY
                    })
                ]
            }),

            // Main title
            new Paragraph({
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "CHECKLIST DOBREGO PRZETARGU",
                        bold: true,
                        size: 48,
                        color: ORANGE
                    })
                ]
            }),

            // Subtitle
            new Paragraph({
                style: "Subtitle",
                children: [
                    new TextRun({
                        text: "10 kluczowych punktów kontrolnych dla sukcesu Twojej inwestycji"
                    })
                ]
            }),

            // Checklist items
            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Kompletność dokumentacji technicznej",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy dokumentacja zawiera wszystkie branże, detale i specyfikacje?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Aktualność kosztorysów i przedmiarów",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy wyceny oparte są na danych z ostatnich 6 miesięcy?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Precyzyjność STWiOR",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy specyfikacja techniczna nie pozostawia miejsca na interpretację?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Szczegółowy BOQ (Bill of Quantities)",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy przedmiar pozwala na porównanie ofert 'jabłko do jabłka'?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Zabezpieczenie prawne zamawiającego",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy umowa chroni przed dodatkowymi roszczeniami wykonawcy?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Kryteria oceny multi-criteria",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy ocena nie opiera się tylko na najniższej cenie?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Harmonogram realistyczny z buforem",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy terminy uwzględniają sezonowość i potencjalne opóźnienia?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Weryfikacja wykonawców (due diligence)",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy sprawdzono referencje, kondycję finansową i zasoby?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Compliance z przepisami (PZP/BSR)",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy dokumentacja spełnia wymogi Prawa Zamówień Publicznych?"
                    })
                ]
            }),

            new Paragraph({
                numbering: { reference: "checklist", level: 0 },
                children: [
                    new TextRun({
                        text: "Plan zarządzania ryzykiem",
                        bold: true,
                        size: 24
                    })
                ]
            }),
            new Paragraph({
                style: "ChecklistDesc",
                children: [
                    new TextRun({
                        text: "Czy zidentyfikowano ryzyka i przygotowano mitygacje?"
                    })
                ]
            }),

            // Warning section
            new Paragraph({
                spacing: { before: 480, after: 240 },
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "⚠️ UWAGA: ",
                        bold: true,
                        size: 28,
                        color: ORANGE
                    }),
                    new TextRun({
                        text: "Brak choćby jednego punktu może kosztować 30-50% więcej!",
                        bold: true,
                        size: 24,
                        color: CHARCOAL
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 240 },
                children: [
                    new TextRun({
                        text: "Profesjonalny przetarg to oszczędność 3-7 mln PLN na projekcie 20 mln PLN.",
                        size: 22,
                        color: CHARCOAL
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 },
                children: [
                    new TextRun({
                        text: "Nie ryzykuj - skorzystaj z międzynarodowego doświadczenia.",
                        size: 22,
                        italics: true,
                        color: GRAY
                    })
                ]
            }),

            // CTA Section
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 480, after: 240 },
                children: [
                    new TextRun({
                        text: "POTRZEBUJESZ PROFESJONALNEGO WSPARCIA?",
                        bold: true,
                        size: 32,
                        color: ORANGE
                    })
                ]
            }),

            // Benefits table
            new Table({
                columnWidths: [9360],
                margins: { top: 120, bottom: 120, left: 240, right: 240 },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 9360, type: WidthType.DXA },
                                shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({
                                        spacing: { before: 120, after: 60 },
                                        children: [
                                            new TextRun({
                                                text: "✓ 1,500+ projektów wycenionych (UK/Australia/Polska)",
                                                size: 22,
                                                color: CHARCOAL
                                            })
                                        ]
                                    }),
                                    new Paragraph({
                                        spacing: { before: 60, after: 60 },
                                        children: [
                                            new TextRun({
                                                text: "✓ Specjalizacja: termomodernizacje i fire safety",
                                                size: 22,
                                                color: CHARCOAL
                                            })
                                        ]
                                    }),
                                    new Paragraph({
                                        spacing: { before: 60, after: 60 },
                                        children: [
                                            new TextRun({
                                                text: "✓ Gwarancja 30% oszczędności lub zwrot opłaty",
                                                size: 22,
                                                color: CHARCOAL
                                            })
                                        ]
                                    }),
                                    new Paragraph({
                                        spacing: { before: 60, after: 120 },
                                        children: [
                                            new TextRun({
                                                text: "✓ Darmowy audit Twojego przetargu w 48h",
                                                size: 22,
                                                color: CHARCOAL
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),

            // Contact CTA
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 360, after: 120 },
                children: [
                    new TextRun({
                        text: "ZAMÓW DARMOWY AUDIT TERAZ!",
                        bold: true,
                        size: 36,
                        color: ORANGE,
                        highlight: "yellow"
                    })
                ]
            }),

            // Contact details
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 120, after: 60 },
                children: [
                    new TextRun({
                        text: "📞 TEL: +48 123 456 789",
                        bold: true,
                        size: 28,
                        color: CHARCOAL
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 60, after: 60 },
                children: [
                    new TextRun({
                        text: "✉️ EMAIL: contact@bimtakeoff.com",
                        bold: true,
                        size: 28,
                        color: CHARCOAL
                    })
                ]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 60, after: 240 },
                children: [
                    new TextRun({
                        text: "🌐 www.bimtakeoff.com/pl",
                        bold: true,
                        size: 28,
                        color: CHARCOAL
                    })
                ]
            }),

            // Footer
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 480 },
                children: [
                    new TextRun({
                        text: "© 2025 BIM Takeoff | Kompleksowa obsługa: Wycena → Przetarg → Nadzór → Rozliczenie",
                        size: 18,
                        italics: true,
                        color: GRAY
                    })
                ]
            })
        ]
    }]
});

// Generate the document
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Checklist_Dobrego_Przetargu.docx", buffer);
    console.log("✅ Word document created successfully: Checklist_Dobrego_Przetargu.docx");
});
