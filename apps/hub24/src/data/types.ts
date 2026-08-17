export interface NavLink {
  label: string;
  to: string;
  description?: string;
  badge?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface MegaMenu {
  id: string;
  label: string;
  columns: NavColumn[];
  feature?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    to: string;
  };
}

export type AudienceId =
  | "adviser"
  | "private-wealth"
  | "investment-manager"
  | "licensee"
  | "client"
  | "shareholder";

export interface Audience {
  id: AudienceId;
  label: string;
  lookingFor: NavLink[];
  heroKicker: string;
  heroBody: string;
  cta: { label: string; to: string };
}

export interface Product {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  body: string;
  highlights: string[];
  menus: string[];
  documents: string[];
}

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
}

export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract";
  summary: string;
}

export interface ManagedPortfolio {
  id: string;
  name: string;
  manager: string;
  menu: "Discover" | "Core" | "Choice";
  risk: "Conservative" | "Balanced" | "Growth" | "High growth";
  ytd: number;
  fum: number;
  feeBps: number;
}

export type AccountProduct = "Super" | "Pension" | "Invest" | "Private Invest";

export interface ClientAccount {
  id: string;
  name: string;
  adviser: string;
  practice: string;
  product: AccountProduct;
  menu: "Discover" | "Core" | "Choice";
  state: string;
  balance: number;
  cash: number;
  ytd: number;
  status: "Open" | "Pending" | "Closed";
}

export interface DocumentItem {
  id: string;
  title: string;
  product: string;
  menu?: string;
  type: "PDS" | "TMD" | "Investment booklet" | "Guide" | "ASX";
  date: string;
}

export interface CpdModule {
  id: string;
  title: string;
  provider: string;
  hours: number;
  topic: string;
  format: "On-demand" | "Webinar" | "Article";
}

export interface BdmPerson {
  name: string;
  role: string;
  region: string;
  phone: string;
  email: string;
}
