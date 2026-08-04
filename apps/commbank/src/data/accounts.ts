export type DemoAccount = {
  id: string;
  name: string;
  type: "everyday" | "saver" | "credit" | "home-loan";
  bsb: string;
  number: string;
  balance: number;
  available: number;
};

export const demoAccounts: DemoAccount[] = [
  {
    id: "acc-everyday",
    name: "Smart Access",
    type: "everyday",
    bsb: "062-000",
    number: "12345678",
    balance: 4287.63,
    available: 4287.63,
  },
  {
    id: "acc-saver",
    name: "NetBank Saver",
    type: "saver",
    bsb: "062-000",
    number: "87654321",
    balance: 18540.12,
    available: 18540.12,
  },
  {
    id: "acc-goals",
    name: "GoalSaver — Holiday",
    type: "saver",
    bsb: "062-000",
    number: "44556677",
    balance: 3200.0,
    available: 3200.0,
  },
  {
    id: "acc-credit",
    name: "Awards Credit Card",
    type: "credit",
    bsb: "062-000",
    number: "4000123456789010",
    balance: -842.55,
    available: 7157.45,
  },
  {
    id: "acc-home",
    name: "Home Loan — Variable",
    type: "home-loan",
    bsb: "062-000",
    number: "99887766",
    balance: -520450.0,
    available: 12400.0,
  },
];
