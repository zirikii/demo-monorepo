import type { Audience, AudienceSlug } from "./types";

export const AUDIENCES: Audience[] = [
  {
    slug: "advisers",
    path: "/hub24-for-advisers/",
    navLabel: "Advisers",
    eyebrow: "HUB24 for advisers",
    title: "Do business your way, on Australia's best platform",
    intro:
      "We're continually investing in innovative products and solutions that drive productivity in your business and enhance the value of your advice — all in one place.",
    heroPoints: [
      "Managed portfolio functionality that removes the ROA burden of rebalancing",
      "Discover, Core and Choice investment menus so pricing follows the client",
      "A dedicated Business Development Manager and implementation support",
    ],
    pillars: [
      {
        title: "Productivity you can measure",
        body: "Bulk transactions, digital consent, straight-through applications and pre-filled forms cut the administration out of implementing advice.",
        icon: "target",
      },
      {
        title: "Managed portfolios at scale",
        body: "Rebalance an entire client base against a model in a single approval, with beneficial ownership and full tax transparency retained by the client.",
        icon: "layers",
      },
      {
        title: "One place for every client",
        body: "Super, pension, investment, SMSF and insurance sit alongside each other with consolidated reporting across the household.",
        icon: "compass",
      },
      {
        title: "Support that turns up",
        body: "A national BDM team, a Sydney-based client services desk on 1300 854 994, and structured onboarding for new practices.",
        icon: "users",
      },
    ],
    proofPoints: [
      { value: "5,649", label: "Active advisers", note: "Up 11% year on year" },
      { value: "10 quarters", label: "Ranked #1 for net inflows", note: "Plan for Life data" },
      { value: "36", label: "New licensee agreements", note: "Signed in Q4 FY26" },
    ],
    faqIds: ["fees", "transitions", "managed-portfolios", "support"],
    ctaTitle: "Let's talk about how the platform can help your practice",
    ctaBody: "Submit your details and your local Business Development Manager will be in touch.",
  },
  {
    slug: "private-wealth",
    path: "/hub24-for-brokers/",
    navLabel: "Private wealth",
    eyebrow: "HUB24 for private wealth",
    title: "Empowering private wealth advisers with platform, technology and data",
    intro:
      "Through collaboration with licensees and advisers we're continually innovating to help drive productivity and enhance the value of your advice for high-net-worth clients.",
    heroPoints: [
      "Private Invest brings custodial and non-custodial assets into one place",
      "Uncapped term deposits, foreign currency and OTC bond trading",
      "Engage reporting for a complete view of a client's wealth",
    ],
    pillars: [
      {
        title: "Breadth for complex portfolios",
        body: "International listed securities across 20+ exchanges, unlisted domestic fixed income, uncapped term deposits and foreign currency accounts.",
        icon: "globe",
      },
      {
        title: "A complete view of wealth",
        body: "Engage brings platform holdings together with property, direct shares, private markets and cash held away from the platform.",
        icon: "database",
      },
      {
        title: "Structures that fit",
        body: "Individual, joint, company, trust and SMSF ownership with third-party payment requests and delegated authorities.",
        icon: "briefcase",
      },
      {
        title: "Specialist relationship team",
        body: "A national team of BDMs dedicated to private wealth advisers and brokers, plus implementation managers for transitions.",
        icon: "users",
      },
    ],
    proofPoints: [
      { value: "$24.8b", label: "PARS funds under administration", note: "Non-custodial reporting" },
      { value: "20+", label: "International exchanges" },
      { value: "Uncapped", label: "Term deposit access" },
    ],
    faqIds: ["private-invest", "engage", "transitions", "fees"],
    ctaTitle: "Talk to the private wealth team",
    ctaBody: "We'll walk you through Private Invest, Engage and the non-custodial capability.",
  },
  {
    slug: "advised-clients",
    path: "/hub24-for-advised-clients/",
    navLabel: "Advised clients",
    eyebrow: "HUB24 for investors",
    title: "Welcome to HUB24",
    intro:
      "You may have landed here through a recommendation from your financial adviser. Here's why advisers like yours have voted us Australia's best platform, and how, alongside your adviser, we can help empower a better financial future.",
    heroPoints: [
      "Super, pension, investment and insurance solutions in one account",
      "Investment menus your adviser can tailor to your goals",
      "InvestorHUB — see your portfolio, reports and statements online",
    ],
    pillars: [
      {
        title: "Your adviser stays in control of strategy",
        body: "HUB24 doesn't provide personal advice. Your adviser sets the strategy; we administer, report and keep the record straight.",
        icon: "compass",
      },
      {
        title: "Choice that matches your balance",
        body: "The Discover, Core and Choice menus mean you're not paying for investment breadth you don't use.",
        icon: "coins",
      },
      {
        title: "Transparency on every dollar",
        body: "Fees, transactions, income and tax positions are itemised, and annual statements are issued through InvestorHUB.",
        icon: "chart",
      },
      {
        title: "Security by default",
        body: "Multi-factor authentication, transaction alerts and a Sydney-based client services team on 1300 508 797.",
        icon: "lock",
      },
    ],
    proofPoints: [
      { value: "$164.3b", label: "Funds under administration", note: "As at 30 June 2026" },
      { value: "ASX 100", label: "Listed parent company", note: "HUB24 Limited (ASX:HUB)" },
      { value: "24/7", label: "InvestorHUB access" },
    ],
    faqIds: ["investorhub", "statements", "fees", "security"],
    ctaTitle: "Questions about your account?",
    ctaBody: "Speak to your adviser first — they know your strategy. For account administration, call 1300 508 797.",
  },
  {
    slug: "investment-managers",
    path: "/hub24-for-investment-managers/",
    navLabel: "Investment managers",
    eyebrow: "HUB24 for investment managers",
    title: "Empowering better financial futures, together with investment managers",
    intro:
      "As the platform rated #1 by advisers, we understand the crucial role investment managers play. We're committed to platform capability that supports the delivery of your investment expertise.",
    heroPoints: [
      "Distribute managed portfolios and funds to 5,600+ active advisers",
      "ManagerHUB for model maintenance, flows and reporting",
      "Reach advisers through our CPD-accredited education program",
    ],
    pillars: [
      {
        title: "ManagerHUB",
        body: "Maintain models, submit rebalances, monitor flows by licensee and download unit registry data from one online portal.",
        icon: "sparkles",
      },
      {
        title: "Distribution reach",
        body: "Relationships with licensees representing more than 77% of the Australian adviser market.",
        icon: "globe",
      },
      {
        title: "Flexible vehicles",
        body: "List a managed portfolio, a managed fund, or both. Discover, Core and Choice menu placement is agreed up front.",
        icon: "puzzle",
      },
      {
        title: "Insight into flows",
        body: "Near real-time flow and holding analytics so distribution teams can see where a model is being adopted.",
        icon: "chart",
      },
    ],
    proofPoints: [
      { value: "800+", label: "Managed portfolios on platform" },
      { value: "1,000+", label: "Managed funds" },
      { value: "77%", label: "Of the adviser market reachable" },
    ],
    faqIds: ["listing", "cpd", "managed-portfolios"],
    ctaTitle: "List your investment capability on HUB24",
    ctaBody: "Tell us about your strategy and our investment operations team will get in touch.",
  },
  {
    slug: "licensees",
    path: "/hub24-for-licensees/",
    navLabel: "Licensees",
    eyebrow: "HUB24 for licensees",
    title: "Scale, governance and data across your advice network",
    intro:
      "Licensee-level controls, approved product list management and group reporting so you can grow the network without losing oversight.",
    heroPoints: [
      "Group-wide APL and model governance",
      "Data feeds into your advice software and BI stack via HUBconnect",
      "Practice-level flow, revenue and adoption reporting",
    ],
    pillars: [
      {
        title: "Governance built in",
        body: "Set the approved product list, restrict investment options by adviser cohort, and evidence the controls at audit.",
        icon: "lock",
      },
      {
        title: "Data where you need it",
        body: "HUBconnect integrates, refines and supplies structured and unstructured data into advice software, CRMs and reporting.",
        icon: "database",
      },
      {
        title: "Transitions handled",
        body: "Dedicated implementation managers run bulk transitions, including in-specie transfers, so advisers keep advising.",
        icon: "target",
      },
      {
        title: "Commercial clarity",
        body: "Transparent platform pricing and group reporting on flows, balances and adoption by practice.",
        icon: "coins",
      },
    ],
    proofPoints: [
      { value: "9.9%", label: "Platform market share", note: "6th largest by FUA" },
      { value: "$18.9b", label: "FY26 net inflows" },
      { value: "1,010", label: "HUB24 Group employees" },
    ],
    faqIds: ["transitions", "data", "support"],
    ctaTitle: "Talk to us about your licensee agreement",
    ctaBody: "We'll cover governance, data integration and the transition plan.",
  },
];

export function findAudience(slug: AudienceSlug): Audience | undefined {
  return AUDIENCES.find((audience) => audience.slug === slug);
}

export function findAudienceByPath(path: string): Audience | undefined {
  return AUDIENCES.find((audience) => audience.path === path);
}
