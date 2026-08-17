import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    slug: "hub24-super",
    name: "HUB24 Super",
    eyebrow: "Superannuation",
    summary:
      "Designed to support quality advice across accumulation and retirement — investment choice, transparency and modern platform capability in a single account.",
    body: "From building wealth to planning for retirement, HUB24 Super gives advisers and investors flexibility today, with solutions that evolve as needs change. The lifetime super account lets advisers introduce retirement income planning earlier while clients remain in accumulation.",
    highlights: [
      "Broad investment choice across Discover, Core and Choice",
      "A consistent platform experience from accumulation through retirement",
      "Retirement-ready pathways, including lifetime pension options",
      "Online account application and same-day withdrawals",
    ],
    menus: ["Discover", "Core", "Choice"],
    documents: ["doc-super-pds", "doc-super-tmd", "doc-super-core", "doc-super-choice", "doc-super-discover"],
  },
  {
    slug: "hub24-invest",
    name: "HUB24 Invest",
    eyebrow: "IDPS",
    summary:
      "An investor directed portfolio service that wraps managed portfolios, managed funds, ASX and international listed securities, term deposits and annuities.",
    body: "HUB24 Invest is operated by HUB24 Custodial Services Ltd. Advisers use it to construct and administer non-super portfolios with the same menus, reporting and managed-portfolio technology as HUB24 Super.",
    highlights: [
      "Same three investment menus as Super",
      "Corporate actions handled online",
      "Tax reporting and modelling tools",
      "Margin lending available on eligible accounts",
    ],
    menus: ["Discover", "Core", "Choice"],
    documents: ["doc-invest-pds", "doc-invest-guide"],
  },
  {
    slug: "hub24-pension",
    name: "HUB24 Pension",
    eyebrow: "Retirement",
    summary:
      "Account-based pensions with the same investment menus, plus pathways toward lifetime income without forcing a platform change.",
    body: "Clients can commence a pension from HUB24 Super and keep their underlying holdings. Minimum drawdowns, PAYG and estate planning instructions sit alongside the same managed-portfolio rebalancing engine.",
    highlights: [
      "In-specie commencement from HUB24 Super",
      "Minimum pension payments calculated on platform",
      "Lifetime income pathway from the lifetime super account",
      "InvestorHUB statements and e-tax packs",
    ],
    menus: ["Discover", "Core", "Choice"],
    documents: ["doc-pension-pds", "doc-pension-tmd"],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const PRIVATE_INVEST = {
  name: "HUB24 Private Invest",
  summary:
    "A complete view of wealth for advised wholesale clients — HUB24 platform holdings plus administration of assets held directly through our non-custodial service.",
  bullets: [
    "Available to wholesale investors, companies, trustees of trusts and SMSF trustees",
    "Custodial wrap plus non-custodial administration in one reporting view",
    "Uncapped term deposits, FX, OTC bonds and third-party payment requests",
    "Engage reporting for a household view of wealth",
  ],
};

export const FEATURES = [
  {
    title: "Broad investment choice",
    body: "Managed portfolios, managed funds, ASX and international listed securities, term deposits, annuities and more — across Discover, Core and Choice.",
  },
  {
    title: "Innovative managed portfolios",
    body: "Award-winning SMA functionality: rebalancing, tax optimisation, netting and licensee or manager models on the same account.",
  },
  {
    title: "HNW and wholesale",
    body: "Private Invest, uncapped term deposits, foreign currency, OTC bonds and third-party payments for the growing HNW book.",
  },
  {
    title: "Service that advisers rate",
    body: "Local State Managers and BDMs, Training and Relationship Managers, a transition team, and Australian-based SupportHUB.",
  },
];

export const MENUS = [
  {
    name: "Discover",
    body: "A streamlined, cost-effective selection of managed portfolios designed with leading portfolio managers — for clients with less complex needs.",
  },
  {
    name: "Core",
    body: "A select range of investments, including managed portfolios and term deposits, with a lower tiered administration fee and no account-keeping fee.",
  },
  {
    name: "Choice",
    body: "The full suite — managed funds, listed securities, international, annuities and more — for clients who need maximum flexibility.",
  },
];
