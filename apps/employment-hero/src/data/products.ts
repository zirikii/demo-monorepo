import type { Product } from "./types";

export const products: Product[] = [
  {
    "slug": "employment-os",
    "name": "Employment OS",
    "tagline": "HR, payroll and hiring finally speak the same language.",
    "summary": "One connected platform for the full employment lifecycle — from first application to final pay run.",
    "bullets": [
      "Built for employment os teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "hr",
    "name": "Core HR",
    "tagline": "People data, documents and workflows in one place.",
    "summary": "Paperless onboarding, policy acknowledgements, org charts and employee records that stay audit-ready.",
    "bullets": [
      "Built for core hr teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "payroll",
    "name": "Intelligent Payroll",
    "tagline": "Run accurate payroll in minutes, not days.",
    "summary": "Automate timesheets, leave, tax and STP reporting with AI-assisted error checks before you pay.",
    "bullets": [
      "Built for intelligent payroll teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "recruitment",
    "name": "Recruitment",
    "tagline": "Hire faster without another disconnected ATS.",
    "summary": "Job posts, candidate pipelines, scorecards and offers that flow straight into onboarding.",
    "bullets": [
      "Built for recruitment teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "benefits",
    "name": "Benefits & perks",
    "tagline": "Give people benefits they actually open.",
    "summary": "Lifestyle benefits, EAP access and recognition tools inside the Work app.",
    "bullets": [
      "Built for benefits & perks teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "learning",
    "name": "Learning",
    "tagline": "Build capability without another LMS login.",
    "summary": "Assign courses, track certifications and tie learning to performance goals.",
    "bullets": [
      "Built for learning teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  },
  {
    "slug": "time-attendance",
    "name": "Time & attendance",
    "tagline": "Rosters, clocks and leave that sync to payroll.",
    "summary": "Mobile timesheets, award interpretation hints and leave balances employees can trust.",
    "bullets": [
      "Built for time & attendance teams who want fewer tools",
      "Works with the Employment Hero Work app",
      "Configurable permissions for admins and managers",
      "Local compliance support across AU, NZ, UK and SG"
    ]
  }
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
