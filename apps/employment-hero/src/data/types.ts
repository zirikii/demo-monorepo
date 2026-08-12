export type NavLink = {
  label: string;
  to: string;
  description?: string;
  badge?: string;
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavAudience = {
  id: "businesses" | "partners" | "employees" | "job-seekers";
  label: string;
  headline: string;
  blurb: string;
  cta: NavLink;
  columns: NavColumn[];
  featured: {
    eyebrow: string;
    title: string;
    body: string;
    to: string;
  };
};

export type Product = {
  slug: string;
  name: string;
  category: "Hiring" | "HR" | "Payroll" | "Employee experience" | "Managed";
  tagline: string;
  summary: string;
  heroHeadline: string;
  heroBlurb: string;
  bullets: string[];
  modules: { name: string; description: string }[];
  stat: { value: string; label: string };
  planFrom: string;
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type PlanFamily = {
  id: "hr" | "payroll" | "recruitment" | "heroforce";
  label: string;
  intro: string;
  plans: Plan[];
};

export type AddOn = {
  name: string;
  price: string;
  minimum: string;
  description: string;
};

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  award: string;
  challenges: string[];
  outcomes: { value: string; label: string }[];
};

export type Solution = {
  slug: string;
  name: string;
  blurb: string;
  steps: { title: string; body: string }[];
  relatedProducts: string[];
};

export type Integration = {
  name: string;
  category: "Accounting" | "Productivity" | "Comms" | "Recruitment" | "Finance" | "Identity";
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  category: "HR & People Ops" | "Payroll & Compliance" | "Hiring & AI" | "Culture & Engagement";
  excerpt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readingMinutes: number;
  audience: "businesses" | "employees" | "job-seekers" | "partners";
  body: string[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  location: string;
  headcount: string;
  challenge: string;
  solution: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  results: { value: string; label: string }[];
  products: string[];
};

export type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  workType: "Full time" | "Part time" | "Casual" | "Contract";
  category: string;
  salary: string;
  postedAt: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type Webinar = {
  slug: string;
  title: string;
  blurb: string;
  presenter: string;
  presenterRole: string;
  date: string;
  minutes: number;
  onDemand: boolean;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  outlet: string;
};
