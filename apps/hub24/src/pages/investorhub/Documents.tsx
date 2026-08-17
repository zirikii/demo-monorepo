import { useState } from "react";
import { FileText } from "lucide-react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { PRACTICE, STATEMENTS } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatDate } from "@/lib/format";

const TYPES = ["All types", "Annual statement", "Tax statement", "Quarterly report", "Confirmation"];

export default function InvestorDocumentsPage() {
  const { accounts } = usePortfolio();
  const [type, setType] = useState("All types");
  const [accountId, setAccountId] = useState("all");

  const rows = STATEMENTS.filter(
    (statement) =>
      (type === "All types" || statement.type === type) &&
      (accountId === "all" || statement.accountId === accountId),
  ).sort((a, b) => b.issued.localeCompare(a.issued));

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Documents"
      description="Statements, reports and trade confirmations"
    >
      <PanelCard title="Your documents" description="Available under the Account menu in InvestorHUB" bodyClassName="p-0">
        <div className="grid gap-4 border-b border-line p-5 md:grid-cols-2 lg:max-w-2xl">
          <Field label="Document type" htmlFor="statement-type">
            <Select id="statement-type" value={type} onChange={(event) => setType(event.target.value)}>
              {TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Account" htmlFor="statement-account">
            <Select
              id="statement-account"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
            >
              <option value="all">All accounts</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <DataTable
          className="rounded-none border-0"
          caption="Statements and reports"
          rowKey={(statement) => statement.id}
          rows={rows}
          empty={<EmptyState className="m-5" title="No documents match those filters" />}
          columns={[
            {
              key: "name",
              header: "Document",
              render: (statement) => (
                <span className="flex items-center gap-3">
                  <FileText aria-hidden className="h-4 w-4 shrink-0 text-h24-teal" />
                  <span className="font-medium text-ink-strong">{statement.name}</span>
                </span>
              ),
            },
            {
              key: "account",
              header: "Account",
              render: (statement) =>
                accounts.find((account) => account.id === statement.accountId)?.type ?? "—",
            },
            {
              key: "type",
              header: "Type",
              render: (statement) => <Badge tone="neutral">{statement.type}</Badge>,
            },
            { key: "period", header: "Period", render: (statement) => statement.period },
            {
              key: "issued",
              header: "Issued",
              align: "right",
              render: (statement) => formatDate(statement.issued),
            },
          ]}
        />
      </PanelCard>

      <p className="mt-6 text-xs text-ink-faint">
        Documents are placeholders for a demonstration build — nothing downloads.
      </p>
    </PortalLayout>
  );
}
