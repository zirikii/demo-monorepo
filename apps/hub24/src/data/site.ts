export const SITE = {
  name: "HUB24",
  legalName: "HUB24 Limited",
  abn: "87 124 891 685",
  ticker: "ASX:HUB",
  purpose: "Empowering better financial futures, together.",
  tagline: "Australia's best platform for advisers, investors and investment managers.",
  headOffice: "Level 2, 7 Macquarie Place, Sydney NSW 2000",
  adviserPhone: "1300 854 994",
  investorPhone: "1300 508 797",
  adviserEmail: "clientservices@hub24.com.au",
  investorEmail: "admin@hub24.com.au",
  registryPhone: "1300 972 485",
  registryName: "Automic Group",
} as const;

/** Headline figures quoted across the marketing site. Sourced from the FY26 Q4 update. */
export const GROUP_METRICS = {
  asAt: "2026-06-30",
  totalFua: 164_300_000_000,
  platformFua: 139_500_000_000,
  parsFua: 24_800_000_000,
  netInflows: 18_900_000_000,
  activeAdvisers: 5_649,
  marketSharePercent: 9.9,
  marketRank: 6,
  employees: 1_010,
  licenseeAgreementsSigned: 36,
  managedPortfolios: 800,
  managedFunds: 1_000,
  exchanges: 20,
} as const;

export const FOOTER_DISCLAIMER = [
  "This is an unofficial demonstration build. It is not affiliated with, endorsed by, or connected to HUB24 Limited. Every account, holding, client, adviser, announcement and figure shown in the portals is invented.",
  "Nothing on this site is financial product advice. No data leaves your browser — the demo persists a small amount of state to localStorage and nothing else.",
] as const;
