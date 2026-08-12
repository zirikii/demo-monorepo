export interface SupportArticle {
  title: string;
  category: string;
  summary: string;
}

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    title: "Adding a new employee",
    category: "HR",
    summary:
      "Create the employee record, send the contract for e-signature and collect super, TFN and bank details.",
  },
  {
    title: "Fixing a finalised pay run",
    category: "Payroll",
    summary: "How to run an adjustment pay run and re-lodge the corrected STP submission.",
  },
  {
    title: "Setting up award interpretation",
    category: "Payroll",
    summary: "Map your employees to the right award, level and classification before your first run.",
  },
  {
    title: "Understanding STP Phase 2 categories",
    category: "Compliance",
    summary: "Disaggregation of gross, income types and country codes explained with examples.",
  },
  {
    title: "Publishing a roster",
    category: "Rostering",
    summary: "Build a roster against award rules, see the cost, and publish it to the Work app.",
  },
  {
    title: "Approving leave requests",
    category: "HR",
    summary: "Review balances, check roster impact and approve or decline with a reason.",
  },
  {
    title: "Inviting your team to the Work app",
    category: "Employment Hero Work",
    summary: "Bulk invite employees, track activation, and resend to anyone who hasn't joined.",
  },
  {
    title: "Turning on Earned Wage Access",
    category: "Employment Hero Work",
    summary: "Eligibility rules, employer obligations and how draws reconcile in the pay run.",
  },
  {
    title: "Creating a job ad and careers page",
    category: "Hiring",
    summary: "Build the ad, set the screening criteria and publish to your careers page and job boards.",
  },
  {
    title: "Reviewing Recruitment Agent scores",
    category: "Hiring",
    summary: "How scores are produced, how to override them and how to adjust the rubric.",
  },
  {
    title: "Assigning mandatory training",
    category: "Learning",
    summary: "Set courses by role, site or award and track completion against expiry dates.",
  },
  {
    title: "Connecting Xero",
    category: "Integrations",
    summary: "Authorise the connection, map pay categories to accounts and post your first journal.",
  },
];

export const SUPPORT_FAQS = [
  {
    question: "How do I reset my password?",
    answer:
      "Use the forgot password link on the log in screen. In this demo the login form is pre-filled and no email is ever sent.",
  },
  {
    question: "What are your support hours?",
    answer:
      "Chat and phone support run 8am–7pm AEST on business days. Employment Unlimited customers have a named contact and a one-hour response target.",
  },
  {
    question: "Where do I report a bug?",
    answer:
      "Use the contact form and choose 'Report a bug'. Include the screen you were on and what you expected to happen.",
  },
  {
    question: "Can you help migrate my data?",
    answer:
      "Yes. Implementation includes a guided import of employees, leave balances and year-to-date payroll figures, validated with you before go-live.",
  },
  {
    question: "Do you offer training for my managers?",
    answer:
      "Every plan includes access to the implementation hub and recorded manager training. Live sessions are included on Employment Unlimited.",
  },
];
