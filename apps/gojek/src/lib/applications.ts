import {
  APPLICATION_STAGES,
  SEEDED_APPLICATIONS,
  SEEDED_SAVED_ROLES,
  type ApplicationStage,
  type SeededApplication,
} from "@/data/hub";
import { readJson, writeJson } from "./storage";

const APPLICATIONS_KEY = "gojek-demo-applications";
const SAVED_ROLES_KEY = "gojek-demo-saved-roles";

export interface Application extends SeededApplication {
  coverNote?: string;
}

export function readApplications(): Application[] {
  return readJson<Application[]>(APPLICATIONS_KEY, SEEDED_APPLICATIONS);
}

export function writeApplications(applications: Application[]): void {
  writeJson(APPLICATIONS_KEY, applications);
}

function nextApplicationId(applications: Application[]): string {
  const highest = applications.reduce((max, application) => {
    const numeric = Number.parseInt(application.id.replace(/\D/g, ""), 10);
    return Number.isNaN(numeric) ? max : Math.max(max, numeric);
  }, 48000);
  return `APP-${highest + 1}`;
}

export function hasApplied(jobSlug: string, applications = readApplications()): boolean {
  return applications.some((application) => application.jobSlug === jobSlug);
}

export function submitApplication(jobSlug: string, coverNote: string): Application {
  const applications = readApplications();
  const existing = applications.find((application) => application.jobSlug === jobSlug);
  if (existing) return existing;

  const today = new Date().toISOString().slice(0, 10);
  const application: Application = {
    id: nextApplicationId(applications),
    jobSlug,
    stage: "Applied",
    submittedOn: today,
    updatedOn: today,
    recruiter: "Meera Ravi",
    note: "Application received. A recruiter will review it within three working days.",
    coverNote,
  };
  writeApplications([application, ...applications]);
  return application;
}

export function withdrawApplication(id: string): Application[] {
  const remaining = readApplications().filter((application) => application.id !== id);
  writeApplications(remaining);
  return remaining;
}

export function stageIndex(stage: ApplicationStage): number {
  return APPLICATION_STAGES.indexOf(stage);
}

export function stageProgress(stage: ApplicationStage): number {
  return Math.round(((stageIndex(stage) + 1) / APPLICATION_STAGES.length) * 100);
}

export function readSavedRoles(): string[] {
  return readJson<string[]>(SAVED_ROLES_KEY, SEEDED_SAVED_ROLES);
}

export function isRoleSaved(slug: string, saved = readSavedRoles()): boolean {
  return saved.includes(slug);
}

export function toggleSavedRole(slug: string): string[] {
  const saved = readSavedRoles();
  const next = saved.includes(slug) ? saved.filter((entry) => entry !== slug) : [slug, ...saved];
  writeJson(SAVED_ROLES_KEY, next);
  return next;
}
