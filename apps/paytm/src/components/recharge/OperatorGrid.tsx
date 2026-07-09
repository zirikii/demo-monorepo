import type { Operator } from "../../data/operators";

interface OperatorGridProps {
  operators: Operator[];
  suffix?: string;
}

/** Round operator tiles ("Airtel Recharge", "Jio Recharge", ...). */
export function OperatorGrid({ operators, suffix = "Recharge" }: OperatorGridProps) {
  return (
    <section aria-label="Select an operator" className="rounded-2xl bg-card p-6 shadow-card">
      <h2 className="text-sm font-bold text-ink">Select an Operator</h2>
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-5">
        {operators.map((op) => (
          <li key={op.id}>
            <div className="flex w-24 flex-col items-center gap-2 text-center">
              <span
                aria-hidden="true"
                style={{ color: op.accent }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-hairline bg-white text-sm font-extrabold shadow-sm"
              >
                {op.short}
              </span>
              <span className="text-xs leading-tight text-ink-soft">
                {op.name} {suffix}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
