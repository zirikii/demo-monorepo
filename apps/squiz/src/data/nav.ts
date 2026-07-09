export interface NavLink {
  label: string;
  to: string;
  badge?: string;
  description?: string;
  icon?: string;
}

export interface NavColumn {
  heading?: string;
  links: NavLink[];
}

export interface NavMenu {
  label: string;
  columns: NavColumn[];
  promo?: { title: string; copy: string; to: string; cta: string };
}

export const navMenus: NavMenu[] = [
  {
    label: "Products",
    columns: [
      {
        heading: "Platform",
        links: [
          {
            label: "Squiz DXP",
            to: "/products/digital-experience-platform",
            description: "Build, manage and optimize fast, without developer dependency.",
            icon: "Blocks",
          },
          {
            label: "Squiz Funnelback Search",
            to: "/products/squiz-funnelback-search",
            description: "Help users find answers from your content, everywhere they search.",
            icon: "Search",
          },
          {
            label: "Squiz Content Intelligence",
            to: "/products/content-intelligence",
            badge: "NEW",
            description: "AI-discoverability and accessibility made easy.",
            icon: "Sparkles",
          },
        ],
      },
      {
        heading: "Capabilities",
        links: [
          { label: "Content Management", to: "/products/capabilities/content-management" },
          { label: "Conversational Search", to: "/products/capabilities/conversational-search" },
          { label: "Personalization", to: "/products/capabilities/personalization" },
          {
            label: "Customer Data Platform",
            to: "/products/capabilities/customer-data-platform",
          },
          {
            label: "Accessibility Auditor",
            to: "/products/capabilities/accessibility-auditor",
            badge: "NEW",
          },
          {
            label: "AI Readiness Auditor",
            to: "/products/capabilities/ai-readiness-auditor",
            badge: "NEW",
          },
          { label: "View all capabilities", to: "/products/capabilities" },
        ],
      },
    ],
    promo: {
      title: "Content Intelligence is here",
      copy: "See how AI engines read your website — and get a prioritized plan to improve.",
      to: "/products/content-intelligence",
      cta: "Let's go",
    },
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "For your industry",
        links: [
          { label: "Higher education", to: "/industries/higher-education", icon: "GraduationCap" },
          { label: "Government", to: "/industries/government", icon: "Landmark" },
          {
            label: "Professional services",
            to: "/industries/professional-services",
            icon: "Briefcase",
          },
          {
            label: "Financial & Insurance Services",
            to: "/industries/financial-and-insurance-services",
            icon: "ShieldCheck",
          },
          { label: "View all industries", to: "/industries" },
        ],
      },
      {
        heading: "For your goals",
        links: [
          {
            label: "Launch & scale digital experiences independently",
            to: "/use-cases/launch-and-scale-digital-experiences-independently",
          },
          {
            label: "Drive conversion through personalization & optimization",
            to: "/use-cases/drive-conversion-through-personalization-and-optimization",
          },
          {
            label: "Be discovered wherever your audience searches",
            to: "/use-cases/be-discovered-wherever-your-audience-searches",
          },
          {
            label: "Modernize and consolidate your tech stack",
            to: "/use-cases/modernize-and-consolidate-your-tech-stack",
          },
          { label: "More use cases", to: "/use-cases" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    columns: [
      {
        links: [
          {
            label: "Blog",
            to: "/blog",
            description: "Stories, guides, and opinions from the Squiz team.",
            icon: "PenLine",
          },
          {
            label: "Customer stories",
            to: "/customer-stories",
            description: "How service-led organizations deliver with Squiz.",
            icon: "BookOpenText",
          },
          {
            label: "Demo videos",
            to: "/demos",
            description: "Watch the platform in action, capability by capability.",
            icon: "MonitorPlay",
          },
          {
            label: "Product roadmap",
            to: "/roadmap",
            description: "What we're building now, next, and later.",
            icon: "Map",
          },
        ],
      },
    ],
  },
  {
    label: "Company & Contact",
    columns: [
      {
        links: [
          {
            label: "About",
            to: "/about",
            description: "Who we are and why we do this.",
            icon: "UsersRound",
          },
          {
            label: "Careers",
            to: "/careers",
            badge: "We're hiring",
            description: "Join a global team of experience-builders.",
            icon: "Rocket",
          },
          {
            label: "Partnerships",
            to: "/partnerships",
            description: "Agencies and technology partners we work with.",
            icon: "Handshake",
          },
          {
            label: "Contact us",
            to: "/contact",
            description: "Sales, support, and everything in between.",
            icon: "Mail",
          },
        ],
      },
    ],
    promo: {
      title: "Talk to an expert",
      copy: "A 30-minute chat helps you scope your first next step.",
      to: "/book-a-call",
      cta: "Book a call",
    },
  },
];

export interface FooterColumn {
  heading: string;
  links: { label: string; to: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "DXP",
    links: [
      { label: "What is a DXP?", to: "/products/digital-experience-platform" },
      { label: "DXP or CMS? What's the difference?", to: "/blog/dxp-vs-cms-whats-the-difference" },
      { label: "All capabilities", to: "/products/capabilities" },
      { label: "Product roadmap", to: "/roadmap" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Success stories", to: "/customer-stories" },
      { label: "Demo videos", to: "/demos" },
      { label: "Use cases", to: "/use-cases" },
    ],
  },
  {
    heading: "Get help",
    links: [
      { label: "Documentation", to: "/demos" },
      { label: "Customer portal", to: "/contact" },
      { label: "Contact us", to: "/contact" },
      { label: "Book a call", to: "/book-a-call" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Partnerships", to: "/partnerships" },
      { label: "Security", to: "/security" },
    ],
  },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", to: "/legal/privacy-policy" },
  { label: "Security", to: "/security" },
  { label: "Legal", to: "/legal" },
];
