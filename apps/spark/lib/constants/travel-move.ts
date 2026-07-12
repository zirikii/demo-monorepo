export const travelMoveHero = {
  title: "Travelling to New Zealand",
  description:
    "Whether you're visiting Aotearoa (New Zealand) or are planning to stay, stay connected with our mobile and broadband plans.",
  image: "/brand/photos/hero-friends-grass.jpg",
} as const;

export const quickLinks = [
  {
    title: "Mobile Travel Packs",
    href: "/travel-packs",
    icon: "/brand/icons/travel-pack.svg",
  },
  {
    title: "Mobile plans",
    href: "/mobile-plans",
    icon: "/brand/icons/mobile.png",
  },
  {
    title: "Broadband plans",
    href: "/broadband",
    icon: "/brand/icons/broadband.png",
  },
  {
    title: "Mobile phones",
    href: "/phones",
    icon: "/brand/icons/phone.png",
  },
  {
    title: "Deals",
    href: "/deals",
    icon: "/brand/icons/deals.svg",
  },
  {
    title: "MySpark",
    href: "/dashboard",
    icon: "/brand/icons/myspark.svg",
  },
] as const;

export const travelPacksSection = {
  title: "Travel packs for visitors",
  body: "Visiting New Zealand for 90 days or less? Stay connected locally and internationally with our Prepaid Mobile Travel SIMs*. From $29 you'll get data, calls and texts. If you only need data, plans start from $15. If you have an eSIM compatible phone, you can get set up today, ready for your arrival in New Zealand. Otherwise, visit a Spark store to pick up a physical SIM.",
  cta: { label: "View Mobile Travel Packs", href: "/travel-packs" },
  footnote:
    "*International voice minutes + SMS included in all-inclusive Travel Packs are only available when calls and SMS are from within NZ to USA, Canada, China, Hong Kong, India, South Africa, UK, Ireland, Australia, France, Germany, Italy, Portugal, Spain, Philippines, Japan, Thailand, Singapore, Malaysia, and South Korea.",
} as const;

export const movingSection = {
  title: "Moving to New Zealand?",
  intro:
    "If you’re staying in New Zealand for over 90 days, or settling here permanently, explore our mobile and broadband plans.",
  mobile: {
    title: "Mobile plans",
    body: "Endless plans starting from $45. Our Endless plans don't stop you when you reach your data allowance. Instead your download speed slows down, keeping you connected at all times. Save up to 35% with Team Up. If you sign up to 4 or more Team Up eligible plans and have them linked to the same customer account, you can save up to 35%.",
    cta: { label: "View Endless plans", href: "/mobile-plans" },
  },
  broadband: {
    title: "Broadband",
    body: "We offer Fibre or Wireless Broadband. Fibre is connected through Fibre optic cables, while Wireless Broadband is connected through our 4G and 5G mobile network. If you know where you'll be staying, enter your address and find out what's available to you. Otherwise view all our broadband plans.",
    cta: { label: "View broadband plans", href: "/broadband" },
  },
} as const;

export const appCta = {
  title: "Download the Spark app",
  body: "Use the Spark app to view your usage, pay bills and top up. You can also use the Spark app to message us if you need help and read up on the latest news articles.",
  cta: { label: "Download the Spark app", href: "/dashboard" },
  image: "/brand/photos/app-cta-girls.png",
} as const;

export const coverageTeaser = {
  title: "#1 mobile network coverage in NZ*",
  description: "*As awarded by Opensignal in the October 2025 NZ Mobile Network Experience Report.",
  image: "/brand/photos/network-coverage.png",
} as const;

export const helpfulThings = {
  title: "Helpful things to know",
  items: [
    {
      title: "Setting up with us",
      description: "Make sure you're good to go when you land",
      href: "/travel-packs",
      image: "/brand/photos/setting-up.jpg",
    },
    {
      title: "Spark Arena",
      description: "See what concerts and events are on",
      href: "/entertainment",
      image: "/brand/photos/spark-arena.jpg",
    },
    {
      title: "Spark store",
      description: "Find your local Spark store",
      href: "/stores",
      image: "/brand/photos/spark-store.jpg",
    },
    {
      title: "Tech & accessories",
      description: "View the range of products we offer",
      href: "/phones",
      image: "/brand/photos/tech-accessories.jpg",
    },
  ],
} as const;

export const whySpark = {
  title: "Why choose Spark",
  items: [
    {
      title: "Entertainment",
      body: "Unlock deals on Netflix, Spotify Premium, NEON and more. We also get you closer to epic music and gaming experiences, with live events, pre-sales and other perks.",
      cta: { label: "View entertainment", href: "/entertainment" },
      image: "/brand/photos/entertainment.jpg",
    },
    {
      title: "Spark Foundation",
      body: "Spark Foundation is our charitable organisation with a mission to accelerate towards Digital Equity. We provide funding, advocacy and other resources to rangatahi Māori and other youth who are disproportionally impacted by inequity.",
      cta: { label: "Learn more", href: "/foundation" },
      image: "/brand/photos/foundation.jpg",
    },
    {
      title: "Parent Hub",
      body: "Raising kids in today's digital world comes with big questions and unique challenges. We've created a space grounded in psychology, real-life parenting and expert guidance, so you can feel confident as you support your child's digital journey.",
      cta: { label: "Explore Parent Hub", href: "/parent-hub" },
      image: "/brand/photos/parent-hub.jpg",
    },
  ],
} as const;
