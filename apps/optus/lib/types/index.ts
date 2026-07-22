export type SessionUser = { id: string; email: string; name: string };

export type Plan = {
  id: string;
  name: string;
  category: "Mobile" | "Prepaid" | "Internet";
  price: number;
  billing: string;
  data: string;
  speed?: string;
  features: string[];
  tag?: string;
  popular?: boolean;
  unavailable?: boolean;
};

export type Service = {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Order pending" | "Needs attention";
  usagePercent: number;
  usageLabel: string;
  renewsAt: string;
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
  active: boolean;
};
export type SupportCase = {
  id: string;
  subject: string;
  service: string;
  status: "Open" | "Waiting" | "Resolved";
  priority: "Low" | "Medium" | "High";
  updatedAt: string;
};
export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
};
export type Integration = { id: string; name: string; description: string; connected: boolean };
export type UserRecord = SessionUser & { password: string; createdAt: string };
export type TopUp = { id: string; amount: number; method: string; createdAt: string; note: string };
