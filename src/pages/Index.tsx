import { Header } from '@/components/invoice/Header';
import { CompanySection } from '@/components/invoice/CompanySection';
import { ClientSection } from '@/components/invoice/ClientSection';
import { LineItemsSection } from '@/components/invoice/LineItemsSection';
import { CalculationsSection } from '@/components/invoice/CalculationsSection';
import { SettingsSection } from '@/components/invoice/SettingsSection';
import { InvoicePreview, InvoicePreviewRef } from '@/components/invoice/InvoicePreview';
import { useInvoice } from '@/hooks/useInvoice';
import { toast } from 'sonner';
import { Eye, FileEdit, ChevronRight, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/shared/SEO';
import { Shield, Zap, DollarSign, Globe, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {


  const {
    invoice,
    updateInvoice,
    updateLineItem,
    addLineItem,
    removeLineItem,
    updatePaymentInfo,
    setCurrency,
    setTemplate,
    resetInvoice,
    lastSaved,
    isSaving,
  } = useInvoice();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeSection, setActiveSection] = useState<'details' | 'items' | 'settings'>('details');
  const [isEditingStarted, setIsEditingStarted] = useState(false);
  const previewRef = useRef<InvoicePreviewRef>(null);

  const handleExportPDF = async () => {
    if (previewRef.current) {
      await previewRef.current.downloadPDF();
    }
  };

  const handleNewInvoice = () => {
    if (confirm('Create a new invoice? Current draft will be cleared.')) {
      resetInvoice();
      toast.success('New invoice created');
    }
  };

  const sections = [
    { id: 'details', label: 'Details', icon: '📋' },
    { id: 'items', label: 'Items', icon: '📦' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this invoice generator truly free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our invoice generator is 100% free forever. There are no hidden fees, no credit card required, and no limits on how many invoices you can generate."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up or login?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you can generate unlimited invoices without any login or registration. Your data stays in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "Can I generate GST invoices for India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You can add GST/VAT, HS Code, and other tax details easily to create compliant invoices for Indian businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We use local browser storage. We do not store your invoice data on our servers, ensuring complete privacy."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background font-sans w-full overflow-x-hidden">
      <SEO
        title="Free Invoice Generator India | Online GST Invoice Maker"
        description="Create professional GST invoices for free. No login required. Best online invoice generator for freelancers & small businesses in India. Download PDF instantly."
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "InvoiceCraft",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          },
          ...faqSchema
        })}
      />

      <Header
        onNewInvoice={handleNewInvoice}
        onExportPDF={handleExportPDF}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      {/* Hero Content for SEO - Collapsible */}
      <div className={cn(
        "hero-collapse container mx-auto px-4",
        isEditingStarted ? "collapsed" : "pt-8 pb-4"
      )}>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Free Online Invoice Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Create professional GST invoices in seconds. No login required. 100% Free.
          </p>
        </div>
      </div>

      {/* Mobile Tab Switcher - Segmented Control */}
      <div className="lg:hidden py-4 px-4 sticky top-[56px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/40">
        <div className="segmented-control">
          <button
            onClick={() => setActiveTab('edit')}
            className={cn(
              "segmented-control-item",
              activeTab === 'edit' && "active"
            )}
          >
            <FileEdit className="h-4 w-4" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              "segmented-control-item",
              activeTab === 'preview' && "active"
            )}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>


      <main className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-24 lg:pb-8">
        <div className="grid gap-4 lg:gap-8 lg:grid-cols-[1fr,1.3fr] xl:grid-cols-2 items-start">
          {/* Editor Column */}
          <div className={cn(
            "space-y-4 lg:space-y-6",
            activeTab === 'preview' && "hidden lg:block"
          )}>

            {/* Section Navigation - Desktop Segmented Control */}
            <div className="hidden lg:block sticky top-20 z-20">
              <div className="segmented-control p-1.5 shadow-sm">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsEditingStarted(true);
                    }}
                    className={cn(
                      "segmented-control-item py-2.5",
                      activeSection === section.id && "active"
                    )}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Navigation - Mobile Segmented Control */}
            <div className="lg:hidden -mx-2 px-2 overflow-x-auto no-scrollbar pb-6">
              <div className="segmented-control w-max min-w-full">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsEditingStarted(true);
                    }}
                    className={cn(
                      "segmented-control-item whitespace-nowrap",
                      activeSection === section.id && "active"
                    )}
                  >
                    <span className="text-base">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            {activeSection === 'details' && (
              <div className="space-y-4 lg:space-y-6 animate-fade-in">
                <CompanySection invoice={invoice} onUpdate={updateInvoice} />
                <ClientSection invoice={invoice} onUpdate={updateInvoice} />
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setActiveSection('items')} className="group border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                    Next: Items
                    <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Items Section */}
            {activeSection === 'items' && (
              <div className="space-y-4 lg:space-y-6 animate-fade-in">
                <LineItemsSection
                  invoice={invoice}
                  onUpdateItem={updateLineItem}
                  onAddItem={addLineItem}
                  onRemoveItem={removeLineItem}
                />
                <CalculationsSection
                  invoice={invoice}
                  onUpdate={updateInvoice}
                  onSetCurrency={setCurrency}
                />
                <div className="flex justify-between gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setActiveSection('details')}>
                    ← Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveSection('settings')} className="group border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                    Settings →
                  </Button>
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-4 lg:space-y-6 animate-fade-in">
                <SettingsSection
                  invoice={invoice}
                  onUpdate={updateInvoice}
                  onUpdatePaymentInfo={updatePaymentInfo}
                  onSetTemplate={setTemplate}
                />
                <div className="flex justify-start">
                  <Button variant="ghost" size="sm" onClick={() => setActiveSection('items')}>
                    ← Items
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Preview Column */}
          <div className={cn(
            "lg:sticky lg:top-24", // Removed fixed height constraints to allow ad to stack below
            activeTab === 'edit' && "hidden lg:block"
          )}>
            <div className="rounded-xl border border-border/50 shadow-sm overflow-hidden bg-muted/10 backdrop-blur-sm mb-6">
              <InvoicePreview ref={previewRef} invoice={invoice} />
            </div>

          </div>
        </div>

        {/* Mobile Bottom Action Bar - Premium Floating Style */}
        <div className="fixed bottom-6 left-4 right-4 lg:hidden z-50">
          <div className="glass-card flex items-center justify-between p-4 shadow-2xl ring-1 ring-primary/5">
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Invoice Total</span>
              <span className="text-xl font-black text-primary tracking-tighter">
                {invoice.currency.symbol}{invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <Button
              variant="gradient"
              onClick={handleExportPDF}
              className="rounded-xl px-6 h-12 shadow-lg shadow-primary/20 font-bold"
            >
              <Download className="h-4 w-4 mr-2" />
              Get PDF
            </Button>
          </div>
        </div>
      </main>

      {/* SEO Content Section */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Use InvoiceCraft?</h2>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: "100% Secure - Data stays in your browser" },
                  { icon: DollarSign, text: "Totally Free - No hidden costs or subscriptions" },
                  { icon: Zap, text: "Instant PDF Download - No watermarks" },
                  { icon: Globe, text: "GST Ready - Perfect for Indian businesses" },
                  { icon: Smartphone, text: "Mobile Friendly - Edit on the go" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <item.icon className="h-4 w-4" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Designed for India 🇮🇳</h2>
              <p className="text-muted-foreground mb-4">
                Our tool is specifically optimized for Indian freelancers, small business owners, and consultants.
                Generate GST-compliant invoices with automatic tax calculations, currency symbol (₹), and support for HS codes.
              </p>
              <p className="text-muted-foreground">
                Whether you need a <strong>free invoice maker for freelancers</strong> or an <strong>online GST invoice generator</strong>, we have you covered.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link to="/how-to-create-gst-invoice-india" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                  How to create GST Invoice <ChevronRight className="h-3 w-3" />
                </Link>
                <Link to="/best-free-invoice-generator-india" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                  Best Free Generators <ChevronRight className="h-3 w-3" />
                </Link>
                <Link to="/invoice-format-for-small-business" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                  Invoice Formats <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { q: "Is this invoice generator free forever?", a: "Yes, it is completely free. We generate revenue through unobtrusive ads, so you never have to pay." },
                { q: "Do you store my data?", a: "No. Your privacy is paramount. All invoice data is stored locally in your browser's LocalStorage. We do not have access to your client or financial data." },
                { q: "Can I use this for GST invoices?", a: "Yes! Simply enable the Tax option in settings, set the tax name to 'GST', and enter your rate (e.g., 18%). You can also add your GSTIN in the company details." },
                { q: "Does the PDF have a watermark?", a: "No. We believe in professional output. Your downloaded PDF invoices are clean and unbranded." },
              ].map((item, i) => (
                <div key={i} className="bg-background p-6 rounded-xl border border-border/50">
                  <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground">
            <h2 className="text-foreground">How to Create an Invoice Online for Free</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Enter Company Details:</strong> Add your business name, address, and logo. Don't forget your GSTIN if applicable.</li>
              <li><strong>Add Client Info:</strong> Fill in your client's billing details.</li>
              <li><strong>Add Line Items:</strong> List your services or products. The calculator will automatically update totals.</li>
              <li><strong>Customize Settings:</strong> Choose your currency (₹), tax rate, and payment instructions.</li>
              <li><strong>Download PDF:</strong> Click 'Export PDF' to get your professional invoice instantly.</li>
            </ol>
            <p className="mt-4">
              Using a <strong>free invoice generator without login</strong> saves you time and hassle. Start billing your clients professionally today with InvoiceCraft.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
