import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { StatTile } from "@/components/adviser/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { DonutChart } from "@/components/ui/DonutChart";
import { Tabs } from "@/components/ui/Tabs";
import {
  allocationFor,
  clientBalance,
  clientById,
  type AccountTransaction,
  type Holding,
} from "@/data/adviser";
import { currency, currencyCents, longDate, percent, signedCurrency } from "@/lib/format";

export default function AdviserClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const client = id ? clientById(id) : undefined;
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);

  if (!client) {
    return <Navigate to="/adviserhub/clients" replace />;
  }

  const accountIds = client.accounts.map((account) => account.id);
  const currentId =
    activeAccountId && accountIds.includes(activeAccountId) ? activeAccountId : accountIds[0];
  const account =
    client.accounts.find((candidate) => candidate.id === currentId) ?? client.accounts[0];

  const allocation = allocationFor(client).map((entry) => ({
    label: entry.assetClass,
    value: entry.value,
  }));

  const holdingColumns: Column<Holding>[] = [
    {
      key: "name",
      header: "Holding",
      render: (row) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{row.name}</span>
          <span className="text-xs text-ink-faint">{row.code}</span>
        </span>
      ),
    },
    { key: "assetClass", header: "Asset class", render: (row) => row.assetClass },
    {
      key: "units",
      header: "Units",
      align: "right",
      render: (row) => row.units.toLocaleString("en-AU"),
    },
    { key: "price", header: "Price", align: "right", render: (row) => currencyCents(row.price) },
    {
      key: "value",
      header: "Value",
      align: "right",
      render: (row) => <span className="font-bold text-ink-strong">{currency(row.value)}</span>,
    },
    {
      key: "gain",
      header: "Unrealised",
      align: "right",
      render: (row) => (
        <span
          className={
            row.unrealisedGain >= 0 ? "font-semibold text-positive" : "font-semibold text-critical"
          }
        >
          {signedCurrency(row.unrealisedGain)}
        </span>
      ),
    },
  ];

  const transactionColumns: Column<AccountTransaction>[] = [
    { key: "date", header: "Date", render: (row) => longDate(row.date) },
    {
      key: "description",
      header: "Description",
      render: (row) => <span className="font-semibold text-ink-strong">{row.description}</span>,
    },
    { key: "type", header: "Type", render: (row) => <Badge tone="neutral">{row.type}</Badge> },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (row) => (
        <span
          className={row.amount >= 0 ? "font-semibold text-positive" : "font-semibold text-ink"}
        >
          {signedCurrency(row.amount)}
        </span>
      ),
    },
  ];

  return (
    <AdviserLayout
      title={client.name}
      subtitle={`${client.entity} · ${client.familyGroup} · adviser ${client.adviser}`}
      actions={
        <ButtonLink to="/adviserhub/reporting" size="sm" className="hidden sm:inline-flex">
          Build Engage pack
        </ButtonLink>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Total balance"
          value={currency(clientBalance(client))}
          note={`${client.accounts.length} account(s)`}
        />
        <StatTile
          label="Available cash"
          value={currency(client.accounts.reduce((sum, item) => sum + item.availableCash, 0))}
        />
        <StatTile
          label="YTD return"
          value={percent(account?.ytdReturn ?? 0)}
          delta={(account?.ytdReturn ?? 0) >= 0 ? "Positive" : "Negative"}
          trend={(account?.ytdReturn ?? 0) >= 0 ? "up" : "down"}
        />
        <StatTile
          label="Risk profile"
          value={client.riskProfile}
          note={`Last review ${longDate(client.lastReview)}`}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.6fr]">
        <PanelCard title="Asset allocation">
          <DonutChart
            title={`Asset allocation for ${client.name}`}
            slices={allocation}
            valueFormatter={(value) => currency(value)}
          />
        </PanelCard>

        <PanelCard title="Contact and account details">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                Email
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-ink">
                <Mail aria-hidden className="h-4 w-4 text-hub-blue" />
                {client.email}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                Phone
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-ink">
                <Phone aria-hidden className="h-4 w-4 text-hub-blue" />
                {client.phone}
              </dd>
            </div>
            {client.accounts.map((item) => (
              <div key={item.id}>
                <dt className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  {item.type}
                </dt>
                <dd className="mt-1 flex flex-col text-ink">
                  <span className="font-bold">{item.id}</span>
                  <span className="text-sm text-ink-faint">
                    {item.menu} menu · opened {longDate(item.opened)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </PanelCard>
      </div>

      <div className="mt-6">
        <Tabs
          label="Select an account"
          tabs={accountIds}
          active={currentId ?? ""}
          onChange={setActiveAccountId}
        />
      </div>

      {account ? (
        <>
          <div className="mt-5">
            <PanelCard title={`${account.type} — holdings`}>
              <DataTable
                caption={`Holdings for ${account.id}`}
                columns={holdingColumns}
                rows={account.holdings}
                rowKey={(row) => row.code + account.id}
              />
            </PanelCard>
          </div>

          <div className="mt-6">
            <PanelCard title={`${account.type} — recent transactions`}>
              <DataTable
                caption={`Transactions for ${account.id}`}
                columns={transactionColumns}
                rows={account.transactions}
                rowKey={(row) => row.date + row.description}
              />
            </PanelCard>
          </div>
        </>
      ) : null}
    </AdviserLayout>
  );
}
