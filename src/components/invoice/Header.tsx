import { FileText, Plus, Moon, Sun, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
interface HeaderProps {
  onNewInvoice: () => void;
  onExportPDF: () => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
}
export const Header = ({
  onNewInvoice,
  onExportPDF,
  isSaving,
  lastSaved
}: HeaderProps) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  const formatSaveTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl safe-area-top">
    <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto sm:h-10 object-contain" />
        <div>
          <div className="text-base sm:text-lg font-bold tracking-tight">InvoiceCraft</div>
          <p className="hidden sm:block text-xs text-muted-foreground">Free Professional Invoice Generator</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Save status - hidden on mobile, shown in bottom bar */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          {isSaving ? <>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span>Saving...</span>
          </> : lastSaved ? <>
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>Saved {formatSaveTime(lastSaved)}</span>
          </> : null}
        </div>

        <Button variant="ghost" size="icon" onClick={onNewInvoice} title="New Invoice" className="h-9 w-9 sm:h-10 sm:w-10">
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} title="Toggle theme" className="h-9 w-9 sm:h-10 sm:w-10">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="gradient" onClick={onExportPDF} className="hidden lg:flex">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  </header>;
};