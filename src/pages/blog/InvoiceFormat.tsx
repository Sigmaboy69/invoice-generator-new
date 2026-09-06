import { SEO } from '@/components/shared/SEO';
import { Header } from '@/components/invoice/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InvoiceFormat = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="invoice format for small business | Professional Templates"
                description="Download professional invoice formats for small business. Learn what makes a perfect invoice structure. Clean, modern, and GST ready templates."
                canonical="/invoice-format-for-small-business"
                type="article"
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
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Invoice Format for Small Business</h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        Your invoice is a reflection of your brand. A cluttered or confusing invoice can delay payments and look unprofessional. Here is the ideal invoice format for small businesses.
                    </p>

                    <h2>Key Components of a Professional Format</h2>

                    <h3>1. Header</h3>
                    <p>The top section should clearly state "INVOICE" in large letters. It must include your company logo and contact details aligned to one side, and the invoice number/date on the other.</p>

                    <h3>2. Client Details ("Bill To")</h3>
                    <p>Always include the full name, address, and contact number of your client. If B2B, include their tax ID (GSTIN).</p>

                    <h3>3. Itemized List</h3>
                    <p>A table format is best. Columns should include:</p>
                    <ul>
                        <li>Item Description</li>
                        <li>Quantity</li>
                        <li>Rate (Price per unit)</li>
                        <li>Tax Amount</li>
                        <li>Line Total</li>
                    </ul>

                    <h3>4. Footer & Payment Terms</h3>
                    <p>
                        The bottom section is for the total amount due (bold and clear). Below that, include your payment details (Bank Account, UPI ID) and any terms (e.g., "Due in 7 days").
                    </p>

                    <h2>Clean vs. Modern vs. Bold Templates</h2>
                    <p>Our generator offers multiple styles:</p>
                    <ul>
                        <li><strong>Clean:</strong> Minimalist, black and white. Best for corporate consulting.</li>
                        <li><strong>Modern:</strong> Uses a subtle accent color and rounded corners. Great for digital agencies.</li>
                        <li><strong>Bold:</strong> High contrast header. detailed footer. Perfect for creative freelancers.</li>
                    </ul>

                    <div className="mt-10 p-6 bg-secondary/30 rounded-xl border border-border text-center">
                        <h3 className="text-xl font-bold mb-3">Explore Our Templates</h3>
                        <p className="mb-4 text-muted-foreground">Select a template in the Settings tab to see which format fits your brand.</p>
                        <Button asChild size="lg" className="rounded-full">
                            <Link to="/">Start Designing Invoice</Link>
                        </Button>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default InvoiceFormat;
