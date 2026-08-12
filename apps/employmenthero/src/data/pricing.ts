import type { FeatureMatrixGroup, PricingAddOn, PricingPlan } from "./types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "hr-essentials",
    name: "HR Essentials",
    price: "$10",
    priceNote: "per employee / month*",
    positioning: "Designed for teams moving away from spreadsheets and manual processes.",
    ctaLabel: "Start with Essentials",
    ctaTo: "/signup",
    inclusionsHeading: "Includes",
    inclusions: [
      "Leave management",
      "Employee records and files",
      "Document storage and e-signatures",
      "Onboarding and offboarding",
      "Policies and compliance library",
      "Help centre and chat support",
    ],
  },
  {
    id: "hr-engage",
    name: "HR Engage",
    price: "$14",
    priceNote: "per employee / month*",
    positioning: "Everything in HR Essentials, plus tools to support engagement, performance and growth.",
    highlight: true,
    ctaLabel: "Choose Engage",
    ctaTo: "/signup",
    inclusionsHeading: "Everything in HR Essentials, plus",
    inclusions: [
      "Recruitment and applicant tracking",
      "Expense management",
      "Performance reviews, 1:1s and feedback",
      "Learning management",
      "Advanced HR — Hero Points, assets, reports",
      "SmartMatch candidate matching",
    ],
  },
  {
    id: "hr-elite",
    name: "HR Elite",
    price: "Custom",
    priceNote: "talk to sales",
    positioning: "Everything in HR Engage, plus advanced automation, reporting and security.",
    ctaLabel: "Talk to sales",
    ctaTo: "/request-a-demo",
    inclusionsHeading: "Everything in HR Engage, plus",
    inclusions: [
      "Talent development and workforce planning",
      "Compensation planning, goals and 360s",
      "Advanced analytics",
      "Custom workflows and automations",
      "Advanced security and SSO",
      "Custom integrations",
    ],
  },
  {
    id: "employment-unlimited",
    name: "Employment Unlimited",
    price: "Custom",
    priceNote: "the complete Employment OS",
    positioning: "Our most comprehensive plan — the complete Employment Operating System.",
    ctaLabel: "Book a demo",
    ctaTo: "/request-a-demo",
    inclusionsHeading: "Everything in HR Elite, plus",
    inclusions: [
      "Payroll with award interpretation",
      "Employee Assistance Program",
      "Priority support",
      "HR Advisory",
      "AI Recruitment Agent",
      "Learning bundle and team chat",
    ],
  },
];

export const PRICING_ADD_ONS: PricingAddOn[] = [
  {
    name: "Chat",
    price: "$2",
    minimum: "$20 / month minimum",
    description: "Team messaging tied to the org chart, sites and shifts.",
  },
  {
    name: "Rostering and Time & Attendance",
    price: "$4",
    minimum: "$40 / month minimum",
    description: "Build rosters against award rules and capture geo-verified clock-ins.",
  },
  {
    name: "Managed Payroll",
    price: "$20",
    minimum: "$400 / month minimum",
    description: "An Employment Hero payroll specialist runs each cycle for you.",
  },
  {
    name: "HR Advisory",
    price: "$14",
    minimum: "$280 / month minimum",
    description: "Unlimited access to qualified HR advisers for people and performance matters.",
  },
  {
    name: "Learning — 10-course bundle",
    price: "$8",
    minimum: "$80 / month minimum",
    description: "Ten Go1 courses per employee per year, assigned by role.",
  },
  {
    name: "LMS Plus",
    price: "$17",
    minimum: "$170 / month minimum",
    description: "The full Go1 library — 80,000+ courses from 250+ providers.",
  },
  {
    name: "EAP — Standard",
    price: "$8",
    minimum: "$80 / month minimum",
    description: "Confidential counselling for employees and their immediate family.",
  },
  {
    name: "EAP — Premium",
    price: "$10",
    minimum: "$100 / month minimum",
    description: "Standard EAP plus manager hotline, critical incident response and wellbeing coaching.",
  },
];

export const FEATURE_MATRIX: FeatureMatrixGroup[] = [
  {
    group: "Recruitment",
    rows: [
      { feature: "Careers page", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "Applicant tracking", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "SmartMatch candidates", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "AI Recruitment Agent", essentials: false, engage: false, elite: false, unlimited: true },
    ],
  },
  {
    group: "People",
    rows: [
      { feature: "Employee records", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Org chart", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Certifications and VEVO", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Workforce planning", essentials: false, engage: false, elite: true, unlimited: true },
    ],
  },
  {
    group: "Onboarding & compliance",
    rows: [
      { feature: "Paperless onboarding", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Policy acknowledgement", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Custom workflows", essentials: false, engage: false, elite: true, unlimited: true },
      { feature: "HR Advisory", essentials: false, engage: false, elite: false, unlimited: true },
    ],
  },
  {
    group: "Time & pay",
    rows: [
      { feature: "Leave management", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Timesheets", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "Award interpretation", essentials: false, engage: false, elite: false, unlimited: true },
      { feature: "STP Phase 2 lodgement", essentials: false, engage: false, elite: false, unlimited: true },
    ],
  },
  {
    group: "Engagement & development",
    rows: [
      { feature: "Hero Points recognition", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "Performance reviews", essentials: false, engage: true, elite: true, unlimited: true },
      { feature: "360 feedback", essentials: false, engage: false, elite: true, unlimited: true },
      { feature: "Learning management", essentials: false, engage: true, elite: true, unlimited: true },
    ],
  },
  {
    group: "Benefits & support",
    rows: [
      { feature: "Employment Hero Work app", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Earned Wage Access", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Employee Assistance Program", essentials: false, engage: false, elite: false, unlimited: true },
      { feature: "Priority support", essentials: false, engage: false, elite: false, unlimited: true },
    ],
  },
  {
    group: "Reporting & security",
    rows: [
      { feature: "Standard reports", essentials: true, engage: true, elite: true, unlimited: true },
      { feature: "Advanced analytics", essentials: false, engage: false, elite: true, unlimited: true },
      { feature: "Single sign-on", essentials: false, engage: false, elite: true, unlimited: true },
      { feature: "Custom integrations", essentials: false, engage: false, elite: true, unlimited: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "Is there a minimum number of employees?",
    answer:
      "Yes — plans start at 10 users. You are billed on the higher of your contracted user count or your active users in a given month.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "You can move up a plan at any time and the change applies from your next billing period. Downgrades apply at renewal.",
  },
  {
    question: "Do add-ons have their own minimums?",
    answer:
      "Each add-on carries a monthly minimum, listed against it above. Minimums are charged where your headcount falls below the threshold.",
  },
  {
    question: "What does implementation cost?",
    answer:
      "Guided implementation is included on Employment Unlimited. Other plans can add a fixed-fee implementation package.",
  },
  {
    question: "Is payroll included?",
    answer:
      "Payroll with award interpretation is included on Employment Unlimited. Managed Payroll is available as an add-on on any plan.",
  },
];

export const GLOBAL_TEAMS_PRICE = "USD $399";
