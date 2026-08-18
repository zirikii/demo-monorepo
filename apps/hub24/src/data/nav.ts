import type { FooterColumn, MegaMenu, NavLinkItem } from "./types";

export const MEGA_MENUS: MegaMenu[] = [
  {
    label: "Products & solutions",
    to: "/products-solutions",
    feature: {
      eyebrow: "New",
      title: "myhub",
      body: "An advice ecosystem concept connecting the HUB24 Platform, Class and myprosperity with AI-powered natural language prompting.",
      cta: "Explore myhub",
      to: "/product/myhub",
    },
    columns: [
      {
        heading: "HUB24 Platform",
        links: [
          {
            label: "HUB24 Invest",
            to: "/product/hub24-invest",
            description: "Investor directed portfolio service",
          },
          { label: "HUB24 Super", to: "/product/hub24-super", description: "Super and pension" },
          {
            label: "HUB24 Discover",
            to: "/product/hub24-discover",
            description: "Cost-effective managed portfolio menu",
          },
          {
            label: "HUB24 Private Invest",
            to: "/product/private-invest",
            description: "Wholesale and HNW solutions",
            badge: "HNW",
          },
          {
            label: "SMSF Access",
            to: "/product/smsf-access",
            description: "SMSF without the admin",
          },
        ],
      },
      {
        heading: "Capabilities",
        links: [
          { label: "Managed portfolios", to: "/product/managed-portfolios" },
          { label: "Engage reporting", to: "/product/engage", badge: "Popular" },
          { label: "Features & benefits", to: "/features-benefits" },
          { label: "Investment menus", to: "/features-benefits#menus" },
          { label: "Product documents", to: "/product-documents" },
        ],
      },
      {
        heading: "Group brands",
        links: [
          { label: "Class", to: "/product/class", description: "SMSF and wealth accounting" },
          {
            label: "NowInfinity",
            to: "/product/nowinfinity",
            description: "Documents and compliance",
          },
          { label: "myprosperity", to: "/product/myprosperity", description: "Client portals" },
          { label: "HUBconnect", to: "/product/hubconnect", description: "Data and connectivity" },
        ],
      },
    ],
    footerLinks: [
      { label: "Browse all products", to: "/products-solutions" },
      { label: "Compare investment menus", to: "/features-benefits#menus" },
    ],
  },
  {
    label: "Who we help",
    to: "/solutions/advisers",
    columns: [
      {
        heading: "Advice businesses",
        links: [
          { label: "Advisers", to: "/solutions/advisers", description: "Do business your way" },
          {
            label: "Licensees",
            to: "/solutions/licensees",
            description: "Scale governance and oversight",
          },
          {
            label: "Private wealth",
            to: "/solutions/private-wealth",
            description: "Complex and HNW clients",
          },
        ],
      },
      {
        heading: "Clients and partners",
        links: [
          { label: "Advised clients", to: "/solutions/advised-clients" },
          { label: "Investment managers", to: "/solutions/investment-managers" },
          { label: "Accountants", to: "/solutions/accountants" },
        ],
      },
      {
        heading: "Get started",
        links: [
          { label: "Talk to a BDM", to: "/contact-us#bdm" },
          { label: "Request a demo", to: "/contact-us#demo" },
          { label: "Frequently asked questions", to: "/faqs" },
        ],
      },
    ],
  },
  {
    label: "Insights & education",
    to: "/insights",
    columns: [
      {
        heading: "Insights",
        links: [
          { label: "All insights", to: "/insights" },
          { label: "Media releases", to: "/insights?category=Media+release" },
          { label: "Adviser insights", to: "/insights?category=Adviser+insights" },
          { label: "Research", to: "/insights?category=Research" },
        ],
      },
      {
        heading: "Education",
        links: [
          { label: "CPD education", to: "/education", description: "Accredited learning" },
          { label: "Managed portfolio masterclass", to: "/education#masterclass" },
          { label: "Webinars", to: "/education#webinars" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About us", to: "/about-us" },
          { label: "Leadership", to: "/leadership" },
          { label: "Careers", to: "/careers" },
          { label: "Shareholder centre", to: "/shareholder-centre" },
        ],
      },
    ],
  },
];

export const SIMPLE_NAV: NavLinkItem[] = [
  { label: "Features & benefits", to: "/features-benefits" },
  { label: "Contact us", to: "/contact-us" },
];

export const LOGIN_OPTIONS: NavLinkItem[] = [
  {
    label: "AdviserHUB",
    to: "/login?portal=adviser",
    description: "For advisers and support staff",
  },
  { label: "InvestorHUB", to: "/login?portal=investor", description: "For advised clients" },
  {
    label: "Licensee portal",
    to: "/login?portal=licensee",
    description: "For licensee oversight teams",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Products",
    links: [
      { label: "HUB24 Invest", to: "/product/hub24-invest" },
      { label: "HUB24 Super", to: "/product/hub24-super" },
      { label: "HUB24 Discover", to: "/product/hub24-discover" },
      { label: "HUB24 Private Invest", to: "/product/private-invest" },
      { label: "Managed portfolios", to: "/product/managed-portfolios" },
      { label: "Engage", to: "/product/engage" },
    ],
  },
  {
    heading: "Group",
    links: [
      { label: "Class", to: "/product/class" },
      { label: "NowInfinity", to: "/product/nowinfinity" },
      { label: "myprosperity", to: "/product/myprosperity" },
      { label: "HUBconnect", to: "/product/hubconnect" },
      { label: "myhub", to: "/product/myhub" },
    ],
  },
  {
    heading: "Who we help",
    links: [
      { label: "Advisers", to: "/solutions/advisers" },
      { label: "Licensees", to: "/solutions/licensees" },
      { label: "Private wealth", to: "/solutions/private-wealth" },
      { label: "Advised clients", to: "/solutions/advised-clients" },
      { label: "Investment managers", to: "/solutions/investment-managers" },
      { label: "Accountants", to: "/solutions/accountants" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about-us" },
      { label: "Leadership", to: "/leadership" },
      { label: "Careers", to: "/careers" },
      { label: "Insights", to: "/insights" },
      { label: "Shareholder centre", to: "/shareholder-centre" },
      { label: "Contact us", to: "/contact-us" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Product documents", to: "/product-documents" },
      { label: "CPD education", to: "/education" },
      { label: "FAQs", to: "/faqs" },
      { label: "Scam alert", to: "/scam-alert" },
      { label: "Log in", to: "/login" },
    ],
  },
];

export const LEGAL_LINKS: NavLinkItem[] = [
  { label: "Privacy policy", to: "/legals/privacy-policy" },
  { label: "Website terms of use", to: "/legals/terms-of-use" },
  { label: "Financial services guide", to: "/legals/financial-services-guide" },
  { label: "Whistleblower policy", to: "/legals/whistleblower-policy" },
];
