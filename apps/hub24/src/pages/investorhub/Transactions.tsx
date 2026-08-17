import { useState } from "react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { PRACTICE } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency, formatDate } from "@/lib/format";
import { sortTransactions } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

const TYPES = [
  "All types",
  "Buy",
  "Sell",
  "Contribution",
  "Pension payment",
  "Fee",
  "Dividend",
  "Distribution",
  "Interest",
];

export default function InvestorTransactionsPage() {
  const { accounts, transactions } = usePortfolio();
  const [accountId, setAccountId] = useState("all");
  const [type, setType] = useState("All types");
  const [query, setQuery] = useState("");

  const rows = sortTransactions(transactions).filter((transaction) => {
    const matchesAccount = accountId === "all" || transaction.accountId === accountId;
    const matchesType = type === "All types" || transaction.type === type;
    const matchesQuery = transaction.description.toLowerCase().includes(query.trim().toLowerCase());
    return matchesAccount && matchesType && matchesQuery;
  });

  const net = rows.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Transactions"
      description="Every movement across your HUB24 accounts"
    >
      <PanelCard title="Transaction history" description={`Net of filtered rows: ${formatCurrency(net)}`} bodyClassName="p-0">
        <div className="grid gap-4 border-b border-line p-5 md:grid-cols-3">
          <Field label="Search" htmlFor="txn-search">
            <TextInput
              id="txn-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. dividend"
            />
          </Field>
          <Field label="Account" htmlFor="txn-account">
            <Select id="txn-account" value={accountId} onChange={(event) => setAccountId(event.target.value)}>
              <option value="all">All accounts</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Type" htmlFor="txn-type">
            <Select id="txn-type" value={type} onChange={(event) => setType(event.target.value)}>
              {TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <DataTable
          className="rounded-none border-0"
          caption="Transaction history"
          rowKey={(transaction) => transaction.id}
          rows={rows}
          empty={
            <EmptyState
              className="m-5"
              title="No transactions match those filters"
              body="Try clearing the search box or selecting all accounts."
            />
          }
          columns={[
            {
              key: "date",
              header: "Date",
              render: (transaction) => (
                <span className="whitespace-nowrap text-ink-faint">{formatDate(transaction.date)}</span>
              ),
            },
            {
              key: "description",
              header: "Description",
              render: (transaction) => (
                <span className="font-medium text-ink-strong">{transaction.description}</span>
              ),
            },
            {
              key: "account",
              header: "Account",
              render: (transaction) =>
                accounts.find((account) => account.id === transaction.accountId)?.type ?? "—",
            },
            {
              key: "type",
              header: "Type",
              render: (transaction) => <Badge tone="neutral">{transaction.type}</Badge>,
            },
            {
              key: "amount",
              header: "Amount",
              align: "right",
              render: (transaction) => (
                <span
                  className={cn(
                    "font-semibold",
                    transaction.amount >= 0 ? "text-positive" : "text-ink-strong",
                  )}
                >
                  {formatCurrency(transaction.amount)}
                </span>
              ),
            },
          ]}
        />
      </PanelCard>
    </PortalLayout>
  );
}
