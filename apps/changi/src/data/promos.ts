export interface Promo {
  title: string;
  blurb: string;
  eyebrow: string;
  to: string;
  tint: string;
}

/** "What's Happening" homepage promo cards. */
export const promos: Promo[] = [
  {
    eyebrow: "Outlet Deals",
    title: "Shop and save across the terminals",
    blurb: "Check out the latest fashion, beauty and tech deals from stores across all four terminals.",
    to: "/happenings?tab=promotions",
    tint: "from-amber-400 via-orange-500 to-flame",
  },
  {
    eyebrow: "Changi Rewards",
    title: "Fly further when you spend with Changi Rewards",
    blurb: "Land yourself at your dream destination — earn points on every dollar and redeem for flights and treats.",
    to: "/rewards",
    tint: "from-magenta via-purple-600 to-plum",
  },
  {
    eyebrow: "At Jewel",
    title: "Ready, sweat, go! Play activities for the family",
    blurb: "Adorable premiums, playful photo spots and hands-on activities the whole family will love.",
    to: "/experience/canopy-park",
    tint: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    eyebrow: "Jewel Blooms",
    title: "Bloom into a floral wonderland",
    blurb: "The largest botanical activation yet takes over Jewel — wander the trails and snap the blooms.",
    to: "/experience/shiseido-forest-valley",
    tint: "from-pink-400 via-rose-500 to-magenta",
  },
];
