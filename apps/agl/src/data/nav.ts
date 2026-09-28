export type NavLink = { label: string; to: string; description?: string };
export type NavSection = { label: string; to: string; columns: { heading: string; links: NavLink[] }[] };

export const segments: NavLink[] = [
  { label: "Residential", to: "/" },
  { label: "Business", to: "/business" },
  { label: "About AGL", to: "/about" },
];

export const primaryNav: NavSection[] = [
  {
    label: "Energy",
    to: "/energy",
    columns: [
      {
        heading: "Electricity & gas",
        links: [
          { label: "Compare energy plans", to: "/energy", description: "Find a plan for your address" },
          { label: "Green Energy", to: "/energy#green", description: "Match your use with GreenPower" },
          { label: "Carbon Neutral", to: "/energy#green", description: "Certified by Climate Active" },
        ],
      },
      {
        heading: "Your home",
        links: [
          { label: "Moving house", to: "/moving-house" },
          { label: "Smart meters", to: "/help/moving-meters-installations" },
          { label: "Energy saving tips", to: "/help/billing-payments/understand-your-energy-prices" },
        ],
      },
    ],
  },
  {
    label: "Internet",
    to: "/internet",
    columns: [
      {
        heading: "nbn® plans",
        links: [
          { label: "Compare nbn® plans", to: "/internet", description: "Save $15/mth with AGL energy" },
          { label: "Fibre upgrades", to: "/internet#fibre" },
          { label: "Internet troubleshooting", to: "/help/emergencies-outages/internet-troubleshooting" },
        ],
      },
    ],
  },
  {
    label: "Mobile",
    to: "/mobile",
    columns: [
      {
        heading: "SIM plans",
        links: [
          { label: "Compare SIM plans", to: "/mobile", description: "Save $10/mth with AGL energy" },
          { label: "International roaming", to: "/mobile#roaming" },
          { label: "Mobile troubleshooting", to: "/help/emergencies-outages/mobile-troubleshooting" },
        ],
      },
    ],
  },
  {
    label: "Solar & batteries",
    to: "/solar",
    columns: [
      {
        heading: "Solar",
        links: [
          { label: "Solar & battery bundles", to: "/solar" },
          { label: "Solar Savers plan", to: "/energy#solar-savers" },
          { label: "Virtual Power Plant", to: "/solar#vpp" },
        ],
      },
    ],
  },
  {
    label: "Electric vehicles",
    to: "/electric-vehicles",
    columns: [
      {
        heading: "EVs",
        links: [
          { label: "Night Saver EV plan", to: "/electric-vehicles" },
          { label: "Home EV chargers", to: "/electric-vehicles#chargers" },
        ],
      },
    ],
  },
  {
    label: "Help & Support",
    to: "/help",
    columns: [
      {
        heading: "Popular",
        links: [
          { label: "How billing works", to: "/help/billing-payments/how-billing-works" },
          { label: "Move house with AGL", to: "/moving-house" },
          { label: "Using AGL Assistant", to: "/help/account-setup-management/using-agl-assistant" },
          { label: "Contact us", to: "/contact-us" },
        ],
      },
    ],
  },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Residential",
    links: [
      { label: "Electricity & gas", to: "/energy" },
      { label: "Internet", to: "/internet" },
      { label: "Mobile", to: "/mobile" },
      { label: "Solar & batteries", to: "/solar" },
      { label: "Electric vehicles", to: "/electric-vehicles" },
      { label: "Moving house", to: "/moving-house" },
    ],
  },
  {
    heading: "Help & Support",
    links: [
      { label: "Help & Support", to: "/help" },
      { label: "Contact us", to: "/contact-us" },
      { label: "Emergencies and outages", to: "/help/emergencies-outages" },
      { label: "Financial support", to: "/help/financial-support" },
      { label: "Log in to My Account", to: "/login" },
    ],
  },
  {
    heading: "Business",
    links: [
      { label: "Small business energy", to: "/business" },
      { label: "Large business", to: "/business#large" },
      { label: "Business solar", to: "/business#solar" },
    ],
  },
  {
    heading: "About AGL",
    links: [
      { label: "About us", to: "/about" },
      { label: "Sustainability", to: "/about#sustainability" },
      { label: "Careers", to: "/about#careers" },
      { label: "Neighbourhood community", to: "/help#neighbourhood" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", to: "/about#privacy" },
  { label: "Terms & conditions", to: "/about#terms" },
  { label: "Accessibility", to: "/about#accessibility" },
  { label: "Energy fact sheets", to: "/energy#fact-sheets" },
  { label: "Complaints", to: "/contact-us#complaints" },
];
