import type { FeatureBenefit, InvestmentMenu } from "./types";

/** The marketing site frames platform capability as "10 ways to drive productivity". */
export const FEATURE_BENEFITS: FeatureBenefit[] = [
  {
    number: 1,
    title: "Broad investment choice",
    body: "Managed portfolios, managed funds, ASX and international listed securities, term deposits, annuities and insurance across three investment menus.",
    icon: "layers",
  },
  {
    number: 2,
    title: "Innovative managed portfolio functionality",
    body: "Substitutions, exclusions and client-level tax parcel selection let you tailor a model without leaving it.",
    icon: "chart",
  },
  {
    number: 3,
    title: "Portfolio tax optimisation",
    body: "Estimate, model and tailor tax outcomes before you trade, including pre-trade CGT impacts for each client account.",
    icon: "receipt",
  },
  {
    number: 4,
    title: "Straight-through account opening",
    body: "Online applications with straight-through processing get new clients invested in days rather than weeks.",
    icon: "gauge",
  },
  {
    number: 5,
    title: "Digital advice fee consent",
    body: "Consent, renewal and fee disclosure handled online to support your regulatory obligations.",
    icon: "shield",
  },
  {
    number: 6,
    title: "Same-day super strategies",
    body: "Frequently used strategies, including super-to-pension transfers and benefit payments, processed the same day.",
    icon: "clock",
  },
  {
    number: 7,
    title: "Consolidated reporting with Engage",
    body: "Custodial and non-custodial data combined into interactive, brandable client presentations.",
    icon: "sparkles",
  },
  {
    number: 8,
    title: "Family group aggregation",
    body: "View a client's position across a single account or aggregated across a family group of entities.",
    icon: "users",
  },
  {
    number: 9,
    title: "E-signature flexibility",
    body: "Submit request forms through myprosperity, DocuSign, AdobeSign or Annature.",
    icon: "plug",
  },
  {
    number: 10,
    title: "Security you can evidence",
    body: "Cyber security measures, audit trails and permissioned access that stand up to licensee review.",
    icon: "lock",
  },
];

export const INVESTMENT_MENUS: InvestmentMenu[] = [
  {
    name: "Discover",
    positioning: "Cost-effective access to a streamlined managed portfolio selection.",
    bestFor: "Early-stage accumulators, later-stage retirees, less complex needs",
    adminFee: "$0",
    accountKeepingFee: "$0",
    managedPortfolios: "Streamlined selection",
    managedFunds: "Not available",
    listedSecurities: "Within managed portfolios",
    internationalSecurities: "Within managed portfolios",
    termDeposits: "Not available",
  },
  {
    name: "Core",
    positioning: "A select range of investment options with lower minimum administration fees.",
    bestFor: "Lower balances, SMSF Access clients, straightforward needs",
    adminFee: "Tiered, lower minimum",
    accountKeepingFee: "$0",
    managedPortfolios: "Select range",
    managedFunds: "Select range",
    listedSecurities: "ASX 300",
    internationalSecurities: "Not available",
    termDeposits: "Available",
  },
  {
    name: "Choice",
    positioning: "The full suite of investment options for greater choice and flexibility.",
    bestFor: "Complex portfolios, private wealth, full investment universe",
    adminFee: "Tiered",
    accountKeepingFee: "Applies",
    managedPortfolios: "Full menu",
    managedFunds: "1,400+",
    listedSecurities: "Full ASX",
    internationalSecurities: "20 global exchanges",
    termDeposits: "Available",
  },
];

export const AWARDS = [
  {
    year: "2025",
    title: "Best Platform Overall",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Best Platform Managed Accounts Functionality",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Best Product Offering",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Best Decision Support Tools",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Best Online Business Management",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Best Reporting",
    source: "Investment Trends Platform Competitive Analysis and Benchmarking Report",
  },
  {
    year: "2025",
    title: "Highest adviser Net Promoter Score",
    source: "Investment Trends Adviser Technology Needs Report",
  },
  {
    year: "2025",
    title: "#1 for tax optimisation tools",
    source: "Investment Trends Adviser Technology Needs Report",
  },
];
