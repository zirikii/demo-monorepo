import type { Testimonial } from "./types";

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "SmartMatch's job matching is exactly what we needed. We stopped paying for ads that brought us the wrong people and started getting shortlists we could actually roster.",
    name: "Michael Oliverio",
    role: "HR Business Partner",
    company: "Harbourline Hospitality Group",
  },
  {
    quote:
      "Payroll used to take three hours for 40 employees. It now takes under an hour for 150, and I trust the award interpretation more than I trusted my own spreadsheet.",
    name: "Adam Drhimer",
    role: "Finance Manager",
    company: "Bluegum Early Learning",
  },
  {
    quote:
      "What the Work app brings for us is simplicity and communication. Shift swaps used to be four text messages. Now they take one tap.",
    name: "Keith Warrick",
    role: "Operations Lead",
    company: "Saltbush Retail Co",
  },
  {
    quote:
      "We cut payroll admin by 80% and dropped our time to hire to 15 days. The team that used to chase timesheets now runs onboarding properly.",
    name: "Elena Marchetti",
    role: "People & Culture Director",
    company: "Corella Health",
  },
  {
    quote:
      "The Recruitment Agent screened 400 applications overnight. I came in to a ranked shortlist with the reasoning attached, and I could see exactly why each person scored the way they did.",
    name: "Daniel Whitmore",
    role: "Talent Acquisition Manager",
    company: "Ironbark Logistics",
  },
  {
    quote:
      "Being able to answer a Fair Work query with a payslip that traces back to the clause is worth the subscription on its own.",
    name: "Priya Raman",
    role: "People & Culture Lead",
    company: "Harbourline Hospitality Group",
  },
];

export const HOMEPAGE_TESTIMONIALS = TESTIMONIALS.slice(0, 3);
