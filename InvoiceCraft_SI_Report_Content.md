# Summer Internship / Mini Project Report Content

## Project title

**InvoiceCraft: A Client-Side Web Application for Professional Invoice Generation and PDF Export**

## How to use this draft

Replace every item in square brackets before submitting: `[STUDENT NAME]`, `[ENROLLMENT NUMBER]`, `[GUIDE NAME]`, `[INTERNSHIP ORGANIZATION]`, and any date or signature field. The supplied chapter files are largely blank layouts with headings and page breaks; therefore, the page limits below are treated as writing targets. With the template's existing font, margins, line spacing, and headings, keep the text near the indicated range and adjust only the last paragraph of a section if a page overflows.

---

# 0 - Title page.docx

**SUMMER INTERNSHIP REPORT**

**On**

**InvoiceCraft: A Client-Side Web Application for Professional Invoice Generation and PDF Export**

**Submitted by**

**[STUDENT NAME]**

**([ENROLLMENT NUMBER])**

**Guided by:**

**[GUIDE NAME]**

**COMPUTER SCIENCE AND ENGINEERING DEPARTMENT**

A Summer Internship / Mini Project Report submitted to Gujarat Technological University in fulfillment of the requirements for the award of the degree of Bachelor of Engineering in Computer Science and Engineering.

**Academic Year: 2026-2027**

**NEW L. J. INSTITUTE OF ENGINEERING AND TECHNOLOGY**

Pakwan, Behind Rajpath Club Gate to Sindhu Bhavan Road,

Sarkhej - Gandhinagar Highway,

Ahmedabad, Gujarat 380054

---

# 1-CERTIFICATE.docx

## CERTIFICATE

This is to certify that the Mini Project Report entitled **“InvoiceCraft: A Client-Side Web Application for Professional Invoice Generation and PDF Export”**, submitted by **[STUDENT NAME]**, Enrollment No. **[ENROLLMENT NUMBER]**, has been completed under my guidance in partial fulfillment of the requirements for the award of the Bachelor of Engineering degree in Computer Science and Engineering, 7th Semester, of Gujarat Technological University, Ahmedabad, during the academic year 2026-2027.

The work presented in this report is based on the development of a responsive web application that allows users to prepare professional invoices, calculate taxes and discounts, customize invoice designs, store drafts locally in the browser, and export the final invoice as a PDF document. To the best of my knowledge, the work carried out by the student is satisfactory and fulfills the academic requirements of the mini project.

Date: ____________________

Place: NEW LJIET, Ahmedabad.

| Signature and Name of Guide | Signature and Name of H.O.D. |
|---|---|
| [GUIDE NAME]  
Assistant Professor,  
CSE Department,  
NEW LJIET (143), Ahmedabad. | Dr. Gayatri Pandi  
CSE Department,  
NEW LJIET (143), Ahmedabad. |

**Seal of Institute**

---

# 2-DECLARATION- Online & Ofline.docx

## DECLARATION

I hereby declare that the Mini Project Report submitted along with the project entitled **“InvoiceCraft: A Client-Side Web Application for Professional Invoice Generation and PDF Export”** in partial fulfillment of the requirements for the award of the Bachelor of Engineering degree in Computer Science and Engineering to Gujarat Technological University, Ahmedabad, is a bona fide record of the original work carried out by me under the guidance of **[GUIDE NAME]**.

The project was developed as a browser-based invoice generation system using React, TypeScript, Vite, Tailwind CSS, and supporting client-side libraries. The implementation, testing, observations, and conclusions presented in this report are based on my own work and understanding. I further declare that this report has not been submitted, either in part or in full, to any other university or institution for the award of any degree or diploma. No part of this report has been directly copied from another student's report or taken from any source without appropriate acknowledgement and reference.

| Name of Student | Signature of Student |
|---|---|
| [STUDENT NAME] | ____________________ |

Enrollment No.: **[ENROLLMENT NUMBER]**

---

# 3-ACKNOWLEDGEMENT.docx

## ACKNOWLEDGEMENT

I wish to express my sincere gratitude to my project guide, **[GUIDE NAME]**, for constant guidance, valuable suggestions, encouragement, and continuous support throughout the development of this mini project. Their feedback helped me understand the requirements of a practical web application, improve the design of the invoice workflow, and present the technical work in a clear and systematic manner.

I would also like to express my heartfelt thanks to **Dr. Gayatri Pandi**, Head of the Computer Science and Engineering Department, for providing motivation, encouragement, and the opportunity to undertake this project. I am grateful to all the faculty members of the Computer Science and Engineering Department, New L. J. Institute of Engineering and Technology, for their academic support and guidance during the project work.

I would like to acknowledge the importance of the open-source technologies and libraries used in this project, including React, TypeScript, Vite, Tailwind CSS, Radix UI components, html2canvas, jsPDF, and qrcode.react. These tools made it possible to design, implement, and test a responsive invoice generator with a clean user interface and client-side PDF generation.

Finally, I thank my parents, family members, and friends for their constant encouragement, moral support, and inspiration. Their support gave me the confidence to complete the project and prepare this report. I express my sincere thanks to everyone who directly or indirectly contributed to the successful completion of this mini project.

**Thank You**

---

# 4 - Abstract.docx

## Project title

**InvoiceCraft: A Client-Side Web Application for Professional Invoice Generation and PDF Export**

Enrollment No.: **[ENROLLMENT NUMBER]**

Student Name: **[STUDENT NAME]**

NEW L. J. Institute of Engineering and Technology (143)

Semester: VII

COMPUTER SCIENCE AND ENGINEERING DEPARTMENT

## Abstract

InvoiceCraft is a responsive, browser-based invoice generation application designed for freelancers, students, consultants, and small businesses that need a quick method of preparing professional invoices. Traditional invoice preparation using word processors or spreadsheets often requires repeated manual formatting and calculation, which can lead to arithmetic mistakes, inconsistent layouts, and loss of draft data. InvoiceCraft addresses these problems through a guided editor and a live invoice preview.

The application is implemented using React and TypeScript with Vite as the build tool. Users can enter company and client information, add multiple line items, specify HSN/SAC codes, select a currency, apply tax and discounts, record the amount paid, and view the balance due. The application also supports payment information, optional UPI QR-code generation, signatures, notes, terms and conditions, brand colors, text colors, and multiple invoice templates. Invoice data is stored in the browser's LocalStorage so that drafts can be recovered without requiring an account or a server-side database. The completed invoice is converted into a high-quality A4 PDF using html2canvas and jsPDF. The project demonstrates how a modern client-side application can combine reusable components, state management, responsive design, automatic calculations, and document export to solve a practical business problem.

**Keywords:** invoice generator, React, TypeScript, client-side application, LocalStorage, PDF export, GST, UPI QR code, responsive web design.

---

# 5-TABLE OF CONTENT.docx

Use the following updated table. Keep the page numbers supplied by the template after you finish formatting; they may shift by one page depending on the final screenshots, diagrams, and spacing.

| CHAPTERS | PAGE NO. |
|---|---:|
| Title Page | i |
| Completion Certificate | ii |
| Declaration | iii |
| Acknowledgements | iv |
| Abstract | v |
| Table of Contents | vi |
| **CHAPTER 1 INTRODUCTION** | **01** |
| 1.1 Project Introduction | 02 |
| 1.2 Problem Statement and Objective | 02 |
| 1.3 Scope of the Project | 03 |
| 1.4 Work Plan and Execution | 04 |
| **CHAPTER 2 TOOLS AND TECHNOLOGIES USED** | **05** |
| 2.1 Hardware and Software Requirements | 06 |
| 2.2 Introduction to React and TypeScript | 06 |
| 2.3 Key Frameworks and Libraries | 07 |
| **CHAPTER 3 SYSTEM DESIGN AND IMPLEMENTATION** | **10** |
| 3.1 System Architecture / Flow Diagram | 11 |
| 3.2 Modules Description | 13 |
| 3.3 Implementation Details | 16 |
| **CHAPTER 4 CONCLUSION** | **24** |
| 4.1 Conclusion | 25 |
| **CHAPTER 5 FUTURE ENHANCEMENT** | **26** |
| 5.1 Future Enhancement | 27 |

---

# CHAPTER 1 INTRODUCTION

## 1.1 Project Introduction

Invoicing is an important activity for every freelancer, consultant, service provider, and small business. An invoice communicates what was supplied, how much it costs, when payment is expected, and how the customer can complete the payment. Although the information is usually simple, preparing a professional invoice manually can consume time. A user may have to create a document, align several fields, calculate quantities and prices, apply taxes or discounts, format the total, and save the final document in a shareable format. Repeating the same work for every client increases the chance of inconsistent formatting and calculation errors.

InvoiceCraft is a web application created to simplify this process. It provides an editor for entering business details, customer details, line items, payment information, and invoice settings. A preview panel displays the invoice while the user edits it. This real-time feedback helps the user identify missing information and understand how the final document will look before exporting it. The application is designed to work directly in a modern browser and does not require a separate installation, login, or server-side account for creating an invoice.

The project uses a component-based frontend architecture. The company section collects the issuer's logo, name, tagline, address, phone number, email address, and website. The client section collects the recipient's contact and billing details together with the invoice date and due date. The line-item section allows the user to add or remove products and services, specify quantity and unit price, and optionally include HSN/SAC codes. The calculation section processes subtotal, discounts, tax, rounding, amount paid, total, and balance due.

The application is also designed for different business contexts. It supports USD, EUR, GBP, INR, JPY, CAD, AUD, and CHF. A tax label can be used for labels such as Tax, GST, or VAT. Bank details and UPI information can be printed on the invoice, and a UPI QR code can be generated for scan-to-pay use. The user can select from multiple templates and customize brand and text colors. Notes, terms and conditions, signatures, and payment sections are optional so the generated document can be adapted to the user's needs.

The final invoice is converted to an A4 PDF in the browser. The preview is cloned, styles are preserved, and the result is rendered at a high scale before being added to a jsPDF document. This approach allows the downloaded PDF to retain the visual appearance of the selected template. Since the application stores the draft in LocalStorage, a user can close the tab and return later on the same browser without re-entering all data. This privacy-focused approach also means that invoice data is not transmitted to the project server during normal use.

## 1.2 Problem Statement and Objective

### Problem statement

Many small businesses and independent professionals prepare invoices using blank word-processing documents, spreadsheets, or generic templates. These methods create several practical difficulties:

1. The user must repeatedly arrange the same company and client information.
2. Quantity, price, tax, discount, and balance calculations are often performed manually.
3. Different documents may use different fonts, alignments, colors, and table structures.
4. A draft can be lost when the document is not saved or when the user works from another device.
5. Some free tools require account creation or send business and customer data to a remote server.
6. A payment instruction or UPI option may be missing from the final document.
7. A user may not know how the invoice will appear in PDF until after exporting it.

The project addresses these difficulties by providing a guided, responsive, and privacy-conscious invoice creation workflow. The primary focus is not to build a full enterprise accounting system; it is to provide a simple tool that produces a structured invoice accurately and quickly.

### Objectives

The objectives of InvoiceCraft are as follows:

1. To design a clear interface for creating invoices without requiring user registration.
2. To collect company, client, invoice, item, calculation, payment, and presentation data in a structured model.
3. To calculate line totals, subtotal, discount, tax, total, rounding adjustment, amount paid, and balance due automatically.
4. To support multiple currencies and tax labels suitable for general and GST-oriented invoicing.
5. To provide reusable invoice templates that can be selected without rewriting the invoice data.
6. To show an immediate preview so that users can verify the result before exporting.
7. To generate a high-quality A4 PDF completely on the client side.
8. To save drafts locally and protect ordinary invoice data from unnecessary server transmission.
9. To provide optional payment instructions, UPI QR code, notes, terms, and signature support.
10. To create a responsive interface that can be used on desktop, tablet, and mobile screens.

### Expected outcome

The expected outcome is a working web application in which a user can enter invoice details, add one or more items, choose a currency and template, verify automatically calculated totals, preview the final document, and download or share the invoice as a PDF. The application should remain understandable for a first-time user while retaining enough flexibility for practical business use.

## 1.3 Scope of the Project

The scope of the project includes the design and implementation of the frontend application, invoice data model, calculation logic, template rendering, LocalStorage draft persistence, and client-side PDF export. The system is intended for small-scale invoicing where the user creates and downloads an invoice individually.

### Functional scope

The application includes the following functions:

- Create a new invoice with an automatically generated invoice number.
- Enter and edit company details, including company logo and tagline.
- Enter client name, email, phone number, and address.
- Set invoice date and due date.
- Add multiple line items with description, HSN/SAC code, quantity, unit price, and calculated line total.
- Select a supported currency and display its symbol in the editor and preview.
- Apply a percentage or fixed-value discount.
- Apply a tax rate and use a suitable label such as Tax, GST, or VAT.
- Round the total upward or downward when required.
- Record amount paid and calculate the remaining balance due.
- Add bank information, account details, payment instructions, and UPI ID.
- Generate an optional UPI payment QR code containing invoice amount and reference information.
- Add notes, payment terms, signature image, and invoice branding.
- Choose from modern, bold, classic, minimal, industrial, indigo, basic, and elite templates.
- Adjust brand color and text color.
- Preview the invoice and export it as an A4 PDF.
- Share the invoice through supported browser sharing options, email composition, or WhatsApp workflow where available.
- Save and recover the current draft through browser LocalStorage.

### Technical scope

The project covers React component development, TypeScript type definitions, hooks for state management, responsive Tailwind CSS styling, reusable UI components, and client-side document generation. The project also includes basic informational pages such as a user guide and invoice-related articles. These pages explain how to use the generator and provide search-friendly descriptions of GST invoicing and invoice formats.

### Limitations and exclusions

The application does not include a server-side database, authentication, multi-user access, automated email delivery, payment settlement, accounting ledger, inventory management, or tax filing integration. LocalStorage is limited to the browser and device in which the user creates the draft. If browser storage is cleared or the user changes devices, the saved draft may not be available. Compliance with a particular country's tax law still requires the user to verify the invoice fields and rates applicable to their own business.

## 1.4 Work Plan and Execution

The project was executed in stages so that the user interface, data model, calculations, and PDF output could be developed and tested together.

### Phase 1: Requirement analysis

The first phase identified the common information present on an invoice: issuer details, client details, invoice number, dates, item list, tax, discount, total, payment instructions, and terms. The requirements also considered the needs of Indian freelancers and small businesses, such as INR currency, GST labels, HSN/SAC codes, and UPI payments. The project was intentionally scoped as a client-side tool so that a user could generate an invoice without registering.

### Phase 2: Interface and data design

The editor was divided into Details, Items, and Settings sections. A separate preview area was planned so that the editing workflow and final invoice layout could be viewed together. A typed `InvoiceData` structure was designed to hold all values required by the editor and templates. Separate `LineItem`, `PaymentInfo`, `Currency`, and `TemplateType` types were used to keep the model readable and reduce inconsistent field names.

### Phase 3: Component implementation

The company, client, line-item, calculation, settings, payment QR, and preview components were implemented separately. This reduced the complexity of the main page and made it possible to update a particular part of the invoice without rebuilding the entire application manually. The `useInvoice` hook was implemented to centralize invoice state, actions, calculations, LocalStorage recovery, and autosave behavior.

### Phase 4: Template and export implementation

Reusable template components were connected to the same invoice data. This made the selected design independent from the data-entry process. The PDF export workflow was then implemented using html2canvas and jsPDF. The export code forces an A4-sized render, preserves computed styles, creates a white background, and splits long invoices across PDF pages when necessary.

### Phase 5: Testing and refinement

The application was checked with empty and filled invoice data, multiple items, different currencies, tax and discount combinations, amount-paid values, optional sections, narrow mobile layouts, and different template choices. The interface was refined to keep navigation simple, to show the preview on larger screens, and to provide an editor/preview switcher on mobile devices. The final stage included checking the build configuration and ensuring that the application could be packaged as a Vite production build.

---

# CHAPTER 2 TOOLS AND TECHNOLOGIES USED

## 2.1 Hardware and Software Requirements

### Hardware requirements

InvoiceCraft is a lightweight browser application. It does not require a dedicated server or high-end computer. The following configuration is sufficient for development and use:

- Processor: Dual-core processor or better.
- Memory: Minimum 4 GB RAM; 8 GB or more is recommended for development.
- Storage: Approximately 500 MB or more for source code, dependencies, and generated files.
- Display: A desktop or laptop display for comfortable editing; a tablet or mobile display is supported for responsive use.
- Input: Keyboard, mouse, touch screen, or trackpad.
- Internet: Required during development for installing packages and loading external font resources; normal invoice editing and PDF generation are designed to run in the browser.

### Software requirements

- Operating system: Windows, Linux, or macOS.
- Runtime: Node.js with npm or another compatible package manager.
- IDE: Visual Studio Code or any TypeScript-compatible editor.
- Browser: A current version of Chrome, Edge, Firefox, or another modern browser with LocalStorage, Web APIs, and file-download support.
- Build tool: Vite.
- Source language: TypeScript and TSX.
- Frontend framework: React 18.
- Styling: Tailwind CSS and CSS custom properties.
- Package management: npm, with a package lock file included in the project.
- Version control: Git can be used for source history and collaboration.

The application uses browser storage and client-side PDF generation; therefore, a backend server, relational database, and API credentials are not required for the core workflow. The development machine must still have enough memory to run the Vite development server and compile the TypeScript project.

## 2.2 Introduction to React and TypeScript

### React

React is a JavaScript library for building user interfaces through reusable components. InvoiceCraft uses React to divide a complex invoice screen into smaller units such as the header, company form, client form, line-item editor, calculation panel, settings panel, invoice preview, and payment QR code. Each component receives data and callback functions through props. When the invoice state changes, React re-renders the affected interface and the preview reflects the new values.

This component approach is useful for InvoiceCraft because the same invoice data is displayed in two different ways: first in the editor controls and then in the selected invoice template. The application can also choose one template component from a group of template components while keeping the input structure unchanged.

### TypeScript

TypeScript extends JavaScript with static types. The project defines interfaces for `InvoiceData`, `LineItem`, and `PaymentInfo`, along with types for supported currencies and template names. These definitions document the expected shape of the data and help catch errors while the application is being developed. For example, a line item must have a description, quantity, unit price, and total, while the payment object contains bank and UPI fields.

The typed model also helps the update functions remain predictable. A field update is checked against the keys of `InvoiceData`, and a payment update is checked against the keys of `PaymentInfo`. This makes the code easier to maintain when a new option is added, such as a rounding setting or a new display preference.

### Vite and TSX

Vite provides a fast development server and a production build pipeline. The source files use TSX, which allows TypeScript logic and JSX interface markup to be written in the same component file. Vite resolves aliases such as `@/components` and bundles the React application for deployment.

## 2.3 Key Frameworks and Libraries

### Tailwind CSS and CSS custom properties

Tailwind CSS is used for utility-based styling, responsive breakpoints, spacing, typography, colors, borders, shadows, and layout. The project also defines CSS custom properties for the background, foreground, card, border, primary, accent, success, warning, and informational colors. A light and dark theme can be selected from the header. Tailwind responsive utilities allow the same interface to adapt to desktop and mobile screens.

### shadcn/ui and Radix UI

The project uses shadcn/ui-style components and Radix UI primitives for inputs, buttons, select menus, tabs, popovers, dialogs, tooltips, tables, checkboxes, switches, and other accessible controls. These components provide a consistent visual language and reduce the need to implement keyboard and focus behavior from scratch.

### React Router

React Router is used for navigation between the invoice editor, user guide, blog list, and supporting article pages. The main route contains the generator, while routes such as `/guide`, `/blog`, and the GST/invoice-format articles provide usage guidance and informational content.

### React Hook Form and Zod support

The dependency set includes React Hook Form and Zod resolver support for structured form handling and validation. The current editor primarily uses controlled React state for direct invoice updates, while these libraries provide a foundation for adding stronger schema validation and more complex forms in future versions.

### html2canvas and jsPDF

html2canvas converts the rendered invoice preview into a canvas image. The application temporarily clones the invoice element, applies computed styles, renders it at a higher scale, and places the resulting image into a jsPDF A4 document. jsPDF is responsible for creating the PDF file and triggering a browser download. The implementation also slices a long canvas into multiple A4 pages.

### qrcode.react

The qrcode.react library renders a UPI QR code as an SVG. The QR value contains a UPI payment URI with the payee address, business name, invoice amount, invoice reference, and currency. The QR code is shown only when a UPI ID and the corresponding display option are available.

### Lucide React and supporting libraries

Lucide React provides consistent interface icons for actions such as download, reset, preview, settings, calculator, sharing, and theme switching. Other project dependencies provide date handling, toast notifications, responsive panels, SEO metadata, and standard utility functions.

---

# CHAPTER 3 SYSTEM DESIGN AND IMPLEMENTATION

## 3.1 System Architecture / Flow Diagram

InvoiceCraft follows a client-side, component-based architecture. The browser is the execution environment, and the invoice data remains in the React state while the user is editing. The same state is used by the editor controls, calculation functions, selected invoice template, QR-code component, and PDF export function.

### Architecture overview

The major layers of the system are:

1. **Presentation layer:** React pages and reusable UI components display forms, buttons, tabs, menus, the preview, and feedback messages.
2. **State and domain layer:** The `useInvoice` hook stores invoice data and exposes actions for updating fields, adding or removing items, changing currency, changing templates, saving, and resetting.
3. **Calculation layer:** The hook calculates subtotal, discount, tax, rounding adjustment, total, and balance due whenever relevant values change.
4. **Rendering layer:** Template components convert the shared invoice data into a selected visual layout.
5. **Persistence layer:** Browser LocalStorage stores the serialized invoice draft under the key `invoice_draft`.
6. **Export and payment layer:** html2canvas and jsPDF generate PDFs, while qrcode.react displays a UPI payment QR code when configured.

### Flow diagram to draw in the report

Use the following flow as a diagram with boxes and arrows:

```text
User opens InvoiceCraft
          |
          v
React application loads saved draft or creates empty invoice
          |
          v
Details section -> Items section -> Calculations -> Settings
          |             |             |            |
          +-------------+-------------+------------+
                        |
                        v
              useInvoice state is updated
                        |
          +-------------+--------------------+
          |                                  |
          v                                  v
Live invoice preview                  LocalStorage autosave
          |                                  |
          v                                  v
Selected template / QR code       Draft recovery on reload
          |
          v
Clone preview -> inline styles -> html2canvas -> jsPDF -> A4 PDF download/share
```

### User workflow

When the application starts, the `useInvoice` hook checks the browser URL for an optional template parameter and checks LocalStorage for a previous draft. If a valid saved draft is found, it is merged with default invoice fields and its date values are reconstructed as JavaScript `Date` objects. If no draft is available, a new invoice is created with a generated invoice number, a default due date thirty days after the creation date, one empty line item, USD currency, the modern template, and default payment terms.

The user fills in the company and client details, moves to the Items section, and adds products or services. Each line item updates its own total from quantity multiplied by unit price. The calculation section uses all item totals and the selected tax, discount, rounding, and payment values. The Settings section controls template selection, colors, payment information, optional QR code, signature, notes, and terms. Every update is sent back to the hook, so the preview changes without a page reload.

### Data flow

The `InvoiceData` object is the central data contract. It contains invoice identity and dates, company and client information, the list of `LineItem` records, calculation fields, currency, payment information, optional display settings, notes, terms, template, and branding values. The editor writes values into this object. The preview reads the same object. The PDF export receives the rendered preview, not a second independent invoice model. This avoids differences between what the user sees and what is exported.

## 3.2 Modules Description

### 3.2.1 Application and routing module

The `App` component creates the React Query provider, Helmet provider, tooltip provider, toast containers, and hash-based router. The root route displays the invoice generator. Additional routes display a user guide, blog listing, and articles about GST invoices, free invoice generators, and invoice formats. Lazy loading is used for supporting pages so that the main application can load the essential editor first.

### 3.2.2 Header and navigation module

The header displays the InvoiceCraft logo and product name. It provides a new-invoice/reset action, a light/dark theme switch, and an Export PDF action on larger screens. The save status shows whether the draft is being saved and the time at which it was last saved. On smaller screens, the main page provides an editor/preview switcher and a floating action bar showing the current invoice total and PDF action.

### 3.2.3 Company details module

The company module collects the information of the invoice issuer. The supported values include company name, tagline, address, phone number, email address, website, and logo. The logo is stored as a data URL so that it can be reused in the preview and PDF without needing a separate upload server. If the user does not upload a logo, the templates can show a branded initial or placeholder treatment.

### 3.2.4 Client details module

The client module collects the recipient's name, email, phone number, and billing address. It also provides invoice creation and due-date controls. The component keeps the due date consistent with the creation date when the user changes the creation date. Date values are converted to display-friendly strings in the preview while remaining `Date` objects in the application state.

### 3.2.5 Line-item module

The line-item module represents the products or services included in the invoice. Every item has a unique identifier, description, optional HSN/SAC code, quantity, unit price, and total. The user can add multiple rows or remove rows while ensuring that at least one row remains. Whenever quantity or unit price changes, the row total is recomputed immediately. This prevents the user from having to calculate each row manually.

### 3.2.6 Calculation and currency module

The calculation module displays currency selection, tax rate, discount type and value, rounding mode, amount paid, subtotal, tax amount, total, and balance due. Supported currencies include USD, EUR, GBP, INR, JPY, CAD, AUD, and CHF. The same currency symbol and code are used in the editor, invoice preview, and payment QR data.

The calculation order is:

1. Add all line-item totals to obtain the subtotal.
2. Calculate either a percentage discount or a fixed discount.
3. Subtract the discount from the subtotal.
4. Calculate tax on the discounted amount.
5. Add tax to obtain the unrounded total.
6. Apply the selected round-up or round-down option.
7. Subtract the amount paid to obtain the balance due.

### 3.2.7 Settings and customization module

The settings module controls the visual and payment-related options of an invoice. The user can select a template, set brand and text colors, choose whether payment information is displayed, add bank details, enter a UPI ID, show a QR code, upload a signature image, and write notes and terms. The selected values are part of the shared `InvoiceData` object, so every template can apply them consistently.

### 3.2.8 Template rendering module

The application includes eight template components: Modern, Minimal, Industrial, Indigo, Elite, Classic, Bold, and Basic. They all receive the same invoice data, currency formatter, and date formatter. Their layout and visual emphasis differ, but they use a common set of fields. This separation allows the user to change the appearance of the invoice without re-entering information.

The templates display company branding, invoice number, invoice date, due date, client information, item table, subtotal, discount, tax, total, balance due, payment details, notes, terms, QR code, and signature when those values are enabled. Conditional rendering prevents empty optional sections from occupying unnecessary space.

### 3.2.9 Preview and sharing module

The preview module selects a template based on `invoice.template` and displays it inside an A4-sized preview area. Zoom is adjusted to fit the available container width. The module provides download and sharing actions. Browser-supported sharing can share the generated PDF file, while email and WhatsApp actions prepare a message containing the invoice number, amount, due date, and company information.

### 3.2.10 Local persistence module

The application serializes the current invoice data and stores it in LocalStorage. A short delayed save occurs after invoice changes, and a periodic save runs every thirty seconds. On reload, the saved object is parsed and merged with default values so that fields added in a later version still receive valid defaults. A reset action clears the current draft and creates a fresh invoice.

### 3.2.11 PDF generation module

The PDF module receives the DOM element containing the invoice preview. It clones the element, removes buttons and user-interface-only elements, forces the page to an A4 width, inlines computed styles, waits for fonts, and renders the clone using html2canvas at a scale of three. The canvas is flattened onto a white background, converted to JPEG data, and inserted into a jsPDF document. If the content is taller than one A4 page, the canvas is sliced into page-sized sections and added as multiple PDF pages.

## 3.3 Implementation Details

### 3.3.1 Invoice data model

The central interface is `InvoiceData`. It contains the following groups of information:

- **Identity:** id, invoice number, created date, due date, and status.
- **Company:** name, email, address, phone, website, logo, and tagline.
- **Client:** name, email, address, and phone.
- **Items:** an array of `LineItem` objects.
- **Calculations:** currency, subtotal, tax rate, tax amount, discount type, discount value, discount amount, total, rounding, amount paid, and balance due.
- **Payment:** bank name, account number, account name, bank details, and UPI ID.
- **Presentation:** template, brand color, text color, signature and payment visibility, QR-code option, and signature image.
- **Additional content:** notes and terms.

This model provides a single source of truth. It also permits the same data to be saved, rendered in several templates, and reused by the PDF and sharing features.

### 3.3.2 Initial invoice creation

The `createEmptyInvoice` function supplies safe defaults. It generates a unique id and invoice number, sets the creation date to the current date, and sets the due date thirty days later. It creates one empty item with quantity one and unit price zero. The default currency is USD, the default template is Modern, the default tax and discount values are zero, payment information is visible, and the default terms state that payment is due within thirty days of the invoice date.

These defaults reduce the amount of empty state the user sees and allow the preview to render immediately. The user can replace all business-specific values before exporting.

### 3.3.3 State management with `useInvoice`

The custom `useInvoice` hook wraps React state and exposes operations used by the page. The update functions use functional state updates so that each change is based on the latest invoice object. The hook contains separate operations for updating normal invoice fields, updating nested payment information, updating a line item, adding an item, removing an item, setting the currency, setting the template, saving, and resetting.

The calculation function is called when quantity, unit price, tax rate, discount type, discount value, rounding, or amount paid changes. This keeps derived fields synchronized with user input. The preview does not recalculate totals independently; it displays the values prepared by the hook.

### 3.3.4 Calculation algorithm

The calculation algorithm can be represented by the following pseudocode:

```text
subtotal = sum(item.quantity * item.unitPrice for every item)

if discountType is percentage:
    discountAmount = subtotal * discountValue / 100
else:
    discountAmount = discountValue

afterDiscount = subtotal - discountAmount
taxAmount = afterDiscount * taxRate / 100
rawTotal = afterDiscount + taxAmount

if rounding is up:
    total = ceiling(rawTotal)
else if rounding is down:
    total = floor(rawTotal)
else:
    total = rawTotal

balanceDue = total - amountPaid
```

The line total is updated at the time the quantity or unit price field changes. The main totals are then calculated from all line totals. This approach ensures that the values shown in the calculation panel and the values printed in the preview are identical.

### 3.3.5 Currency handling

Currency is stored as an object containing code, symbol, and name. The calculation values remain numbers, while formatting is applied only for display. The formatter uses the selected symbol and displays two decimal places. This makes the same logic usable for dollars, pounds, euros, rupees, yen, Canadian dollars, Australian dollars, and Swiss francs.

### 3.3.6 Template selection

The invoice preview uses conditional selection based on the template value. When the user selects Modern, the ModernTemplate component is rendered; the same pattern is used for the remaining templates. Each template is passed `invoice`, `formatCurrency`, and `formatDate`. Shared values such as item rows and totals are therefore consistent while layout and visual treatment vary.

The templates use conditional sections for values that may be empty. For example, a QR code is shown only if the QR option is enabled and a UPI ID exists. A signature area is shown only when the signature option is enabled. This prevents blank boxes from appearing in the exported invoice.

### 3.3.7 UPI QR-code implementation

When payment information contains a UPI ID, the QR module builds a UPI URI in the following form:

```text
upi://pay?pa=VPA&pn=BUSINESS_NAME&am=AMOUNT&tn=INVOICE_NUMBER&cu=CURRENCY
```

The values are URL encoded before being passed to `QRCodeSVG`. The QR code can include the company logo in its center when a logo is available. The invoice amount and number are embedded as payment context, helping the customer identify the transaction.

### 3.3.8 LocalStorage and autosave

The browser's LocalStorage is used for a single draft under the key `invoice_draft`. The hook attempts to read this value when the page loads. Date fields are restored as `Date` objects, and the payment object is merged with default payment fields to avoid missing nested values. The current invoice is saved after a short delay following changes and again at a thirty-second interval. The header communicates whether a save is in progress or when the latest save completed.

LocalStorage is intentionally simple and suitable for a small client-side tool. It avoids the need for account management and reduces privacy concerns. Its limitation is that the draft is tied to the current browser profile and is not synchronized across devices.

### 3.3.9 Responsive interface

On desktop screens, the editor and preview appear as two columns and the preview remains sticky while the user works. The editor provides a segmented navigation control for Details, Items, and Settings. On mobile screens, the editor and preview are separated by a segmented Editor/Preview switcher, and a bottom action bar shows the total and provides the PDF action. Inputs and buttons use touch-friendly heights and responsive spacing.

### 3.3.10 PDF export implementation

The export routine first clones the preview element so that export-specific changes do not disturb the visible interface. UI-only buttons and tooltip roles are removed from the clone. The clone is assigned an A4 width of 794 pixels and a minimum height of 1123 pixels, which corresponds to A4 dimensions at 96 DPI. Computed styles are copied recursively to the clone so that Tailwind classes and CSS variables remain available to html2canvas.

The canvas is rendered at scale three to improve text and line sharpness. A white background is painted before the rendered image is drawn to avoid transparency artifacts. jsPDF is initialized in portrait A4 mode. The routine calculates how many A4 pages the canvas covers, creates a page canvas for each slice, adds the slice to the PDF, sets document metadata, sanitizes the invoice number for the filename, and downloads the result. The clone is removed from the document after export even if an error occurs.

### 3.3.11 User feedback and error handling

Toast notifications are used to tell the user when a PDF has been downloaded, shared, or when an export fails. The PDF action displays a loading state while the image is being rendered. The new-invoice action asks for confirmation before clearing the current draft. If LocalStorage contains invalid JSON, the hook catches the error and creates a new invoice instead of preventing the application from loading.

### 3.3.12 Testing approach

The implementation can be verified with the following test cases:

| Test case | Expected result |
|---|---|
| Open the application for the first time | A blank invoice with an invoice number and one item row is shown. |
| Enter quantity and unit price | The line total, subtotal, and preview update immediately. |
| Add and remove line items | New rows are added and totals reflect the remaining rows. |
| Apply percentage discount | The discount is calculated as a percentage of the subtotal. |
| Apply fixed discount | The fixed amount is subtracted from the subtotal. |
| Enter a tax rate | Tax is calculated on the post-discount amount. |
| Select round up or round down | The total changes to the selected integer value and shows an adjustment. |
| Enter amount paid | Balance due equals total minus amount paid. |
| Change currency | Currency code and symbol change in the editor and preview. |
| Select each template | The same invoice data appears in the selected layout. |
| Enable payment QR with a UPI ID | A scan-to-pay QR code appears on the invoice. |
| Enable payment QR without a UPI ID | No invalid QR code is rendered. |
| Reload the page after editing | The saved draft is restored from LocalStorage. |
| Export an invoice | An A4 PDF is downloaded with the selected layout. |
| Add many line items | The PDF export creates additional pages when required. |
| Use the mobile layout | Editor/preview controls and the floating PDF action remain usable. |

### 3.3.13 Security and privacy considerations

The application does not need an account for the core workflow and does not send invoice details to a project database. Data is held in React memory and saved locally in the browser. This reduces the amount of sensitive client information handled by external services. Nevertheless, the browser device remains responsible for protecting its LocalStorage, and users should not use a shared computer without clearing saved drafts. A production version should also apply strict validation, safe file-size limits for images, and a clear privacy policy.

### 3.3.14 Build and deployment

The project is configured as a Vite React TypeScript application. During development, the Vite development server provides hot module replacement. The production build command compiles and bundles the source files into deployable static assets. Because the main functionality is client-side, the generated application can be hosted on a static web host. Hash-based routing allows the main routes to work without server-side route rewriting in a basic static deployment.

### 3.3.15 Suggested figures and screenshots for the report

The Chapter 3 file covers a long page range. Add screenshots from the running project at the following points so that the implementation can be verified visually and the page range remains balanced:

- **Figure 3.1: System architecture and data flow.** Draw the flow shown in Section 3.1, including the user, React editor, `useInvoice` state, LocalStorage, preview templates, QR code, and PDF export path.
- **Figure 3.2: InvoiceCraft landing/editor screen.** Capture the header, project name, Details/Items/Settings navigation, and the company/client form cards.
- **Figure 3.3: Line-item and calculation screen.** Capture multiple items, quantity, unit price, currency, tax, discount, subtotal, total, and balance due.
- **Figure 3.4: Settings and template selection.** Capture the template cards, brand-color controls, payment information, QR-code option, signature option, notes, and terms.
- **Figure 3.5: Live invoice preview.** Capture one selected template containing the company logo or initial, client details, item table, totals, payment section, and optional QR code.
- **Figure 3.6: Responsive mobile view.** Capture the Editor/Preview switcher and the floating PDF action bar on a narrow screen.
- **Figure 3.7: Exported PDF result.** Open the downloaded PDF and capture the A4 invoice page. If a long invoice is used, capture the continuation page to demonstrate multi-page output.

Under every image, add a short explanation of what the figure proves. For example: “Figure 3.5 shows that the invoice preview is updated from the same data entered in the editor. The company details, item values, calculations, branding, and payment information are rendered without a separate manual formatting step.” Do not insert screenshots that contain real personal, client, bank, or payment information; use sample data for the report.

---

# CHAPTER 4 CONCLUSION

## 4.1 Conclusion

InvoiceCraft successfully demonstrates the design and implementation of a modern client-side invoice generation application. The project converts a repetitive document-preparation task into a guided workflow with clear sections for company data, client data, line items, calculations, payment information, and visual customization. The use of a shared typed invoice model ensures that the values entered in the editor remain synchronized with the live preview and the exported PDF.

The automatic calculation logic reduces common arithmetic mistakes by computing line totals, subtotal, discount, tax, rounding adjustment, total, amount paid, and balance due from the current invoice state. Support for multiple currencies, tax labels, HSN/SAC codes, payment details, UPI QR codes, notes, terms, and signatures makes the application suitable for a range of freelancers and small businesses. Multiple templates let users produce an invoice that is not only correct but also visually appropriate for their brand.

React and TypeScript were suitable for this project because the interface contains many related but reusable controls. The `useInvoice` hook keeps domain logic in one place, while separate components reduce the complexity of the main page. Tailwind CSS and Radix-based UI components support responsive interaction and consistent styling. html2canvas and jsPDF provide a practical browser-only PDF workflow, including high-resolution rendering and multiple-page handling.

The privacy-focused LocalStorage approach allows the user to work without registration and without a server-side database. It also creates a clear limitation: saved data remains tied to the current browser and device. The project therefore meets the scope of a lightweight invoice generator but does not replace a complete accounting, inventory, customer-management, or tax-filing system.

Overall, the project achieves its main objective of providing a simple, customizable, and responsive way to create professional invoices. It also establishes a maintainable foundation for future features such as cloud synchronization, invoice history, stronger validation, and business reporting.

---

# CHAPTER 5 FUTURE ENHANCEMENT

## 5.1 Future Enhancement

Although InvoiceCraft meets the main requirements of a client-side invoice generator, several enhancements can make it more useful for regular business operations.

### 1. Optional cloud synchronization and authentication

An optional account system could allow users to synchronize invoices between devices. Cloud storage would make it possible to recover drafts after a browser reset and to access invoices from a phone and a computer. Because invoices may contain personal and financial information, this feature should use secure authentication, encryption in transit, access control, and a clear data-retention policy. Local-only mode should remain available for users who prefer maximum privacy.

### 2. Invoice history and search

The current design focuses on the active draft. A future version could maintain a list of created invoices with invoice number, client name, date, total, status, and balance due. Search, sorting, filtering, duplicate-invoice, archive, and delete actions would help users manage recurring billing. The existing status type can support values such as draft, sent, paid, and overdue.

### 3. Stronger validation and tax support

Validation can be improved by adding a schema for required fields, valid email addresses, non-negative quantities, non-negative prices, reasonable discount ranges, and due-date rules. For Indian businesses, future versions could add GSTIN validation, separate CGST/SGST/IGST fields, place of supply, reverse-charge indication, invoice serial rules, and more detailed HSN/SAC handling. Tax behavior should remain configurable because legal requirements differ by jurisdiction.

### 4. Product and client management

Users often repeat the same client and service information. A reusable client directory and product/service catalog could provide autocomplete suggestions, default prices, tax rates, and HSN/SAC values. This would reduce repeated typing and improve consistency across invoices.

### 5. Improved document sharing

The application can be extended with a backend email service, scheduled reminders, downloadable invoice links, and integrations with communication platforms. Such features should be opt-in and should make it clear when invoice data leaves the browser. A status update could be recorded when the invoice is sent or when a payment is marked as received.

### 6. Additional export formats

Future versions could export CSV or Excel data for accounting, print a receipt format, generate a quotation or pro-forma invoice, and provide a reusable custom template builder. Accessibility tags, selectable PDF text, improved page headers, and repeated table headers on long invoices would further improve document quality.

### 7. Analytics and business insights

With user permission, an optional dashboard could show monthly billing, unpaid balances, tax totals, client-wise revenue, and overdue invoices. Analytics should be separated from the local-only invoice workflow so that users can choose whether to share data.

### 8. Testing, accessibility, and performance improvements

Automated unit tests can cover calculation formulas and state updates. Component tests can verify item editing, template selection, and conditional sections. End-to-end tests can verify PDF export in supported browsers. Future work should also audit keyboard navigation, screen-reader labels, color contrast, reduced-motion behavior, large logo handling, image file size, and rendering performance for invoices with many line items.

The future roadmap should preserve the project's main strengths: a short creation workflow, clear preview, professional output, responsive design, and user control over where invoice data is stored.

---

# Final field checklist

- Replace student, enrollment, guide, and date placeholders.
- Replace the certificate signature placeholders with the correct names and signatures.
- Insert the project screenshots or architecture diagram requested by the department.
- Update the table-of-contents page numbers after final formatting.
- Verify the page count after inserting screenshots, because images can move later sections.
- Replace “Summer Internship / Mini Project” with the exact project type required by the department.
- Verify any claims about GST compliance with your guide before submission; the application provides GST-related fields, but tax compliance depends on the user's business and jurisdiction.
