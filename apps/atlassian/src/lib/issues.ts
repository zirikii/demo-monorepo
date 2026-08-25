import { ISSUES as SEED, issuesByStatus as groupByStatus } from "@/data/jira";
import type { IssueComment, IssueStatus, IssueType, JiraIssue } from "@/data/types";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-issues";

function normalize(issue: JiraIssue): JiraIssue {
  return {
    ...issue,
    labels: [...issue.labels],
    comments: issue.comments ? issue.comments.map((comment) => ({ ...comment })) : [],
  };
}

export function readIssues(): JiraIssue[] {
  return readCollection(KEY, SEED).map(normalize);
}

export function writeIssues(issues: JiraIssue[]): void {
  writeCollection(KEY, issues.map(normalize));
}

export function getStoredIssue(key: string): JiraIssue | undefined {
  return readIssues().find((issue) => issue.key.toLowerCase() === key.toLowerCase());
}

export function updateIssueStatus(key: string, status: IssueStatus): JiraIssue[] {
  const next = readIssues().map((issue) => (issue.key === key ? { ...issue, status } : issue));
  writeIssues(next);
  return next;
}

export function nextIssueKey(issues = readIssues()): string {
  let max = 0;
  for (const issue of issues) {
    const numeric = Number(issue.key.replace(/^PORTAL-/i, ""));
    if (Number.isFinite(numeric) && numeric > max) max = numeric;
  }
  return `PORTAL-${max + 1}`;
}

export interface CreateIssueInput {
  summary: string;
  type: IssueType;
  status: IssueStatus;
  assignee: string;
}

export function createIssue(input: CreateIssueInput): JiraIssue {
  const issues = readIssues();
  const issue: JiraIssue = {
    key: nextIssueKey(issues),
    type: input.type,
    summary: input.summary.trim(),
    description: "Created from the board.",
    status: input.status,
    priority: "Medium",
    assignee: input.assignee,
    reporter: input.assignee,
    points: 1,
    labels: [],
    updated: new Date().toISOString().slice(0, 10),
    comments: [],
  };
  writeIssues([...issues, issue]);
  return issue;
}

export function addIssueComment(input: { key: string; author: string; body: string }): JiraIssue[] {
  const comment: IssueComment = {
    id: `c-${Date.now()}`,
    author: input.author,
    body: input.body.trim(),
    created: new Date().toISOString().slice(0, 10),
  };
  const next = readIssues().map((issue) =>
    issue.key === input.key ? { ...issue, comments: [...issue.comments, comment] } : issue,
  );
  writeIssues(next);
  return next;
}

export function issuesByStatus(status: IssueStatus, issues = readIssues()): JiraIssue[] {
  return groupByStatus(status, issues);
}
