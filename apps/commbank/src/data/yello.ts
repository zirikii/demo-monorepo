import type { YelloTier } from "./types";

export const yelloTiers: YelloTier[] = [
  {
    name: "Base",
    requirement: "An eligible CommBank transaction account with regular everyday activity.",
    annualValue: "Up to $180 a year",
    benefits: [
      "Cashback offers from participating brands",
      "Free Kit membership — the pocket money app and card built by CommBank",
      "$100 cashback when you find and finance your car through CommBank",
      "Free ID alerts with Truyu for 6 months",
    ],
  },
  {
    name: "Plus",
    requirement: "An eligible transaction account plus a savings balance or an additional product.",
    annualValue: "Up to $320 a year",
    benefits: [
      "Everything in Base",
      "$200 cashback when you find and finance your car through CommBank",
      "$25 off a More nbn plan each month for 36 months",
      "Access to selected pre-sales and exclusive events",
    ],
  },
  {
    name: "Gold",
    requirement: "Higher monthly transaction volume plus an eligible home loan or savings balance.",
    annualValue: "Up to $520 a year",
    benefits: [
      "Everything in Plus",
      "$5 monthly CommSec loyalty payment when settlement is over $1,000",
      "$5 monthly cashback on a World Debit Mastercard",
      "$300 cashback when you find and finance your car through CommBank",
      "5% back in travel credits on flights and hotels booked in the CommBank app",
    ],
  },
  {
    name: "Diamond",
    requirement: "Our highest tier — multiple eligible products and sustained monthly activity.",
    annualValue: "Up to $460 in product cashback plus partner discounts",
    benefits: [
      "Everything in Gold",
      "$10 monthly CommSec loyalty payment when settlement is over $1,000",
      "$10 monthly cashback on a World Debit Mastercard",
      "$400 cashback when you find and finance your car through CommBank",
      "$15 monthly cashback on the Loan Service Fee for Simple Home Loans",
      "$10 monthly cashback on the Loan Service Fee for Digi Home Loans",
      "$10 monthly cashback on eligible Home and Landlord insurance policies",
      "10% back in travel credits on flights and hotels booked in the CommBank app",
    ],
  },
];

export type YelloOffer = {
  id: string;
  brand: string;
  headline: string;
  detail: string;
  category: "Telco" | "Energy" | "Travel" | "Dining" | "Retail" | "CommBank";
  expires: string;
};

export const yelloOffers: YelloOffer[] = [
  {
    id: "more-nbn",
    brand: "More",
    headline: "$25 off nbn each month",
    detail:
      "Save $25 a month off the RRP on a new More nbn plan for 36 months, then $10 a month ongoing.",
    category: "Telco",
    expires: "2027-03-31",
  },
  {
    id: "more-mobile",
    brand: "More",
    headline: "$12 a month off mobile",
    detail: "Save up to $120 a year per mobile plan for eligible tiers, for up to three years.",
    category: "Telco",
    expires: "2027-03-31",
  },
  {
    id: "amber-electric",
    brand: "Amber Electric",
    headline: "Up to $180 energy credit",
    detail:
      "Receive up to $180 credit over 12 months when you switch your energy to Amber Electric.",
    category: "Energy",
    expires: "2026-12-31",
  },
  {
    id: "travel-credits",
    brand: "CommBank Travel",
    headline: "Up to 10% back in travel credits",
    detail:
      "Book flights and hotels through Travel Booking in the CommBank app and earn travel credits.",
    category: "Travel",
    expires: "2026-11-30",
  },
  {
    id: "uber-one",
    brand: "Uber One",
    headline: "6 months free membership",
    detail:
      "Free 6-month Uber One membership plus $15 of Uber Cash credit for eligible Gold customers.",
    category: "Dining",
    expires: "2026-10-31",
  },
  {
    id: "kit",
    brand: "Kit",
    headline: "Free Kit membership",
    detail: "The pocket money app and card built by CommBank, free for eligible Yello customers.",
    category: "CommBank",
    expires: "2026-12-31",
  },
  {
    id: "truyu",
    brand: "Truyu",
    headline: "6 months of free ID alerts",
    detail: "Identity fraud protection built by CommBank, free for the first six months.",
    category: "CommBank",
    expires: "2026-12-31",
  },
  {
    id: "brighte",
    brand: "Brighte",
    headline: "Discounted home energy loans",
    detail:
      "A reduced rate on CommBank home energy personal loans used for purchases with Brighte.",
    category: "CommBank",
    expires: "2026-12-31",
  },
];
