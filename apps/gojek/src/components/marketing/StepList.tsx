import { cn } from "@/lib/cn";

export type Step = { title: string; body: string };

export function StepList({
  steps,
  accentDot = "bg-gojek",
}: {
  steps: Step[];
  accentDot?: string;
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="relative rounded-2xl border border-line bg-card p-6">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white",
              accentDot,
            )}
          >
            {index + 1}
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
