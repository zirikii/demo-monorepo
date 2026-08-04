import type { RateRow } from "@/data/homeLoans";
import { formatRate } from "@/lib/format";

export function RateTable({ caption, rows }: { caption: string; rows: RateRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="border-b border-line bg-surface-tint px-5 py-3 text-left text-sm font-bold text-black">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
            <th scope="col" className="px-5 py-3 font-semibold">
              Rate type
            </th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">
              Interest rate
            </th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">
              Comparison rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.label} className="bg-surface">
              <th scope="row" className="px-5 py-3.5 font-medium text-ink">
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-right font-bold text-black tabular-nums">
                {formatRate(row.rate)}
              </td>
              <td className="px-5 py-3.5 text-right text-ink-soft tabular-nums">
                {formatRate(row.comparisonRate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
