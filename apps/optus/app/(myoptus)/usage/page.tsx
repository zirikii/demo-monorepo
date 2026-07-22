const USAGE = [
  { label: "Data", used: 62, detail: "62GB of 100GB", color: "bg-optus-teal" },
  { label: "Talk", used: 8, detail: "Unlimited standard national", color: "bg-optus-yellow" },
  { label: "Text", used: 4, detail: "Unlimited standard national", color: "bg-optus-teal-dark" },
];

const DAILY = [12, 18, 9, 22, 14, 27, 19, 24, 16, 31, 21, 28, 17, 25];

export default function UsagePage() {
  const max = Math.max(...DAILY);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">Usage</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Current billing period · Medium plan</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {USAGE.map((item) => (
          <div key={item.label} className="rounded-lg border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase text-optus-ink/50">{item.label}</p>
            <p className="mt-2 text-sm font-semibold text-optus-ink">{item.detail}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.used}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-line bg-white p-5">
        <h3 className="font-bold text-optus-ink">Daily data (GB)</h3>
        <div className="mt-4 flex h-40 items-end gap-1.5" role="img" aria-label="Daily data usage bar chart">
          {DAILY.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-optus-teal/80 transition-all hover:bg-optus-teal"
              style={{ height: `${(v / max) * 100}%` }}
              title={`${v}GB`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-optus-ink/60">Last 14 days</p>
      </div>
    </div>
  );
}
