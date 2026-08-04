import { Link, useParams } from "react-router-dom";
import { demoAccounts } from "@/data/accounts";
import { demoTransactions } from "@/data/transactions";
import { formatAud, maskAccount } from "@/lib/format";
import { TransactionsTable } from "@/components/netbank/TransactionsTable";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { NotFoundPage } from "@/pages/NotFound";

export function NetBankAccountPage() {
  const { accountId } = useParams();
  const account = demoAccounts.find((a) => a.id === accountId);
  useDocumentTitle(account ? account.name : "Account");
  if (!account) return <NotFoundPage />;
  const rows = demoTransactions.filter((t) => t.accountId === account.id);
  return (
    <section className="space-y-6">
      <div>
        <Link to="/netbank" className="text-sm font-semibold text-cba-blue hover:underline">
          ← All accounts
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">{account.name}</h1>
        <p className="text-sm text-ink-soft">
          BSB {account.bsb} · {maskAccount(account.number)}
        </p>
        <p className="mt-3 text-3xl font-extrabold text-ink">{formatAud(account.balance)}</p>
      </div>
      <TransactionsTable rows={rows} />
    </section>
  );
}
