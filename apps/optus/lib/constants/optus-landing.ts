export const hero = {
  eyebrow: "Optus Australia",
  title: "Connect more of what matters with Optus",
  description:
    "Explore mobile plans, NBN, 5G Home Internet, phones, Optus Sport and My Optus self-service in one unofficial demo.",
  primaryCta: { label: "Shop mobile plans", href: "/mobile-plans" },
  secondaryCta: { label: "Sign in to My Optus", href: "/login" },
};

export const quickLinks = [
  { title: "Mobile plans", href: "/mobile-plans", icon: "/brand/icons/mobile.svg" },
  { title: "Home internet", href: "/home-internet", icon: "/brand/icons/home-internet.svg" },
  { title: "Phones", href: "/phones", icon: "/brand/icons/phones.svg" },
  { title: "Optus Sport", href: "/entertainment", icon: "/brand/icons/entertainment.svg" },
  { title: "Support", href: "/support", icon: "/brand/icons/support.svg" },
  { title: "My Optus", href: "/dashboard", icon: "/brand/icons/myoptus.svg" },
] as const;

export const homeInternetTeaser = {
  title: "NBN and 5G Home Internet for Australian households",
  body:
    "Run a demo address check, compare everyday NBN speeds, or choose 5G Home Internet where the Optus mobile network is available.",
  cta: { label: "Explore home internet", href: "/home-internet" },
};

export const entertainmentTeaser = {
  title: "Entertainment, sport and extras",
  body:
    "Showcase Optus Sport, roaming, data boosts and entertainment add-ons without connecting to real billing or streaming services.",
  cta: { label: "View entertainment", href: "/entertainment" },
};

export const appCta = {
  title: "Manage everything in My Optus",
  body:
    "View usage, change plans, activate add-ons, check bills and update settings from a mock My Optus account portal.",
  cta: { label: "Open My Optus", href: "/dashboard" },
};

export const whyOptus = {
  title: "Why choose Optus",
  items: [
    {
      title: "5G across more places",
      body: "Demo network cards and usage surfaces focus on Australian metro and regional contexts.",
      cta: { label: "Check plans", href: "/mobile-plans" },
    },
    {
      title: "Simple home internet",
      body: "NBN and 5G Home Internet packages use AUD pricing and Australian service language.",
      cta: { label: "Compare internet", href: "/home-internet" },
    },
    {
      title: "Self-service built in",
      body: "My Optus lets demo users view bills, usage, add-ons, profile data and team settings locally.",
      cta: { label: "Sign in", href: "/login" },
    },
  ],
};
