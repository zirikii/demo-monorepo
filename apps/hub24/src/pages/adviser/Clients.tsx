import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { SelectField, TextField } from "@/components/ui/Field";
import { CLIENTS, clientBalance, type Client } from "@/data/adviser";
import { currency, longDate, percent } from "@/lib/format";

const STATUSES = ["All", "Active", "Review due", "Onboarding"];
const ENTITIES = ["All", ...Array.from(new Set(CLIENTS.map((client) => client.entity)))];

export default function AdviserClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [entity, setEntity] = useState("All");

  const clients = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CLIENTS.filter((client) => {
      if (status !== "All" && client.status !== status) return false;
      if (entity !== "All" && client.entity !== entity) return false;
      if (
        needle &&
        !`${client.name} ${client.familyGroup} ${client.email}`.toLowerCase().includes(needle)
      ) {
        return false;
      }
      return true;
    });
  }, [query, status, entity]);

  const columns: Column<Client>[] = [
    {
      key: "name",
      header: "Client",
      render: (row) => (
        <span className="flex flex-col">
          <Link
            to={`/adviserhub/clients/${row.id}`}
            className="focus-hub font-bold text-ink-strong hover:text-hub-blue"
          >
            {row.name}
          </Link>
          <span className="text-xs text-ink-faint">{row.familyGroup}</span>
        </span>
      ),
    },
    { key: "entity", header: "Entity", render: (row) => row.entity },
    {
      key: "accounts",
      header: "Accounts",
      render: (row) => (
        <span className="flex flex-wrap gap-1">
          {row.accounts.map((account) => (
            <Badge key={account.id} tone="neutral">
              {account.type}
            </Badge>
          ))}
        </span>
      ),
    },
    { key: "risk", header: "Risk profile", render: (row) => row.riskProfile },
    {
      key: "balance",
      header: "Balance",
      align: "right",
      render: (row) => (
        <span className="font-bold text-ink-strong">{currency(clientBalance(row))}</span>
      ),
    },
    {
      key: "ytd",
      header: "YTD",
      align: "right",
      render: (row) => percent(row.accounts[0]?.ytdReturn ?? 0),
    },
    {
      key: "review",
      header: "Last review",
      render: (row) => (
        <span className="flex flex-col">
          <span>{longDate(row.lastReview)}</span>
          <Badge
            tone={
              row.status === "Review due"
                ? "caution"
                : row.status === "Onboarding"
                  ? "blue"
                  : "positive"
            }
          >
            {row.status}
          </Badge>
        </span>
      ),
    },
  ];

  return (
    <AdviserLayout
      title="Clients"
      subtitle={`${clients.length} of ${CLIENTS.length} client relationships`}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <TextField
          label="Search"
          placeholder="Search by name, family group or email"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <SelectField
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={STATUSES.map((option) => ({ value: option, label: option }))}
        />
        <SelectField
          label="Entity type"
          value={entity}
          onChange={(event) => setEntity(event.target.value)}
          options={ENTITIES.map((option) => ({ value: option, label: option }))}
        />
      </div>

      <DataTable
        className="mt-6"
        caption="Client relationships"
        columns={columns}
        rows={clients}
        rowKey={(row) => row.id}
        emptyMessage="No clients match those filters."
      />
    </AdviserLayout>
  );
}
