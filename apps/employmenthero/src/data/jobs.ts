import type { JobListing } from "./types";

export const JOB_LISTINGS: JobListing[] = [
  {
    id: "job-4101",
    title: "Venue Supervisor",
    company: "Harbourline Hospitality Group",
    location: "Darling Harbour, NSW",
    workType: "Full time",
    category: "Hospitality",
    salary: "$72,000 – $78,000 + super",
    postedOn: "2026-08-08",
    summary:
      "Lead the floor across dinner service at a 400-seat waterfront restaurant, running a team of 14 across bar, floor and host.",
    responsibilities: [
      "Run dinner service and manage the floor team across a seven-day roster",
      "Open and close the venue including cash handling and compliance checks",
      "Coach new starters through their first four weeks",
      "Own venue labour cost against a weekly target",
    ],
    requirements: [
      "Two years supervising in a high-volume venue",
      "Current NSW RSA",
      "Comfortable rostering to the Hospitality Industry General Award",
    ],
    smartMatch: 94,
  },
  {
    id: "job-4102",
    title: "Payroll Officer",
    company: "Bluegum Early Learning",
    location: "Brisbane, QLD",
    workType: "Full time",
    category: "Finance",
    salary: "$85,000 + super",
    postedOn: "2026-08-06",
    summary:
      "Own the fortnightly pay run for 150 educators across six centres, with award interpretation already in place.",
    responsibilities: [
      "Process the fortnightly pay run end to end",
      "Review timesheet exceptions with centre directors",
      "Lodge STP Phase 2 submissions and manage superannuation",
      "Support the annual reconciliation and audit",
    ],
    requirements: [
      "Three years in Australian payroll",
      "Working knowledge of the Children's Services Award",
      "Experience with STP Phase 2 lodgement",
    ],
    smartMatch: 88,
  },
  {
    id: "job-4103",
    title: "Disability Support Worker",
    company: "Tallowood Care",
    location: "Newcastle, NSW",
    workType: "Casual",
    category: "Community services",
    salary: "$38.50 – $44.20 per hour",
    postedOn: "2026-08-10",
    summary:
      "Support participants in their homes and communities across the Newcastle and Lake Macquarie region.",
    responsibilities: [
      "Deliver in-home and community support to NDIS participants",
      "Assist with personal care, meal preparation and transport",
      "Complete progress notes after each shift",
      "Work to individual support plans",
    ],
    requirements: [
      "NDIS Worker Screening Check",
      "Current driver licence and comprehensively insured vehicle",
      "Certificate III in Individual Support preferred",
    ],
    smartMatch: 91,
  },
  {
    id: "job-4104",
    title: "Retail Team Member",
    company: "Saltbush Retail Co",
    location: "Adelaide, SA",
    workType: "Part time",
    category: "Retail",
    salary: "$27.10 per hour + penalties",
    postedOn: "2026-08-09",
    summary:
      "Join a 22-store group with genuine cross-store shift availability and a team app that makes swapping shifts easy.",
    responsibilities: [
      "Serve customers on the floor and at the register",
      "Receive and merchandise stock",
      "Maintain visual standards and store presentation",
      "Pick up open shifts across nearby stores when you want them",
    ],
    requirements: [
      "Availability across at least two weekend shifts",
      "Retail or customer service experience welcome but not required",
      "Right to work in Australia",
    ],
    smartMatch: 79,
  },
  {
    id: "job-4105",
    title: "Site Supervisor",
    company: "Redgum Constructions",
    location: "Perth, WA",
    workType: "Full time",
    category: "Construction",
    salary: "$120,000 – $140,000 + vehicle",
    postedOn: "2026-08-04",
    summary:
      "Run commercial fit-out projects across the Perth metro area with a permanent crew and trusted subcontractors.",
    responsibilities: [
      "Supervise daily site operations and subcontractor coordination",
      "Run toolbox talks and maintain site inductions",
      "Manage program against the construction schedule",
      "Own site HSEQ compliance",
    ],
    requirements: [
      "White card and a current high-risk work licence",
      "Five years supervising commercial fit-out",
      "Experience with subcontractor compliance",
    ],
    smartMatch: 85,
  },
  {
    id: "job-4106",
    title: "Registered Nurse — Community",
    company: "Corella Health",
    location: "Melbourne, VIC",
    workType: "Part time",
    category: "Healthcare",
    salary: "$46.80 – $58.40 per hour",
    postedOn: "2026-08-07",
    summary:
      "Deliver community nursing across the inner north with a caseload you help shape and no double shifts.",
    responsibilities: [
      "Provide clinical care in participants' homes",
      "Complete assessments and care plans",
      "Coordinate with allied health and GPs",
      "Maintain clinical documentation",
    ],
    requirements: [
      "Current AHPRA registration",
      "Two years post-graduate experience",
      "Driver licence",
    ],
    smartMatch: 90,
  },
  {
    id: "job-4107",
    title: "Warehouse Operations Lead",
    company: "Ironbark Logistics",
    location: "Truganina, VIC",
    workType: "Full time",
    category: "Transport & logistics",
    salary: "$95,000 + super",
    postedOn: "2026-08-02",
    summary:
      "Lead an afternoon shift of 26 across pick, pack and dispatch in a 24,000 sqm distribution centre.",
    responsibilities: [
      "Run the afternoon shift and hit dispatch cut-offs",
      "Manage safety, housekeeping and equipment checks",
      "Coach team leaders and manage performance",
      "Report throughput and accuracy daily",
    ],
    requirements: [
      "Forklift licence (LF)",
      "Three years leading a warehouse shift",
      "Comfortable with WMS reporting",
    ],
    smartMatch: 82,
  },
  {
    id: "job-4108",
    title: "Dental Assistant",
    company: "Northbridge Dental",
    location: "North Sydney, NSW",
    workType: "Full time",
    category: "Healthcare",
    salary: "$62,000 – $68,000 + super",
    postedOn: "2026-08-05",
    summary:
      "Support three dentists in a modern practice with paid training toward a Certificate III.",
    responsibilities: [
      "Chairside assisting across general and cosmetic procedures",
      "Sterilisation and infection control",
      "Manage patient flow and recall",
      "Stock and supplies management",
    ],
    requirements: [
      "Experience assisting chairside preferred",
      "Current infection control certificate an advantage",
      "Right to work in Australia",
    ],
    smartMatch: 76,
  },
];

export function getJob(id: string): JobListing | undefined {
  return JOB_LISTINGS.find((job) => job.id === id);
}

export const JOB_CATEGORIES = Array.from(new Set(JOB_LISTINGS.map((job) => job.category))).sort();

export const JOB_LOCATIONS = Array.from(
  new Set(JOB_LISTINGS.map((job) => job.location.split(", ")[1] ?? job.location)),
).sort();
