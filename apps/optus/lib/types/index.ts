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
  features: string[];
  tag?: string;
  highlight?: boolean;
};

export type Phone = {
  id: string;
  brand: string;
  name: string;
  colour: string;
  outright: number;
  monthly: number;
  term: number;
  storage: string;
  tag?: string;
};

export type InternetPlan = {
  id: string;
  name: string;
  type: "nbn" | "5G Home";
  price: number;
  speed: string;
  typicalEvening: string;
  features: string[];
  highlight?: boolean;
};

export type PrepaidPlan = {
  id: string;
  name: string;
  price: number;
  data: string;
  expiry: string;
  features: string[];
  highlight?: boolean;
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  dueDate: string;
};

export type Recharge = {
  id: string;
  amount: number;
  method: string;
  service: string;
  createdAt: string;
};

export type Store = {
  id: string;
  name: string;
  suburb: string;
  state: string;
  address: string;
  hours: string;
  flagship?: boolean;
};

export type Deal = {
  id: string;
  title: string;
  category: "Mobile" | "Internet" | "Entertainment" | "Device";
  blurb: string;
  ends: string;
};

export type EntertainmentTile = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  category: "Sport" | "Streaming" | "Bundle";
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

export type ProfileSettings = {
  name: string;
  email: string;
  mobile: string;
  marketingOptIn: boolean;
};

export type SettingsFile = {
  team: TeamMember[];
  integrations: Integration[];
  profile: ProfileSettings;
};

export type UserRecord = SessionUser & {
  password: string;
  createdAt: string;
};
