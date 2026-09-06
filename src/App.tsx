import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from 'react';
import Index from "./pages/Index";

// Lazy Load Blog Pages
const BlogList = lazy(() => import('./pages/blog/BlogList'));
const Guide = lazy(() => import('./pages/Guide'));
const HowToCreateGSTInvoice = lazy(() => import('./pages/blog/HowToCreateGSTInvoice'));
const BestFreeInvoiceGenerator = lazy(() => import('./pages/blog/BestFreeInvoiceGenerator'));
const InvoiceFormat = lazy(() => import('./pages/blog/InvoiceFormat'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/how-to-create-gst-invoice-india" element={<HowToCreateGSTInvoice />} />
              <Route path="/best-free-invoice-generator-india" element={<BestFreeInvoiceGenerator />} />
              <Route path="/invoice-format-for-small-business" element={<InvoiceFormat />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
