import type { Job } from "./types";

export const JOBS: Job[] = [
  {
    id: "job-bdm-nsw",
    title: "Business Development Manager — NSW",
    team: "Distribution",
    location: "Sydney",
    type: "Full-time",
    summary: "Own a book of advice practices across Greater Sydney and the Illawarra. Best-in-class BDM support is a platform award we intend to keep.",
  },
  {
    id: "job-trm-vic",
    title: "Training & Relationship Manager — VIC",
    team: "Client success",
    location: "Melbourne",
    type: "Full-time",
    summary: "Stand up new practices on AdviserHUB, run capability workshops and stay close after transition.",
  },
  {
    id: "job-ops-lead",
    title: "Investment Operations Team Leader",
    team: "Operations",
    location: "Sydney",
    type: "Full-time",
    summary: "Lead the pod that clears ASX, international and managed-portfolio corporate actions.",
  },
  {
    id: "job-product-sma",
    title: "Product Manager — Managed Portfolios",
    team: "Product",
    location: "Sydney / hybrid",
    type: "Full-time",
    summary: "Own the SMA roadmap: rebalancing, tax lots, licensee models and Discover menu economics.",
  },
  {
    id: "job-eng-platform",
    title: "Senior Software Engineer — Platform",
    team: "Technology",
    location: "Sydney",
    type: "Full-time",
    summary: "Build the next generation of AdviserHUB workflows on the group design system.",
  },
  {
    id: "job-class-csm",
    title: "Customer Success Manager — Class",
    team: "Class",
    location: "Brisbane",
    type: "Full-time",
    summary: "Help SMSF administrators get more from Class Super and NowInfinity.",
  },
];

export function jobById(id: string): Job | undefined {
  return JOBS.find((job) => job.id === id);
}
