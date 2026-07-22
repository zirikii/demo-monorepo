export const hero = {
  title: "Yes to Australia’s fastest 5G",
  description:
    "Shop SIM-only plans, NBN and 5G Home Internet, phones and Optus Sport — then manage it all in My Optus.",
  primaryCta: { label: "Shop SIM offer", href: "/mobile-plans" },
  secondaryCta: { label: "Shop mobile phones", href: "/phones" },
};

export const promoStrip = {
  label: "Super SIM sale",
  title: "Save $15 a month for 12 months on selected SIM-only plans",
  cta: { label: "Shop the offer", href: "/mobile-plans" },
};

export const utilityActions = [
  { title: "Pay bills", href: "/bills", description: "View and pay your latest bill" },
  { title: "My Account", href: "/dashboard", description: "Open My Optus" },
  { title: "Recharge now", href: "/prepaid", description: "Top up prepaid services" },
  { title: "Change plan", href: "/plans", description: "Upgrade or switch plans" },
  { title: "Moving home", href: "/home-internet", description: "Transfer your service" },
  { title: "Activate a SIM", href: "/prepaid", description: "Get connected today" },
  { title: "Help & Support", href: "/support", description: "24/7 human tech support" },
  { title: "Network status", href: "/network", description: "Check coverage and Pulse" },
] as const;

export const quickLinks = [
  { title: "Mobile plans", href: "/mobile-plans", icon: "/brand/icons/mobile.svg" },
  { title: "Home internet", href: "/home-internet", icon: "/brand/icons/home-internet.svg" },
  { title: "Phones", href: "/phones", icon: "/brand/icons/phones.svg" },
  { title: "Optus Sport", href: "/entertainment", icon: "/brand/icons/entertainment.svg" },
  { title: "Prepaid", href: "/prepaid", icon: "/brand/icons/add-ons.svg" },
  { title: "Living Network", href: "/network", icon: "/brand/icons/support.svg" },
  { title: "Support", href: "/support", icon: "/brand/icons/support.svg" },
  { title: "My Optus", href: "/dashboard", icon: "/brand/icons/myoptus.svg" },
] as const;

export const homeInternetTeaser = {
  title: "NBN and 5G Home Internet for Australian households",
  body: "Check an address, compare everyday NBN speeds, or choose 5G Home Internet where the Optus mobile network reaches.",
  cta: { label: "Explore home internet", href: "/home-internet" },
};

export const entertainmentTeaser = {
  title: "Entertainment built into your plan",
  body: "Show Optus Sport, streaming extras and data boosts without connecting to real billing or streaming partners.",
  cta: { label: "View entertainment", href: "/entertainment" },
};

export const appCta = {
  title: "Manage everything in My Optus",
  body: "Pay bills, track usage, change plans, activate Unlimited Data Day and check Network Pulse from a mock My Optus portal.",
  cta: { label: "Open My Optus", href: "/dashboard" },
};

export const whyOptus = {
  title: "Why choose Optus",
  items: [
    {
      title: "Australia’s Fastest 5G Mobile Network",
      body: "Demo network language focused on metro and regional coverage across the Optus Living Network.",
      cta: { label: "Explore the network", href: "/network" },
    },
    {
      title: "Trade in your device",
      body: "Estimate a mock trade-in credit toward your next phone — no real valuations or carriers involved.",
      cta: { label: "Start a trade-in", href: "/trade-in" },
    },
    {
      title: "Real support when you need it",
      body: "24/7 human tech support online or self-serve through the My Optus experience.",
      cta: { label: "Get help", href: "/support" },
    },
  ],
};

export const livingNetwork = {
  title: "Your connection, your way",
  body: "Living Network tools put control in the My Optus app — simulated here with local toggles and dummy status.",
  features: [
    {
      id: "unlimited-data-day",
      title: "Unlimited Data Day",
      body: "Play all day with 24 hours of unlimited data on eligible mobile plans.",
    },
    {
      id: "donate-data",
      title: "Donate Your Data",
      body: "Pass unused mobile data to people who need it — demo only, no real donations.",
    },
    {
      id: "scamwise",
      title: "Scamwise",
      body: "Report suspicious SMS and stay across the latest scam trends.",
    },
    {
      id: "network-pulse",
      title: "Network Pulse",
      body: "See how your Optus mobile, home or public WiFi connection is performing right now.",
    },
  ],
};
