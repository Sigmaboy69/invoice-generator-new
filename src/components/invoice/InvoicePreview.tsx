import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Share2, Copy, Mail, MessageCircle, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BoldTemplate } from './templates/BoldTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { IndustrialTemplate } from './templates/IndustrialTemplate';
import { IndigoTemplate } from './templates/IndigoTemplate';
import { BasicTemplate } from './templates/BasicTemplate';
import { EliteTemplate } from './templates/EliteTemplate';
import { generatePDFFromElement } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type { InvoiceData } from '@/types/invoice';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

export interface InvoicePreviewRef {
  downloadPDF: () => Promise<void>;
}

export const InvoicePreview = forwardRef<InvoicePreviewRef, InvoicePreviewProps>(({ invoice }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.65);
  const [autoZoom, setAutoZoom] = useState(0.65);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const calculateAutoZoom = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 24;
        const paperWidthPx = 794; // A4 width in pixels at 96 DPI
        const optimalZoom = Math.min(containerWidth / paperWidthPx, 0.65);
        setAutoZoom(Math.max(0.35, optimalZoom));
        setZoom(Math.max(0.35, optimalZoom));
      }
    };

    calculateAutoZoom();
    window.addEventListener('resize', calculateAutoZoom);
    return () => window.removeEventListener('resize', calculateAutoZoom);
  }, []);

  const formatCurrency = (amount: number) => {
    return `${invoice.currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getInvoiceSummary = () => {
    return `Invoice ${invoice.invoiceNumber} - ${invoice.currency.symbol}${invoice.total.toFixed(2)} from ${invoice.companyName || 'Company'}`;
  };

  const handleCopyLink = async () => {
    const text = getInvoiceSummary();
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Invoice summary copied to clipboard",
    });
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber}`);
    const body = encodeURIComponent(
      `Hi ${invoice.clientName || 'there'},\n\nPlease find attached invoice ${invoice.invoiceNumber}.\n\nAmount Due: ${invoice.currency.symbol}${invoice.total.toFixed(2)}\nDue Date: ${formatDate(invoice.dueDate)}\n\nBest regards,\n${invoice.companyName || 'Company'}`
    );
    window.open(`mailto:${invoice.clientEmail}?subject=${subject}&body=${body}`);
  };

  const handleWhatsAppShare = async () => {
    if (!invoiceRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const pdfBlob = await generatePDFFromElement(invoiceRef.current, invoice.invoiceNumber, true) as Blob;
      const pdfFile = new File([pdfBlob], `${invoice.invoiceNumber}.pdf`, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: `Invoice ${invoice.invoiceNumber}`,
          text: `Invoice from ${invoice.companyName || 'Company'} - ${invoice.currency.symbol}${invoice.total.toFixed(2)}`,
          files: [pdfFile],
        });
        toast({
          title: "Shared!",
          description: "Invoice PDF shared successfully",
        });
      } else {
        await generatePDFFromElement(invoiceRef.current, invoice.invoiceNumber);
        const text = encodeURIComponent(
          `Hi ${invoice.clientName || 'there'}!\n\n📄 *Invoice ${invoice.invoiceNumber}*\n💰 Amount: ${invoice.currency.symbol}${invoice.total.toFixed(2)}\n📅 Due: ${formatDate(invoice.dueDate)}\n\nFrom: ${invoice.companyName || 'Company'}\n\n(PDF downloaded separately)`
        );
        window.open(`https://api.whatsapp.com/send/?text=${text}&type=custom_url&app_absent=0`);
        toast({
          title: "PDF Downloaded",
          description: "Attach the downloaded PDF in WhatsApp",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share invoice",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    setIsGeneratingPDF(true);
    try {
      await generatePDFFromElement(invoiceRef.current, invoice.invoiceNumber);
      toast({
        title: "Downloaded!",
        description: "Invoice PDF has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useImperativeHandle(ref, () => ({
    downloadPDF: handleDownloadPDF,
  }));

  const handleFitToView = () => {
    setZoom(autoZoom);
  };

  const renderTemplate = () => {
    const props = { invoice, formatCurrency, formatDate };

    switch (invoice.template) {
      case 'bold':
        return <BoldTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'industrial':
        return <IndustrialTemplate {...props} />;
      case 'indigo':
        return <IndigoTemplate {...props} />;
      case 'basic':
        return <BasicTemplate {...props} />;
      case 'elite':
        return <EliteTemplate {...props} />;
      default:
        return <BoldTemplate {...props} />;
    }
  };

  return (
    <div className="glass-card h-full min-h-[60vh] lg:min-h-0 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 sm:px-4 py-2.5 sm:py-3 bg-card/50">
        <h3 className="font-semibold text-sm hidden sm:block">Live Preview</h3>
        <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <div className="flex items-center bg-background/50 rounded-md border border-border/50">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}
                className="h-8 w-8 rounded-r-none"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="text-[10px] sm:text-xs text-muted-foreground w-8 sm:w-12 text-center font-medium border-l border-r border-border/50 h-4 flex items-center justify-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setZoom(Math.min(1.2, zoom + 0.1))}
                className="h-8 w-8 rounded-l-none"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="ml-2 gap-1.5 sm:gap-2 h-8 px-3 shadow-sm">
                <Share2 className="h-3.5 w-3.5" />
                <span className="inline">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-xl z-50">
              <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer h-11 sm:h-9">
                <Copy className="h-4 w-4" />
                Copy Summary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEmailShare} className="gap-2 cursor-pointer h-11 sm:h-9">
                <Mail className="h-4 w-4" />
                Send via Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleWhatsAppShare} className="gap-2 cursor-pointer h-11 sm:h-9">
                <MessageCircle className="h-4 w-4" />
                Send via WhatsApp
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownloadPDF} className="gap-2 cursor-pointer h-11 sm:h-9">
                <Download className="h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-hidden bg-muted/20 relative">
        {isGeneratingPDF && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Generating PDF...</p>
            </div>
          </div>
        )}
        <div
          className="h-full w-full flex justify-center overflow-auto p-2 sm:p-4"
          style={{ maxWidth: '100vw' }}
        >
          <div
            className="transition-transform duration-200 shrink-0"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              width: '794px',
              minHeight: '1123px',
              height: 'auto',
            }}
          >
            <div ref={invoiceRef} className="shadow-2xl rounded-sm overflow-hidden bg-white w-full h-full">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';
