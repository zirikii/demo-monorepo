export type RateRow = {
  product: string;
  rate: string;
  comparison?: string;
  note?: string;
};

export type RateTableGroup = {
  id: string;
  title: string;
  caption?: string;
  rows: RateRow[];
};

export const homeLoanRates: RateTableGroup[] = [
  {
    id: "owner-occupied-variable",
    title: "Owner occupied — variable rates",
    caption: "Rates for new borrowings. Principal and Interest repayments unless stated.",
    rows: [
      { product: "Digi Home Loan", rate: "5.89% p.a.", comparison: "6.01% p.a." },
      { product: "Simple Home Loan", rate: "5.99% p.a.", comparison: "6.05% p.a." },
      {
        product: "Standard Variable Rate with Wealth Package (LVR 60% or below)",
        rate: "5.94% p.a.",
        comparison: "6.33% p.a.",
      },
      {
        product: "Standard Variable Rate with Wealth Package (LVR 60.01%–70%)",
        rate: "6.04% p.a.",
        comparison: "6.43% p.a.",
      },
      {
        product: "Standard Variable Rate with Wealth Package (LVR 70.01%–80%)",
        rate: "6.14% p.a.",
        comparison: "6.53% p.a.",
      },
      {
        product: "Standard Variable Rate (no package)",
        rate: "7.79% p.a.",
        comparison: "7.92% p.a.",
      },
    ],
  },
  {
    id: "owner-occupied-fixed",
    title: "Owner occupied — fixed rates",
    caption:
      "With the Wealth Package. Reverts to the applicable Standard Variable Rate at the end of the term.",
    rows: [
      { product: "1 year fixed", rate: "5.29% p.a.", comparison: "7.42% p.a." },
      { product: "2 year fixed", rate: "4.99% p.a.", comparison: "7.24% p.a." },
      { product: "3 year fixed", rate: "5.19% p.a.", comparison: "7.06% p.a." },
      { product: "4 year fixed", rate: "5.59% p.a.", comparison: "6.93% p.a." },
      { product: "5 year fixed", rate: "5.69% p.a.", comparison: "6.81% p.a." },
    ],
  },
  {
    id: "investment",
    title: "Investment — variable rates",
    caption: "Rates for new investment borrowings.",
    rows: [
      { product: "Digi Home Loan", rate: "6.14% p.a.", comparison: "6.26% p.a." },
      { product: "Simple Home Loan", rate: "6.24% p.a.", comparison: "6.30% p.a." },
      {
        product: "Standard Variable Rate with Wealth Package (LVR 60% or below)",
        rate: "6.19% p.a.",
        comparison: "6.58% p.a.",
      },
      {
        product: "Standard Variable Rate with Wealth Package (LVR 70.01%–80%)",
        rate: "6.39% p.a.",
        comparison: "6.78% p.a.",
      },
    ],
  },
];

export const savingsRates: RateTableGroup[] = [
  {
    id: "savings",
    title: "Savings accounts",
    rows: [
      {
        product: "NetBank Saver — introductory (first 5 months)",
        rate: "5.20% p.a.",
        note: "Includes a 3.10% p.a. fixed bonus margin",
      },
      { product: "NetBank Saver — standard variable", rate: "2.10% p.a." },
      {
        product: "GoalSaver — with bonus interest",
        rate: "4.35% p.a.",
        note: "Conditions apply each month",
      },
      { product: "GoalSaver — standard", rate: "0.40% p.a." },
      { product: "Youthsaver — with bonus interest", rate: "4.15% p.a." },
      { product: "Pensioner Security Account", rate: "1.85% p.a." },
    ],
  },
  {
    id: "term-deposits",
    title: "Term Deposits",
    caption: "Rates for deposits of $5,000 to under $2 million, interest paid at maturity.",
    rows: [
      { product: "3 months", rate: "3.85% p.a." },
      { product: "6 months", rate: "4.10% p.a." },
      { product: "12 months", rate: "4.35% p.a." },
      { product: "18 months (special)", rate: "4.68% p.a." },
      { product: "24 months", rate: "4.20% p.a." },
      { product: "60 months", rate: "3.95% p.a." },
    ],
  },
];

export const cardAndLoanRates: RateTableGroup[] = [
  {
    id: "credit-cards",
    title: "Credit cards",
    rows: [
      { product: "Awards Credit Card — purchases", rate: "20.99% p.a.", note: "$59 annual fee" },
      {
        product: "Ultimate Awards — purchases",
        rate: "20.99% p.a.",
        note: "$35 monthly fee, rebated with $4,000 spend",
      },
      { product: "Low Fee — purchases", rate: "20.99% p.a.", note: "$29 annual fee" },
      { product: "Low Rate — purchases", rate: "13.49% p.a.", note: "$59 annual fee" },
      { product: "All cards — cash advances", rate: "21.99% p.a." },
    ],
  },
  {
    id: "personal-loans",
    title: "Personal and car loans",
    rows: [
      {
        product: "Secured Car Loan — low emission vehicle",
        rate: "6.99% p.a.",
        comparison: "7.93% p.a.",
      },
      { product: "Secured Car Loan — standard", rate: "7.49% p.a.", comparison: "8.44% p.a." },
      { product: "Unsecured Personal Loan — fixed", rate: "9.49% p.a.", comparison: "10.42% p.a." },
      {
        product: "Unsecured Personal Loan — variable",
        rate: "12.99% p.a.",
        comparison: "13.91% p.a.",
      },
    ],
  },
];

export type ForeignRate = {
  code: string;
  currency: string;
  rate: number;
};

/** Static indicative board rates — 1 AUD buys this much of the target currency. */
export const foreignExchangeRates: ForeignRate[] = [
  { code: "USD", currency: "United States Dollar", rate: 0.657 },
  { code: "EUR", currency: "Euro", rate: 0.601 },
  { code: "GBP", currency: "British Pound", rate: 0.512 },
  { code: "NZD", currency: "New Zealand Dollar", rate: 1.086 },
  { code: "JPY", currency: "Japanese Yen", rate: 99.42 },
  { code: "SGD", currency: "Singapore Dollar", rate: 0.874 },
  { code: "HKD", currency: "Hong Kong Dollar", rate: 5.118 },
  { code: "THB", currency: "Thai Baht", rate: 22.86 },
  { code: "IDR", currency: "Indonesian Rupiah", rate: 10485 },
  { code: "CAD", currency: "Canadian Dollar", rate: 0.905 },
  { code: "CHF", currency: "Swiss Franc", rate: 0.573 },
  { code: "CNY", currency: "Chinese Yuan", rate: 4.723 },
  { code: "INR", currency: "Indian Rupee", rate: 55.18 },
  { code: "VND", currency: "Vietnamese Dong", rate: 16720 },
  { code: "AED", currency: "UAE Dirham", rate: 2.413 },
  { code: "FJD", currency: "Fijian Dollar", rate: 1.472 },
];

export const feeSchedule: RateTableGroup[] = [
  {
    id: "everyday-fees",
    title: "Everyday banking fees",
    rows: [
      {
        product: "Smart Access monthly account fee",
        rate: "$4.00",
        note: "Waived with $2,000+ deposited each month",
      },
      { product: "CommBank ATM withdrawal", rate: "$0.00" },
      { product: "Other Australian ATM withdrawal", rate: "$2.50" },
      { product: "Overseas ATM withdrawal", rate: "$5.00 + 3.40%" },
      { product: "International transaction fee", rate: "3.40%" },
      { product: "Bank cheque", rate: "$10.00" },
    ],
  },
  {
    id: "payment-fees",
    title: "Payments and transfers",
    rows: [
      { product: "PayID and Osko payments", rate: "$0.00" },
      { product: "BPAY payments", rate: "$0.00" },
      { product: "International Money Transfer in AUD", rate: "$6.00" },
      { product: "International Money Transfer in foreign currency", rate: "$0.00" },
      { product: "Dishonoured payment", rate: "$5.00" },
    ],
  },
];
