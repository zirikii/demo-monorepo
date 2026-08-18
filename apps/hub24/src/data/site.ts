export const SITE = {
  name: "HUB24",
  legalName: "HUB24 Limited",
  ticker: "ASX:HUB",
  abn: "ABN 87 124 891 685",
  tagline: "Empowering better financial futures together",
  intro:
    "HUB24 leads the wealth industry as a provider of integrated platform, technology and data solutions — and we're not done yet.",
  phones: {
    advisers: "1300 854 994",
    investors: "1300 508 797",
    international: "+61 2 4058 4770",
  },
  email: "admin@hub24.com.au",
  hours: "8.00am – 7.00pm AET, Monday to Friday",
  headOffice: {
    label: "Sydney head office",
    lines: ["Level 17, 5 Martin Place", "Sydney NSW 2000"],
    postal: ["GPO Box 529", "Sydney NSW 2001"],
  },
  socials: [
    { label: "LinkedIn", to: "/contact-us" },
    { label: "YouTube", to: "/contact-us" },
    { label: "Spotify", to: "/education" },
  ],
  disclaimer:
    "This website is an unofficial demonstration build. It is operated by nobody on behalf of HUB24 Limited and is not affiliated with, endorsed by or connected to HUB24 Limited (ASX:HUB) or any HUB24 Group company. All figures, documents and accounts shown are fictional demo data.",
  regulatory:
    "In the real world, HUB24 Custodial Services Ltd (ABN 87 124 891 685 AFSL 239 122) is the operator of HUB24 Invest, an investor directed portfolio service, and the promoter of the HUB24 Super Fund. The trustee and issuer of interests in HUB24 Super is HTFS Nominees Pty Limited (ABN 78 000 880 553, AFSL 232 500, RSE Licence No. L0003216).",
} as const;

/** Headline platform metrics. Illustrative demo values, not HUB24's reported results. */
export const PLATFORM_STATS = [
  { value: "$152.4b", label: "Platform funds under administration", note: "as at 30 June 2026" },
  { value: "$22.1b", label: "Record annual net inflows", note: "FY26 demo figure" },
  { value: "5,900+", label: "Advisers using the HUB24 Platform", note: "across 2,400 practices" },
  { value: "#1", label: "Adviser Net Promoter Score", note: "Investment Trends 2025" },
] as const;

export const TRUST_LOGOS = [
  "Meridian Private Wealth",
  "Highfield Advice Group",
  "Kestrel Financial",
  "Barwon Advisory",
  "Northcliff Partners",
  "Sandstone Wealth",
  "Two Rivers Capital",
  "Ellerslie Private",
] as const;
