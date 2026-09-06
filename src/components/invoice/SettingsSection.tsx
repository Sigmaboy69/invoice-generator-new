import { Settings, Palette, Layout, CreditCard, PenTool, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { InvoiceData, TEMPLATES, TemplateType, PaymentInfo } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

// Signature Upload Component
const SignatureUpload = ({
  signatureImage,
  onUpdate
}: {
  signatureImage: string | null;
  onUpdate: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate('signatureImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
      <div className="mb-4 flex items-center gap-2">
        <PenTool className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Digital Signature</h2>
      </div>

      {signatureImage ? (
        <div className="relative group/sig">
          <img
            src={signatureImage}
            alt="Signature"
            className="max-h-24 mx-auto rounded-xl border border-white/10 bg-white/50 p-4 transition-all duration-300 group-hover/sig:scale-105 group-hover/sig:shadow-lg"
          />
          <button
            onClick={() => onUpdate('signatureImage', null)}
            className="absolute -top-3 -right-3 rounded-full bg-destructive p-1.5 text-destructive-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 p-8 transition-all duration-300 hover:border-primary hover:bg-primary/5 group"
        >
          <div className="mb-4 rounded-2xl bg-secondary p-4 transition-transform group-hover:scale-110 group-hover:bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm font-bold text-foreground">Upload Signature</p>
          <p className="text-xs text-muted-foreground mt-1">PNG or JPG up to 2MB</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

interface SettingsSectionProps {
  invoice: InvoiceData;
  onUpdate: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
  onUpdatePaymentInfo: <K extends keyof PaymentInfo>(field: K, value: PaymentInfo[K]) => void;
  onSetTemplate: (template: TemplateType) => void;
}

export const SettingsSection = ({ invoice, onUpdate, onUpdatePaymentInfo, onSetTemplate }: SettingsSectionProps) => {
  const presetColors = [
    '#f59e0b', // Amber
    '#10b981', // Emerald  
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#ef4444', // Red
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];

  return (
    <div className="space-y-6">
      {/* Settings Card */}
      <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>

        <div className="space-y-5">
          {/* Invoice Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Invoice Number</label>
            <Input
              value={invoice.invoiceNumber}
              onChange={(e) => onUpdate('invoiceNumber', e.target.value)}
              placeholder="INV-001"
              className="h-11 sm:h-10"
            />
          </div>

          {/* Company Tagline */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Company Tagline</label>
            <Input
              value={invoice.companyTagline}
              onChange={(e) => onUpdate('companyTagline', e.target.value)}
              placeholder="Your tagline or slogan"
              className="h-11 sm:h-10"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Website</label>
            <Input
              value={invoice.companyWebsite}
              onChange={(e) => onUpdate('companyWebsite', e.target.value)}
              placeholder="www.yourcompany.com"
              className="h-11 sm:h-10"
            />
          </div>

          {/* Custom Tax Label */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Tax Label (e.g. GST, VAT)</label>
            <Input
              value={invoice.taxLabel}
              onChange={(e) => onUpdate('taxLabel', e.target.value)}
              placeholder="Tax"
              className="h-11 sm:h-10"
            />
          </div>

          {/* Brand Color */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Palette className="h-4 w-4" />
              Brand Color
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate('brandColor', color)}
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all hover:scale-110",
                    invoice.brandColor === color && "ring-2 ring-offset-2 ring-offset-background ring-foreground"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg border border-border shadow-inner cursor-pointer overflow-hidden"
                style={{ backgroundColor: invoice.brandColor }}
              >
                <input
                  type="color"
                  value={invoice.brandColor}
                  onChange={(e) => onUpdate('brandColor', e.target.value)}
                  className="h-full w-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                value={invoice.brandColor}
                onChange={(e) => onUpdate('brandColor', e.target.value)}
                placeholder="#f59e0b"
                className="flex-1 font-mono h-11 sm:h-10"
              />
            </div>
          </div>

          {/* Font Color */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="text-lg">A</span>
              Font Color
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['#000000', '#333333', '#4b5563', '#1e293b', '#64748b'].map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate('textColor', color)}
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all hover:scale-110",
                    invoice.textColor === color && "ring-2 ring-offset-2 ring-offset-background ring-foreground"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg border border-border shadow-inner cursor-pointer overflow-hidden"
                style={{ backgroundColor: invoice.textColor || '#333333' }}
              >
                <input
                  type="color"
                  value={invoice.textColor || '#333333'}
                  onChange={(e) => onUpdate('textColor', e.target.value)}
                  className="h-full w-full opacity-0 cursor-pointer"
                />
              </div>
              <Input
                value={invoice.textColor || '#333333'}
                onChange={(e) => onUpdate('textColor', e.target.value)}
                placeholder="#333333"
                className="flex-1 font-mono h-11 sm:h-10"
              />
            </div>
          </div>

          {/* Template Selection - Gallery View */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Layout className="h-4 w-4" />
              Template Gallery
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSetTemplate(template.id)}
                  className={cn(
                    "group relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-300",
                    invoice.template === template.id
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-transparent bg-secondary/40 hover:bg-secondary/60 hover:border-primary/20"
                  )}
                >
                  {/* Template Preview Thumbnail */}
                  <div className={cn(
                    "relative h-24 sm:h-28 w-full flex items-center justify-center text-4xl sm:text-5xl transition-transform duration-500 group-hover:scale-110",
                    template.id === 'bold' && "bg-gradient-to-br from-amber-500/10 to-amber-500/5",
                    template.id === 'classic' && "bg-gradient-to-br from-blue-500/10 to-blue-500/5",
                    template.id === 'modern' && "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5",
                    template.id === 'minimal' && "bg-gradient-to-br from-slate-500/10 to-slate-500/5",
                    template.id === 'industrial' && "bg-gradient-to-br from-gray-900 to-gray-700",
                    template.id === 'indigo' && "bg-gradient-to-br from-indigo-500 to-indigo-600",
                    template.id === 'basic' && "bg-gradient-to-br from-slate-100 to-slate-200",
                    template.id === 'elite' && "bg-gradient-to-br from-orange-400 to-orange-600"
                  )}>
                    <span className="drop-shadow-lg">{template.preview}</span>
                    {invoice.template === template.id && (
                      <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300">
                        <span className="text-xs font-bold font-mono">✓</span>
                      </div>
                    )}
                  </div>
                  {/* Template Info */}
                  <div className="p-3 text-center bg-transparent">
                    <span className="text-xs sm:text-sm font-bold block truncate">{template.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Signature Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <PenTool className="h-4 w-4" />
              Show Signature
            </label>
            <Switch
              checked={invoice.showSignature}
              onCheckedChange={(checked) => onUpdate('showSignature', checked)}
            />
          </div>

          {/* Payment Info Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              Show Payment Info
            </label>
            <Switch
              checked={invoice.showPaymentInfo}
              onCheckedChange={(checked) => onUpdate('showPaymentInfo', checked)}
            />
          </div>
          
          {/* QR Code Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="text-base">📱</span>
              Show Payment QR Code
            </label>
            <Switch
              checked={invoice.showQrCode}
              onCheckedChange={(checked) => onUpdate('showQrCode', checked)}
            />
          </div>

          {/* Table Column Settings */}
          <div className="pt-4 border-t border-border">
            <label className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              Table Columns visibility
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg">
                <span className="text-xs font-medium">Qty</span>
                <Switch
                  checked={invoice.columnSettings?.quantity}
                  onCheckedChange={(checked) => onUpdate('columnSettings', { ...invoice.columnSettings!, quantity: checked })}
                />
              </div>
              <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg">
                <span className="text-xs font-medium">Price</span>
                <Switch
                  checked={invoice.columnSettings?.unitPrice}
                  onCheckedChange={(checked) => onUpdate('columnSettings', { ...invoice.columnSettings!, unitPrice: checked })}
                />
              </div>
              <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg">
                <span className="text-xs font-medium">Total</span>
                <Switch
                  checked={invoice.columnSettings?.total}
                  onCheckedChange={(checked) => onUpdate('columnSettings', { ...invoice.columnSettings!, total: checked })}
                />
              </div>
              <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg">
                <span className="text-xs font-medium">HSN/SAC</span>
                <Switch
                  checked={invoice.columnSettings?.hsn}
                  onCheckedChange={(checked) => onUpdate('columnSettings', { ...invoice.columnSettings!, hsn: checked })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Upload Card */}
      {invoice.showSignature && (
        <SignatureUpload
          signatureImage={invoice.signatureImage}
          onUpdate={onUpdate}
        />
      )}

      {/* Payment Info Card */}
      <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Payment Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Bank Name</label>
            <Input
              value={invoice.paymentInfo.bankName}
              onChange={(e) => onUpdatePaymentInfo('bankName', e.target.value)}
              placeholder="Bank Name"
              className="h-11 sm:h-10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Account Number</label>
            <Input
              value={invoice.paymentInfo.accountNumber}
              onChange={(e) => onUpdatePaymentInfo('accountNumber', e.target.value)}
              placeholder="1234 5678 9012"
              className="h-11 sm:h-10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Account Name</label>
            <Input
              value={invoice.paymentInfo.accountName}
              onChange={(e) => onUpdatePaymentInfo('accountName', e.target.value)}
              placeholder="Your Name or Company"
              className="h-11 sm:h-10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Bank Details</label>
            <Input
              value={invoice.paymentInfo.bankDetails}
              onChange={(e) => onUpdatePaymentInfo('bankDetails', e.target.value)}
              placeholder="Bank name, branch, etc."
              className="h-11 sm:h-10"
            />
          </div>
          <div className="pt-2 border-t border-border mt-2">
            <label className="mb-2 flex items-center justify-between text-sm font-bold text-foreground">
              UPI ID (VPA)
              <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-0.5 rounded-full">For Scan-to-Pay</span>
            </label>
            <Input
              value={invoice.paymentInfo.upiId}
              onChange={(e) => onUpdatePaymentInfo('upiId', e.target.value)}
              placeholder="yourname@upi"
              className="h-11 sm:h-10 border-primary/20 focus:border-primary shadow-sm shadow-primary/5"
            />
          </div>
        </div>
      </div>

      {/* Notes & Terms Card */}
      <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">📝</span>
          <h2 className="text-lg font-semibold">Notes & Terms</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Notes</label>
            <Textarea
              value={invoice.notes}
              onChange={(e) => onUpdate('notes', e.target.value)}
              placeholder="Additional notes for the client..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Terms & Conditions</label>
            <Textarea
              value={invoice.terms}
              onChange={(e) => onUpdate('terms', e.target.value)}
              placeholder="Payment terms and conditions..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
