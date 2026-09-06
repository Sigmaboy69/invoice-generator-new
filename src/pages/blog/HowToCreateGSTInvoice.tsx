import { SEO } from '@/components/shared/SEO';
import { Header } from '@/components/invoice/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const HowToCreateGSTInvoice = () => {
    const schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Create a GST Invoice in India for Free",
        "image": "https://freeinvoice.nrrevibe.online/og-image.jpg",
        "author": {
            "@type": "Organization",
            "name": "InvoiceCraft"
        },
        "publisher": {
            "@type": "Organization",
            "name": "InvoiceCraft",
            "logo": {
                "@type": "ImageObject",
                "url": "https://freeinvoice.nrrevibe.online/logo.png"
            }
        },
        "datePublished": "2024-03-20",
        "description": "Step-by-step guide to creating GST compliant invoices in India using free online tools. Learn about HSN codes, tax rates, and mandatory invoice fields."
    });

    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="how to create gst invoice india | Free Guide"
                description="Learn how to make a valid GST invoice in India. Step-by-step guide for freelancers and small businesses. Use our free tool to generate GST bills instantly."
                canonical="/how-to-create-gst-invoice-india"
                type="article"
                schema={schema}
            />

            <Header
                onNewInvoice={() => { }}
                onExportPDF={() => { }}
                isSaving={false}
                lastSaved={null}
            />

            <main className="container max-w-3xl mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Generator
                </Link>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">How to Create a GST Invoice in India</h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        If you are a freelancer or small business owner in India registered under GST, issuing compliant invoices is mandatory. Here is a simple guide to doing it correctly.
                    </p>

                    <h2>What is a GST Invoice?</h2>
                    <p>
                        A GST invoice is a bill issued by a supplier to a recipient for the supply of goods or services. It serves as proof of the transaction and is essential for the recipient to claim Input Tax Credit (ITC).
                    </p>

                    <h2>Mandatory Fields in a GST Invoice</h2>
                    <p>According to GST rules, your invoice must contain:</p>
                    <ul>
                        <li><strong>Invoice Number:</strong> A unique consecutive serial number.</li>
                        <li><strong>Date of Issue:</strong> The date the invoice is generated.</li>
                        <li><strong>Supplier Details:</strong> Name, Address, and GSTIN.</li>
                        <li><strong>Recipient Details:</strong> Name, Address, and GSTIN (if registered).</li>
                        <li><strong>HSN/SAC Code:</strong> Harmonized System of Nomenclature code for goods or Services Accounting Code for services.</li>
                        <li><strong>Taxable Value:</strong> Value of goods/services before tax.</li>
                        <li><strong>Tax Rate & Amount:</strong> CGST, SGST, or IGST breakup.</li>
                    </ul>

                    <h2>Step-by-Step Guide using InvoiceCraft</h2>
                    <p>You don't need expensive software like Tally or Zoho to create a simple GST invoice. Our free tool makes it easy:</p>
                    <ol>
                        <li>Go to the <Link to="/">Homepage</Link>.</li>
                        <li>In the <strong>Settings</strong> tab, enable "Tax" and rename it to "GST".</li>
                        <li>Enter your tax rate (e.g., 18%).</li>
                        <li>In the <strong>Company</strong> section, add your Business Name and GSTIN.</li>
                        <li>Add line items. You can add the HSN code in the description or item name.</li>
                        <li>The tool will automatically calculate the tax amount and total.</li>
                        <li>Click <strong>Export PDF</strong> to download your professional GST invoice.</li>
                    </ol>

                    <h2>Common GST Rates in India</h2>
                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-border">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="border p-2 text-left">Category</th>
                                    <th className="border p-2 text-left">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Essential Goods</td>
                                    <td className="border p-2">0% or 5%</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Standard Services</td>
                                    <td className="border p-2">12% or 18%</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Luxury Items</td>
                                    <td className="border p-2">28%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Conclusion</h2>
                    <p>
                        Creating a GST invoice doesn't have to be complicated. With the right format and a free tool, you can ensure compliance and get paid faster.
                    </p>

                    <div className="mt-10 p-6 bg-secondary/30 rounded-xl border border-border text-center">
                        <h3 className="text-xl font-bold mb-3">Ready to create your invoice?</h3>
                        <Button asChild size="lg" className="rounded-full">
                            <Link to="/">Create Free GST Invoice Now</Link>
                        </Button>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default HowToCreateGSTInvoice;
