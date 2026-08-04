export type YelloTier = {
  id: string;
  name: string;
  order: number;
  criteria: string[];
  benefits: string[];
  accent: string;
};

export const yelloTiers: YelloTier[] = [
  {
    id: "yello",
    name: "CommBank Yello",
    order: 1,
    criteria: [
      "Have an eligible CommBank transaction account",
      "Make 5+ eligible transactions from an eligible account in the previous month",
    ],
    benefits: [
      "Free Kit membership — the pocket money app and card built by CommBank",
      "$100 cashback when you find and finance your car through CommBank",
      "Free ID alerts with Truyu for 6 months",
      "Cashback offers on everyday brands in the CommBank app",
    ],
    accent: "border-line",
  },
  {
    id: "yello-plus",
    name: "CommBank Yello Plus",
    order: 2,
    criteria: [
      "Make 15+ eligible transactions in the previous month",
      "Hold an eligible home loan, or $10,000+ in eligible balances for 15 days or more",
    ],
    benefits: [
      "Everything in CommBank Yello",
      "$25 off monthly on new More nbn plans",
      "Up to $10 per month cashback on eligible home loan service fees",
      "Bigger cashback offers on groceries, fuel and dining",
    ],
    accent: "border-cba-yellow",
  },
  {
    id: "yello-gold",
    name: "CommBank Yello Gold",
    order: 3,
    criteria: [
      "Make 15+ eligible transactions in the previous month, and",
      "Hold $50,000+ in eligible balances for 15 days or more, or an eligible home loan under $1,000,000",
    ],
    benefits: [
      "Everything in CommBank Yello Plus",
      "Up to $180 credit over 12 months for switching to Amber Electric",
      "Up to $10 per month cashback on eligible home insurance",
      "Priority access to event pre-sales and competitions",
    ],
    accent: "border-cba-yellow-deep",
  },
  {
    id: "yello-diamond",
    name: "CommBank Yello Diamond",
    order: 4,
    criteria: [
      "Make 15+ eligible transactions in the previous month, and",
      "Hold $250,000+ in eligible balances for 15 days or more, or eligible home loans of $1,000,000 or more",
    ],
    benefits: [
      "Everything in CommBank Yello Gold",
      "10% back in travel credits on flights and hotels booked via Travel Booking in the app",
      "Highest cashback rates across partner offers",
      "Invitations to money-can't-buy experiences",
    ],
    accent: "border-black",
  },
];

export const yelloStats = [
  { value: "Up to $460", label: "in cashback each year on CommBank products" },
  { value: "Up to $680", label: "in discounts on mobile, nbn and electricity in one year" },
  { value: "3 months", label: "of access once you meet the criteria" },
];

export const yelloSteps = [
  "Download or update to the latest version of the CommBank app",
  "Log on to the app and tap CBA Yello",
  "If you're eligible, you'll unlock access to CommBank Yello",
];

export type YelloOffer = {
  id: string;
  merchant: string;
  offer: string;
  category: "Groceries" | "Fuel" | "Dining" | "Retail" | "Travel" | "Home";
  expires: string;
  activated: boolean;
};

export const yelloOffers: YelloOffer[] = [
  {
    id: "offer-woolies",
    merchant: "Woolworths",
    offer: "5% cashback on shops over $80",
    category: "Groceries",
    expires: "2026-09-30",
    activated: false,
  },
  {
    id: "offer-ampol",
    merchant: "Ampol",
    offer: "8c per litre off fuel",
    category: "Fuel",
    expires: "2026-08-31",
    activated: true,
  },
  {
    id: "offer-uber-eats",
    merchant: "Uber Eats",
    offer: "$10 back on orders over $40",
    category: "Dining",
    expires: "2026-09-14",
    activated: false,
  },
  {
    id: "offer-jbhifi",
    merchant: "JB Hi-Fi",
    offer: "6% cashback on electronics",
    category: "Retail",
    expires: "2026-10-05",
    activated: false,
  },
  {
    id: "offer-webjet",
    merchant: "Webjet",
    offer: "5% back in travel credits",
    category: "Travel",
    expires: "2026-11-01",
    activated: true,
  },
  {
    id: "offer-amber",
    merchant: "Amber Electric",
    offer: "$180 welcome credit over 12 months",
    category: "Home",
    expires: "2026-12-31",
    activated: false,
  },
];
