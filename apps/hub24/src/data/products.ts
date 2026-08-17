import type { InvestmentMenu, PlatformFeature, Product } from "./types";

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    slug: "managed-portfolios",
    eyebrow: "Managed portfolios",
    title: "Innovative managed portfolio functionality",
    icon: "layers",
    body: "Managed portfolio functionality that reduces the administration and compliance burden of managing multiple clients, and drives better investment outcomes for their portfolios.",
    bullets: [
      "Rebalance an entire client base against a model in one approval",
      "Client retains beneficial ownership and their own tax position",
      "Substitutions, exclusions and cash targets applied per client",
      "Blend multiple models inside a single account",
    ],
  },
  {
    slug: "investment-choice",
    eyebrow: "Investment menu",
    title: "Broad investment choice",
    icon: "compass",
    body: "Our wrap investment menu offers managed portfolios, managed funds, ASX listed securities, international listed securities, term deposits, annuities and more.",
    bullets: [
      "1,000+ managed funds across Australian and international markets",
      "Australian listed securities and international securities on 20+ exchanges",
      "Unlisted domestic fixed income and uncapped term deposits",
      "Retirement solutions from leading providers",
    ],
  },
  {
    slug: "smsf",
    eyebrow: "SMSF Access",
    title: "Grow the SMSF market with HUB24 SMSF Access",
    icon: "briefcase",
    body: "Remove the cost and complexity of establishing and administering a traditional SMSF while keeping the control clients are after.",
    bullets: [
      "Establishment service with documentation handled end to end",
      "Ongoing administration and annual compliance",
      "Same investment menu and managed portfolio functionality",
      "Reporting that flows into Class for the accountant",
    ],
  },
  {
    slug: "hnw",
    eyebrow: "High net worth",
    title: "Enhance the value of your advice for HNW clients",
    icon: "globe",
    body: "Meet the complex needs of the important and growing high-net-worth segment with capability most platforms don't carry.",
    bullets: [
      "Uncapped term deposits",
      "Foreign currency accounts and trading",
      "Over-the-counter bond trading",
      "Third-party payment requests",
    ],
  },
  {
    slug: "engage",
    eyebrow: "Engage",
    title: "Provide a complete view of wealth",
    icon: "database",
    body: "Engage brings together custodial and non-custodial data along with information about your clients' other investments to create a complete view of their wealth in one place.",
    bullets: [
      "Property, cash accounts and separately held shares",
      "Alternative and private market investments",
      "Household and entity-level consolidation",
      "Client-ready reporting packs",
    ],
  },
  {
    slug: "insurance",
    eyebrow: "Insurance",
    title: "Insurance inside the super account",
    icon: "lock",
    body: "Retail insurance from leading providers can be held inside HUB24 Super, with premiums funded from the account and reported alongside investments.",
    bullets: [
      "Life, TPD, trauma and income protection",
      "Premiums deducted from the cash account",
      "Consolidated reporting with the investment portfolio",
      "Applications tracked in AdviserHUB",
    ],
  },
];

export const INVESTMENT_MENUS: InvestmentMenu[] = [
  {
    id: "discover",
    name: "Discover menu",
    positioning:
      "Cost-effective access to a streamlined selection of managed portfolios by leading portfolio managers.",
    suitedTo: "Early-stage wealth accumulators, later-stage retirees, and anyone with less complex needs.",
    adminFee: "Nil administration fee",
    accountKeepingFee: "Nil account keeping fee",
    minimum: "$20,000 minimum balance",
    options: [
      { label: "Managed portfolios", included: true, note: "Selected range" },
      { label: "Cash account", included: true },
      { label: "Managed funds", included: false },
      { label: "ASX listed securities", included: false },
      { label: "International listed securities", included: false },
      { label: "Term deposits", included: false },
    ],
  },
  {
    id: "core",
    name: "Core menu",
    positioning:
      "A select range of investment options with the benefit of lower minimum administration fees and no account keeping fee.",
    suitedTo: "Clients with a lower account balance or straightforward investment needs, including SMSF Access clients.",
    adminFee: "Lower minimum administration fee",
    accountKeepingFee: "Nil account keeping fee",
    minimum: "$50,000 minimum balance",
    options: [
      { label: "Managed portfolios", included: true },
      { label: "Cash account", included: true },
      { label: "Managed funds", included: true, note: "Select range" },
      { label: "ASX listed securities", included: true, note: "S&P/ASX 300" },
      { label: "International listed securities", included: false },
      { label: "Term deposits", included: true, note: "Panel providers" },
    ],
  },
  {
    id: "choice",
    name: "Choice menu",
    positioning: "The full suite of investment options, allowing greater choice and flexibility.",
    suitedTo: "Clients with a larger account balance who want the full range of investment options.",
    adminFee: "Tiered administration fee",
    accountKeepingFee: "Account keeping fee applies",
    minimum: "No minimum balance",
    options: [
      { label: "Managed portfolios", included: true, note: "Full range" },
      { label: "Cash account", included: true },
      { label: "Managed funds", included: true, note: "1,000+" },
      { label: "ASX listed securities", included: true, note: "All listed" },
      { label: "International listed securities", included: true, note: "20+ exchanges" },
      { label: "Term deposits", included: true, note: "Uncapped" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "hub24-invest",
    name: "HUB24 Invest",
    category: "Platform",
    tagline: "Investor directed portfolio service",
    summary:
      "HUB24 Invest is an investor directed portfolio service (IDPS) that lets your clients hold managed portfolios, managed funds, listed securities and term deposits in a single administered account.",
    audience: ["advisers", "private-wealth", "advised-clients", "licensees"],
    highlights: [
      {
        title: "One account, every asset type",
        body: "Managed portfolios, managed funds, ASX and international listed securities, term deposits and cash sit side by side with consolidated reporting.",
      },
      {
        title: "Ownership stays with the client",
        body: "Assets are held on custody for the client, who keeps beneficial ownership, franking credits and their own CGT position.",
      },
      {
        title: "Individual, joint, company, trust",
        body: "Open accounts across the ownership structures a practice actually uses, including SMSF via SMSF Access.",
      },
    ],
    specs: [
      { label: "Operator", value: "HUB24 Custodial Services Ltd" },
      { label: "Structure", value: "Investor directed portfolio service (IDPS)" },
      { label: "Menus", value: "Discover, Core, Choice" },
      { label: "Reporting", value: "InvestorHUB, annual and tax statements" },
    ],
    relatedSlugs: ["hub24-super", "managed-portfolios", "smsf-access"],
  },
  {
    slug: "hub24-super",
    name: "HUB24 Super",
    category: "Platform",
    tagline: "Superannuation and pension",
    summary:
      "HUB24 Super gives your clients the same investment menu and managed portfolio functionality inside a regulated superannuation fund, with account-based pension available at retirement.",
    audience: ["advisers", "private-wealth", "advised-clients"],
    highlights: [
      {
        title: "Accumulation and pension in one fund",
        body: "Move a client from accumulation to an account-based pension without selling down the underlying portfolio.",
      },
      {
        title: "Insurance inside super",
        body: "Retail life, TPD, trauma and income protection cover funded from the cash account and reported with the portfolio.",
      },
      {
        title: "Contribution handling",
        body: "Employer, personal, spouse and downsizer contributions with caps monitored and reported through AdviserHUB.",
      },
    ],
    specs: [
      { label: "Trustee", value: "HTFS Nominees Pty Limited" },
      { label: "Structure", value: "Regulated superannuation fund" },
      { label: "Pension", value: "Account-based and transition to retirement" },
      { label: "Menus", value: "Discover, Core, Choice" },
    ],
    relatedSlugs: ["hub24-invest", "managed-portfolios", "investorhub"],
  },
  {
    slug: "managed-portfolios",
    name: "Managed Portfolios",
    category: "Platform",
    tagline: "Innovative managed portfolios",
    summary:
      "Award-winning managed portfolio functionality that lets an adviser implement a professionally managed model across a client base while each client keeps beneficial ownership.",
    audience: ["advisers", "private-wealth", "investment-managers", "licensees"],
    highlights: [
      {
        title: "Rebalance once, apply everywhere",
        body: "Approve a model change and it flows to every client holding the model, with per-client substitutions and exclusions respected.",
      },
      {
        title: "Tax stays with the client",
        body: "Because clients hold the underlying securities, they keep their own cost base, franking credits and CGT outcomes.",
      },
      {
        title: "Blend models",
        body: "Combine a core model with a satellite, or run separate models for the accumulation and pension sleeves of a household.",
      },
    ],
    specs: [
      { label: "Models available", value: "800+" },
      { label: "Types", value: "Multi-sector and single-sector" },
      { label: "Menus", value: "Discover, Core, Choice" },
      { label: "Management", value: "Model manager rebalances via ManagerHUB" },
    ],
    relatedSlugs: ["hub24-invest", "hub24-super", "managerhub"],
  },
  {
    slug: "smsf-access",
    name: "SMSF Access",
    category: "Platform",
    tagline: "SMSF establishment and administration",
    summary:
      "SMSF Access removes the cost and complexity of establishing and administering a traditional self-managed super fund while keeping the control clients want.",
    audience: ["advisers", "private-wealth", "licensees"],
    highlights: [
      {
        title: "Establishment handled",
        body: "Trust deed, ABN/TFN registration, trustee documentation and bank setup run through the establishment service.",
      },
      {
        title: "Ongoing administration",
        body: "Annual accounts, audit coordination and compliance reporting, with data flowing into Class for the accountant.",
      },
      {
        title: "Same platform capability",
        body: "The fund invests through HUB24 Invest, so it gets the same investment menu and managed portfolio functionality.",
      },
    ],
    specs: [
      { label: "Structure", value: "SMSF investing through HUB24 Invest" },
      { label: "Menus", value: "Core, Choice" },
      { label: "Accounting", value: "Integrated with Class" },
      { label: "Audit", value: "Coordinated annually" },
    ],
    relatedSlugs: ["hub24-invest", "managed-portfolios", "class"],
  },
  {
    slug: "private-invest",
    name: "HUB24 Private Invest",
    category: "Platform",
    tagline: "For advised high-net-worth clients",
    summary:
      "Private Invest gives high-net-worth clients access to a wide range of investment opportunities, with the flexibility to combine platform holdings and non-custodial assets in one place.",
    audience: ["private-wealth", "licensees"],
    highlights: [
      {
        title: "Depth of investment access",
        body: "Uncapped term deposits, foreign currency trading, OTC bond trading and unlisted fixed income.",
      },
      {
        title: "Custodial and non-custodial together",
        body: "Assets held away from the platform are administered and reported alongside platform holdings.",
      },
      {
        title: "Complex structures supported",
        body: "Family trusts, corporate entities, SMSFs and third-party payment authorities.",
      },
    ],
    specs: [
      { label: "Client type", value: "Advised wholesale and HNW clients" },
      { label: "Menu", value: "Choice, extended" },
      { label: "Reporting", value: "Engage" },
      { label: "Currencies", value: "Multi-currency accounts" },
    ],
    relatedSlugs: ["engage", "hub24-invest", "managed-portfolios"],
  },
  {
    slug: "engage",
    name: "Engage",
    category: "Reporting",
    tagline: "A complete view of wealth",
    summary:
      "Engage is a market-leading reporting capability that brings together custodial and non-custodial data along with a client's other investments to create a complete view of their wealth.",
    audience: ["private-wealth", "advisers", "licensees"],
    highlights: [
      {
        title: "Everything in one picture",
        body: "Platform holdings, property, cash held elsewhere, separately held shares and alternatives in a single consolidated view.",
      },
      {
        title: "Household consolidation",
        body: "Group entities and family members so a review meeting starts from one number, not seven statements.",
      },
      {
        title: "Client-ready output",
        body: "Reporting packs that can be produced for a review meeting without rekeying data into a spreadsheet.",
      },
    ],
    specs: [
      { label: "Data types", value: "Custodial and non-custodial" },
      { label: "PARS FUA", value: "$24.8b" },
      { label: "Availability", value: "HUB24 platform" },
      { label: "Output", value: "Consolidated reports and exports" },
    ],
    relatedSlugs: ["private-invest", "adviserhub", "hubconnect"],
  },
  {
    slug: "investorhub",
    name: "InvestorHUB",
    category: "Portals",
    tagline: "The client portal",
    summary:
      "InvestorHUB is the online portal that empowers advised clients to stay connected and take better control of their investments — all in one place.",
    audience: ["advised-clients", "advisers"],
    highlights: [
      {
        title: "Portfolio dashboard",
        body: "Balances, asset allocation, performance and recent transactions on desktop or mobile.",
      },
      {
        title: "Reports and e-statements",
        body: "Annual statements, tax statements and quarterly reports available under the Account menu.",
      },
      {
        title: "Trade visibility",
        body: "Trades placed by an adviser through direct market trading can be monitored as they execute.",
      },
    ],
    specs: [
      { label: "Access", value: "Desktop and mobile browser" },
      { label: "Security", value: "Multi-factor authentication" },
      { label: "Statements", value: "Annual, tax and quarterly" },
      { label: "Support", value: "1300 508 797" },
    ],
    relatedSlugs: ["hub24-invest", "hub24-super", "adviserhub"],
  },
  {
    slug: "adviserhub",
    name: "AdviserHUB",
    category: "Portals",
    tagline: "The adviser workspace",
    summary:
      "AdviserHUB is where advisers and support staff run the client book — applications, trading, rebalancing, reporting and service requests.",
    audience: ["advisers", "private-wealth", "licensees"],
    highlights: [
      {
        title: "Direct market trading",
        body: "Place at-market or limit orders on Australian listed securities in real time through the default broker.",
      },
      {
        title: "Bulk actions",
        body: "Rebalance, switch or raise cash across a filtered set of clients in one instruction.",
      },
      {
        title: "Client book insight",
        body: "Balances, flows, review dates and outstanding actions across every client in the practice.",
      },
    ],
    specs: [
      { label: "Users", value: "Advisers and support staff" },
      { label: "Trading", value: "At-market and limit orders" },
      { label: "Reporting", value: "Practice and client level" },
      { label: "Support", value: "1300 854 994" },
    ],
    relatedSlugs: ["managed-portfolios", "engage", "investorhub"],
  },
  {
    slug: "managerhub",
    name: "ManagerHUB",
    category: "Portals",
    tagline: "The investment manager portal",
    summary:
      "ManagerHUB is designed for investment managers — the tools to maintain models, submit rebalances and understand flows across the adviser base.",
    audience: ["investment-managers"],
    highlights: [
      {
        title: "Model maintenance",
        body: "Update weights, submit a rebalance and track its progress through to client implementation.",
      },
      {
        title: "Flow analytics",
        body: "See net flows and holdings by licensee and practice so distribution effort goes where it works.",
      },
      {
        title: "Document management",
        body: "Publish model PDSs, factsheets and commentary that advisers see inside AdviserHUB.",
      },
    ],
    specs: [
      { label: "Users", value: "Investment managers" },
      { label: "Models", value: "Managed portfolios and funds" },
      { label: "Reporting", value: "Flows, holdings, unit registry" },
      { label: "Education", value: "CPD publishing" },
    ],
    relatedSlugs: ["managed-portfolios", "hub24-invest"],
  },
  {
    slug: "hub24-discover",
    name: "HUB24 Discover",
    category: "Investment menu",
    tagline: "Cost-effective managed portfolios",
    summary:
      "HUB24 Discover is an innovative, cost-effective managed portfolio platform and investment solution designed to support more of your clients throughout their wealth accumulation and retirement journey.",
    audience: ["advisers", "advised-clients"],
    highlights: [
      {
        title: "No administration or account keeping fee",
        body: "A simple, cost-effective fee structure on the award-winning HUB24 platform.",
      },
      {
        title: "Curated model range",
        body: "A streamlined selection of managed portfolios from leading portfolio managers.",
      },
      {
        title: "Grows with the client",
        body: "Clients can transition to Core and Choice while retaining the same account and underlying investments, without significant costs or CGT.",
      },
    ],
    specs: [
      { label: "Administration fee", value: "Nil" },
      { label: "Account keeping fee", value: "Nil" },
      { label: "Investments", value: "Selected managed portfolios" },
      { label: "Available on", value: "HUB24 Invest and HUB24 Super" },
    ],
    relatedSlugs: ["managed-portfolios", "hub24-invest", "hub24-super"],
  },
  {
    slug: "hubconnect",
    name: "HUBconnect",
    category: "Group",
    tagline: "Data and technology solutions",
    summary:
      "HUBconnect integrates, refines, stores and supplies structured and unstructured data, delivering efficiencies for the time-consuming processes that increase the cost of delivering advice.",
    audience: ["licensees", "advisers"],
    highlights: [
      {
        title: "Integrated data feeds",
        body: "Platform, product and market data delivered into advice software, CRMs and reporting stacks.",
      },
      {
        title: "Automated reporting",
        body: "Scheduled licensee and practice reporting without manual extraction.",
      },
      {
        title: "Applied intelligence",
        body: "Machine learning and natural language processing applied to unstructured advice documents.",
      },
    ],
    specs: [
      { label: "Segment", value: "Tech Solutions" },
      { label: "Customers", value: "Licensees and advice groups" },
      { label: "Delivery", value: "Feeds, APIs and reporting" },
      { label: "Part of", value: "HUB24 Group" },
    ],
    relatedSlugs: ["engage", "class"],
  },
  {
    slug: "class",
    name: "Class",
    category: "Group",
    tagline: "Cloud wealth accounting",
    summary:
      "Class delivers trust accounting, portfolio management, legal documentation, corporate compliance and SMSF administration solutions to accounting and advice firms across Australia.",
    audience: ["licensees", "advisers"],
    highlights: [
      {
        title: "SMSF administration",
        body: "Class Super automates SMSF accounting, reporting and compliance at scale.",
      },
      {
        title: "Trust and portfolio",
        body: "Class Trust and Class Portfolio extend the same automation to trusts and investment portfolios.",
      },
      {
        title: "NowInfinity",
        body: "Legal documentation and corporate compliance, including company registrations and trust deeds.",
      },
    ],
    specs: [
      { label: "Segment", value: "Tech Solutions" },
      { label: "Class Super accounts", value: "226,767" },
      { label: "Customers", value: "~6,500 firms" },
      { label: "Part of", value: "HUB24 Group" },
    ],
    relatedSlugs: ["smsf-access", "hubconnect"],
  },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const PRODUCT_CATEGORIES = [
  "Platform",
  "Investment menu",
  "Reporting",
  "Portals",
  "Group",
] as const;
