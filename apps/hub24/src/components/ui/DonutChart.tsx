import { cn } from "@/lib/cn";

export interface DonutSlice {
  label: string;
  value: number;
}

const COLORS = ["#0057b8", "#00a3ad", "#4b8fe0", "#7fd4d8", "#06263f", "#94a3b3"];

interface DonutChartProps {
  slices: DonutSlice[];
  title: string;
  className?: string;
  valueFormatter?: (value: number) => string;
}

/**
 * Rendered as stroked arcs on a single circle rather than paths: the dash offsets are trivial
 * to compute and the result stays crisp at any size without a charting dependency.
 */
export function DonutChart({ slices, title, className, valueFormatter }: DonutChartProps) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={cn("flex flex-col items-center gap-6 sm:flex-row", className)}>
      <svg viewBox="0 0 160 160" className="h-40 w-40 shrink-0" role="img" aria-label={title}>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#eef3f7" strokeWidth="24" />
        {slices.map((slice, index) => {
          const fraction = slice.value / total;
          const dash = fraction * circumference;
          const element = (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={COLORS[index % COLORS.length]}
              strokeWidth="24"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
            />
          );
          offset += dash;
          return element;
        })}
      </svg>

      <ul className="flex w-full flex-col gap-2">
        {slices.map((slice, index) => (
          <li key={slice.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-ink-soft">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              {slice.label}
            </span>
            <span className="font-bold text-ink-strong">
              {valueFormatter
                ? valueFormatter(slice.value)
                : `${Math.round((slice.value / total) * 100)}%`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
