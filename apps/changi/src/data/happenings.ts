export type HappeningType = "events" | "promotions";

export interface Happening {
  slug: string;
  type: HappeningType;
  title: string;
  period: string;
  location: string;
  summary: string;
  description: string;
  tint: string;
}

/** Events & promotions shown on the Happenings page. */
export const happenings: Happening[] = [
  {
    slug: "jewel-blooms-lego-botanicals",
    type: "events",
    title: "Jewel Blooms with LEGO® Botanicals",
    period: "Now – 31 Aug",
    location: "Jewel, Level 1",
    summary: "The largest LEGO Botanicals activation blossoms across Jewel.",
    description:
      "Wander through a brick-built floral wonderland, try hands-on building stations, and pick up limited-edition botanical sets. A photo trail winds all the way to the Rain Vortex.",
    tint: "from-emerald-400 to-teal-600",
  },
  {
    slug: "peanuts-ready-sweat-go",
    type: "events",
    title: "Ready, Sweat, Go! with Snoopy & Siblings",
    period: "Now – 30 Sep",
    location: "Jewel & Terminal 3",
    summary: "Get active with the Peanuts gang across play zones and photo spots.",
    description:
      "Adorable Peanuts premiums, play activities and photo moments pop up across the airport. Collect stamps as you go and redeem exclusive collectibles.",
    tint: "from-amber-400 to-orange-600",
  },
  {
    slug: "changi-festive-village",
    type: "events",
    title: "Changi Festive Village",
    period: "Dec – Jan",
    location: "Jewel, Level 1",
    summary: "Seasonal markets, carollers and a towering centrepiece display.",
    description:
      "Our year-end celebration returns with artisan market stalls, nightly performances and a spectacular festive installation beneath the Rain Vortex.",
    tint: "from-flame to-magenta",
  },
  {
    slug: "outlet-deals-shop-and-save",
    type: "promotions",
    title: "Outlet Deals — shop and save",
    period: "Ongoing",
    location: "All terminals",
    summary: "Rotating deals from fashion, beauty and tech stores airside and landside.",
    description:
      "Members save more with stacked Changi Rewards offers. Browse the latest markdowns and travel-exclusive bundles before you fly.",
    tint: "from-amber-400 to-flame",
  },
  {
    slug: "changi-rewards-x-singapore-airlines",
    type: "promotions",
    title: "Changi Rewards × Singapore Airlines",
    period: "Now – 31 Dec",
    location: "Online & in-airport",
    summary: "Spend with Changi Rewards and fly closer to your dream destination.",
    description:
      "Earn bonus points on qualifying spend and convert them towards your next getaway. New members receive a welcome bundle on sign-up.",
    tint: "from-magenta to-plum",
  },
  {
    slug: "ishopchangi-travel-exclusives",
    type: "promotions",
    title: "iShopChangi Travel Exclusives",
    period: "Ongoing",
    location: "iShopChangi online",
    summary: "Shop duty-free online and collect on your travel date.",
    description:
      "Reserve beauty, liquor and confectionery up to 30 days ahead at duty-free prices, then collect airside on your way through.",
    tint: "from-purple-500 to-plum",
  },
];
