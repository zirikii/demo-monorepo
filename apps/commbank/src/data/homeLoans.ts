export type HomeLoanProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  variableRate: number;
  comparisonRate: number;
  offsetAccounts: string;
  features: string[];
  badge?: string;
};

export const homeLoanProducts: HomeLoanProduct[] = [
  {
    id: "digi-home-loan",
    name: "Digi Home Loan",
    tagline: "A low variable rate when you apply online",
    description:
      "A digital home loan with a low variable rate and access to one Everyday Offset account. Only available online.",
    variableRate: 5.59,
    comparisonRate: 5.6,
    offsetAccounts: "1 Everyday Offset account",
    features: [
      "A low variable rate when you apply online",
      "Earn up to 300,000 Qantas Points with a CommBank Digi Home Loan",
      "Unlimited additional repayments, with the ability to redraw",
      "Apply in minutes in the CommBank app and manage your loan online",
    ],
    badge: "Online only",
  },
  {
    id: "standard-variable-rate",
    name: "Standard Variable Rate",
    tagline: "Our most flexible variable rate loan",
    description:
      "A competitive variable rate home loan with discounts tailored to you, plus access to offset and an extensive range of features.",
    variableRate: 6.09,
    comparisonRate: 6.21,
    offsetAccounts: "Up to 99 Everyday Offset accounts",
    features: [
      "Save on interest by using up to 99 Everyday Offset accounts",
      "Complete flexibility with multiple repayment options",
      "Access to Wealth Package benefits including a discounted interest rate",
      "Split your loan between fixed and variable",
    ],
  },
  {
    id: "simple-home-loan",
    name: "Simple Home Loan",
    tagline: "A competitive rate with two offset accounts",
    description:
      "A simple home loan with a competitive variable rate and the choice to access two offset accounts.",
    variableRate: 5.84,
    comparisonRate: 5.91,
    offsetAccounts: "Up to 2 Everyday Offset accounts",
    features: [
      "Save on interest while linking up to two Everyday Offset accounts",
      "Unlimited additional repayments and redraws",
      "Option to make Interest Only payments",
      "Negotiate your rate with a Home Lending Specialist",
    ],
  },
  {
    id: "fixed-rate",
    name: "Fixed Rate home loan",
    tagline: "Lock in your rate for 1 to 5 years",
    description:
      "Fix your interest rate for a set term so your repayments stay the same, with the option to split with a variable rate loan.",
    variableRate: 5.49,
    comparisonRate: 6.02,
    offsetAccounts: "Not available while fixed",
    features: [
      "Certainty of repayments for 1 to 5 years",
      "Rate Lock available for a $750 fee",
      "Converts to the Standard Variable Rate at the end of the fixed period",
      "Wealth Package discounts available",
    ],
  },
];

export type RateRow = { label: string; rate: number; comparisonRate: number };

export const ownerOccupiedVariableRates: RateRow[] = [
  {
    label: "Standard Variable Rate with Wealth Package, LVR 60% or below",
    rate: 5.79,
    comparisonRate: 6.19,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 60.01% to 70%",
    rate: 5.84,
    comparisonRate: 6.24,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 70.01% to 80%",
    rate: 5.89,
    comparisonRate: 6.29,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 80.01% to 90%",
    rate: 6.24,
    comparisonRate: 6.64,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 90.01% to 95%",
    rate: 6.69,
    comparisonRate: 7.09,
  },
  { label: "Standard Variable Rate without package", rate: 7.55, comparisonRate: 7.7 },
];

export const investmentVariableRates: RateRow[] = [
  {
    label: "Standard Variable Rate with Wealth Package, LVR 60% or below",
    rate: 6.09,
    comparisonRate: 6.49,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 60.01% to 70%",
    rate: 6.14,
    comparisonRate: 6.54,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 70.01% to 80%",
    rate: 6.19,
    comparisonRate: 6.59,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 80.01% to 90%",
    rate: 6.54,
    comparisonRate: 6.92,
  },
  {
    label: "Standard Variable Rate with Wealth Package, LVR 90.01% to 95%",
    rate: 7.44,
    comparisonRate: 7.84,
  },
  { label: "Standard Variable Rate without package", rate: 7.85, comparisonRate: 8.0 },
];

export const ownerOccupiedFixedRates: RateRow[] = [
  { label: "1 year fixed rate (with Wealth Package)", rate: 5.49, comparisonRate: 6.72 },
  { label: "2 year fixed rate (with Wealth Package)", rate: 5.39, comparisonRate: 6.56 },
  { label: "3 year fixed rate (with Wealth Package)", rate: 5.44, comparisonRate: 6.43 },
  { label: "4 year fixed rate (with Wealth Package)", rate: 5.79, comparisonRate: 6.4 },
  { label: "5 year fixed rate (with Wealth Package)", rate: 5.89, comparisonRate: 6.38 },
];

export const investmentFixedRates: RateRow[] = [
  { label: "1 year fixed rate (with Wealth Package)", rate: 5.79, comparisonRate: 6.99 },
  { label: "2 year fixed rate (with Wealth Package)", rate: 5.69, comparisonRate: 6.86 },
  { label: "3 year fixed rate (with Wealth Package)", rate: 5.74, comparisonRate: 6.74 },
  { label: "4 year fixed rate (with Wealth Package)", rate: 6.09, comparisonRate: 6.71 },
  { label: "5 year fixed rate (with Wealth Package)", rate: 6.19, comparisonRate: 6.69 },
];

export const lifeStages = [
  {
    id: "first-home-buyer",
    title: "Buying your first home",
    description:
      "Awarded Canstar's Bank of the Year for First Home Buyers in 2025. Get help with government grants, schemes and low deposit options.",
    linkLabel: "First home buyer guide",
  },
  {
    id: "refinancing",
    title: "Refinancing your home",
    description:
      "Switch your loan to CommBank and see if you're eligible for a lower rate. Start online and track your application in the app.",
    linkLabel: "Refinance online",
  },
  {
    id: "investing",
    title: "Investing in property",
    description:
      "Investment home loans with interest-only options for up to 15 years and property insights when you connect with a lender.",
    linkLabel: "Investment loans",
  },
  {
    id: "next-home",
    title: "Buying your next home",
    description:
      "Bridging finance, guarantor support and property share arrangements to help you move into your next home.",
    linkLabel: "Next home options",
  },
];

export const homeLoanFaqs = [
  {
    question: "What is a home loan redraw facility?",
    answer:
      "Redraw lets you access any additional repayments you've made above your minimum repayment. You can redraw in NetBank or the CommBank app, subject to your loan's redraw limits.",
  },
  {
    question: "How is interest calculated on my home loan?",
    answer:
      "Interest is calculated daily on your outstanding loan balance and charged monthly. Any money sitting in a linked Everyday Offset account reduces the balance interest is calculated on.",
  },
  {
    question: "How long will my home loan application take?",
    answer:
      "Eligible customers applying online can receive conditional approval in as little as 10 minutes. Full approval depends on valuation and verification of your documents.",
  },
  {
    question: "What is the Wealth Package?",
    answer:
      "For a non-refundable $395 annual fee, the Wealth Package gives you interest rate discounts on eligible home loans and a fee waiver on one eligible credit card.",
  },
];
