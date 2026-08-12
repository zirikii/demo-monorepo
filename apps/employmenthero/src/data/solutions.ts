import type { BusinessSize, Industry } from "./types";

export const INDUSTRIES: Industry[] = [
  {
    slug: "hospitality",
    name: "Hospitality",
    headline: "Roster, pay and retain a team that changes every week",
    intro:
      "Hospitality runs on casual labour, split shifts and penalty rates. Employment OS interprets the Hospitality Industry General Award, costs a roster before you publish it, and gets a new starter onboarded before their first service.",
    painPoints: [
      "Penalty rates, split shifts and public holidays interpreted correctly every fortnight",
      "Seasonal hiring peaks filled without paid advertising",
      "RSA, food safety and venue inductions tracked with expiry dates",
      "Shift swaps handled in the app instead of a group chat",
    ],
    awards: ["Hospitality Industry (General) Award", "Restaurant Industry Award"],
    stat: { value: "96", label: "casual roles filled in one summer with no ad spend" },
  },
  {
    slug: "retail",
    name: "Retail",
    headline: "One workforce across every store",
    intro:
      "Multi-site retail loses hours to store-by-store rostering. Employment OS pools availability across your network so an open shift reaches every qualified team member, and costs the roster against budget before it goes out.",
    painPoints: [
      "General Retail Industry Award rates and penalties applied automatically",
      "Cross-store shift offers to lift coverage without overtime",
      "Labour cost visible against budget before publication",
      "Onboarding that scales through a Christmas intake",
    ],
    awards: ["General Retail Industry Award", "Fast Food Industry Award"],
    stat: { value: "18%", label: "lower casual turnover across 22 stores" },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Credentials that never lapse on a roster",
    intro:
      "In clinical settings a lapsed registration is a risk, not an admin task. Employment OS tracks every credential with its expiry, warns early, and blocks rostering where a required check has expired.",
    painPoints: [
      "AHPRA registrations, police checks and immunisation records tracked to expiry",
      "Nurses Award and Health Professionals Award interpretation",
      "Mandatory training assigned by role and reported by site",
      "Fatigue and overtime patterns visible before they become incidents",
    ],
    awards: ["Nurses Award", "Health Professionals and Support Services Award"],
    stat: { value: "100%", label: "credential compliance across 230 clinicians" },
  },
  {
    slug: "ndis-providers",
    name: "NDIS providers",
    headline: "SCHADS, interpreted the same way every fortnight",
    intro:
      "Broken shifts, sleepovers, travel time and client cancellations make SCHADS the hardest award most providers pay against. Employment OS applies the clauses consistently and shows the trace on every payslip line.",
    painPoints: [
      "Broken shift allowances, sleepovers and travel time calculated correctly",
      "NDIS Worker Screening Checks tracked with expiry",
      "Participant-facing rosters matched to support plans",
      "Audit-ready records for NDIS Commission requirements",
    ],
    awards: ["Social, Community, Home Care and Disability Services Industry Award"],
    stat: { value: "$0", label: "in remediation payments since going live" },
  },
  {
    slug: "construction",
    name: "Construction",
    headline: "Every person on site, compliant and provable",
    intro:
      "Employees, subcontractors and labour hire all need to be inducted, licensed and insured. Employment OS holds them in one record with expiry tracking, so a compliance pack takes ninety seconds instead of a day.",
    painPoints: [
      "White cards, high-risk work licences and inductions with expiry alerts",
      "Subcontractor insurance certificates tracked alongside employees",
      "Building and Construction General On-site Award interpretation",
      "Site-based reporting for HSEQ audits",
    ],
    awards: ["Building and Construction General On-site Award"],
    stat: { value: "90 sec", label: "to produce a full site compliance pack" },
  },
  {
    slug: "professional-services",
    name: "Professional services",
    headline: "Grow headcount without growing admin",
    intro:
      "Professional services firms scale on billable capacity. Employment OS handles onboarding, performance and payroll so partners spend their time on clients rather than HR process.",
    painPoints: [
      "Structured onboarding that gets a new consultant billable sooner",
      "Performance cycles, goals and 360 feedback",
      "Salary review and compensation planning",
      "Utilisation and headcount reporting alongside people data",
    ],
    awards: ["Clerks — Private Sector Award", "Professional Employees Award"],
    stat: { value: "6 hrs", label: "saved per new starter on onboarding" },
  },
];

export const BUSINESS_SIZES: BusinessSize[] = [
  {
    slug: "startup",
    name: "Startups",
    range: "1–20 employees",
    headline: "Set employment up properly the first time",
    intro:
      "You do not need an HR function, you need employment to be correct while you focus on the product. Contracts, onboarding, leave and pay, sorted from your first hire.",
    priorities: [
      "Compliant contracts without a lawyer on retainer",
      "Onboarding that takes minutes, not an afternoon",
      "Leave and records in one place from day one",
      "A benefits offer that competes above your weight",
    ],
    recommendedPlan: "HR Essentials",
  },
  {
    slug: "small-business",
    name: "Small business",
    range: "21–100 employees",
    headline: "Replace the spreadsheets before they break",
    intro:
      "This is where manual process starts costing real money. Bring hiring, HR and payroll into one system before the next growth step forces the issue.",
    priorities: [
      "Award interpretation you can rely on",
      "Hiring that does not need an agency",
      "Performance and engagement without a consultant",
      "Reporting that answers the owner's questions",
    ],
    recommendedPlan: "HR Engage",
  },
  {
    slug: "mid-market",
    name: "Mid-market",
    range: "101–500 employees",
    headline: "Standardise across sites and teams",
    intro:
      "Multiple sites mean multiple ways of doing things. Employment OS gives you one process, one dataset and the automation to keep it consistent.",
    priorities: [
      "Custom workflows and approval chains",
      "Advanced analytics across sites and cost centres",
      "Single sign-on and role-based access",
      "Workforce planning and compensation cycles",
    ],
    recommendedPlan: "HR Elite",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    range: "500+ employees",
    headline: "The complete Employment Operating System",
    intro:
      "Payroll, HR, hiring, benefits and advisory in one platform, with the security controls, integrations and support model an enterprise needs.",
    priorities: [
      "Payroll with full award coverage and STP Phase 2",
      "Enterprise security, SSO and audit logging",
      "HR Advisory and priority support",
      "Custom integrations and a developer API",
    ],
    recommendedPlan: "Employment Unlimited",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getBusinessSize(slug: string): BusinessSize | undefined {
  return BUSINESS_SIZES.find((size) => size.slug === slug);
}
