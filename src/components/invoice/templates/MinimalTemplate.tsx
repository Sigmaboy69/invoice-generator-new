import { InvoiceData } from '@/types/invoice';
import { PaymentQRCode } from '../PaymentQRCode';

interface MinimalTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const MinimalTemplate = ({ invoice, formatCurrency, formatDate }: MinimalTemplateProps) => {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible p-12 flex flex-col print:m-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', color: invoice.textColor || '#1f2937' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-4">
          {invoice.companyLogo ? (
            <img src={invoice.companyLogo} alt="Logo" className="h-16 w-16 object-contain border border-gray-100" crossOrigin="anonymous" />
          ) : (
            <div className="h-16 w-16 flex items-center justify-center" style={{ backgroundColor: invoice.brandColor }}>
              <span className="text-white font-bold text-2xl">{(invoice.companyName || 'C')[0]}</span>
            </div>
          )}
          <div>
            <p className="font-black text-3xl tracking-tighter mb-2 leading-none uppercase">{invoice.companyName}</p>
            <div className="opacity-40 text-[11px] font-bold uppercase tracking-widest leading-loose">
              <p>{invoice.companyEmail}</p>
              {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
              {invoice.companyAddress && <p className="max-w-[240px]">{invoice.companyAddress}</p>}
              {invoice.companyWebsite && <p className="font-black" style={{ color: invoice.brandColor }}>{invoice.companyWebsite}</p>}
            </div>
            {invoice.companyTagline && <p className="opacity-30 text-[10px] mt-4 italic font-medium uppercase tracking-[0.2em]">{invoice.companyTagline}</p>}
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-6xl font-black opacity-[0.03] mb-6 leading-none select-none">INVOICE</h1>
          <div className="space-y-2 mt-4">
            <p className="text-sm">
              <span className="opacity-30 font-bold uppercase tracking-widest text-[10px] mr-3">Ref No</span> 
              <span className="font-black text-lg tracking-tight">{invoice.invoiceNumber}</span>
            </p>
            <p className="text-sm">
              <span className="opacity-30 font-bold uppercase tracking-widest text-[10px] mr-3">Issue Date</span> 
              <span className="font-bold">{formatDate(invoice.createdAt)}</span>
            </p>
            <p className="text-sm">
              <span className="opacity-30 font-bold uppercase tracking-widest text-[10px] mr-3">Due Date</span> 
              <span className="font-bold border-b-2" style={{ borderColor: invoice.brandColor }}>{formatDate(invoice.dueDate)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-16 flex justify-between items-start">
        <div className="max-w-[320px]">
          <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-4">Client Detail</p>
          <p className="font-black text-2xl leading-none mb-3 uppercase tracking-tighter">{invoice.clientName}</p>
          <div className="opacity-50 text-[13px] font-medium leading-relaxed space-y-1">
            {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
            <p>{invoice.clientPhone}</p>
            <p className="font-bold underline underline-offset-4" style={{ color: invoice.brandColor }}>{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100/50 text-right min-w-[240px]">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Account Balance</span>
             <p className="text-4xl font-black mt-2 tracking-tighter" style={{ color: invoice.brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</p>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-10">
        <thead>
          <tr className="border-b-2" style={{ borderColor: invoice.brandColor }}>
            <th className="py-3 text-left text-sm font-semibold opacity-60">Description</th>
            {invoice.columnSettings?.hsn && <th className="py-3 text-center w-20 text-sm font-semibold opacity-60">HSN</th>}
            {invoice.columnSettings?.quantity && <th className="py-3 text-center w-20 text-sm font-semibold opacity-60">Qty</th>}
            {invoice.columnSettings?.unitPrice && <th className="py-3 text-right w-28 text-sm font-semibold opacity-60">Price</th>}
            {invoice.columnSettings?.total && <th className="py-3 text-right w-28 text-sm font-semibold opacity-60">Total</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {invoice.items.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-100/50 hover:bg-gray-50/30 transition-colors" style={{ breakInside: 'avoid' }}>
              <td className="py-6">
                <p className="text-base font-bold text-gray-800 leading-tight mb-1">{item.description || 'Item description'}</p>
                {item.hsn && <p className="text-[10px] opacity-30 font-bold uppercase tracking-tight">HSN Code: {item.hsn}</p>}
              </td>
              {invoice.columnSettings?.hsn && !item.hsn && <td className="py-6 text-center opacity-10">—</td>}
              {invoice.columnSettings?.quantity && <td className="py-6 text-center font-black text-sm opacity-80 italic">x{item.quantity}</td>}
              {invoice.columnSettings?.unitPrice && <td className="py-6 text-right font-medium text-sm text-gray-400">{formatCurrency(item.unitPrice)}</td>}
              {invoice.columnSettings?.total && <td className="py-6 text-right font-black text-lg tracking-tight">{formatCurrency(item.total)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="opacity-50">Subtotal</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          {invoice.discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="opacity-50">Discount</span>
              <span className="text-green-600">-{formatCurrency(invoice.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pb-2 border-b border-gray-50">
            <span className="opacity-50">{invoice.taxLabel} ({invoice.taxRate}%)</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-bold opacity-80 uppercase tracking-tight">Total</span>
            <span className="text-base font-bold">{formatCurrency(invoice.total)}</span>
          </div>

          {invoice.roundingAmount !== 0 && (
            <div className="flex justify-between text-[11px] italic opacity-40">
              <span>Rounding</span>
              <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
            </div>
          )}

          <div className="flex justify-between text-xs py-1 border-b border-gray-100">
            <span className="opacity-40">Amount Paid</span>
            <span className="font-medium text-green-700">-{formatCurrency(invoice.amountPaid || 0)}</span>
          </div>

          <div className="flex justify-between pt-3 border-t-4 text-xl" style={{ borderColor: invoice.brandColor }}>
            <span className="font-black uppercase tracking-tighter">Balance Due</span>
            <span className="font-black" style={{ color: invoice.brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {invoice.showPaymentInfo && (
        <div className="mb-6 p-4" style={{ backgroundColor: `${invoice.brandColor}10` }}>
          <p className="text-xs opacity-50 uppercase tracking-wider mb-2">Payment Details</p>
          <div className="text-sm opacity-70 space-y-1">
            {invoice.paymentInfo.bankName && <p>Bank: {invoice.paymentInfo.bankName}</p>}
            {invoice.paymentInfo.accountNumber && <p>Account: {invoice.paymentInfo.accountNumber}</p>}
            {invoice.paymentInfo.accountName && <p>Name: {invoice.paymentInfo.accountName}</p>}
            {invoice.paymentInfo.bankDetails && <p>Details: {invoice.paymentInfo.bankDetails}</p>}
          </div>
        </div>
      )}

      {/* Notes */}
      {(invoice.notes || invoice.terms) && (
        <div className="border-t border-gray-100 pt-6 space-y-4">
          {invoice.notes && (
            <div>
              <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm opacity-70">{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Terms & Conditions</p>
              <p className="text-sm opacity-70">{invoice.terms}</p>
            </div>
          )}
        </div>
      )}

      {/* Signature */}
      {invoice.showSignature && (
        <div className="mt-8 flex justify-end">
          <div className="text-center">
            {invoice.signatureImage ? (
              <img src={invoice.signatureImage} alt="Signature" className="h-12 object-contain mx-auto mb-1" crossOrigin="anonymous" />
            ) : (
              <div className="w-40 border-b border-gray-300 mb-1"></div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-10 text-center flex flex-col items-center">
        {invoice.showQrCode && invoice.paymentInfo.upiId && (
          <div className="mb-8">
            <PaymentQRCode invoice={invoice} size={85} />
          </div>
        )}
        <p className="opacity-50 text-sm">Thank you for your business!</p>
        <div className="mt-4 flex justify-center gap-6 text-xs opacity-40">
          {invoice.companyPhone && <span>{invoice.companyPhone}</span>}
          {invoice.companyWebsite && <span>{invoice.companyWebsite}</span>}
          {invoice.companyAddress && <span>{invoice.companyAddress}</span>}
        </div>
      </div>
    </div>
  );
};
