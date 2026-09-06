import { useState, useCallback, useEffect } from 'react';
import { InvoiceData, LineItem, Currency, TemplateType, createEmptyInvoice, PaymentInfo } from '@/types/invoice';

const STORAGE_KEY = 'invoice_draft';
const AUTOSAVE_INTERVAL = 30000;

export const useInvoice = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    // Check for template param in URL
    const searchParams = new URLSearchParams(window.location.search);
    const templateParam = searchParams.get('template') as TemplateType | null;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const defaults = createEmptyInvoice();
        const baseInvoice = {
          ...defaults,
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          dueDate: new Date(parsed.dueDate),
          // Ensure paymentInfo always has proper structure
          paymentInfo: {
            ...defaults.paymentInfo,
            ...(parsed.paymentInfo || {}),
          },
        };

        // If template param exists, override the saved template
        if (templateParam && ['bold', 'classic', 'modern', 'minimal'].includes(templateParam)) {
          return {
            ...baseInvoice,
            template: templateParam
          };
        }

        return baseInvoice;
      } catch {
        // If parsing fails, fall through to create new invoice
      }
    }

    // Create new invoice with optional template param
    const newInvoice = createEmptyInvoice();
    if (templateParam && ['bold', 'classic', 'modern', 'minimal'].includes(templateParam)) {
      newInvoice.template = templateParam;
    }
    return newInvoice;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const calculateTotals = useCallback((data: InvoiceData): InvoiceData => {
    const subtotal = data.items.reduce((sum, item) => sum + item.total, 0);

    let discountAmount = 0;
    if (data.discountType === 'percentage') {
      discountAmount = subtotal * (data.discountValue / 100);
    } else {
      discountAmount = data.discountValue;
    }

    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * (data.taxRate / 100);
    let total = afterDiscount + taxAmount;

    // Apply Rounding
    let roundingAmount = 0;
    const originalTotal = total;
    if (data.rounding === 'up') {
      total = Math.ceil(total);
      roundingAmount = total - originalTotal;
    } else if (data.rounding === 'down') {
      total = Math.floor(total);
      roundingAmount = total - originalTotal;
    }

    const amountPaid = data.amountPaid || 0;
    const balanceDue = total - amountPaid;

    return {
      ...data,
      subtotal,
      discountAmount,
      taxAmount,
      total,
      roundingAmount,
      balanceDue,
    };
  }, []);

  const updateLineItem = useCallback((id: string, field: keyof LineItem, value: string | number) => {
    setInvoice(prev => {
      const newItems = prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      });
      return calculateTotals({ ...prev, items: newItems });
    });
  }, [calculateTotals]);

  const addLineItem = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0, total: 0 },
      ],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoice(prev => {
      if (prev.items.length <= 1) return prev;
      const newItems = prev.items.filter(item => item.id !== id);
      return calculateTotals({ ...prev, items: newItems });
    });
  }, [calculateTotals]);

  const updateInvoice = useCallback(<K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => {
    setInvoice(prev => {
      const updated = { ...prev, [field]: value };
      if (['taxRate', 'discountType', 'discountValue', 'rounding', 'amountPaid'].includes(field as string)) {
        return calculateTotals(updated);
      }
      return updated;
    });
  }, [calculateTotals]);

  const updatePaymentInfo = useCallback(<K extends keyof PaymentInfo>(
    field: K,
    value: PaymentInfo[K]
  ) => {
    setInvoice(prev => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, [field]: value },
    }));
  }, []);

  const setCurrency = useCallback((currency: Currency) => {
    setInvoice(prev => ({ ...prev, currency }));
  }, []);

  const setTemplate = useCallback((template: TemplateType) => {
    setInvoice(prev => ({ ...prev, template }));
  }, []);

  const resetInvoice = useCallback(() => {
    setInvoice(createEmptyInvoice());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const saveToStorage = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500);
  }, [invoice]);

  useEffect(() => {
    const interval = setInterval(saveToStorage, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [saveToStorage]);

  useEffect(() => {
    const timeout = setTimeout(saveToStorage, 1000);
    return () => clearTimeout(timeout);
  }, [invoice, saveToStorage]);

  return {
    invoice,
    updateInvoice,
    updateLineItem,
    addLineItem,
    removeLineItem,
    updatePaymentInfo,
    setCurrency,
    setTemplate,
    resetInvoice,
    lastSaved,
    isSaving,
  };
};
