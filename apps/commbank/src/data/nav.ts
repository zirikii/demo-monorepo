export type NavLink = { label: string; to: string; description?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { id: string; label: string; to: string; columns: NavColumn[] };

export const primaryNav: NavItem[] = [
  {
    id: "banking",
    label: "Banking",
    to: "/banking",
    columns: [
      {
        heading: "Bank & savings accounts",
        links: [
          { label: "Everyday bank accounts", to: "/banking/bank-accounts" },
          { label: "Savings accounts", to: "/banking/savings-accounts" },
          { label: "Term Deposits", to: "/banking/savings-accounts#term-deposits" },
          { label: "Accounts for under 18s", to: "/banking/bank-accounts#youth" },
        ],
      },
      {
        heading: "Cards & lending",
        links: [
          { label: "Credit cards", to: "/banking/credit-cards" },
          { label: "Debit cards", to: "/banking/bank-accounts#debit-cards" },
          { label: "Personal loans & car loans", to: "/banking/personal-loans" },
          { label: "Personal Overdraft", to: "/banking/personal-loans#overdraft" },
        ],
      },
      {
        heading: "International & travel",
        links: [
          { label: "Travel products & services", to: "/banking/international-travel" },
          { label: "Overseas payments", to: "/banking/international-travel#transfers" },
          { label: "Foreign exchange calculator", to: "/banking/international-travel#fx" },
          { label: "Travel Money Card", to: "/banking/international-travel#travel-money" },
        ],
      },
      {
        heading: "Digital banking",
        links: [
          { label: "Digital banking overview", to: "/digital-banking" },
          { label: "NetBank", to: "/digital-banking/netbank" },
          { label: "CommBank app", to: "/digital-banking/app" },
          { label: "Rates & fees", to: "/products/interest-rates-and-fees" },
        ],
      },
    ],
  },
  {
    id: "home-loans",
    label: "Home loans",
    to: "/home-loans",
    columns: [
      {
        heading: "Home loans",
        links: [
          { label: "Home loans overview", to: "/home-loans" },
          { label: "Digi Home Loan", to: "/home-loans#digi-home-loan" },
          { label: "Standard Variable Rate", to: "/home-loans#standard-variable-rate" },
          { label: "Simple Home Loan", to: "/home-loans#simple-home-loan" },
        ],
      },
      {
        heading: "Rates & calculators",
        links: [
          { label: "Home loan interest rates", to: "/home-loans/rates" },
          { label: "Repayments calculator", to: "/home-loans/calculator" },
          { label: "Borrowing power calculator", to: "/tools-and-calculators#borrowing-power" },
          { label: "Wealth Package", to: "/home-loans/rates#wealth-package" },
        ],
      },
      {
        heading: "Life stages",
        links: [
          { label: "Buying your first home", to: "/home-loans#first-home-buyer" },
          { label: "Refinancing your home", to: "/home-loans#refinancing" },
          { label: "Investing in property", to: "/home-loans#investing" },
          { label: "Buying your next home", to: "/home-loans#next-home" },
        ],
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    to: "/insurance",
    columns: [
      {
        heading: "Home & car",
        links: [
          { label: "Home insurance", to: "/insurance#home-insurance" },
          { label: "Landlord insurance", to: "/insurance#landlord-insurance" },
          { label: "Car insurance", to: "/insurance#car-insurance" },
        ],
      },
      {
        heading: "Life & travel",
        links: [
          { label: "Travel insurance", to: "/insurance#travel-insurance" },
          { label: "Life insurance", to: "/insurance#life-insurance" },
          { label: "Pet insurance", to: "/insurance#pet-insurance" },
        ],
      },
      {
        heading: "Manage",
        links: [
          { label: "Make a claim", to: "/support#claims" },
          { label: "Brochures & forms", to: "/important-info" },
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
          { label: "Share trading with CommSec", to: "/investing-and-super#commsec" },
          { label: "Exchange traded funds", to: "/investing-and-super#etfs" },
          { label: "Managed funds", to: "/investing-and-super#managed-funds" },
        ],
      },
      {
        heading: "Superannuation",
        links: [
          { label: "Essential Super", to: "/investing-and-super#essential-super" },
          { label: "Consolidate your super", to: "/investing-and-super#consolidate" },
          { label: "Retirement planning", to: "/investing-and-super#retirement" },
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
        heading: "Bank accounts",
        links: [
          { label: "Business Transaction Account", to: "/business#transaction-account" },
          { label: "Business Online Saver", to: "/business#online-saver" },
          { label: "Savings & term deposits", to: "/business#savings" },
        ],
      },
      {
        heading: "Merchant services & payments",
        links: [
          { label: "EFTPOS terminals", to: "/business#eftpos" },
          { label: "Take payments online", to: "/business#ecommerce" },
          { label: "Merchant support hub", to: "/support#merchant" },
        ],
      },
      {
        heading: "Business loans & finance",
        links: [
          { label: "BetterBusiness Loan", to: "/business#betterbusiness-loan" },
          { label: "Business Overdraft", to: "/business#business-overdraft" },
          { label: "Car & equipment finance", to: "/business#equipment-finance" },
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
        heading: "Institutional banking",
        links: [
          { label: "Global markets", to: "/institutional#global-markets" },
          { label: "Transaction banking", to: "/institutional#transaction-banking" },
          { label: "Capital markets", to: "/institutional#capital-markets" },
        ],
      },
      {
        heading: "Insights",
        links: [
          { label: "Economic insights", to: "/newsroom" },
          { label: "Sustainable finance", to: "/institutional#sustainable-finance" },
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
        heading: "CommBank Yello",
        links: [
          { label: "How Yello works", to: "/commbank-yello" },
          { label: "Tiers & eligibility", to: "/commbank-yello#tiers" },
          { label: "Benefits & offers", to: "/commbank-yello#benefits" },
        ],
      },
    ],
  },
];

export const logonOptions: NavLink[] = [
  { label: "NetBank log on", to: "/logon?service=netbank", description: "Personal banking" },
  { label: "CommBiz log on", to: "/logon?service=commbiz", description: "Business banking" },
  { label: "CommSec log on", to: "/logon?service=commsec", description: "Share trading" },
];

export const utilityNav: NavLink[] = [
  { label: "Locate us", to: "/locate-us" },
  { label: "Help & support", to: "/support" },
];

export const popularSearches: NavLink[] = [
  { label: "Activate a CommBank card", to: "/support" },
  { label: "Foreign exchange calculator", to: "/banking/international-travel#fx" },
  { label: "Cardless cash", to: "/digital-banking/app" },
  { label: "Interest rates & fees", to: "/products/interest-rates-and-fees" },
  { label: "Home loan repayments", to: "/home-loans/calculator" },
  { label: "Report a scam", to: "/security" },
];

export type FooterColumn = { heading: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Personal",
    links: [
      { label: "Bank accounts", to: "/banking/bank-accounts" },
      { label: "Savings accounts", to: "/banking/savings-accounts" },
      { label: "Credit cards", to: "/banking/credit-cards" },
      { label: "Home loans", to: "/home-loans" },
      { label: "Personal loans", to: "/banking/personal-loans" },
      { label: "Insurance", to: "/insurance" },
    ],
  },
  {
    heading: "Business & institutional",
    links: [
      { label: "Business banking", to: "/business" },
      { label: "EFTPOS & eCommerce", to: "/business#eftpos" },
      { label: "Business loans & finance", to: "/business#betterbusiness-loan" },
      { label: "Institutional banking", to: "/institutional" },
      { label: "Investing & Super", to: "/investing-and-super" },
    ],
  },
  {
    heading: "Rates & tools",
    links: [
      { label: "Interest rates & fees", to: "/products/interest-rates-and-fees" },
      { label: "Tools & calculators", to: "/tools-and-calculators" },
      { label: "Home loan repayments", to: "/home-loans/calculator" },
      { label: "Foreign exchange calculator", to: "/banking/international-travel#fx" },
      { label: "Home loan rates", to: "/home-loans/rates" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help & support", to: "/support" },
      { label: "Locate us", to: "/locate-us" },
      { label: "Security & scams", to: "/security" },
      { label: "Digital banking", to: "/digital-banking" },
      { label: "Register for NetBank", to: "/register" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Newsroom", to: "/newsroom" },
      { label: "Important information", to: "/important-info" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms of use", to: "/terms" },
  { label: "Accessibility", to: "/accessibility" },
  { label: "Important information", to: "/important-info" },
];
