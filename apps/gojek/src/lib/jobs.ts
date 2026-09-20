import { JOBS } from "@/data/jobs";
import type { Job, JobType } from "@/data/types";

export interface JobFilters {
  query?: string;
  team?: string;
  location?: string;
  type?: JobType | "";
}

export const JOBS_PER_PAGE = 8;

function matchesQuery(job: Job, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [job.title, job.team, job.location, job.level, job.summary, ...job.stack]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export function filterJobs(filters: JobFilters, jobs: Job[] = JOBS): Job[] {
  return jobs.filter((job) => {
    if (!matchesQuery(job, filters.query ?? "")) return false;
    if (filters.team && job.team !== filters.team) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.type && job.type !== filters.type) return false;
    return true;
  });
}

export function sortJobsByRecency(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => b.postedOn.localeCompare(a.postedOn));
}

export function pageCount(total: number, perPage = JOBS_PER_PAGE): number {
  return Math.max(1, Math.ceil(total / perPage));
}

export function paginate<T>(items: T[], page: number, perPage = JOBS_PER_PAGE): T[] {
  const safePage = Math.min(Math.max(1, page), pageCount(items.length, perPage));
  const start = (safePage - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function countByTeam(jobs: Job[] = JOBS): Record<string, number> {
  return jobs.reduce<Record<string, number>>((acc, job) => {
    acc[job.team] = (acc[job.team] ?? 0) + 1;
    return acc;
  }, {});
}

export function relatedJobs(job: Job, limit = 3): Job[] {
  return JOBS.filter((candidate) => candidate.slug !== job.slug)
    .map((candidate) => ({
      job: candidate,
      score:
        (candidate.team === job.team ? 2 : 0) +
        (candidate.location === job.location ? 1 : 0) +
        candidate.stack.filter((tech) => job.stack.includes(tech)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.job);
}
