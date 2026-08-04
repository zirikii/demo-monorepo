export type InsuranceProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  issuer: string;
  coverPoints: string[];
  fromPrice?: string;
};

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: "home-insurance",
    name: "Home insurance",
    tagline: "Cover for your building, contents, or both",
    description:
      "Protect your home and the things inside it against events like fire, storm, theft and accidental damage.",
    issuer: "Provided by Hollard Insurance Partners Limited, distributed by CommBank",
    coverPoints: [
      "Building, contents or combined cover",
      "New-for-old replacement on eligible contents",
      "Temporary accommodation if your home is unliveable",
      "24/7 claims lodgement online or by phone",
    ],
    fromPrice: "Get a quote in under 5 minutes",
  },
  {
    id: "landlord-insurance",
    name: "Landlord insurance",
    tagline: "Cover for your investment property",
    description:
      "Protection for the building and landlord's contents, plus optional loss-of-rent cover for tenanted properties.",
    issuer: "Provided by Hollard Insurance Partners Limited, distributed by CommBank",
    coverPoints: [
      "Building and landlord's contents cover",
      "Optional loss of rent cover",
      "Cover for damage by tenants",
      "Legal liability cover",
    ],
  },
  {
    id: "car-insurance",
    name: "Car insurance",
    tagline: "Comprehensive and third party options",
    description:
      "Choose the level of cover that suits your car and how you drive, from third party property damage to comprehensive.",
    issuer: "Provided by Hollard Insurance Partners Limited, distributed by CommBank",
    coverPoints: [
      "Comprehensive, third party fire & theft, or third party property damage",
      "Choice of agreed or market value",
      "Hire car after theft included on comprehensive",
      "Lifetime guarantee on authorised repairs",
    ],
    fromPrice: "Save when you buy online",
  },
  {
    id: "travel-insurance",
    name: "Travel insurance",
    tagline: "Overseas and domestic trip cover",
    description:
      "Buy a CBA Travel Insurance plan for your trip, or activate the travel insurance included with eligible credit cards.",
    issuer: "Provided by Zurich Australian Insurance Limited through its agent Cover-More",
    coverPoints: [
      "Overseas medical and hospital cover",
      "Cancellation and lost luggage cover",
      "Included cover on eligible credit cards when you spend $500 on prepaid travel and activate",
      "Single trip and annual multi-trip options",
    ],
  },
  {
    id: "life-insurance",
    name: "Life insurance",
    tagline: "Financial protection for the people who rely on you",
    description:
      "Life, total and permanent disability and income protection cover so your family can keep going if something happens to you.",
    issuer: "Provided by AIA Australia Limited",
    coverPoints: [
      "Life cover and terminal illness benefit",
      "Total and permanent disability cover",
      "Income protection options",
      "Cover available inside Essential Super",
    ],
  },
  {
    id: "pet-insurance",
    name: "Pet insurance",
    tagline: "Help with unexpected vet bills",
    description:
      "Classic and Plus cover options for eligible vet expenses from accidental injury and illness.",
    issuer: "Issued by PetSure (Australia) Pty Ltd",
    coverPoints: [
      "Classic Cover and Plus Cover options",
      "Eligible vet expenses for accidental injury and illness",
      "Optional booster care for dental and specialised therapies",
      "Claim through the app",
    ],
  },
];

export type InvestingProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  points: string[];
  priceLabel: string;
};

export const investingProducts: InvestingProduct[] = [
  {
    id: "commsec",
    name: "Share trading with CommSec",
    tagline: "Australia's leading online broker",
    description:
      "Buy and sell ASX-listed shares, with research, watchlists and live pricing in the CommSec app.",
    points: [
      "Brokerage from $5.00 for trades up to $1,000",
      "Trade ASX and international markets",
      "Company research and analyst recommendations",
      "Settle directly from your CommBank account",
    ],
    priceLabel: "From $5.00 brokerage",
  },
  {
    id: "etfs",
    name: "Exchange traded funds",
    tagline: "Diversify with a single trade",
    description:
      "Get exposure to a basket of shares, bonds or commodities through ETFs listed on the ASX.",
    points: [
      "Broad market exposure in one trade",
      "Lower cost than most managed funds",
      "Trade through CommSec like any share",
      "Dividend reinvestment available",
    ],
    priceLabel: "Standard brokerage applies",
  },
  {
    id: "managed-funds",
    name: "Managed funds",
    tagline: "Professionally managed portfolios",
    description:
      "Invest alongside other investors in a portfolio managed by professional investment managers.",
    points: [
      "Access to Australian and global managers",
      "Regular investment plans from $100 a month",
      "Consolidated reporting",
      "Choice of growth, balanced and conservative options",
    ],
    priceLabel: "Management fees apply",
  },
  {
    id: "essential-super",
    name: "Essential Super",
    tagline: "Super you can see in NetBank",
    description:
      "A simple superannuation account you can open in minutes and view alongside your everyday banking.",
    points: [
      "See your super balance in NetBank and the CommBank app",
      "Lifestage investment option adjusts as you age",
      "Optional death and total & permanent disability cover",
      "Trustee is Colonial First State",
    ],
    priceLabel: "Administration fees apply",
  },
  {
    id: "consolidate",
    name: "Consolidate your super",
    tagline: "Bring your super together",
    description:
      "Search for lost super and roll multiple accounts into one so you're not paying several sets of fees.",
    points: [
      "Find lost and ATO-held super",
      "Roll over in the CommBank app",
      "Fewer fees and one set of statements",
      "Check insurance before you consolidate",
    ],
    priceLabel: "No cost to consolidate",
  },
  {
    id: "retirement",
    name: "Retirement planning",
    tagline: "Plan the income you'll need",
    description:
      "Tools, guides and advice options to help you work out how much you'll need and how to draw it down.",
    points: [
      "Retirement income projections",
      "Transition to retirement guidance",
      "Account-based pension options",
      "Book time with an adviser",
    ],
    priceLabel: "Advice fees may apply",
  },
];

export type InstitutionalService = {
  id: string;
  name: string;
  description: string;
  points: string[];
};

export const institutionalServices: InstitutionalService[] = [
  {
    id: "global-markets",
    name: "Global markets",
    description:
      "Foreign exchange, rates, commodities and structured solutions for corporate and institutional clients.",
    points: [
      "FX spot, forwards and options",
      "Interest rate risk management",
      "Commodities and carbon markets",
      "24-hour trading desks across Sydney, London and New York",
    ],
  },
  {
    id: "transaction-banking",
    name: "Transaction banking",
    description:
      "Payments, collections, liquidity and working capital solutions built on Australia's largest payments network.",
    points: [
      "Domestic and cross-border payments",
      "Liquidity and cash concentration structures",
      "Receivables and payables automation",
      "CommBiz and host-to-host connectivity",
    ],
  },
  {
    id: "capital-markets",
    name: "Capital markets",
    description:
      "Debt and equity capital markets execution, syndicated lending and acquisition finance.",
    points: [
      "Debt capital markets origination",
      "Syndicated and club loan facilities",
      "Acquisition and leveraged finance",
      "Securitisation and asset-backed funding",
    ],
  },
  {
    id: "sustainable-finance",
    name: "Sustainable finance",
    description:
      "Green, social and sustainability-linked funding structures, plus transition advisory.",
    points: [
      "Green and sustainability-linked loans",
      "Sustainable bond origination",
      "Transition planning advisory",
      "Emissions reporting support",
    ],
  },
];
