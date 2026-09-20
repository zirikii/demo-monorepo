export type ApplicationStage =
  "Applied" | "Recruiter screen" | "Technical interview" | "Team match" | "Offer";

export const APPLICATION_STAGES: ApplicationStage[] = [
  "Applied",
  "Recruiter screen",
  "Technical interview",
  "Team match",
  "Offer",
];

export interface SeededApplication {
  id: string;
  jobSlug: string;
  stage: ApplicationStage;
  submittedOn: string;
  updatedOn: string;
  recruiter: string;
  note: string;
}

export interface Interview {
  id: string;
  jobSlug: string;
  title: string;
  startsAt: string;
  durationMinutes: number;
  format: string;
  panel: string[];
}

export const SEEDED_APPLICATIONS: SeededApplication[] = [
  {
    id: "APP-48120",
    jobSlug: "senior-backend-engineer-allocation",
    stage: "Technical interview",
    submittedOn: "2026-09-10",
    updatedOn: "2026-09-16",
    recruiter: "Meera Ravi",
    note: "Debugging session scheduled with the allocation squad. Repository access has been sent to your email.",
  },
  {
    id: "APP-48044",
    jobSlug: "design-systems-engineer",
    stage: "Recruiter screen",
    submittedOn: "2026-09-06",
    updatedOn: "2026-09-12",
    recruiter: "Andi Kurniawan",
    note: "Portfolio received. Screening call booked for next week.",
  },
  {
    id: "APP-47918",
    jobSlug: "frontend-engineer-web-platform",
    stage: "Applied",
    submittedOn: "2026-09-02",
    updatedOn: "2026-09-02",
    recruiter: "Meera Ravi",
    note: "Application received and shared with the hiring manager.",
  },
];

export const SEEDED_SAVED_ROLES = [
  "staff-engineer-payments-ledger",
  "senior-data-scientist-pricing",
];

export const SEEDED_INTERVIEWS: Interview[] = [
  {
    id: "INT-2201",
    jobSlug: "senior-backend-engineer-allocation",
    title: "Debugging session — allocation service",
    startsAt: "2026-09-24T10:00:00+07:00",
    durationMinutes: 90,
    format: "Video call, shared repository",
    panel: ["Ratna Dewi", "Rizky Pratama"],
  },
  {
    id: "INT-2208",
    jobSlug: "senior-backend-engineer-allocation",
    title: "System design — marketplace matching",
    startsAt: "2026-09-26T14:30:00+07:00",
    durationMinutes: 60,
    format: "Video call, collaborative whiteboard",
    panel: ["Lina Kusumo"],
  },
  {
    id: "INT-2214",
    jobSlug: "design-systems-engineer",
    title: "Recruiter screen",
    startsAt: "2026-09-29T09:00:00+07:00",
    durationMinutes: 30,
    format: "Video call",
    panel: ["Andi Kurniawan"],
  },
];

export const HUB_CHECKLIST = [
  { label: "Profile completed", done: true },
  { label: "Resume uploaded", done: true },
  { label: "Work preferences set", done: true },
  { label: "Interview availability shared", done: false },
  { label: "Right-to-work documents", done: false },
];
