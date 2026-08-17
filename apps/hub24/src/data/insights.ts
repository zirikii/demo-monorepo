import type { CpdModule, Insight } from "./types";

export const INSIGHTS: Insight[] = [
  {
    slug: "managed-portfolios-past-the-tipping-point",
    title: "Managed portfolios are past the tipping point",
    category: "Managed portfolios",
    excerpt:
      "Adoption is no longer the story. What separates practices now is how deliberately they use model governance to buy back adviser time.",
    author: "Priya Venkatesan",
    authorTitle: "Head of Managed Portfolios",
    published: "2026-08-04",
    featured: true,
    body: [
      "Five years ago the conversation with a practice about managed portfolios started with whether to use them at all. That conversation has largely ended. Across the HUB24 platform, the majority of new investment flow now lands in a managed portfolio rather than a hand-built holding list, and the practices adopting them are not only the large ones.",
      "What has changed is the second-order question. Once a practice has moved its client base onto models, the value it extracts depends almost entirely on how it governs those models. Practices that treat the model as a starting point and then apply dozens of per-client substitutions end up with the administrative load they were trying to remove.",
      "The pattern we see in the highest-productivity practices is a small number of models, applied with discipline, and substitutions reserved for genuine client circumstances — a legacy parcel with an embedded capital gain, an ESG exclusion the client actually cares about, or a concentration that needs to be unwound over several tax years.",
      "The compounding benefit is in the review cycle. When a model changes, the rebalance flows to every client holding it in a single approval. The adviser's time moves from implementation to conversation, which is where clients say they see the value of advice.",
      "The other shift worth noting is blended models. Rather than choosing between a core index model and a specialist satellite, advisers increasingly run both inside a single account, with the weighting between them set per client. That gets a practice most of the way to bespoke without any of the bespoke administration.",
    ],
  },
  {
    slug: "retirement-income-covenant-three-years-on",
    title: "The retirement income covenant, three years on",
    category: "Regulation",
    excerpt:
      "Strategy documents are written. The harder work is evidencing that a retiree's income strategy is actually being delivered account by account.",
    author: "Martin Ellery",
    authorTitle: "Head of Technical Services",
    published: "2026-07-22",
    body: [
      "The retirement income covenant asked trustees to formulate a strategy. Most did. The question that keeps surfacing in licensee conversations is a different one: how do you evidence that an individual retiree's income strategy is being delivered, month after month, at the account level?",
      "For advised clients this is more tractable than it is for a large fund, because the strategy is documented in a statement of advice and the account is administered against it. The gap tends to be in reporting — showing that the drawdown pattern, the cash buffer and the sequencing risk management actually match what was recommended.",
      "Three practical mechanics help. First, hold the income buffer as a distinct, visible allocation rather than as residual cash. Second, set the pension payment schedule against the buffer rather than against the total portfolio, so a market drawdown does not force a sale. Third, report the buffer's remaining duration in months, which is the number a retiree understands.",
      "None of this is novel. What has changed is that the reporting to evidence it is now available without a spreadsheet, which means it can be produced for every retiree client rather than the largest ten.",
    ],
  },
  {
    slug: "what-hnw-clients-actually-ask-for",
    title: "What high-net-worth clients actually ask for",
    category: "Practice management",
    excerpt:
      "It is rarely exotic product. In the private wealth conversations we sit in on, three requests come up far more often than any other.",
    author: "Ruth Callaghan",
    authorTitle: "National Manager, Private Wealth",
    published: "2026-07-09",
    body: [
      "There is a persistent assumption that servicing high-net-worth clients means sourcing increasingly exotic product. In the private wealth practices we work with, that is not what clients ask for.",
      "The first request is a single view. A client with a family trust, an SMSF, an investment company, a property portfolio and a legacy share parcel does not want five reports. They want one number, and they want to be able to drill into it. This is the problem Engage exists to solve, and it is the most common trigger for a private wealth practice moving a client onto the platform.",
      "The second is control over cash. HNW clients hold materially more cash than the models suggest they should, and they want it working. Uncapped term deposits and multi-currency accounts matter far more in practice than access to a niche alternatives manager.",
      "The third is administrative reliability. A third-party payment request that executes on the day it was promised, a distribution that is coded correctly the first time, an annual tax statement that the accountant does not have to rebuild. Unglamorous, and the thing clients notice.",
      "Exotic product does come up, and the platform supports OTC bond trading and unlisted fixed income for the clients who want them. But it is the fourth conversation, not the first.",
    ],
  },
  {
    slug: "reading-the-fy26-flow-data",
    title: "Reading the FY26 platform flow data",
    category: "Market insights",
    excerpt:
      "Headline net inflows of $18.9 billion sit slightly below FY25. Strip out the prior year's migrations and the underlying picture is a record.",
    author: "James Ferrier",
    authorTitle: "Head of Investor Relations",
    published: "2026-07-21",
    body: [
      "Platform net inflows of $18.9 billion for FY26 sit marginally below the $19.8 billion reported in FY25. Taken at face value that reads as a slowdown. It is worth understanding why it is not.",
      "FY25 included large migrations — books of business moved onto the platform in bulk following licensee agreements, including the completion of the Equity Trustees transitions. Migrations are real flow, but they are lumpy and they do not recur. Excluding them, FY26 organic inflows grew 20% on the prior corresponding period, which is the basis for describing them as a record.",
      "Total funds under administration reached $164.3 billion at 30 June 2026, up 20%, comprising platform FUA of $139.5 billion (up 24%) and PARS FUA of $24.8 billion (up 5%). The divergence between the two is worth watching: custodial platform growth is running well ahead of non-custodial reporting growth.",
      "Adviser numbers grew 11% to 5,649, and market share reached 9.9% as at 31 March 2026, making HUB24 the sixth largest platform by FUA in Australia. The platform ranked first for both quarterly and annual net inflows for the tenth consecutive quarter.",
      "The nuance matters for anyone modelling the business: the raw annual flow number is not higher than last year, yet the underlying recurring flow is. Both statements are true.",
    ],
  },
  {
    slug: "the-quiet-cost-of-rekeying",
    title: "The quiet cost of rekeying",
    category: "Technology",
    excerpt:
      "Every practice knows data entry is a cost. Fewer have measured how much of it survives after the obvious automations are done.",
    author: "Tom Nguyen",
    authorTitle: "Group Product Manager, HUBconnect",
    published: "2026-06-18",
    body: [
      "Ask a practice principal where their administrative cost sits and they will usually name applications and rebalancing. Both have been substantially automated. What survives is less visible: the small acts of rekeying between systems that nobody has owned long enough to remove.",
      "A client's address changes. It gets updated in the CRM, in the advice software, on the platform, and in the insurance provider's portal. A new managed portfolio is approved. It gets added to the APL document, the advice software's product list, and the review template.",
      "Individually these take minutes. Aggregated across a book, they consume a support role. The reason they persist is that each one sits between two systems, and neither system's vendor considers it their problem.",
      "This is the space HUBconnect works in — integrating and supplying data so the same fact does not need to be typed four times. It is unglamorous work, and it is where a meaningful share of practice capacity is recovered.",
    ],
  },
  {
    slug: "smsf-establishment-without-the-friction",
    title: "SMSF establishment without the friction",
    category: "Practice management",
    excerpt:
      "The reasons clients ask for an SMSF have not changed. The reasons advisers hesitate to recommend one mostly have.",
    author: "Alicia Barnes",
    authorTitle: "Senior Manager, SMSF Solutions",
    published: "2026-05-27",
    body: [
      "Clients ask for an SMSF for the same three reasons they always have: control over the investment strategy, the ability to hold a specific asset, and a preference for a structure they understand.",
      "Adviser hesitation historically came from the operational side — establishment paperwork, an annual audit to coordinate, accounts to prepare, and a compliance risk that sits with the trustee but reflects on the adviser.",
      "SMSF Access changes the operational calculus rather than the strategic one. Establishment documentation, registrations and trustee setup are handled through the service. Annual administration and audit coordination run in the background, and data flows into Class for the accountant.",
      "The strategic question is unchanged and still deserves a proper answer: does this client have the balance, the engagement and the reason to justify a separate structure? Where the answer is yes, the friction that used to sit behind that recommendation is now much lower.",
    ],
  },
  {
    slug: "sequencing-risk-in-a-flat-decade",
    title: "Sequencing risk when the decade is flat",
    category: "Market insights",
    excerpt:
      "Retirement modelling that assumes a smooth average return understates the damage of a poor first five years.",
    author: "Martin Ellery",
    authorTitle: "Head of Technical Services",
    published: "2026-05-06",
    body: [
      "Two retirees with identical starting balances, identical drawdowns and identical average annual returns over twenty years can finish in radically different positions. The only difference is the order in which the returns arrived.",
      "This is sequencing risk, and it is well understood in theory and under-managed in practice. The reason is that the standard modelling tools present a smoothed average, which is precisely the assumption that hides the risk.",
      "The mitigations are not complicated. A cash and short-duration buffer sized to two to three years of drawdown means a poor first five years does not force asset sales at the bottom. A drawdown rule that flexes with portfolio value trades some income certainty for materially better terminal outcomes.",
      "What has improved is the ability to evidence the buffer. When the income allocation is a visible sleeve in the account rather than residual cash, the client can see how many months of payments are covered, and the adviser can show the strategy is being delivered rather than merely recommended.",
    ],
  },
  {
    slug: "apl-governance-for-growing-licensees",
    title: "APL governance for a growing licensee",
    category: "Regulation",
    excerpt:
      "Approved product lists tend to grow by accretion. A structured review cycle is the difference between a governance artefact and a live control.",
    author: "Simone Kaur",
    authorTitle: "Head of Licensee Solutions",
    published: "2026-04-15",
    body: [
      "Approved product lists rarely get smaller. A model is added for one practice, a fund for another, and within a few years the list is long enough that nobody can say with confidence why every item is on it.",
      "The consequence is not usually a bad outcome for a client. It is an inability to evidence the control at audit. If the licensee cannot explain the criteria by which something was added, the list is documentation rather than governance.",
      "Three habits fix most of this. Set explicit inclusion criteria before anything is added. Run a scheduled review that requires a positive decision to retain, not merely the absence of a decision to remove. And restrict investment options by adviser cohort where the underlying capability genuinely differs.",
      "The platform side of this is straightforward — group-wide APL settings and cohort restrictions are configurable and their state is reportable. The harder part is the review cadence, which is a licensee discipline rather than a technology feature.",
    ],
  },
  {
    slug: "why-transitions-fail",
    title: "Why platform transitions fail, and what fixes them",
    category: "Practice management",
    excerpt:
      "Transitions rarely fail on the technology. They fail on client communication and on the assets nobody mapped.",
    author: "Daniel Okonjo",
    authorTitle: "National Implementation Manager",
    published: "2026-03-19",
    body: [
      "A bulk transition of a client book onto a new platform is a project, and like most projects it fails for organisational reasons rather than technical ones.",
      "The most common failure is unmapped assets. A book that is 95% managed funds and listed securities transitions cleanly. The remaining 5% — a legacy insurance bond, a stapled security, a fund that has closed to new investment — is where the timeline goes. Map it first, decide the treatment for each exception, and the rest is mechanical.",
      "The second is client communication. Clients do not object to a platform change; they object to being surprised by one. A short, specific letter that explains what changes, what does not, and what the client needs to do is worth more than a detailed technical appendix.",
      "The third is sequencing. Transitioning the largest and most complex clients first is intuitive and wrong. Transition a representative cohort, learn from the exceptions, then scale.",
      "Where a dedicated implementation manager is involved, the exception mapping happens before the first form is signed, which is the single biggest predictor of whether the timeline holds.",
    ],
  },
  {
    slug: "the-case-for-fewer-models",
    title: "The case for fewer models",
    category: "Managed portfolios",
    excerpt:
      "Every additional model on a practice's list adds governance load. Very few add a corresponding amount of client value.",
    author: "Priya Venkatesan",
    authorTitle: "Head of Managed Portfolios",
    published: "2026-02-11",
    body: [
      "Practices that adopt managed portfolios often finish with more models than they intended. A conservative and a growth model become five risk-graded models, then a separate set for pension clients, then an ESG variant, then a model for the clients who came across in an acquisition.",
      "Each addition is individually defensible. Collectively they reinstate the governance load the practice moved to models to escape — every model needs monitoring, review documentation and a rationale for why a client sits in it rather than an adjacent one.",
      "The practices with the highest adviser-to-client ratios that we work with run a small model set and use per-client cash targets and substitutions to handle genuine differences. The model list is a governance artefact; the client's circumstances live in the account settings.",
      "A useful test: if you cannot articulate in one sentence which client belongs in each model and why, there are too many models.",
    ],
  },
];

export function findInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}

export const INSIGHT_CATEGORIES = [
  "Market insights",
  "Practice management",
  "Managed portfolios",
  "Regulation",
  "Technology",
] as const;

export const CPD_MODULES: CpdModule[] = [
  {
    id: "cpd-001",
    title: "Managed portfolios and the tax outcomes clients actually notice",
    provider: "HUB24 Technical Services",
    cpdHours: 1.5,
    areas: ["Technical competence", "Tax (financial) advice"],
    format: "Webinar",
    published: "2026-08-06",
    summary:
      "Cost base, franking credits and CGT under a managed portfolio structure, with worked examples for accumulation and pension clients.",
  },
  {
    id: "cpd-002",
    title: "Retirement income strategies under the covenant",
    provider: "HUB24 Technical Services",
    cpdHours: 2,
    areas: ["Technical competence", "Regulatory compliance"],
    format: "Course",
    published: "2026-07-15",
    summary:
      "Building and evidencing a retirement income strategy at the account level, including buffer sizing and drawdown rules.",
  },
  {
    id: "cpd-003",
    title: "Fixed income beyond the term deposit",
    provider: "Tallowood Asset Management",
    cpdHours: 1,
    areas: ["Technical competence"],
    format: "Webinar",
    published: "2026-07-02",
    summary:
      "Unlisted domestic fixed income, OTC bonds and where duration belongs in a defensive allocation for advised clients.",
  },
  {
    id: "cpd-004",
    title: "SMSF establishment: when it stacks up",
    provider: "Class",
    cpdHours: 1.5,
    areas: ["Technical competence", "Regulatory compliance"],
    format: "Course",
    published: "2026-06-24",
    summary: "Balance thresholds, trustee obligations and the practical cost comparison against a platform super account.",
  },
  {
    id: "cpd-005",
    title: "Sequencing risk and the first five years",
    provider: "Kembla Investment Partners",
    cpdHours: 1,
    areas: ["Technical competence"],
    format: "Podcast",
    published: "2026-06-03",
    summary: "Why average returns mislead in decumulation, and three mitigations that survive contact with a real client.",
  },
  {
    id: "cpd-006",
    title: "Professionalism and the client best interests duty in model portfolios",
    provider: "HUB24 Technical Services",
    cpdHours: 1,
    areas: ["Professionalism and ethics"],
    format: "Article",
    published: "2026-05-19",
    summary: "Documenting why a model was selected for a specific client, and what a reviewer will look for.",
  },
  {
    id: "cpd-007",
    title: "International listed securities: settlement, currency and tax",
    provider: "HUB24 Technical Services",
    cpdHours: 1.5,
    areas: ["Technical competence", "Tax (financial) advice"],
    format: "Webinar",
    published: "2026-04-28",
    summary: "Holding international listed securities on platform — settlement cycles, FX treatment and withholding tax.",
  },
  {
    id: "cpd-008",
    title: "Cyber hygiene for advice practices",
    provider: "HUB24 Group Security",
    cpdHours: 1,
    areas: ["Regulatory compliance", "Professionalism and ethics"],
    format: "Course",
    published: "2026-03-31",
    summary: "Multi-factor authentication, payment verification and the social engineering patterns targeting advice firms.",
  },
];
