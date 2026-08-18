import type { Announcement, CareerRole, EducationItem, Faq, Leader, Office } from "./types";

export const OFFICES: Office[] = [
  {
    city: "Sydney head office",
    address: ["Level 17, 5 Martin Place", "Sydney NSW 2000"],
    phone: "1300 854 994",
    hours: "8.00am – 7.00pm AET, Mon–Fri",
  },
  {
    city: "Melbourne",
    address: ["Level 12, 570 Bourke Street", "Melbourne VIC 3000"],
    phone: "1300 854 994",
    hours: "8.30am – 5.30pm AET, Mon–Fri",
  },
  {
    city: "Brisbane",
    address: ["Level 9, 123 Eagle Street", "Brisbane QLD 4000"],
    phone: "1300 854 994",
    hours: "8.30am – 5.30pm AEST, Mon–Fri",
  },
  {
    city: "Perth",
    address: ["Level 8, 197 St Georges Terrace", "Perth WA 6000"],
    phone: "1300 854 994",
    hours: "8.30am – 5.30pm AWST, Mon–Fri",
  },
  {
    city: "Adelaide",
    address: ["Level 5, 121 King William Street", "Adelaide SA 5000"],
    phone: "1300 854 994",
    hours: "8.30am – 5.30pm ACST, Mon–Fri",
  },
];

export const LEADERS: Leader[] = [
  {
    name: "Rebecca Fairlie",
    role: "Managing Director & Chief Executive Officer",
    bio: "Leads the HUB24 Group strategy across platform, wealth accounting and client engagement technology.",
    focus: "Group strategy",
  },
  {
    name: "Daniel Okonjo",
    role: "Chief Financial Officer",
    bio: "Responsible for finance, treasury, investor relations and the group's capital management framework.",
    focus: "Finance",
  },
  {
    name: "Priya Sharma",
    role: "Chief Product Officer",
    bio: "Oversees platform product strategy, managed portfolio capability and the Engage reporting experience.",
    focus: "Product",
  },
  {
    name: "James Whelan",
    role: "Chief Technology Officer",
    bio: "Accountable for platform engineering, data services and the group's cyber security posture.",
    focus: "Technology",
  },
  {
    name: "Amelia Costa",
    role: "Chief Distribution Officer",
    bio: "Leads adviser and licensee relationships, business development and the national BDM network.",
    focus: "Distribution",
  },
  {
    name: "Nathan Reid",
    role: "Chief Risk Officer",
    bio: "Leads risk, compliance and the control environment supporting the group's regulated entities.",
    focus: "Risk",
  },
  {
    name: "Sophie Lang",
    role: "Chief People Officer",
    bio: "Responsible for culture, capability and the employee experience across the HUB24 Group.",
    focus: "People",
  },
  {
    name: "Ken Mitsu",
    role: "Chief Executive, Class",
    bio: "Leads the Class and NowInfinity businesses serving accounting and administration firms.",
    focus: "Wealth accounting",
  },
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "eng-2041",
    title: "Senior Software Engineer, Platform",
    team: "Technology",
    location: "Sydney (hybrid)",
    type: "Permanent full time",
    posted: "2026-08-04",
    summary:
      "Build and scale the services behind trading, settlement and reporting on the HUB24 Platform.",
    responsibilities: [
      "Design and deliver services that process platform trading and settlement events",
      "Partner with product on managed portfolio implementation capability",
      "Uphold engineering standards for testing, observability and security",
    ],
  },
  {
    id: "prd-1188",
    title: "Product Manager, Managed Portfolios",
    team: "Product",
    location: "Sydney or Melbourne (hybrid)",
    type: "Permanent full time",
    posted: "2026-07-29",
    summary:
      "Own the roadmap for managed portfolio capability, from portfolio manager tooling to adviser implementation.",
    responsibilities: [
      "Define and prioritise the managed portfolio roadmap",
      "Work directly with advisers and portfolio managers to validate problems",
      "Partner with engineering and risk to deliver regulated change",
    ],
  },
  {
    id: "bdm-3302",
    title: "Business Development Manager, WA",
    team: "Distribution",
    location: "Perth",
    type: "Permanent full time",
    posted: "2026-07-21",
    summary:
      "Grow adviser relationships across Western Australia and support practice transitions.",
    responsibilities: [
      "Build relationships with advice practices and licensees in the region",
      "Support platform transitions end to end",
      "Deliver education on managed portfolios and platform capability",
    ],
  },
  {
    id: "ops-2210",
    title: "Client Service Consultant",
    team: "Operations",
    location: "Sydney",
    type: "Permanent full time",
    posted: "2026-07-15",
    summary: "Support advisers and their clients through the adviser and investor phone lines.",
    responsibilities: [
      "Resolve adviser and investor enquiries at first contact",
      "Process account, pension and rollover requests",
      "Identify recurring issues and feed them back to product",
    ],
  },
  {
    id: "dat-1750",
    title: "Data Engineer, HUBconnect",
    team: "Technology",
    location: "Melbourne (hybrid)",
    type: "Permanent full time",
    posted: "2026-07-02",
    summary: "Build the pipelines that normalise holdings and transaction data for licensees.",
    responsibilities: [
      "Develop and operate ingestion pipelines across multiple registries",
      "Maintain data quality controls and reconciliation reporting",
      "Support licensee onboarding to HUBconnect feeds",
    ],
  },
  {
    id: "risk-0912",
    title: "Compliance Manager, Superannuation",
    team: "Risk & Compliance",
    location: "Sydney (hybrid)",
    type: "Permanent full time",
    posted: "2026-06-24",
    summary:
      "Support the trustee relationship and compliance framework for superannuation products.",
    responsibilities: [
      "Monitor obligations across the superannuation product suite",
      "Support the trustee's governance and reporting requirements",
      "Advise product teams on regulatory change",
    ],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    slug: "managed-portfolio-masterclass",
    title: "Managed portfolio masterclass",
    format: "Masterclass",
    cpdPoints: 3,
    duration: "3 x 60 min",
    presenter: "Priya Sharma, Head of Technical Services",
    summary:
      "A three-part series covering portfolio construction, tax outcomes and client communication for managed accounts.",
    topics: ["Portfolio construction", "Tax and CGT", "Client conversations"],
  },
  {
    slug: "engage-in-practice",
    title: "Engage in practice: running a review meeting",
    format: "Webinar",
    cpdPoints: 1,
    duration: "45 min",
    presenter: "Leah Winterton, Group Product Manager",
    summary:
      "Walk through preparing and presenting a client review using Engage, including non-custodial assets.",
    topics: ["Reporting", "Client engagement"],
  },
  {
    slug: "retirement-income-strategies",
    title: "Retirement income strategies on platform",
    format: "Course",
    cpdPoints: 2,
    duration: "90 min",
    presenter: "Tom Ellery, Technical Specialist",
    summary:
      "Transition to retirement, account-based pensions, minimum drawdowns and same-day strategy processing.",
    topics: ["Superannuation", "Retirement", "Technical"],
  },
  {
    slug: "smsf-access-for-accountants",
    title: "SMSF Access for accounting firms",
    format: "Webinar",
    cpdPoints: 1,
    duration: "50 min",
    presenter: "Ken Mitsu, Chief Executive, Class",
    summary: "How platform administration and Class remove the annual SMSF reconciliation cycle.",
    topics: ["SMSF", "Class", "Practice management"],
  },
  {
    slug: "advice-efficiency-podcast",
    title: "The advice efficiency series",
    format: "Podcast",
    cpdPoints: 0,
    duration: "6 episodes",
    presenter: "HUB24 Insights",
    summary:
      "Practice leaders describe what they changed to serve more clients without adding headcount.",
    topics: ["Practice management", "Productivity"],
  },
  {
    slug: "cyber-security-for-practices",
    title: "Cyber security obligations for advice practices",
    format: "Course",
    cpdPoints: 2,
    duration: "75 min",
    presenter: "James Whelan, Chief Technology Officer",
    summary:
      "Practical controls, incident response and what licensees expect from practice-level security.",
    topics: ["Security", "Compliance"],
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    date: "2026-07-14",
    title: "FY26 platform funds under administration and net inflows",
    kind: "Market sensitive",
    pages: 8,
  },
  { date: "2026-06-30", title: "Investor update presentation", kind: "Presentation", pages: 34 },
  { date: "2026-05-15", title: "Q3 FY26 business update", kind: "Periodic report", pages: 12 },
  {
    date: "2026-04-17",
    title: "Notice of annual general meeting",
    kind: "Investor update",
    pages: 6,
  },
  {
    date: "2026-02-24",
    title: "Half year results announcement",
    kind: "Market sensitive",
    pages: 42,
  },
  { date: "2026-02-24", title: "Half year results presentation", kind: "Presentation", pages: 38 },
  { date: "2025-11-27", title: "Q1 FY26 business update", kind: "Periodic report", pages: 11 },
  { date: "2025-10-30", title: "Annual report", kind: "Periodic report", pages: 128 },
];

/** Illustrative share information for the demo shareholder centre. */
export const SHARE_INFO = {
  ticker: "ASX:HUB",
  price: 92.14,
  change: 1.36,
  changePercent: 1.5,
  marketCap: "$7.6b",
  sharesOnIssue: "82.4m",
  financialYearEnd: "30 June",
  registry: "Boardroom Pty Limited",
  asAt: "2026-08-14",
};

export const KEY_DATES = [
  { date: "2026-08-25", event: "FY26 full year results announcement" },
  { date: "2026-09-11", event: "Ex-dividend date, final dividend" },
  { date: "2026-09-25", event: "Final dividend payment date" },
  { date: "2026-11-19", event: "Annual general meeting" },
  { date: "2027-02-23", event: "HY27 half year results announcement" },
];

export const FAQS: Faq[] = [
  {
    question: "How do I open a HUB24 account?",
    answer:
      "Accounts are opened through a financial adviser. Your adviser completes the online application and, in most cases, the account is opened the same day through straight-through processing.",
    audience: "Advisers",
  },
  {
    question: "Which investment menu should I use?",
    answer:
      "Discover suits clients with less complex needs, Core suits lower balances and straightforward portfolios, and Choice offers the full investment universe. Clients can move between menus while keeping the same account.",
    audience: "Advisers",
  },
  {
    question: "How long does a rollover take?",
    answer:
      "Electronic rollovers initiated online are typically received within three business days. You can track progress in AdviserHUB.",
    audience: "Advisers",
  },
  {
    question: "How do I see my account online?",
    answer:
      "Advised clients access InvestorHUB with the credentials provided by their adviser. The same information is available in the mobile app.",
    audience: "Investors",
  },
  {
    question: "Will HUB24 ever call me about an investment opportunity?",
    answer:
      "No. HUB24 will never contact you regarding potential investment opportunities. If you receive such contact, treat it as a scam and speak to your adviser.",
    audience: "Investors",
  },
  {
    question: "When are results announced?",
    answer:
      "Half year results are released in February and full year results in August, alongside quarterly business updates in November and May.",
    audience: "Shareholders",
  },
  {
    question: "Who manages the share registry?",
    answer:
      "In this demo the registry is shown as Boardroom Pty Limited. Shareholders would update their details directly with the registry.",
    audience: "Shareholders",
  },
];
