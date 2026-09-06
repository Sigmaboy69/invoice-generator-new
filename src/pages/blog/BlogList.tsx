import { Link } from 'react-router-dom';
import { Header } from '@/components/invoice/Header';
import { SEO } from '@/components/shared/SEO';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

const BlogList = () => {
    const posts = [
        {
            title: "How to Create a GST Invoice in India",
            slug: "/how-to-create-gst-invoice-india",
            excerpt: "A complete step-by-step guide for freelancers and small businesses to generate compliant GST invoices.",
            date: "March 20, 2024"
        },
        {
            title: "Best Free Invoice Generator in India (2024)",
            slug: "/best-free-invoice-generator-india",
            excerpt: "Compare top free invoicing tools. Why web-based generators are better than Excel templates.",
            date: "March 18, 2024"
        },
        {
            title: "Invoice Format for Small Business",
            slug: "/invoice-format-for-small-business",
            excerpt: "Learn the essential components of a professional invoice. Examples of Modern, Bold, and Clean formats.",
            date: "March 15, 2024"
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans">
            <SEO
                title="Invoice Generator Blog | Tips for Freelancers & SMEs"
                description="Read our latest guides on invoicing, GST compliance, and productivity for small businesses in India."
                canonical="/blog"
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
                    <h1 className="text-3xl font-bold tracking-tight">Resources & Guides</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            to={post.slug}
                            className="block group h-full"
                        >
                            <article className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200 flex flex-col">
                                <div className="mb-4 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground text-sm mb-4 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                                    Read Article <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BlogList;
