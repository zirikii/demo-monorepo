import type { MegaMenu, NavLink } from "./types";

export const MEGA_MENUS: MegaMenu[] = [
  {
    id: "solutions",
    label: "Solutions",
    feature: {
      eyebrow: "Australia’s Best Platform",
      title: "Do business your way",
      body: "Platform, technology and data in one place — for advisers, licensees, private wealth and investment managers.",
      cta: "Explore features & benefits",
      to: "/features-benefits",
    },
    columns: [
      {
        heading: "Who we help",
        links: [
          { label: "Advisers", to: "/hub24-for-advisers", description: "Practice growth and advice delivery" },
          { label: "Private wealth", to: "/hub24-for-brokers", description: "HNW and wholesale clients" },
          { label: "Licensees", to: "/hub24-for-licensees", description: "Oversight and model portfolios" },
          { label: "Investment managers", to: "/hub24-for-investment-managers", description: "ManagerHUB and menu access" },
          { label: "Advised clients", to: "/hub24-for-clients", description: "Super, pension and invest" },
        ],
      },
      {
        heading: "Group solutions",
        links: [
          { label: "Class", to: "/class", description: "SMSF software and wealth accounting" },
          { label: "myprosperity", to: "/myprosperity", description: "Client portal for households" },
          { label: "Developer Centre", to: "/resources", description: "Open architecture APIs" },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    feature: {
      eyebrow: "Investment menus",
      title: "Discover, Core and Choice",
      body: "Move clients between menus as needs change — same account, without a CGT event on the transition.",
      cta: "View managed portfolios",
      to: "/managed-portfolios",
    },
    columns: [
      {
        heading: "HUB24 platform",
        links: [
          { label: "HUB24 Super", to: "/product/hub24-super", description: "Accumulation and retirement" },
          { label: "HUB24 Invest", to: "/product/hub24-invest", description: "IDPS wrap" },
          { label: "HUB24 Pension", to: "/product/hub24-pension", description: "Account-based and lifetime pathways" },
          { label: "Private Invest", to: "/private-invest", description: "Custodial + non-custodial HNW" },
          { label: "Managed portfolios", to: "/managed-portfolios", description: "Award-winning SMA technology" },
        ],
      },
      {
        heading: "Capabilities",
        links: [
          { label: "Features & benefits", to: "/features-benefits" },
          { label: "Product documents", to: "/resources/documents" },
          { label: "Insurance", to: "/features-benefits" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          { label: "Resource hub", to: "/resources" },
          { label: "CPD education", to: "/resources/cpd" },
          { label: "Product documents", to: "/resources/documents" },
          { label: "News & insights", to: "/news" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Contact us", to: "/contact" },
          { label: "Meet a BDM", to: "/bdm-team" },
          { label: "Login", to: "/login" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About us", to: "/about-us" },
          { label: "Careers", to: "/careers" },
          { label: "Shareholder Centre", to: "/shareholders" },
          { label: "News", to: "/news" },
        ],
      },
    ],
  },
];

export const SIMPLE_NAV: NavLink[] = [{ label: "Contact", to: "/contact" }];

export const LOGIN_OPTIONS: NavLink[] = [
  { label: "AdviserHUB", to: "/login?portal=adviser", description: "Practice and licensee login" },
  { label: "InvestorHUB", to: "/login?portal=investor", description: "Client portfolio login" },
  { label: "ManagerHUB", to: "/login?portal=manager", description: "Investment manager login" },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Solutions",
    links: [
      { label: "Advisers", to: "/hub24-for-advisers" },
      { label: "Private wealth", to: "/hub24-for-brokers" },
      { label: "Licensees", to: "/hub24-for-licensees" },
      { label: "Investment managers", to: "/hub24-for-investment-managers" },
      { label: "Advised clients", to: "/hub24-for-clients" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "HUB24 Super", to: "/product/hub24-super" },
      { label: "HUB24 Invest", to: "/product/hub24-invest" },
      { label: "HUB24 Pension", to: "/product/hub24-pension" },
      { label: "Private Invest", to: "/private-invest" },
      { label: "Managed portfolios", to: "/managed-portfolios" },
    ],
  },
  {
    heading: "Group",
    links: [
      { label: "Class", to: "/class" },
      { label: "myprosperity", to: "/myprosperity" },
      { label: "About HUB24", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Shareholders", to: "/shareholders" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Resources", to: "/resources" },
      { label: "CPD education", to: "/resources/cpd" },
      { label: "Product documents", to: "/resources/documents" },
      { label: "Contact", to: "/contact" },
      { label: "BDM team", to: "/bdm-team" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Website terms", to: "/terms" },
];
