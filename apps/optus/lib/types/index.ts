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
  features: string[];
  tag?: string;
  highlight?: boolean;
};

export type HomeInternetPlan = {
  id: string;
  name: string;
  type: "nbn" | "5G Home";
  price: number;
  speed: string;
  features: string[];
};

export type PhoneDevice = {
  id: string;
  name: string;
  brand: string;
  priceFrom: number;
  storage: string;
  colour: string;
};

export type Deal = {
  id: string;
  title: string;
  summary: string;
  badge: string;
  href: string;
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  dueDate: string;
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
};

export type AddOnPurchase = {
  id: string;
  addOnId: string;
  name: string;
  amount: number;
  createdAt: string;
  note: string;
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

export type UsageSnapshot = {
  periodLabel: string;
  dataUsedGb: number;
  dataAllowanceGb: number;
  callsMinutes: number;
  smsCount: number;
};
