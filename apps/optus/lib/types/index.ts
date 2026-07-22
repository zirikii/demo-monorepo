export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export type MobilePlan = {
  id: string;
  name: string;
  price: number;
  data: string;
  dataNote?: string;
  network: "4G" | "5G";
  contract: "SIM only" | "Month to month";
  features: string[];
  tag?: string;
  highlight?: boolean;
};

export type PrepaidPlan = {
  id: string;
  name: string;
  price: number;
  data: string;
  expiry: string;
  features: string[];
  tag?: string;
};

export type BroadbandPlan = {
  id: string;
  name: string;
  type: "nbn" | "5G Home";
  price: number;
  speed: string;
  typicalEvening: string;
  features: string[];
  highlight?: boolean;
};

export type Phone = {
  id: string;
  brand: string;
  name: string;
  priceOutright: number;
  price24: number;
  price36: number;
  colours: string[];
  storage: string;
  tag?: string;
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  dueDate: string;
  service: string;
};

export type TopUp = {
  id: string;
  amount: number;
  method: string;
  createdAt: string;
  note: string;
};

export type Store = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  hours: string;
  flagship?: boolean;
};

export type SportFixture = {
  id: string;
  competition: string;
  home: string;
  away: string;
  kickoff: string;
  venue: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Account holder" | "Admin" | "Member";
};

export type Integration = {
  id: string;
  name: string;
  description: string;
  connected: boolean;
};

export type UserRecord = SessionUser & {
  password: string;
  createdAt: string;
};
