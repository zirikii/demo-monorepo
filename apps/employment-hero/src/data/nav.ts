export type NavLink = { label: string; to: string; description?: string };
export type NavGroup = { label: string; to?: string; children: NavLink[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Products",
    to: "/products",
    children: [
      { label: "Employment OS", to: "/products/employment-os", description: "Hiring, HR, payroll and benefits together" },
      { label: "HR", to: "/products/hr", description: "Onboarding, docs, policies and people data" },
      { label: "Payroll", to: "/products/payroll", description: "Automated pay runs and compliance" },
      { label: "Recruitment", to: "/products/recruitment", description: "ATS and hiring workflows" },
      { label: "Benefits", to: "/products/benefits", description: "Perks that people actually use" },
      { label: "Learning", to: "/products/learning", description: "Upskill with built-in LMS" },
      { label: "Time & attendance", to: "/products/time-attendance", description: "Rosters, timesheets and leave" },
    ],
  },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "Small business", to: "/solutions/small-business" },
      { label: "Enterprise", to: "/solutions/enterprise" },
      { label: "Accountants & bookkeepers", to: "/solutions/accountants" },
    ],
  },
  {
    label: "Pricing",
    to: "/pricing",
    children: [{ label: "Plans & pricing", to: "/pricing" }],
  },
  {
    label: "Customers",
    to: "/customers",
    children: [{ label: "Customer stories", to: "/customers" }],
  },
  {
    label: "Resources",
    to: "/resources",
    children: [
      { label: "Resource hub", to: "/resources" },
      { label: "Blog", to: "/blog" },
      { label: "Partners", to: "/partners" },
      { label: "Help centre", to: "/help" },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const loginPortals: NavLink[] = [
  { label: "Employer login", to: "/login?portal=employer", description: "HR and payroll admins" },
  { label: "Employee login", to: "/login?portal=employee", description: "Work app and self-service" },
  { label: "Payroll login", to: "/login?portal=payroll", description: "Payroll specialists" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Employment OS", to: "/products/employment-os" },
      { label: "HR", to: "/products/hr" },
      { label: "Payroll", to: "/products/payroll" },
      { label: "Recruitment", to: "/products/recruitment" },
      { label: "Benefits", to: "/products/benefits" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Customers", to: "/customers" },
      { label: "Partners", to: "/partners" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Regions",
    links: [
      { label: "Australia", to: "/regions/au" },
      { label: "New Zealand", to: "/regions/nz" },
      { label: "United Kingdom", to: "/regions/uk" },
      { label: "Singapore", to: "/regions/sg" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Security", to: "/security" },
    ],
  },
];
