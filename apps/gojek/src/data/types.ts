export type ProductCategoryId =
  | "transport-logistics"
  | "food-shopping"
  | "payments"
  | "daily-needs"
  | "business"
  | "news-entertainment";

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  blurb: string;
  accent: string;
}

export interface ProductStat {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategoryId;
  tagline: string;
  summary: string;
  markets: string[];
  since: number;
  highlights: string[];
  engineering: string[];
  stats: ProductStat[];
}

export interface NavLink {
  label: string;
  to: string;
  description?: string;
}

export interface SiteStat {
  value: string;
  label: string;
  detail: string;
}

export type PostCategory = "Engineering" | "Product" | "Design" | "Data" | "Culture" | "News";

export interface PostSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
}

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedOn: string;
  readingMinutes: number;
  tags: string[];
  sections: PostSection[];
}

export type JobType = "Full-time" | "Contract" | "Internship";

export interface Job {
  slug: string;
  title: string;
  team: string;
  location: string;
  country: string;
  type: JobType;
  level: string;
  postedOn: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  stack: string[];
}

export interface OpenSourceProject {
  name: string;
  language: string;
  description: string;
  stars: number;
  topics: string[];
}

export interface Office {
  city: string;
  country: string;
  focus: string;
  headcount: number;
}

export interface CulturePrinciple {
  title: string;
  body: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface EmployeeStory {
  name: string;
  role: string;
  office: string;
  years: string;
  quote: string;
}

export interface Leader {
  name: string;
  role: string;
  focus: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}
