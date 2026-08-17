import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { CLIENTS } from "@/data/clients";
import { formatCurrency } from "@/lib/format";

export default function InvestorAccountsPage() {
  const accounts = CLIENTS.slice(0, 8);

  return (
    <PortalLayout title="Accounts" description="Portfolio dashboard">
      <ul className="divide-y divide-line rounded-hub-lg border border-line bg-white">
        {accounts.map((account) => (
          <li key={account.id}>
            <Link
              to={`/investorhub/accounts/${account.id}`}
              className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-surface-tint"
            >
              <div>
                <p className="font-semibold">{account.product}</p>
                <p className="text-xs text-ink-faint">{account.id}</p>
              </div>
              <p className="font-semibold">{formatCurrency(account.balance)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PortalLayout>
  );
}
