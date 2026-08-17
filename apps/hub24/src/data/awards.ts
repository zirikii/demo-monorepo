import type { Award, Faq } from "./types";

export const AWARDS: Award[] = [
  {
    year: 2026,
    title: "Best Platform Overall",
    awarder: "Investment Trends Adviser Technology Needs Report",
    detail: "Rated Australia's best platform overall by advisers for the fifth consecutive year.",
  },
  {
    year: 2026,
    title: "Best Platform — Managed Accounts Functionality",
    awarder: "Investment Trends Adviser Technology Needs Report",
    detail: "Recognised for managed portfolio construction, rebalancing and per-client controls.",
  },
  {
    year: 2026,
    title: "Highest Net Promoter Score",
    awarder: "Adviser Ratings Platform Survey",
    detail: "Retained the highest NPS of any platform in prominent industry surveys.",
  },
  {
    year: 2026,
    title: "#1 for quarterly and annual net inflows",
    awarder: "Plan for Life",
    detail: "Ranked first for both quarterly and annual net inflows for the tenth consecutive quarter.",
  },
  {
    year: 2025,
    title: "Best in Product Offering",
    awarder: "Investment Trends Adviser Technology Needs Report",
    detail: "Breadth of the investment menu across managed portfolios, funds and listed securities.",
  },
  {
    year: 2025,
    title: "Best in Decision Support Tools",
    awarder: "Investment Trends Adviser Technology Needs Report",
    detail: "Modelling and comparison tools available to advisers inside AdviserHUB.",
  },
  {
    year: 2025,
    title: "Best in Online Business Management",
    awarder: "Investment Trends Adviser Technology Needs Report",
    detail: "Practice-level administration, reporting and bulk actions.",
  },
  {
    year: 2025,
    title: "Largest annual platform market share gain",
    awarder: "Plan for Life",
    detail: "Market share rose to 9.9% as at 31 March 2026, the sixth largest platform by FUA.",
  },
  {
    year: 2024,
    title: "Admitted to the S&P/ASX 100",
    awarder: "S&P Dow Jones Indices",
    detail: "HUB24 Limited joined the S&P/ASX 100 index in September 2024.",
  },
];

export const FAQS: Faq[] = [
  {
    id: "fees",
    question: "How does platform pricing work?",
    answer:
      "Pricing follows the investment menu. Discover carries no administration or account keeping fee, Core has a lower minimum administration fee and no account keeping fee, and Choice applies a tiered administration fee plus an account keeping fee. Full fee tables are in the IDPS Guide and PDS on the product documents page.",
  },
  {
    id: "transitions",
    question: "What is involved in transitioning a client book?",
    answer:
      "A dedicated implementation manager maps the existing holdings, identifies exceptions such as closed funds or stapled securities, agrees the treatment for each, and then runs the transition in cohorts. In-specie transfer is used wherever the asset is available on the platform so clients are not forced to realise gains.",
  },
  {
    id: "managed-portfolios",
    question: "Does the client keep beneficial ownership in a managed portfolio?",
    answer:
      "Yes. Clients hold the underlying securities beneficially, so they keep their own cost base, franking credits and capital gains position. That is the core difference between a managed portfolio and a pooled managed fund.",
  },
  {
    id: "support",
    question: "What support does a practice get?",
    answer:
      "A national team of Business Development Managers, a Sydney-based client services desk on 1300 854 994, structured onboarding for new practices, and implementation managers for bulk transitions.",
  },
  {
    id: "private-invest",
    question: "Who is Private Invest for?",
    answer:
      "Advised high-net-worth clients with complex needs — uncapped term deposits, foreign currency trading, over-the-counter bond trading, unlisted fixed income, and non-custodial assets that need to be reported alongside platform holdings.",
  },
  {
    id: "engage",
    question: "What data can Engage report on?",
    answer:
      "Custodial platform holdings plus non-custodial assets — property, cash accounts held elsewhere, separately held shares, alternatives and private market investments — consolidated at client, entity or household level.",
  },
  {
    id: "investorhub",
    question: "How do I access InvestorHUB?",
    answer:
      "Your adviser arranges access when your account is opened. Log in from any desktop or mobile browser to see your portfolio dashboard, and find reports and e-statements under the Account menu.",
  },
  {
    id: "statements",
    question: "When are statements issued?",
    answer:
      "Annual statements are issued after 30 June, tax statements once distribution and franking data is finalised, and quarterly reports at the end of each quarter. All are available in InvestorHUB.",
  },
  {
    id: "security",
    question: "How is my account protected?",
    answer:
      "Multi-factor authentication is mandatory, payment instructions are verified, and transaction alerts can be enabled. If something looks wrong, call the investor line on 1300 508 797 immediately.",
  },
  {
    id: "listing",
    question: "How do I list a managed portfolio on the platform?",
    answer:
      "Talk to the investment operations team. We agree the vehicle (managed portfolio, managed fund or both), the menu placement across Discover, Core and Choice, and the documentation set, then set you up in ManagerHUB.",
  },
  {
    id: "cpd",
    question: "Can investment managers publish CPD material?",
    answer:
      "Yes. Through the professional development program we connect advisers with CPD-accredited material from investment managers on the platform. Contact us to contribute.",
  },
  {
    id: "data",
    question: "How does licensee data integration work?",
    answer:
      "HUBconnect integrates, refines, stores and supplies structured and unstructured data via feeds and APIs into advice software, CRMs and reporting stacks, plus scheduled licensee and practice reporting.",
  },
];

export function findFaqs(ids: string[]): Faq[] {
  return ids.map((id) => FAQS.find((faq) => faq.id === id)).filter((faq): faq is Faq => Boolean(faq));
}
