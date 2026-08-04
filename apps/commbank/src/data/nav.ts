export type NavLink = { label: string; to: string; description?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = {
  id: string;
  label: string;
  to: string;
  columns: NavColumn[];
};

export const primaryNav: NavItem[] = [
  {
    id: "banking",
    label: "Banking",
    to: "/banking",
    columns: [
      {
        heading: "Bank & savings accounts",
        links: [
          { label: "Everyday accounts", to: "/banking/everyday-accounts" },
          { label: "Everyday Account Smart Access", to: "/banking/everyday-account-smart-access" },
          { label: "Savings accounts", to: "/banking/savings-accounts" },
          { label: "NetBank Saver", to: "/banking/netbank-saver" },
          { label: "GoalSaver", to: "/banking/goalsaver" },
          { label: "Term deposits", to: "/banking/term-deposits" },
        ],
      },
      {
        heading: "Cards & loans",
        links: [
          { label: "Credit cards", to: "/banking/credit-cards" },
          { label: "Personal loans", to: "/banking/personal-loans" },
          { label: "Car loans", to: "/banking/car-loans" },
        ],
      },
      {
        heading: "Digital banking",
        links: [
          { label: "NetBank", to: "/digital-banking/netbank" },
          { label: "CommBank app", to: "/digital-banking/app" },
          { label: "Log on", to: "/login" },
        ],
      },
    ],
  },
  {
    id: "home-loans",
    label: "Home loans",
    to: "/home-loans",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "Home loans overview", to: "/home-loans" },
          { label: "Buying a home", to: "/home-loans/buying" },
          { label: "Refinancing", to: "/home-loans/refinancing" },
          { label: "Home loan calculator", to: "/home-loans/calculator" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Rates & fees", to: "/rates" },
          { label: "Book an appointment", to: "/contact" },
          { label: "Find a branch", to: "/find-us" },
        ],
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    to: "/insurance",
    columns: [
      {
        heading: "Protect what matters",
        links: [
          { label: "Insurance overview", to: "/insurance" },
          { label: "Home insurance", to: "/insurance/home" },
          { label: "Car insurance", to: "/insurance/car" },
          { label: "Travel insurance", to: "/insurance/travel" },
          { label: "Life insurance", to: "/insurance/life" },
        ],
      },
    ],
  },
  {
    id: "investing",
    label: "Investing & Super",
    to: "/investing",
    columns: [
      {
        heading: "Grow your money",
        links: [
          { label: "Investing overview", to: "/investing" },
          { label: "CommSec", to: "/investing/commsec" },
          { label: "Superannuation", to: "/investing/super" },
        ],
      },
    ],
  },
  {
    id: "business",
    label: "Business",
    to: "/business",
    columns: [
      {
        heading: "Business banking",
        links: [
          { label: "Business overview", to: "/business" },
          { label: "Business accounts", to: "/business/accounts" },
          { label: "Business loans", to: "/business/loans" },
        ],
      },
      {
        heading: "Institutional",
        links: [{ label: "Institutional banking", to: "/institutional" }],
      },
    ],
  },
  {
    id: "institutional",
    label: "Institutional",
    to: "/institutional",
    columns: [
      {
        heading: "Markets & corporate",
        links: [
          { label: "Institutional overview", to: "/institutional" },
          { label: "Rates & fees", to: "/rates" },
        ],
      },
    ],
  },
  {
    id: "yello",
    label: "CommBank Yello",
    to: "/commbank-yello",
    columns: [
      {
        heading: "Rewards & offers",
        links: [
          { label: "CommBank Yello", to: "/commbank-yello" },
          { label: "Latest offers", to: "/offers" },
        ],
      },
    ],
  },
];

export const utilityLinks: NavLink[] = [
  { label: "Help", to: "/help" },
  { label: "Contact us", to: "/contact" },
  { label: "Find us", to: "/find-us" },
  { label: "Security", to: "/security" },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "Products",
    links: [
      { label: "Bank accounts", to: "/banking/everyday-accounts" },
      { label: "Home loans", to: "/home-loans" },
      { label: "Credit cards", to: "/banking/credit-cards" },
      { label: "Insurance", to: "/insurance" },
      { label: "Investing", to: "/investing" },
      { label: "Business", to: "/business" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Rates & fees", to: "/rates" },
      { label: "Calculators", to: "/calculators" },
      { label: "Foreign exchange", to: "/travel" },
      { label: "Find a branch or ATM", to: "/find-us" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Newsroom", to: "/newsroom" },
      { label: "Sustainability", to: "/sustainability" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help", to: "/help" },
      { label: "Contact us", to: "/contact" },
      { label: "Security", to: "/security" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Privacy", to: "/privacy" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
];
