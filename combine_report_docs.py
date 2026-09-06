from __future__ import annotations

import copy
import zipfile
from pathlib import Path

from lxml import etree


ROOT = Path(__file__).resolve().parent
INPUT_DIR = ROOT / "InvoiceCraft_Report_Docs"
OUTPUT = ROOT / "InvoiceCraft_Complete_Report.docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
NS = {"w": W_NS}
QN = lambda tag: f"{{{W_NS}}}{tag}"

ORDER = [
    "00 - Title page - InvoiceCraft.docx",
    "01 - Certificate - InvoiceCraft.docx",
    "02 - Declaration - InvoiceCraft.docx",
    "03 - Acknowledgement - InvoiceCraft.docx",
    "04 - Abstract - InvoiceCraft.docx",
    "05 - Table of Contents - InvoiceCraft.docx",
    "06 - Chapter 1 Introduction - InvoiceCraft.docx",
    "07 - Chapter 2 Tools and Technologies - InvoiceCraft.docx",
    "08 - Chapter 3 System Design and Implementation - InvoiceCraft.docx",
    "09 - Chapter 4 Conclusion - InvoiceCraft.docx",
    "10 - Chapter 5 Future Enhancement - InvoiceCraft.docx",
]


def read_xml(zf: zipfile.ZipFile, name: str):
    return etree.fromstring(zf.read(name))


def strip_header_footer_refs(section):
    for child in list(section):
        if child.tag in {QN("headerReference"), QN("footerReference")}:
            section.remove(child)


def add_base_header_footer_refs(section, base_section):
    for child in base_section:
        if child.tag in {QN("headerReference"), QN("footerReference")}:
            section.insert(0, copy.deepcopy(child))


def set_page_numbering(section, fmt: str | None = None, start: int | None = None):
    existing = section.find(QN("pgNumType"))
    if existing is not None:
        section.remove(existing)
    if fmt is None:
        return
    pg = etree.Element(QN("pgNumType"))
    pg.set(QN("fmt"), fmt)
    if start is not None:
        pg.set(QN("start"), str(start))
    section.append(pg)


def make_section_break(section, base_section, number_format: str | None, start: int | None):
    section_copy = copy.deepcopy(section)
    strip_header_footer_refs(section_copy)
    add_base_header_footer_refs(section_copy, base_section)
    section_type = section_copy.find(QN("type"))
    if section_type is None:
        section_type = etree.Element(QN("type"))
        section_copy.insert(0, section_type)
    section_type.set(QN("val"), "nextPage")
    set_page_numbering(section_copy, number_format, start)

    paragraph = etree.Element(QN("p"))
    ppr = etree.SubElement(paragraph, QN("pPr"))
    ppr.append(section_copy)
    return paragraph


def dynamic_footer_xml(source_footer: bytes) -> bytes:
    root = etree.fromstring(source_footer)
    paragraphs = root.xpath(".//w:p", namespaces=NS)
    if not paragraphs:
        paragraph = etree.SubElement(root, QN("p"))
    else:
        paragraph = paragraphs[0]
        for child in list(paragraph):
            if child.tag != QN("pPr"):
                paragraph.remove(child)
        for extra in paragraphs[1:]:
            extra.getparent().remove(extra)

    def run_with_text(text: str):
        run = etree.SubElement(paragraph, QN("r"))
        t = etree.SubElement(run, QN("t"))
        t.text = text

    run_with_text("Page ")
    run_begin = etree.SubElement(paragraph, QN("r"))
    fld_begin = etree.SubElement(run_begin, QN("fldChar"))
    fld_begin.set(QN("fldCharType"), "begin")
    run_instr = etree.SubElement(paragraph, QN("r"))
    instr = etree.SubElement(run_instr, QN("instrText"))
    instr.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    instr.text = " PAGE "
    run_sep = etree.SubElement(paragraph, QN("r"))
    fld_sep = etree.SubElement(run_sep, QN("fldChar"))
    fld_sep.set(QN("fldCharType"), "separate")
    run_value = etree.SubElement(paragraph, QN("r"))
    value = etree.SubElement(run_value, QN("t"))
    value.text = "1"
    run_end = etree.SubElement(paragraph, QN("r"))
    fld_end = etree.SubElement(run_end, QN("fldChar"))
    fld_end.set(QN("fldCharType"), "end")
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone="yes")


def combine():
    paths = [INPUT_DIR / name for name in ORDER]
    missing = [str(path) for path in paths if not path.exists()]
    if missing:
        raise FileNotFoundError("Missing input files:\n" + "\n".join(missing))

    with zipfile.ZipFile(paths[0], "r") as base_zip:
        base_document = read_xml(base_zip, "word/document.xml")
        base_body = base_document.find(QN("body"))
        base_children = list(base_body)
        base_section = copy.deepcopy(base_children[-1])
        base_body.remove(base_children[-1])
        base_footer = base_zip.read("word/footer1.xml")

        for index, path in enumerate(paths):
            with zipfile.ZipFile(path, "r") as source_zip:
                source_document = read_xml(source_zip, "word/document.xml")
                source_body = source_document.find(QN("body"))
                source_children = list(source_body)
                source_section = copy.deepcopy(source_children[-1])
                source_content = source_children[:-1]
                for child in source_content:
                    base_body.append(copy.deepcopy(child))

                if index < len(paths) - 1:
                    # The first six files are front matter and use lower-roman
                    # numbering; Chapter 1 starts Arabic numbering at 1.
                    if index < 5:
                        fmt, start = "lowerRoman", 1 if index == 0 else None
                    elif index == 5:
                        fmt, start = "decimal", 1
                    else:
                        fmt, start = "decimal", None
                    base_body.append(make_section_break(source_section, base_section, fmt, start))
                else:
                    final_section = source_section
                    strip_header_footer_refs(final_section)
                    add_base_header_footer_refs(final_section, base_section)
                    set_page_numbering(final_section, "decimal", None)
                    base_body.append(final_section)

        document_xml = etree.tostring(base_document, xml_declaration=True, encoding="UTF-8", standalone="yes")

        with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED) as out_zip:
            for info in base_zip.infolist():
                if info.filename == "word/document.xml":
                    out_zip.writestr(info, document_xml)
                elif info.filename == "word/footer1.xml":
                    out_zip.writestr(info, dynamic_footer_xml(base_footer))
                else:
                    out_zip.writestr(info, base_zip.read(info.filename))

    print(f"Created {OUTPUT}")


if __name__ == "__main__":
    combine()
