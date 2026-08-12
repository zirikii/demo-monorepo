import type { Faq, Testimonial } from "./types";

export const site = {
  name: "Employment Hero",
  tagline: "Employment. Intelligently Run.",
  heroBlurb:
    "Australia's AI-powered Employment Operating System for payroll, HR, recruitment and benefits — with intelligent agents supporting your team. Or hand it all over to us with HeroForce.",
  rating: "4.7",
  ratingCount: "9,105",
  abn: "ABN 11 160 047 709",
  address: "439 Kent Street, Sydney NSW 2000",
  phone: "1300 084 847",
  supportEmail: "support@example-demo.com",
  acknowledgement:
    "We acknowledge Aboriginal and Torres Strait Islander peoples as the First Australians and Traditional Custodians of the lands where we live, learn and work.",
} as const;

export const heroStats = [
  { value: "350k+", label: "businesses on the platform" },
  { value: "3m+", label: "employees paid each year" },
  { value: "180+", label: "countries covered by HeroForce" },
  { value: "$140b", label: "in payments processed annually" },
];

export const trustedBy = [
  "El Jannah",
  "Jo Mercer",
  "Gilmour Space",
  "Tasmanian Oyster Co.",
  "Blue Rock",
  "Macro Mike",
  "Lawson Grains",
  "Holdsworth Community",
  "Expression Australia",
  "Kent Relocation",
];

export const audienceCards = [
  {
    eyebrow: "For businesses",
    title: "Hire, manage and pay. Skip the admin.",
    body: "One platform for the whole employment lifecycle, from the first job ad to the final payslip.",
    to: "/products",
  },
  {
    eyebrow: "For employees",
    title: "Everything work in one place.",
    body: "Payslips, leave, benefits and earned wage access in the Employment Hero Work app.",
    to: "/work",
  },
  {
    eyebrow: "For job seekers",
    title: "Get matched. Get hired. Get paid.",
    body: "Build one profile and let SmartMatch put you in front of employers who are hiring now.",
    to: "/jobs",
  },
];

export const heroForceModes = [
  {
    title: "Employ locally",
    body: "Hire and manage local employees while we handle contracts, compliance and the legalities.",
    to: "/products/heroforce",
  },
  {
    title: "Employ globally",
    body: "Scale into 180+ countries in days. Move existing teams across or hire from our talent marketplace.",
    to: "/products/heroforce",
  },
  {
    title: "Employ on demand",
    body: "Access pre-vetted, ready-to-work talent through a flexible, fully managed employment infrastructure.",
    to: "/products/heroforce",
  },
];

export const homeFaqs: Faq[] = [
  {
    question: "What is Employment Hero?",
    answer:
      "Employment Hero is an Employment Operating System. It brings hiring, HR, payroll and employee benefits into a single platform, with AI agents that take action on the busywork instead of just reporting on it.",
  },
  {
    question: "What is HeroForce?",
    answer:
      "HeroForce is our managed employment layer. We become the legal employer of record so you can hire locally or in 180+ countries without setting up an entity, while your team manages the day-to-day work.",
  },
  {
    question: "Does Employment Hero integrate with other platforms?",
    answer:
      "Yes. Accounting, identity, communication and finance tools connect through the integrations directory, so employee, timesheet and pay data stays in sync without re-keying.",
  },
  {
    question: "How do I switch from another platform?",
    answer:
      "An onboarding specialist maps your existing employee records, leave balances and pay history, runs a parallel pay cycle, then cuts over once the numbers reconcile.",
  },
  {
    question: "Is my data secure on Employment Hero?",
    answer:
      "This is a demonstration build, so no real data is stored anywhere — everything lives in your browser's localStorage and is cleared when you clear site data.",
  },
  {
    question: "How much does Employment Hero cost?",
    answer:
      "Plans start at $10 per employee per month for HR Essentials, with a minimum of 10 users. Payroll, recruitment and HeroForce are priced separately on the pricing page.",
  },
  {
    question: "What is Employment Hero Work?",
    answer:
      "Employment Hero Work is the employee app. It puts payslips, rosters, leave requests, benefits and earned wage access in one place on the phone your team already carries.",
  },
  {
    question: "How does Employment Hero use AI?",
    answer:
      "Hero AI coordinates a recruitment agent, an HR agent and a payroll agent. They draft shortlists, prepare contracts and flag pay run anomalies, always leaving the final decision with a person.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Just do it. Employment Hero will make your life so much easier. We use almost every feature, and it has genuinely made a huge difference to how the team runs.",
    author: "Tania Mitchell",
    role: "Support Services Manager",
    company: "Nelson Airport",
  },
  {
    quote:
      "It only takes me five minutes to generate a contract now. That has saved a couple of hours a month on just this one task alone.",
    author: "Emma Mareroa",
    role: "Senior People and Culture Advisor",
    company: "TMNZ",
  },
  {
    quote:
      "After seeing how easy the HR software was to use, we consolidated everything under one roof, including payroll. Now it all just syncs up seamlessly.",
    author: "Danielle Ware",
    role: "Office Manager",
    company: "Waterware",
  },
  {
    quote:
      "It streamlined our payroll, strengthened compliance, and freed up the time we needed to focus on growth.",
    author: "Michael Osei",
    role: "Chief Financial Officer",
    company: "Finbase",
  },
];

export const heroFoundation = {
  title: "Hero Foundation",
  body: "Hero Foundation is the charitable arm of Employment Hero. We support people facing barriers to work by unlocking job opportunities and helping employers hire diverse talent.",
  stats: [
    { value: "350k+", label: "employers in the network" },
    { value: "Free", label: "to every participating business" },
    { value: "12k+", label: "placements supported" },
  ],
};
