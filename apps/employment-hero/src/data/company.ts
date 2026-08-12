import type { NewsItem, Webinar } from "./types";

export const leadership = [
  {
    name: "Ben Halloran",
    role: "Chief Executive Officer",
    bio: "Employment lawyer turned founder. Started the company after watching small businesses lose weeks a year to employment admin.",
  },
  {
    name: "Dave Cheng",
    role: "Chief Product & Technology Officer",
    bio: "Leads product and engineering. Believes the best HR software is the software nobody has to think about.",
  },
  {
    name: "Priya Raman",
    role: "Head of Payroll Compliance",
    bio: "Twenty years in Australian payroll. Wrote most of the award interpretation logic that runs behind the pay run.",
  },
  {
    name: "Daniel Okafor",
    role: "Director of Talent Products",
    bio: "Built the SmartMatch scoring model and spends most of his time arguing about where the human stays in the loop.",
  },
  {
    name: "Sophie Nguyen",
    role: "VP Customer Experience",
    bio: "Runs onboarding and support. Measures success in how few tickets a customer needs to raise in month one.",
  },
  {
    name: "Marcus Webb",
    role: "Principal Employment Relations Adviser",
    bio: "Advises customers through the difficult conversations, from restructures to Fair Work matters.",
  },
];

export const milestones = [
  { year: "2014", event: "Founded in Sydney with an HR platform for small business." },
  { year: "2018", event: "Payroll launches, bringing award interpretation into the platform." },
  { year: "2021", event: "The employee app ships, putting payslips and leave on the phone." },
  { year: "2022", event: "Passed 100,000 businesses on the platform." },
  {
    year: "2024",
    event: "SmartMatch launches and the candidate pool passes one million profiles.",
  },
  {
    year: "2025",
    event: "Employment OS and HeroForce bring managed employment to 180+ countries.",
  },
  {
    year: "2026",
    event: "Hero AI agents move from assisting to acting across hiring and payroll.",
  },
];

export const values = [
  {
    title: "Sweat the employment detail",
    body: "Awards, entitlements and compliance are not glamorous. Getting them exactly right is the whole product.",
  },
  {
    title: "Automate the admin, not the judgement",
    body: "Our agents draft, prepare and flag. A person still decides anything that affects someone's employment.",
  },
  {
    title: "Build for the ten-person business",
    body: "If it needs a consultant to configure, it is not finished. Most of our customers do not have an HR team.",
  },
  {
    title: "Be honest about the hard parts",
    body: "Migrations take work, AI gets things wrong, and pretending otherwise costs customers more than it saves us.",
  },
];

export const openRoles = [
  { title: "Senior Product Designer", team: "Design", location: "Sydney, NSW" },
  { title: "Staff Engineer, Payroll Platform", team: "Engineering", location: "Remote, Australia" },
  { title: "Employment Relations Adviser", team: "Advisory", location: "Melbourne, VIC" },
  { title: "Enterprise Account Executive", team: "Sales", location: "Sydney, NSW" },
  { title: "Implementation Consultant", team: "Customer", location: "Brisbane, QLD" },
  { title: "Machine Learning Engineer", team: "Engineering", location: "Sydney, NSW" },
  { title: "Partner Manager, Accounting", team: "Partnerships", location: "Melbourne, VIC" },
  { title: "Technical Writer", team: "Product", location: "Remote, Australia" },
];

export const benefits = [
  {
    title: "Remote first, genuinely",
    body: "Work from wherever you do your best thinking. Offices exist for the people who want them.",
  },
  {
    title: "Everything on the platform",
    body: "Every employee gets the full product, including earned wage access and the benefits marketplace.",
  },
  {
    title: "Learning budget",
    body: "An annual budget and dedicated time to spend it, not just approval to spend your own weekends.",
  },
  {
    title: "Parental leave for both parents",
    body: "Equal leave regardless of who gave birth, with superannuation paid throughout.",
  },
];

export const webinars: Webinar[] = [
  {
    slug: "payday-super-readiness",
    title: "Payday Super readiness: a working session",
    blurb:
      "Walk through a real pay run under the new rules, including the data clean-up most employers still have ahead of them.",
    presenter: "Priya Raman",
    presenterRole: "Head of Payroll Compliance",
    date: "2026-08-27",
    minutes: 45,
    onDemand: false,
  },
  {
    slug: "hiring-without-job-ads",
    title: "Hiring without job ads",
    blurb:
      "How SmartMatch builds a shortlist, what it gets wrong, and where a human still has to look.",
    presenter: "Daniel Okafor",
    presenterRole: "Director of Talent Products",
    date: "2026-08-19",
    minutes: 40,
    onDemand: false,
  },
  {
    slug: "award-interpretation-explained",
    title: "Award interpretation, explained properly",
    blurb:
      "Penalty rates, allowances, broken shifts and the traps that produce accidental underpayment.",
    presenter: "Marcus Webb",
    presenterRole: "Employment Relations Adviser",
    date: "2026-06-24",
    minutes: 55,
    onDemand: true,
  },
  {
    slug: "performance-cycles-that-finish",
    title: "Performance cycles that actually finish",
    blurb: "Designing a review cadence that survives a busy quarter and a growing headcount.",
    presenter: "Ava Thompson",
    presenterRole: "People and Culture Lead",
    date: "2026-05-15",
    minutes: 35,
    onDemand: true,
  },
  {
    slug: "eofy-payroll-clinic",
    title: "EOFY payroll clinic",
    blurb:
      "A live run through finalisation, reconciliation and the questions payroll teams ask every June.",
    presenter: "Priya Raman",
    presenterRole: "Head of Payroll Compliance",
    date: "2026-05-28",
    minutes: 50,
    onDemand: true,
  },
  {
    slug: "onboarding-in-under-a-week",
    title: "Onboarding in under a week",
    blurb: "Building a pre-start experience that leaves week one for the actual work.",
    presenter: "Sophie Nguyen",
    presenterRole: "Onboarding Specialist",
    date: "2026-04-09",
    minutes: 30,
    onDemand: true,
  },
];

export function getWebinar(slug: string): Webinar | undefined {
  return webinars.find((webinar) => webinar.slug === slug);
}

export const news: NewsItem[] = [
  {
    slug: "payday-super-dsp-appointment",
    title: "Employment Hero named a digital service provider ahead of Payday Super",
    date: "2026-07-30",
    outlet: "Company announcement",
    summary:
      "Customers can appoint Employment Hero as their digital service provider before the 1 July obligation takes effect.",
  },
  {
    slug: "hero-ai-agents-general-availability",
    title: "Hero AI recruitment agent reaches general availability",
    date: "2026-06-11",
    outlet: "Company announcement",
    summary:
      "Structured AI interviews and rubric-based scoring are now available to every customer on HR Elite and above.",
  },
  {
    slug: "heroforce-expands-to-canada",
    title: "HeroForce expands employer of record coverage to Canada",
    date: "2026-05-06",
    outlet: "Company announcement",
    summary:
      "Canadian employment is now supported directly, bringing total coverage to more than 180 countries.",
  },
  {
    slug: "annual-recurring-revenue-milestone",
    title: "Employment Hero passes $300m in annual recurring revenue",
    date: "2026-03-20",
    outlet: "Australian Financial Review",
    summary:
      "The platform reports a tenfold increase in recurring revenue over five years while reaching profitability.",
  },
  {
    slug: "soc-2-type-ii",
    title: "Platform achieves SOC 2 Type II attestation",
    date: "2026-02-18",
    outlet: "Company announcement",
    summary:
      "The attestation sits alongside existing ISO 27001, 27017 and 27018 certifications and GDPR compliance.",
  },
  {
    slug: "g2-best-software-anz",
    title: "Ranked sixth on G2's Best Software Companies for ANZ",
    date: "2026-02-04",
    outlet: "G2",
    summary:
      "The highest-ranked workforce management platform in the region, from a field of more than 1,100 vendors.",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}

export const partnerTiers = [
  {
    name: "Referral partner",
    blurb: "Introduce a client and we take it from there.",
    points: [
      "Share of first-year revenue on every referred client",
      "Co-branded collateral and a referral tracking dashboard",
      "No implementation obligation",
    ],
    to: "/partner-network/referral-partner-program",
  },
  {
    name: "Certified partner",
    blurb: "Own the sale, the onboarding and the ongoing support.",
    points: [
      "Higher margin on every client you bring across",
      "Certification training for your whole practice",
      "A dedicated partner manager and priority escalation",
    ],
    to: "/partner-network/certified-partner",
  },
];

export const partnerDirectory = [
  {
    name: "Blue Rock",
    speciality: "Business advisory and payroll",
    location: "Melbourne, VIC",
    tier: "Certified",
  },
  {
    name: "Ledgerline Bookkeeping",
    speciality: "Bookkeeping and award compliance",
    location: "Perth, WA",
    tier: "Certified",
  },
  {
    name: "Northbridge Accounting",
    speciality: "SME accounting and tax",
    location: "Sydney, NSW",
    tier: "Referral",
  },
  {
    name: "Harbour & Finch",
    speciality: "Not-for-profit finance",
    location: "Sydney, NSW",
    tier: "Certified",
  },
  {
    name: "Redgum Advisory",
    speciality: "Agribusiness and rural employers",
    location: "Wagga Wagga, NSW",
    tier: "Referral",
  },
  {
    name: "Tidewater Partners",
    speciality: "Hospitality groups and franchises",
    location: "Brisbane, QLD",
    tier: "Certified",
  },
  {
    name: "Kōwhai Consulting",
    speciality: "New Zealand payroll and HR",
    location: "Auckland, NZ",
    tier: "Certified",
  },
  {
    name: "Sandstone Bookkeeping",
    speciality: "Construction and trades",
    location: "Adelaide, SA",
    tier: "Referral",
  },
];
