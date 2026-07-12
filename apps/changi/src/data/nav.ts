export interface NavLink {
  label: string;
  to: string;
  description?: string;
}

export interface NavMenu {
  label: string;
  to: string;
  blurb: string;
  links: NavLink[];
}

/** Primary navigation, mirroring the changiairport.com top menu. */
export const navMenus: NavMenu[] = [
  {
    label: "Fly",
    to: "/fly",
    blurb: "Everything you need before you take off or touch down.",
    links: [
      { label: "Flight Information", to: "/fly/flights", description: "Live-style arrivals & departures board" },
      { label: "Airline Information", to: "/fly", description: "Carriers, terminals & check-in rows" },
      { label: "Arrival Guide", to: "/fly", description: "Immigration, baggage & transport" },
      { label: "Departure Guide", to: "/fly", description: "Check-in, security & boarding" },
      { label: "Transiting Guide", to: "/fly", description: "Connect with time to spare" },
      { label: "Lounges", to: "/fly", description: "Rest, dine & freshen up" },
    ],
  },
  {
    label: "At Changi",
    to: "/at-changi",
    blurb: "Find your way around four terminals and Jewel.",
    links: [
      { label: "Terminal 1", to: "/at-changi/t1", description: "Home of the Kinetic Rain" },
      { label: "Terminal 2", to: "/at-changi/t2", description: "The Wonderfall & Dreamscape" },
      { label: "Terminal 3", to: "/at-changi/t3", description: "The Slide @ T3" },
      { label: "Terminal 4", to: "/at-changi/t4", description: "Fast & seamless travel" },
      { label: "Getting Around", to: "/at-changi", description: "MRT, Skytrain, taxi & bus" },
      { label: "Facilities & Services", to: "/at-changi", description: "Wi-Fi, showers, nurseries & more" },
    ],
  },
  {
    label: "Dine & Shop",
    to: "/dine-and-shop",
    blurb: "260+ ways to eat, drink and shop across Changi.",
    links: [
      { label: "Dine", to: "/dine-and-shop?category=dine", description: "Local hawker to fine dining" },
      { label: "Shop", to: "/dine-and-shop?category=shop", description: "Duty-free, fashion & tech" },
      { label: "iShopChangi", to: "/dine-and-shop", description: "Shop online, collect at the airport" },
      { label: "Duplex Boulevard", to: "/dine-and-shop", description: "Curated mid-luxury boutiques" },
    ],
  },
  {
    label: "Experience",
    to: "/experience",
    blurb: "Attractions that turn a layover into a destination.",
    links: [
      { label: "Jewel Changi Airport", to: "/experience/jewel-rain-vortex", description: "The HSBC Rain Vortex" },
      { label: "Canopy Park", to: "/experience/canopy-park", description: "Mazes, nets & slides on L5" },
      { label: "Shiseido Forest Valley", to: "/experience/shiseido-forest-valley", description: "Indoor garden trails" },
      { label: "Changi Experience Studio", to: "/experience/changi-experience-studio", description: "Interactive digital play" },
    ],
  },
  {
    label: "Happenings",
    to: "/happenings",
    blurb: "What's on right now across the airport and Jewel.",
    links: [
      { label: "Events", to: "/happenings?tab=events", description: "Shows, pop-ups & activations" },
      { label: "Promotions", to: "/happenings?tab=promotions", description: "Deals for members & travellers" },
    ],
  },
  {
    label: "Changi Rewards",
    to: "/rewards",
    blurb: "Earn, redeem and unlock member-only privileges.",
    links: [
      { label: "Benefits & Privileges", to: "/rewards", description: "What every member enjoys" },
      { label: "Rewards Catalogue", to: "/rewards", description: "Redeem points for treats" },
      { label: "Changi Monarch", to: "/rewards", description: "Our premium tier" },
      { label: "Help", to: "/help", description: "Member support & FAQs" },
    ],
  },
  {
    label: "Help",
    to: "/help",
    blurb: "Assistance, the Changi App and how to reach us.",
    links: [
      { label: "Assistance", to: "/help", description: "Special assistance & lost and found" },
      { label: "Changi App", to: "/help", description: "Your travel companion" },
      { label: "Contact Information", to: "/help", description: "Call, chat or email us" },
    ],
  },
];
