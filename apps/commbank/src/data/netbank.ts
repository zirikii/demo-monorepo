export type AccountKind = "transaction" | "savings" | "credit" | "loan" | "super";

export type NetBankAccount = {
  id: string;
  name: string;
  kind: AccountKind;
  bsb: string;
  number: string;
  balance: number;
  available: number;
  /** Credit cards and loans carry a limit; deposit accounts don't. */
  limit?: number;
  interestRate?: number;
};

export const seedAccounts: NetBankAccount[] = [
  {
    id: "smart-access",
    name: "Everyday Account Smart Access",
    kind: "transaction",
    bsb: "062000",
    number: "10294857",
    balance: 4218.63,
    available: 4218.63,
  },
  {
    id: "netbank-saver",
    name: "NetBank Saver",
    kind: "savings",
    bsb: "062000",
    number: "10294863",
    balance: 18450.2,
    available: 18450.2,
    interestRate: 5.2,
  },
  {
    id: "goalsaver",
    name: "GoalSaver — House deposit",
    kind: "savings",
    bsb: "062000",
    number: "10294871",
    balance: 62310.0,
    available: 62310.0,
    interestRate: 5.0,
  },
  {
    id: "awards-card",
    name: "Ultimate Awards credit card",
    kind: "credit",
    bsb: "",
    number: "8842",
    balance: -1284.55,
    available: 8715.45,
    limit: 10000,
    interestRate: 20.99,
  },
  {
    id: "home-loan",
    name: "Standard Variable Rate home loan",
    kind: "loan",
    bsb: "062000",
    number: "20558431",
    balance: -486230.11,
    available: 12480.0,
    interestRate: 5.89,
  },
  {
    id: "essential-super",
    name: "Essential Super",
    kind: "super",
    bsb: "",
    number: "ES-4471902",
    balance: 128944.72,
    available: 128944.72,
  },
];

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  category: string;
  amount: number;
};

export const seedTransactions: Transaction[] = [
  {
    id: "t1",
    accountId: "smart-access",
    date: "2026-08-03",
    description: "Woolworths Bondi Junction",
    category: "Groceries",
    amount: -142.85,
  },
  {
    id: "t2",
    accountId: "smart-access",
    date: "2026-08-03",
    description: "Transport for NSW Opal",
    category: "Transport",
    amount: -8.9,
  },
  {
    id: "t3",
    accountId: "smart-access",
    date: "2026-08-02",
    description: "Salary — Atlas Consulting Pty Ltd",
    category: "Income",
    amount: 4820.0,
  },
  {
    id: "t4",
    accountId: "smart-access",
    date: "2026-08-02",
    description: "Ampol Foodary Waterloo",
    category: "Fuel",
    amount: -78.42,
  },
  {
    id: "t5",
    accountId: "smart-access",
    date: "2026-08-01",
    description: "Direct debit — Origin Energy",
    category: "Utilities",
    amount: -214.6,
  },
  {
    id: "t6",
    accountId: "smart-access",
    date: "2026-08-01",
    description: "Transfer to NetBank Saver",
    category: "Transfer",
    amount: -1000.0,
  },
  {
    id: "t7",
    accountId: "smart-access",
    date: "2026-07-31",
    description: "Netflix.com",
    category: "Entertainment",
    amount: -22.99,
  },
  {
    id: "t8",
    accountId: "smart-access",
    date: "2026-07-31",
    description: "Coles Express Randwick",
    category: "Groceries",
    amount: -34.15,
  },
  {
    id: "t9",
    accountId: "smart-access",
    date: "2026-07-30",
    description: "Bakemono Ramen Surry Hills",
    category: "Dining",
    amount: -46.5,
  },
  {
    id: "t10",
    accountId: "smart-access",
    date: "2026-07-30",
    description: "BPAY — Sydney Water",
    category: "Utilities",
    amount: -186.3,
  },
  {
    id: "t11",
    accountId: "smart-access",
    date: "2026-07-29",
    description: "Officeworks Alexandria",
    category: "Shopping",
    amount: -119.0,
  },
  {
    id: "t12",
    accountId: "smart-access",
    date: "2026-07-29",
    description: "PayID from J Nguyen",
    category: "Transfer",
    amount: 65.0,
  },
  {
    id: "t13",
    accountId: "smart-access",
    date: "2026-07-28",
    description: "Uber Eats",
    category: "Dining",
    amount: -52.4,
  },
  {
    id: "t14",
    accountId: "smart-access",
    date: "2026-07-28",
    description: "Chemist Warehouse Maroubra",
    category: "Health",
    amount: -27.95,
  },
  {
    id: "t15",
    accountId: "smart-access",
    date: "2026-07-27",
    description: "Anytime Fitness membership",
    category: "Health",
    amount: -21.95,
  },
  {
    id: "t16",
    accountId: "smart-access",
    date: "2026-07-26",
    description: "Bunnings Warehouse Alexandria",
    category: "Home",
    amount: -243.7,
  },
  {
    id: "t17",
    accountId: "smart-access",
    date: "2026-07-26",
    description: "Spotify AB",
    category: "Entertainment",
    amount: -13.99,
  },
  {
    id: "t18",
    accountId: "smart-access",
    date: "2026-07-25",
    description: "Woolworths Metro Kings Cross",
    category: "Groceries",
    amount: -61.2,
  },
  {
    id: "t19",
    accountId: "smart-access",
    date: "2026-07-24",
    description: "Transfer to home loan",
    category: "Transfer",
    amount: -500.0,
  },
  {
    id: "t20",
    accountId: "smart-access",
    date: "2026-07-24",
    description: "Sushi Hotaru Sydney",
    category: "Dining",
    amount: -38.8,
  },
  {
    id: "t21",
    accountId: "smart-access",
    date: "2026-07-23",
    description: "Amazon AU Marketplace",
    category: "Shopping",
    amount: -89.99,
  },
  {
    id: "t22",
    accountId: "smart-access",
    date: "2026-07-22",
    description: "Salary — Atlas Consulting Pty Ltd",
    category: "Income",
    amount: 4820.0,
  },
  {
    id: "t23",
    accountId: "smart-access",
    date: "2026-07-22",
    description: "Rent — Harcourts Property",
    category: "Housing",
    amount: -1150.0,
  },
  {
    id: "t24",
    accountId: "smart-access",
    date: "2026-07-21",
    description: "Kmart Eastgardens",
    category: "Shopping",
    amount: -74.5,
  },
  {
    id: "t25",
    accountId: "smart-access",
    date: "2026-07-20",
    description: "Telstra postpaid",
    category: "Utilities",
    amount: -79.0,
  },
  {
    id: "t26",
    accountId: "smart-access",
    date: "2026-07-19",
    description: "Single Origin Roasters",
    category: "Dining",
    amount: -11.5,
  },
  {
    id: "t27",
    accountId: "smart-access",
    date: "2026-07-18",
    description: "IGA Clovelly",
    category: "Groceries",
    amount: -47.85,
  },

  {
    id: "s1",
    accountId: "netbank-saver",
    date: "2026-08-01",
    description: "Transfer from Smart Access",
    category: "Transfer",
    amount: 1000.0,
  },
  {
    id: "s2",
    accountId: "netbank-saver",
    date: "2026-07-31",
    description: "Credit interest",
    category: "Interest",
    amount: 76.44,
  },
  {
    id: "s3",
    accountId: "netbank-saver",
    date: "2026-07-01",
    description: "Transfer from Smart Access",
    category: "Transfer",
    amount: 1000.0,
  },
  {
    id: "s4",
    accountId: "netbank-saver",
    date: "2026-06-30",
    description: "Credit interest",
    category: "Interest",
    amount: 71.9,
  },
  {
    id: "s5",
    accountId: "netbank-saver",
    date: "2026-06-14",
    description: "Transfer to Smart Access",
    category: "Transfer",
    amount: -2500.0,
  },

  {
    id: "g1",
    accountId: "goalsaver",
    date: "2026-07-31",
    description: "Bonus interest",
    category: "Interest",
    amount: 254.12,
  },
  {
    id: "g2",
    accountId: "goalsaver",
    date: "2026-07-15",
    description: "Transfer from Smart Access",
    category: "Transfer",
    amount: 2000.0,
  },
  {
    id: "g3",
    accountId: "goalsaver",
    date: "2026-06-30",
    description: "Bonus interest",
    category: "Interest",
    amount: 246.03,
  },
  {
    id: "g4",
    accountId: "goalsaver",
    date: "2026-06-15",
    description: "Transfer from Smart Access",
    category: "Transfer",
    amount: 2000.0,
  },

  {
    id: "c1",
    accountId: "awards-card",
    date: "2026-08-03",
    description: "Qantas Airways",
    category: "Travel",
    amount: -486.2,
  },
  {
    id: "c2",
    accountId: "awards-card",
    date: "2026-08-01",
    description: "David Jones Elizabeth St",
    category: "Shopping",
    amount: -214.0,
  },
  {
    id: "c3",
    accountId: "awards-card",
    date: "2026-07-30",
    description: "Apple Store Sydney",
    category: "Shopping",
    amount: -329.0,
  },
  {
    id: "c4",
    accountId: "awards-card",
    date: "2026-07-28",
    description: "Payment received — thank you",
    category: "Payment",
    amount: 1500.0,
  },
  {
    id: "c5",
    accountId: "awards-card",
    date: "2026-07-25",
    description: "Booking.com",
    category: "Travel",
    amount: -412.35,
  },
  {
    id: "c6",
    accountId: "awards-card",
    date: "2026-07-21",
    description: "The Grounds of Alexandria",
    category: "Dining",
    amount: -87.0,
  },
  {
    id: "c7",
    accountId: "awards-card",
    date: "2026-07-18",
    description: "Event Cinemas George St",
    category: "Entertainment",
    amount: -56.0,
  },
  {
    id: "c8",
    accountId: "awards-card",
    date: "2026-07-15",
    description: "Monthly fee",
    category: "Fees",
    amount: -35.0,
  },

  {
    id: "h1",
    accountId: "home-loan",
    date: "2026-08-01",
    description: "Loan repayment",
    category: "Repayment",
    amount: 3142.18,
  },
  {
    id: "h2",
    accountId: "home-loan",
    date: "2026-07-31",
    description: "Interest charged",
    category: "Interest",
    amount: -2387.44,
  },
  {
    id: "h3",
    accountId: "home-loan",
    date: "2026-07-24",
    description: "Additional repayment",
    category: "Repayment",
    amount: 500.0,
  },
  {
    id: "h4",
    accountId: "home-loan",
    date: "2026-07-01",
    description: "Loan repayment",
    category: "Repayment",
    amount: 3142.18,
  },
  {
    id: "h5",
    accountId: "home-loan",
    date: "2026-06-30",
    description: "Interest charged",
    category: "Interest",
    amount: -2401.09,
  },
];

export type Payee = {
  id: string;
  name: string;
  type: "Bank account" | "BPAY" | "PayID";
  detail: string;
  lastPaid?: string;
};

export const seedPayees: Payee[] = [
  {
    id: "p1",
    name: "Jordan Nguyen",
    type: "PayID",
    detail: "0412 884 902",
    lastPaid: "2026-07-29",
  },
  {
    id: "p2",
    name: "Harcourts Property Rent",
    type: "Bank account",
    detail: "062-014 · 10038472",
    lastPaid: "2026-07-22",
  },
  {
    id: "p3",
    name: "Sydney Water",
    type: "BPAY",
    detail: "Biller 4321 · Ref 8827194003",
    lastPaid: "2026-07-30",
  },
  {
    id: "p4",
    name: "Origin Energy",
    type: "BPAY",
    detail: "Biller 1234 · Ref 5540019287",
    lastPaid: "2026-08-01",
  },
  {
    id: "p5",
    name: "Telstra",
    type: "BPAY",
    detail: "Biller 9999 · Ref 3390014782",
    lastPaid: "2026-07-20",
  },
  {
    id: "p6",
    name: "Priya Sharma",
    type: "Bank account",
    detail: "013-006 · 442890117",
    lastPaid: "2026-06-18",
  },
  { id: "p7", name: "Northside Plumbing", type: "Bank account", detail: "082-001 · 118804263" },
  {
    id: "p8",
    name: "Anytime Fitness Bondi",
    type: "Bank account",
    detail: "062-199 · 10029384",
    lastPaid: "2026-07-27",
  },
];

export type DemoCard = {
  id: string;
  name: string;
  last4: string;
  bin: string;
  scheme: "Debit Mastercard" | "Mastercard";
  expiry: string;
  accountId: string;
  locked: boolean;
  blockInternational: boolean;
  travelNotice: boolean;
};

export const seedCards: DemoCard[] = [
  {
    id: "card-debit",
    name: "Debit Mastercard",
    last4: "4021",
    bin: "5163",
    scheme: "Debit Mastercard",
    expiry: "07/29",
    accountId: "smart-access",
    locked: false,
    blockInternational: false,
    travelNotice: false,
  },
  {
    id: "card-credit",
    name: "Ultimate Awards credit card",
    last4: "8842",
    bin: "5520",
    scheme: "Mastercard",
    expiry: "11/28",
    accountId: "awards-card",
    locked: false,
    blockInternational: true,
    travelNotice: false,
  },
];

export type Statement = {
  id: string;
  accountId: string;
  period: string;
  issued: string;
  sizeKb: number;
};

export const seedStatements: Statement[] = [
  {
    id: "st1",
    accountId: "smart-access",
    period: "1 – 31 July 2026",
    issued: "2026-08-01",
    sizeKb: 148,
  },
  {
    id: "st2",
    accountId: "smart-access",
    period: "1 – 30 June 2026",
    issued: "2026-07-01",
    sizeKb: 152,
  },
  {
    id: "st3",
    accountId: "smart-access",
    period: "1 – 31 May 2026",
    issued: "2026-06-01",
    sizeKb: 145,
  },
  {
    id: "st4",
    accountId: "awards-card",
    period: "16 June – 15 July 2026",
    issued: "2026-07-16",
    sizeKb: 96,
  },
  {
    id: "st5",
    accountId: "awards-card",
    period: "16 May – 15 June 2026",
    issued: "2026-06-16",
    sizeKb: 91,
  },
  {
    id: "st6",
    accountId: "home-loan",
    period: "1 January – 30 June 2026",
    issued: "2026-07-05",
    sizeKb: 210,
  },
  {
    id: "st7",
    accountId: "netbank-saver",
    period: "1 January – 30 June 2026",
    issued: "2026-07-05",
    sizeKb: 88,
  },
];

export const quickLinks = [
  { label: "Transfer & pay", to: "/netbank/transfer" },
  { label: "Payees & BPAY", to: "/netbank/payees" },
  { label: "Cards", to: "/netbank/cards" },
  { label: "Statements", to: "/netbank/statements" },
  { label: "CommBank Yello", to: "/netbank/yello" },
  { label: "Settings", to: "/netbank/settings" },
];
