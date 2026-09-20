import { APPLICATION_STAGES, type ApplicationStage } from "@/data/hub";
import { stageIndex } from "@/lib/applications";
import { cn } from "@/lib/cn";

export function StageTracker({ stage }: { stage: ApplicationStage }) {
  const current = stageIndex(stage);

  return (
    <ol className="flex flex-wrap items-center gap-2">
      {APPLICATION_STAGES.map((entry, index) => {
        const reached = index <= current;
        return (
          <li key={entry} className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                reached ? "bg-go-green text-white" : "bg-surface-deep text-ink-faint",
              )}
              aria-current={index === current ? "step" : undefined}
            >
              {entry}
            </span>
            {index < APPLICATION_STAGES.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn("h-0.5 w-4", reached ? "bg-go-green" : "bg-line")}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
