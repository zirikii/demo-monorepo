export interface NavLinkItem {
  label: string;
  to: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLinkItem[];
}

export interface MegaMenu {
  label: string;
  to: string;
  columns: MegaMenuColumn[];
  feature?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    to: string;
  };
  footerLinks?: NavLinkItem[];
}

export type AudienceSlug =
  | "advisers"
  | "private-wealth"
  | "advised-clients"
  | "investment-managers"
  | "licensees";

export interface Audience {
  slug: AudienceSlug;
  path: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroPoints: string[];
  pillars: { title: string; body: string; icon: FeatureIconName }[];
  proofPoints: { value: string; label: string; note?: string }[];
  faqIds: string[];
  ctaTitle: string;
  ctaBody: string;
}

export type FeatureIconName =
  | "briefcase"
  | "chart"
  | "coins"
  | "compass"
  | "database"
  | "globe"
  | "layers"
  | "lock"
  | "puzzle"
  | "sparkles"
  | "target"
  | "users";

export interface Product {
  slug: string;
  name: string;
  category: "Platform" | "Investment menu" | "Reporting" | "Portals" | "Group";
  tagline: string;
  summary: string;
  audience: AudienceSlug[];
  highlights: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  relatedSlugs: string[];
}

export interface PlatformFeature {
  slug: string;
  title: string;
  eyebrow: string;
  body: string;
  icon: FeatureIconName;
  bullets: string[];
}

export interface InvestmentMenu {
  id: "discover" | "core" | "choice";
  name: string;
  positioning: string;
  suitedTo: string;
  adminFee: string;
  accountKeepingFee: string;
  minimum: string;
  options: { label: string; included: boolean; note?: string }[];
}

export interface Insight {
  slug: string;
  title: string;
  category: "Market insights" | "Practice management" | "Managed portfolios" | "Regulation" | "Technology";
  excerpt: string;
  body: string[];
  author: string;
  authorTitle: string;
  published: string;
  featured?: boolean;
}

export interface CpdModule {
  id: string;
  title: string;
  provider: string;
  cpdHours: number;
  areas: string[];
  format: "Webinar" | "Article" | "Podcast" | "Course";
  published: string;
  summary: string;
}

export interface ProductDocument {
  id: string;
  name: string;
  product: string;
  type: "PDS" | "IDPS Guide" | "TMD" | "Investment Booklet" | "FSG" | "Form" | "Update Notice";
  updated: string;
  sizeKb: number;
}

export interface Award {
  year: number;
  title: string;
  awarder: string;
  detail: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string;
}

export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full time" | "Part time" | "Contract";
  posted: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  category: "Results" | "Market update" | "Governance" | "Presentation" | "Dividend";
  priceSensitive: boolean;
  summary: string;
}

export interface FinancialYear {
  year: string;
  totalFua: number;
  platformFua: number;
  parsFua: number;
  netInflows: number;
  advisers: number;
  underlyingEbitda: number;
}

export interface GroupBrand {
  slug: string;
  name: string;
  descriptor: string;
  body: string;
  stats: { label: string; value: string }[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Bdm {
  id: string;
  name: string;
  title: string;
  state: string;
  segment: "Advisers" | "Private wealth" | "Licensees" | "Investment managers";
  phone: string;
  email: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

/* ------------------------------------------------------------------ */
/* Portal (InvestorHUB / AdviserHUB) records                           */
/* ------------------------------------------------------------------ */

export type AccountType = "HUB24 Invest" | "HUB24 Super" | "HUB24 Pension" | "SMSF Access";

export interface PortfolioAccount {
  id: string;
  name: string;
  type: AccountType;
  menu: "Discover" | "Core" | "Choice";
  opened: string;
  cash: number;
}

export type AssetClass =
  | "Australian equities"
  | "International equities"
  | "Fixed income"
  | "Property & infrastructure"
  | "Alternatives"
  | "Cash";

export type HoldingKind = "Managed portfolio" | "Managed fund" | "ASX listed" | "International listed" | "Term deposit";

export interface Holding {
  id: string;
  accountId: string;
  code: string;
  name: string;
  kind: HoldingKind;
  assetClass: AssetClass;
  units: number;
  unitPrice: number;
  cost: number;
  dayChangePercent: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  type: "Buy" | "Sell" | "Contribution" | "Pension payment" | "Fee" | "Dividend" | "Distribution" | "Interest";
  amount: number;
}

export interface ManagedPortfolioModel {
  code: string;
  name: string;
  manager: string;
  objective: string;
  riskProfile: "Conservative" | "Balanced" | "Growth" | "High growth" | "Income";
  menu: ("Discover" | "Core" | "Choice")[];
  managementFee: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  allocation: { assetClass: AssetClass; weight: number }[];
}

export interface AdviserClient {
  id: string;
  name: string;
  segment: "Accumulator" | "Pre-retiree" | "Retiree" | "High net worth" | "SMSF";
  accounts: AccountType[];
  balance: number;
  netFlowYtd: number;
  reviewDue: string;
  adviser: string;
  status: "On track" | "Review due" | "Action required";
}

export interface PerformancePoint {
  month: string;
  value: number;
}

export interface StatementDocument {
  id: string;
  name: string;
  accountId: string;
  period: string;
  issued: string;
  type: "Annual statement" | "Quarterly report" | "Tax statement" | "Confirmation";
}
