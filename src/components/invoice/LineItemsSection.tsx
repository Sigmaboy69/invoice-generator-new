import { Package, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InvoiceData, LineItem } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface LineItemsSectionProps {
  invoice: InvoiceData;
  onUpdateItem: (id: string, field: keyof LineItem, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
}

export const LineItemsSection = ({ invoice, onUpdateItem, onAddItem, onRemoveItem }: LineItemsSectionProps) => {
  const formatCurrency = (amount: number) => {
    return `${invoice.currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">Line Items</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddItem} className="hidden sm:flex">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="pb-3 font-medium">Description</th>
              {invoice.columnSettings?.hsn && <th className="pb-3 font-medium text-center w-24">HSN/SAC</th>}
              {invoice.columnSettings?.quantity && <th className="pb-3 font-medium text-center w-24">Qty</th>}
              {invoice.columnSettings?.unitPrice && <th className="pb-3 font-medium text-right w-32">Unit Price</th>}
              {invoice.columnSettings?.total && <th className="pb-3 font-medium text-right w-32">Total</th>}
              <th className="pb-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="group animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="py-3 pr-4">
                  <div className="space-y-1">
                    <Input
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="border-0 bg-transparent px-0 focus:ring-0 font-medium"
                    />
                  </div>
                </td>
                {invoice.columnSettings?.hsn && (
                  <td className="py-3 px-2">
                    <Input
                      value={item.hsn || ''}
                      onChange={(e) => onUpdateItem(item.id, 'hsn', e.target.value)}
                      placeholder="HSN"
                      className="text-center"
                    />
                  </td>
                )}
                {invoice.columnSettings?.quantity && (
                  <td className="py-3 px-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="text-center"
                    />
                  </td>
                )}
                {invoice.columnSettings?.unitPrice && (
                  <td className="py-3 px-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {invoice.currency.symbol}
                      </span>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => onUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="pl-7 text-right"
                      />
                    </div>
                  </td>
                )}
                {invoice.columnSettings?.total && (
                  <td className="py-3 px-2 text-right font-semibold">
                    {formatCurrency(item.total)}
                  </td>
                )}
                <td className="py-3 pl-2 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={invoice.items.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {invoice.items.map((item, index) => (
          <div key={item.id} className="rounded-xl bg-secondary/50 p-3 sm:p-4 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="mb-3 flex items-start justify-between gap-2">
              <Input
                value={item.description}
                onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                placeholder="Item description"
                className="flex-1 h-11"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-11 w-11 shrink-0"
                disabled={invoice.items.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className={cn(
              "grid gap-2 mt-2",
              invoice.columnSettings?.hsn ? "grid-cols-4" : "grid-cols-3"
            )}>
              {invoice.columnSettings?.hsn && (
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-1">HSN</label>
                  <Input
                    value={item.hsn || ''}
                    onChange={(e) => onUpdateItem(item.id, 'hsn', e.target.value)}
                    placeholder="HSN"
                    className="h-10 text-xs px-2"
                  />
                </div>
              )}
              {invoice.columnSettings?.quantity && (
                <div className={invoice.columnSettings?.hsn ? "" : "col-span-1"}>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-1">Qty</label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="text-center h-10 text-xs px-2"
                  />
                </div>
              )}
              {invoice.columnSettings?.unitPrice && (
                <div className={invoice.columnSettings?.hsn ? "" : "col-span-1"}>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-1">Price</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => onUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="h-10 text-xs px-2"
                  />
                </div>
              )}
              {invoice.columnSettings?.total && (
                <div className={invoice.columnSettings?.hsn ? "" : "col-span-1"}>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-1 text-center">Total</label>
                  <div className="flex h-10 items-center justify-center rounded-lg bg-secondary/80 px-2 font-bold text-xs ring-1 ring-black/5">
                    {formatCurrency(item.total)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={onAddItem} className="mt-4 w-full h-12 text-base md:hidden active:scale-[0.98]">
        <Plus className="h-5 w-5 mr-2" />
        Add Item
      </Button>
    </div>
  );
};
