export type CreditCard = {
  id: string;
  name: string;
  category: "Interest-free" | "Low Rate" | "Low Fee" | "Awards";
  tagline: string;
  purchaseRate: string;
  annualFee: string;
  minimumCreditLimit: string;
  interestFreeDays: string;
  features: string[];
  badge?: string;
};

export const creditCards: CreditCard[] = [
  {
    id: "neo",
    name: "CommBank Neo",
    category: "Interest-free",
    tagline: "No interest, ever. Just a simple monthly fee.",
    purchaseRate: "0% p.a.",
    annualFee: "$15, $20 or $25 per month depending on your limit",
    minimumCreditLimit: "$1,000 (maximum $3,000)",
    interestFreeDays: "No interest charged",
    features: [
      "0% p.a. interest on purchases and cash advances",
      "No late fees and no foreign transaction fees",
      "No monthly fee in a statement period with no transactions and a nil balance",
      "Credit limits of $1,000, $2,000 or $3,000",
    ],
    badge: "No interest",
  },
  {
    id: "low-rate",
    name: "Low Rate credit card",
    category: "Low Rate",
    tagline: "A personalised low rate on purchases",
    purchaseRate: "10.99% p.a. to 15.99% p.a.",
    annualFee: "$6 per month",
    minimumCreditLimit: "$500",
    interestFreeDays: "Up to 55 days",
    features: [
      "A personalised interest rate between 10.99% p.a. and 15.99% p.a. based on your credit profile",
      "Up to 55 interest-free days on purchases",
      "Instalment plans available in the CommBank app",
      "Lock, Block, Limit card controls",
    ],
    badge: "Lowest rate",
  },
  {
    id: "low-fee",
    name: "Low Fee credit card",
    category: "Low Fee",
    tagline: "Low cost with a monthly fee waiver",
    purchaseRate: "20.99% p.a.",
    annualFee: "$3 per month, waived when you spend $300 or more",
    minimumCreditLimit: "$500",
    interestFreeDays: "Up to 55 days",
    features: [
      "$0 monthly fee in any statement period you spend $300 or more",
      "Up to 55 interest-free days on purchases",
      "Complimentary additional cardholder",
      "Digital wallet ready",
    ],
  },
  {
    id: "awards",
    name: "Awards credit card",
    category: "Awards",
    tagline: "Earn CommBank Awards points on everyday spend",
    purchaseRate: "20.99% p.a.",
    annualFee: "$0 per month",
    minimumCreditLimit: "$500",
    interestFreeDays: "Up to 55 days",
    features: [
      "Earn CommBank Awards points on eligible purchases",
      "Redeem for cashback, gift cards, travel or Qantas Points",
      "Up to 55 interest-free days on purchases",
      "Free additional cardholder",
    ],
  },
  {
    id: "smart-awards",
    name: "Smart Awards credit card",
    category: "Awards",
    tagline: "More points, with a fee waiver for higher spenders",
    purchaseRate: "20.99% p.a.",
    annualFee: "$19 per month, waived when you spend $2,000 or more",
    minimumCreditLimit: "$3,000",
    interestFreeDays: "Up to 55 days",
    features: [
      "$0 monthly fee in any statement period you spend $2,000 or more",
      "Higher Awards points earn rate on eligible purchases",
      "Included international travel insurance when activated",
      "Complimentary purchase security insurance",
    ],
  },
  {
    id: "ultimate-awards",
    name: "Ultimate Awards credit card",
    category: "Awards",
    tagline: "Our premium card with no foreign transaction fees",
    purchaseRate: "20.99% p.a.",
    annualFee: "$35 per month, waived when you spend $4,000 or more",
    minimumCreditLimit: "$6,000",
    interestFreeDays: "Up to 55 days",
    features: [
      "$0 monthly fee in any statement period you spend $4,000 or more",
      "No foreign transaction fees on purchases",
      "Included international travel insurance when activated",
      "Highest Awards points earn rate",
    ],
    badge: "Premium",
  },
];

export const cardCategories = ["All", "Interest-free", "Low Rate", "Low Fee", "Awards"] as const;
export type CardCategory = (typeof cardCategories)[number];
