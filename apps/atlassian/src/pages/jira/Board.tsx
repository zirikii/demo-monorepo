import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Filter,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import { CreateIssueDialog } from "@/components/jira/CreateIssueDialog";
import { IssueCard } from "@/components/jira/IssueCard";
import { JiraLayout } from "@/components/jira/JiraLayout";
import { BOARD_COLUMNS, SPRINT } from "@/data/jira";
import type { IssueStatus, IssueType } from "@/data/types";
import { useAuth } from "@/hooks/useAuth";
import { useBoardCardDrag } from "@/hooks/useBoardCardDrag";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
import { createIssue, issuesByStatus, readIssues, updateIssueStatus } from "@/lib/issues";
import { readJson } from "@/lib/storage";

const TYPE_FILTERS: Array<"All types" | IssueType> = ["All types", "Story", "Task", "Bug", "Epic"];

function ToolbarIconButton({ label, icon: Icon }: { label: string; icon: typeof Filter }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="focus-atl flex h-8 w-8 items-center justify-center rounded-atl-sm text-ink-soft hover:bg-surface-deep"
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}

export default function BoardPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("All types");
  const [issues, setIssues] = useState(readIssues);
  const [createStatus, setCreateStatus] = useState<IssueStatus | null>(null);
  const { drag, ghostRef, onCardPointerDown, onCardClick } = useBoardCardDrag(({ key, status }) => {
    setIssues(updateIssueStatus(key, status));
  });
  const showReleaseRisk = readJson("atlassian-demo-settings", {
    releaseInsights: false,
  }).releaseInsights;

  const boardPeople = useMemo(() => {
    const names = [user?.name ?? "You"];
    for (const issue of issues) {
      if (!names.includes(issue.assignee)) names.push(issue.assignee);
      if (names.length === 3) break;
    }
    return names;
  }, [issues, user]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchesQuery =
        !needle ||
        issue.summary.toLowerCase().includes(needle) ||
        issue.key.toLowerCase().includes(needle);
      const matchesType = typeFilter === "All types" || issue.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [issues, query, typeFilter]);

  return (
    <JiraLayout title={`Board · ${SPRINT.name}`} onCreate={() => setCreateStatus("To do")}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink-strong">{SPRINT.name}</h2>
          <p className="mt-0.5 text-sm text-ink-soft">{SPRINT.goal}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-ink-ghost"
          />
          <input
            id="board-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search work items"
            aria-label="Search work items"
            className="focus-atl h-8 w-44 rounded-atl-lg border border-line bg-white pr-3 pl-8 text-sm text-ink placeholder:text-ink-ghost focus:border-atl-blue"
          />
        </div>
        <label className="sr-only" htmlFor="board-type-filter">
          Type
        </label>
        <select
          id="board-type-filter"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as (typeof TYPE_FILTERS)[number])}
          className="focus-atl h-8 rounded-atl-lg border border-line bg-white px-2 text-sm text-ink"
        >
          {TYPE_FILTERS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex items-center -space-x-1" aria-label="Board members" role="group">
          {boardPeople.map((name, index) => (
            <span
              key={name}
              aria-label={name}
              title={name}
              className={
                index === 0
                  ? "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-atl-ember text-[0.6rem] font-bold text-white"
                  : "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-atl-navy text-[0.6rem] font-bold text-white"
              }
            >
              {initials(name)}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="focus-atl flex h-8 items-center gap-1.5 rounded-atl-sm px-2.5 text-sm font-medium text-ink-soft hover:bg-surface-deep"
        >
          <Filter aria-hidden className="h-4 w-4" />
          Filter
        </button>
        <span aria-hidden className="h-5 w-px bg-line" />
        <button
          type="button"
          className="focus-atl flex h-8 items-center gap-1.5 rounded-atl-sm px-2.5 text-sm font-medium text-ink-soft hover:bg-surface-deep"
        >
          <SlidersHorizontal aria-hidden className="h-4 w-4" />
          Group
        </button>
        <div className="ml-auto flex items-center gap-0.5">
          <ToolbarIconButton label="Insights" icon={TrendingUp} />
          <ToolbarIconButton label="View settings" icon={SlidersHorizontal} />
          <ToolbarIconButton label="Feedback" icon={Megaphone} />
          <ToolbarIconButton label="More board actions" icon={MoreHorizontal} />
        </div>
      </div>

      {showReleaseRisk ? (
        <div className="mt-3 rounded-atl-lg border border-caution/30 bg-caution-tint px-3 py-2">
          <span className="text-[0.65rem] font-extrabold tracking-wide text-caution uppercase">
            Release risk
          </span>
          <span className="ml-2 text-sm text-ink-strong">
            Login banner on Safari is blocking the sprint goal.
          </span>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-ink-faint">No work items match that search.</p>
      ) : (
        <div className="mt-4 flex items-start gap-3 overflow-x-auto pb-4">
          {BOARD_COLUMNS.map((status) => {
            const columnIssues = issuesByStatus(status, filtered);
            const isOrigin = drag?.issue.status === status;
            const isDropTarget = Boolean(drag && drag.dropStatus === status && !isOrigin);
            const isDropReady = Boolean(drag && !isOrigin && !isDropTarget);
            return (
              <section
                key={status}
                aria-label={status}
                data-board-column={status}
                className={cn(
                  "min-h-48 w-64 shrink-0 rounded-atl-lg p-1.5 transition-[background-color,box-shadow,ring-color] duration-150",
                  isDropTarget && "bg-atl-tint-strong ring-2 ring-atl-blue ring-inset",
                  isDropReady && "bg-atl-tint ring-1 ring-atl-sky ring-inset",
                  !drag && "bg-surface-deep",
                  isOrigin && "bg-surface-deep",
                )}
              >
                <header className="flex items-baseline gap-1.5 px-2 pt-1.5 pb-2">
                  <h3 className="text-xs font-semibold text-ink-soft">{status}</h3>
                  <span className="text-xs font-medium text-ink-faint">{columnIssues.length}</span>
                </header>
                <ul className="flex min-h-16 flex-col gap-1.5">
                  {columnIssues.map((issue) => (
                    <li key={issue.key}>
                      <IssueCard
                        issue={issue}
                        dragging={drag?.issue.key === issue.key}
                        onPointerDown={(event) => onCardPointerDown(issue, event)}
                        onClick={onCardClick}
                      />
                    </li>
                  ))}
                  {isDropTarget ? (
                    <li
                      aria-hidden
                      className="rounded-atl-lg border-2 border-dashed border-atl-blue bg-atl-sky/50 px-3 py-6"
                    />
                  ) : null}
                </ul>
                <button
                  type="button"
                  aria-label={`Create in ${status}`}
                  onClick={() => setCreateStatus(status)}
                  className="focus-atl mt-1.5 flex w-full items-center gap-1.5 rounded-atl px-2 py-1.5 text-sm font-medium text-ink-soft hover:bg-line-soft"
                >
                  <Plus aria-hidden className="h-4 w-4" />
                  Create
                </button>
              </section>
            );
          })}
        </div>
      )}
      {drag
        ? createPortal(
            <div
              ref={ghostRef}
              className="pointer-events-none fixed top-0 left-0 z-[80] origin-top-left cursor-grabbing"
              style={{
                width: drag.width,
                transform: `translate(${drag.x - drag.offsetX}px, ${drag.y - drag.offsetY}px) rotate(3deg)`,
              }}
            >
              <IssueCard issue={drag.issue} ghost />
            </div>,
            document.body,
          )
        : null}

      <CreateIssueDialog
        open={createStatus !== null}
        status={createStatus ?? "To do"}
        assignee={user?.name ?? "Maya Chen"}
        onClose={() => setCreateStatus(null)}
        onCreate={(input) => {
          createIssue({ ...input, assignee: user?.name ?? "Maya Chen" });
          setIssues(readIssues());
        }}
      />
    </JiraLayout>
  );
}
