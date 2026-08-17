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

export interface FooterColumn {
  heading: string;
  links: NavLinkItem[];
}

export type ProductCategory = "platform" | "accounting" | "portal" | "data";

export interface ProductSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  eyebrow: string;
  tagline: string;
  summary: string;
  audience: string[];
  highlights: { title: string; body: string }[];
  sections: ProductSection[];
  stats?: { label: string; value: string }[];
  faqs?: { question: string; answer: string }[];
  related: string[];
}

export interface Solution {
  slug: string;
  audience: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcomes: { title: string; body: string }[];
  products: string[];
  quote?: { body: string; name: string; role: string };
}

export interface InvestmentMenu {
  name: "Discover" | "Core" | "Choice";
  positioning: string;
  bestFor: string;
  adminFee: string;
  accountKeepingFee: string;
  managedPortfolios: string;
  managedFunds: string;
  listedSecurities: string;
  internationalSecurities: string;
  termDeposits: string;
}

export interface FeatureBenefit {
  number: number;
  title: string;
  body: string;
  icon: FeatureIconName;
}

export type FeatureIconName =
  | "layers"
  | "gauge"
  | "shield"
  | "chart"
  | "clock"
  | "sparkles"
  | "users"
  | "receipt"
  | "plug"
  | "lock";

export interface Insight {
  slug: string;
  title: string;
  category: "News" | "Media release" | "Adviser insights" | "Research" | "Technical";
  date: string;
  author: string;
  role: string;
  summary: string;
  body: string[];
  tags: string[];
  words: number;
}

export type DocumentKind = "PDS" | "TMD" | "Guide" | "Form" | "Report" | "Fact sheet";

export interface ProductDocument {
  id: string;
  title: string;
  product: string;
  kind: DocumentKind;
  updated: string;
  size: string;
}

export interface Award {
  year: string;
  title: string;
  source: string;
}

export interface Office {
  city: string;
  address: string[];
  phone: string;
  hours: string;
}

export interface Leader {
  name: string;
  role: string;
  bio: string;
  focus: string;
}

export interface CareerRole {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  posted: string;
  summary: string;
  responsibilities: string[];
}

export interface EducationItem {
  slug: string;
  title: string;
  format: "Webinar" | "Course" | "Podcast" | "Masterclass";
  cpdPoints: number;
  duration: string;
  presenter: string;
  summary: string;
  topics: string[];
}

export interface Announcement {
  date: string;
  title: string;
  kind: "Market sensitive" | "Periodic report" | "Investor update" | "Presentation";
  pages: number;
}

export interface Faq {
  question: string;
  answer: string;
  audience: "Advisers" | "Investors" | "Shareholders";
}
