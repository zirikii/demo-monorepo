export interface RewardTier {
  name: string;
  requirement: string;
  perks: string[];
  featured?: boolean;
  tint: string;
}

export interface RewardBenefit {
  title: string;
  blurb: string;
}

export interface CatalogueItem {
  name: string;
  points: string;
  category: string;
  tint: string;
}

export const rewardTiers: RewardTier[] = [
  {
    name: "Changi Rewards",
    requirement: "Free to join",
    perks: ["Earn points on every dollar", "Member-only outlet deals", "Birthday treats", "Faster iShopChangi checkout"],
    tint: "from-magenta to-purple-700",
  },
  {
    name: "Changi Monarch",
    requirement: "By invitation",
    perks: ["Everything in Changi Rewards", "Priority lounge access", "Exclusive event invitations", "Dedicated concierge line", "Accelerated points earn"],
    featured: true,
    tint: "from-plum to-magenta",
  },
];

export const rewardBenefits: RewardBenefit[] = [
  { title: "Earn as you go", blurb: "Collect points on dining, shopping and iShopChangi purchases across the airport." },
  { title: "Redeem for treats", blurb: "Turn points into vouchers, gifts and travel-ready essentials from the catalogue." },
  { title: "Members save more", blurb: "Unlock stacked promotions and travel-exclusive bundles reserved for members." },
  { title: "Celebrate with us", blurb: "Enjoy birthday perks, seasonal surprises and invitations to member events." },
];

export const catalogue: CatalogueItem[] = [
  { name: "Dining voucher bundle", points: "2,500 pts", category: "Dine", tint: "from-amber-400 to-orange-600" },
  { name: "Travel comfort kit", points: "1,800 pts", category: "Travel", tint: "from-sky-400 to-indigo-600" },
  { name: "Beauty discovery set", points: "3,200 pts", category: "Beauty", tint: "from-rose-400 to-fuchsia-600" },
  { name: "Jewel attractions pass", points: "4,000 pts", category: "Experience", tint: "from-emerald-400 to-teal-600" },
  { name: "Local treats hamper", points: "2,000 pts", category: "Gifts", tint: "from-lime-400 to-emerald-600" },
  { name: "Lounge day pass", points: "5,500 pts", category: "Travel", tint: "from-purple-500 to-plum" },
];
