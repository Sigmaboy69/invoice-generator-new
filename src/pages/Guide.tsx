import { Link } from 'react-router-dom';
import { Header } from '@/components/invoice/Header';
import { SEO } from '@/components/shared/SEO';
import { ArrowLeft, CheckCircle2, MoreHorizontal, Download, Palette, Settings } from 'lucide-react';

const Guide = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="How to Use Free Invoice Generator | Step-by-Step Guide"
                description="Learn how to create professional invoices in minutes. Configure taxes, change currency, customize templates, and export PDF using our free tool."
                canonical="/guide"
                type="article"
            />

            <Header
                onNewInvoice={() => { }}
                onExportPDF={() => { }}
                isSaving={false}
                lastSaved={null}
            />

            <main className="container max-w-4xl mx-auto px-4 py-12">
                <div className="flex items-center gap-2 mb-8">
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">User Guide</h1>
                </div>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead text-xl text-muted-foreground mb-12">
                        Welcome to InvoiceCraft! This guide will help you master all the features of our free invoice generator so you can get paid faster.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                        <div className="p-6 rounded-xl border border-border bg-card">
                            <Settings className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-lg font-bold mb-2">1. Configure</h3>
                            <p className="text-muted-foreground text-sm">Set up your company details, logo, and tax settings.</p>
                        </div>
                        <div className="p-6 rounded-xl border border-border bg-card">
                            <MoreHorizontal className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-lg font-bold mb-2">2. Add Items</h3>
                            <p className="text-muted-foreground text-sm">List your services or products with automatic calculations.</p>
                        </div>
                        <div className="p-6 rounded-xl border border-border bg-card">
                            <Download className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-lg font-bold mb-2">3. Download</h3>
                            <p className="text-muted-foreground text-sm">Get a professional PDF instantly without signing up.</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Setting Up Your Invoice
                            </h2>
                            <p className="mb-4">
                                Start by filling in the <strong>From</strong> section with your business details.
                            </p>
                            <ul className="list-none space-y-2 pl-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>Logo:</strong> Click the image placeholder to upload your company logo.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>Currency:</strong> Go to the <em>Settings</em> tab to change the currency (e.g., INR, USD, EUR).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>Tax / GST:</strong> Enable Tax in <em>Settings</em>. You can rename "Tax" to "GST" or "VAT".</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Adding Line Items
                            </h2>
                            <p>
                                Click <strong>Add Item</strong> to insert new rows.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Enter a clear description of your service or product.</li>
                                <li>Adjust Quantity and Rate; the Total is calculated automatically.</li>
                                <li>Drag and drop items to reorder them if needed (coming soon).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Customizing the Look
                            </h2>
                            <div className="bg-secondary/50 p-6 rounded-lg border border-border">
                                <div className="flex items-start gap-4">
                                    <Palette className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h4 className="font-bold mb-2">Templates & Colors</h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Switch to the <strong>Settings</strong> tab to choose between different templates:
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm font-medium">
                                            <div className="bg-background p-2 rounded border text-center">Modern</div>
                                            <div className="bg-background p-2 rounded border text-center">Classic</div>
                                            <div className="bg-background p-2 rounded border text-center">Bold</div>
                                            <div className="bg-background p-2 rounded border text-center">Minimal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-16 p-8 bg-black text-white rounded-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4 text-white">Ready to create your first invoice?</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            It takes less than 2 minutes to generate a professional invoice tailored to your brand.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-orange-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Start Invoicing Now
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Guide;
