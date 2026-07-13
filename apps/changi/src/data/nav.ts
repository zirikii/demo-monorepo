export type NavLink = { label: string; to: string; external?: boolean };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { id: string; label: string; to: string; columns: NavColumn[] };

export const siteSwitcher = [
  { label: "Airport", to: "/", active: true },
  { label: "Corporate", to: "/help", active: false },
  { label: "Careers", to: "/help", active: false },
  { label: "CAI", to: "/experience", active: false },
  { label: "Jewel", to: "/at-changi", active: false },
  { label: "Now Boarding", to: "/happenings", active: false },
] as const;

export const primaryNav: NavItem[] = [
  {
    id: "fly",
    label: "Fly",
    to: "/fly",
    columns: [
      {
        heading: "Flight Information",
        links: [
          { label: "Arrival Flight Listing", to: "/fly/flights?dir=arrival" },
          { label: "Departure Flight Listing", to: "/fly/flights?dir=departure" },
          { label: "Freighter Flight Listing", to: "/fly/flights" },
        ],
      },
      {
        heading: "Arrival Guide",
        links: [
          { label: "Entry Requirements (ICA)", to: "/fly" },
          { label: "Immigration Clearance", to: "/fly" },
          { label: "Customs Declaration", to: "/fly" },
          { label: "Baggage Services", to: "/fly" },
          { label: "Lost Baggage", to: "/fly" },
          { label: "Leaving Changi Airport", to: "/fly" },
          { label: "Getting Started in Singapore", to: "/fly" },
        ],
      },
      {
        heading: "Departure Guide",
        links: [
          { label: "Travel Advisories", to: "/fly" },
          { label: "Pre-flight Check", to: "/fly" },
          { label: "Getting to Changi Airport", to: "/fly" },
          { label: "Early Check-in", to: "/fly" },
          { label: "Fast Check-in", to: "/fly" },
          { label: "Tax Refund", to: "/fly" },
          { label: "Security Screening", to: "/fly" },
        ],
      },
      {
        heading: "Transiting & Lounges",
        links: [
          { label: "Transiting Guide", to: "/fly" },
          { label: "Free Singapore Tours", to: "/fly" },
          { label: "Transit Hotels", to: "/fly" },
          { label: "Airline Lounges", to: "/fly" },
          { label: "Pay-per-use Lounges", to: "/fly" },
          { label: "Airline Information", to: "/fly" },
        ],
      },
    ],
  },
  {
    id: "at-changi",
    label: "At Changi",
    to: "/at-changi",
    columns: [
      {
        heading: "Terminal Guides",
        links: [
          { label: "Terminal 1", to: "/at-changi" },
          { label: "Terminal 2", to: "/at-changi" },
          { label: "Terminal 3", to: "/at-changi" },
          { label: "Terminal 4", to: "/at-changi" },
          { label: "Map", to: "/at-changi" },
        ],
      },
      {
        heading: "Transport and Directions",
        links: [
          { label: "Transfer Between Terminals and Jewel", to: "/at-changi" },
          { label: "Coach to Johor Bahru", to: "/at-changi" },
          { label: "Parking", to: "/at-changi" },
        ],
      },
      {
        heading: "Special Assistance",
        links: [
          { label: "Travelling with Children", to: "/at-changi" },
          { label: "Travelling with Reduced Mobility", to: "/at-changi" },
          { label: "Travelling with Invisible Disability", to: "/at-changi" },
          { label: "Travelling with Service Animals", to: "/at-changi" },
        ],
      },
      {
        heading: "Stay & Visit",
        links: [
          { label: "Crowne Plaza Changi Airport", to: "/at-changi" },
          { label: "YOTEL AIR Singapore Changi Airport", to: "/at-changi" },
          { label: "Jewel Changi Airport", to: "/at-changi" },
        ],
      },
    ],
  },
  {
    id: "dine-shop",
    label: "Dine & Shop",
    to: "/dine-and-shop",
    columns: [
      {
        heading: "Dining",
        links: [
          { label: "Cafés", to: "/dine-and-shop" },
          { label: "Fast Food", to: "/dine-and-shop" },
          { label: "Fine Dining", to: "/dine-and-shop" },
          { label: "Food Court", to: "/dine-and-shop" },
          { label: "Homegrown Brands", to: "/dine-and-shop" },
          { label: "Pubs & Bars", to: "/dine-and-shop" },
          { label: "24 Hours", to: "/dine-and-shop" },
        ],
      },
      {
        heading: "Shopping",
        links: [
          { label: "Beauty", to: "/dine-and-shop" },
          { label: "Fashion & Accessories", to: "/dine-and-shop" },
          { label: "Electronics", to: "/dine-and-shop" },
          { label: "Luxury", to: "/dine-and-shop" },
          { label: "Souvenirs, Gifts & Books", to: "/dine-and-shop" },
          { label: "Watches & Jewellery", to: "/dine-and-shop" },
          { label: "Wine & Spirits", to: "/dine-and-shop" },
        ],
      },
      {
        heading: "Services",
        links: [
          { label: "Changi Pay", to: "/dine-and-shop" },
          { label: "Changi Rewards", to: "/rewards" },
          { label: "GST-absorbed Shopping", to: "/dine-and-shop" },
          { label: "Shopping Concierge", to: "/dine-and-shop" },
        ],
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    to: "/experience",
    columns: [
      {
        heading: "Attractions",
        links: [
          { label: "Art", to: "/experience" },
          { label: "Nature", to: "/experience" },
          { label: "Movie Theatres", to: "/experience" },
          { label: "Play", to: "/experience" },
          { label: "Relax", to: "/experience" },
        ],
      },
    ],
  },
  {
    id: "happenings",
    label: "Happenings",
    to: "/happenings",
    columns: [
      {
        heading: "Discover",
        links: [
          { label: "Events", to: "/happenings" },
          { label: "Promotions", to: "/happenings" },
        ],
      },
    ],
  },
  {
    id: "rewards",
    label: "Changi Rewards",
    to: "/rewards",
    columns: [
      {
        heading: "Programme",
        links: [
          { label: "Benefits & Privileges", to: "/rewards" },
          { label: "Changi Rewards Catalogue", to: "/rewards" },
          { label: "Specials", to: "/rewards" },
          { label: "Events", to: "/rewards" },
          { label: "Changi Monarch", to: "/rewards" },
          { label: "Help", to: "/help" },
        ],
      },
    ],
  },
  {
    id: "help",
    label: "App & Help",
    to: "/help",
    columns: [
      {
        heading: "Support",
        links: [
          { label: "Assistance", to: "/help" },
          { label: "Changi App", to: "/help" },
          { label: "Contact Information", to: "/help" },
        ],
      },
    ],
  },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "Fly",
    links: [
      { label: "Flight Information", to: "/fly/flights" },
      { label: "Airline Information", to: "/fly" },
      { label: "Arrival Guide", to: "/fly" },
      { label: "Departure Guide", to: "/fly" },
      { label: "Transiting Guide", to: "/fly" },
      { label: "Lounges", to: "/fly" },
    ],
  },
  {
    heading: "At Changi",
    links: [
      { label: "Map", to: "/at-changi" },
      { label: "Terminal Guides", to: "/at-changi" },
      { label: "Transport and Directions", to: "/at-changi" },
      { label: "Facilities & Services", to: "/at-changi" },
      { label: "Jewel Changi Airport", to: "/at-changi" },
    ],
  },
  {
    heading: "Dine & Shop",
    links: [
      { label: "Dining", to: "/dine-and-shop" },
      { label: "Shopping", to: "/dine-and-shop" },
      { label: "Changi Pay", to: "/dine-and-shop" },
      { label: "GST-absorbed Shopping", to: "/dine-and-shop" },
    ],
  },
  {
    heading: "Experience",
    links: [
      { label: "Attractions", to: "/experience" },
      { label: "Art", to: "/experience" },
      { label: "Nature", to: "/experience" },
    ],
  },
  {
    heading: "Happenings",
    links: [
      { label: "Events", to: "/happenings" },
      { label: "Promotions", to: "/happenings" },
    ],
  },
  {
    heading: "Changi Rewards",
    links: [
      { label: "Benefits & Privileges", to: "/rewards" },
      { label: "Catalogue", to: "/rewards" },
      { label: "Changi Monarch", to: "/rewards" },
    ],
  },
  {
    heading: "App & Help",
    links: [
      { label: "Assistance", to: "/help" },
      { label: "Changi App", to: "/help" },
      { label: "Contact Information", to: "/help" },
    ],
  },
];
