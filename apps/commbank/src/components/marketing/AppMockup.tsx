import { seedAccounts } from "@/data/netbank";
import { formatCurrency } from "@/lib/format";

const previewAccounts = seedAccounts
  .filter((account) => ["smart-access", "netbank-saver", "goalsaver"].includes(account.id))
  .map((account) => ({
    id: account.id,
    name: account.name.split(" — ")[0] ?? account.name,
    balance: account.balance,
  }));

/** A stylised CommBank app screen, drawn in markup so there is no image to load. */
export function AppMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-[240px] rounded-[2.25rem] bg-ink p-2.5 shadow-cba-lift"
    >
      <div className="overflow-hidden rounded-[1.75rem] bg-surface">
        <div className="bg-ink px-4 pb-4 pt-3 text-surface">
          <div className="flex items-center justify-between text-[10px] text-surface/60">
            <span>9:41</span>
            <span className="h-1.5 w-10 rounded-full bg-surface/30" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <img src="/brand/diamond.svg" alt="" className="h-5 w-5" />
            <p className="text-sm font-bold">Hi Alex</p>
          </div>
        </div>

        <ul className="divide-y divide-line-soft px-4">
          {previewAccounts.map((account) => (
            <li key={account.id} className="flex items-center justify-between gap-2 py-2.5">
              <span className="truncate text-[11px] text-ink-soft">{account.name}</span>
              <span className="shrink-0 text-[11px] font-bold tabular-nums text-ink">
                {formatCurrency(account.balance)}
              </span>
            </li>
          ))}
        </ul>

        <div className="px-4 pb-5 pt-2">
          <p className="rounded-full bg-cba-yellow py-2 text-center text-[11px] font-bold text-ink">
            Pay someone
          </p>
          <div className="mt-3 flex items-end gap-1.5">
            {[40, 62, 34, 78, 52, 88, 46].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm bg-surface-deep"
                style={{ height: `${height * 0.35}px` }}
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] text-ink-faint">Spending this week</p>
        </div>
      </div>
    </div>
  );
}
