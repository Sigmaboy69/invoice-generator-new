import { User, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InvoiceData } from '@/types/invoice';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { addDays, format } from 'date-fns';

interface ClientSectionProps {
  invoice: InvoiceData;
  onUpdate: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

export const ClientSection = ({ invoice, onUpdate }: ClientSectionProps) => {
  const handleDateChange = (field: 'createdAt' | 'dueDate', date: Date | undefined) => {
    if (date) {
      onUpdate(field, date);
      
      // Validation: If Due Date is before Invoice Date, reset it
      if (field === 'createdAt' && invoice.dueDate < date) {
        onUpdate('dueDate', addDays(date, 30));
      }
    }
  };

  const setPaymentTerms = (days: number) => {
    const newDueDate = addDays(invoice.createdAt, days);
    onUpdate('dueDate', newDueDate);
  };

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Bill To</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Client Name</label>
          <Input
            value={invoice.clientName}
            onChange={(e) => onUpdate('clientName', e.target.value)}
            placeholder="Client or Company Name"
            className="h-11 sm:h-10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Email</label>
          <Input
            type="email"
            value={invoice.clientEmail}
            onChange={(e) => onUpdate('clientEmail', e.target.value)}
            placeholder="client@email.com"
            className="h-11 sm:h-10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Phone</label>
          <Input
            type="tel"
            value={invoice.clientPhone}
            onChange={(e) => onUpdate('clientPhone', e.target.value)}
            placeholder="+1 (555) 987-6543"
            className="h-11 sm:h-10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Address</label>
          <Input
            value={invoice.clientAddress}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            placeholder="456 Client Ave, City, State 67890"
            className="h-11 sm:h-10"
          />
        </div>

        <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <DatePicker
              label="Invoice Date"
              date={new Date(invoice.createdAt)}
              setDate={(date) => handleDateChange('createdAt', date)}
            />
          </div>

          <div className="space-y-2">
            <DatePicker
              label="Due Date"
              date={new Date(invoice.dueDate)}
              setDate={(date) => handleDateChange('dueDate', date)}
            />
            
            {/* Quick Select Terms */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 w-full mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Quick Terms
              </span>
              {[
                { label: 'Today', days: 0 },
                { label: 'Net 15', days: 15 },
                { label: 'Net 30', days: 30 },
                { label: 'Net 60', days: 60 },
              ].map((term) => (
                <Button
                  key={term.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => setPaymentTerms(term.days)}
                  className="h-7 px-2 text-[11px] font-medium border border-border/40 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                >
                  {term.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
