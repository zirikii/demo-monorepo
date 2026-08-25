import { useState, type FormEvent, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { IssueTypeGlyph } from "@/components/jira/IssueTypeGlyph";
import { JiraLayout } from "@/components/jira/JiraLayout";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Select, TextArea } from "@/components/ui/Field";
import { BOARD_COLUMNS } from "@/data/jira";
import type { IssueStatus, JiraIssue } from "@/data/types";
import { useAuth } from "@/hooks/useAuth";
import { formatDate, initials } from "@/lib/format";
import { addIssueComment, getStoredIssue, updateIssueStatus } from "@/lib/issues";
import { cn } from "@/lib/cn";

const STATUS_TONE: Record<IssueStatus, string> = {
  "To do": "bg-surface-deep text-ink-soft",
  "In progress": "bg-info-tint text-info",
  "In review": "bg-caution-tint text-caution",
  Done: "bg-positive-tint text-positive",
};

export default function IssuePage() {
  const { key } = useParams<{ key: string }>();
  const issue = key ? getStoredIssue(key) : undefined;

  if (!issue) {
    return (
      <JiraLayout title="Work item">
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h2 className="text-xl font-extrabold text-ink-strong">Work item not found</h2>
          <p className="mt-2 text-sm text-ink-soft">
            {key ? `${key} is not in this project.` : "No work item key was provided."}
          </p>
          <ButtonLink to="/jira" shape="box" className="mt-6">
            Back to board
          </ButtonLink>
        </div>
      </JiraLayout>
    );
  }

  return <IssueDetail key={issue.key} issue={issue} />;
}

function IssueDetail({ issue: initial }: { issue: JiraIssue }) {
  const { user } = useAuth();
  const [issue, setIssue] = useState(initial);
  const [comment, setComment] = useState("");

  function onStatusChange(next: IssueStatus) {
    updateIssueStatus(issue.key, next);
    setIssue((current) => ({ ...current, status: next }));
  }

  function onComment(event: FormEvent) {
    event.preventDefault();
    const body = comment.trim();
    if (!body) return;
    const next = addIssueComment({ key: issue.key, author: user?.name ?? "You", body });
    const updated = next.find((item) => item.key === issue.key);
    if (updated) setIssue(updated);
    setComment("");
  }

  return (
    <JiraLayout title={`${issue.key} · ${issue.summary}`}>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="rounded-atl-sm border border-line bg-white p-6">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-ink-faint uppercase">
            <IssueTypeGlyph type={issue.type} />
            {issue.type}
            <span className="text-ink-ghost">·</span>
            {issue.key}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink-strong">{issue.summary}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{issue.description}</p>

          {issue.labels.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {issue.labels.map((label) => (
                <li key={label}>
                  <Badge>{label}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <section className="mt-8 border-t border-line pt-6">
            <h3 className="text-sm font-extrabold text-ink-strong">Comments</h3>
            {issue.comments.length === 0 ? (
              <p className="mt-3 text-sm text-ink-faint">No comments yet.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {issue.comments.map((entry) => (
                  <li key={entry.id} className="rounded-atl bg-surface-tint px-3 py-2">
                    <p className="text-xs font-semibold text-ink-faint">
                      {entry.author} · {formatDate(entry.created)}
                    </p>
                    <p className="mt-1 text-sm text-ink-strong">{entry.body}</p>
                  </li>
                ))}
              </ul>
            )}
            <form className="mt-4 flex flex-col gap-2" onSubmit={onComment}>
              <Field label="Add a comment" htmlFor="issue-comment">
                <TextArea
                  id="issue-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Write a comment"
                />
              </Field>
              <Button type="submit" shape="box" className="self-end" disabled={!comment.trim()}>
                Comment
              </Button>
            </form>
          </section>
        </article>

        <aside className="flex flex-col gap-4 rounded-atl-sm border border-line bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink-faint">Status</span>
            <span
              className={cn(
                "rounded-atl-sm px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide uppercase",
                STATUS_TONE[issue.status],
              )}
            >
              {issue.status}
            </span>
          </div>
          <Field label="Status" htmlFor="issue-status">
            <Select
              id="issue-status"
              value={issue.status}
              onChange={(event) => onStatusChange(event.target.value as IssueStatus)}
            >
              {BOARD_COLUMNS.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </Select>
          </Field>

          <dl className="flex flex-col gap-3 text-sm">
            <MetaRow label="Priority" value={issue.priority} />
            <MetaRow label="Assignee" value={<Person name={issue.assignee} />} />
            <MetaRow label="Reporter" value={<Person name={issue.reporter} />} />
            <MetaRow label="Story points" value={String(issue.points)} />
            <MetaRow label="Updated" value={formatDate(issue.updated)} />
          </dl>
        </aside>
      </div>
    </JiraLayout>
  );
}

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="text-right font-semibold text-ink-strong">{value}</dd>
    </div>
  );
}

function Person({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-full bg-atl-navy text-[0.6rem] font-bold text-white"
      >
        {initials(name)}
      </span>
      {name}
    </span>
  );
}
