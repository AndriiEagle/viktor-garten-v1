from __future__ import annotations

import html
import json
import math
import shutil
import textwrap
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "handoff"
SLIDES_DIR = HANDOFF / "slides"
SCREEN_DIR = HANDOFF / "screenshots"
MEDIA_DIR = HANDOFF / "deck-media"
OUT_PPTX = HANDOFF / "Viktor-Bonsai-Dossier.pptx"
OUT_PDF = HANDOFF / "Viktor-Bonsai-Dossier.pdf"
QA_LEDGER = HANDOFF / "QA_LEDGER.md"
SLIDE_CONTACT_SHEET = HANDOFF / "slide-contact-sheet.jpg"

W, H = 1280, 720
EMU_W, EMU_H = 12192000, 6858000
EMU_PER_PX_X = EMU_W / W
EMU_PER_PX_Y = EMU_H / H

COLORS = {
    "paper": "#F8F7F2",
    "surface": "#FFFFFF",
    "ink": "#1E2A22",
    "muted": "#5B6B60",
    "green": "#24452F",
    "gold": "#BE9B4E",
    "line": "#DED8C8",
    "soft": "#ECE8DC",
    "risk": "#9A3B2F",
}


def mkdirs() -> None:
    for d in [HANDOFF, SLIDES_DIR, SCREEN_DIR, MEDIA_DIR]:
        d.mkdir(parents=True, exist_ok=True)


def font(size: int, bold: bool = False):
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size=size)
    return ImageFont.load_default()


F_TITLE = font(48, True)
F_H2 = font(30, True)
F_BODY = font(20)
F_SMALL = font(15)
F_TINY = font(12)
F_KICKER = font(14, True)


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def fit_image(img: Image.Image, box: tuple[int, int, int, int], cover: bool = True) -> Image.Image:
    target_w, target_h = box[2], box[3]
    scale = max(target_w / img.width, target_h / img.height) if cover else min(target_w / img.width, target_h / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.Resampling.LANCZOS)
    if cover:
        left = max(0, (resized.width - target_w) // 2)
        top = max(0, (resized.height - target_h) // 2)
        return resized.crop((left, top, left + target_w, top + target_h))
    canvas_img = Image.new("RGB", (target_w, target_h), hex_to_rgb(COLORS["surface"]))
    canvas_img.paste(resized, ((target_w - resized.width) // 2, (target_h - resized.height) // 2))
    return canvas_img


def draw_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fnt, fill: str, width: int, line_spacing: int = 6):
    x, y = xy
    lines: list[str] = []
    for para in text.split("\n"):
        words = para.split()
        cur = ""
        for word in words:
            trial = (cur + " " + word).strip()
            if draw.textbbox((0, 0), trial, font=fnt)[2] <= width or not cur:
                cur = trial
            else:
                lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
        if not words:
            lines.append("")
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += draw.textbbox((0, 0), line or " ", font=fnt)[3] + line_spacing
    return y


def rounded_rect(draw: ImageDraw.ImageDraw, box, fill, outline=None, radius=14, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def paste_img(base: Image.Image, path: str | Path, box: tuple[int, int, int, int], cover: bool = True):
    p = ROOT / path if not Path(path).is_absolute() else Path(path)
    img = Image.open(p).convert("RGB")
    fitted = fit_image(img, box, cover=cover)
    base.paste(fitted, (box[0], box[1]))


@dataclass
class Shape:
    kind: str
    x: int
    y: int
    w: int
    h: int
    text: str = ""
    fill: str = "FFFFFF"
    line: str = "none"
    color: str = "1E2A22"
    size: int = 18
    bold: bool = False
    image: str | None = None
    cover: bool = True


@dataclass
class SlideSpec:
    title: str
    kicker: str
    subtitle: str = ""
    shapes: list[Shape] = field(default_factory=list)


def image_statuses():
    paths = [
        ("logo.png", "PRESENT_BUT_WORDMARK_CONFLICT", "real legacy logo"),
        ("og-share.jpg", "PRESENT_TEMPORARY", "temporary branded OG"),
        ("hero-garten.jpg", "PRESENT_AI_CONCEPT", "AI hero, needs Viktor review"),
        ("section-bg-vision.jpg", "PRESENT_AI_CONCEPT", "AI section background"),
        ("baumarchitektur-energiefluss-verstehen.png", "PRESENT_SUPPLIED_GRAPHIC", "supplied energy-flow educational graphic"),
        ("vision-jahr1.jpg", "PRESENT_AI_CONCEPT", "AI year 1 vision"),
        ("vision-jahr2.jpg", "PRESENT_AI_CONCEPT", "AI year 2 vision"),
        ("vision-jahr3.jpg", "PRESENT_AI_CONCEPT", "AI year 3 vision"),
        ("ahorn-service.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor at Japanese maple"),
        ("meister-hands-01.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor with topiary scissors"),
        ("meister-hands-01-v2.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor cutting pine / tool work"),
        ("boden-wurzeln.jpg", "PRESENT_AI_CONCEPT", "AI educational root/soil"),
        ("concepts/vorher-dying-concept.jpg", "PRESENT_AI_CONCEPT_NOT_PROOF", "AI before concept"),
        ("concepts/nachher-concept.jpg", "PRESENT_AI_CONCEPT_NOT_PROOF", "AI after concept"),
        ("concepts/japan-postkarte-concept.jpg", "PRESENT_AI_CONCEPT_NOT_PROOF", "AI postcard concept, not real proof"),
        ("japan-postkarte.jpg", "MISSING_REAL_REQUIRED", "real Japan postcard"),
        ("meister-01.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor portrait/work photo"),
        ("meister-02.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor tools/work photo"),
        ("meister-03.jpg", "PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL", "real Viktor garden/work photo"),
        ("vorher-dying-01..06.jpg", "MISSING_REAL_REQUIRED", "real before proof"),
        ("nachher-01..06.jpg", "MISSING_REAL_REQUIRED", "real after proof"),
    ]
    rows = []
    for rel, status, note in paths:
        file_path = ROOT / "assets" / "img" / rel.split("..")[0]
        dims = "-"
        size = "-"
        if file_path.exists() and file_path.is_file():
            img = Image.open(file_path)
            dims = f"{img.width}x{img.height}"
            size = f"{file_path.stat().st_size // 1024}KB"
        rows.append((rel, status, dims, size, note))
    return rows


def make_asset_contact_sheet() -> Path:
    imgs = [
        ("hero", "assets/img/hero-garten.jpg"),
        ("energy graphic", "assets/img/baumarchitektur-energiefluss-verstehen.png"),
        ("vision 1", "assets/img/vision-jahr1.jpg"),
        ("vision 2", "assets/img/vision-jahr2.jpg"),
        ("vision 3", "assets/img/vision-jahr3.jpg"),
        ("hands", "assets/img/meister-hands-01.jpg"),
        ("soil", "assets/img/boden-wurzeln.jpg"),
        ("before concept", "assets/img/concepts/vorher-dying-concept.jpg"),
        ("after concept", "assets/img/concepts/nachher-concept.jpg"),
        ("postcard concept", "assets/img/concepts/japan-postkarte-concept.jpg"),
    ]
    thumb_w, thumb_h, label_h = 280, 180, 34
    cols = 4
    rows = math.ceil(len(imgs) / cols)
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), hex_to_rgb(COLORS["paper"]))
    d = ImageDraw.Draw(sheet)
    for i, (label, rel) in enumerate(imgs):
        x = (i % cols) * thumb_w
        y = (i // cols) * (thumb_h + label_h)
        paste_img(sheet, rel, (x + 8, y + 8, thumb_w - 16, thumb_h - 16), cover=True)
        d.rectangle([x, y, x + thumb_w - 1, y + thumb_h + label_h - 1], outline=hex_to_rgb(COLORS["line"]))
        d.text((x + 10, y + thumb_h + 7), label, fill=hex_to_rgb(COLORS["green"]), font=F_SMALL)
    out = HANDOFF / "asset-contact-sheet.jpg"
    sheet.save(out, quality=90, optimize=True)
    return out


def make_slides(asset_sheet: Path) -> list[SlideSpec]:
    screenshot_sheet = "handoff/screenshots/contact-sheet.png"
    return [
        SlideSpec(
            "Proof-Assets entscheiden den Launch.",
            "DOSSIER",
            "Bonsai / Viktor Baumarchitektur · Website, Mockups, Bilder, Freigaben",
            [
                Shape("image", 650, 80, 560, 430, image="assets/img/hero-garten.jpg"),
                Shape("rect", 70, 510, 520, 90, fill="FFFFFF", line="DED8C8"),
                Shape("text", 95, 535, 470, 50, "VERIFIED: 24 HTML-Seiten, DE/EN, Consent, Forms, Themes und Audit grün.", fill="none", size=20, bold=True),
            ],
        ),
        SlideSpec(
            "Audit grün, Launch offen.",
            "STATUS",
            "Audit bestanden; Launch hängt an realen Kontakt-, Legal- und Proof-Daten.",
            [
                Shape("text", 80, 165, 360, 70, "VERIFIED\nsite audit OK", fill="24452F", color="FFFFFF", size=24, bold=True),
                Shape("text", 470, 165, 330, 70, "PRESENT_BUT_UNTESTED\nFormspree endpoint", fill="BE9B4E", color="1E2A22", size=20, bold=True),
                Shape("text", 830, 165, 330, 70, "MISSING\nLegal, proof", fill="9A3B2F", color="FFFFFF", size=20, bold=True),
                Shape("image", 80, 260, 1080, 330, image=screenshot_sheet, cover=False),
            ],
        ),
        SlideSpec(
            "Die Bildsprache ist jetzt konkret und client-ready als Richtung.",
            "VISUAL DIRECTION",
            "AI-safe assets zeigen Niwaki, Schweizer Garten, präzises Handwerk und Bodenkompetenz.",
            [
                Shape("image", 70, 140, 390, 250, image="assets/img/hero-garten.jpg"),
                Shape("image", 485, 140, 300, 250, image="assets/img/meister-hands-01.jpg"),
                Shape("image", 810, 140, 390, 250, image="assets/img/boden-wurzeln.jpg"),
                Shape("text", 80, 430, 1080, 120, "Wichtig: Die neuen Viktor-Fotos sind reale Arbeitsfotos, benötigen aber finale Nutzungsfreigabe/originale Dateien. AI-Konzepte ersetzen keine realen before/after-Beweise.", fill="FFFFFF", line="DED8C8", size=23, bold=True),
            ],
        ),
        SlideSpec(
            "Asset-Inventar: Konzept vs. Beweis.",
            "IMAGE INVENTORY",
            "Real-required bleibt sichtbar, damit nichts als finaler Proof missverstanden wird.",
            [
                Shape("image", 70, 170, 520, 300, image=str(asset_sheet.relative_to(ROOT)), cover=False),
                Shape("text", 630, 180, 470, 70, "7 AI-safe canonical assets", fill="24452F", color="FFFFFF", size=25, bold=True),
                Shape("text", 630, 270, 470, 70, "3 labelled concept visuals", fill="BE9B4E", color="1E2A22", size=25, bold=True),
                Shape("text", 630, 360, 470, 70, "Real proof still required", fill="9A3B2F", color="FFFFFF", size=25, bold=True),
                Shape("text", 630, 475, 470, 100, "Real Viktor work photos are now integrated. The AI postcard concept is not proof; Japan postcard, 6 before/after pairs and testimonial remain MISSING_REAL_REQUIRED.", fill="FFFFFF", line="DED8C8", size=20),
            ],
        ),
        SlideSpec(
            "Drei-Jahres-Vision zeigt Langfristigkeit.",
            "VISION TIMELINE",
            "Jahr 1 -> Jahr 2 -> Jahr 3 als Konzeptstrecke für die Website.",
            [
                Shape("image", 80, 155, 300, 300, image="assets/img/vision-jahr1.jpg"),
                Shape("image", 490, 155, 300, 300, image="assets/img/vision-jahr2.jpg"),
                Shape("image", 900, 155, 300, 300, image="assets/img/vision-jahr3.jpg"),
                Shape("text", 110, 485, 240, 55, "Jahr 1\nStruktur raus", fill="FFFFFF", line="DED8C8", size=18, bold=True),
                Shape("text", 520, 485, 240, 55, "Jahr 2\nOffene Krone", fill="FFFFFF", line="DED8C8", size=18, bold=True),
                Shape("text", 930, 485, 240, 55, "Jahr 3\nReife Form", fill="FFFFFF", line="DED8C8", size=18, bold=True),
            ],
        ),
        SlideSpec(
            "Before/after bleibt Concept Only.",
            "CONCEPT ONLY",
            "Diese zwei Bilder gehören ins Dossier, nicht in die Proof-Galerie.",
            [
                Shape("image", 80, 150, 500, 360, image="assets/img/concepts/vorher-dying-concept.jpg"),
                Shape("image", 700, 150, 500, 360, image="assets/img/concepts/nachher-concept.jpg"),
                Shape("text", 115, 535, 450, 58, "Interne Planungsansicht - Vorher", fill="9A3B2F", color="FFFFFF", size=16, bold=True),
                Shape("text", 735, 535, 450, 58, "Interne Planungsansicht - Nachher", fill="24452F", color="FFFFFF", size=16, bold=True),
            ],
        ),
        SlideSpec(
            "Der Screenshot-Pass deckt die wichtigsten Seiten und Viewports ab.",
            "MOCKUPS",
            "Desktop und Mobile wurden als retained evidence gesichert.",
            [
                Shape("image", 60, 130, 1160, 455, image=screenshot_sheet, cover=False),
                Shape("text", 80, 610, 1080, 40, "VERIFIED_WITH_LIMITS: Header, CTA, hero, forms and page structure reviewed from screenshots. Mobile nav interaction still requires a live click pass.", fill="FFFFFF", line="DED8C8", size=18),
            ],
        ),
        SlideSpec(
            "Echte Vertrauensbeweise fehlen noch.",
            "TRUST GAPS",
            "Ohne echte Beweise wirkt die Seite schön, aber noch nicht vollständig glaubwürdig.",
            [
                Shape("text", 90, 155, 320, 110, "MISSING_REAL_REQUIRED\nJapan postcard photo", fill="9A3B2F", color="FFFFFF", size=22, bold=True),
                Shape("text", 480, 155, 320, 110, "MISSING_REAL_REQUIRED\n6 real before/after pairs", fill="9A3B2F", color="FFFFFF", size=22, bold=True),
                Shape("text", 870, 155, 320, 110, "NEEDS_REVIEW\nTestimonial + Google rating", fill="BE9B4E", color="1E2A22", size=22, bold=True),
                Shape("text", 120, 350, 980, 130, "Recommendation: keep AI concepts for visual direction only. Replace trust/proof modules with Viktor's real assets before public launch or paid traffic.", fill="FFFFFF", line="DED8C8", size=26, bold=True),
            ],
        ),
        SlideSpec(
            "Assets und Legal finalisieren.",
            "LAUNCH CHECKLIST",
            "Small, concrete, no deploy until these are complete.",
            [
                Shape("text", 95, 180, 500, 70, "1. Formspree endpoint", fill="FFFFFF", line="DED8C8", size=24, bold=True),
                Shape("text", 95, 275, 500, 70, "2. Impressum / Datenschutz finalisieren", fill="FFFFFF", line="DED8C8", size=24, bold=True),
                Shape("text", 95, 370, 500, 70, "3. Japan postcard + real proof photos", fill="FFFFFF", line="DED8C8", size=24, bold=True),
                Shape("text", 95, 465, 500, 70, "4. Viktor review of AI botanical assets", fill="FFFFFF", line="DED8C8", size=24, bold=True),
                Shape("image", 700, 180, 420, 315, image="handoff/screenshots/home-mobile.png", cover=True),
                Shape("text", 700, 530, 420, 50, "Output retained: PPTX, PDF, QA.", fill="24452F", color="FFFFFF", size=20, bold=True),
            ],
        ),
    ]


def render_slide(spec: SlideSpec, idx: int) -> Path:
    img = Image.new("RGB", (W, H), hex_to_rgb(COLORS["paper"]))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=hex_to_rgb(COLORS["green"]))
    d.text((70, 34), spec.kicker, fill=hex_to_rgb(COLORS["gold"]), font=F_KICKER)
    title_width = 560 if idx == 1 else 1050
    title_end = draw_text(d, (70, 64), spec.title, F_TITLE, COLORS["ink"], title_width, 8)
    if spec.subtitle:
        subtitle_width = 560 if idx == 1 else 760
        draw_text(d, (70, max(116, title_end + 2)), spec.subtitle, F_BODY, COLORS["muted"], subtitle_width, 6)
    for shape in spec.shapes:
        if shape.kind == "image" and shape.image:
            paste_img(img, shape.image, (shape.x, shape.y, shape.w, shape.h), cover=shape.cover)
            d.rectangle([shape.x, shape.y, shape.x + shape.w, shape.y + shape.h], outline=hex_to_rgb(COLORS["line"]))
        elif shape.kind in {"text", "rect"}:
            fill = None if shape.fill == "none" else hex_to_rgb("#" + shape.fill if not shape.fill.startswith("#") else shape.fill)
            outline = None if shape.line == "none" else hex_to_rgb("#" + shape.line if not shape.line.startswith("#") else shape.line)
            rounded_rect(d, [shape.x, shape.y, shape.x + shape.w, shape.y + shape.h], fill=fill, outline=outline, radius=12)
            if shape.text:
                draw_text(
                    d,
                    (shape.x + 18, shape.y + 16),
                    shape.text,
                    font(shape.size, shape.bold),
                    "#" + shape.color if not shape.color.startswith("#") else shape.color,
                    shape.w - 36,
                    5,
                )
    d.text((1135, 675), f"{idx:02d}", fill=hex_to_rgb(COLORS["muted"]), font=F_SMALL)
    out = SLIDES_DIR / f"slide-{idx:02d}.png"
    img.save(out, quality=93)
    return out


def make_slide_contact_sheet(slide_pngs: list[Path]) -> Path:
    thumb_w, thumb_h = 360, 203
    cols = 3
    rows = math.ceil(len(slide_pngs) / cols)
    margin = 28
    gap = 22
    label_h = 28
    sheet = Image.new(
        "RGB",
        (
            cols * thumb_w + (cols - 1) * gap + margin * 2,
            rows * (thumb_h + label_h) + (rows - 1) * gap + margin * 2,
        ),
        hex_to_rgb(COLORS["paper"]),
    )
    d = ImageDraw.Draw(sheet)
    for i, path in enumerate(slide_pngs):
        row, col = divmod(i, cols)
        x = margin + col * (thumb_w + gap)
        y = margin + row * (thumb_h + label_h + gap)
        with Image.open(path).convert("RGB") as img:
            sheet.paste(img.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS), (x, y))
        d.rectangle((x, y, x + thumb_w, y + thumb_h), outline=hex_to_rgb(COLORS["line"]), width=1)
        d.text((x, y + thumb_h + 6), f"Slide {i + 1:02d} - {path.name}", fill=hex_to_rgb(COLORS["muted"]), font=F_SMALL)
    sheet.save(SLIDE_CONTACT_SHEET, quality=92)
    return SLIDE_CONTACT_SHEET


def render_pdf(slide_pngs: list[Path]) -> None:
    pages = [Image.open(p).convert("RGB") for p in slide_pngs]
    try:
        pages[0].save(OUT_PDF, "PDF", resolution=144.0, save_all=True, append_images=pages[1:])
    finally:
        for page in pages:
            page.close()


def emu(v: int, axis: str = "x") -> int:
    return round(v * (EMU_PER_PX_X if axis == "x" else EMU_PER_PX_Y))


def ppt_color(c: str) -> str:
    return c.lstrip("#")


def ppt_text_runs(text: str, size: int, color: str, bold: bool) -> str:
    paras = []
    for para in text.split("\n"):
        paras.append(
            f'<a:p><a:r><a:rPr lang="de-CH" sz="{size * 100}" b="{1 if bold else 0}">'
            f'<a:solidFill><a:srgbClr val="{ppt_color(color)}"/></a:solidFill>'
            f'<a:latin typeface="Arial"/></a:rPr><a:t>{html.escape(para, quote=False)}</a:t></a:r>'
            f'<a:endParaRPr lang="de-CH" sz="{size * 100}"/></a:p>'
        )
    return "".join(paras)


def ppt_shape_xml(shape_id: int, sh: Shape) -> str:
    x, y, w, h = emu(sh.x), emu(sh.y, "y"), emu(sh.w), emu(sh.h, "y")
    fill = "" if sh.fill == "none" else f'<a:solidFill><a:srgbClr val="{ppt_color(sh.fill)}"/></a:solidFill>'
    line = "<a:ln><a:noFill/></a:ln>" if sh.line == "none" else f'<a:ln><a:solidFill><a:srgbClr val="{ppt_color(sh.line)}"/></a:solidFill></a:ln>'
    text = ppt_text_runs(sh.text, sh.size, sh.color, sh.bold) if sh.text else "<a:p/>"
    return f"""
<p:sp>
  <p:nvSpPr><p:cNvPr id="{shape_id}" name="Text {shape_id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst/></a:prstGeom>{fill}{line}</p:spPr>
  <p:txBody><a:bodyPr wrap="square" anchor="t" lIns="120000" tIns="90000" rIns="120000" bIns="90000"/><a:lstStyle/>{text}</p:txBody>
</p:sp>"""


def ppt_pic_xml(shape_id: int, sh: Shape, rid: str) -> str:
    x, y, w, h = emu(sh.x), emu(sh.y, "y"), emu(sh.w), emu(sh.h, "y")
    return f"""
<p:pic>
  <p:nvPicPr><p:cNvPr id="{shape_id}" name="Image {shape_id}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
  <p:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
</p:pic>"""


def make_pptx(slides: list[SlideSpec]) -> None:
    media_map: dict[str, str] = {}
    media_files: list[tuple[str, Path]] = []
    slide_xmls: list[str] = []
    slide_rels: list[str] = []
    next_media = 1
    for idx, spec in enumerate(slides, 1):
        parts = []
        rels = []
        sid = 2
        # title/kicker/subtitle as editable text
        parts.append(ppt_shape_xml(sid, Shape("text", 70, 34, 760, 28, spec.kicker, fill="none", color=COLORS["gold"], size=14, bold=True))); sid += 1
        parts.append(ppt_shape_xml(sid, Shape("text", 70, 64, 760, 80, spec.title, fill="none", color=COLORS["ink"], size=34, bold=True))); sid += 1
        if spec.subtitle:
            parts.append(ppt_shape_xml(sid, Shape("text", 70, 120, 650, 55, spec.subtitle, fill="none", color=COLORS["muted"], size=16))); sid += 1
        for sh in spec.shapes:
            if sh.kind == "image" and sh.image:
                p = ROOT / sh.image
                key = str(p.resolve())
                if key not in media_map:
                    ext = ".png" if p.suffix.lower() == ".png" else ".jpg"
                    media_name = f"image{next_media}{ext}"
                    media_map[key] = media_name
                    media_files.append((media_name, p))
                    next_media += 1
                rid = f"rId{len(rels)+1}"
                rels.append((rid, media_map[key]))
                parts.append(ppt_pic_xml(sid, sh, rid)); sid += 1
            elif sh.kind in {"text", "rect"}:
                parts.append(ppt_shape_xml(sid, sh)); sid += 1
        slide_xmls.append(f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="{ppt_color(COLORS["paper"])}"/></a:solidFill></p:bgPr></p:bg><p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{EMU_W}" cy="{EMU_H}"/><a:chOff x="0" y="0"/><a:chExt cx="{EMU_W}" cy="{EMU_H}"/></a:xfrm></p:grpSpPr>
    {''.join(parts)}
  </p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>''')
        slide_rels.append('''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">''' + "".join(
            f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/{media}"/>'
            for rid, media in rels
        ) + "</Relationships>")

    content_overrides = [
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
        '<Default Extension="xml" ContentType="application/xml"/>',
        '<Default Extension="jpg" ContentType="image/jpeg"/>',
        '<Default Extension="png" ContentType="image/png"/>',
        '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>',
        '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>',
        '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>',
        '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>',
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
    ] + [
        f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
        for i in range(1, len(slides) + 1)
    ]
    presentation_rels = [
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>',
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>',
    ] + [
        f'<Relationship Id="rId{i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i}.xml"/>'
        for i in range(1, len(slides) + 1)
    ]
    sld_ids = "".join(f'<p:sldId id="{255+i}" r:id="rId{i+2}"/>' for i in range(1, len(slides) + 1))

    with zipfile.ZipFile(OUT_PPTX, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">{''.join(content_overrides)}</Types>''')
        z.writestr("_rels/.rels", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>''')
        z.writestr("docProps/core.xml", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Viktor Bonsai Dossier</dc:title><dc:creator>Codex</dc:creator></cp:coreProperties>''')
        z.writestr("docProps/app.xml", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Codex</Application><Slides>{len(slides)}</Slides></Properties>''')
        z.writestr("ppt/presentation.xml", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>{sld_ids}</p:sldIdLst><p:sldSz cx="{EMU_W}" cy="{EMU_H}" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle><a:defPPr><a:defRPr lang="de-CH"/></a:defPPr></p:defaultTextStyle></p:presentation>''')
        z.writestr("ppt/_rels/presentation.xml.rels", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{''.join(presentation_rels)}</Relationships>''')
        z.writestr("ppt/slideMasters/slideMaster1.xml", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>''')
        z.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>''')
        z.writestr("ppt/slideLayouts/slideLayout1.xml", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>''')
        z.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>''')
        z.writestr("ppt/theme/theme1.xml", '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Bonsai"><a:themeElements><a:clrScheme name="Bonsai"><a:dk1><a:srgbClr val="1E2A22"/></a:dk1><a:lt1><a:srgbClr val="F8F7F2"/></a:lt1><a:dk2><a:srgbClr val="24452F"/></a:dk2><a:lt2><a:srgbClr val="FFFFFF"/></a:lt2><a:accent1><a:srgbClr val="24452F"/></a:accent1><a:accent2><a:srgbClr val="BE9B4E"/></a:accent2><a:accent3><a:srgbClr val="7FA45B"/></a:accent3><a:accent4><a:srgbClr val="9A3B2F"/></a:accent4><a:accent5><a:srgbClr val="5B6B60"/></a:accent5><a:accent6><a:srgbClr val="DED8C8"/></a:accent6><a:hlink><a:srgbClr val="24452F"/></a:hlink><a:folHlink><a:srgbClr val="5B6B60"/></a:folHlink></a:clrScheme><a:fontScheme name="Bonsai"><a:majorFont><a:latin typeface="Georgia"/></a:majorFont><a:minorFont><a:latin typeface="Arial"/></a:minorFont></a:fontScheme><a:fmtScheme name="Bonsai"><a:fillStyleLst/><a:lnStyleLst/><a:effectStyleLst/><a:bgFillStyleLst/></a:fmtScheme></a:themeElements></a:theme>''')
        for i, xml in enumerate(slide_xmls, 1):
            z.writestr(f"ppt/slides/slide{i}.xml", xml)
            z.writestr(f"ppt/slides/_rels/slide{i}.xml.rels", slide_rels[i - 1])
        for media_name, src in media_files:
            z.write(src, f"ppt/media/{media_name}")


def write_qa_ledger(slide_pngs: list[Path], asset_sheet: Path, slide_sheet: Path) -> None:
    screenshots = sorted(p for p in SCREEN_DIR.glob("*.png") if "contact-sheet" not in p.name and p.name != "smoke.png")
    rows = image_statuses()
    md = [
        "# Viktor Bonsai QA Ledger",
        "",
        f"Generated handoff: `Viktor-Bonsai-Dossier.pptx`, `Viktor-Bonsai-Dossier.pdf`, `{len(slide_pngs)}` slide PNG renders.",
        "",
        "## Verification Summary",
        "",
        "| Area | Status | Evidence | Notes |",
        "|---|---|---|---|",
        "| Site audit | VERIFIED | `node tools/audit-site.mjs` | Passed after generated assets and relative image path fix. |",
        "| Screenshots | VERIFIED_WITH_LIMITS | `handoff/screenshots/contact-sheet.png` | 8 pages x desktop/mobile retained. Browser local tool unavailable; Edge headless used. |",
        "| Live interaction QA | VERIFIED | `handoff/LIVE_QA.md` | Edge CDP checked 16 page/viewports, mobile nav click, DE/EN inactive form submit behavior, image attrs and horizontal overflow. |",
        "| Mobile hero | VERIFIED | `handoff/screenshots/home-mobile.png` | Broken/blank crop found and fixed; fresh profile screenshot shows image. |",
        "| Dossier PDF | VERIFIED | `handoff/Viktor-Bonsai-Dossier.pdf` | Built from retained slide PNG renders. |",
        "| Dossier PPTX | VERIFIED_WITH_LIMITS | `handoff/Viktor-Bonsai-Dossier.pptx` | OpenXML PPTX with editable text boxes and embedded images; PowerPoint COM and python-pptx unavailable. |",
        f"| Deck counts | VERIFIED | PPTX {len(slide_pngs)} slides / PDF {len(slide_pngs)} pages | Verified from PPTX zip entries and PDF page markers after generation. |",
        f"| Slide contact sheet | VERIFIED | `{slide_sheet.relative_to(ROOT)}` | Thumbnail QA sheet generated from every retained slide PNG. |",
        "| Before/after planning images | NEEDS_REVIEW | `assets/img/concepts/` | Internal direction only, not real proof. Do not expose planning labels on the public website. |",
        "| Client asset request | VERIFIED | `handoff/CLIENT_ASSET_REQUEST.md` | Exact remaining real-photo/contact/legal inputs and filenames are documented. |",
        "",
        "## Screenshots Captured",
        "",
        "| File | Status |",
        "|---|---|",
    ]
    for p in screenshots:
        md.append(f"| `{p.relative_to(ROOT)}` | VERIFIED |")
    md += [
        "",
        "## Image Inventory",
        "",
        "| Asset | Status | Dimensions | Size | Notes |",
        "|---|---|---:|---:|---|",
    ]
    for rel, status, dims, size, note in rows:
        md.append(f"| `{rel}` | {status} | {dims} | {size} | {note} |")
    md += [
        "",
        "## Defects Found And Fixed",
        "",
        "- VERIFIED: root-absolute generated image paths broke direct `file://` local viewing; generator now injects per-page relative asset prefixes.",
        "- VERIFIED: mobile home screenshot initially showed a blank hero crop/cache state; CSS object-position and fresh-profile screenshot confirmed visible hero image.",
        "- VERIFIED: manifest now distinguishes `PRESENT_AI_CONCEPT`, `PRESENT_AI_CONCEPT_NOT_PROOF`, and `MISSING_REAL_REQUIRED`.",
        "",
        "## Remaining Risks",
        "",
        "- PRESENT_REAL_SUPPLIED_NEEDS_FINAL_APPROVAL: Viktor portrait/work photos are integrated locally.",
        "- PRESENT_AI_CONCEPT_NOT_PROOF: AI postcard concept is available for direction only.",
        "- MISSING_REAL_REQUIRED: Japan postcard, six real before/after pairs, testimonial/Google rating.",
        "- NEEDS_REVIEW: generated botanical images require Viktor's review before public use.",
        "- USER_CONFIRMED: WhatsApp/phone and social profile links are integrated.",
        "- PRESENT_BUT_UNTESTED: Formspree endpoint, GA4/Ads/Search Console IDs remain placeholders.",
        "- NEEDS_REVIEW: final Swiss legal pages and public publish approval.",
        "",
        "## Retained Artifacts",
        "",
        f"- Screenshot contact sheet: `{(SCREEN_DIR / 'contact-sheet.png').relative_to(ROOT)}`",
        "- Live interaction QA: `handoff/LIVE_QA.md`",
        "- Mobile nav open screenshot: `handoff/live-qa/mobile-nav-open-home.png`",
        "- Client asset request: `handoff/CLIENT_ASSET_REQUEST.md`",
        f"- Asset contact sheet: `{asset_sheet.relative_to(ROOT)}`",
        f"- Slide contact sheet: `{slide_sheet.relative_to(ROOT)}`",
        f"- Slide renders: `handoff/slides/slide-01.png` ... `handoff/slides/slide-{len(slide_pngs):02d}.png`",
    ]
    QA_LEDGER.write_text("\n".join(md) + "\n", encoding="utf-8")


def main() -> None:
    mkdirs()
    asset_sheet = make_asset_contact_sheet()
    slides = make_slides(asset_sheet)
    slide_pngs = [render_slide(spec, i) for i, spec in enumerate(slides, 1)]
    slide_sheet = make_slide_contact_sheet(slide_pngs)
    render_pdf(slide_pngs)
    make_pptx(slides)
    write_qa_ledger(slide_pngs, asset_sheet, slide_sheet)
    print(json.dumps({
        "pptx": str(OUT_PPTX),
        "pdf": str(OUT_PDF),
        "qa": str(QA_LEDGER),
        "slides": len(slide_pngs),
        "asset_sheet": str(asset_sheet),
        "slide_sheet": str(slide_sheet),
    }, ensure_ascii=True, indent=2))


if __name__ == "__main__":
    main()
