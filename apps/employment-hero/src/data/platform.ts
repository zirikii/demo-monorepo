export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  location: string;
  employmentType: "Full time" | "Part time" | "Casual";
  startDate: string;
  salary: number;
  manager: string;
  status: "Active" | "Onboarding" | "On leave";
  leaveBalance: { annual: number; personal: number };
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  type: "Annual leave" | "Personal leave" | "Unpaid leave" | "Long service leave";
  startDate: string;
  endDate: string;
  days: number;
  status: "Pending" | "Approved" | "Declined";
  note: string;
};

export type PayRun = {
  id: string;
  period: string;
  payDate: string;
  employees: number;
  gross: number;
  tax: number;
  superannuation: number;
  net: number;
  status: "Draft" | "Awaiting approval" | "Finalised";
  anomalies: string[];
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
  matchScore: number;
  location: string;
  appliedAt: string;
  source: "SmartMatch" | "Job board" | "Referral" | "Careers page";
};

export type ReviewCycle = {
  id: string;
  name: string;
  window: string;
  participants: number;
  completed: number;
  status: "Open" | "Closed";
};

export const seedEmployees: Employee[] = [
  {
    id: "emp-001",
    name: "Ava Thompson",
    email: "ava.thompson@brightpath.com.au",
    role: "People & Culture Lead",
    team: "People",
    location: "Sydney, NSW",
    employmentType: "Full time",
    startDate: "2022-03-14",
    salary: 132000,
    manager: "Nadia Correa",
    status: "Active",
    leaveBalance: { annual: 14.5, personal: 8 },
  },
  {
    id: "emp-002",
    name: "Nadia Correa",
    email: "nadia.correa@brightpath.com.au",
    role: "Chief Operating Officer",
    team: "Executive",
    location: "Sydney, NSW",
    employmentType: "Full time",
    startDate: "2019-08-05",
    salary: 215000,
    manager: "—",
    status: "Active",
    leaveBalance: { annual: 22, personal: 12 },
  },
  {
    id: "emp-003",
    name: "Tom Whitfield",
    email: "tom.whitfield@brightpath.com.au",
    role: "Payroll Officer",
    team: "Finance",
    location: "Sydney, NSW",
    employmentType: "Full time",
    startDate: "2023-01-30",
    salary: 91000,
    manager: "Renee Bhatt",
    status: "Active",
    leaveBalance: { annual: 9.5, personal: 6 },
  },
  {
    id: "emp-004",
    name: "Renee Bhatt",
    email: "renee.bhatt@brightpath.com.au",
    role: "Finance Manager",
    team: "Finance",
    location: "Melbourne, VIC",
    employmentType: "Full time",
    startDate: "2021-06-21",
    salary: 148000,
    manager: "Nadia Correa",
    status: "Active",
    leaveBalance: { annual: 18, personal: 10 },
  },
  {
    id: "emp-005",
    name: "Jonah Price",
    email: "jonah.price@brightpath.com.au",
    role: "Field Operations Supervisor",
    team: "Operations",
    location: "Brisbane, QLD",
    employmentType: "Full time",
    startDate: "2020-11-09",
    salary: 104000,
    manager: "Nadia Correa",
    status: "On leave",
    leaveBalance: { annual: 3, personal: 4 },
  },
  {
    id: "emp-006",
    name: "Mei Lin Chua",
    email: "meilin.chua@brightpath.com.au",
    role: "Customer Success Manager",
    team: "Customer",
    location: "Sydney, NSW",
    employmentType: "Full time",
    startDate: "2023-09-18",
    salary: 98000,
    manager: "Ava Thompson",
    status: "Active",
    leaveBalance: { annual: 11, personal: 7 },
  },
  {
    id: "emp-007",
    name: "Harry Osborne",
    email: "harry.osborne@brightpath.com.au",
    role: "Warehouse Team Member",
    team: "Operations",
    location: "Brisbane, QLD",
    employmentType: "Casual",
    startDate: "2025-02-03",
    salary: 62400,
    manager: "Jonah Price",
    status: "Active",
    leaveBalance: { annual: 0, personal: 0 },
  },
  {
    id: "emp-008",
    name: "Isabelle Moreau",
    email: "isabelle.moreau@brightpath.com.au",
    role: "Marketing Specialist",
    team: "Marketing",
    location: "Melbourne, VIC",
    employmentType: "Part time",
    startDate: "2024-04-15",
    salary: 74000,
    manager: "Ava Thompson",
    status: "Active",
    leaveBalance: { annual: 6.5, personal: 5 },
  },
  {
    id: "emp-009",
    name: "Callum Reid",
    email: "callum.reid@brightpath.com.au",
    role: "Software Engineer",
    team: "Technology",
    location: "Remote, TAS",
    employmentType: "Full time",
    startDate: "2024-10-07",
    salary: 142000,
    manager: "Priya Anand",
    status: "Active",
    leaveBalance: { annual: 8, personal: 6 },
  },
  {
    id: "emp-010",
    name: "Priya Anand",
    email: "priya.anand@brightpath.com.au",
    role: "Engineering Manager",
    team: "Technology",
    location: "Sydney, NSW",
    employmentType: "Full time",
    startDate: "2022-07-11",
    salary: 178000,
    manager: "Nadia Correa",
    status: "Active",
    leaveBalance: { annual: 16, personal: 9 },
  },
  {
    id: "emp-011",
    name: "Grace Fuller",
    email: "grace.fuller@brightpath.com.au",
    role: "Support Coordinator",
    team: "Customer",
    location: "Adelaide, SA",
    employmentType: "Full time",
    startDate: "2026-08-03",
    salary: 82000,
    manager: "Mei Lin Chua",
    status: "Onboarding",
    leaveBalance: { annual: 0.5, personal: 0.5 },
  },
  {
    id: "emp-012",
    name: "Samuel Tiaki",
    email: "samuel.tiaki@brightpath.com.au",
    role: "Logistics Coordinator",
    team: "Operations",
    location: "Auckland, NZ",
    employmentType: "Full time",
    startDate: "2025-05-19",
    salary: 88000,
    manager: "Jonah Price",
    status: "Active",
    leaveBalance: { annual: 7, personal: 5 },
  },
];

export const seedLeave: LeaveRequest[] = [
  {
    id: "lv-001",
    employeeId: "emp-006",
    type: "Annual leave",
    startDate: "2026-09-14",
    endDate: "2026-09-18",
    days: 5,
    status: "Pending",
    note: "Family holiday, cover arranged with Grace.",
  },
  {
    id: "lv-002",
    employeeId: "emp-009",
    type: "Personal leave",
    startDate: "2026-08-13",
    endDate: "2026-08-13",
    days: 1,
    status: "Pending",
    note: "Medical appointment.",
  },
  {
    id: "lv-003",
    employeeId: "emp-005",
    type: "Long service leave",
    startDate: "2026-08-03",
    endDate: "2026-08-28",
    days: 20,
    status: "Approved",
    note: "Approved in June, cover in place.",
  },
  {
    id: "lv-004",
    employeeId: "emp-008",
    type: "Annual leave",
    startDate: "2026-10-06",
    endDate: "2026-10-10",
    days: 4,
    status: "Pending",
    note: "School holidays.",
  },
  {
    id: "lv-005",
    employeeId: "emp-003",
    type: "Annual leave",
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    days: 5,
    status: "Approved",
    note: "Taken after the EOFY finalisation.",
  },
];

export const seedPayRuns: PayRun[] = [
  {
    id: "pr-2026-16",
    period: "27 Jul – 9 Aug 2026",
    payDate: "2026-08-13",
    employees: 12,
    gross: 58420.5,
    tax: 15734.2,
    superannuation: 6718.36,
    net: 42686.3,
    status: "Awaiting approval",
    anomalies: [
      "Harry Osborne worked 14 hours above his rolling average — confirm the timesheet.",
      "Grace Fuller has no superannuation fund nominated.",
    ],
  },
  {
    id: "pr-2026-15",
    period: "13 Jul – 26 Jul 2026",
    payDate: "2026-07-30",
    employees: 12,
    gross: 56180.0,
    tax: 15012.4,
    superannuation: 6460.7,
    net: 41167.6,
    status: "Finalised",
    anomalies: [],
  },
  {
    id: "pr-2026-14",
    period: "29 Jun – 12 Jul 2026",
    payDate: "2026-07-16",
    employees: 11,
    gross: 54890.25,
    tax: 14608.9,
    superannuation: 6312.38,
    net: 40281.35,
    status: "Finalised",
    anomalies: [],
  },
  {
    id: "pr-2026-13",
    period: "15 Jun – 28 Jun 2026",
    payDate: "2026-07-02",
    employees: 11,
    gross: 55210.8,
    tax: 14702.1,
    superannuation: 6349.24,
    net: 40508.7,
    status: "Finalised",
    anomalies: [],
  },
];

export const seedCandidates: Candidate[] = [
  {
    id: "cand-001",
    name: "Layla Hassan",
    role: "Payroll Officer",
    stage: "Interview",
    matchScore: 94,
    location: "Sydney, NSW",
    appliedAt: "2026-08-05",
    source: "SmartMatch",
  },
  {
    id: "cand-002",
    name: "Ethan Brooks",
    role: "Payroll Officer",
    stage: "Screening",
    matchScore: 88,
    location: "Sydney, NSW",
    appliedAt: "2026-08-06",
    source: "Job board",
  },
  {
    id: "cand-003",
    name: "Amara Nwosu",
    role: "Customer Success Manager",
    stage: "Offer",
    matchScore: 91,
    location: "Melbourne, VIC",
    appliedAt: "2026-07-28",
    source: "SmartMatch",
  },
  {
    id: "cand-004",
    name: "Jack Fenton",
    role: "Warehouse Team Member",
    stage: "Applied",
    matchScore: 72,
    location: "Brisbane, QLD",
    appliedAt: "2026-08-08",
    source: "Careers page",
  },
  {
    id: "cand-005",
    name: "Sofia Delgado",
    role: "Software Engineer",
    stage: "Interview",
    matchScore: 89,
    location: "Remote, VIC",
    appliedAt: "2026-08-01",
    source: "Referral",
  },
  {
    id: "cand-006",
    name: "Ben Kowalski",
    role: "Warehouse Team Member",
    stage: "Screening",
    matchScore: 68,
    location: "Brisbane, QLD",
    appliedAt: "2026-08-07",
    source: "Job board",
  },
  {
    id: "cand-007",
    name: "Nina Petrov",
    role: "Marketing Specialist",
    stage: "Hired",
    matchScore: 93,
    location: "Melbourne, VIC",
    appliedAt: "2026-06-30",
    source: "SmartMatch",
  },
  {
    id: "cand-008",
    name: "Oliver Chen",
    role: "Software Engineer",
    stage: "Applied",
    matchScore: 81,
    location: "Sydney, NSW",
    appliedAt: "2026-08-09",
    source: "SmartMatch",
  },
];

export const seedReviewCycles: ReviewCycle[] = [
  {
    id: "cycle-h2-2026",
    name: "H2 2026 performance review",
    window: "1 Aug – 12 Sep 2026",
    participants: 12,
    completed: 5,
    status: "Open",
  },
  {
    id: "cycle-h1-2026",
    name: "H1 2026 performance review",
    window: "1 Feb – 15 Mar 2026",
    participants: 11,
    completed: 11,
    status: "Closed",
  },
  {
    id: "cycle-goals-2026",
    name: "FY26 goal setting",
    window: "1 Jul – 31 Jul 2026",
    participants: 12,
    completed: 12,
    status: "Closed",
  },
];

export const complianceItems = [
  {
    name: "Single Touch Payroll Phase 2",
    detail: "Reported on every pay event",
    status: "Current" as const,
  },
  {
    name: "Superannuation guarantee",
    detail: "Next Payday Super submission 13 Aug 2026",
    status: "Current" as const,
  },
  {
    name: "Workplace policy acknowledgements",
    detail: "11 of 12 employees have signed the updated code of conduct",
    status: "Action needed" as const,
  },
  {
    name: "Right to work checks",
    detail: "All records verified",
    status: "Current" as const,
  },
  {
    name: "Modern award coverage",
    detail: "Clerks — Private Sector Award mapped to 4 employees",
    status: "Current" as const,
  },
];

export const activityFeed = [
  { at: "2026-08-11", text: "Tom Whitfield prepared pay run pr-2026-16 for approval." },
  { at: "2026-08-10", text: "Grace Fuller completed 4 of 6 onboarding tasks." },
  { at: "2026-08-09", text: "Oliver Chen was matched to Software Engineer at 81%." },
  { at: "2026-08-08", text: "Isabelle Moreau submitted a leave request for October." },
  { at: "2026-08-06", text: "Layla Hassan moved to Interview for Payroll Officer." },
  { at: "2026-08-04", text: "H2 2026 performance review cycle opened for 12 participants." },
];
