export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  stat?: { value: string; label: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "digi-home-loan",
    eyebrow: "Home loans",
    title: "Earn up to 300,000 Qantas Points",
    body: "Enjoy our low variable rate, unlimited additional repayments and the option to link one offset account with a CommBank Digi Home Loan. Limited time offer — apply online by 30 September 2026 and settle by 31 December 2026.",
    primary: { label: "Get started", to: "/products/digi-home-loan" },
    secondary: { label: "Refinance online", to: "/home-loans#refinance" },
    stat: { value: "5.89% p.a.", label: "variable rate, owner occupied" },
  },
  {
    id: "netbank-saver",
    eyebrow: "Savings",
    title: "5.20% p.a. on your first NetBank Saver",
    body: "Open a NetBank Saver for the first time and receive an introductory variable rate for 5 months, including a fixed bonus margin of 3.10% p.a. above the standard variable rate.",
    primary: { label: "See the rate", to: "/products/netbank-saver" },
    secondary: { label: "Compare savings accounts", to: "/bank-accounts#savings" },
    stat: { value: "5.20% p.a.", label: "for the first 5 months" },
  },
  {
    id: "commbank-yello",
    eyebrow: "CommBank Yello",
    title: "Unlock value just for banking with us",
    body: "Our customer recognition program gives eligible customers cashback on CommBank products, discounts with participating brands, and access to exclusive experiences.",
    primary: { label: "Explore Yello", to: "/commbank-yello" },
    secondary: { label: "See the tiers", to: "/commbank-yello#tiers" },
    stat: { value: "Up to $460", label: "cashback each year" },
  },
];

export type QuickLinkGroup = {
  id: string;
  heading: string;
  to: string;
  moreLabel: string;
  links: { label: string; to: string }[];
};

/** The five-column quick-link grid that sits under the homepage hero. */
export const quickLinkGroups: QuickLinkGroup[] = [
  {
    id: "banking",
    heading: "Banking",
    to: "/banking",
    moreLabel: "More from banking",
    links: [
      { label: "Bank & savings accounts", to: "/bank-accounts" },
      { label: "Credit cards", to: "/credit-cards" },
      { label: "Personal loans & car loans", to: "/personal-loans" },
    ],
  },
  {
    id: "home-loans",
    heading: "Home loans",
    to: "/home-loans",
    moreLabel: "More from home loans",
    links: [
      { label: "Home loan types", to: "/home-loans/types" },
      { label: "Interest rates", to: "/home-loans/rates" },
      { label: "Repayments calculator", to: "/tools-and-calculators#repayments" },
    ],
  },
  {
    id: "insurance",
    heading: "Insurance & more",
    to: "/insurance",
    moreLabel: "More from insurance",
    links: [
      { label: "Travel products & services", to: "/travel" },
      { label: "Overseas payment", to: "/travel#imt" },
      { label: "Foreign exchange calculator", to: "/tools-and-calculators#foreign-exchange" },
    ],
  },
  {
    id: "business",
    heading: "Business",
    to: "/business",
    moreLabel: "More from business",
    links: [
      { label: "Bank accounts & cards", to: "/products/business-transaction-account" },
      { label: "EFTPOS & eCommerce", to: "/products/smart-terminal" },
      { label: "Business loans & finance", to: "/products/business-loan" },
    ],
  },
  {
    id: "rates",
    heading: "Rates & calculators",
    to: "/rates-and-fees",
    moreLabel: "More rates & calculators",
    links: [
      { label: "Rates & fees", to: "/rates-and-fees" },
      { label: "Tools & calculators", to: "/tools-and-calculators" },
      { label: "Business product selector", to: "/business#selector" },
    ],
  },
];

export type LifeStage = {
  id: string;
  title: string;
  body: string;
  to: string;
};

export const lifeStages: LifeStage[] = [
  {
    id: "moving-to-australia",
    title: "Moving to Australia",
    body: "Open an account before you arrive so your money is ready when you land, to live, work or study.",
    to: "/bank-accounts#moving",
  },
  {
    id: "students",
    title: "A tertiary student or apprentice",
    body: "No monthly account fees while you study, plus tools to help you track where your money goes.",
    to: "/bank-accounts#students",
  },
  {
    id: "concession",
    title: "A concession or health card holder",
    body: "Fee-free everyday banking options designed for concession and health care card holders.",
    to: "/bank-accounts#concession",
  },
  {
    id: "retirees",
    title: "A retiree or pension card holder over 55",
    body: "The Pensioner Security Account pays interest on your balance with no monthly account fee.",
    to: "/bank-accounts#retirees",
  },
  {
    id: "parents",
    title: "A parent or guardian of a child under 14",
    body: "Open a Youthsaver for your child and set savings goals you can track together.",
    to: "/bank-accounts#youth",
  },
  {
    id: "teenagers",
    title: "A teenager",
    body: "From 14 you can open your own Smart Access account and Debit Mastercard.",
    to: "/bank-accounts#youth",
  },
  {
    id: "travelling",
    title: "Travelling overseas or in Australia",
    body: "Get trip-ready with our travel tips, plus the Travel Money Card for exchange rate certainty.",
    to: "/travel",
  },
  {
    id: "business-owner",
    title: "Looking for a business account",
    body: "Explore business bank accounts, EFTPOS terminals and loans to help your business thrive.",
    to: "/business",
  },
];

export type HelpCard = {
  id: string;
  title: string;
  body: string;
  to: string;
};

/** The "We're here to help" block that closes most commbank.com.au pages. */
export const helpCards: HelpCard[] = [
  {
    id: "book",
    title: "Book an appointment",
    body: "Book instantly to speak to a specialist at a time and place that suits you.",
    to: "/support/contact-us",
  },
  {
    id: "manage",
    title: "Manage your banking online",
    body: "Redraw, change your repayments, update your details and more in NetBank.",
    to: "/digital-banking/netbank",
  },
  {
    id: "contact",
    title: "Contact us",
    body: "Fast-track your call, see expected wait times and connect with a specialist.",
    to: "/support/contact-us",
  },
  {
    id: "message",
    title: "Message us",
    body: "Get instant help from our virtual assistant or chat to a specialist 24/7.",
    to: "/support",
  },
];

export type AppFeature = {
  id: string;
  title: string;
  body: string;
};

export const appFeatures: AppFeature[] = [
  {
    id: "spend-tracker",
    title: "Spend tracker",
    body: "Stay on track with your debit and credit card spending, categorised automatically.",
  },
  {
    id: "bill-sense",
    title: "Bill Sense",
    body: "See upcoming bills predicted from your account history so nothing catches you out.",
  },
  {
    id: "lock-block-limit",
    title: "Lock, Block, Limit",
    body: "Instantly lock your card, block transaction types and set your own spend limits.",
  },
  {
    id: "callercheck",
    title: "CallerCheck",
    body: "Confirm a call is really from us with a security code sent straight to your app.",
  },
  {
    id: "ceba",
    title: "Ceba",
    body: "Our virtual assistant helps with hundreds of everyday tasks, 24 hours a day.",
  },
  {
    id: "travel-booking",
    title: "Travel Booking",
    body: "Book flights and hotels in the app and earn travel credits if you're an eligible Yello customer.",
  },
];

export const contactChannels = [
  {
    id: "personal",
    title: "General personal banking",
    number: "13 2221",
    hours: "8am – 8pm, 7 days",
  },
  {
    id: "business",
    title: "Business banking",
    number: "13 1998",
    hours: "8am – 8pm, Mon – Fri",
  },
  {
    id: "overseas",
    title: "Calling from overseas",
    number: "+61 2 9999 3283",
    hours: "24 hours, 7 days",
  },
  {
    id: "relay",
    title: "National Relay Service",
    number: "133 677",
    hours: "For customers who are deaf or hard of hearing",
  },
];

export const securityAlerts = [
  {
    id: "impersonation",
    title: "Bank impersonation calls",
    body: "We will never ask you to move money to a 'safe account'. Ask the caller to send a CallerCheck code.",
    to: "/newsroom/scam-alert-impersonation-calls",
  },
  {
    id: "sms-phishing",
    title: "Fake SMS with NetBank links",
    body: "Never open banking links from a message. Type our address directly or use the CommBank app.",
    to: "/support/security",
  },
  {
    id: "invoice-scam",
    title: "Invoice and payment redirection",
    body: "Always confirm new payment details with the supplier using a number you already have.",
    to: "/support/security",
  },
];

export const awards = [
  { id: "canstar-fhb", label: "Canstar Bank of the Year — First Home Buyers, 2025" },
  { id: "canstar-digital", label: "Canstar Bank of the Year — Digital Banking, 2025" },
  { id: "yello", label: "Award-winning customer recognition program" },
];
