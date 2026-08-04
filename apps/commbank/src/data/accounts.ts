export type ProductHighlight = { label: string; value: string };

export type BankProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  headlineRate?: string;
  headlineLabel?: string;
  monthlyFee: string;
  features: string[];
  highlights: ProductHighlight[];
  badge?: string;
};

export const everydayAccounts: BankProduct[] = [
  {
    id: "smart-access",
    name: "Everyday Account Smart Access",
    tagline: "Our most popular everyday account",
    description:
      "Day-to-day banking with a Debit Mastercard, digital wallets and cashback offers through CommBank Yello.",
    monthlyFee: "$4 monthly account fee",
    headlineRate: "$0",
    headlineLabel: "Monthly fee when you deposit $2,000 a month or are under 30",
    features: [
      "No monthly account fee when you deposit $2,000 each calendar month, or if you're under 30",
      "Debit Mastercard with Apple Pay, Google Pay and Samsung Pay",
      "Cashback on your favourite brands with CommBank Yello shopping offers",
      "Link a NetBank Saver to earn interest on your savings",
      "Lock, Block, Alert card controls in the CommBank app",
    ],
    highlights: [
      { label: "Monthly account fee", value: "$4 (waivers apply)" },
      { label: "Interest rate", value: "This account doesn't earn interest" },
      { label: "ATM withdrawals", value: "$0 at CommBank ATMs" },
    ],
    badge: "Most popular",
  },
  {
    id: "complete-access",
    name: "Complete Access",
    tagline: "Full-service everyday banking",
    description:
      "An everyday account with over-the-counter services in branch, cheque access and unlimited electronic transactions.",
    monthlyFee: "$6 monthly account fee",
    features: [
      "Unlimited electronic transactions",
      "Branch and cheque access included",
      "Debit Mastercard and digital wallets",
      "Fee waivers for eligible pension recipients",
    ],
    highlights: [
      { label: "Monthly account fee", value: "$6 (waivers apply)" },
      { label: "Branch withdrawals", value: "Included" },
      { label: "Interest rate", value: "This account doesn't earn interest" },
    ],
  },
  {
    id: "streamline-basic",
    name: "Streamline Basic",
    tagline: "For eligible concession card holders",
    description:
      "A low-cost everyday account for customers receiving eligible Australian Government pensions or benefits.",
    monthlyFee: "$0 monthly account fee",
    features: [
      "No monthly account fee",
      "Debit Mastercard included",
      "Unlimited CommBank ATM withdrawals",
      "Eligibility criteria apply",
    ],
    highlights: [
      { label: "Monthly account fee", value: "$0" },
      { label: "Eligibility", value: "Concession card holders" },
      { label: "Interest rate", value: "This account doesn't earn interest" },
    ],
  },
  {
    id: "youthsaver",
    name: "Youthsaver",
    tagline: "For savers under 18",
    description:
      "A savings account for under 18s with bonus interest when the balance grows and no withdrawals are made.",
    monthlyFee: "$0 monthly account fee",
    headlineRate: "4.40% p.a.",
    headlineLabel: "Total variable rate with bonus interest",
    features: [
      "Bonus interest each month you grow the balance and make no withdrawals",
      "No monthly account fee",
      "Parents or guardians can operate the account",
      "Perfect for a first savings goal",
    ],
    highlights: [
      { label: "Standard variable rate", value: "0.25% p.a." },
      { label: "Bonus variable rate", value: "4.15% p.a." },
      { label: "Monthly account fee", value: "$0" },
    ],
    badge: "Under 18",
  },
];

export const savingsAccounts: BankProduct[] = [
  {
    id: "netbank-saver",
    name: "NetBank Saver",
    tagline: "Introductory rate for new savers",
    description:
      "An online savings account with a variable introductory rate for the first 5 months and instant access to your money.",
    monthlyFee: "$0 monthly account fee",
    headlineRate: "5.20% p.a.",
    headlineLabel: "Variable introductory rate when you open a NetBank Saver for the first time",
    features: [
      "Move money in and out when you need",
      "No minimum deposit required",
      "$0 monthly account fees",
      "Link to your everyday account for instant transfers",
    ],
    highlights: [
      { label: "Introductory rate", value: "5.20% p.a. for 5 months" },
      { label: "Standard variable rate", value: "2.10% p.a." },
      { label: "Minimum deposit", value: "$0" },
    ],
    badge: "Intro offer",
  },
  {
    id: "goalsaver",
    name: "GoalSaver",
    tagline: "Bonus interest for steady savers",
    description:
      "Earn bonus interest every calendar month you grow your balance, with no monthly account fees.",
    monthlyFee: "$0 monthly account fee",
    headlineRate: "5.00% p.a.",
    headlineLabel: "Total variable rate with bonus interest",
    features: [
      "Bonus interest when you grow your balance each month",
      "Designed to help you stay on track",
      "$0 monthly account fees",
      "Track progress against a savings goal in the CommBank app",
    ],
    highlights: [
      { label: "Standard variable rate", value: "0.25% p.a." },
      { label: "Bonus variable rate", value: "4.75% p.a." },
      { label: "Monthly account fee", value: "$0" },
    ],
  },
  {
    id: "term-deposit",
    name: "Term Deposits",
    tagline: "A fixed return, locked in",
    description:
      "Lock in a fixed interest rate for a term from 1 month to 5 years, with balances starting from $5,000.",
    monthlyFee: "$0 monthly account fee",
    headlineRate: "5.25% p.a.",
    headlineLabel: "For 12 months (special offer, limited time only)",
    features: [
      "Fixed return for peace of mind",
      "Flexible terms from 1 month up to 5 years",
      "Options for balances starting from $5,000",
      "Choose how often interest is paid",
    ],
    highlights: [
      { label: "12 month special", value: "5.25% p.a." },
      { label: "Minimum deposit", value: "$5,000" },
      { label: "Terms available", value: "1 month – 5 years" },
    ],
  },
];

export const termDepositRates = [
  { term: "3 months", rate: 4.35 },
  { term: "6 months", rate: 4.6 },
  { term: "9 months", rate: 4.75 },
  { term: "12 months", rate: 5.25 },
  { term: "2 years", rate: 4.4 },
  { term: "3 years", rate: 4.3 },
  { term: "5 years", rate: 4.25 },
];
