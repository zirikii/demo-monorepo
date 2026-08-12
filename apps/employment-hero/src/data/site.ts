import {
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Gift,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Laptop2,
  LayoutDashboard,
  Megaphone,
  Network,
  NotebookTabs,
  Plane,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Employment OS",
        href: "/products/employment-os",
        description: "One system for every part of employment.",
      },
      {
        label: "HR software",
        href: "/products/hr-software",
        description: "Automate HR admin from hire to retire.",
      },
      {
        label: "Payroll",
        href: "/products/payroll-software",
        description: "Accurate, compliant pay runs.",
      },
      {
        label: "Hiring",
        href: "/products/hiring",
        description: "Find and onboard great people faster.",
      },
      {
        label: "Employee experience",
        href: "/products/employee-experience",
        description: "Make work feel less like work.",
      },
      {
        label: "Hero AI",
        href: "/products/hero-ai",
        description: "Intelligent agents built for employment.",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/small-business",
    children: [
      {
        label: "Small business",
        href: "/solutions/small-business",
        description: "Powerful tools without the overhead.",
      },
      {
        label: "Medium business",
        href: "/solutions/medium-business",
        description: "Scale people operations confidently.",
      },
      {
        label: "Enterprise",
        href: "/solutions/enterprise",
        description: "Control, compliance and flexibility.",
      },
      {
        label: "By industry",
        href: "/industries",
        description: "Purpose-built employment workflows.",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Resource hub",
        href: "/resources",
        description: "Ideas and tools for better employment.",
      },
      {
        label: "Blog",
        href: "/resources/blog",
        description: "News, insights and practical advice.",
      },
      {
        label: "Guides and playbooks",
        href: "/resources/guides-and-playbooks",
        description: "Deep expertise made useful.",
      },
      {
        label: "Webinars",
        href: "/resources/webinars",
        description: "Watch and learn from industry experts.",
      },
      {
        label: "Templates",
        href: "/resources/templates",
        description: "Ready-to-use workplace resources.",
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
];

export type Product = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
  tone: "violet" | "coral" | "green" | "blue" | "yellow";
  features: string[];
};

export const products: Product[] = [
  {
    slug: "employment-os",
    title: "Employment OS",
    eyebrow: "The complete system",
    summary: "Hiring, HR, payroll and employee experience finally speak the same language.",
    detail:
      "Connect every stage of employment in one intelligent operating system, with data that flows from applicant to alum.",
    icon: Sparkles,
    tone: "violet",
    features: ["One connected employee record", "Automated workflows", "Built-in compliance"],
  },
  {
    slug: "hr-software",
    title: "HR software",
    eyebrow: "People operations",
    summary: "Handle every HR moment without drowning in paperwork.",
    detail:
      "Digitise onboarding, policies, performance, assets, expenses and employee records in a single source of truth.",
    icon: Users,
    tone: "coral",
    features: ["Paperless onboarding", "Performance reviews", "Employee files"],
  },
  {
    slug: "payroll-software",
    title: "Intelligent payroll",
    eyebrow: "Pay made simple",
    summary: "Approve with confidence. We handle the heavy lifting.",
    detail:
      "Bring timesheets, leave, expenses, awards and pay runs together with automatic checks before payday.",
    icon: CircleDollarSign,
    tone: "green",
    features: ["Automated pay runs", "Award interpretation", "Payroll reporting"],
  },
  {
    slug: "hiring",
    title: "Hiring",
    eyebrow: "Recruitment on autopilot",
    summary: "Go from open role to ready-to-start employee in one flow.",
    detail:
      "Source candidates, manage interviews, issue contracts and trigger onboarding without re-keying details.",
    icon: BriefcaseBusiness,
    tone: "blue",
    features: ["SmartMatch talent pool", "Interview workflows", "One-click onboarding"],
  },
  {
    slug: "applicant-tracking-system",
    title: "Applicant tracking",
    eyebrow: "A better candidate journey",
    summary: "Keep every candidate and hiring decision moving.",
    detail:
      "Centralise job ads, candidate communication, scorecards and approvals in one collaborative dashboard.",
    icon: NotebookTabs,
    tone: "yellow",
    features: ["Custom career pages", "Talent pools", "Structured scorecards"],
  },
  {
    slug: "employee-experience",
    title: "Employee experience",
    eyebrow: "Work, money, career and benefits",
    summary: "Give your people a workplace app they actually want to use.",
    detail:
      "Self-service leave, payslips, benefits, learning and recognition make everyday employment easier.",
    icon: HeartHandshake,
    tone: "violet",
    features: ["EH Work app", "Benefits and rewards", "Recognition"],
  },
  {
    slug: "workforce-management",
    title: "Workforce management",
    eyebrow: "Time that works",
    summary: "Match people, shifts and demand without spreadsheet chaos.",
    detail: "Build rosters, capture time, manage leave and understand labour costs in real time.",
    icon: Clock3,
    tone: "coral",
    features: ["Rostering", "Time and attendance", "Leave management"],
  },
  {
    slug: "hero-ai",
    title: "Hero AI",
    eyebrow: "Intelligence with context",
    summary: "Give every team an employment expert that never clocks off.",
    detail:
      "Answer policy questions, surface anomalies and automate repetitive work with employment-aware agents.",
    icon: Bot,
    tone: "green",
    features: ["HR assistant", "Recruitment agent", "Payroll checks"],
  },
  {
    slug: "heroforce",
    title: "HeroForce",
    eyebrow: "Global employment, handled",
    summary: "Hire and employ talent in 180+ countries without building local entities.",
    detail:
      "Combine global legal infrastructure with payroll, compliance and people support managed end to end.",
    icon: Globe2,
    tone: "blue",
    features: ["Employer of record", "Global payroll", "Local compliance"],
  },
];

export type MarketingPage = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent: string;
  features: { title: string; body: string; icon: LucideIcon }[];
  stat: string;
  statLabel: string;
};

export const marketingPages: MarketingPage[] = [
  {
    path: "/solutions/small-business",
    eyebrow: "Small business",
    title: "Less admin. More building the business you imagined.",
    intro:
      "Bring compliant HR, payroll and hiring together without adding another full-time job to your day.",
    accent: "The essentials, intelligently connected.",
    features: [
      { title: "Start quickly", body: "Guided setup and ready-to-use templates.", icon: Sparkles },
      {
        title: "Stay compliant",
        body: "Australian employment rules built into each workflow.",
        icon: ShieldCheck,
      },
      {
        title: "Save every week",
        body: "Automate repetitive people and payroll tasks.",
        icon: Clock3,
      },
    ],
    stat: "8 hrs",
    statLabel: "of admin returned to a typical team each week",
  },
  {
    path: "/solutions/medium-business",
    eyebrow: "Growing business",
    title: "Scale your people operations, not the paperwork.",
    intro: "Create consistent employee experiences across every team, site and stage of growth.",
    accent: "Visibility for leaders. Simplicity for everyone.",
    features: [
      {
        title: "Automate at scale",
        body: "Build reusable onboarding and approval flows.",
        icon: Network,
      },
      {
        title: "See the whole team",
        body: "Track headcount, cost and capability in one place.",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Grow managers",
        body: "Give leaders practical tools for performance.",
        icon: Target,
      },
    ],
    stat: "42%",
    statLabel: "faster employee onboarding in this demo scenario",
  },
  {
    path: "/solutions/enterprise",
    eyebrow: "Enterprise",
    title: "Control at scale without losing the human touch.",
    intro:
      "Flexible security, analytics and workflows for complex organisations with high standards.",
    accent: "A secure foundation for every workforce.",
    features: [
      {
        title: "Enterprise controls",
        body: "Groups, permissions and audit-ready records.",
        icon: ShieldCheck,
      },
      {
        title: "Workforce insights",
        body: "Connect people decisions to business outcomes.",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Flexible platform",
        body: "Configure structures and processes around your organisation.",
        icon: Building2,
      },
    ],
    stat: "99.9%",
    statLabel: "illustrative platform availability target",
  },
  {
    path: "/industries/healthcare",
    eyebrow: "Healthcare",
    title: "More time for care. Less time on workforce admin.",
    intro: "Keep credentials, shifts, policies and payroll moving across a complex care workforce.",
    accent: "Employment workflows that support safe care.",
    features: [
      {
        title: "Credential tracking",
        body: "Keep licences and certifications visible.",
        icon: FileCheck2,
      },
      {
        title: "Smarter rostering",
        body: "Balance coverage, skills and availability.",
        icon: CalendarDays,
      },
      {
        title: "Mobile self-service",
        body: "Give frontline teams access from anywhere.",
        icon: Laptop2,
      },
    ],
    stat: "24/7",
    statLabel: "workforce access for shift-based teams",
  },
  {
    path: "/industries/hospitality",
    eyebrow: "Hospitality",
    title: "Build brilliant shifts and even better guest experiences.",
    intro: "Roster, onboard and pay a fast-moving workforce from one connected platform.",
    accent: "Built for busy venues and changing demand.",
    features: [
      {
        title: "Fast onboarding",
        body: "Get casuals ready before their first shift.",
        icon: Sparkles,
      },
      {
        title: "Live labour view",
        body: "See scheduled costs before publishing.",
        icon: WalletCards,
      },
      {
        title: "Easy timesheets",
        body: "Capture and approve hours from any device.",
        icon: Clock3,
      },
    ],
    stat: "3 min",
    statLabel: "to publish the sample weekly roster",
  },
  {
    path: "/industries/professional-services",
    eyebrow: "Professional services",
    title: "A people platform as ambitious as your team.",
    intro: "Hire scarce talent, grow capability and keep every billable team focused.",
    accent: "Turn employee experience into an advantage.",
    features: [
      {
        title: "Talent pipelines",
        body: "Build warm pools for critical skills.",
        icon: BriefcaseBusiness,
      },
      { title: "Performance", body: "Connect goals, feedback and development.", icon: Target },
      {
        title: "Learning",
        body: "Make capability-building visible and repeatable.",
        icon: GraduationCap,
      },
    ],
    stat: "18%",
    statLabel: "illustrative increase in internal role mobility",
  },
  {
    path: "/customers",
    eyebrow: "Customer stories",
    title: "Real teams doing their best work.",
    intro:
      "See how growing organisations simplify employment and create more room for what matters.",
    accent: "One system. Thousands of different success stories.",
    features: [
      {
        title: "Koala Labs",
        body: "Cut onboarding admin while doubling headcount.",
        icon: Building2,
      },
      {
        title: "Harbour Health",
        body: "Unified credential and leave records.",
        icon: HeartHandshake,
      },
      { title: "Sunday Studio", body: "Made payroll and rostering a shared rhythm.", icon: Clock3 },
    ],
    stat: "300k+",
    statLabel: "businesses represented by the current Employment Hero brand",
  },
  {
    path: "/partners",
    eyebrow: "Partner ecosystem",
    title: "Better employment takes an ecosystem.",
    intro: "Connect trusted advisers, technology and services around one employment platform.",
    accent: "Build more value for every shared customer.",
    features: [
      { title: "Accountants", body: "Make payroll collaboration effortless.", icon: ReceiptText },
      {
        title: "Advisers",
        body: "Support clients with connected HR foundations.",
        icon: HeartHandshake,
      },
      { title: "Technology", body: "Extend workflows with useful integrations.", icon: Network },
    ],
    stat: "180+",
    statLabel: "countries supported through global employment services",
  },
  {
    path: "/about",
    eyebrow: "About Employment Hero",
    title: "Making employment easier and more valuable for everyone.",
    intro:
      "Employment Hero began in Sydney with a belief that better tools can transform the working world.",
    accent: "Employment. Intelligently Run.",
    features: [
      {
        title: "Built in Australia",
        body: "Designed around real employment complexity.",
        icon: Building2,
      },
      {
        title: "Global perspective",
        body: "Serving employers and employees across regions.",
        icon: Globe2,
      },
      {
        title: "People first",
        body: "Technology that makes human work more rewarding.",
        icon: HeartHandshake,
      },
    ],
    stat: "1M+",
    statLabel: "active job seekers in the Employment OS network",
  },
  {
    path: "/careers",
    eyebrow: "Careers",
    title: "Do the best work of your career.",
    intro: "Join a distributed team reshaping how the world hires, pays and supports people.",
    accent: "Big problems. Kind people. Real momentum.",
    features: [
      { title: "Own the outcome", body: "Move with clarity, curiosity and care.", icon: Target },
      {
        title: "Work globally",
        body: "Collaborate across ambitious regional teams.",
        icon: Globe2,
      },
      {
        title: "Keep growing",
        body: "Learn through meaningful, high-impact work.",
        icon: GraduationCap,
      },
    ],
    stat: "6",
    statLabel: "sample open roles across product, design and operations",
  },
];

export const resources = [
  {
    type: "Guide",
    title: "The AI advantage: HR’s playbook for 2026",
    summary: "A practical plan for responsible, useful AI across the employee lifecycle.",
    color: "violet",
  },
  {
    type: "Template",
    title: "Workforce planning template",
    summary: "Map headcount, capability gaps and future roles in one clear view.",
    color: "green",
  },
  {
    type: "Webinar",
    title: "Getting ready for Payday Super",
    summary: "Understand what the change means for payroll teams and employees.",
    color: "coral",
  },
  {
    type: "Article",
    title: "Build an onboarding experience people remember",
    summary: "Replace disconnected checklists with one confident first journey.",
    color: "blue",
  },
  {
    type: "Guide",
    title: "The complete payroll compliance guide",
    summary: "A plain-English tour of records, awards, pay cycles and checks.",
    color: "yellow",
  },
  {
    type: "Template",
    title: "Employee engagement action plan",
    summary: "Turn survey signals into visible, accountable action.",
    color: "violet",
  },
  {
    type: "Webinar",
    title: "Hire like a Hero",
    summary: "Build a faster recruitment process without compromising experience.",
    color: "green",
  },
  {
    type: "Article",
    title: "What great performance conversations sound like",
    summary: "Simple prompts that help managers coach with confidence.",
    color: "coral",
  },
  {
    type: "Research",
    title: "2026 Talent Insights Report",
    summary: "What Australian employers and candidates expect next.",
    color: "blue",
  },
];

const names = [
  "Avery Chen",
  "Mia Thompson",
  "Noah Williams",
  "Isla Singh",
  "Leo Martin",
  "Grace Nguyen",
  "Jack Wilson",
  "Zoe Patel",
  "Ethan Brown",
  "Ruby Anderson",
  "Lucas Taylor",
  "Chloe Davis",
  "Henry Lee",
  "Sophie Walker",
  "Oscar Hall",
  "Emily White",
  "Liam Harris",
  "Amelia Clark",
  "Thomas King",
  "Matilda Young",
  "William Scott",
  "Evie Green",
  "James Baker",
  "Lily Adams",
  "Max Roberts",
];

const roles = [
  "Product Designer",
  "Software Engineer",
  "People Partner",
  "Account Director",
  "Payroll Specialist",
];
const teams = ["Product", "Engineering", "People", "Client Services", "Finance"];

export const employees = names.map((name, index) => ({
  id: `EH-${String(index + 1).padStart(3, "0")}`,
  name,
  role: roles[index % roles.length] ?? "Team member",
  team: teams[index % teams.length] ?? "Operations",
  location: index % 3 === 0 ? "Melbourne" : index % 3 === 1 ? "Sydney" : "Remote",
  status: index % 7 === 0 ? "On leave" : "Active",
}));

export const candidates = [
  "Priya Raman",
  "Oliver Grant",
  "Sienna Moore",
  "Kai Johnson",
  "Nina Flores",
  "Archie Evans",
  "Ella Bennett",
  "Hugo Campbell",
  "Maya Cooper",
  "Finn Mitchell",
].map((name, index) => ({
  id: `C-${index + 101}`,
  name,
  role: index < 5 ? "Senior Software Engineer" : "Customer Success Lead",
  stage: ["New", "Screen", "Interview", "Interview", "Offer"][index % 5] ?? "New",
  score: 78 + (index % 5) * 4,
}));

export const dashboardNav = [
  { label: "Overview", href: "/platform/dashboard", icon: LayoutDashboard },
  { label: "People", href: "/platform/people", icon: Users },
  { label: "Payroll", href: "/platform/payroll", icon: CircleDollarSign },
  { label: "Recruitment", href: "/platform/recruitment", icon: BriefcaseBusiness },
  { label: "Leave", href: "/platform/leave", icon: Plane },
];

export const dashboardMetrics = [
  { label: "Total employees", value: "84", change: "+6 this quarter", icon: Users },
  { label: "On leave today", value: "7", change: "3 pending requests", icon: Plane },
  { label: "Open roles", value: "6", change: "42 active candidates", icon: BriefcaseBusiness },
  {
    label: "Next pay run",
    value: "$286.4k",
    change: "Approval due Friday",
    icon: CircleDollarSign,
  },
];

export const announcements = [
  {
    title: "Winter all-hands",
    detail: "Join us Thursday at 3pm for product updates and team shout-outs.",
    icon: Megaphone,
  },
  {
    title: "Benefits refresh",
    detail: "Explore the new wellbeing allowance in EH Work.",
    icon: Gift,
  },
  {
    title: "Security training",
    detail: "Complete the annual module by 28 August.",
    icon: ShieldCheck,
  },
];
