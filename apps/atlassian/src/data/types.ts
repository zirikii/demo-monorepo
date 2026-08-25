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
  label: string;
  to: string;
  feature?: {
    eyebrow: string;
    title: string;
    body: string;
    to: string;
    cta: string;
  };
  columns: NavColumn[];
  footerLinks?: NavLink[];
}

export type ProductFamily =
  "Teamwork" | "Strategy" | "Service" | "Software" | "Product" | "Platform";

export interface Product {
  slug: string;
  name: string;
  family: ProductFamily;
  tagline: string;
  summary: string;
  heroHeadline: string;
  heroBody: string;
  includes?: string[];
  bullets: string[];
  features: { title: string; body: string }[];
  metrics: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  accent: string;
}

export interface Collection {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  includes: string[];
  productSlugs: string[];
  accent: string;
}

export interface Solution {
  slug: string;
  name: string;
  audience: string;
  headline: string;
  intro: string;
  outcomes: string[];
  productSlugs: string[];
  stat: { value: string; label: string };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  positioning: string;
  highlight?: boolean;
  monthlyUsd?: number;
  fromPlan?: string;
  ctaLabel: string;
  ctaTo: string;
  inclusions: string[];
}

export interface CustomerStory {
  slug: string;
  company: string;
  industry: string;
  region: string;
  summary: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  results: { value: string; label: string }[];
  body: string[];
  products: string[];
}

export interface Resource {
  slug: string;
  title: string;
  type: "Report" | "Ebook" | "Guide" | "Event" | "Podcast" | "Announcement";
  excerpt: string;
  publishedOn: string;
  body: string[];
}

export type IssueType = "Story" | "Task" | "Bug" | "Epic";
export type IssueStatus = "To do" | "In progress" | "In review" | "Done";
export type IssuePriority = "Highest" | "High" | "Medium" | "Low";

export interface IssueComment {
  id: string;
  author: string;
  body: string;
  created: string;
}

export interface JiraIssue {
  key: string;
  type: IssueType;
  summary: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  reporter: string;
  points: number;
  labels: string[];
  updated: string;
  comments: IssueComment[];
}

export interface JiraSprint {
  name: string;
  goal: string;
  start: string;
  end: string;
}
