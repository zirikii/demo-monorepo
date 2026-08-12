export type PricingTier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  bullets: string[];
};

export type Person = {
  id: string;
  name: string;
  role: string;
  team: string;
  location: string;
  startDate: string;
  status: "Active" | "On leave" | "Offboarding";
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Annual" | "Sick" | "Carer's" | "Unpaid";
  from: string;
  to: string;
  status: "Pending" | "Approved" | "Declined";
  days: number;
};

export type PayRun = {
  id: string;
  period: string;
  payDate: string;
  employees: number;
  total: number;
  status: "Draft" | "Processing" | "Paid";
};

export type JobRequisition = {
  id: string;
  title: string;
  team: string;
  location: string;
  candidates: number;
  status: "Open" | "On hold" | "Filled";
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
};

export type CustomerStory = {
  slug: string;
  company: string;
  industry: string;
  headline: string;
  quote: string;
  person: string;
  role: string;
  metric: string;
};
