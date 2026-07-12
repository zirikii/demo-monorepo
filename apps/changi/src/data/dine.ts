export type OutletCategory = "dine" | "shop";

export interface Outlet {
  slug: string;
  name: string;
  category: OutletCategory;
  kind: string;
  terminal: "T1" | "T2" | "T3" | "T4" | "Jewel";
  location: string;
  hours: string;
  blurb: string;
  tags: string[];
  tint: string;
}

/** Dine & Shop directory — mix of dining and retail outlets across Changi & Jewel. */
export const outlets: Outlet[] = [
  // Dine
  { slug: "tiger-street-lab", name: "Tiger Street Lab", category: "dine", kind: "Local & bar bites", terminal: "Jewel", location: "#B2-201, Jewel", hours: "11:00 – 22:00", blurb: "Modern hawker-style plates and cold local brews under one buzzing roof.", tags: ["Local", "Bar", "Halal-friendly"], tint: "from-amber-400 to-orange-600" },
  { slug: "a-and-w", name: "A&W", category: "dine", kind: "Fast food", terminal: "Jewel", location: "#B2-278, Jewel", hours: "24 hours", blurb: "Root beer floats and Coney dogs — the nostalgic favourite that never left.", tags: ["Fast food", "24 hours"], tint: "from-orange-400 to-red-600" },
  { slug: "shake-shack", name: "Shake Shack", category: "dine", kind: "Burgers", terminal: "Jewel", location: "#02-256, Jewel", hours: "10:00 – 22:00", blurb: "Singapore's airport ShackBurgers, crinkle-cut fries and frozen custard concretes.", tags: ["Burgers", "Halal-friendly"], tint: "from-lime-400 to-emerald-600" },
  { slug: "kantin", name: "KANTIN", category: "dine", kind: "Bornean & local", terminal: "Jewel", location: "#05-206, Jewel", hours: "11:30 – 21:30", blurb: "Garden dining on Level 5 with Bornean-inspired sets beneath the Rain Vortex.", tags: ["Local", "Garden dining"], tint: "from-emerald-400 to-teal-600" },
  { slug: "birds-of-paradise", name: "Birds of Paradise", category: "dine", kind: "Gelato", terminal: "Jewel", location: "#B1-215, Jewel", hours: "11:00 – 22:00", blurb: "Botanical gelato — think lychee raspberry and white chrysanthemum — in a thyme cone.", tags: ["Dessert", "Vegetarian options"], tint: "from-pink-400 to-rose-600" },
  { slug: "crystal-jade", name: "Crystal Jade", category: "dine", kind: "Cantonese", terminal: "T3", location: "#B2-01, Terminal 3", hours: "10:30 – 22:00", blurb: "Handmade dim sum, roast meats and comforting congee for every layover.", tags: ["Chinese", "Dim sum"], tint: "from-red-400 to-rose-600" },
  { slug: "hei-sushi", name: "Hei Sushi", category: "dine", kind: "Japanese", terminal: "T2", location: "#026-041, Terminal 2", hours: "10:00 – 22:00", blurb: "Conveyor-belt sushi with familiar favourites and playful seasonal specials.", tags: ["Japanese", "Halal-friendly"], tint: "from-sky-400 to-indigo-600" },
  { slug: "the-coffee-bean", name: "The Coffee Bean & Tea Leaf", category: "dine", kind: "Café", terminal: "T1", location: "#02-034, Terminal 1", hours: "24 hours", blurb: "Ice-blended classics and a quiet corner to reset before your gate call.", tags: ["Café", "24 hours"], tint: "from-amber-400 to-yellow-600" },
  { slug: "paradise-dynasty", name: "Paradise Dynasty", category: "dine", kind: "Chinese", terminal: "Jewel", location: "#04-207, Jewel", hours: "11:00 – 22:00", blurb: "The original rainbow xiao long bao alongside northern and southern Chinese classics.", tags: ["Chinese", "Dim sum"], tint: "from-fuchsia-400 to-magenta" },
  { slug: "sanpoutei-ramen", name: "Sanpoutei Ramen", category: "dine", kind: "Ramen", terminal: "Jewel", location: "#02-249, Jewel", hours: "11:00 – 22:00", blurb: "Niigata-style shoyu ramen simmered from a clear, fragrant house broth.", tags: ["Japanese", "Ramen"], tint: "from-orange-400 to-flame" },
  { slug: "toast-box", name: "Toast Box", category: "dine", kind: "Kopitiam", terminal: "T4", location: "#02-15, Terminal 4", hours: "06:00 – 22:00", blurb: "Kaya toast, soft-boiled eggs and thick local coffee — a proper Singaporean start.", tags: ["Local", "Café"], tint: "from-amber-400 to-orange-500" },
  { slug: "din-tai-fung", name: "Din Tai Fung", category: "dine", kind: "Taiwanese", terminal: "T3", location: "#B2-32, Terminal 3", hours: "11:00 – 21:30", blurb: "Precision-pleated xiao long bao and steaming baskets of dumplings.", tags: ["Chinese", "Dim sum"], tint: "from-red-400 to-magenta" },

  // Shop
  { slug: "shilla-duty-free", name: "The Shilla Duty Free", category: "shop", kind: "Beauty & cosmetics", terminal: "T2", location: "Departure Transit, Terminal 2", hours: "Flight hours", blurb: "Prestige beauty, skincare and fragrance at duty-free prices before you fly.", tags: ["Beauty", "Duty-free"], tint: "from-rose-400 to-fuchsia-600" },
  { slug: "lotte-duty-free", name: "Lotte Duty Free", category: "shop", kind: "Liquor & tobacco", terminal: "T3", location: "Departure Transit, Terminal 3", hours: "Flight hours", blurb: "Wines, spirits and confectionery — collect airside or via iShopChangi.", tags: ["Wine & spirits", "Duty-free"], tint: "from-purple-500 to-plum" },
  { slug: "apple-jewel", name: "Apple Jewel", category: "shop", kind: "Electronics", terminal: "Jewel", location: "#02-250, Jewel", hours: "10:00 – 22:00", blurb: "The world's first Apple Store set within an airport, fronting the Rain Vortex.", tags: ["Tech", "Flagship"], tint: "from-slate-400 to-slate-600" },
  { slug: "pokemon-center", name: "Pokémon Center Singapore", category: "shop", kind: "Toys & collectibles", terminal: "Jewel", location: "#03-201, Jewel", hours: "10:00 – 22:00", blurb: "Exclusive Singapore-only plush, cards and merch for trainers of all ages.", tags: ["Toys", "Family"], tint: "from-yellow-400 to-amber-600" },
  { slug: "pop-mart", name: "Pop Mart", category: "shop", kind: "Designer toys", terminal: "Jewel", location: "#03-244, Jewel", hours: "10:00 – 22:00", blurb: "Blind-box designer figures and limited collabs you won't find at every mall.", tags: ["Toys", "Collectibles"], tint: "from-pink-400 to-rose-600" },
  { slug: "on-store", name: "On", category: "shop", kind: "Sportswear", terminal: "Jewel", location: "#02-208, Jewel", hours: "10:00 – 22:00", blurb: "Swiss-engineered running shoes and apparel on the Duplex Boulevard.", tags: ["Fashion", "Sport"], tint: "from-cyan-400 to-blue-600" },
  { slug: "adidas-jewel", name: "adidas", category: "shop", kind: "Sportswear", terminal: "Jewel", location: "#02-203, Jewel", hours: "10:00 – 22:00", blurb: "A grand double-storey flagship of the three stripes, from Originals to performance.", tags: ["Fashion", "Sport"], tint: "from-slate-500 to-slate-700" },
  { slug: "changi-airport-wine", name: "Wine & Spirits Cellar", category: "shop", kind: "Wine & spirits", terminal: "T1", location: "Departure Transit, Terminal 1", hours: "Flight hours", blurb: "Rare whiskies, champagnes and travel-exclusive bottlings for the connoisseur.", tags: ["Wine & spirits", "Duty-free"], tint: "from-amber-500 to-orange-700" },
  { slug: "twg-tea", name: "TWG Tea Boutique", category: "shop", kind: "Gourmet tea", terminal: "T2", location: "#02-050, Terminal 2", hours: "08:00 – 22:00", blurb: "Hundreds of fine harvests, tea-infused treats and beautifully boxed gifts.", tags: ["Gourmet", "Gifts"], tint: "from-emerald-400 to-teal-600" },
  { slug: "bengawan-solo", name: "Bengawan Solo", category: "shop", kind: "Local confectionery", terminal: "T3", location: "#02-K5, Terminal 3", hours: "07:00 – 22:00", blurb: "Pandan chiffon cake, kueh lapis and pineapple tarts to take a taste of Singapore home.", tags: ["Local", "Gifts"], tint: "from-lime-400 to-emerald-600" },
  { slug: "charles-keith", name: "Charles & Keith", category: "shop", kind: "Fashion & accessories", terminal: "T4", location: "#02-20, Terminal 4", hours: "Flight hours", blurb: "Homegrown footwear and bags with of-the-moment silhouettes.", tags: ["Fashion", "Local"], tint: "from-neutral-400 to-neutral-600" },
  { slug: "discover-singapore", name: "Discover Singapore", category: "shop", kind: "Souvenirs", terminal: "T1", location: "#02-042, Terminal 1", hours: "24 hours", blurb: "Merlion magnets, Peranakan prints and last-minute gifts around the clock.", tags: ["Souvenirs", "24 hours"], tint: "from-red-400 to-orange-600" },
];
