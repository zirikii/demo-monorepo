import type { CaseStudy } from "./types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "harbourline-hospitality",
    company: "Harbourline Hospitality Group",
    industry: "Hospitality",
    location: "Sydney, NSW",
    headcount: "480 employees across 9 venues",
    summary:
      "Nine venues, one roster and a hiring pipeline that finally keeps up with summer trade.",
    quote:
      "I would 100% recommend Employment Hero to any operator running more than one venue. We stopped losing shifts to admin.",
    quoteAuthor: "Michael Oliverio",
    quoteRole: "HR Business Partner",
    results: [
      { value: "$500K", label: "annual hiring cost avoided" },
      { value: "11 days", label: "median time to hire" },
      { value: "80%", label: "less payroll admin" },
    ],
    body: [
      "Harbourline runs nine venues across Sydney, from a 400-seat waterfront restaurant to three suburban cafes. Peak trade doubles headcount between November and February, and for years that meant a hiring scramble run out of a shared inbox and a whiteboard.",
      "The group moved onto Employment OS in stages — HR and onboarding first, then payroll with Hospitality Industry General Award interpretation, then SmartMatch and the AI Recruitment Agent ahead of the summer intake.",
      "The change that mattered most was not the software. It was that a signed contract now creates the employee, the payroll profile, the RSA training assignment and the Work app invitation in one action, so a new starter is rostered and compliant before their first shift.",
      "Across the last summer intake, Harbourline hired 96 casual staff without placing a single paid job ad. SmartMatch supplied the shortlists and the Recruitment Agent ran first-round screening overnight.",
    ],
    products: ["employment-os", "payroll-software", "find-candidates", "recruitment-agent"],
  },
  {
    slug: "corella-health",
    company: "Corella Health",
    industry: "Healthcare",
    location: "Melbourne, VIC",
    headcount: "230 clinicians and support staff",
    summary:
      "Credential tracking that stops an expired registration from ever reaching a roster.",
    quote:
      "We cut payroll admin by 80% and dropped time to hire to 15 days. The team that used to chase timesheets now runs onboarding properly.",
    quoteAuthor: "Elena Marchetti",
    quoteRole: "People & Culture Director",
    results: [
      { value: "80%", label: "reduction in payroll admin" },
      { value: "15 days", label: "time to hire" },
      { value: "100%", label: "credential compliance" },
    ],
    body: [
      "Corella Health operates allied-health clinics across metropolitan Melbourne. Every clinician holds registrations and checks that expire on their own schedule, and a lapsed credential is a clinical and legal risk, not an admin annoyance.",
      "Employment OS now holds every certification with its expiry date, notifies the clinician and their manager at 60, 30 and 7 days, and blocks roster publication where a required credential has lapsed.",
      "Payroll moved onto award interpretation at the same time, which removed the manual penalty-rate calculations the finance team had been doing in a spreadsheet each fortnight.",
      "The people team now spends its time on onboarding quality and retention rather than reconciliation.",
    ],
    products: ["hr-software", "payroll-software", "learning-management-system"],
  },
  {
    slug: "bluegum-early-learning",
    company: "Bluegum Early Learning",
    industry: "Early education",
    location: "Brisbane, QLD",
    headcount: "150 educators across 6 centres",
    summary: "Payroll for 150 educators in under an hour, with child-safe compliance evidenced.",
    quote:
      "Payroll used to take three hours for 40 employees. It now takes under an hour for 150.",
    quoteAuthor: "Adam Drhimer",
    quoteRole: "Finance Manager",
    results: [
      { value: "66%", label: "faster pay runs" },
      { value: "3.5x", label: "headcount growth absorbed" },
      { value: "0", label: "award underpayments" },
    ],
    body: [
      "Bluegum grew from two centres to six in three years. The payroll process that worked at 40 employees did not survive the third centre.",
      "Moving to Employment OS meant timesheets from the Work app feed straight into award interpretation, and exceptions surface before anyone approves the run.",
      "Child-safe training, first aid and working-with-children checks are assigned by role at onboarding and reported by centre, which is what the regulator asks to see.",
      "The finance manager now closes payroll in under an hour and spends the recovered time on centre budgets.",
    ],
    products: ["payroll-software", "hr-software", "work-app"],
  },
  {
    slug: "saltbush-retail",
    company: "Saltbush Retail Co",
    industry: "Retail",
    location: "Adelaide, SA",
    headcount: "310 team members across 22 stores",
    summary: "Shift swaps, roster costs and engagement in one app the team actually opens.",
    quote:
      "What the Work app brings for us is simplicity and communication. Shift swaps used to be four text messages. Now they take one tap.",
    quoteAuthor: "Keith Warrick",
    quoteRole: "Operations Lead",
    results: [
      { value: "94%", label: "Work app adoption" },
      { value: "18%", label: "lower casual turnover" },
      { value: "$36K", label: "annual labour cost saved" },
    ],
    body: [
      "Saltbush operates 22 stores with a workforce that is 70% casual. Rostering was managed store by store, and cross-store cover simply did not happen because no one could see who was available.",
      "With rostering and the Work app in place, an open shift is offered to every qualified team member across the region, and the first tap takes it.",
      "Store managers now see the cost of a roster against budget before they publish it, rather than discovering it in the pay run.",
      "Earned Wage Access was switched on at the same time and is the benefit most cited by team members in engagement surveys.",
    ],
    products: ["work-app", "earned-wage-access", "employment-os"],
  },
  {
    slug: "redgum-constructions",
    company: "Redgum Constructions",
    industry: "Construction",
    location: "Perth, WA",
    headcount: "120 on the tools, 40 in the office",
    summary: "White card tracking, site inductions and subcontractor compliance in one record.",
    quote:
      "Every person on site has a current white card and a completed induction, and I can prove it in ninety seconds.",
    quoteAuthor: "Tom Kavanagh",
    quoteRole: "HSEQ Manager",
    results: [
      { value: "90 sec", label: "to produce a compliance pack" },
      { value: "100%", label: "induction completion" },
      { value: "6 hrs", label: "saved per new starter" },
    ],
    body: [
      "Redgum runs commercial fit-outs across Western Australia with a mix of employees and subcontractors on every site.",
      "Site inductions, white cards, high-risk work licences and insurance certificates now sit against each person's record with expiry tracking, and subcontractors are managed with the same rigour as employees.",
      "Onboarding a new starter used to take six hours of paperwork spread across a week. It now takes the time it takes them to complete the induction on their phone.",
    ],
    products: ["hr-software", "learning-management-system", "employment-os"],
  },
  {
    slug: "tallowood-care",
    company: "Tallowood Care",
    industry: "NDIS and disability services",
    location: "Newcastle, NSW",
    headcount: "260 support workers",
    summary: "SCHADS award interpretation, broken shifts and travel allowances handled correctly.",
    quote:
      "SCHADS is the hardest award we have ever had to pay against. Employment OS interprets it the same way every fortnight.",
    quoteAuthor: "Rachel Nguyen",
    quoteRole: "General Manager, People",
    results: [
      { value: "$0", label: "in remediation payments" },
      { value: "58%", label: "faster pay run" },
      { value: "260", label: "support workers paid correctly" },
    ],
    body: [
      "Tallowood Care delivers in-home and community support under the Social, Community, Home Care and Disability Services Industry Award.",
      "Broken shifts, sleepovers, travel time and client-cancellation rules make manual interpretation slow and error-prone. Employment OS applies the clauses consistently and shows the trace on every payslip line.",
      "The organisation has not issued a remediation payment since moving to award interpretation, and the payroll officer's fortnight has shrunk by more than half.",
    ],
    products: ["payroll-software", "employment-os", "hr-software"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export const CASE_STUDY_INDUSTRIES = Array.from(
  new Set(CASE_STUDIES.map((study) => study.industry)),
).sort();
