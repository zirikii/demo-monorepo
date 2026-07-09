export interface CreditCardOffer {
  id: string;
  name: string;
  network: string;
  annualFee: number;
  highlight: string;
  perks: string[];
  gradient: { from: string; to: string };
}

/** Fictional co-brand style card lineup for the demo. */
export const creditCards: CreditCardOffer[] = [
  {
    id: "cc-metal",
    name: "Skyline Metal Card",
    network: "Visa Infinite",
    annualFee: 2999,
    highlight: "5% back on travel bookings",
    perks: ["Airport lounge access 8x/yr", "Milestone bonus of 10,000 points", "Zero forex markup weekends"],
    gradient: { from: "#0f1b3d", to: "#27408b" },
  },
  {
    id: "cc-cashback",
    name: "Everyday Cashback Card",
    network: "RuPay",
    annualFee: 0,
    highlight: "Flat 2% cashback on UPI spends",
    perks: ["Lifetime free", "Instant virtual card", "Auto bill-pay rewards"],
    gradient: { from: "#003a63", to: "#00baf2" },
  },
  {
    id: "cc-shop",
    name: "ShopMore Platinum",
    network: "Mastercard",
    annualFee: 499,
    highlight: "10x points at partner stores",
    perks: ["Quarterly shopping vouchers", "No-cost EMI on 3+ months", "Fuel surcharge waiver"],
    gradient: { from: "#5b247a", to: "#1bcedf" },
  },
  {
    id: "cc-fuel",
    name: "Highway Fuel Card",
    network: "Visa",
    annualFee: 199,
    highlight: "6% value back on fuel",
    perks: ["FASTag auto-reload rewards", "Roadside assistance", "1% off toll payments"],
    gradient: { from: "#232526", to: "#414345" },
  },
];

export interface InsuranceProduct {
  id: string;
  category: "Bike" | "Car" | "Health" | "Term Life" | "Travel";
  name: string;
  premiumFrom: number;
  premiumUnit: string;
  coverage: string;
  bullets: string[];
}

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: "ins-bike",
    category: "Bike",
    name: "Two-Wheeler Shield",
    premiumFrom: 482,
    premiumUnit: "/year",
    coverage: "Third-party + own damage",
    bullets: ["3-minute paperless renewal", "Cashless garages in 1,100+ cities", "Instant policy PDF"],
  },
  {
    id: "ins-car",
    category: "Car",
    name: "Comprehensive Car Cover",
    premiumFrom: 2094,
    premiumUnit: "/year",
    coverage: "IDV up to ₹50 Lakh",
    bullets: ["Zero-dep add-on available", "Same-day claim survey", "No-claim bonus transfer"],
  },
  {
    id: "ins-health",
    category: "Health",
    name: "Family Health Plus",
    premiumFrom: 612,
    premiumUnit: "/month",
    coverage: "₹5 Lakh – ₹1 Cr sum insured",
    bullets: ["Cover for 2 adults + 2 kids", "10,000+ network hospitals", "Free annual health check"],
  },
  {
    id: "ins-term",
    category: "Term Life",
    name: "Secure Term 1 Crore",
    premiumFrom: 549,
    premiumUnit: "/month",
    coverage: "₹1 Cr life cover to age 70",
    bullets: ["Optional critical-illness rider", "5-minute digital KYC", "Claim settlement assistance"],
  },
  {
    id: "ins-travel",
    category: "Travel",
    name: "International Trip Guard",
    premiumFrom: 299,
    premiumUnit: "/trip",
    coverage: "Medical + baggage + delays",
    bullets: ["Covers 150+ countries", "Flight-delay instant payout", "24x7 emergency helpline"],
  },
];

export interface LoanProduct {
  id: string;
  label: string;
  maxAmount: string;
  rateFrom: number;
  tenure: string;
}

export const loanProducts: LoanProduct[] = [
  { id: "pl-flexi", label: "Flexi Personal Loan", maxAmount: "₹10 Lakh", rateFrom: 10.5, tenure: "6–60 months" },
  { id: "pl-salary", label: "Salary Advance", maxAmount: "₹3 Lakh", rateFrom: 12.0, tenure: "3–24 months" },
  { id: "pl-merchant", label: "Merchant Business Loan", maxAmount: "₹25 Lakh", rateFrom: 11.25, tenure: "12–48 months" },
];

export interface GoldRate {
  metal: string;
  purity: string;
  buyPerGram: number;
  sellPerGram: number;
}

export const goldRates: GoldRate[] = [
  { metal: "Gold", purity: "24K 999.9", buyPerGram: 7284.5, sellPerGram: 7071.2 },
  { metal: "Silver", purity: "999", buyPerGram: 92.4, sellPerGram: 88.9 },
];

export interface MoneyProduct {
  id: string;
  label: string;
  blurb: string;
  stat: string;
  statLabel: string;
}

export const moneyProducts: MoneyProduct[] = [
  { id: "stocks", label: "Stocks", blurb: "Zero brokerage on delivery trades with live market depth.", stat: "₹20", statLabel: "flat per intraday order" },
  { id: "mf", label: "Mutual Funds", blurb: "Direct plans with 0% commission and instant SIP setup.", stat: "0%", statLabel: "commission on direct plans" },
  { id: "ipo", label: "IPO", blurb: "Apply in two taps with UPI mandate and allotment alerts.", stat: "2 taps", statLabel: "to apply via UPI" },
  { id: "fo", label: "Futures & Options", blurb: "Advanced option chain with Greeks and margin insights.", stat: "₹20", statLabel: "flat per F&O order" },
  { id: "nps", label: "Pension (NPS)", blurb: "Retirement corpus with extra tax deduction under 80CCD(1B).", stat: "₹50K", statLabel: "extra tax-deductible" },
  { id: "etf", label: "ETFs", blurb: "Diversify with index, gold, and global ETFs in one watchlist.", stat: "100+", statLabel: "listed ETFs to pick" },
];

export interface BusinessProduct {
  id: string;
  anchor: string;
  name: string;
  tagline: string;
  bullets: string[];
}

export const businessProducts: BusinessProduct[] = [
  {
    id: "qr",
    anchor: "qr",
    name: "Paytm QR",
    tagline: "Accept UPI payments straight to your bank, free forever.",
    bullets: ["Unlimited collections at 0% fee", "Instant voice alerts in app", "Settlements to any bank account"],
  },
  {
    id: "soundbox",
    anchor: "soundbox",
    name: "Soundbox",
    tagline: "Every payment announced aloud so you never miss a sale.",
    bullets: ["4W speaker with 11-language support", "5-day battery on one charge", "Works on 4G — no wifi needed"],
  },
  {
    id: "pos",
    anchor: "pos",
    name: "Card Machine",
    tagline: "All-in-one Android POS for cards, UPI, and EMI.",
    bullets: ["Accept cards, UPI, wallets", "Built-in billing software", "Same-day settlement option"],
  },
  {
    id: "gateway",
    anchor: "gateway",
    name: "Payment Gateway",
    tagline: "Checkout APIs trusted by India's fastest-growing sites.",
    bullets: ["100+ payment sources", "Industry-leading success rates", "Developer-first docs & SDKs"],
  },
];
