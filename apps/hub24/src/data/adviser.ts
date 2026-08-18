export type AccountType = "HUB24 Invest" | "HUB24 Super" | "HUB24 Pension" | "SMSF Access";
export type MenuName = "Discover" | "Core" | "Choice";

export interface Holding {
  code: string;
  name: string;
  assetClass: AssetClass;
  units: number;
  price: number;
  value: number;
  unrealisedGain: number;
}

export type AssetClass =
  | "Australian equities"
  | "International equities"
  | "Fixed interest"
  | "Property"
  | "Alternatives"
  | "Cash";

export interface AccountTransaction {
  date: string;
  description: string;
  type: "Buy" | "Sell" | "Income" | "Fee" | "Contribution" | "Withdrawal";
  amount: number;
}

export interface ClientAccount {
  id: string;
  type: AccountType;
  menu: MenuName;
  opened: string;
  balance: number;
  availableCash: number;
  ytdReturn: number;
  holdings: Holding[];
  transactions: AccountTransaction[];
}

export interface Client {
  id: string;
  name: string;
  entity: string;
  familyGroup: string;
  email: string;
  phone: string;
  adviser: string;
  riskProfile: "Conservative" | "Balanced" | "Growth" | "High growth";
  status: "Active" | "Onboarding" | "Review due";
  lastReview: string;
  accounts: ClientAccount[];
}

export interface ManagedPortfolio {
  slug: string;
  name: string;
  manager: string;
  menu: MenuName;
  objective: string;
  riskProfile: Client["riskProfile"];
  managementFee: number;
  minimumInvestment: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  fua: number;
  accounts: number;
  allocation: { assetClass: AssetClass; weight: number }[];
  topHoldings: { code: string; name: string; weight: number }[];
}

export interface PendingTrade {
  id: string;
  client: string;
  accountId: string;
  instruction: string;
  assetType: "Managed portfolio" | "Managed fund" | "Listed security" | "Term deposit";
  amount: number;
  status: "Awaiting approval" | "In market" | "Settled" | "Rejected";
  placed: string;
  estimatedCgt: number;
}

export interface AdviserTask {
  id: string;
  title: string;
  client: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  category: "Consent" | "Review" | "Application" | "Compliance" | "Trading";
}

export interface AccountApplication {
  id: string;
  client: string;
  product: AccountType;
  menu: MenuName;
  submitted: string;
  stage: "Details" | "Identity" | "Funding" | "Awaiting signature" | "Complete";
  progress: number;
}

export interface EngageReport {
  id: string;
  name: string;
  client: string;
  template: string;
  updated: string;
  status: "Draft" | "Ready" | "Presented";
  sections: string[];
}

const holdings = (items: [string, string, AssetClass, number, number, number][]): Holding[] =>
  items.map(([code, name, assetClass, units, price, unrealisedGain]) => ({
    code,
    name,
    assetClass,
    units,
    price,
    value: Math.round(units * price),
    unrealisedGain,
  }));

export const CLIENTS: Client[] = [
  {
    id: "cl-10241",
    name: "Daniel Whitlock",
    entity: "Individual",
    familyGroup: "Whitlock family group",
    email: "daniel.whitlock@example.com",
    phone: "0412 884 201",
    adviser: "Alicia Nguyen",
    riskProfile: "Growth",
    status: "Active",
    lastReview: "2026-05-12",
    accounts: [
      {
        id: "HUB-884201",
        type: "HUB24 Invest",
        menu: "Choice",
        opened: "2019-03-14",
        balance: 1284500,
        availableCash: 42800,
        ytdReturn: 9.42,
        holdings: holdings([
          [
            "MPA-GRW",
            "Meridian Growth Managed Portfolio",
            "Australian equities",
            4200,
            128.4,
            62400,
          ],
          ["VGS", "Global Shares Index Fund", "International equities", 3100, 118.2, 41200],
          ["AFI", "Australian Foundation Investment", "Australian equities", 5400, 8.12, 6100],
          ["IAF", "Australian Bond Index Fund", "Fixed interest", 2600, 24.7, -1800],
          ["CASH", "Cash account", "Cash", 42800, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-11",
            description: "Meridian Growth rebalance",
            type: "Buy",
            amount: -18400,
          },
          {
            date: "2026-08-01",
            description: "Distribution — Global Shares",
            type: "Income",
            amount: 3120,
          },
          { date: "2026-07-28", description: "Administration fee", type: "Fee", amount: -412 },
          { date: "2026-07-14", description: "Contribution", type: "Contribution", amount: 25000 },
          {
            date: "2026-07-02",
            description: "Sell — Australian Bond Index",
            type: "Sell",
            amount: 12400,
          },
        ],
      },
      {
        id: "HUB-884202",
        type: "HUB24 Super",
        menu: "Choice",
        opened: "2019-03-14",
        balance: 964200,
        availableCash: 18600,
        ytdReturn: 8.86,
        holdings: holdings([
          [
            "MPA-BAL",
            "Meridian Balanced Managed Portfolio",
            "Australian equities",
            3800,
            142.6,
            48300,
          ],
          ["VGS", "Global Shares Index Fund", "International equities", 1900, 118.2, 22400],
          ["GOLD", "Alternatives Allocation Fund", "Alternatives", 900, 62.4, 4100],
          ["CASH", "Cash account", "Cash", 18600, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-09",
            description: "Employer contribution",
            type: "Contribution",
            amount: 6250,
          },
          { date: "2026-07-31", description: "Insurance premium", type: "Fee", amount: -284 },
          {
            date: "2026-07-18",
            description: "Meridian Balanced rebalance",
            type: "Buy",
            amount: -9800,
          },
        ],
      },
    ],
  },
  {
    id: "cl-10388",
    name: "Susan & Peter Cavill",
    entity: "Joint",
    familyGroup: "Cavill family group",
    email: "cavill.family@example.com",
    phone: "0433 210 887",
    adviser: "Alicia Nguyen",
    riskProfile: "Balanced",
    status: "Review due",
    lastReview: "2025-08-19",
    accounts: [
      {
        id: "HUB-772110",
        type: "HUB24 Invest",
        menu: "Core",
        opened: "2021-06-02",
        balance: 486300,
        availableCash: 12400,
        ytdReturn: 7.14,
        holdings: holdings([
          [
            "MPA-BAL",
            "Meridian Balanced Managed Portfolio",
            "Australian equities",
            1800,
            142.6,
            18200,
          ],
          ["IAF", "Australian Bond Index Fund", "Fixed interest", 4200, 24.7, -2400],
          ["TD-12", "12 month term deposit", "Cash", 80000, 1, 0],
          ["CASH", "Cash account", "Cash", 12400, 1, 0],
        ]),
        transactions: [
          { date: "2026-08-04", description: "Term deposit rollover", type: "Buy", amount: -80000 },
          {
            date: "2026-07-22",
            description: "Distribution — Balanced portfolio",
            type: "Income",
            amount: 2140,
          },
          { date: "2026-07-09", description: "Withdrawal", type: "Withdrawal", amount: -15000 },
        ],
      },
    ],
  },
  {
    id: "cl-10456",
    name: "Hargreave Superannuation Fund",
    entity: "SMSF",
    familyGroup: "Hargreave family group",
    email: "trustees@hargreavesmsf.example.com",
    phone: "0407 552 118",
    adviser: "Alicia Nguyen",
    riskProfile: "Growth",
    status: "Active",
    lastReview: "2026-06-28",
    accounts: [
      {
        id: "HUB-661043",
        type: "SMSF Access",
        menu: "Core",
        opened: "2020-09-30",
        balance: 2140800,
        availableCash: 96400,
        ytdReturn: 10.28,
        holdings: holdings([
          [
            "MPA-AUS",
            "Kestrel Australian Equity Portfolio",
            "Australian equities",
            6400,
            168.2,
            121400,
          ],
          [
            "MPA-INT",
            "Two Rivers Global Equity Portfolio",
            "International equities",
            3900,
            154.8,
            88200,
          ],
          ["APIP", "Direct Property Trust", "Property", 2100, 42.6, 9400],
          ["IAF", "Australian Bond Index Fund", "Fixed interest", 5100, 24.7, -3100],
          ["CASH", "Cash account", "Cash", 96400, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-12",
            description: "Dividend — Kestrel Australian Equity",
            type: "Income",
            amount: 8640,
          },
          {
            date: "2026-08-06",
            description: "Buy — Two Rivers Global Equity",
            type: "Buy",
            amount: -60000,
          },
          { date: "2026-07-25", description: "Administration fee", type: "Fee", amount: -684 },
        ],
      },
    ],
  },
  {
    id: "cl-10512",
    name: "Amara Osei",
    entity: "Individual",
    familyGroup: "Osei family group",
    email: "amara.osei@example.com",
    phone: "0421 664 900",
    adviser: "Alicia Nguyen",
    riskProfile: "High growth",
    status: "Active",
    lastReview: "2026-07-03",
    accounts: [
      {
        id: "HUB-559002",
        type: "HUB24 Invest",
        menu: "Discover",
        opened: "2024-11-11",
        balance: 112400,
        availableCash: 3800,
        ytdReturn: 11.64,
        holdings: holdings([
          ["MPD-HGR", "Discover High Growth Portfolio", "International equities", 940, 116.4, 9800],
          ["CASH", "Cash account", "Cash", 3800, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-13",
            description: "Regular investment plan",
            type: "Contribution",
            amount: 1500,
          },
          {
            date: "2026-07-13",
            description: "Regular investment plan",
            type: "Contribution",
            amount: 1500,
          },
        ],
      },
    ],
  },
  {
    id: "cl-10604",
    name: "Northcliff Holdings Pty Ltd",
    entity: "Company",
    familyGroup: "Northcliff group",
    email: "finance@northcliff.example.com",
    phone: "02 9114 8820",
    adviser: "Marcus Bell",
    riskProfile: "Balanced",
    status: "Active",
    lastReview: "2026-04-16",
    accounts: [
      {
        id: "HUB-448120",
        type: "HUB24 Invest",
        menu: "Choice",
        opened: "2018-02-19",
        balance: 3860400,
        availableCash: 214000,
        ytdReturn: 8.02,
        holdings: holdings([
          ["MPA-INC", "Barwon Income Portfolio", "Fixed interest", 12400, 108.4, 42800],
          [
            "MPA-AUS",
            "Kestrel Australian Equity Portfolio",
            "Australian equities",
            7200,
            168.2,
            96400,
          ],
          ["APIP", "Direct Property Trust", "Property", 5400, 42.6, 18200],
          ["ALT", "Private Markets Access Fund", "Alternatives", 1800, 96.2, 12400],
          ["CASH", "Cash account", "Cash", 214000, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-10",
            description: "Distribution — Barwon Income",
            type: "Income",
            amount: 18400,
          },
          { date: "2026-07-30", description: "Administration fee", type: "Fee", amount: -1284 },
          {
            date: "2026-07-11",
            description: "Buy — Private Markets Access",
            type: "Buy",
            amount: -120000,
          },
        ],
      },
    ],
  },
  {
    id: "cl-10711",
    name: "Grace Mbeki",
    entity: "Individual",
    familyGroup: "Mbeki family group",
    email: "grace.mbeki@example.com",
    phone: "0400 771 244",
    adviser: "Alicia Nguyen",
    riskProfile: "Conservative",
    status: "Active",
    lastReview: "2026-06-05",
    accounts: [
      {
        id: "HUB-330561",
        type: "HUB24 Pension",
        menu: "Core",
        opened: "2022-07-04",
        balance: 742600,
        availableCash: 28400,
        ytdReturn: 5.86,
        holdings: holdings([
          ["MPA-CON", "Sandstone Conservative Portfolio", "Fixed interest", 5200, 104.2, 11400],
          ["TD-6", "6 month term deposit", "Cash", 120000, 1, 0],
          ["IAF", "Australian Bond Index Fund", "Fixed interest", 3400, 24.7, -1200],
          ["CASH", "Cash account", "Cash", 28400, 1, 0],
        ]),
        transactions: [
          { date: "2026-08-15", description: "Pension payment", type: "Withdrawal", amount: -4200 },
          { date: "2026-07-15", description: "Pension payment", type: "Withdrawal", amount: -4200 },
          {
            date: "2026-07-01",
            description: "Interest — term deposit",
            type: "Income",
            amount: 2640,
          },
        ],
      },
    ],
  },
  {
    id: "cl-10822",
    name: "Tomas & Ana Ferreira",
    entity: "Joint",
    familyGroup: "Ferreira family group",
    email: "ferreira.household@example.com",
    phone: "0455 902 118",
    adviser: "Alicia Nguyen",
    riskProfile: "Growth",
    status: "Onboarding",
    lastReview: "2026-08-08",
    accounts: [
      {
        id: "HUB-220994",
        type: "HUB24 Invest",
        menu: "Discover",
        opened: "2026-08-08",
        balance: 64200,
        availableCash: 64200,
        ytdReturn: 0,
        holdings: holdings([["CASH", "Cash account", "Cash", 64200, 1, 0]]),
        transactions: [
          {
            date: "2026-08-08",
            description: "Initial funding",
            type: "Contribution",
            amount: 64200,
          },
        ],
      },
    ],
  },
  {
    id: "cl-10930",
    name: "Ellerslie Family Trust",
    entity: "Trust",
    familyGroup: "Ellerslie family group",
    email: "trustee@ellerslie.example.com",
    phone: "03 9440 2210",
    adviser: "Marcus Bell",
    riskProfile: "Balanced",
    status: "Active",
    lastReview: "2026-03-27",
    accounts: [
      {
        id: "HUB-118844",
        type: "HUB24 Invest",
        menu: "Choice",
        opened: "2017-10-05",
        balance: 1668900,
        availableCash: 74200,
        ytdReturn: 7.94,
        holdings: holdings([
          [
            "MPA-BAL",
            "Meridian Balanced Managed Portfolio",
            "Australian equities",
            4600,
            142.6,
            52400,
          ],
          [
            "MPA-INT",
            "Two Rivers Global Equity Portfolio",
            "International equities",
            2800,
            154.8,
            44200,
          ],
          ["IAF", "Australian Bond Index Fund", "Fixed interest", 6100, 24.7, -4200],
          ["CASH", "Cash account", "Cash", 74200, 1, 0],
        ]),
        transactions: [
          {
            date: "2026-08-07",
            description: "Distribution — Meridian Balanced",
            type: "Income",
            amount: 9400,
          },
          {
            date: "2026-07-19",
            description: "Sell — Australian Bond Index",
            type: "Sell",
            amount: 40000,
          },
        ],
      },
    ],
  },
];

export const MANAGED_PORTFOLIOS: ManagedPortfolio[] = [
  {
    slug: "meridian-growth",
    name: "Meridian Growth Managed Portfolio",
    manager: "Meridian Asset Management",
    menu: "Choice",
    objective: "Outperform the benchmark by 2% p.a. over rolling five-year periods.",
    riskProfile: "Growth",
    managementFee: 0.42,
    minimumInvestment: 25000,
    oneYearReturn: 11.24,
    threeYearReturn: 9.18,
    fiveYearReturn: 8.42,
    fua: 1_840_000_000,
    accounts: 4820,
    allocation: [
      { assetClass: "Australian equities", weight: 44 },
      { assetClass: "International equities", weight: 32 },
      { assetClass: "Fixed interest", weight: 12 },
      { assetClass: "Alternatives", weight: 8 },
      { assetClass: "Cash", weight: 4 },
    ],
    topHoldings: [
      { code: "CBA", name: "Commonwealth Bank", weight: 6.4 },
      { code: "BHP", name: "BHP Group", weight: 5.8 },
      { code: "CSL", name: "CSL Limited", weight: 5.1 },
      { code: "VGS", name: "Global Shares Index", weight: 4.9 },
      { code: "MQG", name: "Macquarie Group", weight: 4.2 },
    ],
  },
  {
    slug: "meridian-balanced",
    name: "Meridian Balanced Managed Portfolio",
    manager: "Meridian Asset Management",
    menu: "Core",
    objective: "Deliver balanced growth with reduced volatility through diversified exposure.",
    riskProfile: "Balanced",
    managementFee: 0.36,
    minimumInvestment: 20000,
    oneYearReturn: 8.62,
    threeYearReturn: 7.04,
    fiveYearReturn: 6.58,
    fua: 2_410_000_000,
    accounts: 7140,
    allocation: [
      { assetClass: "Australian equities", weight: 32 },
      { assetClass: "International equities", weight: 24 },
      { assetClass: "Fixed interest", weight: 28 },
      { assetClass: "Property", weight: 8 },
      { assetClass: "Cash", weight: 8 },
    ],
    topHoldings: [
      { code: "IAF", name: "Australian Bond Index", weight: 9.2 },
      { code: "CBA", name: "Commonwealth Bank", weight: 5.1 },
      { code: "VGS", name: "Global Shares Index", weight: 4.8 },
      { code: "BHP", name: "BHP Group", weight: 4.4 },
      { code: "WES", name: "Wesfarmers", weight: 3.6 },
    ],
  },
  {
    slug: "kestrel-australian-equity",
    name: "Kestrel Australian Equity Portfolio",
    manager: "Kestrel Investment Partners",
    menu: "Choice",
    objective: "Concentrated exposure to quality Australian listed companies.",
    riskProfile: "High growth",
    managementFee: 0.55,
    minimumInvestment: 50000,
    oneYearReturn: 13.86,
    threeYearReturn: 10.42,
    fiveYearReturn: 9.74,
    fua: 1_120_000_000,
    accounts: 2140,
    allocation: [
      { assetClass: "Australian equities", weight: 92 },
      { assetClass: "Cash", weight: 8 },
    ],
    topHoldings: [
      { code: "CSL", name: "CSL Limited", weight: 8.6 },
      { code: "MQG", name: "Macquarie Group", weight: 7.9 },
      { code: "CBA", name: "Commonwealth Bank", weight: 7.2 },
      { code: "WTC", name: "WiseTech Global", weight: 6.1 },
      { code: "REA", name: "REA Group", weight: 5.4 },
    ],
  },
  {
    slug: "two-rivers-global-equity",
    name: "Two Rivers Global Equity Portfolio",
    manager: "Two Rivers Capital",
    menu: "Choice",
    objective: "Global developed market equity exposure with currency management.",
    riskProfile: "Growth",
    managementFee: 0.48,
    minimumInvestment: 30000,
    oneYearReturn: 12.42,
    threeYearReturn: 11.06,
    fiveYearReturn: 10.18,
    fua: 986_000_000,
    accounts: 1880,
    allocation: [
      { assetClass: "International equities", weight: 94 },
      { assetClass: "Cash", weight: 6 },
    ],
    topHoldings: [
      { code: "MSFT", name: "Microsoft", weight: 6.8 },
      { code: "ASML", name: "ASML Holding", weight: 5.2 },
      { code: "NVO", name: "Novo Nordisk", weight: 4.6 },
      { code: "TSM", name: "Taiwan Semiconductor", weight: 4.1 },
      { code: "NESN", name: "Nestlé", weight: 3.8 },
    ],
  },
  {
    slug: "barwon-income",
    name: "Barwon Income Portfolio",
    manager: "Barwon Advisory",
    menu: "Core",
    objective: "Income-focused portfolio targeting franked income and defensive assets.",
    riskProfile: "Conservative",
    managementFee: 0.32,
    minimumInvestment: 20000,
    oneYearReturn: 6.18,
    threeYearReturn: 5.42,
    fiveYearReturn: 5.04,
    fua: 1_460_000_000,
    accounts: 5240,
    allocation: [
      { assetClass: "Fixed interest", weight: 52 },
      { assetClass: "Australian equities", weight: 28 },
      { assetClass: "Property", weight: 10 },
      { assetClass: "Cash", weight: 10 },
    ],
    topHoldings: [
      { code: "IAF", name: "Australian Bond Index", weight: 14.2 },
      { code: "CBA", name: "Commonwealth Bank", weight: 6.4 },
      { code: "TLS", name: "Telstra Group", weight: 4.8 },
      { code: "APIP", name: "Direct Property Trust", weight: 4.2 },
      { code: "NAB", name: "National Australia Bank", weight: 4.0 },
    ],
  },
  {
    slug: "sandstone-conservative",
    name: "Sandstone Conservative Portfolio",
    manager: "Sandstone Wealth",
    menu: "Core",
    objective: "Capital preservation with modest growth for retirement phase clients.",
    riskProfile: "Conservative",
    managementFee: 0.28,
    minimumInvestment: 15000,
    oneYearReturn: 5.24,
    threeYearReturn: 4.62,
    fiveYearReturn: 4.28,
    fua: 742_000_000,
    accounts: 3120,
    allocation: [
      { assetClass: "Fixed interest", weight: 58 },
      { assetClass: "Australian equities", weight: 18 },
      { assetClass: "International equities", weight: 10 },
      { assetClass: "Cash", weight: 14 },
    ],
    topHoldings: [
      { code: "IAF", name: "Australian Bond Index", weight: 18.4 },
      { code: "TD-12", name: "Term deposit ladder", weight: 12.2 },
      { code: "CBA", name: "Commonwealth Bank", weight: 3.8 },
      { code: "VGS", name: "Global Shares Index", weight: 3.4 },
      { code: "WOW", name: "Woolworths Group", weight: 2.6 },
    ],
  },
  {
    slug: "discover-high-growth",
    name: "Discover High Growth Portfolio",
    manager: "HUB24 Investment Solutions",
    menu: "Discover",
    objective: "Low-cost diversified growth exposure for wealth accumulators.",
    riskProfile: "High growth",
    managementFee: 0.19,
    minimumInvestment: 5000,
    oneYearReturn: 12.86,
    threeYearReturn: 10.24,
    fiveYearReturn: 9.42,
    fua: 620_000_000,
    accounts: 8420,
    allocation: [
      { assetClass: "International equities", weight: 52 },
      { assetClass: "Australian equities", weight: 38 },
      { assetClass: "Fixed interest", weight: 6 },
      { assetClass: "Cash", weight: 4 },
    ],
    topHoldings: [
      { code: "VGS", name: "Global Shares Index", weight: 32.4 },
      { code: "VAS", name: "Australian Shares Index", weight: 28.6 },
      { code: "VGE", name: "Emerging Markets Index", weight: 8.2 },
      { code: "IAF", name: "Australian Bond Index", weight: 6.0 },
      { code: "CASH", name: "Cash", weight: 4.0 },
    ],
  },
  {
    slug: "discover-balanced",
    name: "Discover Balanced Portfolio",
    manager: "HUB24 Investment Solutions",
    menu: "Discover",
    objective: "Low-cost balanced exposure across growth and defensive assets.",
    riskProfile: "Balanced",
    managementFee: 0.19,
    minimumInvestment: 5000,
    oneYearReturn: 8.14,
    threeYearReturn: 6.82,
    fiveYearReturn: 6.24,
    fua: 548_000_000,
    accounts: 7640,
    allocation: [
      { assetClass: "International equities", weight: 32 },
      { assetClass: "Australian equities", weight: 28 },
      { assetClass: "Fixed interest", weight: 32 },
      { assetClass: "Cash", weight: 8 },
    ],
    topHoldings: [
      { code: "VGS", name: "Global Shares Index", weight: 24.2 },
      { code: "VAS", name: "Australian Shares Index", weight: 22.4 },
      { code: "IAF", name: "Australian Bond Index", weight: 20.8 },
      { code: "VGB", name: "Government Bond Index", weight: 10.2 },
      { code: "CASH", name: "Cash", weight: 8.0 },
    ],
  },
];

export const PENDING_TRADES: PendingTrade[] = [
  {
    id: "trd-88401",
    client: "Daniel Whitlock",
    accountId: "HUB-884201",
    instruction: "Switch $80,000 from Australian Bond Index to Meridian Growth",
    assetType: "Managed portfolio",
    amount: 80000,
    status: "Awaiting approval",
    placed: "2026-08-15",
    estimatedCgt: 2840,
  },
  {
    id: "trd-88402",
    client: "Hargreave Superannuation Fund",
    accountId: "HUB-661043",
    instruction: "Buy Two Rivers Global Equity Portfolio",
    assetType: "Managed portfolio",
    amount: 60000,
    status: "In market",
    placed: "2026-08-14",
    estimatedCgt: 0,
  },
  {
    id: "trd-88403",
    client: "Northcliff Holdings Pty Ltd",
    accountId: "HUB-448120",
    instruction: "Sell 4,000 units Direct Property Trust",
    assetType: "Listed security",
    amount: 170400,
    status: "Awaiting approval",
    placed: "2026-08-14",
    estimatedCgt: 12480,
  },
  {
    id: "trd-88404",
    client: "Susan & Peter Cavill",
    accountId: "HUB-772110",
    instruction: "Roll 12 month term deposit at maturity",
    assetType: "Term deposit",
    amount: 80000,
    status: "Settled",
    placed: "2026-08-04",
    estimatedCgt: 0,
  },
  {
    id: "trd-88405",
    client: "Ellerslie Family Trust",
    accountId: "HUB-118844",
    instruction: "Buy Barwon Income Portfolio",
    assetType: "Managed portfolio",
    amount: 40000,
    status: "Settled",
    placed: "2026-07-31",
    estimatedCgt: 0,
  },
  {
    id: "trd-88406",
    client: "Amara Osei",
    accountId: "HUB-559002",
    instruction: "Increase regular investment plan to $2,000 per month",
    assetType: "Managed portfolio",
    amount: 2000,
    status: "Awaiting approval",
    placed: "2026-08-13",
    estimatedCgt: 0,
  },
];

export const ADVISER_TASKS: AdviserTask[] = [
  {
    id: "tsk-4401",
    title: "Renew ongoing fee consent",
    client: "Susan & Peter Cavill",
    due: "2026-08-21",
    priority: "High",
    category: "Consent",
  },
  {
    id: "tsk-4402",
    title: "Annual review meeting overdue",
    client: "Susan & Peter Cavill",
    due: "2026-08-19",
    priority: "High",
    category: "Review",
  },
  {
    id: "tsk-4403",
    title: "Verify identity documents",
    client: "Tomas & Ana Ferreira",
    due: "2026-08-18",
    priority: "Medium",
    category: "Application",
  },
  {
    id: "tsk-4404",
    title: "Approve pending switch instruction",
    client: "Daniel Whitlock",
    due: "2026-08-17",
    priority: "High",
    category: "Trading",
  },
  {
    id: "tsk-4405",
    title: "Confirm minimum pension drawdown",
    client: "Grace Mbeki",
    due: "2026-08-26",
    priority: "Medium",
    category: "Compliance",
  },
  {
    id: "tsk-4406",
    title: "Prepare Engage review pack",
    client: "Northcliff Holdings Pty Ltd",
    due: "2026-08-28",
    priority: "Low",
    category: "Review",
  },
];

export const APPLICATIONS: AccountApplication[] = [
  {
    id: "app-9301",
    client: "Tomas & Ana Ferreira",
    product: "HUB24 Invest",
    menu: "Discover",
    submitted: "2026-08-08",
    stage: "Identity",
    progress: 60,
  },
  {
    id: "app-9302",
    client: "Priya Kalra",
    product: "HUB24 Super",
    menu: "Core",
    submitted: "2026-08-12",
    stage: "Awaiting signature",
    progress: 80,
  },
  {
    id: "app-9303",
    client: "Bell Family Trust",
    product: "HUB24 Invest",
    menu: "Choice",
    submitted: "2026-08-14",
    stage: "Details",
    progress: 25,
  },
  {
    id: "app-9304",
    client: "Owen Brady",
    product: "HUB24 Pension",
    menu: "Core",
    submitted: "2026-08-02",
    stage: "Funding",
    progress: 90,
  },
  {
    id: "app-9305",
    client: "Marlow Superannuation Fund",
    product: "SMSF Access",
    menu: "Core",
    submitted: "2026-07-28",
    stage: "Complete",
    progress: 100,
  },
];

export const ENGAGE_REPORTS: EngageReport[] = [
  {
    id: "rep-2201",
    name: "Whitlock annual review",
    client: "Daniel Whitlock",
    template: "Annual review presentation",
    updated: "2026-08-14",
    status: "Ready",
    sections: ["Wealth summary", "Performance", "Asset allocation", "Income", "Next steps"],
  },
  {
    id: "rep-2202",
    name: "Cavill catch-up",
    client: "Susan & Peter Cavill",
    template: "Progress update",
    updated: "2026-08-11",
    status: "Draft",
    sections: ["Wealth summary", "Performance", "Cashflow"],
  },
  {
    id: "rep-2203",
    name: "Northcliff board pack",
    client: "Northcliff Holdings Pty Ltd",
    template: "Entity reporting pack",
    updated: "2026-08-05",
    status: "Presented",
    sections: ["Consolidated position", "Performance", "Income", "Tax estimate"],
  },
  {
    id: "rep-2204",
    name: "Hargreave SMSF review",
    client: "Hargreave Superannuation Fund",
    template: "SMSF review",
    updated: "2026-07-30",
    status: "Ready",
    sections: ["Fund summary", "Member balances", "Performance", "Compliance"],
  },
];

/** Twelve months of platform-level FUA for the dashboard trend chart, in millions. */
export const FUA_TREND = [
  { month: "Sep", value: 6420 },
  { month: "Oct", value: 6510 },
  { month: "Nov", value: 6680 },
  { month: "Dec", value: 6740 },
  { month: "Jan", value: 6910 },
  { month: "Feb", value: 7080 },
  { month: "Mar", value: 7020 },
  { month: "Apr", value: 7240 },
  { month: "May", value: 7460 },
  { month: "Jun", value: 7580 },
  { month: "Jul", value: 7810 },
  { month: "Aug", value: 8024 },
];

export function clientById(id: string): Client | undefined {
  return CLIENTS.find((client) => client.id === id);
}

export function portfolioBySlug(slug: string): ManagedPortfolio | undefined {
  return MANAGED_PORTFOLIOS.find((portfolio) => portfolio.slug === slug);
}

export function clientBalance(client: Client): number {
  return client.accounts.reduce((total, account) => total + account.balance, 0);
}

export function bookValue(): number {
  return CLIENTS.reduce((total, client) => total + clientBalance(client), 0);
}

export function allocationFor(client: Client): { assetClass: AssetClass; value: number }[] {
  const totals = new Map<AssetClass, number>();
  for (const account of client.accounts) {
    for (const holding of account.holdings) {
      totals.set(holding.assetClass, (totals.get(holding.assetClass) ?? 0) + holding.value);
    }
  }
  return Array.from(totals.entries())
    .map(([assetClass, value]) => ({ assetClass, value }))
    .sort((a, b) => b.value - a.value);
}
