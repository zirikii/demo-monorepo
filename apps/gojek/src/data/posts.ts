import type { Post, PostCategory } from "./types";

export const POST_CATEGORIES: PostCategory[] = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Culture",
  "News",
];

export const POSTS: Post[] = [
  {
    slug: "allocating-two-million-riders",
    title: "Allocating two million riders without melting the matcher",
    category: "Engineering",
    excerpt:
      "Our allocation service decides who picks up your order. Here is how we rebuilt it from a request-per-booking design into a rolling batch auction.",
    author: "Ratna Dewi",
    authorRole: "Principal Engineer, Marketplace",
    publishedOn: "2026-08-18",
    readingMinutes: 11,
    tags: ["allocation", "golang", "marketplace"],
    sections: [
      {
        paragraphs: [
          "The first version of allocation answered one question at a time: given this booking, who is the closest available driver partner? It was easy to reason about and it held up for years. It also made a decision that looked good in isolation and mediocre in aggregate.",
          "Once lunchtime demand in Jakarta outgrew supply in the same few square kilometres, greedy matching started stranding bookings that a slightly worse first choice would have rescued.",
        ],
      },
      {
        heading: "Batching changed the question",
        paragraphs: [
          "Instead of matching each booking as it arrived, we began collecting bookings into short windows and solving them together. The window is measured in hundreds of milliseconds, short enough that nobody notices, long enough that the solver has a real choice to make.",
        ],
        bullets: [
          "Each window is solved independently, so a slow window never blocks the next one",
          "Assignments are scored on pickup time, trip profitability, and fairness across the fleet",
          "Any booking not matched in a window rolls forward with an increasing priority weight",
        ],
      },
      {
        heading: "What we got wrong first",
        paragraphs: [
          "Our first solver optimised purely for total pickup time. It was measurably better on the dashboard and noticeably worse for drivers, because a handful of partners absorbed every awkward job.",
          "Adding a fairness term to the objective cost us about four hundred milliseconds of aggregate pickup time and bought back a double-digit improvement in partner retention. That trade was not close.",
        ],
        quote:
          "A matching system is not just an optimiser. It is a policy, and every weight in the objective function is a decision about who gets a good day.",
      },
      {
        heading: "Operating it",
        paragraphs: [
          "The solver runs per city, per S2 cell band, with a circuit breaker that degrades to the old greedy path if a window exceeds its latency budget. Degradation is loud: it pages, it annotates dashboards, and it shows up in the weekly review.",
        ],
      },
    ],
  },
  {
    slug: "prep-time-prediction",
    title: "Why your food is ready when the rider arrives",
    category: "Data",
    excerpt:
      "Predicting kitchen prep time is the difference between a rider waiting fifteen minutes and a customer eating warm food. It is also much harder than it sounds.",
    author: "Bima Saputra",
    authorRole: "Staff Data Scientist, Food",
    publishedOn: "2026-07-29",
    readingMinutes: 9,
    tags: ["machine learning", "food", "forecasting"],
    sections: [
      {
        paragraphs: [
          "Every food order contains a hidden scheduling problem: dispatch a rider too early and they idle outside a kitchen; too late and the food sits under a heat lamp. The lever in the middle is a prediction of when the order will actually be ready.",
        ],
      },
      {
        heading: "One global constant is a bad model",
        paragraphs: [
          "The original system assumed fifteen minutes for everyone. That is roughly correct for a mid-sized restaurant at 3pm and wildly wrong for a satay stall at 7pm.",
          "Moving to per-merchant, per-hour estimates cut rider idle time by a third before we touched anything clever.",
        ],
        bullets: [
          "Merchant identity and hour of week carry most of the signal",
          "Basket composition matters more than basket size",
          "Concurrent orders at the same merchant are the strongest short-term feature",
        ],
      },
      {
        heading: "Feedback loops need fences",
        paragraphs: [
          "Predictions influence dispatch, dispatch influences observed prep time, and observed prep time trains the next model. Without care, the model learns its own shadow.",
          "We hold out a small randomised slice of orders from the dispatch optimisation so that the training set always contains unbiased observations. It costs a little efficiency and it keeps the model honest.",
        ],
      },
    ],
  },
  {
    slug: "designing-for-the-cheapest-phone",
    title: "Designing for the cheapest phone in the shop",
    category: "Design",
    excerpt:
      "Our merchant app runs on devices with 1GB of RAM on a 2G connection in a basement. That constraint improved the design for everyone.",
    author: "Citra Halim",
    authorRole: "Design Lead, Merchant",
    publishedOn: "2026-07-11",
    readingMinutes: 7,
    tags: ["design", "merchant", "performance"],
    sections: [
      {
        paragraphs: [
          "When we studied merchants in Surabaya and Bandung, the device in the shop was rarely the device we tested on. It was older, fuller, and frequently shared between three people on a shift.",
        ],
      },
      {
        heading: "Constraints we adopted",
        paragraphs: ["We wrote the constraints down and treated them as acceptance criteria."],
        bullets: [
          "The order queue must be usable with no network for at least an hour",
          "Any action a merchant takes during a rush must be reachable in one tap",
          "Nothing important may be communicated by colour alone: kitchens are bright and screens are scratched",
          "Cold start on the reference device must stay under three seconds",
        ],
      },
      {
        heading: "The side effects",
        paragraphs: [
          "Every one of these made the app better on flagship hardware too. The one-tap rule in particular forced us to delete three layers of navigation that existed because we could, not because anyone needed them.",
        ],
      },
    ],
  },
  {
    slug: "ledger-that-never-lies",
    title: "Building a ledger that never lies",
    category: "Engineering",
    excerpt:
      "Wallet balances are the one number we are never allowed to get wrong. A tour of the double-entry ledger underneath every transaction on the platform.",
    author: "Andre Lim",
    authorRole: "Engineering Manager, Payments",
    publishedOn: "2026-06-24",
    readingMinutes: 12,
    tags: ["payments", "ledger", "reliability"],
    sections: [
      {
        paragraphs: [
          "A ride can be retried. A food order can be refunded. A ledger entry cannot be quietly adjusted, because somebody's money is on the other side of it.",
        ],
      },
      {
        heading: "Rules we do not bend",
        paragraphs: ["Three properties are non-negotiable and everything else is implementation."],
        bullets: [
          "Every posting is double-entry and balances to zero within its transaction",
          "Every write is idempotent on a client-supplied key, so retries are free",
          "Nothing is ever updated in place; corrections are new, linked postings",
        ],
      },
      {
        heading: "Reconciliation is a feature",
        paragraphs: [
          "We reconcile against partner banks and payment rails daily, and the job is treated as a product surface rather than a cron nobody watches. Breaks are triaged with the same urgency as a production incident, because that is what they are.",
        ],
        quote:
          "If reconciliation is the first place you learn about a bug, your ledger is working exactly as intended.",
      },
    ],
  },
  {
    slug: "qris-at-the-warung",
    title: "Taking QR payments to two million warungs",
    category: "Product",
    excerpt:
      "Acceptance is not a technology problem. It is a trust, onboarding, and hardware problem that happens to involve a QR code.",
    author: "Nadia Pranoto",
    authorRole: "Group Product Manager, Payments",
    publishedOn: "2026-06-02",
    readingMinutes: 8,
    tags: ["payments", "merchant", "qris"],
    sections: [
      {
        paragraphs: [
          "The technical part of QR acceptance took a quarter. Getting a stall owner who has been paid in cash for twenty years to trust a sticker took considerably longer.",
        ],
      },
      {
        heading: "What actually moved acceptance",
        paragraphs: ["Three changes did more than any feature we shipped in the app itself."],
        bullets: [
          "Same-day settlement for the first month of a merchant's life on the platform",
          "An audible confirmation device, so the owner does not have to watch a screen",
          "Onboarding completed by a field agent in person, in under fifteen minutes",
        ],
      },
      {
        heading: "The metric we watch",
        paragraphs: [
          "Not activations. Second-week retention of transacting merchants, which punishes the sign-up push and rewards the parts of the product that make a merchant want to keep the sticker on the counter.",
        ],
      },
    ],
  },
  {
    slug: "chaos-engineering-during-ramadan",
    title: "Practising for Ramadan traffic in February",
    category: "Engineering",
    excerpt:
      "Our highest-traffic hour of the year is predictable to the minute. Here is the drill programme we run for months beforehand.",
    author: "Fajar Nugroho",
    authorRole: "Staff SRE",
    publishedOn: "2026-05-15",
    readingMinutes: 10,
    tags: ["sre", "load testing", "reliability"],
    sections: [
      {
        paragraphs: [
          "Iftar creates a demand spike that is both enormous and precisely scheduled. Every evening for a month, a large share of the country orders food within the same twenty minutes.",
        ],
      },
      {
        heading: "The programme",
        paragraphs: [
          "We start twelve weeks out with a written traffic model, then run escalating game days against production-shaped environments.",
        ],
        bullets: [
          "Week 12: capacity model reviewed and signed off per service",
          "Week 8: dependency failure drills, one critical dependency at a time",
          "Week 4: full-shape load test at 1.4x projected peak",
          "Week 1: freeze, on-call rehearsal, and runbook review",
        ],
      },
      {
        heading: "What drills keep finding",
        paragraphs: [
          "It is almost never the service under test. It is a retry policy without a budget, a cache that stampedes on expiry, or a dashboard that was silently broken since the last migration.",
        ],
      },
    ],
  },
  {
    slug: "from-monolith-to-services",
    title: "Ten years of moving off the monolith, honestly assessed",
    category: "Engineering",
    excerpt:
      "A retrospective on a decade of decomposition: what paid off, what we would not repeat, and the services we quietly merged back together.",
    author: "Ratna Dewi",
    authorRole: "Principal Engineer, Marketplace",
    publishedOn: "2026-04-28",
    readingMinutes: 13,
    tags: ["architecture", "migration", "platform"],
    sections: [
      {
        paragraphs: [
          "The platform started as one Rails application. It is now north of a thousand services. Neither number is a goal; both were consequences of what the business needed at the time.",
        ],
      },
      {
        heading: "Worth it",
        paragraphs: [
          "The decompositions that paid off shared a property: a real ownership boundary already existed.",
        ],
        bullets: [
          "Payments, because its compliance and reliability requirements are genuinely different",
          "Allocation, because its scaling curve has nothing to do with the rest of the platform",
          "Merchant catalogue, because its write patterns were starving everything else",
        ],
      },
      {
        heading: "Not worth it",
        paragraphs: [
          "We also split services along code-shaped lines rather than team-shaped ones, and paid for it in cross-service transactions and pager fatigue. Six of those have since been merged back. Nobody misses them.",
        ],
        quote:
          "Service boundaries that do not match ownership boundaries are just distributed function calls with worse error handling.",
      },
    ],
  },
  {
    slug: "hiring-for-the-second-year",
    title: "We hire for the second year, not the first week",
    category: "Culture",
    excerpt:
      "How our interview process changed once we started measuring what actually predicts a great second year at Gojek.",
    author: "Meera Ravi",
    authorRole: "Head of Talent, Tech",
    publishedOn: "2026-04-09",
    readingMinutes: 6,
    tags: ["hiring", "culture", "interviews"],
    sections: [
      {
        paragraphs: [
          "Interview loops are easy to optimise for the wrong thing. Ours used to reward people who could produce a clever answer under time pressure, which turns out to correlate weakly with doing good work here over a year.",
        ],
      },
      {
        heading: "What we changed",
        paragraphs: ["Three changes, all of which made the loop shorter."],
        bullets: [
          "Replaced the algorithm puzzle with a debugging session in a real repository",
          "Made the system design round about a problem the candidate's future team actually owns",
          "Published the rubric to candidates before the loop, not after",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "Offer acceptance went up, loop length came down, and — the part we care about — manager-rated performance at twelve months separated more cleanly between strong and borderline hires.",
        ],
      },
    ],
  },
  {
    slug: "open-sourcing-our-scheduler",
    title: "Open-sourcing the scheduler behind our data pipelines",
    category: "News",
    excerpt:
      "The workflow engine that runs our batch and streaming jobs is now public, along with the operational lessons that shaped it.",
    author: "Kevin Tanoto",
    authorRole: "Engineering Manager, Data Platform",
    publishedOn: "2026-03-20",
    readingMinutes: 5,
    tags: ["open source", "data", "platform"],
    sections: [
      {
        paragraphs: [
          "We have relied on open source since the first week of the company, and we try to return the favour when a tool has been battle-tested long enough to be useful to somebody else.",
        ],
      },
      {
        heading: "What is in the box",
        paragraphs: [
          "The release covers the scheduler core, the operator SDK, and our deployment charts.",
        ],
        bullets: [
          "Backfills that are safe to run concurrently with live schedules",
          "Lineage captured automatically from operator declarations",
          "A failure model that distinguishes retryable from poisoned tasks",
        ],
      },
    ],
  },
  {
    slug: "mobile-release-train",
    title: "Shipping a super-app every week without a release manager",
    category: "Engineering",
    excerpt:
      "Forty teams, one binary, one weekly train. The automation and the social contract that keep it on the rails.",
    author: "Ayu Kusuma",
    authorRole: "Staff Engineer, Mobile Platform",
    publishedOn: "2026-02-26",
    readingMinutes: 9,
    tags: ["mobile", "release", "platform"],
    sections: [
      {
        paragraphs: [
          "A super-app is a shared binary with dozens of owners. The coordination problem is bigger than the engineering one.",
        ],
      },
      {
        heading: "The train rules",
        paragraphs: ["The rules are short enough that everyone actually knows them."],
        bullets: [
          "The train leaves on schedule whether or not your feature is ready",
          "Anything not behind a flag is not on the train",
          "A failing module test blocks the module, never the train",
          "Rollback is a flag flip, not a new build",
        ],
      },
      {
        heading: "Automation that makes the rules survivable",
        paragraphs: [
          "Module owners get an automated readiness report two days before cut, listing unflagged code paths, size regressions, and crash-rate deltas from the previous train's staged rollout.",
        ],
      },
    ],
  },
  {
    slug: "accessibility-in-bahasa",
    title: "Accessibility work that starts with language, not contrast ratios",
    category: "Design",
    excerpt:
      "Screen reader support in Bahasa Indonesia required more than translated strings. A field report from our accessibility programme.",
    author: "Citra Halim",
    authorRole: "Design Lead, Merchant",
    publishedOn: "2026-02-05",
    readingMinutes: 7,
    tags: ["accessibility", "design", "localisation"],
    sections: [
      {
        paragraphs: [
          "Our first accessibility audit graded us reasonably well on contrast and touch targets, and badly on anything a screen reader user would actually encounter.",
        ],
      },
      {
        heading: "Where the gaps were",
        paragraphs: ["Most failures were structural, not visual."],
        bullets: [
          "Labels translated as nouns where the interaction required a verb",
          "Live regions announcing driver updates so often they drowned out the rest of the screen",
          "Currency read digit by digit instead of as an amount",
        ],
      },
      {
        heading: "How we test now",
        paragraphs: [
          "Every release candidate is walked through its critical flows with a screen reader in both Bahasa Indonesia and English, by people who use one daily. Automated checks catch the contrast problems; humans catch the rest.",
        ],
      },
    ],
  },
  {
    slug: "platform-team-charter",
    title: "What our platform teams owe their internal users",
    category: "Culture",
    excerpt:
      "Internal platforms drift toward serving their own roadmaps. We wrote a charter to stop that happening twice.",
    author: "Kevin Tanoto",
    authorRole: "Engineering Manager, Data Platform",
    publishedOn: "2026-01-16",
    readingMinutes: 6,
    tags: ["platform", "culture", "ways of working"],
    sections: [
      {
        paragraphs: [
          "Every platform team eventually faces the same temptation: ship the abstraction you find interesting rather than the one your users are blocked on.",
        ],
      },
      {
        heading: "The charter",
        paragraphs: ["Four commitments, reviewed quarterly with the teams we serve."],
        bullets: [
          "A migration we ask for comes with tooling, not just a deadline",
          "Deprecations get twice the notice of the effort they require",
          "Support response times are published and measured like any other SLO",
          "Half of each quarter's roadmap comes from user requests we did not originate",
        ],
      },
    ],
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
