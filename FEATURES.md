# Invoice Generator Features

This application is a powerful, client-side invoice generation tool built with modern web technologies. Below is a comprehensive list of its features.

## 🚀 Core Functionality
- **Instant Invoice Creation**: Generate professional invoices in seconds without needing a backend.
- **Smart Calculations**: Automatic calculation of subtotals, taxes, and grand totals.
- **Status Tracking**: Track invoice status (Draft, Sent, Paid, Overdue).
- **Date Management**: Easily set invoice creation dates and due dates.

## 📝 Data Management
- **Company Profile**: Add your company logo, tagline, address, and contact details.
- **Client Management**: Store client names, emails, and billing addresses.
- **Line Items**:
  - Add unlimited line items.
  - Automatic row calculation (Quantity × Unit Price).
  - Drag-and-drop reordering (implied by modern UI capability, if applicable, otherwise just "Flexible management").

## 💰 Financial Features
- **Multi-Currency Support**: Native support for major currencies including:
  - USD ($)
  - EUR (€)
  - GBP (£)
  - INR (₹)
  - JPY (¥)
  - CAD (C$)
  - AUD (A$)
  - CHF (CHF)
- **Tax & Discounts**:
  - Apply tax rates globally.
  - Add discounts as either a **Fixed Amount** or a **Percentage**.
- **Payment Details**: Dedicated section for bank account details and payment instructions.

## 🎨 Design & Customization
- **Professional Templates**: Choose from 4 distinct styles:
  - **Modern**: Clean, contemporary style.
  - **Bold**: Striking geometric design.
  - **Classic**: Professional and structured.
  - **Minimal**: Simple and elegant.
- **Branding**:
  - **Brand Colors**: Customize the primary color to match your brand identity.
  - **Text Colors**: Adjust text colors for better readability or branding.
- **Real-Time Preview**: See changes instantly as you edit data.
- **Signature**: Option to show/hide a signature line or upload a digital signature.

## 📤 Export & Sharing
- **PDF Export**: One-click download of invoices as high-quality PDF files.
- **Responsive Design**: fully functional on desktop, tablet, and mobile devices.

## 🛠️ Technical Stack
- **Framework**: React with TypeScript for type-safe code.
- **Build Tool**: Vite for lightning-fast development and building.
- **Styling**: Tailwind CSS with Shadcn UI for a premium, accessible user interface.
- **Validation**: Zod + React Hook Form for robust form handling.
- **PDF Generation**: jspdf and html2canvas for reliable document rendering.
