export type NavLink = {
  label: string;
  to: string;
  description?: string;
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavItem = {
  id: string;
  label: string;
  to: string;
  columns: NavColumn[];
  feature?: { title: string; body: string; to: string; cta: string };
};

/** Mirrors the seven primary items on commbank.com.au. */
export const primaryNav: NavItem[] = [
  {
    id: "banking",
    label: "Banking",
    to: "/banking",
    columns: [
      {
        heading: "Bank accounts",
        links: [
          { label: "Everyday accounts", to: "/bank-accounts" },
          { label: "Savings accounts", to: "/bank-accounts#savings" },
          { label: "Term Deposits", to: "/bank-accounts#term-deposits" },
          { label: "Accounts for under 18s", to: "/bank-accounts#youth" },
          { label: "Compare bank accounts", to: "/bank-accounts#compare" },
        ],
      },
      {
        heading: "Cards & lending",
        links: [
          { label: "Credit cards", to: "/credit-cards" },
          { label: "Debit cards", to: "/bank-accounts#debit" },
          { label: "Personal loans", to: "/personal-loans" },
          { label: "Car loans", to: "/personal-loans#car" },
          { label: "Rates & fees", to: "/rates-and-fees" },
        ],
      },
      {
        heading: "Digital banking",
        links: [
          { label: "CommBank app", to: "/digital-banking/app" },
          { label: "NetBank", to: "/digital-banking/netbank" },
          { label: "Digital wallets", to: "/digital-banking#wallets" },
          { label: "PayID & Osko", to: "/digital-banking#payid" },
        ],
      },
      {
        heading: "Travel & international",
        links: [
          { label: "Travel money", to: "/travel" },
          { label: "International money transfers", to: "/travel#imt" },
          { label: "Foreign exchange calculator", to: "/tools-and-calculators#foreign-exchange" },
          { label: "Travel insurance", to: "/insurance#travel" },
        ],
      },
    ],
    feature: {
      title: "NetBank Saver — 5.20% p.a. intro rate",
      body: "Open your first NetBank Saver and earn an introductory variable rate for 5 months.",
      to: "/products/netbank-saver",
      cta: "See the rate",
    },
  },
  {
    id: "home-loans",
    label: "Home loans",
    to: "/home-loans",
    columns: [
      {
        heading: "Home loan types",
        links: [
          { label: "All home loan types", to: "/home-loans/types" },
          { label: "Digi Home Loan", to: "/products/digi-home-loan" },
          { label: "Standard Variable Rate", to: "/products/standard-variable-rate" },
          { label: "Fixed Rate", to: "/products/fixed-rate-home-loan" },
          { label: "Simple Home Loan", to: "/products/simple-home-loan" },
        ],
      },
      {
        heading: "Rates & calculators",
        links: [
          { label: "Home loan interest rates", to: "/home-loans/rates" },
          { label: "Repayments calculator", to: "/tools-and-calculators#repayments" },
          { label: "Borrowing power calculator", to: "/tools-and-calculators#borrowing-power" },
          { label: "Wealth Package", to: "/products/wealth-package" },
        ],
      },
      {
        heading: "Guides & support",
        links: [
          { label: "Buying your first home", to: "/home-loans#first-home" },
          { label: "Refinancing", to: "/home-loans#refinance" },
          { label: "Investing in property", to: "/home-loans#investing" },
          { label: "Home loan support & FAQs", to: "/support?category=Home%20loans" },
        ],
      },
    ],
    feature: {
      title: "Earn up to 300,000 Qantas Points",
      body: "Apply online for a CommBank Digi Home Loan. Limited time offer, conditions apply.",
      to: "/products/digi-home-loan",
      cta: "Get started",
    },
  },
  {
    id: "insurance",
    label: "Insurance",
    to: "/insurance",
    columns: [
      {
        heading: "Home & car",
        links: [
          { label: "Home insurance", to: "/products/home-insurance" },
          { label: "Contents insurance", to: "/products/contents-insurance" },
          { label: "Landlord insurance", to: "/products/landlord-insurance" },
          { label: "Car insurance", to: "/products/car-insurance" },
        ],
      },
      {
        heading: "Life & travel",
        links: [
          { label: "Travel insurance", to: "/products/travel-insurance" },
          { label: "Life insurance", to: "/insurance#life" },
          { label: "Income protection", to: "/insurance#income" },
        ],
      },
      {
        heading: "Manage",
        links: [
          { label: "Make a claim", to: "/insurance#claims" },
          { label: "Insurance FAQs", to: "/support?category=Insurance" },
        ],
      },
    ],
  },
  {
    id: "investing-and-super",
    label: "Investing & Super",
    to: "/investing-and-super",
    columns: [
      {
        heading: "Investing",
        links: [
          { label: "CommSec share trading", to: "/products/commsec-share-trading" },
          { label: "CommSec Pocket", to: "/products/commsec-pocket" },
          { label: "Exchange traded funds", to: "/investing-and-super#etfs" },
          { label: "Margin lending", to: "/investing-and-super#margin" },
        ],
      },
      {
        heading: "Superannuation",
        links: [
          { label: "Essential Super", to: "/products/essential-super" },
          { label: "Consolidate your super", to: "/investing-and-super#consolidate" },
          { label: "Retirement planning", to: "/investing-and-super#retirement" },
        ],
      },
      {
        heading: "Guidance",
        links: [
          { label: "Investing basics", to: "/investing-and-super#basics" },
          { label: "Market insights", to: "/newsroom" },
        ],
      },
    ],
  },
  {
    id: "business",
    label: "Business",
    to: "/business",
    columns: [
      {
        heading: "Accounts & payments",
        links: [
          { label: "Business transaction accounts", to: "/products/business-transaction-account" },
          { label: "Business savings", to: "/business#savings" },
          { label: "Smart terminals & EFTPOS", to: "/products/smart-terminal" },
          { label: "eCommerce payments", to: "/business#ecommerce" },
        ],
      },
      {
        heading: "Finance",
        links: [
          { label: "Business loans", to: "/products/business-loan" },
          { label: "Business overdraft", to: "/business#overdraft" },
          { label: "Equipment & vehicle finance", to: "/business#asset-finance" },
          { label: "Business credit cards", to: "/business#cards" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "CommBiz", to: "/business#commbiz" },
          { label: "Business product selector", to: "/business#selector" },
          { label: "Business support", to: "/support?category=Business" },
        ],
      },
    ],
  },
  {
    id: "institutional",
    label: "Institutional",
    to: "/institutional",
    columns: [
      {
        heading: "Capabilities",
        links: [
          { label: "Global markets", to: "/institutional#markets" },
          { label: "Transaction banking", to: "/institutional#transaction-banking" },
          { label: "Capital markets", to: "/institutional#capital-markets" },
          { label: "Sustainable finance", to: "/institutional#sustainable" },
        ],
      },
      {
        heading: "Industries",
        links: [
          { label: "Resources & energy", to: "/institutional#industries" },
          { label: "Infrastructure", to: "/institutional#industries" },
          { label: "Property", to: "/institutional#industries" },
          { label: "Government", to: "/institutional#industries" },
        ],
      },
      {
        heading: "Insights",
        links: [
          { label: "Economic insights", to: "/newsroom" },
          { label: "CommBiz platform", to: "/business#commbiz" },
        ],
      },
    ],
  },
  {
    id: "commbank-yello",
    label: "CommBank Yello",
    to: "/commbank-yello",
    columns: [
      {
        heading: "Program",
        links: [
          { label: "How Yello works", to: "/commbank-yello#how-it-works" },
          { label: "Tiers & eligibility", to: "/commbank-yello#tiers" },
          { label: "Cashback on CommBank products", to: "/commbank-yello#cashback" },
        ],
      },
      {
        heading: "Offers",
        links: [
          { label: "Partner offers", to: "/commbank-yello#offers" },
          { label: "Yello for business", to: "/business" },
        ],
      },
    ],
  },
];

export const utilityNav: NavLink[] = [
  { label: "Locate us", to: "/locate-us" },
  { label: "Help & support", to: "/support" },
];

export const logOnOptions: NavLink[] = [
  { label: "NetBank", to: "/login", description: "Personal banking" },
  { label: "CommBiz", to: "/login?service=commbiz", description: "Business banking" },
  { label: "CommSec", to: "/login?service=commsec", description: "Share trading" },
];

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Personal",
    links: [
      { label: "Bank accounts", to: "/bank-accounts" },
      { label: "Credit cards", to: "/credit-cards" },
      { label: "Home loans", to: "/home-loans" },
      { label: "Personal loans", to: "/personal-loans" },
      { label: "Insurance", to: "/insurance" },
      { label: "Investing & Super", to: "/investing-and-super" },
    ],
  },
  {
    heading: "Business & institutional",
    links: [
      { label: "Business banking", to: "/business" },
      { label: "Business loans", to: "/products/business-loan" },
      { label: "Smart terminals", to: "/products/smart-terminal" },
      { label: "Institutional", to: "/institutional" },
      { label: "CommBiz", to: "/business#commbiz" },
    ],
  },
  {
    heading: "Digital banking",
    links: [
      { label: "Digital banking", to: "/digital-banking" },
      { label: "NetBank", to: "/digital-banking/netbank" },
      { label: "CommBank app", to: "/digital-banking/app" },
      { label: "Rates & fees", to: "/rates-and-fees" },
      { label: "Tools & calculators", to: "/tools-and-calculators" },
    ],
  },
  {
    heading: "Help & support",
    links: [
      { label: "Support & FAQs", to: "/support" },
      { label: "Contact us", to: "/support/contact-us" },
      { label: "CommBank Safe", to: "/support/security" },
      { label: "Locate us", to: "/locate-us" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
  {
    heading: "About us",
    links: [
      { label: "About CommBank", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Newsroom", to: "/newsroom" },
      { label: "Important information", to: "/important-info" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
];

export const netbankNav: NavLink[] = [
  { label: "My home", to: "/netbank" },
  { label: "Transfer", to: "/netbank/transfer" },
  { label: "Pay", to: "/netbank/pay" },
  { label: "Cards", to: "/netbank/cards" },
  { label: "CommBank Yello", to: "/netbank/yello" },
  { label: "Settings", to: "/netbank/settings" },
];
