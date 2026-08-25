const NODES = [
  { label: "Project", x: 12, y: 18 },
  { label: "Sprint", x: 38, y: 10 },
  { label: "Team", x: 72, y: 16 },
  { label: "Work item", x: 18, y: 62 },
  { label: "Roadmap", x: 78, y: 58 },
  { label: "Focus area", x: 52, y: 78 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [1, 5],
];

export function GraphStage({ caption }: { caption: string }) {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(53,125,232,0.22),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(191,99,243,0.2),transparent_38%),radial-gradient(circle_at_70%_80%,rgba(242,172,0,0.18),transparent_40%)] p-4">
      <svg viewBox="0 0 100 100" className="h-[320px] w-full">
        {LINKS.map(([from, to]) => {
          const a = NODES[from];
          const b = NODES[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#357DE8"
              strokeOpacity="0.28"
              strokeWidth="0.6"
            />
          );
        })}
        {NODES.map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="2.2" fill="#357DE8" />
            <text x={node.x + 3.2} y={node.y + 1.2} fontSize="3.4" fill="#101214" fontWeight="700">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute right-6 bottom-6 left-6 border border-atl-blue/20 bg-white/92 p-4 shadow-atl">
        <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
          Pulling in context…
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{caption}</p>
      </div>
    </div>
  );
}
