import { useRef, type DragEvent, type MouseEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { IssueTypeGlyph } from "./IssueTypeGlyph";
import type { JiraIssue } from "@/data/types";
import { initials } from "@/lib/format";

export function IssueCard({
  issue,
  onDragStart,
  onDragEnd,
}: {
  issue: JiraIssue;
  onDragStart: (key: string) => void;
  onDragEnd: (key: string, point: { x: number; y: number }) => void;
}) {
  const dragEndedAt = useRef(0);

  function handleDragStart(event: DragEvent<HTMLAnchorElement>) {
    event.dataTransfer.setData("text/plain", issue.key);
    event.dataTransfer.effectAllowed = "move";
    onDragStart(issue.key);
  }

  function handleDragEnd(event: DragEvent<HTMLAnchorElement>) {
    dragEndedAt.current = Date.now();
    onDragEnd(issue.key, { x: event.clientX, y: event.clientY });
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (Date.now() - dragEndedAt.current > 400) return;
    event.preventDefault();
  }

  return (
    <Link
      to={`/jira/issues/${issue.key}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={(event: DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className="focus-atl block cursor-grab rounded-atl-lg border border-line-soft bg-white px-3 py-2.5 shadow-atl transition hover:bg-surface-tint active:cursor-grabbing"
    >
      <p className="text-sm text-ink-strong">{issue.summary}</p>
      {issue.labels.length > 0 ? (
        <span className="mt-2 flex flex-wrap gap-1">
          {issue.labels.map((label) => (
            <span
              key={label}
              className="rounded-atl bg-surface-deep px-1.5 py-0.5 text-[0.7rem] font-medium text-ink-soft"
            >
              {label}
            </span>
          ))}
        </span>
      ) : null}
      <span className="mt-2.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint">
          <IssueTypeGlyph type={issue.type} />
          {issue.key}
          {issue.status === "Done" ? (
            <CheckCircle2 aria-label="Done" className="h-3.5 w-3.5 text-positive" />
          ) : null}
        </span>
        <span
          aria-label={issue.assignee}
          title={issue.assignee}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-atl-navy text-[0.6rem] font-bold text-white"
        >
          {initials(issue.assignee)}
        </span>
      </span>
    </Link>
  );
}
