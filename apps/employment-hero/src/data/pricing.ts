import type { PricingTier } from "./types";

export const pricingTiers: PricingTier[] = [
  {
    id: "essentials",
    name: "HR Essentials",
    price: "From $5 / employee / mo",
    blurb: "Automate employment admin and take the first step into cloud HR.",
    features: ["Paperless onboarding", "Time off management", "HR document library", "Applicant tracking"],
    cta: "Start free trial",
  },
  {
    id: "engage",
    name: "HR Engage",
    price: "From $10 / employee / mo",
    blurb: "Engage your team with recognition, expenses and richer people insights.",
    features: ["Everything in Essentials", "Performance reviews", "Expense management", "Milestone recognition"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "elite",
    name: "HR Elite",
    price: "From $13 / employee / mo",
    blurb: "Advanced HR for growing companies that need custom fields and SSO.",
    features: ["Everything in Engage", "Goal setting", "Custom branding", "Single sign-on"],
    cta: "Talk to sales",
  },
  {
    id: "unlimited",
    name: "Employment Unlimited",
    price: "Speak to sales",
    blurb: "The complete Employment Operating System with payroll and priority support.",
    features: ["Everything in Elite", "Intelligent payroll", "Recruitment Agent", "Priority support", "EAP"],
    cta: "Request a demo",
  },
];
