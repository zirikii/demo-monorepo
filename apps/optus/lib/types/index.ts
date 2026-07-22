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
  network: string;
  features: string[];
  tag?: string;
};

export type HomeInternetPlan = {
  id: string;
  name: string;
  type: "NBN" | "5G Home";
  price: number;
  speed: string;
  data: string;
  features: string[];
  tag?: string;
};

export type Phone = {
  id: string;
  name: string;
  brand: string;
  priceFrom: number;
  upfront: number;
  storage: string;
  tag?: string;
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  dueDate: string;
};

export type UsageMetric = {
  id: string;
  label: string;
  used: string;
  limit: string;
  pct: number;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
  category: "Roaming" | "Entertainment" | "Data" | "Calling" | "Support";
  description: string;
  active: boolean;
  purchasedAt?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
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
