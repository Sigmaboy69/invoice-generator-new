import { QRCodeSVG } from 'qrcode.react';
import { InvoiceData } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface PaymentQRCodeProps {
  invoice: InvoiceData;
  size?: number;
  className?: string;
}

export const PaymentQRCode = ({ invoice, size = 120, className }: PaymentQRCodeProps) => {
  const { paymentInfo, companyName, total, invoiceNumber, currency, brandColor } = invoice;
  
  if (!paymentInfo.upiId) return null;

  // UPI URI format: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&tn=NOTES&cu=CURRENCY
  const upiUri = `upi://pay?pa=${encodeURIComponent(paymentInfo.upiId)}&pn=${encodeURIComponent(companyName || 'Business')}&am=${total.toFixed(2)}&tn=${encodeURIComponent(`Invoice ${invoiceNumber}`)}&cu=${currency.code || 'INR'}`;

  return (
    <div className={cn("flex flex-col items-center gap-2 print:gap-1", className)}>
      <div className="relative p-2 bg-white rounded-xl border-2 shadow-sm" style={{ borderColor: `${brandColor}20` }}>
        <QRCodeSVG 
          value={upiUri} 
          size={size}
          level="H"
          includeMargin={false}
          imageSettings={invoice.companyLogo ? {
            src: invoice.companyLogo,
            x: undefined,
            y: undefined,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          } : undefined}
        />
        {/* Subtle Brand Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: brandColor }}></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: brandColor }}></div>
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
        <span className="h-px w-4 bg-current"></span>
        Scan to Pay
        <span className="h-px w-4 bg-current"></span>
      </div>
    </div>
  );
};
