import { InvoiceData } from '@/types/invoice';
import { PaymentQRCode } from '../PaymentQRCode';

interface ModernTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const ModernTemplate = ({ invoice, formatCurrency, formatDate }: ModernTemplateProps) => {
  // Calculate lighter version of brand color for backgrounds
  const brandColorLight = `${invoice.brandColor}20`;

  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-visible flex flex-col print:m-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', color: invoice.textColor || '#111827' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex justify-between items-start">
          {/* Logo/Company */}
          <div className="flex items-center gap-4">
            {invoice.companyLogo ? (
              <img src={invoice.companyLogo} alt="Logo" className="h-16 w-16 object-contain border border-gray-100" crossOrigin="anonymous" />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center" style={{ backgroundColor: invoice.brandColor }}>
                <span className="text-white font-bold text-2xl">{(invoice.companyName)[0]}</span>
              </div>
            )}
            <div style={{ color: invoice.textColor || '#111827' }}>
              <p className="font-bold text-xl">{invoice.companyName}</p>
              {invoice.companyTagline && <p className="opacity-60 text-sm">{invoice.companyTagline}</p>}
              <div className="text-xs opacity-60 mt-1 space-y-0.5">
                {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
                {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
                {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
                {invoice.companyWebsite && <p>{invoice.companyWebsite}</p>}
              </div>
            </div>
          </div>

          {/* Invoice Title */}
          <div className="text-right">
            <h1 className="text-5xl font-black tracking-tighter opacity-90 leading-none">INVOICE</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-2">Professional Document</p>
          </div>
        </div>

        {/* Invoice meta bar */}
        <div className="flex mt-8 overflow-hidden rounded-xl shadow-sm border border-gray-100">
          <div className="flex-1 py-4 px-6 text-white text-sm" style={{ backgroundColor: invoice.brandColor }}>
            <span className="font-bold uppercase tracking-widest text-[10px] opacity-70">Invoice No:</span>
            <span className="ml-3 font-black text-lg">{invoice.invoiceNumber}</span>
          </div>
          <div className="py-4 px-8 text-sm flex gap-10" style={{ backgroundColor: brandColorLight }}>
            <div>
              <span className="opacity-50 font-bold uppercase tracking-widest text-[10px]">Date</span>
              <p className="font-black text-gray-900 mt-0.5">{formatDate(invoice.createdAt)}</p>
            </div>
            {invoice.dueDate && (
              <div>
                <span className="opacity-50 font-bold uppercase tracking-widest text-[10px]">Due Date</span>
                <p className="font-black text-gray-900 mt-0.5">{formatDate(invoice.dueDate)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="px-8 py-8 flex justify-between items-start">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-3 ml-0.5">Billing Information:</h3>
          <p className="font-black text-2xl leading-none mb-3">{invoice.clientName}</p>
          <div className="text-sm opacity-60 space-y-1 mt-1 font-medium max-w-sm">
            {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
            {invoice.clientPhone && <p>{invoice.clientPhone}</p>}
            {invoice.clientEmail && <p className="font-bold underline decoration-2 underline-offset-4" style={{ color: invoice.brandColor }}>{invoice.clientEmail}</p>}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[200px] text-right">
             <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Amount Due</span>
             <p className="text-3xl font-black mt-1" style={{ color: invoice.brandColor }}>{formatCurrency(invoice.balanceDue || 0)}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="px-8 py-4">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: brandColorLight }}>
              <th className="py-3 px-4 text-left w-12 text-sm font-semibold">SL.</th>
              <th className="py-3 px-4 text-left text-sm font-semibold" style={{ color: invoice.brandColor }}>Item Description</th>
              {invoice.columnSettings?.hsn && <th className="py-3 px-4 text-center w-24 text-sm font-semibold">HSN/SAC</th>}
              {invoice.columnSettings?.unitPrice && <th className="py-3 px-4 text-center w-20 text-sm font-semibold">Price</th>}
              {invoice.columnSettings?.quantity && <th className="py-3 px-4 text-center w-16 text-sm font-semibold">Qty.</th>}
              {invoice.columnSettings?.total && <th className="py-3 px-4 text-right w-24 text-sm font-semibold">Total</th>}
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100/50" style={{ breakInside: 'avoid' }}>
                <td className="py-6 px-6 opacity-40 text-xs font-bold">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-6 px-6">
                  <p className="font-bold text-base mb-1">{item.description || 'Item description'}</p>
                  {item.hsn && <p className="text-[10px] opacity-40 font-medium">HSN/SAC: {item.hsn}</p>}
                </td>
                {invoice.columnSettings?.hsn && <td className="py-6 px-6 text-center text-xs font-medium opacity-60 italic">{item.hsn || '-'}</td>}
                {invoice.columnSettings?.unitPrice && <td className="py-6 px-6 text-center text-sm font-medium">{formatCurrency(item.unitPrice)}</td>}
                {invoice.columnSettings?.quantity && <td className="py-6 px-6 text-center text-sm font-black">{item.quantity}</td>}
                {invoice.columnSettings?.total && <td className="py-6 px-6 text-right font-black text-lg">{formatCurrency(item.total)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals and Payment */}
      <div className="px-8 py-6 flex justify-between">
        <div className="flex-1 pr-12">
          {invoice.showPaymentInfo && (
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2">Payment Info:</h3>
              <div className="text-xs opacity-60 space-y-1">
                {invoice.paymentInfo.bankName && <p>Bank: {invoice.paymentInfo.bankName}</p>}
                {invoice.paymentInfo.accountNumber && <p>Account #: {invoice.paymentInfo.accountNumber}</p>}
                {invoice.paymentInfo.accountName && <p>A/C Name: {invoice.paymentInfo.accountName}</p>}
                {invoice.paymentInfo.bankDetails && <p>Branch: {invoice.paymentInfo.bankDetails}</p>}
              </div>

              {invoice.showQrCode && invoice.paymentInfo.upiId && (
                <div className="mt-4">
                  <PaymentQRCode invoice={invoice} size={80} className="items-start" />
                </div>
              )}
            </div>
          )}

          {/* Notes & Terms */}
          <div className="space-y-4">
            {invoice.notes && (
              <div>
                <h3 className="font-bold text-sm mb-1">Notes</h3>
                <p className="text-xs opacity-60 leading-relaxed">{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <h3 className="font-bold text-sm mb-1">Terms & Conditions</h3>
                <p className="text-xs opacity-60 leading-relaxed">{invoice.terms}</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-64">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-60">Sub Total:</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="opacity-60">Discount:</span>
                <span className="font-medium text-green-600">-{formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between pb-2 border-b border-gray-50">
              <span className="opacity-60">{invoice.taxLabel} ({invoice.taxRate}%):</span>
              <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
            </div>
            
            <div className="flex justify-between py-2 text-primary font-bold">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>

            {invoice.roundingAmount !== 0 && (
              <div className="flex justify-between text-[11px] italic opacity-60">
                <span>Rounding:</span>
                <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
              </div>
            )}

            <div className="flex justify-between py-1 text-xs">
              <span className="opacity-60">Amount Paid:</span>
              <span className="font-medium text-green-600">-{formatCurrency(invoice.amountPaid || 0)}</span>
            </div>

            <div className="flex justify-between py-3 text-white font-black text-lg mt-2 shadow-sm rounded-sm" style={{ backgroundColor: invoice.brandColor }}>
              <span className="pl-3 uppercase tracking-tighter">Balance Due:</span>
              <span className="pr-3">{formatCurrency(invoice.balanceDue || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      {invoice.showSignature && (
        <div className="px-8 py-4 flex justify-end">
          <div className="text-center">
            {invoice.signatureImage ? (
              <img src={invoice.signatureImage} alt="Signature" className="h-12 object-contain mx-auto mb-1" crossOrigin="anonymous" />
            ) : (
              <div className="w-40 border-b border-gray-400 mb-1"></div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto py-4 text-center text-white" style={{ backgroundColor: invoice.brandColor }}>
        <p className="font-semibold">Thank you for your business</p>
      </div>
    </div>
  );
};
