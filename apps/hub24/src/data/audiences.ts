import type { Audience } from "./types";

export const AUDIENCES: Audience[] = [
  {
    id: "adviser",
    label: "Adviser",
    heroKicker: "HUB24 for advisers",
    heroBody:
      "Do business your way, empowered by technology that supports practice growth and the delivery of advice — all on Australia’s Best Platform.",
    cta: { label: "Learn how HUB24 can help me", to: "/hub24-for-advisers" },
    lookingFor: [
      { label: "Learn how HUB24 can help me", to: "/hub24-for-advisers" },
      { label: "Key features & benefits", to: "/features-benefits" },
      { label: "HUB24 product documents", to: "/resources/documents" },
      { label: "CPD education", to: "/resources/cpd" },
      { label: "Learn about managed portfolios", to: "/managed-portfolios" },
      { label: "How can I contact HUB24", to: "/contact" },
    ],
  },
  {
    id: "private-wealth",
    label: "Private Wealth",
    heroKicker: "HUB24 for private wealth",
    heroBody:
      "HNW capabilities — uncapped term deposits, FX, OTC bonds, third-party payments and Private Invest — without leaving the platform your practice already uses.",
    cta: { label: "Explore private wealth", to: "/hub24-for-brokers" },
    lookingFor: [
      { label: "Private Invest", to: "/private-invest" },
      { label: "HNW platform capabilities", to: "/features-benefits" },
      { label: "Contact a BDM", to: "/bdm-team" },
    ],
  },
  {
    id: "investment-manager",
    label: "Investment Manager",
    heroKicker: "HUB24 for investment managers",
    heroBody:
      "Put your managed portfolios in front of advisers on the platform they rate #1, and run them through ManagerHUB.",
    cta: { label: "Solutions for managers", to: "/hub24-for-investment-managers" },
    lookingFor: [
      { label: "ManagerHUB", to: "/login?portal=manager" },
      { label: "Contribute CPD material", to: "/resources/cpd" },
      { label: "Contact us", to: "/contact" },
    ],
  },
  {
    id: "licensee",
    label: "Licensee",
    heroKicker: "HUB24 for licensees",
    heroBody:
      "Model portfolios, practice reporting and a single platform standard across your advice network — with local BDM and transition support.",
    cta: { label: "Licensee solutions", to: "/hub24-for-licensees" },
    lookingFor: [
      { label: "Licensee oversight", to: "/hub24-for-licensees" },
      { label: "Managed portfolios", to: "/managed-portfolios" },
      { label: "Talk to a BDM", to: "/bdm-team" },
    ],
  },
  {
    id: "client",
    label: "Advised Client",
    heroKicker: "HUB24 for advised clients",
    heroBody:
      "Your adviser can connect you to super, pension, investment and insurance solutions — including managed portfolios — and InvestorHUB to see it all.",
    cta: { label: "See client solutions", to: "/hub24-for-clients" },
    lookingFor: [
      { label: "HUB24 Super", to: "/product/hub24-super" },
      { label: "HUB24 Invest", to: "/product/hub24-invest" },
      { label: "InvestorHUB login", to: "/login?portal=investor" },
    ],
  },
  {
    id: "shareholder",
    label: "Shareholder",
    heroKicker: "HUB24 Limited Shareholder Centre",
    heroBody:
      "Are you a HUB24 shareholder or thinking about investing in HUB24? Company announcements, governance and the dummy ASX:HUB quote live here.",
    cta: { label: "Open Shareholder Centre", to: "/shareholders" },
    lookingFor: [
      { label: "Shareholder Centre", to: "/shareholders" },
      { label: "Manage my shareholdings", to: "/shareholders" },
      { label: "Investors phone line", to: "/contact" },
    ],
  },
];

export function audienceById(id: string | null): Audience {
  return AUDIENCES.find((item) => item.id === id) ?? AUDIENCES[0]!;
}
