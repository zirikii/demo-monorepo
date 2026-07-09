export interface Persona {
  id: string;
  label: string;
  title: string;
  copy: string;
  icon: string;
  tint: "mint" | "blue" | "purple" | "pink" | "orange";
  cta: { label: string; to: string };
}

export const personas: Persona[] = [
  {
    id: "marketing-leaders",
    label: "Marketing Leaders",
    title: "Prove impact, not activity",
    copy: "Behavioural data and engagement insight that tie content to conversions, so your team reports outcomes instead of vanity metrics — and earns a strategic seat at the table.",
    icon: "TrendingUp",
    tint: "mint",
    cta: { label: "Explore the DXP", to: "/products/digital-experience-platform" },
  },
  {
    id: "content-managers",
    label: "Content Managers",
    title: "Publish without the queue",
    copy: "Create, test, and update pages with drag-and-drop tools — no developer tickets, no bottlenecks — while workflows and locked components keep everything on-brand.",
    icon: "PenLine",
    tint: "blue",
    cta: { label: "See Content Management", to: "/products/capabilities/content-management" },
  },
  {
    id: "it-directors",
    label: "IT Directors",
    title: "Consolidate and de-risk",
    copy: "One secure, managed SaaS platform replaces a shelf of point solutions. Automatic upgrades, enterprise-grade security, and fewer support tickets for your team.",
    icon: "ServerCog",
    tint: "purple",
    cta: { label: "Read about security", to: "/security" },
  },
  {
    id: "digital-teams",
    label: "Digital Teams",
    title: "Run a portfolio, not a pile",
    copy: "Manage hundreds of sites with shared components, central governance, and analytics that show exactly where to focus next.",
    icon: "LayoutDashboard",
    tint: "orange",
    cta: { label: "See multi-site management", to: "/products/capabilities/content-management" },
  },
];

export const rotatingAudienceBadges = [
  "Digital marketing",
  "Content editors",
  "Procurement",
  "IT directors",
  "Security",
  "Heads of department",
  "Senior leadership",
  "Data analysts",
];

export const rotatingIndustryBadges = [
  "Higher Education",
  "Professional Services",
  "Public Sector",
  "Healthcare",
  "Legal Services",
  "Utilities",
  "Financial Services",
  "Energy & Water",
];
