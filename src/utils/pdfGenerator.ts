import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// A4 dimensions
const A4_WIDTH_MM  = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX  = 794;
const A4_HEIGHT_PX = 1123;

// Render scale — 3 gives crisp print-quality output
const RENDER_SCALE = 3;

/**
 * Composites a canvas onto a white background and returns a high-quality JPEG data URL.
 * This eliminates transparency artefacts and keeps file size 60-80% smaller than PNG.
 */
function canvasToJpegDataUrl(src: HTMLCanvasElement): string {
  const flat = document.createElement('canvas');
  flat.width  = src.width;
  flat.height = src.height;
  const ctx = flat.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, flat.width, flat.height);
  ctx.drawImage(src, 0, 0);
  return flat.toDataURL('image/jpeg', 0.95);
}

/**
 * Recursively resolves all computed styles into inline styles so that
 * the cloned element renders identically outside the original DOM context.
 * This is critical because html2canvas cannot read Tailwind/CSS-variable
 * driven stylesheets on a detached clone.
 */
function inlineAllComputedStyles(source: HTMLElement, clone: HTMLElement) {
  const srcComputed = window.getComputedStyle(source);
  // Apply every computed property as an inline style
  for (let i = 0; i < srcComputed.length; i++) {
    const prop = srcComputed[i];
    try {
      clone.style.setProperty(prop, srcComputed.getPropertyValue(prop));
    } catch {
      // Some properties may not be settable; skip them
    }
  }

  // Recurse into children
  const srcChildren = source.children;
  const cloneChildren = clone.children;
  for (let i = 0; i < srcChildren.length && i < cloneChildren.length; i++) {
    if (srcChildren[i] instanceof HTMLElement && cloneChildren[i] instanceof HTMLElement) {
      inlineAllComputedStyles(srcChildren[i] as HTMLElement, cloneChildren[i] as HTMLElement);
    }
  }
}

export async function generatePDFFromElement(
  element: HTMLElement,
  invoiceNumber: string,
  returnBlob = false
): Promise<Blob | void> {

  // ── 1. Create a high-fidelity clone ──────────────────────────────────────────
  const clone = element.cloneNode(true) as HTMLElement;

  // We need to inline computed styles from the live element BEFORE detaching,
  // so do it while the original is still in the DOM.
  // First, temporarily append the clone to get the same DOM context,
  // then inline all styles from the source to the clone.

  // Apply critical print styles to the clone
  clone.style.width           = `${A4_WIDTH_PX}px`;
  clone.style.minHeight       = `${A4_HEIGHT_PX}px`;
  clone.style.height          = 'auto';
  clone.style.position        = 'fixed';
  clone.style.left            = '-9999px';
  clone.style.top             = '0';
  clone.style.zIndex          = '-1';
  clone.style.backgroundColor = '#ffffff';
  clone.style.margin          = '0';
  clone.style.padding         = '0';
  clone.style.overflow         = 'visible';
  
  // Ensure background colours always render
  (clone.style as any).printColorAdjust = 'exact';
  (clone.style as any).webkitPrintColorAdjust = 'exact';

  // Force light theme and ensure standard box-sizing
  clone.classList.remove('dark');
  clone.classList.add('light');
  clone.querySelectorAll<HTMLElement>('*').forEach(el => {
    el.style.boxSizing = 'border-box';
  });

  // Strip UI-only elements
  clone.querySelectorAll('[data-pdf-hide], button, [role="tooltip"]').forEach(el => el.remove());

  document.body.appendChild(clone);

  // Inline all computed styles from the live element into the clone
  // This ensures Tailwind classes, CSS variables, and inherited styles
  // are baked into the clone as inline styles.
  inlineAllComputedStyles(element, clone);

  // Re-apply overrides that may have been overwritten by inlineAllComputedStyles
  clone.style.position        = 'fixed';
  clone.style.left            = '-9999px';
  clone.style.top             = '0';
  clone.style.zIndex          = '-1';
  clone.style.backgroundColor = '#ffffff';
  clone.style.width           = `${A4_WIDTH_PX}px`;
  clone.style.minHeight       = `${A4_HEIGHT_PX}px`;
  clone.style.overflow        = 'visible';

  // Wait for fonts and a short settle delay
  await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 600));

  try {
    // ── 2. Render the clone to a high-resolution canvas ──────────────────────
    const canvas = await html2canvas(clone, {
      scale: RENDER_SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      // Let height be auto so multi-page invoices are fully captured
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
    });

    // ── 3. Flatten canvas onto white background (removes transparency) ───────
    const imgData = canvasToJpegDataUrl(canvas);

    // ── 4. Build the PDF, splitting into pages if content exceeds A4 height ──
    const doc = new jsPDF({
      orientation:      'portrait',
      unit:             'mm',
      format:           'a4',
      compress:         true,
      putOnlyUsedFonts: true,
    });

    // Calculate how many A4 pages the canvas content spans
    const canvasWidthPx  = canvas.width;
    const canvasHeightPx = canvas.height;

    // The full image width fits A4_WIDTH_MM. Calculate total height in mm.
    const totalHeightMm = (canvasHeightPx / canvasWidthPx) * A4_WIDTH_MM;
    const totalPages    = Math.ceil(totalHeightMm / A4_HEIGHT_MM);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) doc.addPage();

      // Slice the corresponding portion from the full canvas
      const sliceTopPx    = page * (A4_HEIGHT_PX * RENDER_SCALE);
      const sliceHeightPx = Math.min(
        A4_HEIGHT_PX * RENDER_SCALE,
        canvasHeightPx - sliceTopPx
      );

      if (sliceHeightPx <= 0) break;

      // Create a sub-canvas for this page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width  = canvasWidthPx;
      pageCanvas.height = sliceHeightPx;
      const pCtx = pageCanvas.getContext('2d')!;
      pCtx.fillStyle = '#ffffff';
      pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      pCtx.drawImage(
        canvas,
        0, sliceTopPx, canvasWidthPx, sliceHeightPx,   // source rect
        0, 0, canvasWidthPx, sliceHeightPx               // dest rect
      );

      const pageImgData = canvasToJpegDataUrl(pageCanvas);
      const pageHeightMm = (sliceHeightPx / canvasWidthPx) * A4_WIDTH_MM;

      doc.addImage(pageImgData, 'JPEG', 0, 0, A4_WIDTH_MM, pageHeightMm);
    }

    // ── 5. Final Metadata & Save ──────────────────────────────────────────────
    doc.setProperties({
      title:    `Invoice ${invoiceNumber}`,
      subject:  'Professional Invoice Document',
      author:   'InvoiceCraft',
      creator:  'InvoiceCraft',
    });

    const sanitized = invoiceNumber.replace(/[^a-z0-9]/gi, '_');

    if (returnBlob) {
      return doc.output('blob');
    }
    doc.save(`Invoice-${sanitized}.pdf`);

  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}
