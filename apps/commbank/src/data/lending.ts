export type PersonalLoanProduct = {
  id: string;
  name: string;
  tagline: string;
  rateFrom: number;
  comparisonRate: number;
  amountRange: string;
  termRange: string;
  features: string[];
  badge?: string;
};

export const personalLoans: PersonalLoanProduct[] = [
  {
    id: "fixed-rate-personal-loan",
    name: "Fixed Rate Personal Loan",
    tagline: "Certainty with the same repayment every time",
    rateFrom: 8.99,
    comparisonRate: 9.86,
    amountRange: "$4,000 – $50,000",
    termRange: "1 – 7 years",
    features: [
      "A fixed rate for the life of the loan, so repayments never change",
      "Choose weekly, fortnightly or monthly repayments",
      "Funds usually available the same day once approved",
      "$150 establishment fee and $10 monthly loan service fee",
    ],
    badge: "Most popular",
  },
  {
    id: "variable-rate-personal-loan",
    name: "Variable Rate Personal Loan",
    tagline: "Extra repayments with no early repayment fee",
    rateFrom: 12.99,
    comparisonRate: 13.86,
    amountRange: "$4,000 – $50,000",
    termRange: "1 – 7 years",
    features: [
      "Make additional repayments at any time with no early repayment fee",
      "Redraw the extra you've paid if you need it",
      "Repayment amounts can change if the rate changes",
      "$150 establishment fee and $10 monthly loan service fee",
    ],
  },
  {
    id: "secured-car-loan",
    name: "Secured Car Loan",
    tagline: "A lower rate when you secure the loan against your car",
    rateFrom: 7.49,
    comparisonRate: 8.31,
    amountRange: "$4,000 – $100,000",
    termRange: "1 – 7 years",
    features: [
      "A lower rate because the loan is secured by the vehicle",
      "For new and used cars up to 7 years old at the end of the term",
      "$100 cashback when you find and finance your car through CommBank",
      "Fixed repayments for the life of the loan",
    ],
    badge: "Lowest rate",
  },
  {
    id: "personal-overdraft",
    name: "Personal Overdraft",
    tagline: "A safety net linked to your everyday account",
    rateFrom: 14.55,
    comparisonRate: 14.55,
    amountRange: "$500 – $20,000",
    termRange: "Ongoing",
    features: [
      "Linked to your everyday account for when the balance runs low",
      "Only pay interest on the amount you use",
      "No fixed repayment schedule",
      "Manage your limit in NetBank",
    ],
  },
];

export type BusinessProduct = {
  id: string;
  name: string;
  category: "Bank accounts" | "Merchant services" | "Loans & finance";
  tagline: string;
  description: string;
  highlights: string[];
  priceLabel: string;
};

export const businessProducts: BusinessProduct[] = [
  {
    id: "transaction-account",
    name: "Business Transaction Account",
    category: "Bank accounts",
    tagline: "Award-winning everyday business banking",
    description:
      "The everyday account for your business, with a $0 monthly account fee option and same-day settlement when linked to a CommBank terminal.",
    highlights: [
      "$0 monthly account fee option",
      "Unlimited electronic transactions",
      "Same-day EFTPOS settlement when linked to a CommBank terminal",
      "Manage business and personal profiles in one CommBank app login",
    ],
    priceLabel: "From $0 / month",
  },
  {
    id: "online-saver",
    name: "Business Online Saver",
    category: "Bank accounts",
    tagline: "Put idle cash to work",
    description:
      "An online savings account for business funds you don't need day to day, with no monthly account fee.",
    highlights: [
      "No monthly account fee",
      "Instant transfers to your Business Transaction Account",
      "Interest calculated daily, paid monthly",
      "No minimum balance",
    ],
    priceLabel: "3.85% p.a. variable",
  },
  {
    id: "savings",
    name: "Business Term Deposits",
    category: "Bank accounts",
    tagline: "A fixed return on surplus cash",
    description:
      "Lock away business cash for a fixed term and a fixed rate, from 1 month to 5 years.",
    highlights: [
      "Fixed rate for the full term",
      "Terms from 1 month to 5 years",
      "Balances from $5,000",
      "Choose your interest payment frequency",
    ],
    priceLabel: "Up to 5.05% p.a.",
  },
  {
    id: "eftpos",
    name: "Smart EFTPOS terminal",
    category: "Merchant services",
    tagline: "Wireless payments with POS integration",
    description:
      "Accept fast and secure payments with the wireless Smart terminal. Use it standalone or integrate with one of 110+ POS systems.",
    highlights: [
      "Same-day settlement with a linked Business Transaction Account",
      "Dual SIM (Telstra and Optus) so you can switch networks during an outage",
      "Surcharging, tipping and digital receipts",
      "Real-time transaction data in your merchant portal",
    ],
    priceLabel: "From $29.50 / month",
  },
  {
    id: "ecommerce",
    name: "Take payments online",
    category: "Merchant services",
    tagline: "Sell online with a hosted checkout",
    description:
      "Accept card payments on your website with a hosted checkout page or integrate with your existing platform.",
    highlights: [
      "Accepts all major card schemes and digital wallets",
      "Hosted checkout or API integration",
      "Fraud screening included",
      "Settle to your Business Transaction Account",
    ],
    priceLabel: "1.10% + 20c per transaction",
  },
  {
    id: "betterbusiness-loan",
    name: "BetterBusiness Loan",
    category: "Loans & finance",
    tagline: "Fund your next stage of growth",
    description:
      "A flexible term loan for buying equipment, expanding premises or investing in your business.",
    highlights: [
      "Fixed or variable rate options",
      "Secured and unsecured options",
      "Terms up to 30 years when secured by property",
      "Interest-only periods available",
    ],
    priceLabel: "From 7.29% p.a.",
  },
  {
    id: "business-overdraft",
    name: "Business Overdraft",
    category: "Loans & finance",
    tagline: "Short-term cash flow, ready when you need it",
    description:
      "A cash flow facility linked to your Business Transaction Account that you can draw on up to an approved limit.",
    highlights: [
      "Unsecured limits from $2,000 to $250,000",
      "Only pay interest on what you use",
      "No regular fixed repayments",
      "Eligible customers can be conditionally approved in under 10 minutes",
    ],
    priceLabel: "From 10.85% p.a.",
  },
  {
    id: "equipment-finance",
    name: "Car & equipment finance",
    category: "Loans & finance",
    tagline: "Finance the assets your business runs on",
    description:
      "Chattel mortgage, hire purchase and equipment leases for vehicles, machinery and technology.",
    highlights: [
      "Fixed rates and fixed repayments",
      "Terms from 1 to 7 years",
      "Potential tax benefits — speak to your accountant",
      "Finance new or used assets",
    ],
    priceLabel: "From 6.95% p.a.",
  },
];

export const businessCategories = [
  "All",
  "Bank accounts",
  "Merchant services",
  "Loans & finance",
] as const;
export type BusinessCategory = (typeof businessCategories)[number];
