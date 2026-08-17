import type { MegaMenu, NavLinkItem } from "./types";

export const MEGA_MENUS: MegaMenu[] = [
  {
    label: "Who we help",
    to: "/hub24-for-advisers/",
    feature: {
      eyebrow: "Australia's best platform",
      title: "Find the right entry point",
      body: "Advisers, private wealth practices, licensees, investment managers and advised clients each get a tailored view of the HUB24 platform.",
      cta: "Compare all audiences",
      to: "/products-solutions/",
    },
    columns: [
      {
        heading: "Financial professionals",
        links: [
          {
            label: "Advisers",
            to: "/hub24-for-advisers/",
            description: "Productivity, managed portfolios and practice support",
          },
          {
            label: "Private wealth",
            to: "/hub24-for-brokers/",
            description: "Capability for high-net-worth and complex clients",
          },
          {
            label: "Licensees",
            to: "/hub24-for-licensees/",
            description: "Governance, data and scale across an advice network",
          },
        ],
      },
      {
        heading: "Investment managers",
        links: [
          {
            label: "Investment managers",
            to: "/hub24-for-investment-managers/",
            description: "Distribute models and funds to 5,600+ advisers",
          },
          { label: "ManagerHUB", to: "/product/managerhub/", description: "Your online manager portal" },
          { label: "Professional development", to: "/cpd-education/", description: "Reach advisers with CPD" },
        ],
      },
      {
        heading: "Advised clients",
        links: [
          {
            label: "Investors",
            to: "/hub24-for-advised-clients/",
            description: "Why your adviser chose HUB24",
          },
          { label: "InvestorHUB", to: "/product/investorhub/", description: "Your online client portal" },
          { label: "Log in to InvestorHUB", to: "/login", badge: "Demo" },
        ],
      },
    ],
    footerLinks: [
      { label: "Contact a BDM", to: "/contact-us/find-a-bdm/" },
      { label: "Request a demo", to: "/contact-us/" },
    ],
  },
  {
    label: "Platform",
    to: "/features-benefits/",
    feature: {
      eyebrow: "Features & benefits",
      title: "One platform, every client segment",
      body: "Managed portfolios, SMSF Access, high-net-worth capability and a complete view of wealth with Engage.",
      cta: "Explore the platform",
      to: "/features-benefits/",
    },
    columns: [
      {
        heading: "Platform capability",
        links: [
          { label: "Features & benefits", to: "/features-benefits/", description: "The full capability set" },
          {
            label: "Investment menu",
            to: "/features-benefits/investment-menu/",
            description: "Discover, Core and Choice",
          },
          {
            label: "Managed portfolios",
            to: "/product/managed-portfolios/",
            description: "Award-winning model management",
          },
        ],
      },
      {
        heading: "Products",
        links: [
          { label: "HUB24 Invest", to: "/product/hub24-invest/", description: "Investor directed portfolio service" },
          { label: "HUB24 Super", to: "/product/hub24-super/", description: "Super and pension" },
          { label: "SMSF Access", to: "/product/smsf-access/", description: "Establish and run an SMSF" },
          { label: "Private Invest", to: "/product/private-invest/", description: "For high-net-worth clients" },
        ],
      },
      {
        heading: "Technology",
        links: [
          { label: "Engage", to: "/product/engage/", description: "A complete view of wealth" },
          { label: "AdviserHUB", to: "/product/adviserhub/", description: "The adviser workspace" },
          { label: "HUB24 Discover", to: "/discover/", description: "Cost-effective managed portfolios", badge: "New" },
          { label: "All products", to: "/products-solutions/" },
        ],
      },
    ],
    footerLinks: [
      { label: "Product documents", to: "/product-documents/" },
      { label: "Awards", to: "/awards/" },
    ],
  },
  {
    label: "Insights",
    to: "/insights/",
    columns: [
      {
        heading: "Latest thinking",
        links: [
          { label: "All insights", to: "/insights/", description: "Market, practice and product commentary" },
          { label: "CPD education", to: "/cpd-education/", description: "Accredited professional development" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Product documents", to: "/product-documents/", description: "PDSs, guides and TMDs" },
          { label: "Awards & ratings", to: "/awards/", description: "How the platform is rated" },
        ],
      },
    ],
  },
  {
    label: "About",
    to: "/about-us/",
    columns: [
      {
        heading: "HUB24 Group",
        links: [
          { label: "About us", to: "/about-us/", description: "Purpose, values and strategy" },
          { label: "Our brands", to: "/group/", description: "HUB24, Class, NowInfinity, myprosperity, HUBconnect" },
          { label: "Leadership", to: "/about-us/leadership/", description: "Executive team" },
          { label: "Sustainability", to: "/about-us/sustainability/", description: "ESG focus areas" },
        ],
      },
      {
        heading: "Investors & careers",
        links: [
          { label: "Shareholder Centre", to: "/shareholder-centre/overview/", description: "ASX:HUB" },
          { label: "Financial results", to: "/shareholder-centre/financial-results/" },
          { label: "Careers", to: "/about-us/careers/", description: "Join the team" },
          { label: "Contact us", to: "/contact-us/" },
        ],
      },
    ],
  },
];

export const SIMPLE_NAV: NavLinkItem[] = [{ label: "Shareholders", to: "/shareholder-centre/overview/" }];

export const LOGIN_OPTIONS: NavLinkItem[] = [
  { label: "InvestorHUB", to: "/login?portal=investor", description: "For advised clients" },
  { label: "AdviserHUB", to: "/login?portal=adviser", description: "For advisers and support staff" },
  { label: "ManagerHUB", to: "/login?portal=manager", description: "For investment managers" },
];

export const FOOTER_COLUMNS: { heading: string; links: NavLinkItem[] }[] = [
  {
    heading: "Who we help",
    links: [
      { label: "Advisers", to: "/hub24-for-advisers/" },
      { label: "Private wealth", to: "/hub24-for-brokers/" },
      { label: "Licensees", to: "/hub24-for-licensees/" },
      { label: "Investment managers", to: "/hub24-for-investment-managers/" },
      { label: "Advised clients", to: "/hub24-for-advised-clients/" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Features & benefits", to: "/features-benefits/" },
      { label: "Investment menu", to: "/features-benefits/investment-menu/" },
      { label: "Managed portfolios", to: "/product/managed-portfolios/" },
      { label: "HUB24 Discover", to: "/discover/" },
      { label: "All products", to: "/products-solutions/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", to: "/insights/" },
      { label: "CPD education", to: "/cpd-education/" },
      { label: "Product documents", to: "/product-documents/" },
      { label: "Awards & ratings", to: "/awards/" },
      { label: "Search", to: "/search" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about-us/" },
      { label: "Our brands", to: "/group/" },
      { label: "Leadership", to: "/about-us/leadership/" },
      { label: "Careers", to: "/about-us/careers/" },
      { label: "Shareholder Centre", to: "/shareholder-centre/overview/" },
      { label: "Contact us", to: "/contact-us/" },
    ],
  },
];

export const LEGAL_LINKS: NavLinkItem[] = [
  { label: "Privacy policy", to: "/legal/privacy-policy" },
  { label: "Website terms of use", to: "/legal/terms-of-use" },
  { label: "Target market determinations", to: "/legal/target-market-determinations" },
];
