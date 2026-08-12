import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Badge } from "@/components/ui/Badge";
import { seedReviewCycles } from "@/data/platform";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatPercent } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformPerformancePage() {
  useDocumentTitle("Performance");
  const { employees } = useWorkspace();

  return (
    <PlatformLayout title="Performance" subtitle="Review cycles, goals and feedback">
      <div className="grid gap-4 md:grid-cols-3">
        {seedReviewCycles.map((cycle) => {
          const progress = (cycle.completed / cycle.participants) * 100;
          return (
            <section key={cycle.id} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold text-eh-ink">{cycle.name}</h2>
                <Badge tone={cycle.status === "Open" ? "purple" : "neutral"}>{cycle.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-eh-ink-faint">{cycle.window}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-eh-ink-soft">
                    {cycle.completed} of {cycle.participants} complete
                  </span>
                  <span className="font-semibold text-eh-purple">{formatPercent(progress, 0)}</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-eh-surface-deep"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cycle.name} completion`}
                >
                  <div className="h-full rounded-full bg-eh-purple" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-8 rounded-eh-lg border border-eh-line bg-white p-6">
        <h2 className="text-lg font-semibold text-eh-ink">Nine-box talent grid</h2>
        <p className="mt-1 text-sm text-eh-ink-faint">
          Performance against potential for the {employees.length} people in the current cycle.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            "Enigma",
            "Growth employee",
            "Future leader",
            "Dilemma",
            "Core player",
            "High impact",
            "Under performer",
            "Effective",
            "Trusted professional",
          ].map((label, index) => (
            <div
              key={label}
              className="rounded-eh border border-eh-line-soft bg-eh-surface-tint p-4 text-center"
            >
              <p className="text-xs font-semibold text-eh-ink-soft">{label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-eh-purple">
                {[1, 2, 1, 0, 3, 2, 0, 2, 1][index]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PlatformLayout>
  );
}
