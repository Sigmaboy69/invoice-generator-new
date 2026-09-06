import { InvoiceData } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { PaymentQRCode } from '../PaymentQRCode';

interface BoldTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BoldTemplate = ({
  invoice,
  formatCurrency,
  formatDate
}: BoldTemplateProps) => {
  const brandColor = invoice.brandColor || '#2563eb';
  const textColor = invoice.textColor || '#111827';
  
  // Calculate a darker version of brand color for the top bar
  const brandColorDark = `${brandColor}CC`; 

  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible relative flex flex-col print:m-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textColor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>

      {/* Header Section with Curves */}
      <div className="relative">
        {/* Dark Top Bar */}
        <div className="bg-[#1e293b] h-32 w-full absolute top-0 left-0 z-0"></div>

        {/* Dynamic Brand Curve - Pro SVG */}
        <div className="absolute top-0 left-0 w-full h-56 z-10">
          <svg width="100%" height="100%" viewBox="0 0 794 224" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H500C560 0 620 40 680 90L794 90V160C700 160 580 130 480 30L0 30V0Z" fill={brandColor} />
            <path d="M0 30H480C580 130 700 160 794 160V190C700 190 550 160 450 40L0 40V30Z" fill={brandColor} fillOpacity="0.4" />
          </svg>
        </div>

        <div className="relative z-20 px-12 pt-10 flex justify-between items-start">
          {/* Left: Invoice Title & Metadata */}
          <div className="text-white mt-4">
            <h1 className="text-6xl font-black tracking-tighter mb-6 drop-shadow-sm">INVOICE</h1>
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-5 space-y-2 text-sm border border-white/10 shadow-2xl">
              <div className="flex items-center gap-6">
                <span className="w-24 font-medium opacity-60 uppercase tracking-widest text-[10px]">Invoice No</span>
                <span className="font-black text-lg tracking-tight">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-24 font-medium opacity-60 uppercase tracking-widest text-[10px]">Date</span>
                <span className="font-black tracking-tight">{formatDate(invoice.createdAt)}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-24 font-medium opacity-60 uppercase tracking-widest text-[10px]">Due Date</span>
                <span className="font-black tracking-tight">{formatDate(invoice.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Right: Company Info */}
          <div className="text-right text-white pt-2">
            {invoice.companyLogo ? (
              <div className="bg-white p-2 rounded-lg inline-block mb-3 shadow-md">
                <img src={invoice.companyLogo} alt="Logo" className="h-16 w-auto object-contain" />
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 mb-3">
                <div className="h-12 w-12 border-2 border-white flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <span className="font-black text-2xl">{(invoice.companyName || 'B')[0]}</span>
                </div>
                <span className="font-black text-2xl uppercase tracking-tighter">{invoice.companyName}</span>
              </div>
            )}
            {invoice.companyTagline && <p className="text-xs font-medium opacity-80 mb-4 tracking-wider uppercase italic">{invoice.companyTagline}</p>}
            <div className="text-[11px] font-medium opacity-90 space-y-1">
              {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
              {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
              {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
              {invoice.companyWebsite && <p className="font-bold border-b border-white/30 inline-block">{invoice.companyWebsite}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="px-12 mt-24 flex justify-between items-start">
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: brandColor }}></div>
          <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-2 opacity-40">Bill To:</h3>
          <p className="font-black text-2xl leading-none mb-2">{invoice.clientName}</p>
          <div className="text-sm space-y-0.5 opacity-70 max-w-xs font-medium">
            {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
            {invoice.clientPhone && <p>{invoice.clientPhone}</p>}
            {invoice.clientEmail && <p className="font-bold" style={{ color: brandColor }}>{invoice.clientEmail}</p>}
          </div>
        </div>
        
        {/* Quick Summary Badge */}
        <div className="bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100 flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-1">Balance Due</span>
            <span className="text-3xl font-black" style={{ color: brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</span>
        </div>
      </div>

      {/* Table */}
      <div className="px-12 mt-12 flex-1">
        <table className="w-full">
          <thead>
            <tr className="text-white relative border-none" style={{ backgroundColor: brandColor }}>
              <th className="py-4 px-6 text-left first:rounded-l-2xl w-16 text-[10px] font-black uppercase tracking-[0.2em]">SL</th>
              <th className="py-4 px-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Item Description</th>
              {invoice.columnSettings?.hsn && <th className="py-4 px-6 text-center w-24 text-[10px] font-black uppercase tracking-[0.2em]">HSN/SAC</th>}
              {invoice.columnSettings?.unitPrice && <th className="py-4 px-6 text-center w-28 text-[10px] font-black uppercase tracking-[0.2em]">Price</th>}
              {invoice.columnSettings?.quantity && <th className="py-4 px-6 text-center w-20 text-[10px] font-black uppercase tracking-[0.2em]">Qty.</th>}
              {invoice.columnSettings?.total && <th className="py-4 px-6 text-right last:rounded-r-2xl w-36 text-[10px] font-black uppercase tracking-[0.2em]">Total</th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="group transition-colors border-b border-gray-100/50 hover:bg-gray-50/50" style={{ breakInside: 'avoid' }}>
                <td className="py-6 px-6 font-bold opacity-30 text-xs">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-6 px-6">
                    <p className="font-bold text-base leading-tight mb-1.5">{item.description}</p>
                    {item.hsn && <p className="text-[10px] opacity-40 uppercase tracking-tighter">HSN/SAC: {item.hsn}</p>}
                </td>
                {invoice.columnSettings?.hsn && !item.hsn && <td className="py-6 px-6 text-center opacity-30">—</td>}
                {invoice.columnSettings?.unitPrice && <td className="py-6 px-6 text-center font-medium opacity-60 italic">{formatCurrency(item.unitPrice)}</td>}
                {invoice.columnSettings?.quantity && <td className="py-6 px-6 text-center font-black">x{item.quantity}</td>}
                {invoice.columnSettings?.total && <td className="py-6 px-6 text-right font-black text-lg">{formatCurrency(item.total)}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-between mt-10">
            <div className="max-w-sm">
                {(invoice.notes || invoice.terms) && (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30 mb-3">Notes & Terms</h4>
                        <div className="text-xs space-y-3 font-medium leading-relaxed opacity-70">
                            {invoice.notes && <p>{invoice.notes}</p>}
                            {invoice.terms && <p className="border-t border-gray-200 pt-3 italic">{invoice.terms}</p>}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-80 space-y-3">
                <div className="flex justify-between px-2 text-sm font-medium opacity-60">
                    <span>Subtotal</span>
                    <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.discountAmount > 0 && (
                    <div className="flex justify-between px-2 text-sm font-bold text-green-600 bg-green-50 rounded-lg py-2">
                        <span>Discount</span>
                        <span>-{formatCurrency(invoice.discountAmount)}</span>
                    </div>
                )}
                <div className="flex justify-between px-2 text-sm font-medium opacity-60">
                    <span>{invoice.taxLabel} ({invoice.taxRate}%)</span>
                    <span>{formatCurrency(invoice.taxAmount)}</span>
                </div>
                
                {invoice.roundingAmount !== 0 && (
                    <div className="flex justify-between px-2 text-[11px] italic opacity-40">
                        <span>Rounding</span>
                        <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
                    </div>
                )}

                <div className="flex justify-between px-2 text-sm font-bold text-gray-900 border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span>{formatCurrency(invoice.total)}</span>
                </div>

                <div className="flex justify-between px-2 text-xs font-medium text-green-600">
                    <span>Amount Paid</span>
                    <span>-{formatCurrency(invoice.amountPaid || 0)}</span>
                </div>

                <div className="h-px bg-gray-100 w-full my-4"></div>
                <div className="space-y-4">
                    {invoice.showQrCode && invoice.paymentInfo.upiId && (
                        <PaymentQRCode invoice={invoice} size={100} className="items-start" />
                    )}
                    <div className="flex justify-between items-center bg-gray-900 text-white p-5 rounded-2xl shadow-xl transform scale-105 origin-right" style={{ backgroundColor: brandColor }}>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Balance Due</span>
                        <span className="text-3xl font-black">{formatCurrency(invoice.balanceDue || 0)}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Signature Area */}
      {invoice.showSignature && (
        <div className="px-12 mt-12 flex justify-end">
          <div className="text-center group">
            {invoice.signatureImage ? (
              <img src={invoice.signatureImage} alt="Signature" className="h-20 object-contain mx-auto mb-2 transition-transform group-hover:scale-110" />
            ) : (
              <div className="h-16 w-48 mb-2 flex items-end justify-center">
                  <div className="w-full h-px bg-gray-300"></div>
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Authorized Signature</p>
          </div>
        </div>
      )}

      {/* Professional Footer */}
      <div className="mt-auto relative h-40">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gray-900 text-white">
            {/* Footer SVG Accent */}
            <div className="absolute top-0 left-0 w-full h-12 -translate-y-full">
                <svg width="100%" height="100%" viewBox="0 0 794 48" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48L794 48V0C700 30 550 48 400 48C250 48 100 30 0 0V48Z" fill="#111827" />
                </svg>
            </div>
            
            <div className="px-12 pt-4 flex justify-between items-center h-full">
                <div className="flex gap-8 items-center">
                    {/* QR Styled Box */}
                    <div className="h-20 w-20 bg-white rounded-xl p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="grid grid-cols-4 grid-rows-4 gap-0.5 w-full h-full">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className={cn("bg-gray-900 rounded-[1px]", i % 3 === 0 ? "opacity-100" : "opacity-20")}></div>
                            ))}
                        </div>
                    </div>
                    
                </div>

                <div className="text-right space-y-2">
                    <p className="text-2xl font-black tracking-tighter opacity-20">THANK YOU</p>
                    <div className="text-[10px] font-bold space-y-0.5 opacity-50 uppercase tracking-widest">
                        <p>{invoice.companyAddress || 'Global Headquarters'}</p>
                        <p className="opacity-100" style={{ color: brandColor }}>{invoice.companyWebsite || 'www.example.com'}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

