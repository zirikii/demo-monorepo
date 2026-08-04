import { useMemo, useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Badge } from "@/components/ui/Badge";
import { TextField } from "@/components/ui/Field";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { seedPayees } from "@/data/netbank";
import { formatDate } from "@/lib/format";
import { matchesQuery } from "@/lib/search";

const types = ["All", "Bank account", "BPAY", "PayID"];

export function PayeesPage() {
  useDocumentTitle("Payees");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const visible = useMemo(
    () =>
      seedPayees.filter((payee) => {
        if (type !== "All" && payee.type !== type) return false;
        return matchesQuery([payee.name, payee.detail, payee.type], query);
      }),
    [query, type],
  );

  return (
    <NetBankLayout title="Payees & BPAY billers">
      <div className="mb-6 flex flex-wrap items-end gap-6">
        <TextField
          label="Search payees"
          placeholder="e.g. Sydney Water"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full max-w-xs"
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-black">Type</p>
          <FilterChips
            options={types}
            value={type}
            onChange={setType}
            ariaLabel="Filter payees by type"
          />
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-soft" role="status">
        Showing <strong className="text-black">{visible.length}</strong> of {seedPayees.length}{" "}
        payees
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No payees match your search"
          description="Try a different name, or choose a different payee type."
        />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {visible.map((payee) => (
            <li
              key={payee.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5"
            >
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-black">{payee.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{payee.detail}</p>
                {payee.lastPaid ? (
                  <p className="mt-1 text-xs text-ink-muted">
                    Last paid {formatDate(payee.lastPaid)}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-ink-muted">Never paid</p>
                )}
              </div>
              <Badge tone={payee.type === "BPAY" ? "yellow" : "neutral"}>{payee.type}</Badge>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <ButtonLink to="/netbank/transfer">Make a payment</ButtonLink>
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        Adding a new payee would require a NetCode in the real world. This demo ships with a fixed
        list of mock payees.
      </p>
    </NetBankLayout>
  );
}
