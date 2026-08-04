import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Account } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatCurrency, formatRate, maskAccountNumber } from "@/lib/format";

const kindLabels: Record<Account["kind"], string> = {
  transaction: "Everyday account",
  savings: "Savings account",
  credit: "Credit card",
  "home-loan": "Home loan",
  "term-deposit": "Term Deposit",
};

export function AccountRow({ account }: { account: Account }) {
  return (
    <li>
      <Link
        to={`/netbank/accounts/${account.id}`}
        className="focus-cba flex items-center gap-4 rounded-cba-lg bg-surface px-5 py-4 shadow-cba transition-shadow hover:shadow-cba-lift"
      >
        <span aria-hidden="true" className="h-10 w-1.5 shrink-0 rounded-full bg-cba-yellow" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-ink">{account.name}</p>
          <p className="text-[13px] text-ink-faint">
            {kindLabels[account.kind]} · {maskAccountNumber(account.bsb, account.number)}
            {account.interestRate ? ` · ${formatRate(account.interestRate)}` : ""}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={cn(
              "text-[17px] font-extrabold tabular-nums",
              account.balance < 0 ? "text-critical" : "text-ink",
            )}
          >
            {formatCurrency(account.balance)}
          </p>
          <p className="text-[13px] text-ink-faint tabular-nums">
            {formatCurrency(account.available)} available
          </p>
        </div>
        <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-ghost" />
      </Link>
    </li>
  );
}
