import type { ApplicationStatus } from "@/data/types";
import { readJson, writeJson } from "./storage";

export interface Application {
  id: string;
  jobSlug: string;
  jobTitle: string;
  location: string;
  status: ApplicationStatus;
  submittedAt: string;
  note: string;
}

const KEY = "gojek-demo-applications";
const SAVED_KEY = "gojek-demo-saved-jobs";
const WATCH_KEY = "gojek-demo-oss-watch";

export function readApplications(): Application[] {
  return readJson<Application[]>(KEY, []);
}

export function writeApplications(items: Application[]): void {
  writeJson(KEY, items);
}

export function upsertApplication(input: Omit<Application, "id" | "submittedAt"> & { id?: string }): Application {
  const items = readApplications();
  const now = new Date().toISOString();
  const existing = input.id ? items.find((item) => item.id === input.id) : items.find((item) => item.jobSlug === input.jobSlug);

  if (existing) {
    const next: Application = { ...existing, ...input, submittedAt: existing.submittedAt };
    writeApplications(items.map((item) => (item.id === existing.id ? next : item)));
    return next;
  }

  const created: Application = {
    id: `app-${crypto.randomUUID()}`,
    jobSlug: input.jobSlug,
    jobTitle: input.jobTitle,
    location: input.location,
    status: input.status,
    submittedAt: now,
    note: input.note,
  };
  writeApplications([created, ...items]);
  return created;
}

export function updateApplicationStatus(id: string, status: ApplicationStatus): Application | null {
  const items = readApplications();
  const current = items.find((item) => item.id === id);
  if (!current) return null;
  const next = { ...current, status };
  writeApplications(items.map((item) => (item.id === id ? next : item)));
  return next;
}

export function readSavedJobs(): string[] {
  return readJson<string[]>(SAVED_KEY, []);
}

export function toggleSavedJob(slug: string): string[] {
  const current = readSavedJobs();
  const next = current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current];
  writeJson(SAVED_KEY, next);
  return next;
}

export function readWatchedOss(): string[] {
  return readJson<string[]>(WATCH_KEY, ["heimdall", "ziggurat"]);
}

export function toggleWatchedOss(slug: string): string[] {
  const current = readWatchedOss();
  const next = current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current];
  writeJson(WATCH_KEY, next);
  return next;
}

export function statusLabel(status: ApplicationStatus): string {
  switch (status) {
    case "drafted":
      return "Drafted";
    case "submitted":
      return "Submitted";
    case "take-home":
      return "Take-home";
    case "onsite":
      return "Onsite";
    case "offer":
      return "Offer";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}
