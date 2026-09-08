import { InvoiceData } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { PaymentQRCode } from '../PaymentQRCode';

interface BasicTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BasicTemplate = ({
  invoice,
  formatCurrency,
  formatDate
}: BasicTemplateProps) => {
  const brandColor = invoice.brandColor || '#374151';
  const textColor = invoice.textColor || '#111827';
  
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible flex flex-col p-12 print:m-0" style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif', color: textColor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      
      {/* 1. Header Area - Functional & Low Ink */}
      <div className="flex justify-between items-start border-b-2 border-gray-900 pb-8 mb-10">
        <div className="flex-1">
           <h1 className="text-4xl font-bold uppercase tracking-[0.1em] mb-4">Invoice</h1>
           <div className="space-y-2 text-sm font-sans mt-8">
              <div className="flex gap-6 items-center">
                 <span className="font-black w-24 opacity-30 uppercase tracking-[0.2em] text-[10px]">Reference ID</span>
                 <span className="font-black text-lg tracking-tight">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex gap-6 items-center">
                 <span className="font-black w-24 opacity-30 uppercase tracking-[0.2em] text-[10px]">Initiated On</span>
                 <span className="font-bold">{formatDate(invoice.createdAt)}</span>
              </div>
              {invoice.dueDate && (
                <div className="flex gap-6 items-center">
                   <span className="font-black w-24 opacity-30 uppercase tracking-[0.2em] text-[10px]">Due Deadline</span>
                   <span className="font-bold border-b-2" style={{ borderColor: brandColor }}>{formatDate(invoice.dueDate)}</span>
                </div>
              )}
           </div>
        </div>

        <div className="text-right">
           {invoice.companyLogo ? (
             <img src={invoice.companyLogo} alt="Logo" className="h-16 w-auto object-contain mb-3 ml-auto" crossOrigin="anonymous" />
           ) : (
             <div className="h-12 w-12 border-2 border-gray-900 flex items-center justify-center mb-3 ml-auto">
               <span className="font-bold text-2xl">{(invoice.companyName || 'B')[0]}</span>
             </div>
           )}
           <p className="font-bold text-xl uppercase tracking-tighter">{invoice.companyName}</p>
           <p className="text-xs italic opacity-60 font-sans">{invoice.companyTagline}</p>
        </div>
      </div>

      {/* 2. Billing Info */}
      <div className="flex justify-between mb-16 px-2 items-start">
        <div className="w-[45%]">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6 font-sans">Billing To:</h3>
           <p className="font-black text-3xl mb-4 leading-none uppercase tracking-tighter">{invoice.clientName || 'Valued Client'}</p>
           <div className="text-sm space-y-1.5 opacity-60 font-medium leading-relaxed font-sans max-w-[320px]">
              {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
              <p>{invoice.clientPhone}</p>
              <p className="font-bold underline underline-offset-4 decoration-2" style={{ color: brandColor }}>{invoice.clientEmail}</p>
           </div>
        </div>

        <div className="w-[40%] text-right">
           <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 border-b border-gray-200 mb-3 pb-1 font-sans">Remit To:</h3>
           <div className="text-xs space-y-1 font-sans opacity-70">
              <p className="font-bold text-gray-900">{invoice.companyName}</p>
              <p>{invoice.companyAddress}</p>
              <p>{invoice.companyPhone}</p>
              <p>{invoice.companyEmail}</p>
              <p>{invoice.companyWebsite}</p>
           </div>
        </div>
      </div>

      {/* 3. Items Table - Traditional Look */}
      <div className="flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y-2 border-gray-900 text-[10px] font-bold uppercase tracking-widest font-sans">
              <th className="py-3 px-4 text-left">Description of Services / Products</th>
              {invoice.columnSettings?.hsn && <th className="py-3 px-4 text-center w-24">HSN/SAC</th>}
              {invoice.columnSettings?.unitPrice && <th className="py-3 px-4 text-right w-24">Unit Price</th>}
              {invoice.columnSettings?.quantity && <th className="py-3 px-4 text-center w-16">Qty</th>}
              {invoice.columnSettings?.total && <th className="py-3 px-4 text-right w-32">Amount</th>}
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={item.id} className="border-b border-gray-100 italic" style={{ breakInside: 'avoid' }}>
                <td className="py-6 px-4">
                  <p className="font-bold text-lg not-italic text-gray-800 leading-tight mb-1.5">{item.description}</p>
                  <p className="text-[9px] opacity-30 font-sans not-italic uppercase tracking-widest font-black">Item Index: {idx + 1}</p>
                </td>
                {invoice.columnSettings?.hsn && <td className="py-6 px-4 text-center text-xs font-sans not-italic border-x border-gray-50 bg-gray-50/20">{item.hsn || '-'}</td>}
                {invoice.columnSettings?.unitPrice && <td className="py-6 px-4 text-right text-sm font-sans not-italic">{formatCurrency(item.unitPrice)}</td>}
                {invoice.columnSettings?.quantity && <td className="py-6 px-4 text-center text-sm font-black not-italic font-sans opacity-70">x{item.quantity}</td>}
                {invoice.columnSettings?.total && <td className="py-6 px-4 text-right font-black text-xl not-italic tracking-tight">{formatCurrency(item.total)}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Traditional Totals Area */}
        <div className="flex justify-end mt-12 divide-y divide-gray-100">
          <div className="w-72 space-y-3 font-sans">
             <div className="flex justify-between text-xs font-bold opacity-50 uppercase tracking-tighter">
               <span>Subtotal Balance</span>
               <span>{formatCurrency(invoice.subtotal)}</span>
             </div>
             {invoice.discountAmount > 0 && (
               <div className="flex justify-between text-xs font-bold text-gray-900 italic">
                 <span>Less Discount</span>
                 <span>-{formatCurrency(invoice.discountAmount)}</span>
               </div>
             )}
             <div className="flex justify-between text-xs font-bold opacity-50 uppercase border-b border-gray-50 pb-2">
               <span>{invoice.taxLabel} Charge ({invoice.taxRate}%)</span>
               <span>{formatCurrency(invoice.taxAmount)}</span>
             </div>
             
             <div className="flex justify-between items-center py-2">
                <span className="text-sm font-black uppercase tracking-widest border-l-4 border-gray-900 pl-3">Total Amount</span>
                <span className="text-xl font-bold">{formatCurrency(invoice.total)}</span>
             </div>

             {invoice.roundingAmount !== 0 && (
                <div className="flex justify-between text-[10px] font-bold opacity-40 italic">
                    <span>Rounding Adj.</span>
                    <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
                </div>
             )}

             <div className="flex justify-between text-xs font-bold opacity-50 py-1">
               <span>Payments/Credits</span>
               <span>-{formatCurrency(invoice.amountPaid || 0)}</span>
             </div>

             <div className="flex justify-between items-center p-5 bg-gray-50 border-2 border-gray-900 mt-4 shadow-sm">
                <span className="text-xs font-black uppercase tracking-widest">Balance Due</span>
                <span className="text-2xl font-black">{formatCurrency(invoice.balanceDue || 0)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* 4. Simple Footer Section */}
      <div className="mt-12 flex justify-between items-end border-t border-gray-200 pt-8">
        <div className="w-[60%] space-y-8">
           {invoice.showPaymentInfo && (
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-40 font-sans">Payment Instructions</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-bold opacity-70 uppercase font-sans">
                  {invoice.paymentInfo.bankName && <p className="border-b border-gray-50">Bank: {invoice.paymentInfo.bankName}</p>}
                  {invoice.paymentInfo.accountNumber && <p className="border-b border-gray-50">Acc: {invoice.paymentInfo.accountNumber}</p>}
                  {invoice.paymentInfo.accountName && <p className="col-span-2 border-b border-gray-50">Pay To: {invoice.paymentInfo.accountName}</p>}
                </div>
             </div>
           )}

           {invoice.showQrCode && invoice.paymentInfo.upiId && (
             <div className="pt-4">
               <PaymentQRCode invoice={invoice} size={80} className="items-start opacity-70 grayscale" />
             </div>
           )}

           <div className="text-[11px] opacity-40 italic leading-relaxed space-y-4 max-w-sm">
              {invoice.notes && <p>Notice: {invoice.notes}</p>}
              {invoice.terms && <p className="font-sans font-bold">Terms: {invoice.terms}</p>}
           </div>
        </div>

        {invoice.showSignature && (
          <div className="text-center group min-w-[200px]">
            {invoice.signatureImage ? (
              <img src={invoice.signatureImage} alt="Signature" className="h-16 object-contain mx-auto mb-2" crossOrigin="anonymous" />
            ) : (
              <div className="h-16 w-40 mb-2 border-b-2 border-gray-200"></div>
            )}
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 font-sans pt-2">Authorized Signatory</p>
          </div>
        )}
      </div>

      {/* End of Document */}
      <div className="mt-auto pt-8 flex justify-center items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] opacity-20 font-sans border-t border-gray-50">
          <span>{invoice.companyName}</span>
          <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
          <span>Professional Invoice</span>
          <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
          <span>Verified Office Document</span>
      </div>
    </div>
  );
};
