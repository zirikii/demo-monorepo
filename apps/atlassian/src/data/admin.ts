export interface DirectoryUser {
  email: string;
  name: string;
  role: string;
  products: string[];
}

export interface AdminSettings {
  twoStepLogin: boolean;
  publicSignup: boolean;
}

export const DIRECTORY_USERS: DirectoryUser[] = [
  {
    email: "demo@atlassian.com",
    name: "Maya Chen",
    role: "Product delivery lead",
    products: ["Jira", "Confluence", "Trello", "Loom"],
  },
  {
    email: "admin@atlassian.com",
    name: "Jordan Hale",
    role: "Site admin",
    products: ["Jira", "Jira Service Management", "Admin"],
  },
  {
    email: "rovo@atlassian.com",
    name: "Priya Raman",
    role: "AI enablement partner",
    products: ["Rovo", "Confluence", "Jira"],
  },
  {
    email: "sam.okonkwo@northline.demo",
    name: "Sam Okonkwo",
    role: "Engineer",
    products: ["Jira", "Bitbucket"],
  },
  {
    email: "nadia.fischer@northline.demo",
    name: "Nadia Fischer",
    role: "Designer",
    products: ["Jira", "Trello", "Loom"],
  },
];

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  twoStepLogin: true,
  publicSignup: false,
};
