import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IssueTypeGlyph } from "@/components/jira/IssueTypeGlyph";
import { JiraLayout } from "@/components/jira/JiraLayout";
import { Field, TextInput } from "@/components/ui/Field";
import { SPRINT } from "@/data/jira";
import type { IssueStatus } from "@/data/types";
import { initials } from "@/lib/format";
import { readIssues } from "@/lib/issues";
import { cn } from "@/lib/cn";

const STATUS_TONE: Record<IssueStatus, string> = {
  "To do": "bg-surface-deep text-ink-soft",
  "In progress": "bg-info-tint text-info",
  "In review": "bg-caution-tint text-caution",
  Done: "bg-positive-tint text-positive",
};

export default function BacklogPage() {
  const [query, setQuery] = useState("");
  const issues = readIssues();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return issues;
    return issues.filter(
      (issue) =>
        issue.summary.toLowerCase().includes(needle) || issue.key.toLowerCase().includes(needle),
    );
  }, [issues, query]);

  return (
    <JiraLayout title="Backlog">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-ink-strong">Backlog</h2>
          <p className="mt-0.5 text-sm text-ink-soft">{filtered.length} work items</p>
        </div>
        <Field label="Search backlog" htmlFor="backlog-search" className="w-full max-w-xs">
          <TextInput
            id="backlog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Key or summary"
          />
        </Field>
      </div>

      <section className="mt-5 rounded-atl-sm border border-line bg-white">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-surface-tint px-4 py-2.5">
          <h3 className="text-sm font-extrabold text-ink-strong">{SPRINT.name}</h3>
          <span className="text-xs font-semibold text-ink-faint">{filtered.length}</span>
        </header>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-faint">
            No work items match that search.
          </p>
        ) : (
          <ul>
            {filtered.map((issue) => (
              <li
                key={issue.key}
                className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0 hover:bg-surface-tint"
              >
                <IssueTypeGlyph type={issue.type} />
                <Link
                  to={`/jira/issues/${issue.key}`}
                  name={issue.key}
                  className="focus-atl shrink-0 text-sm font-semibold text-atl-blue hover:underline"
                >
                  {issue.key}
                </Link>
                <Link
                  to={`/jira/issues/${issue.key}`}
                  className="focus-atl min-w-0 flex-1 truncate text-sm font-semibold text-ink-strong hover:text-atl-blue"
                >
                  {issue.summary}
                </Link>
                <span
                  className={cn(
                    "rounded-atl-sm px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide uppercase",
                    STATUS_TONE[issue.status],
                  )}
                >
                  {issue.status}
                </span>
                <span
                  aria-label={issue.assignee}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-atl-navy text-[0.6rem] font-bold text-white"
                >
                  {initials(issue.assignee)}
                </span>
                <span className="w-6 shrink-0 text-right text-xs font-bold text-ink-soft">
                  {issue.points}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </JiraLayout>
  );
}
