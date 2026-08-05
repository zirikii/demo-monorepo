import type { RateTableGroup } from "@/data/rates";

export function RateTable({ group }: { group: RateTableGroup }) {
  const hasComparison = group.rows.some((row) => row.comparison);

  return (
    <section id={group.id} className="scroll-mt-28">
      <h3 className="text-xl font-bold text-ink">{group.title}</h3>
      {group.caption ? <p className="mt-1 text-sm text-ink-soft">{group.caption}</p> : null}
      <div className="mt-4 overflow-x-auto rounded-cba-lg border border-line-soft">
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <caption className="sr-only">{group.title}</caption>
          <thead>
            <tr className="bg-surface-tint">
              <th scope="col" className="px-4 py-3 font-bold text-ink">
                Product
              </th>
              <th scope="col" className="px-4 py-3 font-bold text-ink">
                Interest rate
              </th>
              {hasComparison ? (
                <th scope="col" className="px-4 py-3 font-bold text-ink">
                  Comparison rate
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {group.rows.map((row) => (
              <tr key={row.product} className="align-top">
                <th scope="row" className="px-4 py-3 font-normal text-ink">
                  {row.product}
                  {row.note ? (
                    <span className="block text-[13px] text-ink-faint">{row.note}</span>
                  ) : null}
                </th>
                <td className="px-4 py-3 font-bold whitespace-nowrap text-ink">{row.rate}</td>
                {hasComparison ? (
                  <td className="px-4 py-3 whitespace-nowrap text-ink-soft">
                    {row.comparison ?? "—"}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
