import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    FileText,
    Bolt,
    History,
    Globe2,
    Calculator,
    Zap,
    CheckCircle2,
    X,
    Menu,
    Twitter,
    Github,
    Linkedin
} from "lucide-react";

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const features = [
    {
        icon: <FileText className="h-6 w-6 text-white" />,
        color: "bg-blue-500",
        title: "Instant PDF Export",
        desc: "Generate high-quality, printable PDF invoices with a single click. Compatible with all devices."
    },
    {
        icon: <Bolt className="h-6 w-6 text-white" />,
        color: "bg-purple-600",
        title: "Premium Templates",
        desc: "Choose from our selection of professional templates including Clean, Modern, and Bold styles."
    },
    {
        icon: <History className="h-6 w-6 text-white" />,
        color: "bg-green-500",
        title: "Smart Local Save",
        desc: "We save your data in your browser automatically so you never lose your work. Privacy first."
    },
    {
        icon: <Globe2 className="h-6 w-6 text-white" />,
        color: "bg-yellow-500",
        title: "Multi-Currency",
        desc: "Bill your clients globally. Support for USD, EUR, GBP, INR and more with automatic formatting."
    },
    {
        icon: <Calculator className="h-6 w-6 text-white" />,
        color: "bg-red-500",
        title: "Auto-Calculations",
        desc: "Stop doing math. We handle taxes, discounts, and shipping calculations instantly."
    },
    {
        icon: <Zap className="h-6 w-6 text-white" />,
        color: "bg-orange-500",
        title: "Lightning Fast",
        desc: "Built for speed. No loading spinners, no accounts to create. Just open and invoice."
    }
];

const faqs = [
    {
        q: "Is this invoice generator truly free?",
        a: "Yes, InvoiceCraft is 100% free to use. You can generate unlimited invoices without paying a cent or seeing any watermarks."
    },
    {
        q: "Do I need to sign up?",
        a: "No account is required. We store your invoice data locally in your browser's history so you can come back to it later."
    },
    {
        q: "Is my data secure?",
        a: "Absolutely. Since we don't store your data on our servers (it stays in your browser), your client and financial details remain private."
    },
    {
        q: "Can I change the currency?",
        a: "Yes, you can select from major world currencies like USD, EUR, GBP, and INR directly from the editor settings."
    }
];

return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10">

        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Bolt className="h-5 w-5" />
                    </div>
                    <span>DP Invoice Generator</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-primary transition-colors">Features</a>
                    <a href="#templates" className="hover:text-primary transition-colors">Templates</a>
                    <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/app">
                        <Button>Create Invoice</Button>
                    </Link>
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="fixed inset-x-0 top-16 z-40 bg-background border-b p-4 md:hidden shadow-lg animate-in slide-in-from-top-5">
                <nav className="flex flex-col gap-4">
                    <a href="#features" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#templates" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>Templates</a>
                    <a href="#faq" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                    <Link to="/app" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Get Started</Button>
                    </Link>
                </nav>
            </div>
        )}

        <main>
            {/* Hero Section */}
            <section className="pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b">
                <div className="container text-center max-w-4xl px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Professional Invoicing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Made Simple & Free.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create, download, and send fully customizable PDF invoices in seconds. No credit card required. No signup needed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link to="/app">
                            <Button size="lg" className="h-12 px-8 text-base">Create Your First Invoice</Button>
                        </Link>
                        <a href="#templates">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">View Templates</Button>
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> 100% Free
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> No Watermarks
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> Secure & Private
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="container mt-16 max-w-5xl px-4">
                    <div className="relative rounded-xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
                        <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-4">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="mt-8 rounded-lg bg-background overflow-hidden aspect-[16/10] flex relative">
                            <div className="w-1/4 bg-slate-50 border-r p-4 hidden md:block">
                                <div className="space-y-3">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-100/50 p-8 flex justify-center">
                                <div className="w-[90%] h-full bg-white shadow-sm rounded-sm p-8">
                                    <div className="h-8 w-1/3 bg-slate-100 rounded mb-8" />
                                    <div className="space-y-4">
                                        <div className="h-4 w-full bg-slate-50 rounded" />
                                        <div className="h-4 w-full bg-slate-50 rounded" />
                                        <div className="h-4 w-2/3 bg-slate-50 rounded" />
                                    </div>
                                    <div className="mt-12 h-32 w-full bg-slate-50 rounded border border-dashed border-slate-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50/50">
                <div className="container max-w-6xl px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to get paid</h2>
                        <p className="text-muted-foreground text-lg">Powerful features packed into a simple, elegant interface.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-background border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4", feature.color)}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="py-24 border-t">
                <div className="container max-w-6xl px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Beautiful Templates</h2>
                        <p className="text-muted-foreground text-lg">Designed to make you look professional.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Clean", color: "bg-white border-slate-200" },
                            { name: "Modern", color: "bg-gradient-to-br from-white to-slate-100 border-slate-200" },
                            { name: "Bold", color: "bg-slate-900 border-slate-900 text-white" }
                        ].map((tpl, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className={cn(
                                    "aspect-[1/1.4] rounded-lg border shadow-sm mb-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg relative overflow-hidden",
                                    tpl.color
                                )}>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                                        <Button variant="secondary">Preview</Button>
                                    </div>
                                </div>
                                <h4 className="text-center font-semibold">{tpl.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-slate-50/50 border-t">
                <div className="container max-w-4xl px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-background border rounded-xl p-6">
                                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container max-w-5xl px-4">
                    <div className="bg-slate-900 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl rounded-full" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to get paid faster?</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Join thousands of freelancers making professional invoices today.</p>
                            <Link to="/app">
                                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg">Start Invoicing Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-12 bg-slate-50/50">
            <div className="container px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 font-bold text-xl mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Bolt className="h-5 w-5" />
                            </div>
                            <span>DP Invoice Generator</span>
                        </div>
                        <p className="text-muted-foreground text-sm">The simplest way to create customizable invoices for free.</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/app" className="hover:text-primary">Generator</Link></li>
                            <li><a href="#templates" className="hover:text-primary">Templates</a></li>
                            <li><a href="#features" className="hover:text-primary">Features</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Blog</a></li>
                            <li><a href="#" className="hover:text-primary">Guide</a></li>
                            <li><a href="#" className="hover:text-primary">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Privacy</a></li>
                            <li><a href="#" className="hover:text-primary">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">&copy; 2026 InvoiceCraft. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);
};

export default Landing;
