import { InvoiceData } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { PaymentQRCode } from '../PaymentQRCode';

interface IndustrialTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const IndustrialTemplate = ({
  invoice,
  formatCurrency,
  formatDate
}: IndustrialTemplateProps) => {
  const brandColor = invoice.brandColor || '#2563eb';
  const textColor = invoice.textColor || '#111827';
  
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible flex flex-col print:m-0" style={{ fontFamily: '"Inter", sans-serif', color: textColor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      
      {/* 1. Heavy Industrial Header */}
      <div className="flex h-48">
        {/* Left: Brand Block */}
        <div className="w-[45%] flex flex-col justify-between p-10 text-white" style={{ backgroundColor: brandColor }}>
          <div className="flex items-center gap-3">
             {invoice.companyLogo ? (
                <img src={invoice.companyLogo} alt="Logo" className="h-12 w-auto brightness-0 invert" />
             ) : (
                <div className="h-10 w-10 border-4 border-white flex items-center justify-center">
                   <span className="font-black text-xl">{(invoice.companyName || 'I')[0]}</span>
                </div>
             )}
             <p className="font-black text-xl uppercase tracking-tighter">{invoice.companyName}</p>
          </div>
          
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
            {invoice.companyTagline && <p className="mb-2 italic">{invoice.companyTagline}</p>}
            <p>Official Invoice Document</p>
          </div>
        </div>

        {/* Right: Meta Info Block */}
        <div className="flex-1 bg-gray-900 text-white p-12 flex flex-col justify-between border-l border-white/10">
          <h1 className="text-6xl font-black tracking-tighter text-right italic uppercase leading-none opacity-20 select-none">Invoice</h1>
          
          <div className="flex justify-end gap-12 text-right">
            <div>
              <p className="text-[9px] uppercase font-black opacity-40 mb-1">Index Number</p>
              <p className="font-bold text-sm">#{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-black opacity-40 mb-1">Issue Date</p>
              <p className="font-bold text-sm">{formatDate(invoice.createdAt)}</p>
            </div>
            {invoice.dueDate && (
              <div>
                <p className="text-[9px] uppercase font-black opacity-40 mb-1">Maturity</p>
                <p className="font-bold text-sm">{formatDate(invoice.dueDate)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Addresses Section */}
      <div className="px-10 py-16 flex justify-between items-start">
        <div className="w-[45%]">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-6 w-1.5" style={{ backgroundColor: brandColor }}></div>
             <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">Bill To:</h3>
          </div>
          <p className="font-black text-3xl mb-3 tracking-tighter leading-none">{invoice.clientName}</p>
          <div className="text-[13px] space-y-1.5 opacity-60 font-medium leading-relaxed">
            {invoice.clientAddress && <p className="max-w-[280px]">{invoice.clientAddress}</p>}
            <p>{invoice.clientPhone}</p>
            <p className="font-bold underline underline-offset-4 decoration-2" style={{ color: brandColor }}>{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 border-2 border-gray-100 min-w-[240px] text-center shadow-sm">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Net Payable</span>
             <p className="text-4xl font-black mt-2 tracking-tighter" style={{ color: brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</p>
        </div>
      </div>

      <div className="px-10 pb-12 flex justify-end">
        <div className="w-[40%] text-right">
          <div className="flex items-center justify-end gap-2 mb-4">
             <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 opacity-30">Origin</h3>
             <div className="h-4 w-1" style={{ backgroundColor: brandColor }}></div>
          </div>
          <p className="font-black text-xl mb-2 italic uppercase">{invoice.companyName}</p>
          <div className="text-[10px] space-y-1 opacity-60 font-medium uppercase tracking-widest">
            <p>{invoice.companyAddress}</p>
            <p>{invoice.companyPhone}</p>
            <p>{invoice.companyEmail}</p>
            {invoice.companyWebsite && <p className="font-bold border-b border-gray-200 inline-block">{invoice.companyWebsite}</p>}
          </div>
        </div>
      </div>

      {/* 3. Items Table */}
      <div className="px-10 flex-1">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-y-2 border-gray-900">
              <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest">Description</th>
              {invoice.columnSettings?.hsn && <th className="py-3 px-4 text-center text-[10px] font-black uppercase tracking-widest w-24">HSN</th>}
              {invoice.columnSettings?.unitPrice && <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-widest w-24">Unit Price</th>}
              {invoice.columnSettings?.quantity && <th className="py-3 px-4 text-center text-[10px] font-black uppercase tracking-widest w-16">Qty</th>}
              {invoice.columnSettings?.total && <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-widest w-28">Total</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoice.items.map((item, idx) => (
              <tr key={item.id} className="group border-b border-gray-100" style={{ breakInside: 'avoid' }}>
                <td className="py-6 px-4">
                  <p className="font-black text-base uppercase mb-1 leading-tight">{item.description}</p>
                  <p className="text-[9px] opacity-30 font-black uppercase tracking-widest">Item Index: {idx + 1}</p>
                </td>
                {invoice.columnSettings?.hsn && <td className="py-6 px-4 text-center text-xs font-bold opacity-40 italic">{item.hsn || '-'}</td>}
                {invoice.columnSettings?.unitPrice && <td className="py-6 px-4 text-right text-sm font-bold opacity-60">{formatCurrency(item.unitPrice)}</td>}
                {invoice.columnSettings?.quantity && <td className="py-6 px-4 text-center text-sm font-black italic">×{item.quantity}</td>}
                {invoice.columnSettings?.total && <td className="py-6 px-4 text-right font-black text-lg tracking-tight">{formatCurrency(item.total)}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Grid */}
        <div className="flex justify-end mt-8">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-xs font-bold text-green-600 uppercase tracking-widest">
                <span>Discount</span>
                <span>-{formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest border-b border-gray-100 pb-2">
              <span>{invoice.taxLabel} ({invoice.taxRate}%)</span>
              <span>{formatCurrency(invoice.taxAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b-2 border-gray-900">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Net Total</span>
              <span className="text-lg font-black">{formatCurrency(invoice.total)}</span>
            </div>

            {invoice.roundingAmount !== 0 && (
              <div className="flex justify-between text-[10px] font-bold opacity-40 italic">
                <span>Precision Adj.</span>
                <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs font-bold text-green-700 py-1">
              <span>Received</span>
              <span>-{formatCurrency(invoice.amountPaid || 0)}</span>
            </div>

            {invoice.showQrCode && invoice.paymentInfo.upiId && (
              <div className="flex justify-end mb-4">
                <PaymentQRCode invoice={invoice} size={90} className="items-end" />
              </div>
            )}

            <div className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-xl mt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Balance Due</span>
              <span className="text-2xl font-black">{formatCurrency(invoice.balanceDue || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Industrial Footer */}
      <div className="px-10 py-10 flex justify-between items-end border-t border-gray-100 mt-12">
        <div className="w-[60%] space-y-6">
          {invoice.showPaymentInfo && (
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Wire Transfer Details</h4>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-bold opacity-60 uppercase">
                {invoice.paymentInfo.bankName && <p>Bank: {invoice.paymentInfo.bankName}</p>}
                {invoice.paymentInfo.accountNumber && <p>ACC NO: {invoice.paymentInfo.accountNumber}</p>}
                {invoice.paymentInfo.accountName && <p>BENEFICIARY: {invoice.paymentInfo.accountName}</p>}
                {invoice.paymentInfo.bankDetails && <p>Branch: {invoice.paymentInfo.bankDetails}</p>}
              </div>
            </div>
          )}

          <div className="text-[10px] font-medium opacity-40 leading-relaxed max-w-sm">
            {invoice.notes && <p className="mb-2 italic">NOTES: {invoice.notes}</p>}
            {invoice.terms && <p>TERMS: {invoice.terms}</p>}
          </div>
        </div>

        {invoice.showSignature && (
          <div className="text-center group border-2 border-gray-900 p-4 min-w-[200px]">
            {invoice.signatureImage ? (
              <img src={invoice.signatureImage} alt="Signature" className="h-16 object-contain mx-auto mb-2" />
            ) : (
              <div className="h-16 w-32 mb-2"></div>
            )}
            <p className="text-[8px] font-black uppercase tracking-widest border-t border-gray-200 pt-2 opacity-40">Authorized Approval</p>
          </div>
        )}
      </div>

      {/* Security Stripe */}
      <div className="h-2 w-full flex">
         {[...Array(20)].map((_, i) => (
           <div key={i} className="flex-1" style={{ backgroundColor: i % 2 === 0 ? brandColor : '#111827' }}></div>
         ))}
      </div>
    </div>
  );
};
