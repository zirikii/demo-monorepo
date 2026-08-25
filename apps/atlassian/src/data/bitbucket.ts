export type PullRequestStatus = "Open" | "Approved" | "Merged" | "Declined";

export interface BitbucketRepo {
  slug: string;
  name: string;
  description: string;
  updated: string;
}

export interface PullRequest {
  id: number;
  repo: string;
  title: string;
  author: string;
  status: PullRequestStatus;
  source: string;
  destination: string;
  description: string;
}

export const BITBUCKET_REPOS: BitbucketRepo[] = [
  {
    slug: "portal-web",
    name: "portal-web",
    description: "Northline customer portal frontend",
    updated: "2026-08-20",
  },
  {
    slug: "account-service",
    name: "account-service",
    description: "Account reads extracted from the monolith (PORTAL-118)",
    updated: "2026-08-17",
  },
];

export const PULL_REQUESTS: PullRequest[] = [
  {
    id: 42,
    repo: "portal-web",
    title: "Fix Safari banner casing (PORTAL-161)",
    author: "Sam Okonkwo",
    status: "Open",
    source: "fix/safari-banner",
    destination: "main",
    description: "Read bannerEnabled only. Stops the double login banner on Safari 18.",
  },
  {
    id: 38,
    repo: "account-service",
    title: "Extract account reads from monolith",
    author: "Maya Chen",
    status: "Approved",
    source: "feat/account-reads",
    destination: "main",
    description: "First slice of PORTAL-118. Finance reports still hit the same record shape.",
  },
  {
    id: 29,
    repo: "portal-web",
    title: "Passkey reset confirmation",
    author: "Sam Okonkwo",
    status: "Merged",
    source: "feat/passkeys",
    destination: "main",
    description: "Shipped with PORTAL-088.",
  },
];

export function getRepo(slug: string, repos = BITBUCKET_REPOS): BitbucketRepo | undefined {
  return repos.find((repo) => repo.slug === slug);
}

export function getPullRequest(
  repo: string,
  id: number,
  pullRequests = PULL_REQUESTS,
): PullRequest | undefined {
  return pullRequests.find((item) => item.repo === repo && item.id === id);
}
