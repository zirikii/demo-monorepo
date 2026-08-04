import { Link } from "react-router-dom";
import { demoAccounts } from "@/data/accounts";
import { formatAud, maskAccount } from "@/lib/format";

export function AccountsList() {
  return (
    <section>
      <h1 className="text-2xl font-extrabold text-ink">Accounts</h1>
      <p className="mt-1 text-sm text-ink-soft">Demo balances in AUD — not real money.</p>
      <ul className="mt-6 space-y-3">
        {demoAccounts.map((acc) => (
          <li key={acc.id}>
            <Link
              to={`/netbank/accounts/${acc.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-4 hover:border-cba-yellow"
            >
              <div>
                <p className="font-bold text-ink">{acc.name}</p>
                <p className="text-xs text-ink-faint">
                  BSB {acc.bsb} · {maskAccount(acc.number)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-ink">{formatAud(acc.balance)}</p>
                <p className="text-xs text-ink-soft">Available {formatAud(acc.available)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
