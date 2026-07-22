import { cn } from "@/lib/cn";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "syd", label: "Sydney", x: 78, y: 58 },
  { id: "mel", label: "Melbourne", x: 62, y: 78 },
  { id: "bne", label: "Brisbane", x: 82, y: 36 },
  { id: "adl", label: "Adelaide", x: 48, y: 68 },
  { id: "per", label: "Perth", x: 18, y: 62 },
];

type Props = {
  hotSite?: string;
};

export function TopologyMap({ hotSite }: Props) {
  return (
    <section className="rounded-2xl border border-noc-line bg-noc-panel/90 p-4 sm:p-5">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-optus">Fabric</p>
        <h2 className="mt-1 text-lg font-semibold">National topology pulse</h2>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-noc-line bg-gradient-to-br from-noc-elevated via-noc-panel to-black">
        <div className="noc-grid absolute inset-0 opacity-30" />
        <svg viewBox="0 0 100 100" className="relative h-56 w-full sm:h-64" role="img" aria-label="Australia network nodes">
          <defs>
            <linearGradient id="link" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00c4b8" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#00c4b8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00c4b8" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {[
            ["per", "adl"],
            ["adl", "mel"],
            ["mel", "syd"],
            ["syd", "bne"],
            ["adl", "syd"],
          ].map(([a, b]) => {
            const from = NODES.find((n) => n.id === a)!;
            const to = NODES.find((n) => n.id === b)!;
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#link)"
                strokeWidth="0.7"
                strokeDasharray="3 3"
                className="animate-flow"
              />
            );
          })}

          {NODES.map((node) => {
            const active = Boolean(
              hotSite && hotSite.toLowerCase().includes(node.label.toLowerCase()),
            );
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={active ? 3.2 : 2.2}
                  className={cn(active ? "fill-sev-warning" : "fill-optus")}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={active ? 6 : 4}
                  className={cn(active ? "fill-sev-warning/20" : "fill-optus/15")}
                />
                <text
                  x={node.x}
                  y={node.y - 5}
                  textAnchor="middle"
                  className="fill-noc-muted"
                  style={{ fontSize: "3.2px" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
