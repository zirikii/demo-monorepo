import type { NewsPost } from "./types";

export const NEWS: NewsPost[] = [
  {
    slug: "andrew-formica-ned",
    title: "HUB24 appoints Andrew Formica as Non-Executive Director",
    date: "2026-06-12",
    category: "ASX",
    excerpt:
      "The Board has appointed Andrew Formica as an independent Non-Executive Director, deepening listed-markets and asset-management experience around the table.",
    body: [
      "HUB24 Limited (ASX:HUB) today announced the appointment of Andrew Formica as an independent Non-Executive Director.",
      "Mr Formica brings decades of experience across global asset management and listed financial services. The Board said the appointment supports HUB24’s next phase of platform and data growth.",
      "This demo article is illustrative only and is not an ASX announcement.",
    ],
  },
  {
    slug: "meet-noel-yu",
    title: "Meet Noel Yu | HUB24’s Investment Operations Team Leader",
    date: "2026-05-28",
    category: "People",
    excerpt:
      "A story of persistence and passion from the Investment Operations team that keeps corporate actions and settlements moving for advisers.",
    body: [
      "Noel Yu leads a Sydney-based operations pod that handles ASX settlements, international custody instructions and managed-portfolio corporate actions.",
      "“The work is invisible when it goes well,” Noel says. “Advisers should never have to chase a failed trade because our file was late.”",
      "Dummy profile for the demo — not a real interview.",
    ],
  },
  {
    slug: "discover-menu-expands",
    title: "HUB24 Discover adds three new portfolio managers",
    date: "2026-04-09",
    category: "Platform",
    excerpt:
      "The cost-effective Discover menu now includes additional diversified and income models from Australian managers already on Choice.",
    body: [
      "HUB24 Discover was built for clients with less complex needs who still want professionally managed portfolios on Australia’s Best Platform.",
      "Three additional managers join the menu this quarter. Clients can later move to Core or Choice without a CGT event on the transition.",
    ],
  },
  {
    slug: "fy25-fua-update",
    title: "Platform FUA continues to compound into FY26",
    date: "2026-02-18",
    category: "Investors",
    excerpt:
      "Illustrative half-year update: net inflows, market movement and the contribution of Class and myprosperity to group earnings.",
    body: [
      "This dummy update restates the public narrative that HUB24 remains one of the fastest-growing platforms in the Australian market.",
      "Figures on this page are fictional and for UI demonstration only.",
    ],
  },
  {
    slug: "myprosperity-household-view",
    title: "myprosperity household view now surfaces HUB24 accounts",
    date: "2025-11-03",
    category: "Product",
    excerpt:
      "Accountants and advisers using myprosperity can bring HUB24 Super and Invest balances into the same household portal.",
    body: [
      "Since the 2023 acquisition, myprosperity has continued as its own brand inside the HUB24 Group.",
      "The latest release maps HUB24 account identifiers into the household wealth view used by more than 440 firms in the dummy dataset.",
    ],
  },
];

export function newsBySlug(slug: string): NewsPost | undefined {
  return NEWS.find((post) => post.slug === slug);
}
