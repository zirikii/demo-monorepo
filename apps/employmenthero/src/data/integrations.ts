import type { Integration } from "./types";

export const INTEGRATIONS: Integration[] = [
  { name: "Xero", category: "Accounting", description: "Post each pay run to your general ledger automatically.", badge: "Popular" },
  { name: "MYOB", category: "Accounting", description: "Sync journals, tracking categories and payment files." },
  { name: "QuickBooks Online", category: "Accounting", description: "Map pay categories to accounts and push journals on finalisation." },
  { name: "NetSuite", category: "Accounting", description: "Enterprise GL posting with department and class mapping." },
  { name: "Deputy", category: "Rostering", description: "Import approved timesheets straight into award interpretation." },
  { name: "Tanda", category: "Rostering", description: "Two-way sync of employees, shifts and approved hours." },
  { name: "Square", category: "Point of sale", description: "Match labour cost to venue revenue by day part." },
  { name: "Lightspeed", category: "Point of sale", description: "Pull sales data to benchmark roster cost against trade." },
  { name: "Google Workspace", category: "Productivity", description: "Single sign-on plus calendar sync for interviews and leave.", badge: "SSO" },
  { name: "Microsoft 365", category: "Productivity", description: "SSO, Outlook calendar sync and Teams notifications.", badge: "SSO" },
  { name: "Slack", category: "Productivity", description: "Leave approvals, birthdays and Hero Points in your channels." },
  { name: "Okta", category: "Identity", description: "SCIM provisioning and SAML single sign-on.", badge: "Enterprise" },
  { name: "Go1", category: "Learning", description: "80,000+ courses from 250+ providers inside the LMS.", badge: "Included" },
  { name: "LinkedIn Jobs", category: "Hiring", description: "Multi-post roles and pull applicants into one pipeline." },
  { name: "Indeed", category: "Hiring", description: "Sponsored and organic postings tracked against source performance." },
  { name: "Calendly", category: "Hiring", description: "Let candidates self-book interview slots from your availability." },
  { name: "Checkr", category: "Screening", description: "Background and police checks triggered at the offer stage." },
  { name: "VEVO", category: "Compliance", description: "Automatic visa entitlement verification for non-citizen employees.", badge: "AU" },
  { name: "ATO Single Touch Payroll", category: "Compliance", description: "STP Phase 2 lodgement with each finalised pay run.", badge: "AU" },
  { name: "Beam Super", category: "Compliance", description: "SuperStream-compliant contribution processing." },
  { name: "Zapier", category: "Automation", description: "Connect Employment OS events to 6,000+ apps." },
  { name: "Employment Hero API", category: "Developer", description: "REST API and webhooks for custom workflows.", badge: "Developer" },
];

export const INTEGRATION_CATEGORIES = Array.from(
  new Set(INTEGRATIONS.map((integration) => integration.category)),
).sort();
