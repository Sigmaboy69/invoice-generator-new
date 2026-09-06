from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont


OUT = Path("InvoiceCraft_System_Architecture_Portrait.jpg")
WIDTH, HEIGHT = 1800, 3200
WHITE = (255, 255, 255)
DARK = (17, 24, 39)
BLUE = (37, 99, 235)
LIGHT_BLUE = (239, 246, 255)
GRAY = (107, 114, 128)
GREEN = (22, 163, 74)
LIGHT_GREEN = (240, 253, 244)
ORANGE = (234, 88, 12)
LIGHT_ORANGE = (255, 247, 237)


def font(size: int, bold: bool = False):
    candidates = [
        Path(r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf"),
        Path(r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


TITLE = font(60, True)
SUBTITLE = font(28)
BOX_TITLE = font(31, True)
BOX_TEXT = font(25)
SMALL = font(22)


image = Image.new("RGB", (WIDTH, HEIGHT), WHITE)
draw = ImageDraw.Draw(image)


def centered_text(box, text, use_font=BOX_TITLE, fill=DARK, line_gap=8):
    x1, y1, x2, y2 = box
    max_width = x2 - x1 - 56
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=use_font)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    heights = [draw.textbbox((0, 0), line, font=use_font)[3] for line in lines]
    total = sum(heights) + line_gap * max(0, len(lines) - 1)
    y = y1 + ((y2 - y1) - total) / 2
    for line, h in zip(lines, heights):
        width = draw.textbbox((0, 0), line, font=use_font)[2]
        draw.text((x1 + (x2 - x1 - width) / 2, y), line, font=use_font, fill=fill)
        y += h + line_gap


def box(cx, top, width, height, title, body=None, fill=LIGHT_BLUE, outline=BLUE):
    left = int(cx - width / 2)
    right = int(cx + width / 2)
    bottom = top + height
    draw.rounded_rectangle((left, top, right, bottom), radius=24, fill=fill, outline=outline, width=5)
    if body:
        centered_text((left, top + 18, right, top + height * 0.48), title, BOX_TITLE)
        centered_text((left + 18, top + height * 0.46, right - 18, bottom - 18), body, BOX_TEXT, GRAY, 5)
    else:
        centered_text((left, top, right, bottom), title, BOX_TITLE)
    return (left, top, right, bottom)


def arrow(start, end, color=GRAY, width=6):
    x1, y1 = start
    x2, y2 = end
    draw.line((x1, y1, x2, y2), fill=color, width=width)
    # Arrow head points toward the end point.
    if abs(x2 - x1) >= abs(y2 - y1):
        direction = 1 if x2 > x1 else -1
        points = [(x2, y2), (x2 - 22 * direction, y2 - 14), (x2 - 22 * direction, y2 + 14)]
    else:
        direction = 1 if y2 > y1 else -1
        points = [(x2, y2), (x2 - 14, y2 - 22 * direction), (x2 + 14, y2 - 22 * direction)]
    draw.polygon(points, fill=color)


def down_arrow(a, b, color=GRAY):
    arrow(((a[0] + a[2]) // 2, a[3] + 12), ((b[0] + b[2]) // 2, b[1] - 12), color)


draw.text((WIDTH / 2, 80), "System Architecture of InvoiceCraft", font=TITLE, fill=DARK, anchor="ma")
draw.text((WIDTH / 2, 165), "Portrait-oriented client-side invoice generation workflow", font=SUBTITLE, fill=GRAY, anchor="ma")

main_x = 790
main_w = 820
side_x = 1450
side_w = 520

user = box(main_x, 270, main_w, 145, "User", "Enters and reviews invoice information", fill=LIGHT_ORANGE, outline=ORANGE)
browser = box(main_x, 515, main_w, 145, "Web Browser", "Runs the InvoiceCraft application", fill=LIGHT_BLUE, outline=BLUE)
react = box(main_x, 760, main_w, 145, "React Application", "React, TypeScript, Vite, and Tailwind CSS", fill=LIGHT_BLUE, outline=BLUE)
editor = box(main_x, 1005, main_w, 180, "Invoice Editor", "Company Details  |  Client Details  |  Line Items  |  Settings", fill=LIGHT_BLUE, outline=BLUE)
state = box(main_x, 1285, main_w, 150, "Invoice Data State", "Central InvoiceData object", fill=LIGHT_GREEN, outline=GREEN)
calc = box(main_x, 1535, main_w, 180, "Validation and Calculation Module", "Subtotal  |  Tax  |  Discount  |  Total  |  Balance Due", fill=LIGHT_GREEN, outline=GREEN)
preview = box(main_x, 1815, main_w, 150, "Live Invoice Preview", "Displays changes immediately", fill=LIGHT_BLUE, outline=BLUE)
template = box(main_x, 2065, main_w, 160, "Selected Invoice Template", "Modern, Minimal, Classic, Bold, and other designs", fill=LIGHT_BLUE, outline=BLUE)
payment = box(main_x, 2325, main_w, 160, "Payment Details and UPI QR Code", "Bank details, UPI ID, and scan-to-pay QR code", fill=LIGHT_ORANGE, outline=ORANGE)
pdf = box(main_x, 2585, main_w, 160, "PDF Export Module", "html2canvas renders the preview; jsPDF creates the document", fill=LIGHT_ORANGE, outline=ORANGE)
output = box(main_x, 2845, main_w, 160, "A4 PDF Download or Sharing", "Professional invoice output", fill=LIGHT_GREEN, outline=GREEN)

storage = box(side_x, 1360, side_w, 145, "LocalStorage", "Browser-based draft storage", fill=LIGHT_GREEN, outline=GREEN)
autosave = box(side_x, 1610, side_w, 145, "Draft Autosave", "Saves changes automatically", fill=LIGHT_GREEN, outline=GREEN)
recovery = box(side_x, 1860, side_w, 145, "Draft Recovery", "Restores the invoice after reload", fill=LIGHT_GREEN, outline=GREEN)

for upper, lower in [(user, browser), (browser, react), (react, editor), (editor, state), (state, calc), (calc, preview), (preview, template), (template, payment), (payment, pdf), (pdf, output)]:
    down_arrow(upper, lower)

arrow((state[2] + 12, state[3] - 35), (storage[0] - 12, storage[1] + 70), GREEN)
down_arrow(storage, autosave, GREEN)
down_arrow(autosave, recovery, GREEN)
arrow((recovery[0] - 12, recovery[1] + 70), (state[2] + 12, state[1] + 80), GREEN)

draw.text((WIDTH / 2, 3130), "Figure 3.1: System Architecture of InvoiceCraft", font=SMALL, fill=GRAY, anchor="ma")

image.save(OUT, quality=96, subsampling=0, dpi=(300, 300))
print(OUT.resolve())
