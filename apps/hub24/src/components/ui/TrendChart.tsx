import { cn } from "@/lib/cn";

export interface TrendPoint {
  label: string;
  value: number;
}

interface TrendChartProps {
  points: TrendPoint[];
  title: string;
  className?: string;
}

export function TrendChart({ points, title, className }: TrendChartProps) {
  if (points.length === 0) return null;

  const values = points.map((point) => point.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const width = 640;
  const height = 200;
  const step = width / Math.max(1, points.length - 1);

  const coords = points.map((point, index) => {
    const x = index * step;
    const y = height - ((point.value - min) / span) * (height - 24) - 12;
    return { x, y, ...point };
  });

  const line = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"}${coord.x},${coord.y}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-48 w-full"
        role="img"
        aria-label={title}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hub-trend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0057b8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0057b8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#hub-trend)" />
        <path d={line} fill="none" stroke="#0057b8" strokeWidth="3" strokeLinecap="round" />
        {coords.map((coord) => (
          <circle key={coord.label} cx={coord.x} cy={coord.y} r="4" fill="#00a3ad" />
        ))}
      </svg>
      <figcaption className="flex justify-between text-xs font-semibold text-ink-faint">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}
