export type ProductCategory =
  | "transport"
  | "food"
  | "payments"
  | "daily"
  | "business"
  | "entertainment";

export type ApplicationStatus = "drafted" | "submitted" | "take-home" | "onsite" | "offer";

export type JobTeam = "engineering" | "data" | "corporate" | "operations" | "design";

export type OssLanguage = "Go" | "Clojure" | "Ruby" | "Java" | "Kotlin" | "TypeScript";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  summary: string;
  color: string;
}

export interface OssProject {
  slug: string;
  name: string;
  tagline: string;
  language: OssLanguage;
  stars: number;
  featured: boolean;
  summary: string;
}

export interface Job {
  slug: string;
  title: string;
  location: string;
  team: JobTeam;
  org: "Gojek" | "GoTo Financial" | "GoTo Group";
  type: "Full-time";
  posted: string;
  summary: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  role: string;
  tags: string[];
  minutes: number;
  body: string;
}

export interface Story {
  id: string;
  name: string;
  role: string;
  hub: string;
  quote: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface ImpactStat {
  value: string;
  label: string;
}

export interface TechFact {
  title: string;
  body: string;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface IntegrationToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}
