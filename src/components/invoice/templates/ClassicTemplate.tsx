import { InvoiceData } from '@/types/invoice';
import { PaymentQRCode } from '../PaymentQRCode';

interface ClassicTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const ClassicTemplate = ({ invoice, formatCurrency, formatDate }: ClassicTemplateProps) => {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible flex flex-col font-serif print:m-0" style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', color: invoice.textColor || '#1f2937' }}>

      {/* 1. Elegant Header Section */}
      <div className="relative px-12 pt-12 pb-8 flex justify-between items-start border-b-4" style={{ borderColor: invoice.brandColor }}>

        {/* Company Info (Left) */}
        <div className="flex flex-col gap-4 max-w-[50%]">
          {invoice.companyLogo ? (
            <img src={invoice.companyLogo} alt="Logo" className="h-20 w-auto object-contain self-start" crossOrigin="anonymous" />
          ) : (
            <div className="h-16 w-16 bg-gray-900 text-white flex items-center justify-center rounded-sm">
              <span className="font-bold text-3xl font-sans">{(invoice.companyName || 'C')[0]}</span>
            </div>
          )}

          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase mb-1" style={{ color: invoice.brandColor }}>{invoice.companyName}</h2>
            {invoice.companyTagline && <p className="text-xs italic opacity-60 font-sans tracking-wide">{invoice.companyTagline}</p>}
            <div className="text-[11px] opacity-60 mt-6 space-y-1.5 font-sans leading-relaxed uppercase tracking-widest">
              {invoice.companyAddress && <p className="max-w-[280px]">{invoice.companyAddress}</p>}
              <div className="flex gap-4 mt-2">
                {invoice.companyPhone && <p className="font-bold border-b border-gray-100">{invoice.companyPhone}</p>}
                {invoice.companyEmail && <p className="font-bold border-b border-gray-100">{invoice.companyEmail}</p>}
              </div>
              {invoice.companyWebsite && <p className="font-black" style={{ color: invoice.brandColor }}>{invoice.companyWebsite}</p>}
            </div>
          </div>
        </div>

        {/* Invoice Title & Meta (Right) */}
        <div className="text-right">
          <h1 className="text-6xl font-black uppercase tracking-[0.1em] relative z-10 mt-6 opacity-10" style={{ color: invoice.brandColor }}>INVOICE</h1>
          <div className="absolute top-16 right-12 h-1 w-20" style={{ backgroundColor: invoice.brandColor }}></div>

          <div className="mt-12 flex flex-col items-end gap-3 font-sans">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Reference No</span>
              <span className="text-xl font-black tracking-tight">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Created Date</span>
              <span className="text-sm font-bold">{formatDate(invoice.createdAt)}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Due Terms</span>
              <span className="text-sm font-bold border-b-2" style={{ borderColor: invoice.brandColor }}>{formatDate(invoice.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Client Info Section */}
      <div className="px-12 py-12">
        <div className="flex justify-between items-start">
          <div className="w-[45%] p-8 bg-gray-50/50 rounded-lg border-l-4 shadow-sm" style={{ borderColor: invoice.brandColor }}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.22em] opacity-30 mb-4 font-sans">Recipient Information</h3>
            <p className="text-2xl font-black mb-3 font-serif leading-none">{invoice.clientName}</p>
            <div className="text-[13px] opacity-70 space-y-1 font-sans leading-relaxed">
              {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
              <p>{invoice.clientPhone}</p>
              <p className="font-bold underline underline-offset-4" style={{ color: invoice.brandColor }}>{invoice.clientEmail}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 min-w-[220px] text-center shadow-inner">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-30 font-sans">Balance Payable</span>
               <p className="text-3xl font-black mt-2 font-serif" style={{ color: invoice.brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</p>
          </div>
        </div>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="mt-8 flex justify-between gap-12">
            <div className="flex-1">
              {invoice.notes && (
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider opacity-30 mb-2 font-sans">Special Instructions</h3>
                  <p className="text-sm opacity-70 italic leading-relaxed">{invoice.notes}</p>
                </div>
              )}
            </div>
            <div className="flex-1 text-right">
              {invoice.terms && (
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider opacity-30 mb-2 font-sans">Standard Terms</h3>
                  <p className="text-sm opacity-70 italic leading-relaxed">{invoice.terms}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Elegant Table */}
      <div className="px-12 py-4 flex-1">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200 font-sans">
              <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider opacity-60 w-16">No.</th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider opacity-60">Item Description</th>
              {invoice.columnSettings?.hsn && <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider opacity-60 w-24">HSN/SAC</th>}
              {invoice.columnSettings?.unitPrice && <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider opacity-60 w-28">Price</th>}
              {invoice.columnSettings?.quantity && <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider opacity-60 w-20">Qty</th>}
              {invoice.columnSettings?.total && <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider opacity-60 w-32">Total</th>}
            </tr>
          </thead>
          <tbody className="font-sans">
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors" style={{ breakInside: 'avoid' }}>
                <td className="py-6 px-4 text-xs font-black opacity-20">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-6 px-4">
                    <p className="text-base font-bold text-gray-800 leading-tight mb-1">{item.description}</p>
                    {item.hsn && <p className="text-[10px] opacity-40 font-medium uppercase tracking-tighter">HSN: {item.hsn}</p>}
                </td>
                {invoice.columnSettings?.hsn && !item.hsn && <td className="py-6 px-4 text-center opacity-20">—</td>}
                {invoice.columnSettings?.unitPrice && <td className="py-6 px-4 text-sm text-right font-medium opacity-60 italic">{formatCurrency(item.unitPrice)}</td>}
                {invoice.columnSettings?.quantity && <td className="py-6 px-4 text-sm text-center font-black opacity-70">{item.quantity}</td>}
                {invoice.columnSettings?.total && <td className="py-6 px-4 text-lg text-right font-black">{formatCurrency(item.total)}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 4. Financial Summary */}
        <div className="flex justify-end mt-10">
          <div className="w-80 bg-gray-50 p-6 rounded-sm border border-gray-100 shadow-sm">
            <div className="space-y-3 font-sans">
              <div className="flex justify-between text-sm opacity-70">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm opacity-70 border-b border-gray-100 pb-2">
                <span>{invoice.taxLabel} ({invoice.taxRate}%)</span>
                <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
              </div>
              {invoice.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-{formatCurrency(invoice.discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-bold uppercase tracking-wide opacity-80">Total</span>
                <span className="text-lg font-bold">{formatCurrency(invoice.total)}</span>
              </div>

              {invoice.roundingAmount !== 0 && (
                <div className="flex justify-between text-[11px] opacity-50 italic">
                  <span>Rounding Adjustment</span>
                  <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm pt-1 pb-3 border-b border-gray-200">
                <span className="opacity-60">Amount Paid</span>
                <span className="font-medium text-green-700">-{formatCurrency(invoice.amountPaid || 0)}</span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <span className="text-base font-black uppercase tracking-widest" style={{ color: invoice.brandColor }}>Balance Due</span>
                <span className="text-2xl font-black">{formatCurrency(invoice.balanceDue || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Footer / Payment Info */}
      <div className="px-12 pb-12 mt-auto">
        <div className="flex justify-between items-end border-t-2 border-gray-100 pt-8">

          <div className="max-w-[60%] space-y-4">
            {invoice.showPaymentInfo && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-2 font-sans opacity-40">Payment Details</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm font-sans opacity-70">
                  {invoice.paymentInfo.bankName && <div className="flex gap-2"><span className="font-medium">Bank:</span> <span>{invoice.paymentInfo.bankName}</span></div>}
                  {invoice.paymentInfo.accountNumber && <div className="flex gap-2"><span className="font-medium">Account:</span> <span>{invoice.paymentInfo.accountNumber}</span></div>}
                  {invoice.paymentInfo.accountName && <div className="flex gap-2 col-span-2"><span className="font-medium">Holder:</span> <span>{invoice.paymentInfo.accountName}</span></div>}
                  {invoice.paymentInfo.bankDetails && <div className="flex gap-2 col-span-2"><span className="font-medium">Details:</span> <span>{invoice.paymentInfo.bankDetails}</span></div>}
                </div>
              </div>
            )}

            {invoice.showQrCode && invoice.paymentInfo.upiId && (
              <PaymentQRCode invoice={invoice} size={90} className="items-start opacity-90" />
            )}

            <p className="text-4xl font-cursive text-gray-400/20 pt-4 select-none" style={{ fontFamily: 'cursive' }}>Thank You</p>
          </div>

          {/* Signature */}
          {invoice.showSignature && (
            <div className="text-center pr-8">
              {invoice.signatureImage ? (
                <img src={invoice.signatureImage} alt="Signature" className="h-16 w-auto object-contain mx-auto mb-2" crossOrigin="anonymous" />
              ) : (
                <div className="h-12 w-48 mb-2"></div>
              )}
              <div className="border-t border-gray-300 w-48 pt-2">
                <p className="text-xs uppercase tracking-widest font-bold opacity-40 font-sans">Authorized Signature</p>
              </div>
            </div>
          )}
        </div>

        {/* Simple Bottom Bar */}
        <div className="mt-8 h-2 w-full" style={{ backgroundColor: invoice.brandColor }}></div>
      </div>

    </div>
  );
};
