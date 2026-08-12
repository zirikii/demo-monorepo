import type { NavAudience, NavLink } from "./types";

export const navAudiences: NavAudience[] = [
  {
    id: "businesses",
    label: "Businesses",
    headline: "Employment OS for your business",
    blurb: "Every part of employment, intelligently run.",
    cta: { label: "See all products", to: "/products" },
    columns: [
      {
        heading: "Platform",
        links: [
          {
            label: "Hiring & Employment",
            to: "/products/hiring",
            description: "Job ads, ATS and AI screening",
          },
          {
            label: "HR",
            to: "/products/hr-software",
            description: "Records, onboarding and performance",
          },
          {
            label: "Payroll",
            to: "/products/payroll-software",
            description: "Award interpretation and STP Phase 2",
          },
          {
            label: "Employee Experience",
            to: "/products/employee-experience",
            description: "Benefits, recognition and the Work app",
          },
        ],
      },
      {
        heading: "Managed employment",
        links: [
          {
            label: "HeroForce",
            to: "/products/heroforce",
            description: "Employment, done for you",
          },
          {
            label: "Find candidates",
            to: "/products/find-candidates",
            description: "SmartMatch shortlists in minutes",
            badge: "AI",
          },
          {
            label: "Employment OS",
            to: "/products/employment-os",
            description: "How the whole system fits together",
          },
          {
            label: "Integrations",
            to: "/integrations",
            description: "Connect the tools you already use",
          },
        ],
      },
      {
        heading: "Learn",
        links: [
          { label: "Pricing", to: "/pricing" },
          { label: "Industry solutions", to: "/industry" },
          { label: "Case studies", to: "/case-studies" },
          { label: "Resources", to: "/resources/businesses" },
          { label: "Blog", to: "/blog" },
          { label: "Webinars", to: "/webinars" },
        ],
      },
    ],
    featured: {
      eyebrow: "Featured",
      title: "Hero Foundation",
      body: "Unlocking job opportunities for people facing barriers to work.",
      to: "/hero-foundation",
    },
  },
  {
    id: "partners",
    label: "Partners",
    headline: "Employment OS for partners",
    blurb: "Help your clients save time, stay compliant and work easy.",
    cta: { label: "Become a partner", to: "/partner-network" },
    columns: [
      {
        heading: "Programs",
        links: [
          {
            label: "HR & payroll partners",
            to: "/partner-network",
            description: "Join the partner network",
          },
          {
            label: "Referral partners",
            to: "/partner-network/referral-partner-program",
            description: "Refer clients and share the upside",
          },
          {
            label: "Certified partners",
            to: "/partner-network/certified-partner",
            description: "Own the sale, onboarding and support",
          },
        ],
      },
      {
        heading: "Find a partner",
        links: [
          {
            label: "Partner directory",
            to: "/partner-directory",
            description: "Accountants and bookkeepers near you",
          },
          { label: "Partner resources", to: "/resources/partners" },
          { label: "Implementation hub", to: "/implementation-hub" },
        ],
      },
    ],
    featured: {
      eyebrow: "Partner spotlight",
      title: "Blue Rock",
      body: "How one advisory firm moved 90 client payrolls in a single quarter.",
      to: "/case-studies/blue-rock",
    },
  },
  {
    id: "employees",
    label: "Employees",
    headline: "Employment OS for employees",
    blurb: "See how the Employment Operating System can supercharge work.",
    cta: { label: "Explore the Work app", to: "/work" },
    columns: [
      {
        heading: "Your work life",
        links: [
          {
            label: "Employment Hero Work",
            to: "/work",
            description: "Payslips, rosters and leave in one app",
          },
          {
            label: "Swag Spend account",
            to: "/products/swag-spend-account",
            description: "Budgeting, cashback and a linked card",
          },
          {
            label: "Earned wage access",
            to: "/products/swag-spend-account/earned-wage-access",
            description: "Reach pay you have already earned",
          },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Employee resources", to: "/resources/employees" },
          { label: "Service centre", to: "/support" },
          { label: "Contact us", to: "/contact" },
        ],
      },
    ],
    featured: {
      eyebrow: "Download",
      title: "Get the Work app",
      body: "Everything work, in the phone you already carry.",
      to: "/work",
    },
  },
  {
    id: "job-seekers",
    label: "Job seekers",
    headline: "Employment OS for job seekers",
    blurb: "Get matched. Get hired. Get paid.",
    cta: { label: "Find a job", to: "/jobs" },
    columns: [
      {
        heading: "Find your next role",
        links: [
          { label: "Browse jobs", to: "/jobs", description: "Roles hiring across Australia" },
          {
            label: "Salary benchmarking",
            to: "/jobs/salary-benchmarking",
            description: "See what you should be paid",
          },
        ],
      },
      {
        heading: "Prep for your next role",
        links: [
          { label: "Job hunting tips", to: "/resources/job-seekers" },
          { label: "Interview guides", to: "/blog" },
        ],
      },
    ],
    featured: {
      eyebrow: "New",
      title: "SmartMatch profiles",
      body: "One profile, matched to every employer hiring in your field.",
      to: "/products/find-candidates",
    },
  },
];

export const loginOptions: NavLink[] = [
  { label: "Employer", to: "/login?portal=employer", description: "HR and people management" },
  { label: "Employee", to: "/login?portal=employee", description: "Payslips, leave and benefits" },
  { label: "Payroll", to: "/login?portal=payroll", description: "Pay runs and STP reporting" },
];

export const footerGroups: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Products", to: "/products" },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing", to: "/pricing" },
      { label: "Integrations", to: "/integrations" },
      { label: "Employment Hero Work", to: "/work" },
      { label: "Our AI commitment", to: "/ai" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Hero Foundation", to: "/hero-foundation" },
      { label: "Become a partner", to: "/partner-network" },
      { label: "Media centre", to: "/media-centre" },
      { label: "Newsroom", to: "/news" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Resources", to: "/resources" },
      { label: "Blog", to: "/blog" },
      { label: "Case studies", to: "/case-studies" },
      { label: "Webinars", to: "/webinars" },
      { label: "Industry solutions", to: "/industry" },
      { label: "Job board", to: "/jobs" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Contact us", to: "/contact" },
      { label: "Request a demo", to: "/request-a-demo" },
      { label: "Start free", to: "/start-free" },
      { label: "Service centre", to: "/support" },
      { label: "Implementation hub", to: "/implementation-hub" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", to: "/legals/privacy" },
  { label: "Terms", to: "/legals/terms" },
  { label: "Accessibility", to: "/accessibility" },
];
