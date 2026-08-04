export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category: "Newsroom" | "Economic insights" | "Security" | "Property" | "Business";
  published: string;
  readMinutes: number;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "commbank-yello-expands-benefits",
    title: "CommBank grows customer recognition program, making it simpler to unlock value",
    standfirst:
      "More benefits, boosted discounts and a personalised hub of offers land for eligible CommBank Yello customers.",
    category: "Newsroom",
    published: "2026-07-22",
    readMinutes: 4,
    body: [
      "Commonwealth Bank today announced it is evolving its customer recognition program, CommBank Yello, introducing more benefits and offers and boosting existing discounts for eligible customers.",
      "Using the CommBank app, eligible customers can access a personalised hub of tailored offers linked to how they transact, with the option of tracking their eligibility and progress toward more benefits.",
      "Benefits now include up to $460 in cashback each year on CommBank products, up to $680 in discounts on mobile, nbn and electricity in a year, and hundreds of dollars each year in cashbacks and discounts on discretionary spending.",
      "The bank is also reducing the number of transactions required to qualify for its top tiers, and expanding eligibility to deposit holders as well as home loan customers.",
    ],
  },
  {
    slug: "household-spending-insights-july",
    title: "Household Spending Insights: essentials hold firm while discretionary spend softens",
    standfirst:
      "The latest read on Australian household spending shows a divergence between essential and discretionary categories.",
    category: "Economic insights",
    published: "2026-07-09",
    readMinutes: 6,
    body: [
      "Spending on essentials such as utilities, insurance and food continued to grow through the June quarter, while discretionary categories including hospitality and recreation eased.",
      "Younger cohorts recorded the sharpest pullback in discretionary spending, consistent with the pattern seen through previous rate-tightening cycles.",
      "Regional spending diverged, with Western Australia and Queensland outpacing the eastern seaboard on a per-capita basis.",
      "The index draws on de-identified, aggregated payments data across millions of transactions and is published monthly.",
    ],
  },
  {
    slug: "namecheck-prevents-scam-payments",
    title: "NameCheck has now prevented hundreds of millions in mistaken and scam payments",
    standfirst:
      "The account-name matching technology continues to catch payments headed to the wrong place.",
    category: "Security",
    published: "2026-06-28",
    readMinutes: 3,
    body: [
      "NameCheck compares the account name a customer enters against the details we hold, and warns them before the payment is sent if the details don't look right.",
      "Since launch the technology has flagged millions of payments, giving customers a moment to stop and check before money leaves their account.",
      "The bank has invested more than $900 million in scam, fraud and cyber protection through the CommBank Safe program.",
      "Customers are reminded that CommBank will never ask for a password or NetCode, and can verify an inbound call using CallerCheck in the app.",
    ],
  },
  {
    slug: "first-home-buyer-deposit-trends",
    title: "First home buyers are getting in sooner with low deposit options",
    standfirst:
      "Analysis of loan settlements shows deposit sizes falling as guarantees and schemes take up the slack.",
    category: "Property",
    published: "2026-06-11",
    readMinutes: 5,
    body: [
      "The average deposit for a first home buyer has fallen year on year as government guarantee schemes and family guarantor arrangements become more common.",
      "Conditional approval times have also shortened, with eligible customers applying online receiving a decision in as little as 10 minutes.",
      "Home lending specialists report a rise in buyers purchasing in outer-ring suburbs and regional centres where median prices remain within reach.",
      "CommBank was awarded Canstar's Bank of the Year for First Home Buyers in 2025.",
    ],
  },
  {
    slug: "smart-terminal-dual-sim",
    title: "Smart terminal dual SIM keeps businesses trading through network outages",
    standfirst: "Merchants can switch between Telstra and Optus instantly if one network drops.",
    category: "Business",
    published: "2026-05-30",
    readMinutes: 3,
    body: [
      "Every CommBank Smart terminal ships with both a Telstra and an Optus SIM, so a merchant can switch networks instantly if there's an outage on one of them.",
      "The terminal also keeps taking payments in standalone mode if the point-of-sale system it's integrated with goes down.",
      "Eligible merchants with a linked Business Transaction Account receive same-day settlement on EFTPOS transactions made before 9:30pm Sydney time.",
      "More than 110 point-of-sale systems now integrate with the Smart terminal range.",
    ],
  },
  {
    slug: "digital-banking-award-2026",
    title: "CommBank named Bank of the Year for Digital Banking",
    standfirst:
      "Recognition for the CommBank app and NetBank across features, usability and security.",
    category: "Newsroom",
    published: "2026-05-14",
    readMinutes: 2,
    body: [
      "CommBank has again been recognised for its digital banking experience across the CommBank app and NetBank.",
      "The assessment considered account management, payments, card controls, money management tools and security features.",
      "Recent additions include the Yello hub, Benefits finder, and expanded Lock, Block, Limit controls across debit and credit cards.",
      "The app is used by millions of Australians each month and remains the bank's most-used channel.",
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
