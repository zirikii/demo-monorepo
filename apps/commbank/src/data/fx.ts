export type FxRate = {
  code: string;
  name: string;
  /** Indicative units of foreign currency per 1 AUD. */
  rate: number;
  symbol: string;
};

export const fxRates: FxRate[] = [
  { code: "USD", name: "US Dollar", rate: 0.6584, symbol: "$" },
  { code: "EUR", name: "Euro", rate: 0.6031, symbol: "€" },
  { code: "GBP", name: "British Pound", rate: 0.5142, symbol: "£" },
  { code: "NZD", name: "New Zealand Dollar", rate: 1.0873, symbol: "$" },
  { code: "JPY", name: "Japanese Yen", rate: 98.42, symbol: "¥" },
  { code: "SGD", name: "Singapore Dollar", rate: 0.8846, symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", rate: 5.1234, symbol: "$" },
  { code: "THB", name: "Thai Baht", rate: 23.87, symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", rate: 10412.5, symbol: "Rp" },
  { code: "CAD", name: "Canadian Dollar", rate: 0.9021, symbol: "$" },
];

/** Indicative retail margin applied to the mid-market rate on the demo FX calculator. */
export const retailFxMarginPct = 3.5;

export const travelProducts = [
  {
    id: "travel-money",
    name: "Travel Money Card",
    description:
      "Load up to 13 currencies onto one prepaid card, lock in your rate, and reload in the CommBank app while you're away.",
    points: [
      "Lock in your exchange rate before you travel",
      "Load and reload 13 currencies",
      "$0 reload fee in the CommBank app",
      "Lock the card instantly if it's lost",
    ],
  },
  {
    id: "transfers",
    name: "International Money Transfers",
    description:
      "Send money to more than 200 countries in over 30 currencies from NetBank or the CommBank app.",
    points: [
      "Send to 200+ countries in 30+ currencies",
      "$0 CommBank fee on transfers over $1,000 sent in foreign currency online",
      "Track your transfer in the app",
      "Set up recurring transfers",
    ],
  },
  {
    id: "foreign-cash",
    name: "Foreign cash",
    description: "Order foreign currency cash online for collection at a participating branch.",
    points: [
      "Order online and collect in branch",
      "Over 20 currencies available",
      "Competitive branch rates",
      "Buy back unused currency on your return",
    ],
  },
  {
    id: "world-debit",
    name: "World Debit Mastercard",
    description:
      "Spend overseas with no CommBank international transaction fee on eligible accounts, plus included insurances.",
    points: [
      "No CommBank international transaction fee",
      "Included overseas medical cover when activated",
      "Works with digital wallets",
      "Access to CommBank ATMs overseas via partner networks",
    ],
  },
];
