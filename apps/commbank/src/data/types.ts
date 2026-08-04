export type ProductCategory =
  | "Bank accounts"
  | "Credit cards"
  | "Home loans"
  | "Personal loans"
  | "Insurance"
  | "Investing & Super"
  | "Business";

export type ProductRate = {
  label: string;
  value: string;
  note?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  summary: string;
  headline?: { value: string; label: string };
  features: string[];
  rates: ProductRate[];
  fees: ProductRate[];
  bestFor: string;
  ctaLabel: string;
  disclosures: string[];
};

export type FaqCategory =
  | "Bank accounts"
  | "Cards"
  | "Home loans"
  | "Digital banking"
  | "Insurance"
  | "Business"
  | "Security";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

export type BranchType = "Branch" | "ATM" | "Business centre";

export type Branch = {
  id: string;
  name: string;
  type: BranchType;
  address: string;
  suburb: string;
  state: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
  postcode: string;
  hours: string;
  services: string[];
};

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category: "Newsroom" | "Economic insights" | "Security" | "Community";
  published: string;
  author: string;
  readMinutes: number;
  body: string[];
};

export type AccountKind = "transaction" | "savings" | "credit" | "home-loan" | "term-deposit";

export type Account = {
  id: string;
  name: string;
  kind: AccountKind;
  bsb: string;
  number: string;
  balance: number;
  available: number;
  interestRate?: number;
  creditLimit?: number;
};

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  merchant: string;
  category:
    | "Groceries"
    | "Transport"
    | "Eating out"
    | "Utilities"
    | "Health"
    | "Income"
    | "Transfers"
    | "Home"
    | "Entertainment"
    | "Education";
  amount: number;
  pending?: boolean;
};

export type CardStatus = "active" | "locked";

export type PaymentCard = {
  id: string;
  name: string;
  network: "Mastercard" | "Debit Mastercard";
  pan: string;
  expiry: string;
  linkedAccountId: string;
  status: CardStatus;
  awardsPoints?: number;
};

export type YelloTier = {
  name: "Base" | "Plus" | "Gold" | "Diamond";
  requirement: string;
  benefits: string[];
  annualValue: string;
};
