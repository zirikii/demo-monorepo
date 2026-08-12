import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CANDIDATES } from "@/data/platform";
import type { Candidate } from "@/data/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

const STAGES: Candidate["stage"][] = ["Applied", "Screening", "Interview", "Offer", "Hired"];

export default function PlatformHiring() {
  const [selected, setSelected] = useState<Candidate>(CANDIDATES[0]!);

  const openRoles = Array.from(new Set(CANDIDATES.map((candidate) => candidate.role)));
  const smartMatched = CANDIDATES.filter((candidate) => candidate.source === "SmartMatch");

  return (
    <PlatformLayout
      title="Hiring"
      description={`${CANDIDATES.length} candidates across ${openRoles.length} open roles`}
      actions={
        <>
          <ButtonLink to="/jobs" size="sm">
            View the job board
          </ButtonLink>
          <ButtonLink to="/products/recruitment-agent" variant="secondary" size="sm">
            About the Recruitment Agent
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Open roles" value={String(openRoles.length)} />
        <StatTile label="Candidates in pipeline" value={String(CANDIDATES.length)} />
        <StatTile
          label="From SmartMatch"
          value={String(smartMatched.length)}
          trend="No paid advertising spend"
          trendTone="positive"
        />
        <StatTile label="Median time to hire" value="11 days" trend="-4 days vs last quarter" trendTone="positive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {STAGES.map((stage) => {
          const candidates = CANDIDATES.filter((candidate) => candidate.stage === stage);
          return (
            <div key={stage} className="flex flex-col gap-3 rounded-eh-lg border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold tracking-wide text-ink-strong uppercase">
                  {stage}
                </h2>
                <span className="rounded-full bg-surface-deep px-2 py-0.5 text-xs font-bold text-ink-faint">
                  {candidates.length}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {candidates.map((candidate) => (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(candidate)}
                      aria-pressed={selected.id === candidate.id}
                      className={cn(
                        "focus-eh w-full rounded-eh border p-3 text-left transition",
                        selected.id === candidate.id
                          ? "border-eh-purple bg-eh-tint"
                          : "border-line bg-surface-tint hover:border-eh-violet-soft",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Avatar name={candidate.name} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-ink-strong">
                            {candidate.name}
                          </span>
                          <span className="block truncate text-xs text-ink-faint">
                            {candidate.role}
                          </span>
                        </span>
                      </span>
                      <span className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-ink-faint">{candidate.source}</span>
                        <span className="text-xs font-bold text-eh-purple">
                          {candidate.matchScore}%
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
                {candidates.length === 0 ? (
                  <li className="rounded-eh border border-dashed border-line px-3 py-6 text-center text-xs text-ink-ghost">
                    Nothing here
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <PanelCard
          title={`${selected.name} — ${selected.role}`}
          subtitle={`Applied ${formatDate(selected.appliedOn)} via ${selected.source}`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>
                <Sparkles aria-hidden className="h-3 w-3" />
                {selected.matchScore}% SmartMatch
              </Badge>
              <Badge tone="neutral">{selected.stage}</Badge>
              <Badge tone="neutral">{selected.location}</Badge>
            </div>
            <div className="rounded-eh border border-line bg-surface-tint px-5 py-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                <Sparkles aria-hidden className="h-3.5 w-3.5" />
                Recruitment Agent summary
              </p>
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">{selected.agentSummary}</p>
            </div>
            <p className="text-sm text-ink-faint">
              The agent scores and recommends. Progressing, rejecting and offering all need a person to
              approve them.
            </p>
          </div>
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
