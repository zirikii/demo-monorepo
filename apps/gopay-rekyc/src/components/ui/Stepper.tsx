import { cn } from "../../lib/cn";

export function Stepper({
  steps,
  current,
}: {
  steps: { label: string }[];
  current: number;
}) {
  return (
    <ol className="flex items-center justify-between gap-3">
      {steps.map((step, index) => {
        const active = index <= current;
        return (
          <li key={step.label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <span className="flex w-full items-center">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-static-white",
                  active ? "bg-gopay-active" : "bg-[#d5d8de] text-text-body",
                )}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span className={cn("mx-2 h-1 flex-1 rounded-full", active ? "bg-gopay-active" : "bg-[#d5d8de]")} />
              ) : null}
            </span>
            <span className={cn("text-xs font-semibold", active ? "text-text-title" : "text-text-body")}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
