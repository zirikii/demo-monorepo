import type { DragEvent, MouseEvent, PointerEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { IssueTypeGlyph } from "./IssueTypeGlyph";
import type { JiraIssue } from "@/data/types";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

function IssueCardFace({ issue }: { issue: JiraIssue }) {
  return (
    <>
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
    </>
  );
}

const CARD_FACE =
  "block rounded-atl-lg border border-line-soft bg-white px-3 py-2.5 shadow-atl";

export function IssueCard({
  issue,
  dragging = false,
  ghost = false,
  onPointerDown,
  onClick,
}: {
  issue: JiraIssue;
  dragging?: boolean;
  ghost?: boolean;
  onPointerDown?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (ghost) {
    return (
      <div className={cn(CARD_FACE, "shadow-atl-lift ring-1 ring-atl-blue/40")}>
        <IssueCardFace issue={issue} />
      </div>
    );
  }

  return (
    <Link
      to={`/jira/issues/${issue.key}`}
      draggable={false}
      aria-grabbed={dragging || undefined}
      onDragStart={(event: DragEvent<HTMLAnchorElement>) => event.preventDefault()}
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={cn(
        CARD_FACE,
        "focus-atl touch-none cursor-grab select-none transition hover:bg-surface-tint",
        dragging && "opacity-40",
      )}
    >
      <IssueCardFace issue={issue} />
    </Link>
  );
}
