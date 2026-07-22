export type SessionUser = { id: string; name: string; email: string };
export type FleetStatus = "Active" | "Suspended" | "Pending";
export type FleetDevice = {
  id: string;
  user: string;
  serviceNumber: string;
  device: string;
  plan: string;
  costCentre: string;
  usageGb: number;
  includedGb: number;
  monthlyCost: number;
  status: FleetStatus;
  roaming: boolean;
  location: string;
};
export type Invoice = {
  id: string;
  month: string;
  amount: number;
  status: "Paid" | "Due" | "Review";
  dueDate: string;
  costCentre: string;
};
export type ServiceHealth = {
  id: string;
  name: string;
  category: "Mobile" | "Broadband" | "Voice" | "5G";
  region: string;
  uptime: number;
  incidents: number;
  status: "Operational" | "Maintenance" | "Degraded";
};
export type ReportSubscription = {
  id: string;
  name: string;
  cadence: "Daily" | "Weekly" | "Monthly";
  owner: string;
  enabled: boolean;
  lastRun: string;
};
export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Cost Centre Manager" | "End User";
  status: "Active" | "Invited";
};
export type Integration = { id: string; name: string; description: string; connected: boolean };
export type SettingsStore = {
  profile: { company: string; contactName: string; contactEmail: string; billingAccount: string };
  team: TeamMember[];
  integrations: Integration[];
};
