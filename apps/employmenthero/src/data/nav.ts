import type { MegaMenu, NavLink } from "./types";

export const PRODUCTS_MENU: MegaMenu = {
  label: "Products",
  to: "/products",
  feature: {
    eyebrow: "Employment OS",
    title: "Every part of employment, intelligently run",
    body: "Hiring, HR, payroll and benefits in one system of action — with Hero AI agents doing the busywork.",
    to: "/products/employment-os",
    cta: "Explore Employment OS",
  },
  columns: [
    {
      heading: "Hiring",
      links: [
        {
          label: "Hiring overview",
          to: "/products/hiring",
          description: "Source, screen and sign talent in one pipeline",
        },
        {
          label: "AI Recruitment Agent",
          to: "/products/recruitment-agent",
          description: "Automatically score, screen and interview applicants",
          badge: "Hero AI",
        },
        {
          label: "Applicant Tracking System",
          to: "/products/applicant-tracking-system",
          description: "A centralised hiring hub for every role",
        },
        {
          label: "Find candidates",
          to: "/products/find-candidates",
          description: "Instantly reach 2.3M+ ready-to-work candidates",
          badge: "SmartMatch",
        },
      ],
    },
    {
      heading: "HR & Payroll",
      links: [
        {
          label: "HR software",
          to: "/products/hr-software",
          description: "Onboarding, compliance, workflows and people insights",
        },
        {
          label: "Payroll software",
          to: "/products/payroll-software",
          description: "STP Phase 2, awards and Payday Super, handled",
        },
        {
          label: "Employment OS",
          to: "/products/employment-os",
          description: "The system of action behind the whole lifecycle",
        },
        {
          label: "Learning management",
          to: "/products/learning-management-system",
          description: "250+ providers of compliance and skills training",
        },
      ],
    },
    {
      heading: "Employees & benefits",
      links: [
        {
          label: "Employment Hero Work",
          to: "/products/work-app",
          description: "The world's first employment superapp",
        },
        {
          label: "Earned Wage Access",
          to: "/products/earned-wage-access",
          description: "Access up to 50% of earned wages before payday",
        },
        {
          label: "HeroForce",
          to: "/products/heroforce",
          description: "Employment, done for you — we are the employer on paper",
        },
        {
          label: "Employer of Record",
          to: "/products/employer-of-record",
          description: "Hire compliantly across 180+ countries",
        },
      ],
    },
  ],
  footerLinks: [
    { label: "See pricing", to: "/pricing" },
    { label: "See all products", to: "/products" },
    { label: "Integrations", to: "/integrations" },
    { label: "Quick demos", to: "/quick-demos" },
  ],
};

export const SOLUTIONS_MENU: MegaMenu = {
  label: "Solutions",
  to: "/solutions",
  feature: {
    eyebrow: "Built for Australian business",
    title: "Award interpretation that keeps you compliant",
    body: "Pre-built award templates for hospitality, retail, healthcare, NDIS and construction — updated as the Fair Work Commission changes them.",
    to: "/solutions",
    cta: "Browse solutions",
  },
  columns: [
    {
      heading: "By industry",
      links: [
        { label: "Hospitality", to: "/industry/hospitality" },
        { label: "Retail", to: "/industry/retail" },
        { label: "Healthcare", to: "/industry/healthcare" },
        { label: "NDIS providers", to: "/industry/ndis-providers" },
        { label: "Construction", to: "/industry/construction" },
        { label: "Professional services", to: "/industry/professional-services" },
      ],
    },
    {
      heading: "By business size",
      links: [
        { label: "Startups (1–20)", to: "/business-size/startup" },
        { label: "Small business (21–100)", to: "/business-size/small-business" },
        { label: "Mid-market (101–500)", to: "/business-size/mid-market" },
        { label: "Enterprise (500+)", to: "/business-size/enterprise" },
      ],
    },
    {
      heading: "By need",
      links: [
        { label: "Replace spreadsheets", to: "/solutions" },
        { label: "Cut hiring costs", to: "/products/find-candidates" },
        { label: "Fix payroll compliance", to: "/products/payroll-software" },
        { label: "Retain your team", to: "/products/work-app" },
      ],
    },
  ],
  footerLinks: [
    { label: "Customer stories", to: "/case-studies" },
    { label: "Request a demo", to: "/request-a-demo" },
  ],
};

export const RESOURCES_MENU: MegaMenu = {
  label: "Resources",
  to: "/resources",
  feature: {
    eyebrow: "Resource hub",
    title: "Guides, templates and award updates",
    body: "Everything Australian employers need to stay across Fair Work changes, Payday Super and modern award rates.",
    to: "/resources",
    cta: "Open the hub",
  },
  columns: [
    {
      heading: "Learn",
      links: [
        { label: "Resource hub", to: "/resources" },
        { label: "Blog", to: "/blog" },
        { label: "Customer stories", to: "/case-studies" },
        { label: "Quick demos", to: "/quick-demos" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", to: "/about-us" },
        { label: "Careers", to: "/careers" },
        { label: "Partner network", to: "/partner-network" },
        { label: "Responsible AI", to: "/responsible-ai" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Service centre", to: "/support" },
        { label: "Contact us", to: "/contact" },
        { label: "Find a job", to: "/jobs" },
        { label: "Integrations", to: "/integrations" },
      ],
    },
  ],
};

export const MEGA_MENUS: MegaMenu[] = [PRODUCTS_MENU, SOLUTIONS_MENU, RESOURCES_MENU];

export const SIMPLE_NAV: NavLink[] = [
  { label: "Pricing", to: "/pricing" },
  { label: "Support", to: "/support" },
];

export const LOGIN_OPTIONS: NavLink[] = [
  { label: "Employer login", to: "/login", description: "HR, payroll and hiring" },
  { label: "Employee login", to: "/login?portal=employee", description: "Employment Hero Work" },
  { label: "Partner login", to: "/login?portal=partner", description: "Partner network portal" },
];

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Employment OS", to: "/products/employment-os" },
      { label: "HR software", to: "/products/hr-software" },
      { label: "Payroll software", to: "/products/payroll-software" },
      { label: "Hiring", to: "/products/hiring" },
      { label: "Employment Hero Work", to: "/products/work-app" },
      { label: "Integrations", to: "/integrations" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Hospitality", to: "/industry/hospitality" },
      { label: "Retail", to: "/industry/retail" },
      { label: "Healthcare", to: "/industry/healthcare" },
      { label: "NDIS providers", to: "/industry/ndis-providers" },
      { label: "Construction", to: "/industry/construction" },
      { label: "Global teams", to: "/pricing/global-teams" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Partner network", to: "/partner-network" },
      { label: "Customer stories", to: "/case-studies" },
      { label: "Responsible AI", to: "/responsible-ai" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Request a demo", to: "/request-a-demo" },
      { label: "Contact us", to: "/contact" },
      { label: "Service centre", to: "/support" },
      { label: "Find a job", to: "/jobs" },
      { label: "Resource hub", to: "/resources" },
      { label: "Employer login", to: "/login" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy policy", to: "/legals/privacy-policy" },
  { label: "Terms of service", to: "/legals/terms" },
  { label: "Responsible AI", to: "/responsible-ai" },
];
