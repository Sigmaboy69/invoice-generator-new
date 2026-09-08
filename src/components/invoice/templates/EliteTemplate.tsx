import { InvoiceData } from '@/types/invoice';
import { PaymentQRCode } from '../PaymentQRCode';
import { cn } from '@/lib/utils';

interface EliteTemplateProps {
  invoice: InvoiceData;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const EliteTemplate = ({ invoice, formatCurrency, formatDate }: EliteTemplateProps) => {
  const brandColor = '#f29d38'; // Elite Orange
  const secondaryColor = '#1d2d44'; // Elite Dark Blue
  
  return (
    <div className="bg-white w-[794px] min-h-[1123px] overflow-hidden relative flex flex-col font-sans print:m-0" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      
      {/* Header Decoration Layer */}
      <div className="absolute top-0 left-0 w-full h-[180px] z-0 pointer-events-none">
        {/* Top Orange Stripe */}
        <div 
          className="absolute top-0 left-0 w-full h-[100px]"
          style={{ 
            backgroundColor: brandColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' 
          }}
        ></div>
        {/* Middle Dark Blue Stripe */}
        <div 
          className="absolute top-[30px] left-0 w-full h-[120px]"
          style={{ 
            backgroundColor: secondaryColor,
            clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)' 
          }}
        ></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-[135px] left-0 w-full h-[4px]" style={{ backgroundColor: secondaryColor }}></div>
        <div className="absolute top-[145px] left-0 w-full h-[1.5px] bg-gray-200"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-12 pt-[180px] flex-1 flex flex-col">
        {/* Top Row: Invoice Title & Logo */}
        <div className="flex justify-between items-start mb-14">
          <div>
            <h1 className="text-[64px] font-[900] tracking-[0.05em] leading-none mb-10" style={{ color: brandColor }}>INVOICE</h1>
            
            <div className="space-y-0.5">
              <h3 className="font-bold text-[18px] text-gray-900 mb-1">Billing to :</h3>
              <p className="text-gray-700 text-sm font-semibold">{invoice.clientName || 'Valued Customer'}</p>
              <p className="text-gray-700 text-sm font-medium whitespace-pre-wrap max-w-[250px]">{invoice.clientAddress}</p>
              {invoice.clientPhone && <p className="text-gray-700 text-sm font-medium">Phone : {invoice.clientPhone}</p>}
              {invoice.clientEmail && <p className="text-gray-700 text-sm font-medium">Email : {invoice.clientEmail}</p>}
            </div>
            
            <div className="mt-8 flex flex-col gap-1">
              <p className="text-gray-900 font-bold text-sm">Invoice no : #{invoice.invoiceNumber}</p>
              <p className="text-gray-900 font-bold text-sm uppercase">Date : {formatDate(invoice.createdAt)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center pt-2">
            <div className="mb-4">
              {invoice.companyLogo ? (
                <img src={invoice.companyLogo} alt="Logo" className="h-20 w-auto object-contain" crossOrigin="anonymous" />
              ) : (
                <div className="relative w-[86px] h-[100px] flex items-center justify-center">
                  <svg width="86" height="100" viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z" fill={secondaryColor}/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl">
                    {(invoice.companyName || 'C')[0]}
                  </span>
                </div>
              )}
            </div>
            <p className="font-bold text-[16px] text-center tracking-tight uppercase leading-none" style={{ color: secondaryColor }}>{invoice.companyName || 'Your Company'}</p>
            {invoice.companyTagline && <p className="text-[10px] italic opacity-50 mt-1">{invoice.companyTagline}</p>}
            
            <div className="mt-20 text-right w-full space-y-1">
              <h3 className="font-bold text-[13px] tracking-wider uppercase mb-1">PAYMENT INFO :</h3>
              {invoice.showPaymentInfo && (
                <>
                  {invoice.paymentInfo.accountName && <p className="text-[12px] font-semibold text-gray-800 uppercase">A/C NAME : {invoice.paymentInfo.accountName}</p>}
                  {invoice.paymentInfo.bankName && <p className="text-[12px] font-semibold text-gray-600 uppercase">Bank : {invoice.paymentInfo.bankName}</p>}
                  {invoice.paymentInfo.accountNumber && <p className="text-[12px] font-semibold text-gray-600 uppercase">Acc : {invoice.paymentInfo.accountNumber}</p>}
                </>
              )}
              {invoice.showQrCode && invoice.paymentInfo.upiId && (
                <div className="mt-4 flex justify-end">
                  <PaymentQRCode invoice={invoice} size={80} className="items-end" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mb-12">
          <div className="flex w-full font-bold text-white uppercase text-center text-[13px] tracking-wider">
            <div className="w-[10%] py-3.5" style={{ backgroundColor: secondaryColor }}>SL</div>
            <div className="flex-1 py-3.5 text-left pl-6" style={{ backgroundColor: secondaryColor }}>ITEM</div>
            {invoice.columnSettings?.hsn && <div className="w-[15%] py-3.5 border-l border-white/10" style={{ backgroundColor: secondaryColor }}>HSN</div>}
            {invoice.columnSettings?.unitPrice && <div className="w-[15%] py-3.5 border-l border-white/10" style={{ backgroundColor: secondaryColor }}>PRICE</div>}
            {invoice.columnSettings?.quantity && <div className="w-[15%] py-3.5" style={{ backgroundColor: brandColor }}>QTY</div>}
            <div className="w-[20%] py-3.5" style={{ backgroundColor: brandColor }}>TOTAL</div>
          </div>

          {invoice.items.map((item, index) => (
            <div 
              key={item.id} 
              className={cn(
                "flex w-full text-center text-[13px] py-3.5 items-center font-bold",
                index % 2 === 1 ? 'bg-[#f1f3f6]' : 'bg-white'
              )}
            >
              <div className="w-[10%] text-gray-700">{(index + 1).toString().padStart(2, '0')}</div>
              <div className="flex-1 text-left pl-6 text-gray-900 font-black">{item.description}</div>
              {invoice.columnSettings?.hsn && <div className="w-[15%] text-gray-700">{item.hsn || '-'}</div>}
              {invoice.columnSettings?.unitPrice && <div className="w-[15%] text-gray-700">{formatCurrency(item.unitPrice)}</div>}
              {invoice.columnSettings?.quantity && <div className="w-[15%] text-gray-700">{item.quantity}</div>}
              <div className="w-[20%] text-gray-900 font-heavy">{formatCurrency(item.total)}</div>
            </div>
          ))}
        </div>

        {/* Footer content - Summary & T&C */}
        <div className="flex justify-between items-start mt-4 mb-20">
          <div className="w-[55%]">
            {(invoice.notes || invoice.terms) && (
              <div className="space-y-6 pr-12">
                {invoice.notes && (
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900 mb-2 uppercase tracking-wide">Customer Notes :</h3>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                      {invoice.notes}
                    </p>
                  </div>
                )}
                {invoice.terms && (
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900 mb-2 uppercase tracking-wide">TERMS & CONDITION :</h3>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                      {invoice.terms}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-[38%] flex flex-col gap-1.5">
            <div className="flex overflow-hidden rounded-sm">
              <div className="text-white text-[11px] px-4 py-2 uppercase font-black w-[45%] text-right flex items-center justify-end" style={{ backgroundColor: secondaryColor }}>Subtotal :</div>
              <div className="text-white text-[14px] px-4 py-2 font-black w-[55%] flex items-center justify-center" style={{ backgroundColor: brandColor }}>{formatCurrency(invoice.subtotal)}</div>
            </div>
            
            {invoice.taxAmount > 0 && (
              <div className="flex overflow-hidden rounded-sm">
                <div className="text-white text-[11px] px-4 py-2 uppercase font-black w-[45%] text-right flex items-center justify-end">{invoice.taxLabel} ({invoice.taxRate}%) :</div>
                <div className="text-white text-[14px] px-4 py-2 font-black w-[55%] flex items-center justify-center" style={{ backgroundColor: brandColor }}>{formatCurrency(invoice.taxAmount)}</div>
              </div>
            )}

            {invoice.discountAmount > 0 && (
              <div className="flex overflow-hidden rounded-sm">
                <div className="text-white text-[11px] px-4 py-2 uppercase font-black w-[45%] text-right flex items-center justify-end">Discount :</div>
                <div className="text-white text-[14px] px-4 py-2 font-black w-[55%] flex items-center justify-center" style={{ backgroundColor: brandColor }}>-{formatCurrency(invoice.discountAmount)}</div>
              </div>
            )}

            <div className="flex overflow-hidden rounded shadow-xl mt-2 transform scale-105 origin-right">
              <div className="text-white text-[12px] px-4 py-3 uppercase font-black w-[45%] text-right flex items-center justify-end" style={{ backgroundColor: secondaryColor }}>Total :</div>
              <div className="text-white text-[18px] px-4 py-3 font-[900] w-[55%] flex items-center justify-center" style={{ backgroundColor: brandColor }}>{formatCurrency(invoice.total)}</div>
            </div>

            {invoice.balanceDue !== undefined && invoice.balanceDue !== invoice.total && (
              <div className="flex overflow-hidden rounded-sm mt-1 opacity-80">
                <div className="text-white text-[10px] px-4 py-1.5 uppercase font-bold w-[45%] text-right flex items-center justify-end" style={{ backgroundColor: secondaryColor }}>Balance :</div>
                <div className="text-white text-[13px] px-4 py-1.5 font-bold w-[55%] flex items-center justify-center" style={{ backgroundColor: brandColor }}>{formatCurrency(invoice.balanceDue)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Signature Line */}
        <div className="mt-auto pb-16 flex justify-between items-end">
          <div className="text-[10px] font-bold text-gray-400 font-sans uppercase tracking-[0.2em]">
            Thank you for your business!
          </div>

          {invoice.showSignature && (
            <div className="w-52 border-t-[1.5px] border-gray-400 pt-3 text-center">
              {invoice.signatureImage ? (
                <img src={invoice.signatureImage} alt="Signature" className="h-12 object-contain mx-auto mb-2" crossOrigin="anonymous" />
              ) : (
                <div className="h-12"></div>
              )}
              <p className="text-[12px] font-black text-gray-900 uppercase tracking-wider">Authorized Signature</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Decorative Background Layer */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] z-0 pointer-events-none">
        {/* Decorative Lines */}
        <div className="absolute bottom-[115px] left-0 w-full h-[1.5px] bg-gray-200"></div>
        <div className="absolute bottom-[105px] left-0 w-full h-[4px]" style={{ backgroundColor: secondaryColor }}></div>

        {/* Dark Blue Base */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[100px]"
          style={{ 
            backgroundColor: secondaryColor,
            clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)' 
          }}
        ></div>
        {/* Orange Layer */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[50px]"
          style={{ 
            backgroundColor: brandColor,
            clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)' 
          }}
        ></div>
      </div>
    </div>
  );
};
