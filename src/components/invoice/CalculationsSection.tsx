import { Calculator, Percent } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InvoiceData, CURRENCIES, Currency } from '@/types/invoice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CalculationsSectionProps {
  invoice: InvoiceData;
  onUpdate: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
  onSetCurrency: (currency: Currency) => void;
}

export const CalculationsSection = ({ invoice, onUpdate, onSetCurrency }: CalculationsSectionProps) => {
  const formatCurrency = (amount: number) => {
    return `${invoice.currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Calculations</h2>
      </div>

      <div className="space-y-4">
        {/* Currency */}
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Currency</label>
          <Select
            value={invoice.currency.code}
            onValueChange={(code) => {
              const currency = CURRENCIES.find(c => c.code === code);
              if (currency) onSetCurrency(currency);
            }}
          >
            <SelectTrigger className="h-11 sm:h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tax Rate */}
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Tax Rate (%)</label>
          <div className="relative">
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={invoice.taxRate}
              onChange={(e) => onUpdate('taxRate', parseFloat(e.target.value) || 0)}
              className="pr-8 h-11 sm:h-10"
            />
            <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Discount</label>
          <div className="flex gap-2">
            <div className="flex rounded-lg border border-border overflow-hidden shrink-0">
              <Button
                type="button"
                variant={invoice.discountType === 'percentage' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none h-11 sm:h-9 px-3 flex-1 sm:flex-none"
                onClick={() => onUpdate('discountType', 'percentage')}
              >
                <Percent className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={invoice.discountType === 'fixed' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none h-11 sm:h-9 px-3 flex-1 sm:flex-none"
                onClick={() => onUpdate('discountType', 'fixed')}
              >
                <span className="text-sm font-bold">{invoice.currency.symbol}</span>
              </Button>
            </div>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={invoice.discountValue}
              onChange={(e) => onUpdate('discountValue', parseFloat(e.target.value) || 0)}
              placeholder={invoice.discountType === 'percentage' ? '0%' : '0.00'}
              className="h-11 sm:h-10 flex-1 min-w-[80px]"
            />
          </div>
        </div>

        {/* Rounding & Paid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Rounding</label>
            <Select
              value={invoice.rounding || 'none'}
              onValueChange={(value: 'none' | 'up' | 'down') => onUpdate('rounding', value)}
            >
              <SelectTrigger className="h-11 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="up">Round Up</SelectItem>
                <SelectItem value="down">Round Down</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Amount Paid</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={invoice.amountPaid}
              onChange={(e) => onUpdate('amountPaid', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="h-11 sm:h-10"
            />
          </div>
        </div>

        {/* Totals */}
        <div className="mt-6 space-y-3 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
          </div>

          {invoice.discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Discount {invoice.discountType === 'percentage' && `(${invoice.discountValue}%)`}
              </span>
              <span className="font-medium text-success">-{formatCurrency(invoice.discountAmount)}</span>
            </div>
          )}

          {invoice.taxAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
            </div>
          )}

          <div className="flex justify-between border-t border-border pt-3">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(invoice.total)}</span>
          </div>

          {invoice.roundingAmount !== 0 && (
            <div className="flex justify-between text-xs text-muted-foreground italic">
              <span>Rounding Adjustment</span>
              <span>{invoice.roundingAmount! > 0 ? '+' : ''}{formatCurrency(invoice.roundingAmount!)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm pt-2">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-medium text-success">-{formatCurrency(invoice.amountPaid || 0)}</span>
          </div>

          <div className="flex justify-between border-t-2 border-primary/20 pt-3 mt-1 bg-primary/5 -mx-4 px-4 py-2">
            <span className="text-lg font-bold">Balance Due</span>
            <span className="text-2xl font-black text-primary">{formatCurrency(invoice.balanceDue || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
