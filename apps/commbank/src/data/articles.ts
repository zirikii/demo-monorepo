import { parseDateOnly } from "@/lib/format";
import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "savings-rate-announcement",
    title: "Savings rate increases across select accounts",
    standfirst:
      "The NetBank Saver introductory rate for new customers increases to 5.20% p.a., with standard variable rates lifting across savings products.",
    category: "Newsroom",
    published: "2026-07-28",
    author: "CommBank Newsroom",
    readMinutes: 3,
    body: [
      "We are making a variety of increases across select savings products, including the NetBank Saver, GoalSaver and Youthsaver accounts.",
      "The NetBank Saver introductory rate for new customers increases by 0.25% p.a. to 5.20% p.a., comprising a standard variable rate of 2.10% p.a. and a fixed bonus margin of 3.10% p.a. for the first five months.",
      "The NetBank Saver standard variable rate for existing customers increases by 0.15% p.a. to 2.10% p.a.",
      "You can log on to the CommBank app or NetBank to see the current interest rate for your savings account or Term Deposit at any time.",
    ],
  },
  {
    slug: "digi-home-loan-qantas-points",
    title: "Earn up to 300,000 Qantas Points with a Digi Home Loan",
    standfirst:
      "Eligible customers who apply online for a CommBank Digi Home Loan can earn Qantas Points based on their loan amount.",
    category: "Newsroom",
    published: "2026-07-14",
    author: "CommBank Newsroom",
    readMinutes: 4,
    body: [
      "Customers applying online for a new CommBank Digi Home Loan can earn 100,000 Qantas Points for loans between $300,000 and $499,999, 200,000 points for loans between $500,000 and $999,999, and 300,000 points for loans of $1,000,000 or more.",
      "Applications must be submitted online directly through our website, NetBank or the CommBank app, and the loan must settle by 31 December 2026.",
      "The Digi Home Loan is a digital home loan with a low variable rate, unlimited additional repayments and the option to link one Everyday Offset account.",
      "Qantas Points are credited to the nominated member's Qantas Frequent Flyer account within 30 days of settlement.",
    ],
  },
  {
    slug: "commbank-yello-expands",
    title: "CommBank Yello grows, making it simpler to unlock value",
    standfirst:
      "More benefits and offers across mobile, NBN, energy and home ownership are coming to our customer recognition program.",
    category: "Newsroom",
    published: "2026-06-19",
    author: "CommBank Newsroom",
    readMinutes: 5,
    body: [
      "CommBank Yello is our customer recognition program, offering cashbacks, discounts and exclusive experiences to eligible customers.",
      "Eligible customers can access up to $460 in cashback each year on CommBank products, and up to $680 in discounts on mobile, NBN and electricity in a single year.",
      "New benefits include bigger discounts on More Mobile and NBN plans, an energy benefit with Amber Electric, and recurring monthly cashback for homeowners on eligible home insurance and home loan service fees.",
      "Customers can check their tier and access personalised offers through the CommBank Yello hub in the latest version of the CommBank app.",
    ],
  },
  {
    slug: "scam-alert-impersonation-calls",
    title: "Scam alert: bank impersonation calls",
    standfirst:
      "Criminals are calling customers claiming to be from the bank's fraud team. Use CallerCheck to confirm it is really us.",
    category: "Security",
    published: "2026-07-31",
    author: "CommBank Safe",
    readMinutes: 3,
    body: [
      "We are seeing an increase in scam calls where criminals claim to be from our fraud team and ask customers to move money to a 'safe account'. We will never ask you to do this.",
      "If you receive a call claiming to be from us, ask the caller to send a CallerCheck security code. It appears as a notification in your CommBank app so you know it is really us.",
      "If in doubt, hang up and contact us directly using the details on our website or in the CommBank app — never a number from a message.",
      "If you have shared personal or banking details, change your passwords immediately and message us in the app or call 13 2221.",
    ],
  },
  {
    slug: "economic-insights-household-spending",
    title: "Household spending steadies as rate expectations shift",
    standfirst:
      "Our Household Spending Insights index was broadly flat in July, with softness in discretionary categories offset by essentials.",
    category: "Economic insights",
    published: "2026-08-01",
    author: "CommBank Economics",
    readMinutes: 6,
    body: [
      "The Household Spending Insights index was broadly flat over July, following two consecutive monthly rises.",
      "Spending on essentials such as utilities, insurance and food held up, while discretionary categories including hospitality and household goods eased.",
      "Younger cohorts continue to show the largest relative pullback in discretionary spending, consistent with rental and mortgage pressures.",
      "We continue to expect household consumption to grow modestly through the second half of the year as real incomes recover.",
    ],
  },
  {
    slug: "first-home-buyer-report",
    title: "First home buyers return to the market",
    standfirst:
      "New lending data shows first home buyer applications rose in the June quarter, led by outer-metropolitan suburbs.",
    category: "Economic insights",
    published: "2026-07-09",
    author: "CommBank Economics",
    readMinutes: 4,
    body: [
      "First home buyer applications increased across all mainland states in the June quarter, with the strongest growth in outer-metropolitan corridors.",
      "Low deposit options and government guarantee schemes continue to be a significant driver, particularly for single applicants.",
      "Median loan sizes for first home buyers were broadly stable, suggesting buyers are adjusting location rather than budget.",
      "We were awarded Canstar's Bank of the Year for First Home Buyers in July 2025.",
    ],
  },
  {
    slug: "branch-accessibility-upgrade",
    title: "Accessibility upgrades roll out across the branch network",
    standfirst:
      "Audio-enabled ATMs, hearing loops and interpreter services are being expanded to more locations this year.",
    category: "Community",
    published: "2026-06-02",
    author: "CommBank Newsroom",
    readMinutes: 3,
    body: [
      "All of our ATMs have touchscreen technology and are audio-enabled, and we are expanding hearing loops and interpreter services across the branch network.",
      "Customers who are deaf or hard of hearing can message us in the CommBank app or contact us via the National Relay Service.",
      "Accessibility information for each branch is available through Locate us.",
    ],
  },
  {
    slug: "commbank-app-awards",
    title: "CommBank app recognised for digital banking",
    standfirst:
      "Canstar named us Bank of the Year for Digital Banking in 2025, recognising the app's everyday tools and security features.",
    category: "Newsroom",
    published: "2026-05-21",
    author: "CommBank Newsroom",
    readMinutes: 2,
    body: [
      "We were awarded Canstar's Bank of the Year for Digital Banking for 2025.",
      "The award recognises the everyday tools in the CommBank app, including spend tracking, Lock, Block, Limit, Bill Sense and CallerCheck.",
      "More than nine million customers now use the CommBank app each month.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const latestArticles = articles
  .slice()
  .sort((a, b) => parseDateOnly(b.published).getTime() - parseDateOnly(a.published).getTime());
