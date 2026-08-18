import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    slug: "hub24-invest",
    name: "HUB24 Invest",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Investor directed portfolio service",
    tagline: "Choose from a broad range of investment and insurance options",
    summary:
      "An investment platform that gives advisers and their clients flexibility and choice — managed portfolios, managed funds, ASX and international listed securities, term deposits, annuities and insurance in a single account.",
    audience: ["Advisers", "Private wealth", "Advised clients"],
    highlights: [
      {
        title: "One account, every asset type",
        body: "Buy or sell managed portfolios, managed funds, listed securities, term deposits and other assets from a single trade screen, then set up regular savings, withdrawals and investment plans.",
      },
      {
        title: "Three approaches to trading",
        body: "Aggregated trading applies adjusted daily weighted average pricing and nets asset trades to reduce transaction costs; directed and staged trading cover the rest.",
      },
      {
        title: "Portfolio tax optimisation",
        body: "Estimate, model and tailor tax outcomes before you trade, including pre-trade CGT impacts at the individual client account level.",
      },
    ],
    sections: [
      {
        heading: "Built for the way advice is delivered",
        body: "HUB24 Invest brings your clients' investable wealth into one place so you can spend less time reconciling and more time advising. Portfolio construction, implementation, rebalancing and reporting all happen in the same account.",
        bullets: [
          "Investment menus for every level of complexity — Discover, Core and Choice",
          "Automatic investment plans with dynamic asset allocation",
          "Online account opening with straight-through processing",
          "Digital advice fee consent and online tax deduction tooling",
        ],
      },
      {
        heading: "Reporting your clients actually read",
        body: "InvestorHUB gives your clients an always-on view of their account across transactions, valuations and reporting, with the same data available on mobile. Engage turns that data into an interactive presentation for review meetings.",
        bullets: [
          "Consolidated performance, income and tax reporting",
          "Family group and multi-account aggregation",
          "Branded client reports produced in minutes",
        ],
      },
    ],
    stats: [
      { label: "Managed portfolio options", value: "800+" },
      { label: "Managed funds", value: "1,400+" },
      { label: "Listed securities", value: "ASX + 20 global exchanges" },
    ],
    faqs: [
      {
        question: "Who can open a HUB24 Invest account?",
        answer:
          "Individuals, joint investors, companies, trusts and SMSFs, in each case through a financial adviser. In this demo any account you see is fictional.",
      },
      {
        question: "How are fees charged?",
        answer:
          "Administration fees are tiered by balance and vary by investment menu. Discover has no administration fee, no minimum fee and no account keeping fee.",
      },
    ],
    related: ["hub24-super", "hub24-discover", "managed-portfolios"],
  },
  {
    slug: "hub24-super",
    name: "HUB24 Super",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Superannuation and pension",
    tagline: "Super and pension with the flexibility of the HUB24 Platform",
    summary:
      "Accumulation, transition to retirement and account-based pension accounts with the same investment menu, managed portfolio technology and reporting as HUB24 Invest.",
    audience: ["Advisers", "Licensees", "Advised clients"],
    highlights: [
      {
        title: "Same-day strategy processing",
        body: "Frequently used superannuation strategies, including super-to-pension transfers, are processed online the same day.",
      },
      {
        title: "Retirement income made simple",
        body: "Model and set pension payments, manage minimum drawdowns and switch between accumulation and pension phase without leaving the account.",
      },
      {
        title: "Insurance inside super",
        body: "Access retail insurance solutions with premiums funded from the super account and reported alongside investments.",
      },
    ],
    sections: [
      {
        heading: "Efficiency for your practice",
        body: "Online applications, digital consent, and automated rollovers remove the paper from super advice. Straight-through processing means new clients can be invested the same week they sign.",
        bullets: [
          "Online rollover initiation and tracking",
          "Notice of intent to claim a deduction, handled online",
          "Automated pension payment scheduling and pro-rata calculations",
        ],
      },
      {
        heading: "Choice for your clients",
        body: "Clients in HUB24 Super access the full investment menu, including managed portfolios built by leading portfolio managers, plus term deposits, listed securities and managed funds.",
      },
    ],
    stats: [
      { label: "Pension payment frequencies", value: "6" },
      { label: "Same-day strategies", value: "12" },
      { label: "Investment menus", value: "Discover, Core, Choice" },
    ],
    related: ["hub24-invest", "smsf-access", "managed-portfolios"],
  },
  {
    slug: "hub24-discover",
    name: "HUB24 Discover",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Cost-effective managed portfolios",
    tagline: "Supporting clients at every life stage",
    summary:
      "A streamlined selection of managed portfolios from leading portfolio managers, with a simplified fee structure — no administration fee, no minimum fee and no account keeping fee.",
    audience: ["Advisers", "Advised clients"],
    highlights: [
      {
        title: "Designed with portfolio managers",
        body: "A curated menu that suits early-stage wealth accumulators, later-stage retirees and anyone with less complex investment needs.",
      },
      {
        title: "Grow into Core and Choice",
        body: "As client needs evolve they can move to the Core and Choice menus while retaining the same account and underlying investments.",
      },
      {
        title: "Simplified fees",
        body: "No administration fee, no minimum fee and no account keeping fee on the Discover menu.",
      },
    ],
    sections: [
      {
        heading: "Serve more of your client book",
        body: "Discover lets you say yes to clients whose balances would not previously have supported a platform relationship, without building a separate service model.",
        bullets: [
          "Available across HUB24 Invest and HUB24 Super",
          "Same adviser workflow, reporting and client portal",
          "Transition between menus without triggering a new account",
        ],
      },
    ],
    stats: [
      { label: "Funds under administration", value: "$2.4b" },
      { label: "Administration fee", value: "$0" },
      { label: "Portfolio managers", value: "18" },
    ],
    related: ["hub24-invest", "managed-portfolios", "hub24-super"],
  },
  {
    slug: "private-invest",
    name: "HUB24 Private Invest",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Wholesale and high net worth",
    tagline: "Broader access for wholesale clients",
    summary:
      "A solution designed specifically for wholesale clients, providing access to a broader range of wholesale investments, streamlined disclosure, and administration of custody and non-custody assets.",
    audience: ["Private wealth", "Licensees"],
    highlights: [
      {
        title: "Custody and non-custody together",
        body: "Administer listed and unlisted holdings, private market investments and externally held assets in one consolidated view.",
      },
      {
        title: "Streamlined disclosure",
        body: "Wholesale documentation replaces retail disclosure requirements, reducing paperwork for sophisticated investors.",
      },
      {
        title: "Reporting powered by Engage",
        body: "Consolidated reporting brings the whole balance sheet into a single interactive client presentation.",
      },
    ],
    sections: [
      {
        heading: "For practices serving complex wealth",
        body: "Private wealth clients rarely hold everything in one place. Private Invest is built to reflect that reality — investment structures, family groups and off-platform assets included.",
        bullets: [
          "Family group aggregation across entities",
          "Private market and alternative asset administration",
          "Bespoke fee arrangements at the practice level",
        ],
      },
    ],
    stats: [
      { label: "Typical client balance", value: "$3m+" },
      { label: "Entity types supported", value: "9" },
      { label: "Non-custody asset classes", value: "12" },
    ],
    related: ["engage", "managed-portfolios", "hub24-invest"],
  },
  {
    slug: "smsf-access",
    name: "SMSF Access",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Self-managed super",
    tagline: "A cost-effective SMSF without the administration burden",
    summary:
      "SMSF Access combines the control of a self-managed super fund with platform administration, investment menu access and integrated reporting into Class.",
    audience: ["Advisers", "Accountants"],
    highlights: [
      {
        title: "Administration handled",
        body: "Investment administration, corporate actions and transaction reporting are managed on platform and flow through to the fund's accounting file.",
      },
      {
        title: "Integrated with Class",
        body: "Daily data feeds into Class Super remove the annual reconciliation scramble at year end.",
      },
      {
        title: "Full investment menu",
        body: "Managed portfolios, managed funds, listed securities and term deposits are all available inside the fund.",
      },
    ],
    sections: [
      {
        heading: "Advisers and accountants, on the same data",
        body: "When the platform, the accounting file and the client portal all read from one source, SMSF advice stops being a reconciliation exercise and starts being a strategy conversation.",
        bullets: [
          "Daily transaction and valuation feeds",
          "Contribution and pension tracking",
          "Audit-ready reporting packs",
        ],
      },
    ],
    related: ["class", "hub24-super", "managed-portfolios"],
  },
  {
    slug: "managed-portfolios",
    name: "Managed portfolios",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Managed accounts",
    tagline: "Managed portfolio technology, six years running",
    summary:
      "The HUB24 Managed Portfolio Service gives advisers an easy, cost-effective and tax-efficient way to implement an investment strategy, with beneficial ownership of underlying assets retained by the client.",
    audience: ["Advisers", "Investment managers", "Licensees"],
    highlights: [
      {
        title: "Beneficial ownership retained",
        body: "Clients hold the underlying assets, so franking credits, cost bases and tax parcels stay with the individual investor.",
      },
      {
        title: "Substitutions and exclusions",
        body: "Tailor a model to an individual client with security substitutions, exclusions and cash holdings without leaving the model.",
      },
      {
        title: "Portfolio manager tooling",
        body: "Investment managers build, monitor and rebalance models with implementation handled by HUB24.",
      },
    ],
    sections: [
      {
        heading: "Why advisers use managed portfolios",
        body: "Rebalancing hundreds of client accounts by hand does not scale. A managed portfolio applies the investment decision across every account that holds the model, with transparency down to the individual holding.",
        bullets: [
          "Automated rebalancing across the client book",
          "Client-level tax parcel selection",
          "Transparency into every trade and holding",
          "Fee arrangements set by the portfolio manager and disclosed on platform",
        ],
      },
      {
        heading: "Menus built for different needs",
        body: "Managed portfolio options are available through the Discover, Core and Choice menus. Some Discover options are substantially similar to Core and Choice options but may be subject to different fees.",
      },
    ],
    stats: [
      { label: "Managed portfolio options", value: "800+" },
      { label: "Portfolio managers", value: "120+" },
      { label: "Awards for managed accounts", value: "6 years running" },
    ],
    related: ["hub24-invest", "hub24-discover", "engage"],
  },
  {
    slug: "engage",
    name: "Engage",
    brand: "HUB24 Platform",
    category: "platform",
    eyebrow: "Reporting and client presentations",
    tagline: "Create customised client reports and presentations in minutes",
    summary:
      "Engage transforms portfolio data into real-time, interactive visuals, bringing custodial and non-custodial data together to show a complete view of your client's wealth.",
    audience: ["Advisers", "Private wealth"],
    highlights: [
      {
        title: "The complete picture",
        body: "Combine HUB24 balances with property, cash accounts and separately held shares so the review meeting covers everything.",
      },
      {
        title: "Meeting-ready in minutes",
        body: "Settings persist between meetings, so the next review opens exactly where the last one finished.",
      },
      {
        title: "Your brand, your charts",
        body: "Team-level settings cover logos, chart colours, shared image libraries and custom asset classifications.",
      },
    ],
    sections: [
      {
        heading: "Built for the conversation, not the printer",
        body: "Engage is designed to be presented. Clear visuals, progressive disclosure and consistent flow keep clients focused on the decision in front of them rather than a 40-page PDF.",
        bullets: [
          "Interactive performance, allocation and income views",
          "Scenario walkthroughs during the meeting",
          "Export to PDF when a client wants a copy",
        ],
      },
    ],
    stats: [
      { label: "Average prep time saved", value: "2.5 hrs" },
      { label: "Report templates", value: "24" },
      { label: "Non-custodial asset types", value: "12" },
    ],
    related: ["private-invest", "hub24-invest", "myprosperity"],
  },
  {
    slug: "hubconnect",
    name: "HUBconnect",
    brand: "HUB24 Group",
    category: "data",
    eyebrow: "Data and connectivity",
    tagline: "Solving common data challenges for licensees, stockbrokers and advisers",
    summary:
      "HUBconnect leverages data and technology to solve connectivity challenges for stockbrokers, licensees and advisers, enabling the delivery of professional advice to more Australians.",
    audience: ["Licensees", "Investment managers"],
    highlights: [
      {
        title: "One data pipeline",
        body: "Normalise holdings, transactions and client data from multiple platforms and registries into a single feed.",
      },
      {
        title: "Licensee oversight",
        body: "Revenue, fee consent and portfolio data delivered to the licensee's own systems for supervision and reporting.",
      },
      {
        title: "Broker integration",
        body: "Connect broking systems to platform accounts so trades, contract notes and holdings reconcile automatically.",
      },
    ],
    sections: [
      {
        heading: "Data services for the wealth industry",
        body: "Most advice businesses run on more than one system. HUBconnect exists to make that estate behave like one, with governed feeds instead of spreadsheets.",
        bullets: [
          "Platform-agnostic data aggregation",
          "Fee and revenue reconciliation",
          "APIs and scheduled extracts",
        ],
      },
    ],
    related: ["class", "myprosperity", "engage"],
  },
  {
    slug: "class",
    name: "Class",
    brand: "Class",
    category: "accounting",
    eyebrow: "Wealth accounting software",
    tagline: "Automate SMSF, trust and portfolio administration",
    summary:
      "Class is a pioneer in cloud-based wealth accounting software, delivering SMSF administration, trust accounting, portfolio management, legal documentation and corporate compliance to finance professionals.",
    audience: ["Accountants", "Advisers"],
    highlights: [
      {
        title: "Class Super",
        body: "Automate SMSF administration with daily data feeds, automated corporate actions and audit-ready reporting.",
      },
      {
        title: "Class Trust",
        body: "Simplify and automate trust accounting and administration, including distributions and beneficiary tracking.",
      },
      {
        title: "Class Portfolio",
        body: "Daily investment reporting for companies, trusts and individuals outside the super environment.",
      },
    ],
    sections: [
      {
        heading: "Automation, simplicity and connectivity",
        body: "Since 2009 Class has moved SMSF administration to the cloud. Today it is the technology partner to many of Australia's leading accounting, auditing and advisory firms.",
        bullets: [
          "Daily bank and broker feeds",
          "Automated corporate actions",
          "Integrated audit workflow",
          "Connected to the HUB24 Platform through HUBconnect",
        ],
      },
    ],
    stats: [
      { label: "Funds administered", value: "200k+" },
      { label: "Firms using Class", value: "1,300+" },
      { label: "Data feeds", value: "300+" },
    ],
    related: ["nowinfinity", "smsf-access", "hubconnect"],
  },
  {
    slug: "nowinfinity",
    name: "NowInfinity",
    brand: "Class",
    category: "accounting",
    eyebrow: "Documents and compliance",
    tagline: "Legal documentation and corporate compliance, automated",
    summary:
      "The NowInfinity Document Suite delivers company, trust and SMSF documentation with electronic signing and ASIC corporate compliance in one workflow.",
    audience: ["Accountants", "Licensees"],
    highlights: [
      {
        title: "Document suite",
        body: "Company registrations, trust deeds, SMSF establishment and deed updates generated from structured data.",
      },
      {
        title: "Corporate compliance",
        body: "ASIC agent services, annual statements and change lodgements tracked to completion.",
      },
      {
        title: "NowInfinity Identity",
        body: "Verify identity and complete signing digitally as part of the same workflow.",
      },
    ],
    sections: [
      {
        heading: "One workflow, from data to executed document",
        body: "Because documents are generated from the same client data that drives the accounting file, details do not need to be re-keyed and version control stops being a filing exercise.",
        bullets: ["Bulk deed updates", "Digital execution", "Registry integrations"],
      },
    ],
    related: ["class", "myprosperity", "hubconnect"],
  },
  {
    slug: "myprosperity",
    name: "myprosperity",
    brand: "myprosperity",
    category: "portal",
    eyebrow: "Client portals",
    tagline: "A client portal for the whole financial picture",
    summary:
      "myprosperity gives accountants and financial advisers a branded client portal, making it easier for Australians to share, communicate and collaborate with their financial professional.",
    audience: ["Advisers", "Accountants", "Advised clients"],
    highlights: [
      {
        title: "Everything in one portal",
        body: "Assets, liabilities, documents, insurances and estate details in a single client-facing view.",
      },
      {
        title: "Signing and approvals",
        body: "Accepted e-signature workflows for platform request forms, alongside DocuSign, AdobeSign and Annature.",
      },
      {
        title: "Branded to your practice",
        body: "Your logo, your colours, your app — the portal reinforces your practice rather than a platform brand.",
      },
    ],
    sections: [
      {
        heading: "Engagement between meetings",
        body: "Advice relationships are annual by default. A portal that clients actually open turns a yearly review into an ongoing relationship, and shortens document turnaround from weeks to hours.",
        bullets: ["Secure document vault", "Task and signature requests", "Mobile app for clients"],
      },
    ],
    related: ["engage", "class", "myhub"],
  },
  {
    slug: "myhub",
    name: "myhub",
    brand: "HUB24 Group",
    category: "portal",
    eyebrow: "Advice ecosystem concept",
    tagline: "An integrated advice delivery ecosystem",
    summary:
      "myhub is an ecosystem concept providing access to leading advice technology and using AI-powered natural language prompting to address productivity challenges for advice practices.",
    audience: ["Advisers", "Licensees"],
    highlights: [
      {
        title: "Connected technology",
        body: "Brings together HUB24 Group capability — the HUB24 Platform, Class and myprosperity — with selected third-party providers.",
      },
      {
        title: "Natural language prompting",
        body: "Ask for the work rather than clicking through it: prepare a review pack, draft a record of advice, summarise a client's position.",
      },
      {
        title: "Practice productivity",
        body: "Targets the administrative load that sits between a client conversation and delivered advice.",
      },
    ],
    sections: [
      {
        heading: "A concept in development",
        body: "myhub was introduced as an ecosystem concept under development. In this demo it is represented as a preview surface rather than a shipped product.",
        bullets: [
          "Integrated advice technology partners",
          "AI-assisted preparation of advice documents",
          "Single sign-on across group products",
        ],
      },
    ],
    related: ["myprosperity", "class", "engage"],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function productsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export const PRODUCT_CATEGORY_LABELS: Record<Product["category"], string> = {
  platform: "HUB24 Platform",
  accounting: "Wealth accounting",
  portal: "Client engagement",
  data: "Data and connectivity",
};
