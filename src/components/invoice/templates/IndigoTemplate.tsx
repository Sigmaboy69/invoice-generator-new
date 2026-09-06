import { InvoiceData } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { PaymentQRCode } from '../PaymentQRCode';

interface IndigoTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const IndigoTemplate = ({
  invoice,
  formatCurrency,
  formatDate
}: IndigoTemplateProps) => {
  const brandColor = invoice.brandColor || '#6366f1';
  const textColor = invoice.textColor || '#1e1b4b';
  
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible flex print:m-0" style={{ fontFamily: '"Inter", sans-serif', color: textColor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      
      {/* 1. Indigo Side Accent Bar */}
      <div className="w-16 h-full flex flex-col items-center justify-between py-10" style={{ backgroundColor: brandColor }}>
        <p className="rotate-[-90deg] text-white/40 font-black text-4xl uppercase tracking-[0.5em] whitespace-nowrap origin-center">Invoice</p>
        <div className="flex flex-col gap-4 items-center">
           <div className="h-2 w-2 rounded-full bg-white/20"></div>
           <div className="h-2 w-2 rounded-full bg-white/50"></div>
           <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col p-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div className="flex items-center gap-6">
            {invoice.companyLogo ? (
              <img src={invoice.companyLogo} alt="Logo" className="h-16 w-auto object-contain rounded-xl shadow-lg border border-gray-50" />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl shadow-xl border-t border-white/50" style={{ backgroundColor: brandColor }}>
                <span className="text-white font-black text-3xl">{(invoice.companyName || 'I')[0]}</span>
              </div>
            )}
            <div>
              <h2 className="text-3xl font-black tracking-tight" style={{ color: brandColor }}>{invoice.companyName}</h2>
              {invoice.companyTagline && <p className="text-sm font-medium opacity-60 italic">{invoice.companyTagline}</p>}
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-6xl font-black italic tracking-tighter text-indigo-900/5 select-none leading-none mb-6">INVOICE</h1>
            <div className="inline-block px-6 py-2.5 bg-gray-50 rounded-full border border-gray-100 mb-6 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mr-2">Case Ref:</span>
                <span className="text-sm font-black tracking-tight text-gray-900">{invoice.invoiceNumber}</span>
            </div>
            <div className="space-y-2 mt-4">
                <div className="flex justify-end items-center gap-4 text-xs font-bold">
                    <span className="opacity-30 uppercase tracking-widest text-[9px]">Initiated:</span>
                    <span className="text-gray-900 min-w-[100px]">{formatDate(invoice.createdAt)}</span>
                </div>
                <div className="flex justify-end items-center gap-4 text-xs font-bold">
                    <span className="opacity-30 uppercase tracking-widest text-[9px]">Deadline:</span>
                    <span className="text-gray-900 min-w-[100px] border-b-2" style={{ borderColor: brandColor }}>{formatDate(invoice.dueDate)}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bill To & Company Details */}
        <div className="grid grid-cols-2 gap-12 mb-16 px-4">
          <div className="relative p-6 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm">
            <div className="absolute -top-3 left-6 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white rounded-full" style={{ backgroundColor: brandColor }}>Bill To</div>
            <p className="font-black text-xl mb-3">{invoice.clientName || 'Valued Client'}</p>
            <div className="text-xs space-y-1 font-medium opacity-60 leading-relaxed">
                <p className="max-w-[200px]">{invoice.clientAddress}</p>
                <p>{invoice.clientPhone}</p>
                <p className="font-bold border-b border-indigo-100 inline-block">{invoice.clientEmail}</p>
            </div>
          </div>

          <div className="pt-4 pr-4 text-right">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-3">Origin Agency</h3>
            <div className="text-xs space-y-1 font-medium opacity-70 leading-relaxed">
                <p>{invoice.companyAddress}</p>
                <p>{invoice.companyPhone}</p>
                <p>{invoice.companyEmail}</p>
                {invoice.companyWebsite && <p className="font-bold underline decoration-2 underline-offset-4" style={{ textDecorationColor: brandColor }}>{invoice.companyWebsite}</p>}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100 font-sans">
                <th className="py-4 px-2 text-left text-[10px] font-black uppercase tracking-tighter opacity-30 w-12">No.</th>
                <th className="py-4 px-2 text-left text-[10px] font-black uppercase tracking-widest opacity-40">Services Description</th>
                {invoice.columnSettings?.hsn && <th className="py-4 px-2 text-center text-[10px] font-black uppercase tracking-widest opacity-40 w-24">HSN</th>}
                {invoice.columnSettings?.unitPrice && <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest opacity-40 w-28">Rate</th>}
                {invoice.columnSettings?.quantity && <th className="py-4 px-2 text-center text-[10px] font-black uppercase tracking-widest opacity-40 w-20">Qty</th>}
                {invoice.columnSettings?.total && <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest opacity-40 w-32">Amount</th>}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={item.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors" style={{ breakInside: 'avoid' }}>
                  <td className="py-6 px-4 text-xs font-black opacity-20">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="py-6 px-4">
                    <p className="font-bold text-base text-gray-800 leading-none mb-1.5">{item.description}</p>
                    {item.hsn && <p className="text-[10px] opacity-30 font-bold uppercase tracking-tight">HSN Code: {item.hsn}</p>}
                  </td>
                  {invoice.columnSettings?.hsn && !item.hsn && <td className="py-6 px-4 text-center opacity-10">—</td>}
                  {invoice.columnSettings?.unitPrice && <td className="py-6 px-4 text-right text-sm font-medium italic text-gray-400">{formatCurrency(item.unitPrice)}</td>}
                  {invoice.columnSettings?.quantity && <td className="py-6 px-4 text-center text-sm font-black italic">x{item.quantity}</td>}
                  {invoice.columnSettings?.total && <td className="py-6 px-4 text-right font-black text-xl tracking-tight" style={{ color: brandColor }}>{formatCurrency(item.total)}</td>}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Indigo Totals */}
          <div className="flex justify-end mt-12">
            <div className="w-80 space-y-4">
               <div className="space-y-2 p-6 rounded-3xl bg-gray-50/50 border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 h-24 w-24 -mr-12 -mt-12 opacity-5 rounded-full" style={{ backgroundColor: brandColor }}></div>
                 <div className="flex justify-between text-sm font-medium opacity-60">
                   <span>Gross Total</span>
                   <span>{formatCurrency(invoice.subtotal)}</span>
                 </div>
                 {invoice.discountAmount > 0 && (
                   <div className="flex justify-between text-sm font-bold text-emerald-600">
                     <span>Discount Applied</span>
                     <span>-{formatCurrency(invoice.discountAmount)}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-sm font-medium opacity-60 border-b border-gray-200 pb-2">
                   <span>{invoice.taxLabel} ({invoice.taxRate}%)</span>
                   <span>{formatCurrency(invoice.taxAmount)}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-black uppercase tracking-widest opacity-80 decoration-indigo-500 decoration-2 underline-offset-4">Net Amount</span>
                    <span className="text-xl font-black">{formatCurrency(invoice.total)}</span>
                 </div>
                 {invoice.roundingAmount !== 0 && (
                    <div className="flex justify-between text-[10px] font-bold opacity-30 italic">
                        <span>Rounding</span>
                        <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
                    </div>
                 )}
                 <div className="flex justify-between text-xs font-bold text-emerald-700 py-1 border-t border-gray-100 pt-3">
                   <span>Already Paid</span>
                   <span>-{formatCurrency(invoice.amountPaid || 0)}</span>
                 </div>
               </div>

               <div className="flex justify-between items-center p-6 bg-gray-900 text-white rounded-3xl shadow-2xl relative overflow-hidden" style={{ backgroundColor: brandColor }}>
                  <div className="absolute inset-0 bg-white/10 translate-y-3/4 skew-y-6"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 relative z-10">Balance Outstanding</span>
                  <span className="text-3xl font-black relative z-10 tracking-tight">{formatCurrency(invoice.balanceDue || 0)}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-12 flex justify-between items-end border-t-4 border-gray-50 border-double">
          <div className="max-w-[60%]">
             {invoice.showPaymentInfo && (
               <div className="mb-6 space-y-4">
                  <div className="flex items-center gap-2">
                     <div className="h-6 w-1 rounded-full" style={{ backgroundColor: brandColor }}></div>
                     <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">Payment Infrastructure</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-medium opacity-60">
                    {invoice.paymentInfo.bankName && <p>BANK: <span className="font-black text-gray-900 ml-2">{invoice.paymentInfo.bankName}</span></p>}
                    {invoice.paymentInfo.accountNumber && <p>IBAN: <span className="font-black text-gray-900 ml-2">{invoice.paymentInfo.accountNumber}</span></p>}
                    {invoice.paymentInfo.accountName && <p className="col-span-2">NAME: <span className="font-black text-gray-900 ml-2">{invoice.paymentInfo.accountName}</span></p>}
                  </div>
               </div>
             )}

             {invoice.showQrCode && invoice.paymentInfo.upiId && (
               <div className="mb-8">
                 <PaymentQRCode invoice={invoice} size={90} className="items-start opacity-90 shadow-indigo-100" />
               </div>
             )}

             <div className="text-[10px] font-medium opacity-30 leading-relaxed space-y-2">
                {invoice.notes && <p className="font-bold text-gray-900 opacity-60">Notes: {invoice.notes}</p>}
                {invoice.terms && <p>Legal Terms: {invoice.terms}</p>}
             </div>
          </div>

          {invoice.showSignature && (
            <div className="text-center group p-6 rounded-3xl bg-gray-50 border border-gray-100 min-w-[200px]">
              {invoice.signatureImage ? (
                <img src={invoice.signatureImage} alt="Signature" className="h-16 object-contain mx-auto mb-2" />
              ) : (
                <div className="h-16 w-32 mb-2"></div>
              )}
              <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 border-t border-indigo-100 pt-3">Final Authorization</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
