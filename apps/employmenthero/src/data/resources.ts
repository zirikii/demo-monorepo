import type { Resource } from "./types";

export const RESOURCES: Resource[] = [
  {
    slug: "modern-award-rate-guide-2026",
    title: "Modern award rate guide 2026–27",
    type: "Guide",
    audience: "Businesses",
    description:
      "Every rate change from the Annual Wage Review, mapped to the ten awards Australian SMBs use most.",
    readTime: "22 min",
  },
  {
    slug: "employment-contract-template",
    title: "Employment contract template pack",
    type: "Template",
    audience: "Businesses",
    description:
      "Full-time, part-time and casual contract templates written against the National Employment Standards.",
    readTime: "Download",
  },
  {
    slug: "payday-super-readiness-checklist",
    title: "Payday Super readiness checklist",
    type: "Checklist",
    audience: "Businesses",
    description: "Fourteen checks to complete before superannuation moves onto your pay cycle.",
    readTime: "8 min",
  },
  {
    slug: "onboarding-playbook",
    title: "The 90-day onboarding playbook",
    type: "Guide",
    audience: "Businesses",
    description: "A week-by-week plan for the first ninety days, built for shift-based teams.",
    readTime: "18 min",
  },
  {
    slug: "wellbeing-at-work-report",
    title: "Wellbeing at Work Report 2026",
    type: "Report",
    audience: "Businesses",
    description:
      "Survey findings from 12,000 Australian employees on financial stress, flexibility and intention to stay.",
    readTime: "35 min",
  },
  {
    slug: "hiring-in-a-tight-market",
    title: "Hiring in a tight market",
    type: "Webinar",
    audience: "Businesses",
    description:
      "A 45-minute session on matching, screening and closing candidates when everyone is hiring.",
    readTime: "45 min",
  },
  {
    slug: "performance-review-templates",
    title: "Performance review template library",
    type: "Template",
    audience: "Businesses",
    description: "Six review formats from lightweight check-ins to full 360 cycles.",
    readTime: "Download",
  },
  {
    slug: "reading-your-payslip",
    title: "How to read your payslip",
    type: "Guide",
    audience: "Employees",
    description:
      "Gross, net, super, tax and allowances explained — plus how to spot an error and what to do about it.",
    readTime: "9 min",
  },
  {
    slug: "earned-wage-access-explained",
    title: "Earned Wage Access explained",
    type: "Guide",
    audience: "Employees",
    description: "What it is, what it is not, and how to use it without getting into a cycle.",
    readTime: "6 min",
  },
  {
    slug: "resume-that-gets-matched",
    title: "Build a profile that gets you matched",
    type: "Guide",
    audience: "Job seekers",
    description: "How SmartMatch reads availability, skills and location, and how to present yours.",
    readTime: "11 min",
  },
  {
    slug: "interview-prep-shift-roles",
    title: "Interview prep for shift-based roles",
    type: "Checklist",
    audience: "Job seekers",
    description: "The twelve questions hospitality, retail and care employers ask most.",
    readTime: "7 min",
  },
  {
    slug: "partner-practice-playbook",
    title: "The advisory practice playbook",
    type: "Guide",
    audience: "Partners",
    description:
      "How accounting and bookkeeping practices build a recurring advisory line on top of payroll.",
    readTime: "26 min",
  },
  {
    slug: "partner-client-migration-kit",
    title: "Client migration kit",
    type: "Template",
    audience: "Partners",
    description: "Data templates, comms scripts and a cutover plan for moving a client book across.",
    readTime: "Download",
  },
  {
    slug: "quarterly-compliance-webinar",
    title: "Quarterly compliance update",
    type: "Webinar",
    audience: "Partners",
    description: "What changed this quarter across Fair Work, the ATO and state payroll tax.",
    readTime: "50 min",
  },
];

export const RESOURCE_AUDIENCES: Resource["audience"][] = [
  "Businesses",
  "Employees",
  "Job seekers",
  "Partners",
];

export const RESOURCE_TYPES: Resource["type"][] = [
  "Guide",
  "Template",
  "Webinar",
  "Report",
  "Checklist",
];
