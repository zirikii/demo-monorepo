import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "tasmanian-oyster-co",
    company: "Tasmanian Oyster Co.",
    industry: "Agriculture & aquaculture",
    location: "Bruny Island, TAS",
    headcount: "120 employees",
    challenge:
      "Seasonal harvest crews were onboarded on paper at the shed door, and payroll spent every Tuesday chasing timesheets across four leases.",
    solution:
      "Onboarding moved to a pre-start checklist completed on a phone, and shift data now flows from the roster into an award-interpreted pay run.",
    quote:
      "We used to lose the first hour of every harvest day to paperwork. Now the crew arrives already onboarded and we start on the water.",
    quoteAuthor: "Nicola Reid",
    quoteRole: "Operations Manager",
    results: [
      { value: "3 days", label: "cut from crew onboarding" },
      { value: "6 hrs", label: "saved per pay cycle" },
      { value: "100%", label: "of tickets tracked to expiry" },
    ],
    products: ["hr-software", "payroll-software"],
  },
  {
    slug: "el-jannah",
    company: "El Jannah",
    industry: "Hospitality",
    location: "Sydney, NSW",
    headcount: "1,400 employees",
    challenge:
      "Rapid store expansion meant hiring hundreds of casual staff a year, with each venue running its own recruitment process.",
    solution:
      "SmartMatch and the recruitment agent centralised screening, and new starters move straight from offer into onboarding.",
    quote:
      "We were opening venues faster than we could staff them. Now a store manager gets a shortlist the same day they open the role.",
    quoteAuthor: "Anthony Elias",
    quoteRole: "Head of People",
    results: [
      { value: "$500k", label: "estimated annual saving" },
      { value: "30+ hrs", label: "saved on weekly screening" },
      { value: "1 week", label: "from match to hire" },
    ],
    products: ["hiring", "find-candidates"],
  },
  {
    slug: "blue-rock",
    company: "Blue Rock",
    industry: "Professional services",
    location: "Melbourne, VIC",
    headcount: "90 client payrolls",
    challenge:
      "An advisory practice was maintaining client payrolls across four different systems inherited through acquisitions.",
    solution:
      "The partner program consolidated every client onto one platform, with a shared template library for award-covered clients.",
    quote:
      "Moving ninety payrolls in a quarter sounded impossible. The template library did most of the work for us.",
    quoteAuthor: "Hannah Beckett",
    quoteRole: "Partner, Advisory",
    results: [
      { value: "90", label: "client payrolls migrated" },
      { value: "1 qtr", label: "to complete the transition" },
      { value: "35%", label: "lower cost to serve" },
    ],
    products: ["payroll-software"],
  },
  {
    slug: "holdsworth-community",
    company: "Holdsworth Community",
    industry: "Not for profit",
    location: "Woollahra, NSW",
    headcount: "180 employees",
    challenge:
      "Support workers under the SCHADS award, a mix of paid staff and volunteers, and grant reporting that needed headcount by funding source.",
    solution:
      "Award interpretation applied per shift, screening checks tracked to expiry, and reporting segmented by cost centre.",
    quote:
      "Every acquittal used to start with a week of reconstructing who worked on which program. Now it is a report.",
    quoteAuthor: "Grace Fuller",
    quoteRole: "General Manager, People",
    results: [
      { value: "5 hrs", label: "saved per grant acquittal" },
      { value: "100%", label: "screening checks in date" },
      { value: "22%", label: "lower admin cost" },
    ],
    products: ["hr-software", "payroll-software"],
  },
  {
    slug: "gilmour-space",
    company: "Gilmour Space Technologies",
    industry: "Software & engineering",
    location: "Gold Coast, QLD",
    headcount: "230 employees",
    challenge:
      "Headcount doubled in eighteen months while the performance cycle was still running on a shared spreadsheet.",
    solution:
      "Reviews, goals and 360 feedback moved onto a repeating cycle, with onboarding provisioning accounts automatically.",
    quote:
      "We went from a review cycle that half the company skipped to one that closes at ninety-four per cent completion.",
    quoteAuthor: "Ravi Shankar",
    quoteRole: "VP People & Culture",
    results: [
      { value: "94%", label: "review completion" },
      { value: "11 days", label: "cut from time-to-hire" },
      { value: "1 day", label: "to fully provision a starter" },
    ],
    products: ["hr-software", "hiring"],
  },
  {
    slug: "macro-mike",
    company: "Macro Mike",
    industry: "Retail & e-commerce",
    location: "Gold Coast, QLD",
    headcount: "75 employees",
    challenge:
      "Peak trade tripled warehouse headcount for eight weeks, and the temporary crew was onboarded with a printed form.",
    solution:
      "Seasonal hiring runs off a saved SmartMatch brief, with onboarding and offboarding checklists that repeat each season.",
    quote:
      "Peak used to mean a fortnight of admin before it even started. This year we onboarded forty people in three days.",
    quoteAuthor: "Tessa Moreau",
    quoteRole: "Operations Lead",
    results: [
      { value: "40%", label: "faster seasonal onboarding" },
      { value: "3 days", label: "to onboard 40 people" },
      { value: "18%", label: "lift in shift fill rate" },
    ],
    products: ["hiring", "employee-experience"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
