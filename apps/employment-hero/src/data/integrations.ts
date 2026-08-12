import type { Integration } from "./types";

export const integrations: Integration[] = [
  {
    name: "Xero",
    category: "Accounting",
    description: "Push finalised pay runs into your general ledger with the right account mapping.",
  },
  {
    name: "MYOB",
    category: "Accounting",
    description: "Sync journals, superannuation liabilities and payroll clearing accounts.",
  },
  {
    name: "QuickBooks",
    category: "Accounting",
    description: "Post payroll journals automatically after each finalised pay event.",
  },
  {
    name: "NetSuite",
    category: "Accounting",
    description: "Map cost centres and departments to your NetSuite subsidiary structure.",
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    description: "Create and suspend accounts as part of onboarding and offboarding.",
  },
  {
    name: "Microsoft 365",
    category: "Productivity",
    description: "Provision mailboxes, licences and group membership on the new starter's first day.",
  },
  {
    name: "Slack",
    category: "Comms",
    description: "Post shout-outs, leave approvals and pay run reminders into the right channels.",
  },
  {
    name: "Microsoft Teams",
    category: "Comms",
    description: "Surface approvals and company feed updates without leaving Teams.",
  },
  {
    name: "Seek",
    category: "Recruitment",
    description: "Publish job ads and pull applicants back into the tracking pipeline.",
  },
  {
    name: "LinkedIn",
    category: "Recruitment",
    description: "Syndicate roles and capture applicants with their profile attached.",
  },
  {
    name: "Indeed",
    category: "Recruitment",
    description: "Distribute openings and dedupe applicants against your existing pipeline.",
  },
  {
    name: "Deputy",
    category: "Productivity",
    description: "Bring approved timesheets across for award interpretation and payment.",
  },
  {
    name: "Zapier",
    category: "Productivity",
    description: "Connect employment events to the thousand-odd tools you already automate.",
  },
  {
    name: "Okta",
    category: "Identity",
    description: "SAML single sign-on with automated user provisioning and deprovisioning.",
  },
  {
    name: "Microsoft Entra",
    category: "Identity",
    description: "Single sign-on and directory sync against your existing identity source.",
  },
  {
    name: "Go1",
    category: "Productivity",
    description: "Assign compliance and capability courses directly from an employee file.",
  },
  {
    name: "Visa Direct",
    category: "Finance",
    description: "Deliver earned wage access payments in near real time to a linked card.",
  },
  {
    name: "Beam Super",
    category: "Finance",
    description: "Clear superannuation contributions and reconcile them against each pay event.",
  },
];

export const integrationCategories = [
  "Accounting",
  "Productivity",
  "Comms",
  "Recruitment",
  "Finance",
  "Identity",
] as const;
