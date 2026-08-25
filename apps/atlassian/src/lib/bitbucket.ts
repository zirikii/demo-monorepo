import { PULL_REQUESTS, type PullRequest, type PullRequestStatus } from "@/data/bitbucket";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-prs";

export function readPullRequests(): PullRequest[] {
  return readCollection(KEY, PULL_REQUESTS);
}

export function writePullRequests(pullRequests: PullRequest[]): void {
  writeCollection(KEY, pullRequests);
}

export function getStoredPullRequest(repo: string, id: number): PullRequest | undefined {
  return readPullRequests().find((item) => item.repo === repo && item.id === id);
}

export function updatePullRequestStatus(
  repo: string,
  id: number,
  status: PullRequestStatus,
): PullRequest[] {
  const next = readPullRequests().map((item) =>
    item.repo === repo && item.id === id ? { ...item, status } : item,
  );
  writePullRequests(next);
  return next;
}
