export interface LineItem {
  id: string;
  description: string;
  hsn?: string; // HSN/SAC Code
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankDetails: string;
  upiId: string;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  createdAt: Date;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';

  // Client info
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;

  // Company info
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
  companyWebsite: string;
  companyLogo: string | null;
  companyTagline: string;

  // Line items
  items: LineItem[];

  // Calculations
  currency: Currency;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  taxLabel?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  total: number;
  rounding?: 'none' | 'up' | 'down';
  roundingAmount?: number;
  amountPaid?: number;
  balanceDue?: number;

  // Table Settings
  columnSettings?: {
    hsn: boolean;
    quantity: boolean;
    unitPrice: boolean;
    total: boolean;
  };

  // Payment info
  paymentInfo: PaymentInfo;

  // Additional
  notes: string;
  terms: string;
  template: TemplateType;
  brandColor: string;
  textColor?: string; // New Font Color Option
  showSignature: boolean;
  showPaymentInfo: boolean;
  showQrCode: boolean;
  signatureImage: string | null;
}

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type TemplateType = 'bold' | 'classic' | 'modern' | 'minimal' | 'industrial' | 'indigo' | 'basic' | 'elite';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
];

export const TEMPLATES: { id: TemplateType; name: string; description: string; preview: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean contemporary style', preview: '✨' },
  { id: 'bold', name: 'Bold', description: 'Striking geometric design', preview: '🔶' },
  { id: 'classic', name: 'Classic', description: 'Professional & structured', preview: '📋' },
  { id: 'minimal', name: 'Minimal', description: 'Simple & elegant', preview: '◻️' },
  { id: 'industrial', name: 'Industrial', description: 'Bold & high-contrast', preview: '🏗️' },
  { id: 'indigo', name: 'Indigo', description: 'Modern sleek accents', preview: '🟣' },
  { id: 'basic', name: 'Basic', description: 'Clean & eco-friendly', preview: '📄' },
  { id: 'elite', name: 'Elite', description: 'Geometric high-end design', preview: '💎' },
];

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const createEmptyInvoice = (): InvoiceData => ({
  id: generateId(),
  invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
  createdAt: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: 'draft',
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  clientPhone: '',
  companyName: '',
  companyEmail: '',
  companyAddress: '',
  companyPhone: '',
  companyWebsite: '',
  companyLogo: null,
  companyTagline: '',
  items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0, total: 0 }],
  currency: CURRENCIES[0],
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  taxLabel: 'Tax',
  discountType: 'percentage',
  discountValue: 0,
  discountAmount: 0,
  total: 0,
  rounding: 'none',
  roundingAmount: 0,
  amountPaid: 0,
  balanceDue: 0,
  columnSettings: {
    hsn: false,
    quantity: true,
    unitPrice: true,
    total: true,
  },
  paymentInfo: {
    bankName: '',
    accountNumber: '',
    accountName: '',
    bankDetails: '',
    upiId: '',
  },
  notes: '',
  terms: 'Payment is due within 30 days of invoice date.',
  template: 'modern',
  brandColor: '#2563eb',
  textColor: '#333333',
  showSignature: false,
  showPaymentInfo: true,
  showQrCode: false,
  signatureImage: null,
});
