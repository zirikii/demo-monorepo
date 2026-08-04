import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { NetBankAccount } from "@/data/netbank";
import { formatBalance, formatBsb } from "@/lib/format";
import { cn } from "@/lib/cn";

export function AccountTile({ account, hidden }: { account: NetBankAccount; hidden: boolean }) {
  const isDebt = account.kind === "credit" || account.kind === "loan";

  return (
    <Link
      to={`/netbank/accounts/${account.id}`}
      className="focus-ring flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-black">{account.name}</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          {account.bsb ? `${formatBsb(account.bsb)} · ${account.number}` : `•••• ${account.number}`}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("text-lg font-bold tabular-nums", isDebt ? "text-alert" : "text-black")}>
          {hidden ? "••••••" : formatBalance(account.balance)}
        </p>
        <p className="text-xs text-ink-muted">
          {hidden ? "Hidden" : `${formatBalance(account.available)} available`}
        </p>
      </div>
      <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-muted" />
    </Link>
  );
}
