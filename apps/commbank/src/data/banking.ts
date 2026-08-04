export type Account = {
  id: string;
  name: string;
  type: "transaction" | "savings" | "credit" | "home-loan";
  number: string;
  balance: number;
  available: number;
  bsb?: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  category: string;
  reference: string;
  amount: number;
};

export const accounts: Account[] = [
  {
    id: "smart-access",
    name: "Everyday Smart Access",
    type: "transaction",
    number: "06432112345678",
    bsb: "062-000",
    balance: 6842.18,
    available: 6842.18,
  },
  {
    id: "goalsaver",
    name: "GoalSaver",
    type: "savings",
    number: "06432187654321",
    bsb: "062-000",
    balance: 28750.45,
    available: 28750.45,
  },
  {
    id: "awards-card",
    name: "Awards Platinum",
    type: "credit",
    number: "5423123412348842",
    balance: -1948.32,
    available: 8051.68,
  },
  {
    id: "home-loan",
    name: "Complete Home Loan",
    type: "home-loan",
    number: "06432145500291",
    balance: -612480.74,
    available: 12340.18,
  },
];

const transactionSeeds = [
  ["Woolworths Town Hall", "Groceries", -86.42],
  ["Salary ACME Design Studio", "Income", 4286.15],
  ["Opal Travel", "Transport", -50],
  ["The Grounds Alexandria", "Dining", -34.8],
  ["AGL Energy", "Bills", -168.24],
  ["Netflix.com", "Entertainment", -22.99],
  ["Bunnings Alexandria", "Home", -124.5],
  ["Chemist Warehouse", "Health", -37.45],
  ["Sydney Water", "Bills", -91.2],
  ["Transfer to GoalSaver", "Transfer", -500],
  ["Qantas Airways", "Travel", -624.2],
  ["Uber Australia", "Transport", -28.17],
  ["Coles Broadway", "Groceries", -72.63],
  ["Telstra Mobile", "Bills", -65],
  ["Commonwealth Home Loan", "Home loan", -3412.56],
  ["Interest earned", "Interest", 104.33],
  ["Apple Services", "Entertainment", -14.99],
  ["Australian Taxation Office", "Income", 842.15],
] as const;

export const transactions: Transaction[] = Array.from({ length: 42 }, (_, index) => {
  const seed = transactionSeeds[index % transactionSeeds.length] ?? [
    "Card purchase",
    "Other",
    -10,
  ];
  const date = new Date(Date.UTC(2026, 7, 3 - index));
  const accountId = index % 7 === 0 ? "awards-card" : index % 11 === 0 ? "goalsaver" : "smart-access";
  return {
    id: `txn-${index + 1}`,
    accountId,
    date: date.toISOString().slice(0, 10),
    description: seed[0],
    category: seed[1],
    reference: `CB${String(902140 + index).padStart(8, "0")}`,
    amount: Number((seed[2] * (index > 17 ? 0.85 : 1)).toFixed(2)),
  };
});

export const billers = [
  { code: "131313", name: "AGL Energy", reference: "8820 4100 75" },
  { code: "454545", name: "Sydney Water", reference: "2201 5539 01" },
  { code: "237237", name: "Telstra", reference: "0402 555 018" },
];

export const scheduledPayments = [
  { name: "Home loan repayment", date: "2026-08-07", amount: 3412.56 },
  { name: "Transfer to GoalSaver", date: "2026-08-12", amount: 500 },
  { name: "AGL Energy", date: "2026-08-18", amount: 168.24 },
];

export const statements = [
  { account: "Everyday Smart Access", period: "July 2026", created: "2026-08-01" },
  { account: "Awards Platinum", period: "July 2026", created: "2026-07-29" },
  { account: "Everyday Smart Access", period: "June 2026", created: "2026-07-01" },
  { account: "GoalSaver", period: "April–June 2026", created: "2026-07-01" },
];

export const messages = [
  { id: "m1", subject: "Your July statement is ready", date: "2026-08-01" },
  { id: "m2", subject: "Tips to help protect yourself from scams", date: "2026-07-28" },
  { id: "m3", subject: "Your GoalSaver progress this month", date: "2026-07-20" },
];
