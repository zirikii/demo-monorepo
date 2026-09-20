import type {
  Benefit,
  CulturePrinciple,
  EmployeeStory,
  Leader,
  Office,
  TimelineEntry,
} from "./types";

export const CULTURE_PRINCIPLES: CulturePrinciple[] = [
  {
    title: "Shipping beats speculating",
    body: "A rough version in front of a real merchant this week teaches us more than a perfect plan reviewed next month. We optimise for shortening that loop.",
  },
  {
    title: "Failure is tuition, not a verdict",
    body: "Post-incident reviews are blameless and published internally in full. The only unacceptable outcome is an outage we learn nothing from.",
  },
  {
    title: "Closest to the problem decides",
    body: "The engineer on the pager and the designer in the field carry more context than any org chart. Decisions default to them, with escalation as the exception.",
  },
  {
    title: "Build for the hardest user first",
    body: "If the flow works on a five-year-old phone on a weak connection in a crowded market, it works everywhere else too.",
  },
  {
    title: "Write it down",
    body: "Design documents, decision records, and runbooks are how a distributed team stays coherent across six time zones and a thousand services.",
  },
  {
    title: "Small teams, real ownership",
    body: "Squads own their services from design through to the pager. Nobody hands work over a wall to an operations team that never saw the code.",
  },
];

export const WAYS_OF_WORKING: CulturePrinciple[] = [
  {
    title: "Distributed by default",
    body: "Meetings are documented, recorded, and scheduled in the overlap window shared by Jakarta, Singapore, and Bengaluru. If it only exists in a room, it does not exist.",
  },
  {
    title: "Two no-meeting days",
    body: "Tuesdays and Thursdays are protected for deep work across all engineering teams. Incident response is the only standing exception.",
  },
  {
    title: "Design review, not design approval",
    body: "Every substantial change gets a written design and an open review. Reviewers advise; the owning squad still decides.",
  },
  {
    title: "Rotating pager, funded",
    body: "On-call is compensated, capped at one week in six, and followed by a protected recovery day after any overnight page.",
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: "Health cover for your household",
    body: "Medical, dental, and mental health cover extending to partners, children, and parents, across every market we operate in.",
  },
  {
    title: "Unlimited sick leave",
    body: "Being unwell is not a budget. Take the time, tell your team, and come back when you are ready.",
  },
  {
    title: "Learning budget that renews",
    body: "An annual budget for conferences, courses, and books, plus internal engineering weeks run by the teams themselves.",
  },
  {
    title: "Parental leave for every parent",
    body: "Sixteen weeks for primary carers and eight for secondary, with a phased return that is actually phased.",
  },
  {
    title: "Platform credits",
    body: "Monthly credits across rides, food, and deliveries. Dogfooding is easier when you use the product daily.",
  },
  {
    title: "Home setup allowance",
    body: "A one-off allowance and an annual refresh so your desk at home matches the one in the office.",
  },
];

export const EMPLOYEE_STORIES: EmployeeStory[] = [
  {
    name: "Rizky Pratama",
    role: "Senior Backend Engineer, Marketplace",
    office: "Jakarta",
    years: "4 years",
    quote:
      "I joined to work on a hard matching problem and stayed because I can see the effect of a deploy on the street outside the office. That feedback loop is rare.",
  },
  {
    name: "Shreya Iyer",
    role: "Staff Data Scientist, Data Platform",
    office: "Bengaluru",
    years: "3 years",
    quote:
      "The data is messy in the way real operations are messy. You learn to build models that survive reality rather than models that survive a notebook.",
  },
  {
    name: "Nurul Aini",
    role: "Product Designer, Merchant",
    office: "Jakarta",
    years: "2 years",
    quote:
      "My first month included three days behind a warung counter. Every design decision I have made since has been shaped by what I saw during a dinner rush.",
  },
  {
    name: "Daniel Tan",
    role: "Engineering Manager, Payments",
    office: "Singapore",
    years: "5 years",
    quote:
      "We run blameless reviews properly, which means people report near-misses. That single habit has prevented more outages than any tool we bought.",
  },
];

export const OFFICES: Office[] = [
  {
    city: "Jakarta",
    country: "Indonesia",
    focus: "Marketplace, Payments, Merchant",
    headcount: 2100,
  },
  { city: "Bandung", country: "Indonesia", focus: "Merchant apps, QA", headcount: 240 },
  { city: "Yogyakarta", country: "Indonesia", focus: "Quality engineering", headcount: 120 },
  {
    city: "Singapore",
    country: "Singapore",
    focus: "Payments, Security, Regional product",
    headcount: 480,
  },
  { city: "Bengaluru", country: "India", focus: "Data platform, ML", headcount: 610 },
  {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    focus: "Consumer product engineering",
    headcount: 185,
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2010",
    title: "A call centre with twenty riders",
    body: "The company starts as a phone line matching customers with motorbike couriers in Jakarta. No app, no platform, one whiteboard.",
  },
  {
    year: "2015",
    title: "The app ships",
    body: "Four services launch together: rides, courier, shopping, and food. Engineering is a single Rails monolith and a very busy database.",
  },
  {
    year: "2016",
    title: "Payments becomes its own problem",
    body: "The wallet launches and immediately becomes the settlement layer under every other product, forcing the first real service split.",
  },
  {
    year: "2018",
    title: "Beyond Indonesia",
    body: "Regional expansion begins, and with it the work of making the platform multi-country without forking it per market.",
  },
  {
    year: "2020",
    title: "Merchant tools take centre stage",
    body: "As storefronts close, the merchant suite grows from an order queue into a full operating toolkit for small businesses.",
  },
  {
    year: "2023",
    title: "Platform consolidation",
    body: "A decade of decomposition is audited. Six services are merged back, and service ownership is realigned to team boundaries.",
  },
  {
    year: "2026",
    title: "Where we are now",
    body: "Three countries, more than twenty products, and roughly a thousand services deployed continuously by squads that own them end to end.",
  },
];

export const LEADERS: Leader[] = [
  {
    name: "Arif Wibowo",
    role: "Chief Technology Officer",
    focus: "Platform strategy and engineering org",
  },
  {
    name: "Lina Kusumo",
    role: "VP Engineering, Marketplace",
    focus: "Allocation, pricing, trip lifecycle",
  },
  {
    name: "Harish Menon",
    role: "VP Engineering, Data & ML",
    focus: "Data platform, forecasting, ranking",
  },
  {
    name: "Sri Handayani",
    role: "VP Product, Merchant",
    focus: "Merchant tools and small-business growth",
  },
  {
    name: "Joel Lawrence",
    role: "VP Design",
    focus: "Asphalt design system and research practice",
  },
  {
    name: "Putri Mahendra",
    role: "VP Security & Trust",
    focus: "Application security, fraud, and privacy",
  },
];

export const IMPACT_STATS = [
  {
    value: "2.9M",
    label: "driver partners",
    detail: "earning on the platform across three countries",
  },
  { value: "1.1M", label: "merchants", detail: "most of them small, family-run businesses" },
  {
    value: "38M",
    label: "wallet transactions a day",
    detail: "across rides, food, bills, and QR payments",
  },
  {
    value: "3,740",
    label: "people in tech",
    detail: "across six offices and a remote-first policy",
  },
];
