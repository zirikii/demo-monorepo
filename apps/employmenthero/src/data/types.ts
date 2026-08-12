export interface NavLink {
  label: string;
  to: string;
  description?: string;
  badge?: string;
  external?: boolean;
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

export interface Product {
  slug: string;
  name: string;
  category: "Hiring" | "HR" | "Payroll" | "Benefits" | "Managed";
  tagline: string;
  summary: string;
  heroHeadline: string;
  heroBody: string;
  bullets: string[];
  features: { title: string; body: string; icon: FeatureIcon }[];
  metrics: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export type FeatureIcon =
  | "sparkles"
  | "users"
  | "wallet"
  | "shield"
  | "clock"
  | "chart"
  | "graduation"
  | "globe"
  | "heart"
  | "workflow"
  | "search"
  | "message";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  positioning: string;
  highlight?: boolean;
  ctaLabel: string;
  ctaTo: string;
  inclusionsHeading: string;
  inclusions: string[];
}

export interface PricingAddOn {
  name: string;
  price: string;
  minimum: string;
  description: string;
}

export interface FeatureMatrixGroup {
  group: string;
  rows: { feature: string; essentials: boolean; engage: boolean; elite: boolean; unlimited: boolean }[];
}

export interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  location: string;
  headcount: string;
  summary: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  results: { value: string; label: string }[];
  body: string[];
  products: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedOn: string;
  body: string[];
  tags: string[];
}

export interface Resource {
  slug: string;
  title: string;
  type: "Guide" | "Template" | "Webinar" | "Report" | "Checklist";
  audience: "Businesses" | "Employees" | "Job seekers" | "Partners";
  description: string;
  readTime: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: "Full time" | "Part time" | "Casual" | "Contract";
  category: string;
  salary: string;
  postedOn: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  smartMatch: number;
}

export interface Integration {
  name: string;
  category: string;
  description: string;
  badge?: string;
}

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  painPoints: string[];
  awards: string[];
  stat: { value: string; label: string };
}

export interface BusinessSize {
  slug: string;
  name: string;
  range: string;
  headline: string;
  intro: string;
  priorities: string[];
  recommendedPlan: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: "Full time" | "Part time" | "Casual";
  startDate: string;
  award: string;
  baseRate: number;
  status: "Active" | "Onboarding" | "On leave";
  leaveBalance: { annual: number; personal: number };
  manager: string;
  email: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
  source: string;
  matchScore: number;
  appliedOn: string;
  location: string;
  agentSummary: string;
}

export interface PayRun {
  id: string;
  period: string;
  payDate: string;
  status: "Draft" | "Awaiting approval" | "Finalised" | "Lodged";
  employees: number;
  gross: number;
  tax: number;
  super: number;
  net: number;
}

export interface LeaveRequest {
  id: string;
  employee: string;
  type: "Annual" | "Personal" | "Unpaid" | "Parental";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Declined";
  note: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  category: string;
  enrolled: number;
  completion: number;
  mandatory: boolean;
}

export interface PerformanceReview {
  id: string;
  employee: string;
  cycle: string;
  reviewer: string;
  dueOn: string;
  status: "Not started" | "In progress" | "Complete";
  rating?: number;
}

export interface BenefitOffer {
  id: string;
  brand: string;
  category: string;
  offer: string;
  detail: string;
  savedThisYear: number;
}
