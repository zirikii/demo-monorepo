export type DemoTransaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};

export const demoTransactions: DemoTransaction[] = [
  { id: "tx-01", accountId: "acc-everyday", date: "2026-08-03", description: "WOOLWORTHS BONDI", amount: -86.4, category: "Groceries" },
  { id: "tx-02", accountId: "acc-everyday", date: "2026-08-03", description: "TRANSPORT NSW OPAL", amount: -22.5, category: "Transport" },
  { id: "tx-03", accountId: "acc-everyday", date: "2026-08-02", description: "SALARY ACME PTY LTD", amount: 3200.0, category: "Income" },
  { id: "tx-04", accountId: "acc-everyday", date: "2026-08-02", description: "NetBank transfer to Saver", amount: -500.0, category: "Transfers" },
  { id: "tx-05", accountId: "acc-everyday", date: "2026-08-01", description: "UBER TRIP SYDNEY", amount: -18.9, category: "Transport" },
  { id: "tx-06", accountId: "acc-everyday", date: "2026-08-01", description: "SPOTIFY PREMIUM", amount: -13.99, category: "Entertainment" },
  { id: "tx-07", accountId: "acc-everyday", date: "2026-07-31", description: "BPAY AGL ENERGY", amount: -164.2, category: "Bills" },
  { id: "tx-08", accountId: "acc-everyday", date: "2026-07-30", description: "COLES NEWTOWN", amount: -72.15, category: "Groceries" },
  { id: "tx-09", accountId: "acc-everyday", date: "2026-07-29", description: "PayID to Sam Nguyen", amount: -45.0, category: "Transfers" },
  { id: "tx-10", accountId: "acc-everyday", date: "2026-07-28", description: "NETFLIX.COM", amount: -19.99, category: "Entertainment" },
  { id: "tx-11", accountId: "acc-everyday", date: "2026-07-27", description: "CHEMIST WAREHOUSE", amount: -34.5, category: "Health" },
  { id: "tx-12", accountId: "acc-everyday", date: "2026-07-26", description: "OFFICEWORKS BROADWAY", amount: -58.0, category: "Shopping" },
  { id: "tx-13", accountId: "acc-saver", date: "2026-08-02", description: "Transfer from Smart Access", amount: 500.0, category: "Transfers" },
  { id: "tx-14", accountId: "acc-saver", date: "2026-08-01", description: "Interest payment", amount: 22.41, category: "Interest" },
  { id: "tx-15", accountId: "acc-saver", date: "2026-07-15", description: "Transfer from Smart Access", amount: 750.0, category: "Transfers" },
  { id: "tx-16", accountId: "acc-goals", date: "2026-08-01", description: "Auto save — Holiday", amount: 150.0, category: "Transfers" },
  { id: "tx-17", accountId: "acc-goals", date: "2026-07-01", description: "Auto save — Holiday", amount: 150.0, category: "Transfers" },
  { id: "tx-18", accountId: "acc-credit", date: "2026-08-02", description: "JB HI-FI BROADWAY", amount: -249.0, category: "Shopping" },
  { id: "tx-19", accountId: "acc-credit", date: "2026-07-28", description: "QANTAS AIRWAYS", amount: -420.0, category: "Travel" },
  { id: "tx-20", accountId: "acc-credit", date: "2026-07-20", description: "Payment — thank you", amount: 500.0, category: "Payments" },
  { id: "tx-21", accountId: "acc-home", date: "2026-08-01", description: "Home loan repayment", amount: -2850.0, category: "Loan" },
  { id: "tx-22", accountId: "acc-home", date: "2026-07-01", description: "Home loan repayment", amount: -2850.0, category: "Loan" },
  { id: "tx-23", accountId: "acc-everyday", date: "2026-07-25", description: "MENYLOGGE CAFE", amount: -16.5, category: "Dining" },
  { id: "tx-24", accountId: "acc-everyday", date: "2026-07-24", description: "CITY OF SYDNEY PARKING", amount: -8.0, category: "Transport" },
  { id: "tx-25", accountId: "acc-everyday", date: "2026-07-22", description: "AMAZON MARKETPLACE", amount: -63.8, category: "Shopping" },
  { id: "tx-26", accountId: "acc-everyday", date: "2026-07-21", description: "Medibank Private", amount: -142.0, category: "Health" },
  { id: "tx-27", accountId: "acc-everyday", date: "2026-07-18", description: "Bunnings Alexandria", amount: -97.35, category: "Home" },
  { id: "tx-28", accountId: "acc-everyday", date: "2026-07-16", description: "PayID from Alex Chen", amount: 80.0, category: "Transfers" },
];
