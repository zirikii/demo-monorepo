/** Shared brand / footer content for the demo. */
export const company = {
  name: "Changi Airport",
  brandPromise: "Exceptional People, Connecting Lives",
  region: "AU · EN",
  appName: "Changi App",
  footerBlurb:
    "Your gateway to Singapore and the world — flights, terminal guides, dining, shopping, attractions and rewards, all in one place.",
  socials: [
    { name: "Facebook", href: "https://www.changiairport.com", icon: "/brand/facebook.svg" },
    { name: "Instagram", href: "https://www.changiairport.com", icon: "/brand/instagram.svg" },
    { name: "LinkedIn", href: "https://www.changiairport.com", icon: "/brand/linkedin.svg" },
    { name: "YouTube", href: "https://www.changiairport.com", icon: "/brand/youtube.svg" },
    { name: "Telegram", href: "https://www.changiairport.com", icon: "/brand/telegram.svg" },
  ],
  footerColumns: [
    {
      heading: "Fly",
      links: [
        { label: "Flight Information", to: "/fly/flights" },
        { label: "Airline Information", to: "/fly" },
        { label: "Arrival Guide", to: "/fly" },
        { label: "Departure Guide", to: "/fly" },
        { label: "Lounges", to: "/fly" },
      ],
    },
    {
      heading: "At Changi",
      links: [
        { label: "Terminal 1", to: "/at-changi/t1" },
        { label: "Terminal 2", to: "/at-changi/t2" },
        { label: "Terminal 3", to: "/at-changi/t3" },
        { label: "Terminal 4", to: "/at-changi/t4" },
        { label: "Getting Around", to: "/at-changi" },
      ],
    },
    {
      heading: "Discover",
      links: [
        { label: "Dine & Shop", to: "/dine-and-shop" },
        { label: "Experience", to: "/experience" },
        { label: "Happenings", to: "/happenings" },
        { label: "Changi Rewards", to: "/rewards" },
      ],
    },
    {
      heading: "Help",
      links: [
        { label: "Assistance", to: "/help" },
        { label: "Changi App", to: "/help" },
        { label: "Contact Information", to: "/help" },
        { label: "Frequently Asked Questions", to: "/help" },
      ],
    },
  ],
} as const;
