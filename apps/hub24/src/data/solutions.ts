import type { Solution } from "./types";

export const SOLUTIONS: Solution[] = [
  {
    slug: "advisers",
    audience: "Advisers",
    eyebrow: "HUB24 for advisers",
    title: "Do business your way",
    summary:
      "Enhanced technology that provides efficiencies to support business growth and the delivery of advice for your clients — whatever your practice looks like.",
    outcomes: [
      {
        title: "Less time on administration",
        body: "Online account opening with straight-through processing, digital fee consent and same-day super strategies remove the paperwork between advice and implementation.",
      },
      {
        title: "Scale without extra headcount",
        body: "Managed portfolios apply an investment decision across every client that holds the model, with client-level tax outcomes preserved.",
      },
      {
        title: "Client conversations that land",
        body: "Engage turns portfolio data into an interactive presentation, so reviews focus on the decision rather than the paperwork.",
      },
    ],
    products: ["hub24-invest", "hub24-super", "managed-portfolios", "engage"],
    quote: {
      body: "We moved our review packs into Engage and cut two hours of preparation per client. The meetings themselves changed — clients ask better questions when they can see the whole picture.",
      name: "Alicia Nguyen",
      role: "Senior Financial Adviser, Meridian Private Wealth",
    },
  },
  {
    slug: "licensees",
    audience: "Licensees",
    eyebrow: "HUB24 for licensees",
    title: "Governance and oversight that scales",
    summary:
      "Support your adviser network with consistent investment solutions, transparent data and the oversight tooling your responsible managers need.",
    outcomes: [
      {
        title: "Consistent investment governance",
        body: "Approved product lists and licensee-managed portfolios keep advice consistent across the network without limiting adviser judgement.",
      },
      {
        title: "Data on your terms",
        body: "HUBconnect delivers holdings, transaction, revenue and fee-consent data into your own systems for supervision and reporting.",
      },
      {
        title: "Efficient practice onboarding",
        body: "Bulk transitions, adviser accreditation and practice-level fee arrangements are handled with your BDM and transitions team.",
      },
    ],
    products: ["hubconnect", "managed-portfolios", "hub24-super"],
    quote: {
      body: "Our responsible managers finally see the same numbers our advisers do, on the same day. That changed what supervision costs us.",
      name: "Marcus Bell",
      role: "Head of Investment Solutions, Highfield Advice Group",
    },
  },
  {
    slug: "private-wealth",
    audience: "Private wealth",
    eyebrow: "HUB24 for private wealth",
    title: "Complex wealth, consolidated",
    summary:
      "Serve high net worth and wholesale clients with custody and non-custody administration, family group reporting and access to a broader investment universe.",
    outcomes: [
      {
        title: "The whole balance sheet",
        body: "Administer platform assets alongside private markets, property and externally held investments, then report on them together.",
      },
      {
        title: "Family groups, not just accounts",
        body: "Aggregate entities, trusts and individuals into a single family view with permissions for each member.",
      },
      {
        title: "Wholesale access",
        body: "HUB24 Private Invest provides streamlined wholesale disclosure and access to a broader range of wholesale investments.",
      },
    ],
    products: ["private-invest", "engage", "managed-portfolios"],
  },
  {
    slug: "advised-clients",
    audience: "Advised clients",
    eyebrow: "HUB24 for advised clients",
    title: "See your whole financial picture",
    summary:
      "Your adviser can connect you to a range of super, pension, investment and insurance solutions, with online access to your account whenever you want it.",
    outcomes: [
      {
        title: "One place for your investments",
        body: "Super, pension and investment accounts sit alongside each other with consolidated valuations, income and tax reporting.",
      },
      {
        title: "Always-on access",
        body: "InvestorHUB shows transactions, valuations and reporting online, with the same view available on mobile.",
      },
      {
        title: "Conversations you can follow",
        body: "Your adviser presents your position through Engage, with interactive visuals rather than a stack of paper.",
      },
    ],
    products: ["hub24-invest", "hub24-super", "myprosperity"],
  },
  {
    slug: "investment-managers",
    audience: "Investment managers",
    eyebrow: "HUB24 for investment managers",
    title: "Distribute your expertise",
    summary:
      "Bring your investment process to advisers through managed portfolios, with implementation, rebalancing and reporting handled by HUB24.",
    outcomes: [
      {
        title: "Model, don't administer",
        body: "You set the model and the rebalance; HUB24 implements across every client account that holds it.",
      },
      {
        title: "Reach advisers directly",
        body: "Your models appear alongside the rest of the investment menu, discoverable by advisers building portfolios.",
      },
      {
        title: "Transparent reporting",
        body: "Advisers and clients see every holding and every trade, which builds confidence in the strategy.",
      },
    ],
    products: ["managed-portfolios", "hubconnect"],
  },
  {
    slug: "accountants",
    audience: "Accountants",
    eyebrow: "HUB24 for accountants",
    title: "Wealth accounting without the reconciliation",
    summary:
      "Class and NowInfinity automate SMSF, trust and portfolio administration, documentation and corporate compliance for accounting firms.",
    outcomes: [
      {
        title: "Year-end without the scramble",
        body: "Daily feeds and automated corporate actions mean the file is close to done before the annual process starts.",
      },
      {
        title: "Documents from the same data",
        body: "NowInfinity generates company, trust and SMSF documentation from the client data you already hold.",
      },
      {
        title: "Advice-ready collaboration",
        body: "myprosperity gives your clients a portal, and gives the adviser in the relationship the same view you have.",
      },
    ],
    products: ["class", "nowinfinity", "smsf-access", "myprosperity"],
  },
];

export function solutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
