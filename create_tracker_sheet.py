import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Create workbook
wb = openpyxl.Workbook()

# Style definitions
DARK_GREEN = "0F3822"
LIGHT_GREEN = "E8F5E9"
EMERALD = "10B981"
HEADER_GRAY = "F3F4F6"
BORDER_COLOR = "CBD5E1"

font_title = Font(name="Segoe UI", size=14, bold=True, color="FFFFFF")
font_section = Font(name="Segoe UI", size=12, bold=True, color="FFFFFF")
font_header = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
font_bold = Font(name="Segoe UI", size=10, bold=True, color="1E293B")
font_regular = Font(name="Segoe UI", size=10, color="334155")
font_link = Font(name="Segoe UI", size=10, color="0284C7", underline="single")

fill_dark_green = PatternFill(start_color=DARK_GREEN, end_color=DARK_GREEN, fill_type="solid")
fill_emerald = PatternFill(start_color=EMERALD, end_color=EMERALD, fill_type="solid")
fill_light_green = PatternFill(start_color=LIGHT_GREEN, end_color=LIGHT_GREEN, fill_type="solid")
fill_zebra = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")

thin_side = Side(border_style="thin", color=BORDER_COLOR)
cell_border = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)

align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
align_left_top = Alignment(horizontal="left", vertical="top", wrap_text=True)

# -------------------------------------------------------------
# TAB 1: Project_Overview (Problem Definition & Ideation)
# -------------------------------------------------------------
ws1 = wb.active
ws1.title = "Project_Overview"
ws1.views.sheetView[0].showGridLines = True

# Title Row
ws1.merge_cells("A1:D1")
ws1["A1"] = "1M1B GREEN INTERNSHIP (YIRP) — PROJECT OVERVIEW"
ws1["A1"].font = font_title
ws1["A1"].fill = fill_dark_green
ws1["A1"].alignment = align_center
ws1.row_dimensions[1].height = 35

# Section: Project Info
info_data = [
    ("Intern Name", "Rohith", "Project Title", "AGRI VISION 3D — Next-Gen Smart Agriculture"),
    ("Domain", "Agriculture & Environment (Priority 1)", "Target Group", "Small & Marginal Indian Farmers (Tamil Nadu focus)"),
    ("Mentorship Lead", "paramjeet@onemoneb.org", "SDG Alignment", "SDG 2 (Zero Hunger), SDG 6 (Clean Water), SDG 12 (Climate Action)"),
    ("Prototype Status", "Completed (Ready for Review)", "Key Tech", "React, Three.js 3D WebGL, AI Vision, Voice AI, Weather API")
]

row_num = 3
for r in info_data:
    ws1[f"A{row_num}"] = r[0]
    ws1[f"B{row_num}"] = r[1]
    ws1[f"C{row_num}"] = r[2]
    ws1[f"D{row_num}"] = r[3]
    for col in ["A", "C"]:
        ws1[f"{col}{row_num}"].font = font_bold
        ws1[f"{col}{row_num}"].fill = fill_light_green
        ws1[f"{col}{row_num}"].alignment = align_left
        ws1[f"{col}{row_num}"].border = cell_border
    for col in ["B", "D"]:
        ws1[f"{col}{row_num}"].font = font_regular
        ws1[f"{col}{row_num}"].alignment = align_left
        ws1[f"{col}{row_num}"].border = cell_border
    ws1.row_dimensions[row_num].height = 24
    row_num += 1

row_num += 1

# Section 1 Header: Problem Definition
ws1.merge_cells(f"A{row_num}:D{row_num}")
ws1[f"A{row_num}"] = "PART 1: PROBLEM DEFINITION (Challenges Faced by Indian Farmers)"
ws1[f"A{row_num}"].font = font_section
ws1[f"A{row_num}"].fill = fill_dark_green
ws1[f"A{row_num}"].alignment = align_left
ws1.row_dimensions[row_num].height = 28
row_num += 1

# Table Header for Problem Definition
ws1[f"A{row_num}"] = "S.No"
ws1[f"B{row_num}"] = "Problem Area"
ws1[f"C{row_num}"] = "Detailed Problem Definition"
ws1[f"D{row_num}"] = "Real-World Impact / Severity"
for col in ["A", "B", "C", "D"]:
    ws1[f"{col}{row_num}"].font = font_header
    ws1[f"{col}{row_num}"].fill = fill_emerald
    ws1[f"{col}{row_num}"].alignment = align_center if col == "A" else align_left
    ws1[f"{col}{row_num}"].border = cell_border
ws1.row_dimensions[row_num].height = 25
row_num += 1

problems = [
    ("1", "Severe Freshwater Wastage in Irrigation",
     "Traditional flood irrigation wastes 30% to 40% of fresh groundwater due to evaporation and uncontrolled field flooding because farmers lack visual root-zone moisture data.",
     "Groundwater depletion across agricultural basins; higher pumping electricity costs."),
    ("2", "Delayed Crop Disease Diagnosis",
     "Crop diseases (Paddy Blast, Tomato Blight, Root Wilt) are diagnosed after visible damage spreads. Farmers rely on indiscriminate chemical sprays that degrade soil and enter food supply.",
     "Annual crop losses of 20-30%; toxic chemical runoff into freshwater streams; high pesticide debt."),
    ("3", "Financial Exploitation by Middlemen",
     "Farmers lack direct access to wholesale buyers and live APMC mandi pricing, forcing them to sell through multiple commission agents at low prices.",
     "Farmers receive 20% to 35% below fair market value; economic distress in farming households."),
    ("4", "Digital Literacy & Language Barriers",
     "Existing smart agriculture apps are in English, cluttered with complex text and forms, and require typing, making them inaccessible to rural farmers.",
     "High barrier to technological adoption; smallholder farmers are left behind in the digital transition.")
]

for p in problems:
    ws1[f"A{row_num}"] = p[0]
    ws1[f"B{row_num}"] = p[1]
    ws1[f"C{row_num}"] = p[2]
    ws1[f"D{row_num}"] = p[3]
    ws1[f"A{row_num}"].alignment = align_center
    ws1[f"B{row_num}"].alignment = align_left_top
    ws1[f"C{row_num}"].alignment = align_left_top
    ws1[f"D{row_num}"].alignment = align_left_top
    ws1[f"B{row_num}"].font = font_bold
    for col in ["A", "C", "D"]:
        ws1[f"{col}{row_num}"].font = font_regular
    for col in ["A", "B", "C", "D"]:
        ws1[f"{col}{row_num}"].border = cell_border
        if int(p[0]) % 2 == 0:
            ws1[f"{col}{row_num}"].fill = fill_zebra
    ws1.row_dimensions[row_num].height = 42
    row_num += 1

row_num += 1

# Section 2 Header: Project Ideation & Solution
ws1.merge_cells(f"A{row_num}:D{row_num}")
ws1[f"A{row_num}"] = "PART 2: PROJECT IDEATION & SOLUTION (How AGRI VISION 3D Solves It)"
ws1[f"A{row_num}"].font = font_section
ws1[f"A{row_num}"].fill = fill_dark_green
ws1[f"A{row_num}"].alignment = align_left
ws1.row_dimensions[row_num].height = 28
row_num += 1

ws1[f"A{row_num}"] = "S.No"
ws1[f"B{row_num}"] = "Solution Pillar"
ws1[f"C{row_num}"] = "Project Ideation & Technical Implementation"
ws1[f"D{row_num}"] = "Environmental & Farmer Benefit"
for col in ["A", "B", "C", "D"]:
    ws1[f"{col}{row_num}"].font = font_header
    ws1[f"{col}{row_num}"].fill = fill_emerald
    ws1[f"{col}{row_num}"].alignment = align_center if col == "A" else align_left
    ws1[f"{col}{row_num}"].border = cell_border
ws1.row_dimensions[row_num].height = 25
row_num += 1

solutions = [
    ("1", "3D Digital Twin Farm & Soil Stratum",
     "Interactive Three.js 3D representation of farmer plots showing topsoil, root depth, and 5 dynamic layers: Crop growth, Soil moisture, Irrigation lines, Health index, and Soil type.",
     "Visual clarity for farmers without complex graphs; precise plot monitoring."),
    ("2", "AI Crop Doctor (Organic-First)",
     "Mobile camera leaf photo diagnosis using AI agronomy. Suggests TNAU-verified organic remedies (Panchagavya, Pseudomonas fluorescens) before chemical IPM.",
     "Restores soil microbiome; eliminates toxic chemical runoff; cuts pesticide costs by 40%."),
    ("3", "Smart Precision Irrigation Management",
     "Converts crop evapotranspiration (mm/day) and root-zone sensor moisture into exact daily liter requirements with scheduled drip runtimes.",
     "Conserves up to 30-40% irrigation water; prevents root rot and fertilizer leaching."),
    ("4", "Direct Farmer-to-Buyer Marketplace",
     "Commission-free marketplace with live Tamil Nadu APMC Mandi price tickers, allowing farmers to post harvest listings and connect directly with verified buyers via Call / WhatsApp.",
     "Eliminates middlemen cuts; increases farmer net profit by 20-30%."),
    ("5", "Tamil-First Voice Accessibility",
     "Native Tamil interface with built-in voice navigation and text-to-speech audio explanations so illiterate farmers can speak queries and listen to guidance.",
     "Ensures 100% inclusivity for rural farmers across varying literacy levels.")
]

for s in solutions:
    ws1[f"A{row_num}"] = s[0]
    ws1[f"B{row_num}"] = s[1]
    ws1[f"C{row_num}"] = s[2]
    ws1[f"D{row_num}"] = s[3]
    ws1[f"A{row_num}"].alignment = align_center
    ws1[f"B{row_num}"].alignment = align_left_top
    ws1[f"C{row_num}"].alignment = align_left_top
    ws1[f"D{row_num}"].alignment = align_left_top
    ws1[f"B{row_num}"].font = font_bold
    for col in ["A", "C", "D"]:
        ws1[f"{col}{row_num}"].font = font_regular
    for col in ["A", "B", "C", "D"]:
        ws1[f"{col}{row_num}"].border = cell_border
        if int(s[0]) % 2 == 0:
            ws1[f"{col}{row_num}"].fill = fill_zebra
    ws1.row_dimensions[row_num].height = 42
    row_num += 1

# Column widths for Sheet 1
ws1.column_dimensions["A"].width = 8
ws1.column_dimensions["B"].width = 28
ws1.column_dimensions["C"].width = 50
ws1.column_dimensions["D"].width = 38

# -------------------------------------------------------------
# TAB 2: Project_Tracker (Weekly Progress Tracker for 1M1B)
# -------------------------------------------------------------
ws2 = wb.create_sheet(title="Project_Tracker")
ws2.views.sheetView[0].showGridLines = True

# Title Row
ws2.merge_cells("A1:F1")
ws2["A1"] = "1M1B GREEN INTERNSHIP — WEEKLY PROJECT WORK TRACKER"
ws2["A1"].font = font_title
ws2["A1"].fill = fill_dark_green
ws2["A1"].alignment = align_center
ws2.row_dimensions[1].height = 35

# Subtitle
ws2.merge_cells("A2:F2")
ws2["A2"] = "Intern: Rohith | Program: YIRP | Project: AGRI VISION 3D | Mentor: paramjeet@onemoneb.org"
ws2["A2"].font = font_bold
ws2["A2"].fill = fill_light_green
ws2["A2"].alignment = align_center
ws2.row_dimensions[2].height = 22

# Tracker Headers exactly matching the MOM specification
headers = [
    ("Date / Week", 14),
    ("Project Milestone / Module", 25),
    ("Work Done in Detail (Technical Tasks Completed)", 48),
    ("Project Links (GitHub / Live / Docs)", 26),
    ("Overall Progress (%)", 18),
    ("Any Help from 1M1B (Mentor Support Required)", 32)
]

row_num = 4
for i, h in enumerate(headers, start=1):
    col_letter = get_column_letter(i)
    ws2[f"{col_letter}{row_num}"] = h[0]
    ws2[f"{col_letter}{row_num}"].font = font_header
    ws2[f"{col_letter}{row_num}"].fill = fill_emerald
    ws2[f"{col_letter}{row_num}"].alignment = align_center
    ws2[f"{col_letter}{row_num}"].border = cell_border
    ws2.column_dimensions[col_letter].width = h[1]

ws2.row_dimensions[row_num].height = 28
row_num += 1

# Tracker Rows pre-filled with the actual work done
tracker_rows = [
    ("06 Nov 2026", "Project Ideation & Problem Definition",
     "Selected Agriculture & Environment domain. Drafted problem statement on water wastage, delayed disease diagnosis, and fair trade. Defined AGRI VISION 3D scope for Indian farmers.",
     "Project Overview Tab", "Completed (100%)", "Guidance on 1M1B evaluation rubric."),
    ("10 Nov 2026", "Framework & Architecture Setup",
     "Initialized project with React 18, TypeScript, Vite, and Tailwind CSS. Structured modular architecture for 3D digital twins, agronomy modules, and multilingual support.",
     "Local Repository", "Completed (100%)", "None at this stage."),
    ("13 Nov 2026", "Core Agri Modules & AI Integration",
     "Implemented AI Crop Doctor (TNAU verified organic/IPM remedies), Smart Irrigation water budgeting calculator, Open-Meteo live weather telemetry for Tamil Nadu districts, and Mandi trade listings.",
     "Working Feature Suite", "Completed (100%)", "Suggested agricultural API recommendations."),
    ("14 Nov 2026", "3D Digital Twin & 7-Stage Crop Phenology",
     "Built Three.js WebGL 3D farm environment with 5,600+ instanced rice plants, moving tractor, and coconut palms. Created interactive 7-stage botanical crop growth visualization with root depth tracking.",
     "3D WebGL Engine", "Completed (100%)", "Mentor review on prototype usability for rural farmers."),
    ("15 Nov 2026", "Cinematic Video Hero & Visual Upgrade",
     "Integrated 4K drone agricultural video hero with glassmorphic telemetry cards (Crop health, moisture, temp waveforms), Tamil voice navigation, and 6-scene agricultural storytelling scroll.",
     "Cinematic Interface", "Completed (100%)", "Review on alignment with 1M1B Green Innovation standards."),
    ("17 Nov 2026 (Today)", "Prototype Testing & Tracker Submission",
     "Verified zero-error production build. Documented Problem Definition, Project Ideation, and created official Google Sheets tracker for Paramjeet Sir's review.",
     "Rohith_YIRP Tracker", "Prototype Ready (90%)", "Seeking initial approval from Paramjeet Sir for prototype phase."),
    ("Upcoming (Nov 20-30)", "Cloud Deployment & Mentor Feedback",
     "Deploying to cloud hosting (Vercel/Netlify), connecting custom domain, and incorporating feedback from Thursday mentoring sessions.",
     "Deployment Pending", "Scheduled (Next Step)", "Assistance in scheduling mentor presentation slot.")
]

for row_data in tracker_rows:
    for i, val in enumerate(row_data, start=1):
        col_letter = get_column_letter(i)
        ws2[f"{col_letter}{row_num}"] = val
        ws2[f"{col_letter}{row_num}"].border = cell_border
        if i in [1, 5]:
            ws2[f"{col_letter}{row_num}"].alignment = align_center
            if i == 5 and "Completed" in val:
                ws2[f"{col_letter}{row_num}"].font = Font(name="Segoe UI", size=10, bold=True, color="15803D")
            elif i == 5 and "Ready" in val:
                ws2[f"{col_letter}{row_num}"].font = Font(name="Segoe UI", size=10, bold=True, color="0284C7")
            else:
                ws2[f"{col_letter}{row_num}"].font = font_regular
        else:
            ws2[f"{col_letter}{row_num}"].alignment = align_left_top
            ws2[f"{col_letter}{row_num}"].font = font_bold if i == 2 else font_regular
        
        if (row_num - 4) % 2 == 0:
            ws2[f"{col_letter}{row_num}"].fill = fill_zebra

    ws2.row_dimensions[row_num].height = 40
    row_num += 1

# Save workbook
file_path = "C:\\Users\\Rohith\\.gemini\\antigravity\\scratch\\agri-vision-3d\\Rohith_YIRP.xlsx"
wb.save(file_path)
print(f"Workbook successfully saved to: {file_path}")
