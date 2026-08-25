import type { IssueStatus, JiraIssue, JiraSprint } from "./types";

export const PROJECT = {
  key: "PORTAL",
  name: "Customer portal",
  type: "Software",
} as const;

export const SPRINT: JiraSprint = {
  name: "PORTAL Sprint 24",
  goal: "Ship account microsite v2 and cut login errors by half.",
  start: "2026-08-10",
  end: "2026-08-21",
};

export const BOARD_COLUMNS: IssueStatus[] = ["To do", "In progress", "In review", "Done"];

export const ISSUES: JiraIssue[] = [
  {
    key: "PORTAL-142",
    type: "Story",
    summary: "Add 300k-account onboarding path",
    description:
      "New customers coming from the partner channel skip the default wizard. Need a dedicated path that still writes the same account record.",
    status: "In progress",
    priority: "High",
    assignee: "Maya Chen",
    reporter: "Priya Raman",
    points: 8,
    labels: ["onboarding", "growth"],
    updated: "2026-08-19",
    comments: [],
  },
  {
    key: "PORTAL-155",
    type: "Task",
    summary: "Wire feature gates for portal v2",
    description: "Expose the new nav and billing card behind `portal.v2.nav` and `portal.v2.billing`.",
    status: "In progress",
    priority: "Medium",
    assignee: "Jordan Hale",
    reporter: "Maya Chen",
    points: 3,
    labels: ["platform"],
    updated: "2026-08-18",
    comments: [],
  },
  {
    key: "PORTAL-161",
    type: "Bug",
    summary: "Login banner renders twice on Safari 18",
    description:
      "The service-config key is read as `BannerEnabled` in one bundle and `bannerEnabled` in another. Safari shows both.",
    status: "In review",
    priority: "Highest",
    assignee: "Sam Okonkwo",
    reporter: "Nadia Fischer",
    points: 2,
    labels: ["login", "safari"],
    updated: "2026-08-20",
    comments: [
      {
        id: "c-161-1",
        author: "Nadia Fischer",
        body: "Reproduced on Safari 18.2 — both banners show on first paint.",
        created: "2026-08-20",
      },
    ],
  },
  {
    key: "PORTAL-118",
    type: "Epic",
    summary: "Account microservice extraction",
    description: "Split account reads out of the monolith. FIN-300 in the finance program tracks the cutover.",
    status: "In progress",
    priority: "High",
    assignee: "Maya Chen",
    reporter: "Jordan Hale",
    points: 13,
    labels: ["architecture"],
    updated: "2026-08-17",
    comments: [],
  },
  {
    key: "PORTAL-170",
    type: "Story",
    summary: "Campaign ad refresh landing page",
    description: "Marketing needs the Q3 creative on the public signup page before the Monday push.",
    status: "To do",
    priority: "Medium",
    assignee: "Nadia Fischer",
    reporter: "Priya Raman",
    points: 5,
    labels: ["marketing"],
    updated: "2026-08-16",
    comments: [],
  },
  {
    key: "PORTAL-171",
    type: "Task",
    summary: "Publish strategy brief for portal 2.0",
    description: "Confluence page + goals link. Rovo can draft from last week's partner calls.",
    status: "To do",
    priority: "Low",
    assignee: "Priya Raman",
    reporter: "Maya Chen",
    points: 2,
    labels: ["docs"],
    updated: "2026-08-15",
    comments: [],
  },
  {
    key: "PORTAL-133",
    type: "Story",
    summary: "Redesign portal empty states",
    description: "Empty dashboards still show the v1 illustration. Replace with the new design system empties.",
    status: "To do",
    priority: "Low",
    assignee: "Sam Okonkwo",
    reporter: "Nadia Fischer",
    points: 3,
    labels: ["design"],
    updated: "2026-08-14",
    comments: [],
  },
  {
    key: "PORTAL-098",
    type: "Bug",
    summary: "CSV export drops timezone on scheduled reports",
    description: "Nightly report uses UTC for the filename and local time for the rows. Finance flagged the mismatch.",
    status: "Done",
    priority: "Medium",
    assignee: "Jordan Hale",
    reporter: "Maya Chen",
    points: 3,
    labels: ["reporting"],
    updated: "2026-08-12",
    comments: [],
  },
  {
    key: "PORTAL-104",
    type: "Task",
    summary: "Add Rovo agent for partner-call notes",
    description: "Agent should turn Loom recaps into Jira comments on the related work item.",
    status: "Done",
    priority: "High",
    assignee: "Priya Raman",
    reporter: "Maya Chen",
    points: 5,
    labels: ["rovo", "ai"],
    updated: "2026-08-11",
    comments: [],
  },
  {
    key: "PORTAL-088",
    type: "Story",
    summary: "Self-serve password reset with passkeys",
    description: "Support volume on password resets is still too high. Offer passkeys on the reset confirmation page.",
    status: "Done",
    priority: "High",
    assignee: "Sam Okonkwo",
    reporter: "Jordan Hale",
    points: 8,
    labels: ["security"],
    updated: "2026-08-08",
    comments: [],
  },
];

export function getIssue(key: string): JiraIssue | undefined {
  return ISSUES.find((issue) => issue.key.toLowerCase() === key.toLowerCase());
}

export function issuesByStatus(status: IssueStatus, issues = ISSUES): JiraIssue[] {
  return issues.filter((issue) => issue.status === status);
}

export const ROVO_REPLIES: { match: RegExp; reply: string }[] = [
  {
    match: /sprint|status|board/i,
    reply:
      "PORTAL Sprint 24 is 60% through. PORTAL-161 is in review (Safari login banner). PORTAL-142 and PORTAL-155 are in progress. Goal: account microsite v2.",
  },
  {
    match: /blocked|risk|bug/i,
    reply:
      "Highest risk is PORTAL-161 — login banner renders twice on Safari because `BannerEnabled` and `bannerEnabled` are both read. I can draft a fix comment if you want.",
  },
  {
    match: /roadmap|goal|okr/i,
    reply:
      "[O1.KR2] Add 300k accounts is linked to PORTAL-142. The strategy brief in Confluence is stale relative to last week's partner calls.",
  },
  {
    match: /rovo|agent|help/i,
    reply:
      "I can summarise the sprint, flag blockers, or draft a comment on any PORTAL work item. Try “what's blocked?” or “summarise PORTAL-142”.",
  },
];

export function replyToRovo(prompt: string): string {
  const hit = ROVO_REPLIES.find((entry) => entry.match.test(prompt));
  if (hit) return hit.reply;
  const issue = ISSUES.find((item) => prompt.toUpperCase().includes(item.key));
  if (issue) {
    return `${issue.key} · ${issue.type} · ${issue.status}. ${issue.summary}. Assigned to ${issue.assignee}. ${issue.description}`;
  }
  return "I searched the Teamwork Graph for that. The closest work is PORTAL Sprint 24 — ask me about the board, blockers, or a work item key.";
}
