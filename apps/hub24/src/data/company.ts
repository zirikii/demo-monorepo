import type { Bdm, GroupBrand, Job, Leader, LegalPage } from "./types";

export const VALUES = [
  {
    title: "We put customers first",
    body: "We succeed when we add value to our clients, partners and customers. Every decision starts with the financial professional and the client they serve.",
  },
  {
    title: "We are accountable",
    body: "We own the outcome, not the activity. Where something has gone wrong we say so early and fix it.",
  },
  {
    title: "We collaborate",
    body: "The wealth industry's hardest problems are shared ones. We solve them with licensees, advisers and investment managers rather than around them.",
  },
  {
    title: "We innovate with intent",
    body: "Innovation that delivers — making the complex simple, rather than adding features nobody asked for.",
  },
] as const;

export const TIMELINE = [
  { year: "2007", event: "HUB24 Limited established." },
  { year: "2013", event: "The HUB24 platform passes $1 billion in funds under administration." },
  { year: "2018", event: "Platform FUA reaches $7 billion after a record second quarter." },
  { year: "2021", event: "Class Limited and the Agility data business (rebranded HUBconnect) join the Group." },
  { year: "2023", event: "myprosperity acquired; Xplore platform migration to HUB24 begins." },
  { year: "2024", event: "Admitted to the S&P/ASX 100 index." },
  { year: "2025", event: "Platform FUA surpasses $100 billion; record net inflows of $19.8 billion." },
  { year: "2026", event: "Total FUA reaches $164.3 billion; 5,649 active advisers on the platform." },
] as const;

export const GROUP_BRANDS: GroupBrand[] = [
  {
    slug: "hub24",
    name: "HUB24",
    descriptor: "Australia's best platform",
    body: "The award-winning investment and superannuation platform, with managed portfolio technology, SMSF Access, high-net-worth capability and Engage reporting.",
    stats: [
      { label: "Platform FUA", value: "$139.5b" },
      { label: "Active advisers", value: "5,649" },
      { label: "Market share", value: "9.9%" },
    ],
  },
  {
    slug: "class",
    name: "Class",
    descriptor: "Cloud wealth accounting",
    body: "Trust accounting, portfolio management and SMSF administration software used by around 6,500 accounting and advice firms across Australia.",
    stats: [
      { label: "Class Super accounts", value: "226,767" },
      { label: "Customers", value: "~6,500 firms" },
      { label: "Growth", value: "+5% YoY" },
    ],
  },
  {
    slug: "nowinfinity",
    name: "NowInfinity",
    descriptor: "Corporate compliance & documentation",
    body: "Legal documentation and corporate compliance — company registrations, trust deeds and ongoing ASIC obligations, integrated with Class.",
    stats: [
      { label: "Document orders", value: "+15% YoY" },
      { label: "Integration", value: "Class" },
      { label: "Segment", value: "Tech Solutions" },
    ],
  },
  {
    slug: "myprosperity",
    name: "myprosperity",
    descriptor: "Client portals",
    body: "A leading provider of client portals for accountants and financial advisers, making it easier for Australians to share and collaborate with their financial professional.",
    stats: [
      { label: "Firms", value: "531" },
      { label: "Households", value: "~107,000" },
      { label: "Security", value: "Mandatory MFA" },
    ],
  },
  {
    slug: "hubconnect",
    name: "HUBconnect",
    descriptor: "Data & technology solutions",
    body: "Integrates, refines, stores and supplies structured and unstructured data to the advice industry through feeds, automated reporting and analytics.",
    stats: [
      { label: "Segment", value: "Tech Solutions" },
      { label: "Delivery", value: "Feeds and APIs" },
      { label: "Applied", value: "ML and NLP" },
    ],
  },
];

export const LEADERS: Leader[] = [
  {
    id: "leader-001",
    name: "Andrea Sokolov",
    role: "Managing Director & Chief Executive Officer",
    focus: "Group strategy",
    bio: "Joined HUB24 after two decades across platform, superannuation and advice businesses. Leads the Group's strategy of integrated platform, technology and data solutions.",
  },
  {
    id: "leader-002",
    name: "Peter Vasilakis",
    role: "Chief Financial Officer",
    focus: "Finance and investor relations",
    bio: "Responsible for finance, treasury, investor relations and corporate development across the HUB24 Group, including the Class and myprosperity businesses.",
  },
  {
    id: "leader-003",
    name: "Marissa Bell",
    role: "Chief Operating Officer, Platform",
    focus: "Platform operations",
    bio: "Runs custody, registry, client services and implementation for the HUB24 platform, including the transition function that onboards licensee books.",
  },
  {
    id: "leader-004",
    name: "Raj Shanmugam",
    role: "Chief Technology Officer",
    focus: "Technology and data",
    bio: "Leads engineering, security and the Group data platform, including HUBconnect and the shared HUB24 Design System used across Group applications.",
  },
  {
    id: "leader-005",
    name: "Simone Kaur",
    role: "Chief Distribution Officer",
    focus: "Licensees and advisers",
    bio: "Leads distribution across licensees, advisers, private wealth and investment managers, and the national Business Development Manager team.",
  },
  {
    id: "leader-006",
    name: "Ben Iredale",
    role: "Chief Product Officer",
    focus: "Product",
    bio: "Owns the product roadmap across HUB24 Invest, HUB24 Super, managed portfolios, SMSF Access, Private Invest and Engage.",
  },
  {
    id: "leader-007",
    name: "Dr Helen Aziz",
    role: "Chief Risk Officer",
    focus: "Risk and compliance",
    bio: "Responsible for enterprise risk, compliance and the Group's regulatory relationships across APRA and ASIC-regulated entities.",
  },
  {
    id: "leader-008",
    name: "Nadia Fischer",
    role: "Chief People Officer",
    focus: "People and culture",
    bio: "Leads people strategy across the Group's 1,010 employees, including engagement, capability and the graduate program.",
  },
];

export const JOBS: Job[] = [
  {
    id: "job-001",
    title: "Senior Software Engineer — Platform",
    team: "Engineering",
    location: "Sydney, NSW (hybrid)",
    type: "Full time",
    posted: "2026-08-10",
    summary:
      "Build and scale the services behind custody, registry and trading for a platform administering $139.5 billion.",
    responsibilities: [
      "Design and build services in the platform core domain",
      "Own reliability and performance for the systems your team ships",
      "Contribute to the shared HUB24 Design System where you touch UI",
      "Mentor engineers through design review and pairing",
    ],
    requirements: [
      "6+ years building production backend services",
      "Strong grounding in a typed language and relational data modelling",
      "Experience in financial services or another regulated domain",
      "Comfortable owning on-call for what you build",
    ],
  },
  {
    id: "job-002",
    title: "Business Development Manager — Private Wealth",
    team: "Distribution",
    location: "Melbourne, VIC",
    type: "Full time",
    posted: "2026-08-05",
    summary:
      "Partner with private wealth advisers and brokers to grow adoption of Private Invest and Engage across Victoria.",
    responsibilities: [
      "Own a territory of private wealth practices and brokers",
      "Run platform demonstrations and transition conversations",
      "Work with implementation managers on book transitions",
      "Feed adviser requirements back into product",
    ],
    requirements: [
      "5+ years in platform, funds or advice distribution",
      "Understanding of high-net-worth advice needs",
      "RG146 or equivalent",
      "Willingness to travel within the territory",
    ],
  },
  {
    id: "job-003",
    title: "Client Services Consultant",
    team: "Platform Operations",
    location: "Sydney, NSW",
    type: "Full time",
    posted: "2026-07-29",
    summary:
      "Be the voice on 1300 854 994 for advisers and support staff, resolving platform and account queries first time.",
    responsibilities: [
      "Handle inbound adviser and investor enquiries",
      "Resolve account, transaction and reporting queries",
      "Escalate and track complex cases to resolution",
      "Identify recurring issues worth fixing at the source",
    ],
    requirements: [
      "2+ years in financial services client service",
      "Clear written and verbal communication",
      "Comfort with platform and registry systems",
      "RG146 desirable",
    ],
  },
  {
    id: "job-004",
    title: "Product Manager — Managed Portfolios",
    team: "Product",
    location: "Sydney, NSW (hybrid)",
    type: "Full time",
    posted: "2026-07-21",
    summary:
      "Own the roadmap for the managed portfolio capability that advisers rate the best in the market.",
    responsibilities: [
      "Set and communicate the managed portfolio roadmap",
      "Work directly with advisers and investment managers on requirements",
      "Partner with engineering on delivery and trade-offs",
      "Define success measures and hold the product to them",
    ],
    requirements: [
      "4+ years in product management, ideally wealth or investment tech",
      "Fluency in portfolio construction and rebalancing mechanics",
      "Evidence of shipping to a regulated customer base",
      "Strong written communication",
    ],
  },
  {
    id: "job-005",
    title: "Data Engineer — HUBconnect",
    team: "Tech Solutions",
    location: "Brisbane, QLD (hybrid)",
    type: "Full time",
    posted: "2026-07-14",
    summary: "Build the pipelines that integrate, refine and supply advice industry data at scale.",
    responsibilities: [
      "Build and operate ingestion pipelines for structured and unstructured data",
      "Model data for downstream reporting and analytics",
      "Improve data quality monitoring and lineage",
      "Work with licensee customers on integration requirements",
    ],
    requirements: [
      "4+ years in data engineering",
      "Strong SQL and one of Python or Scala",
      "Experience with streaming or batch orchestration frameworks",
      "Financial services data experience an advantage",
    ],
  },
  {
    id: "job-006",
    title: "Compliance Manager — Superannuation",
    team: "Risk & Compliance",
    location: "Sydney, NSW",
    type: "Full time",
    posted: "2026-06-30",
    summary: "Support the trustee and promoter obligations for HUB24 Super across an APRA-regulated fund.",
    responsibilities: [
      "Monitor compliance with SIS and APRA prudential standards",
      "Support trustee board and committee reporting",
      "Review member communications and disclosure documents",
      "Manage regulatory correspondence and breach reporting",
    ],
    requirements: [
      "5+ years in superannuation compliance",
      "Working knowledge of SIS, RG 97 and DDO",
      "Relevant tertiary qualification",
      "Experience supporting a trustee board",
    ],
  },
  {
    id: "job-007",
    title: "Implementation Manager — Transitions",
    team: "Platform Operations",
    location: "Remote (Australia)",
    type: "Contract",
    posted: "2026-06-17",
    summary: "Run bulk client book transitions onto the platform, from exception mapping to final reconciliation.",
    responsibilities: [
      "Map incoming holdings and agree treatment for exceptions",
      "Sequence transitions into cohorts and hold the timeline",
      "Coordinate in-specie transfers with counterparties",
      "Reconcile and sign off completed transitions",
    ],
    requirements: [
      "Platform or registry transition experience",
      "Meticulous reconciliation discipline",
      "Confidence dealing directly with practice principals",
      "Available for a 12-month engagement",
    ],
  },
  {
    id: "job-008",
    title: "UX Designer — Design System",
    team: "Design",
    location: "Sydney, NSW (hybrid)",
    type: "Full time",
    posted: "2026-06-02",
    summary:
      "Extend the multi-brand HUB24 Design System that underpins HUB24, Class and NowInfinity applications.",
    responsibilities: [
      "Design and document components and patterns",
      "Maintain the token architecture across Group brands",
      "Partner with engineering on implementation fidelity",
      "Run accessibility reviews on new patterns",
    ],
    requirements: [
      "4+ years in product or systems design",
      "Deep Figma component and variable skills",
      "Demonstrated accessibility practice",
      "Experience with multi-brand token architecture",
    ],
  },
];

export function findJob(id: string): Job | undefined {
  return JOBS.find((job) => job.id === id);
}

export const BDMS: Bdm[] = [
  { id: "bdm-001", name: "Claire Donnelly", title: "Senior BDM", state: "NSW", segment: "Advisers", phone: "0412 118 204", email: "claire.donnelly@hub24.com.au" },
  { id: "bdm-002", name: "Hamish Reid", title: "BDM", state: "NSW", segment: "Private wealth", phone: "0412 118 209", email: "hamish.reid@hub24.com.au" },
  { id: "bdm-003", name: "Ana Petrovic", title: "Senior BDM", state: "VIC", segment: "Advisers", phone: "0413 220 771", email: "ana.petrovic@hub24.com.au" },
  { id: "bdm-004", name: "Tim Whately", title: "BDM", state: "VIC", segment: "Private wealth", phone: "0413 220 776", email: "tim.whately@hub24.com.au" },
  { id: "bdm-005", name: "Josie Nakamura", title: "Senior BDM", state: "QLD", segment: "Advisers", phone: "0414 305 118", email: "josie.nakamura@hub24.com.au" },
  { id: "bdm-006", name: "Elliot Barnes", title: "BDM", state: "QLD", segment: "Licensees", phone: "0414 305 122", email: "elliot.barnes@hub24.com.au" },
  { id: "bdm-007", name: "Marcus Deakin", title: "Senior BDM", state: "WA", segment: "Advisers", phone: "0415 447 903", email: "marcus.deakin@hub24.com.au" },
  { id: "bdm-008", name: "Priya Sundar", title: "BDM", state: "SA", segment: "Advisers", phone: "0416 512 660", email: "priya.sundar@hub24.com.au" },
  { id: "bdm-009", name: "Lachlan Reeve", title: "BDM", state: "TAS", segment: "Advisers", phone: "0417 660 335", email: "lachlan.reeve@hub24.com.au" },
  { id: "bdm-010", name: "Georgia Mwangi", title: "National Manager", state: "National", segment: "Investment managers", phone: "0418 774 210", email: "georgia.mwangi@hub24.com.au" },
  { id: "bdm-011", name: "Sam Trethewey", title: "National Manager", state: "National", segment: "Licensees", phone: "0418 774 218", email: "sam.trethewey@hub24.com.au" },
  { id: "bdm-012", name: "Nadine Boulos", title: "BDM", state: "ACT", segment: "Advisers", phone: "0419 883 145", email: "nadine.boulos@hub24.com.au" },
];

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    updated: "2026-07-01",
    sections: [
      {
        heading: "About this demo policy",
        body: [
          "This page exists so the demo has the same information architecture as the real site. It is not a legal document and it describes only what this demonstration build does.",
        ],
      },
      {
        heading: "What this demo stores",
        body: [
          "This build has no backend. The only information kept is a small amount of state in your browser's localStorage: a mock session token when you log in, your notification preferences from the settings page, and any trades you place in AdviserHUB.",
          "Nothing is transmitted to a server. Clearing site data removes all of it.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "No tracking or analytics cookies are set. The cookie banner in this demo records only that you dismissed it.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Website terms of use",
    updated: "2026-07-01",
    sections: [
      {
        heading: "Unofficial demonstration",
        body: [
          "This site is an unofficial demonstration build. It is not affiliated with, endorsed by, or connected to HUB24 Limited (ABN 87 124 891 685, ASX:HUB) or any of its subsidiaries.",
        ],
      },
      {
        heading: "No financial product advice",
        body: [
          "Nothing on this site is financial product advice, an offer, or a recommendation. Every account, holding, transaction, adviser, client and performance figure shown in the portals is invented for demonstration purposes.",
          "Product features described in the marketing pages paraphrase publicly available material and should not be relied on as a description of any real product.",
        ],
      },
      {
        heading: "Availability",
        body: [
          "This build runs entirely in your browser and carries no service commitment. It may be changed or removed at any time.",
        ],
      },
    ],
  },
  {
    slug: "target-market-determinations",
    title: "Target market determinations",
    updated: "2026-08-11",
    sections: [
      {
        heading: "What a TMD does",
        body: [
          "Under the design and distribution obligations, an issuer must describe the class of consumer a financial product has been designed for, along with distribution conditions and review triggers.",
        ],
      },
      {
        heading: "Where to find them",
        body: [
          "In this demo, target market determinations are listed alongside every other disclosure document on the product documents page, filterable by product and document type. The files are placeholders — they do not download.",
        ],
      },
    ],
  },
];

export function findLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
