import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"] as const;

export function PlatformHiringPage() {
  useDocumentTitle("Hiring");
  const { candidates, advanceCandidate } = useWorkspace();

  return (
    <PlatformLayout title="Hiring" subtitle={`${candidates.length} candidates across 4 open roles`}>
      <div className="grid gap-4 lg:grid-cols-5">
        {stages.map((stage) => {
          const inStage = candidates.filter((candidate) => candidate.stage === stage);
          return (
            <section key={stage} className="rounded-eh-lg border border-eh-line bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold tracking-wide text-eh-ink-faint uppercase">
                  {stage}
                </h2>
                <span className="rounded-full bg-eh-surface-deep px-2 py-0.5 text-xs font-semibold text-eh-ink-soft">
                  {inStage.length}
                </span>
              </div>

              <ul className="mt-4 space-y-3">
                {inStage.map((candidate) => (
                  <li
                    key={candidate.id}
                    className="rounded-eh border border-eh-line-soft bg-eh-surface-tint p-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar name={candidate.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-eh-ink">
                          {candidate.name}
                        </p>
                        <p className="truncate text-xs text-eh-ink-faint">{candidate.role}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <Badge tone={candidate.matchScore >= 85 ? "positive" : "neutral"}>
                        {candidate.matchScore}% match
                      </Badge>
                      <span className="text-[11px] text-eh-ink-ghost">{candidate.source}</span>
                    </div>

                    <p className="mt-2 text-[11px] text-eh-ink-ghost">
                      Applied {formatDate(candidate.appliedAt)}
                    </p>

                    {candidate.stage !== "Hired" ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-3 w-full"
                        onClick={() => advanceCandidate(candidate.id)}
                      >
                        Advance
                      </Button>
                    ) : null}
                  </li>
                ))}
                {inStage.length === 0 ? (
                  <li className="rounded-eh border border-dashed border-eh-line px-3 py-6 text-center text-xs text-eh-ink-ghost">
                    No candidates
                  </li>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>
    </PlatformLayout>
  );
}
