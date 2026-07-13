export default function UsagePage() {
  const rows = [
    { label: "Mobile data", used: "31.2 GB", limit: "50 GB high-speed", pct: 62 },
    { label: "NZ calls", used: "142 min", limit: "Unlimited", pct: 18 },
    { label: "NZ texts", used: "88", limit: "Unlimited", pct: 8 },
    { label: "International", used: "24 min", limit: "200 min", pct: 12 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-spark-ink">Usage</h2>
      <p className="mt-1 text-sm text-spark-ink/70">Current billing cycle (demo figures).</p>
      <ul className="mt-8 space-y-5">
        {rows.map((row) => (
          <li key={row.label} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-spark-ink">{row.label}</p>
              <p className="text-sm text-spark-ink/70">
                {row.used} / {row.limit}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-spark-purple"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
