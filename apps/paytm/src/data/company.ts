export interface CompanyStat {
  value: string;
  label: string;
}

/** Headline platform stats (fictional demo figures). */
export const companyStats: CompanyStat[] = [
  { value: "30 Cr+", label: "registered users" },
  { value: "4 Cr+", label: "merchant partners" },
  { value: "₹18 Lakh Cr", label: "annual payment volume" },
  { value: "20K+", label: "cities & towns served" },
];

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

/** Fictional leadership roster for the demo About page. */
export const leadership: Leader[] = [
  { id: "l1", name: "Arjun Mehta", role: "Chief Executive Officer", bio: "Two decades building consumer internet and payments products across India.", initials: "AM" },
  { id: "l2", name: "Priya Raghavan", role: "Chief Financial Officer", bio: "Previously led finance for a listed fintech; chartered accountant by training.", initials: "PR" },
  { id: "l3", name: "Vikram Shetty", role: "Chief Technology Officer", bio: "Runs platform engineering — UPI switch, wallet core, and data infrastructure.", initials: "VS" },
  { id: "l4", name: "Nandini Iyer", role: "Chief Operating Officer", bio: "Owns merchant onboarding, device operations, and customer experience.", initials: "NI" },
  { id: "l5", name: "Rohit Bansal", role: "Head of Lending", bio: "Scales credit distribution responsibly with bank and NBFC partners.", initials: "RB" },
  { id: "l6", name: "Sara Thomas", role: "Head of Design", bio: "Leads the design system that keeps payments simple in 11 languages.", initials: "ST" },
];

export interface Milestone {
  year: string;
  title: string;
  detail: string;
}

/** Company journey timeline (paraphrased public history, demo wording). */
export const milestones: Milestone[] = [
  { year: "2010", title: "Started with recharges", detail: "Launched as a mobile top-up website serving prepaid users nationwide." },
  { year: "2014", title: "Wallet goes mainstream", detail: "The digital wallet made cashless everyday payments a habit for millions." },
  { year: "2016", title: "Payments at every counter", detail: "QR acceptance spread from metros to kirana stores in small towns." },
  { year: "2017", title: "Payments bank launch", detail: "Savings accounts and debit cards extended financial access further." },
  { year: "2019", title: "Soundbox invented", detail: "Voice-confirmation devices transformed trust for offline merchants." },
  { year: "2021", title: "Public listing", detail: "Listed on Indian stock exchanges in one of the country's largest IPOs." },
  { year: "2024", title: "UPI-first platform", detail: "Doubled down on UPI payments, credit on UPI, and merchant subscriptions." },
];

export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Internship";
  posted: string;
}

export const jobs: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer — Consumer Web", team: "Engineering", location: "Noida", type: "Full-time", posted: "2026-06-28" },
  { id: "j2", title: "Backend Engineer — UPI Switch", team: "Engineering", location: "Bengaluru", type: "Full-time", posted: "2026-06-30" },
  { id: "j3", title: "Product Manager — Bill Payments", team: "Product", location: "Noida", type: "Full-time", posted: "2026-07-01" },
  { id: "j4", title: "Data Scientist — Risk & Fraud", team: "Data", location: "Bengaluru", type: "Full-time", posted: "2026-06-25" },
  { id: "j5", title: "Design Intern — Design Systems", team: "Design", location: "Remote (India)", type: "Internship", posted: "2026-07-03" },
  { id: "j6", title: "Merchant Growth Manager", team: "Business", location: "Mumbai", type: "Full-time", posted: "2026-06-20" },
  { id: "j7", title: "SRE — Payments Reliability", team: "Engineering", location: "Noida", type: "Full-time", posted: "2026-07-05" },
  { id: "j8", title: "Content Designer — Vernacular", team: "Design", location: "Delhi NCR", type: "Full-time", posted: "2026-06-18" },
  { id: "j9", title: "Treasury Analyst", team: "Finance", location: "Mumbai", type: "Full-time", posted: "2026-06-15" },
  { id: "j10", title: "Customer Experience Lead", team: "Operations", location: "Chennai", type: "Full-time", posted: "2026-07-02" },
];

export const jobTeams: string[] = [...new Set(jobs.map((j) => j.team))].sort();
export const jobLocations: string[] = [...new Set(jobs.map((j) => j.location))].sort();

export interface FinancialResult {
  id: string;
  quarter: string;
  revenue: string;
  change: string;
  note: string;
}

/** Fictional quarterly results for the IR page. */
export const financialResults: FinancialResult[] = [
  { id: "q1fy27", quarter: "Q1 FY27", revenue: "₹2,940 Cr", change: "+18% YoY", note: "Payments and device subscriptions led growth." },
  { id: "q4fy26", quarter: "Q4 FY26", revenue: "₹2,712 Cr", change: "+15% YoY", note: "Record merchant additions; lending distribution steady." },
  { id: "q3fy26", quarter: "Q3 FY26", revenue: "₹2,588 Cr", change: "+13% YoY", note: "Festive-season GMV drove processing revenue." },
  { id: "q2fy26", quarter: "Q2 FY26", revenue: "₹2,401 Cr", change: "+11% YoY", note: "Operating leverage improved margins again." },
];

export interface PressRelease {
  id: string;
  date: string;
  title: string;
  summary: string;
}

export const pressReleases: PressRelease[] = [
  { id: "pr1", date: "2026-07-02", title: "Quarterly business update: devices cross new milestone", summary: "Subscription device base grows with strong soundbox demand across tier-2 towns." },
  { id: "pr2", date: "2026-06-12", title: "New credit-on-UPI experience announced", summary: "Eligible users can link pre-approved credit lines to UPI for everyday spends." },
  { id: "pr3", date: "2026-05-28", title: "Annual results and shareholder letter published", summary: "Full-year revenue growth with continued focus on payments profitability." },
  { id: "pr4", date: "2026-04-30", title: "Travel bookings expand with more rail partnerships", summary: "Train ticketing adds seat-availability forecasts and faster refunds." },
  { id: "pr5", date: "2026-03-15", title: "Security whitepaper: how we protect every transaction", summary: "A deep dive into device binding, tokenisation, and fraud models." },
];

export interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  minutes: number;
}

export const blogPosts: BlogPost[] = [
  { id: "bp1", date: "2026-07-05", category: "Product", title: "Designing a UPI statement people actually read", excerpt: "Why we rebuilt monthly statements around categories, not transaction logs.", minutes: 6 },
  { id: "bp2", date: "2026-06-27", category: "Engineering", title: "Scaling recharge search to festival-day traffic", excerpt: "Caching browse-plans without serving stale tariffs during price updates.", minutes: 8 },
  { id: "bp3", date: "2026-06-18", category: "Safety", title: "Five habits that keep your UPI account safe", excerpt: "Simple checks — from screen-share hygiene to collect-request awareness.", minutes: 4 },
  { id: "bp4", date: "2026-06-02", category: "Business", title: "What soundbox data says about small-town commerce", excerpt: "Payment rhythms across mandis, salons, and tea stalls in 2026.", minutes: 7 },
  { id: "bp5", date: "2026-05-21", category: "Product", title: "Inside the new travel search: fewer taps to takeoff", excerpt: "How special fares, smart defaults, and route memory cut booking time.", minutes: 5 },
  { id: "bp6", date: "2026-05-09", category: "Engineering", title: "Our design tokens journey to Tailwind v4", excerpt: "One theme file now powers web, mweb, and internal dashboards.", minutes: 9 },
];

export const blogCategories: string[] = [...new Set(blogPosts.map((p) => p.category))];
