export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export type TravelPack = {
  id: string;
  price: number;
  data: string;
  dataNote?: string;
  talkNz: string;
  talkIntl: string;
  textNz: string;
  textIntl: string;
  duration: string;
  features: string[];
  highlight?: boolean;
};

export type MobilePlan = {
  id: string;
  name: string;
  price: number;
  data: string;
  features: string[];
  tag?: string;
};

export type BroadbandPlan = {
  id: string;
  name: string;
  type: "Fibre" | "Wireless";
  price: number;
  speed: string;
  features: string[];
};

export type Bill = {
  id: string;
  period: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  dueDate: string;
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
  address: string;
  hours: string;
  airport?: boolean;
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
