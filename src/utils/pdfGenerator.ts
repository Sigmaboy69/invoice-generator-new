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
 * Prepares all images and vector SVGs in the cloned document for html2canvas rendering.
 *
 * 1. Cloned <img> elements in modern browsers defer or throttle image decoding when offscreen,
 *    causing html2canvas to read `naturalWidth === 0` and skip drawing the image entirely.
 * 2. html2canvas natively supports <canvas> elements synchronously through `CanvasElementContainer`,
 *    bypassing internal CORS fetch attempts, SVG rendering limits, and async decode delays.
 * 3. We convert every <img> into an explicit <canvas> with true natural dimensions,
 *    and compute exact proportional pixel width/height so CSS 'w-auto' never collapses.
 */
async function prepareCloneForRendering(source: HTMLElement, clone: HTMLElement): Promise<void> {
  const liveImgs = Array.from(source.querySelectorAll('img'));
  const cloneImgs = Array.from(clone.querySelectorAll('img'));

  // Ensure all live images are fully loaded and decoded first
  await Promise.all(
    liveImgs.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }
      try {
        await img.decode();
      } catch {
        // ignore decode failure
      }
    })
  );

  // Convert each cloned <img> to an active <canvas> element
  for (let i = 0; i < cloneImgs.length; i++) {
    const cImg = cloneImgs[i];
    const lImg = liveImgs[i];

    const cvs = document.createElement('canvas');
    let naturalWidth = (lImg && lImg.naturalWidth) || cImg.naturalWidth || 0;
    let naturalHeight = (lImg && lImg.naturalHeight) || cImg.naturalHeight || 0;
    let drawSource: CanvasImageSource | null =
      lImg && lImg.complete && lImg.naturalWidth > 0 ? lImg : null;

    if (!drawSource || naturalWidth === 0 || naturalHeight === 0) {
      // Fallback: asynchronously decode standalone Image instance
      const tempImg = new Image();
      tempImg.crossOrigin = 'anonymous';
      tempImg.src = cImg.src;
      await new Promise<void>((resolve) => {
        tempImg.onload = () => resolve();
        tempImg.onerror = () => resolve();
      });
      try {
        await tempImg.decode();
      } catch {
        // ignore
      }
      naturalWidth = tempImg.naturalWidth || 200;
      naturalHeight = tempImg.naturalHeight || 100;
      drawSource = tempImg;
    }

    // Limit maximum canvas pixel size to avoid excessive memory while maintaining 300+ DPI
    const MAX_DIM = 2400;
    let targetW = naturalWidth;
    let targetH = naturalHeight;
    if (targetW > MAX_DIM || targetH > MAX_DIM) {
      if (targetW >= targetH) {
        targetH = Math.round((targetH * MAX_DIM) / targetW);
        targetW = MAX_DIM;
      } else {
        targetW = Math.round((targetW * MAX_DIM) / targetH);
        targetH = MAX_DIM;
      }
    }

    cvs.width = Math.max(1, targetW);
    cvs.height = Math.max(1, targetH);

    const ctx = cvs.getContext('2d');
    if (ctx && drawSource) {
      try {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(drawSource, 0, 0, cvs.width, cvs.height);
      } catch (err) {
        console.warn('Canvas drawImage error:', err);
      }
    }

    // Copy classes, id and inline styling
    cvs.className = cImg.className;
    if (cImg.id) cvs.id = cImg.id;
    cvs.style.cssText = cImg.style.cssText;

    // Resolve explicit layout dimensions so 'w-auto' does not collapse to 0
    const compLive = lImg ? window.getComputedStyle(lImg) : null;
    const compClone = window.getComputedStyle(cImg);
    const comp =
      compLive && compLive.display !== 'none' && compLive.height !== '0px'
        ? compLive
        : compClone;

    if (comp.height && comp.height !== 'auto' && comp.height !== '0px') {
      cvs.style.height = comp.height;
      if (!comp.width || comp.width === 'auto' || comp.width === '0px') {
        const numH = parseFloat(comp.height);
        if (!isNaN(numH) && naturalHeight > 0) {
          cvs.style.width = `${Math.round((naturalWidth / naturalHeight) * numH)}px`;
        }
      } else {
        cvs.style.width = comp.width;
      }
    } else if (comp.width && comp.width !== 'auto' && comp.width !== '0px') {
      cvs.style.width = comp.width;
      if (!comp.height || comp.height === 'auto' || comp.height === '0px') {
        const numW = parseFloat(comp.width);
        if (!isNaN(numW) && naturalWidth > 0) {
          cvs.style.height = `${Math.round((naturalHeight / naturalWidth) * numW)}px`;
        }
      } else {
        cvs.style.height = comp.height;
      }
    }

    cvs.style.objectFit = comp.objectFit || 'contain';
    cvs.style.display = comp.display === 'inline' ? 'inline-block' : comp.display;

    cImg.parentNode?.replaceChild(cvs, cImg);
  }

  // Ensure SVGs have explicit width and height attributes (e.g. UPI Payment QR code)
  clone.querySelectorAll('svg').forEach((svg) => {
    const rect = svg.getBoundingClientRect();
    if (!svg.getAttribute('width') && rect.width > 0) {
      svg.setAttribute('width', String(Math.round(rect.width)));
    }
    if (!svg.getAttribute('height') && rect.height > 0) {
      svg.setAttribute('height', String(Math.round(rect.height)));
    }
  });

  // Remove UI buttons, action bars, and print-hidden elements
  clone.querySelectorAll('[data-pdf-hide], button, [role="tooltip"]').forEach((el) => el.remove());
}

export async function generatePDFFromElement(
  element: HTMLElement,
  invoiceNumber: string,
  returnBlob = false
): Promise<Blob | void> {

  // ── 1. Create a high-fidelity clone ──────────────────────────────────────────
  const clone = element.cloneNode(true) as HTMLElement;

  // Position clone in active DOM within viewport (underneath all content at z-index -9999).
  // Keeping it in the viewport ensures modern Chromium/WebKit rendering engines
  // trigger layout, font rendering, and GPU composition without offscreen throttling.
  clone.style.width           = `${A4_WIDTH_PX}px`;
  clone.style.minHeight       = `${A4_HEIGHT_PX}px`;
  clone.style.height          = 'auto';
  clone.style.position        = 'fixed';
  clone.style.left            = '0';
  clone.style.top             = '0';
  clone.style.zIndex          = '-9999';
  clone.style.pointerEvents   = 'none';
  clone.style.opacity         = '1';
  clone.style.backgroundColor = '#ffffff';
  clone.style.margin          = '0';
  clone.style.padding         = '0';
  clone.style.overflow         = 'visible';
  
  // Ensure background colours always render
  clone.style.setProperty('print-color-adjust', 'exact');
  clone.style.setProperty('-webkit-print-color-adjust', 'exact');

  // Force light theme and ensure standard box-sizing
  clone.classList.remove('dark');
  clone.classList.add('light');
  clone.querySelectorAll<HTMLElement>('*').forEach((el) => {
    el.style.boxSizing = 'border-box';
  });

  document.body.appendChild(clone);

  // Convert all images to high-resolution canvases and ensure SVG dimensions
  await prepareCloneForRendering(element, clone);

  // Wait for fonts and a short settle delay
  await document.fonts.ready;
  await new Promise((resolve) => setTimeout(resolve, 350));

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
