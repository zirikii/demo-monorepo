import { useState } from "react";
import { Link } from "react-router-dom";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { CLIENTS, CLIENT_SEGMENTS, PRACTICE } from "@/data/platform";
import {
  formatCurrencyWhole,
  formatDate,
  formatSignedCurrency,
} from "@/lib/format";
import { cn } from "@/lib/cn";

const STATUS_TONES = {
  "On track": "positive",
  "Review due": "caution",
  "Action required": "critical",
} as const;

type SortKey = "balance" | "name" | "reviewDue" | "netFlowYtd";

export default function AdviserClientsPage() {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("All segments");
  const [adviser, setAdviser] = useState("All advisers");
  const [sort, setSort] = useState<SortKey>("balance");

  const advisers = ["All advisers", ...Array.from(new Set(CLIENTS.map((client) => client.adviser)))];

  const rows = CLIENTS.filter((client) => {
    const matchesQuery = client.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesSegment = segment === "All segments" || client.segment === segment;
    const matchesAdviser = adviser === "All advisers" || client.adviser === adviser;
    return matchesQuery && matchesSegment && matchesAdviser;
  }).sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "reviewDue") return a.reviewDue.localeCompare(b.reviewDue);
    if (sort === "netFlowYtd") return b.netFlowYtd - a.netFlowYtd;
    return b.balance - a.balance;
  });

  const filteredFum = rows.reduce((total, client) => total + client.balance, 0);

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title="Clients"
      description={`${CLIENTS.length} clients in the practice book`}
    >
      <PanelCard
        title="Client book"
        description={`${rows.length} shown · ${formatCurrencyWhole(filteredFum)} under management`}
        bodyClassName="p-0"
      >
        <div className="grid gap-4 border-b border-line p-5 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Search" htmlFor="client-search">
            <TextInput
              id="client-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Client name"
            />
          </Field>
          <Field label="Segment" htmlFor="client-segment">
            <Select id="client-segment" value={segment} onChange={(event) => setSegment(event.target.value)}>
              <option>All segments</option>
              {CLIENT_SEGMENTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Adviser" htmlFor="client-adviser">
            <Select id="client-adviser" value={adviser} onChange={(event) => setAdviser(event.target.value)}>
              {advisers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Sort by" htmlFor="client-sort">
            <Select
              id="client-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
            >
              <option value="balance">Balance (high to low)</option>
              <option value="netFlowYtd">Net flow YTD</option>
              <option value="reviewDue">Review date</option>
              <option value="name">Name</option>
            </Select>
          </Field>
        </div>

        <DataTable
          className="rounded-none border-0"
          caption="Client book"
          rowKey={(client) => client.id}
          rows={rows}
          empty={
            <EmptyState
              className="m-5"
              title="No clients match those filters"
              body="Try clearing the search box or widening the segment and adviser selection."
            />
          }
          columns={[
            {
              key: "name",
              header: "Client",
              render: (client) => (
                <div className="flex flex-col">
                  <Link
                    to={`/adviserhub/clients/${client.id}`}
                    className="focus-h24 font-semibold text-ink-strong hover:text-h24-teal-dark"
                  >
                    {client.name}
                  </Link>
                  <span className="text-xs text-ink-faint">{client.accounts.join(" · ")}</span>
                </div>
              ),
            },
            {
              key: "segment",
              header: "Segment",
              render: (client) => <Badge tone="neutral">{client.segment}</Badge>,
            },
            {
              key: "balance",
              header: "Balance",
              align: "right",
              render: (client) => (
                <span className="font-semibold text-ink-strong">
                  {formatCurrencyWhole(client.balance)}
                </span>
              ),
            },
            {
              key: "flow",
              header: "Net flow YTD",
              align: "right",
              render: (client) => (
                <span
                  className={cn(
                    "font-semibold",
                    client.netFlowYtd >= 0 ? "text-positive" : "text-critical",
                  )}
                >
                  {formatSignedCurrency(client.netFlowYtd)}
                </span>
              ),
            },
            {
              key: "review",
              header: "Review due",
              align: "right",
              render: (client) => formatDate(client.reviewDue),
            },
            {
              key: "status",
              header: "Status",
              render: (client) => <Badge tone={STATUS_TONES[client.status]}>{client.status}</Badge>,
            },
          ]}
        />
      </PanelCard>
    </PortalLayout>
  );
}
