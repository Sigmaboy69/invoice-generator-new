import { Building2, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InvoiceData } from '@/types/invoice';
import { useCallback, useRef } from 'react';

interface CompanySectionProps {
  invoice: InvoiceData;
  onUpdate: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

export const CompanySection = ({ invoice, onUpdate }: CompanySectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate('companyLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpdate]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate('companyLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpdate]);

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in">
      <div className="mb-3 sm:mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <h2 className="text-base sm:text-lg font-semibold">Your Business</h2>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Logo Upload */}
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Company Logo</label>
          <div
            className="relative flex h-28 sm:h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-input/30 transition-colors hover:border-primary/50 hover:bg-input/50 active:scale-[0.99]"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {invoice.companyLogo ? (
              <div className="relative">
                <img
                  src={invoice.companyLogo}
                  alt="Company logo"
                  className="max-h-20 sm:max-h-24 max-w-[180px] sm:max-w-[200px] object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -right-2 -top-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate('companyLogo', null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground px-4 text-center">
                <Upload className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-xs sm:text-sm">Tap to upload logo</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Company Name</label>
            <Input
              value={invoice.companyName}
              onChange={(e) => onUpdate('companyName', e.target.value)}
              placeholder="Your Company Name"
              className="h-11 sm:h-10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              value={invoice.companyEmail}
              onChange={(e) => onUpdate('companyEmail', e.target.value)}
              placeholder="contact@company.com"
              className="h-11 sm:h-10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Phone</label>
            <Input
              type="tel"
              value={invoice.companyPhone}
              onChange={(e) => onUpdate('companyPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="h-11 sm:h-10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Address</label>
            <Input
              value={invoice.companyAddress}
              onChange={(e) => onUpdate('companyAddress', e.target.value)}
              placeholder="123 Business St, City"
              className="h-11 sm:h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
