export const homeHero = {
  eyebrow: "Optus 5G",
  title: "Big things happen when you say Yes",
  description:
    "Get more from your mobile, home internet and entertainment on Australia's fast-growing 5G network. Plans with no lock-in contracts and the perks you actually want.",
  image: "/brand/photos/hero.svg",
};

export const quickLinks = [
  {
    href: "/mobile-plans",
    title: "Mobile plans",
    description: "SIM only plans with data that rolls over.",
    icon: "smartphone",
  },
  {
    href: "/broadband",
    title: "Home internet",
    description: "nbn® and 5G Home Internet, set up in minutes.",
    icon: "wifi",
  },
  {
    href: "/phones",
    title: "Phones",
    description: "Latest devices on interest-free plans.",
    icon: "devices",
  },
  {
    href: "/prepaid",
    title: "Prepaid",
    description: "Epic value recharges with big data.",
    icon: "zap",
  },
] as const;

export const whyOptus = [
  {
    title: "Fast-growing 5G",
    body: "Optus 5G reaches millions of Aussies and keeps expanding across metro and regional areas.",
    icon: "signal",
  },
  {
    title: "No lock-in contracts",
    body: "Month-to-month SIM only plans. Change or cancel whenever life changes.",
    icon: "unlock",
  },
  {
    title: "Optus Sport included",
    body: "Selected plans come with Optus Sport — Premier League, LaLiga, and the Matildas.",
    icon: "trophy",
  },
  {
    title: "Help when you need it",
    body: "Manage everything in the My Optus app, or drop into a store near you.",
    icon: "life-buoy",
  },
] as const;

export const helpfulLinks = [
  { href: "/stores", title: "Find a store", body: "Book an appointment or shop in person." },
  { href: "/broadband", title: "Check your address", body: "See which internet plans are available." },
  { href: "/optus-sport", title: "Stream live sport", body: "Fixtures, highlights and full replays." },
  { href: "/deals", title: "Latest deals", body: "Bonus data, device offers and bundles." },
] as const;
