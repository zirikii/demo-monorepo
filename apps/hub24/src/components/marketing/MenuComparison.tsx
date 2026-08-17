import { Badge } from "@/components/ui/Badge";
import { INVESTMENT_MENUS } from "@/data/features";

const ROWS: { label: string; key: keyof (typeof INVESTMENT_MENUS)[number] }[] = [
  { label: "Best suited to", key: "bestFor" },
  { label: "Administration fee", key: "adminFee" },
  { label: "Account keeping fee", key: "accountKeepingFee" },
  { label: "Managed portfolios", key: "managedPortfolios" },
  { label: "Managed funds", key: "managedFunds" },
  { label: "ASX listed securities", key: "listedSecurities" },
  { label: "International securities", key: "internationalSecurities" },
  { label: "Term deposits", key: "termDeposits" },
];

export function MenuComparison() {
  return (
    <div className="overflow-x-auto rounded-hub-lg border border-line bg-white shadow-hub">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of the Discover, Core and Choice investment menus
        </caption>
        <thead>
          <tr className="border-b border-line bg-hub-navy text-white">
            <th scope="col" className="px-5 py-4 text-xs font-extrabold tracking-[0.1em] uppercase">
              Investment menu
            </th>
            {INVESTMENT_MENUS.map((menu) => (
              <th key={menu.name} scope="col" className="px-5 py-4">
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-extrabold tracking-tight">{menu.name}</span>
                  <span className="text-xs font-medium text-white/70">{menu.positioning}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-line-soft last:border-b-0">
              <th scope="row" className="px-5 py-3.5 text-left font-bold text-ink-strong">
                {row.label}
              </th>
              {INVESTMENT_MENUS.map((menu) => {
                const value = String(menu[row.key]);
                const unavailable = value === "Not available";
                return (
                  <td key={menu.name + row.label} className="px-5 py-3.5 align-top">
                    {unavailable ? (
                      <Badge tone="neutral">Not available</Badge>
                    ) : (
                      <span className="text-ink-soft">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
