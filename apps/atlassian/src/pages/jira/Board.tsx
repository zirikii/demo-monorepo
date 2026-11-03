import { useMemo, useRef, useState, type DragEvent } from "react";
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
import { columnStatusAtPoint } from "@/lib/boardDrag";
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
  const draggingKey = useRef<string | null>(null);
  const hoveredColumn = useRef<IssueStatus | null>(null);
  const dropHandled = useRef(false);
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

  function moveIssue(key: string, status: IssueStatus) {
    const current = readIssues().find((issue) => issue.key === key);
    if (!current || current.status === status) return;
    setIssues(updateIssueStatus(key, status));
  }

  function onColumnDragOver(status: IssueStatus, event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    hoveredColumn.current = status;
  }

  function onColumnDrop(status: IssueStatus, event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const key = event.dataTransfer.getData("text/plain") || draggingKey.current || "";
    dropHandled.current = true;
    hoveredColumn.current = null;
    if (key) moveIssue(key, status);
  }

  function onCardDragEnd(key: string, point: { x: number; y: number }) {
    draggingKey.current = null;
    const hovered = hoveredColumn.current;
    hoveredColumn.current = null;
    if (dropHandled.current) {
      dropHandled.current = false;
      return;
    }
    const pointed = columnStatusAtPoint(point.x, point.y);
    if (pointed) {
      moveIssue(key, pointed);
      return;
    }
    // Some browsers return no element under the pointer on dragend. The last
    // column that accepted dragover is the destination in that case only.
    const stack =
      typeof document.elementsFromPoint === "function"
        ? document.elementsFromPoint(point.x, point.y)
        : null;
    const hitTestEmpty = stack
      ? stack.length === 0
      : document.elementFromPoint(point.x, point.y) == null;
    if (hitTestEmpty && hovered) moveIssue(key, hovered);
  }

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
        <div className="scrollbar-none mt-4 flex min-w-0 items-start gap-3 overflow-x-auto pb-4">
          {BOARD_COLUMNS.map((status) => {
            const columnIssues = issuesByStatus(status, filtered);
            return (
              <section
                key={status}
                aria-label={status}
                data-column-status={status}
                onDragOver={(event) => onColumnDragOver(status, event)}
                onDrop={(event) => onColumnDrop(status, event)}
                className="w-64 shrink-0 rounded-atl-lg bg-surface-deep p-1.5"
              >
                <header className="flex items-baseline gap-1.5 px-2 pt-1.5 pb-2">
                  <h3 className="text-xs font-semibold text-ink-soft">{status}</h3>
                  <span className="text-xs font-medium text-ink-faint">{columnIssues.length}</span>
                </header>
                {columnIssues.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {columnIssues.map((issue) => (
                      <li key={issue.key}>
                        <IssueCard
                          issue={issue}
                          onDragStart={(key) => {
                            draggingKey.current = key;
                            dropHandled.current = false;
                          }}
                          onDragEnd={onCardDragEnd}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
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
