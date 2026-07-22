import Link from "next/link";
import { ServiceHealthCard } from "@/components/account/service-health-card";
import { readJson } from "@/lib/data/json-store";
import type { Bill, Service, SupportCase } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default async function DashboardPage() {
  const [services, bills, cases] = await Promise.all([
    readJson<Service[]>("services.json"),
    readJson<Bill[]>("bills.json"),
    readJson<SupportCase[]>("support-cases.json"),
  ]);
  const due = bills.find((bill) => bill.status === "Due");
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-card">
        <p className="text-sm font-black uppercase tracking-wide text-optus-teal">
          Account overview
        </p>
        <h2 className="mt-2 text-4xl font-black text-optus-ink">
          Everything in one My Optus view.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-optus-teal-light p-5">
            <p className="text-sm font-bold text-optus-ink/60">Next bill</p>
            <p className="mt-2 text-3xl font-black text-optus-navy">
              {due ? formatAud(due.amount, { cents: true }) : "$0"}
            </p>
            <p className="text-sm text-optus-ink/65">
              {due ? `Due ${formatShortDate(due.dueDate)}` : "No bill due"}
            </p>
          </div>
          <div className="rounded-2xl bg-optus-yellow-soft p-5">
            <p className="text-sm font-bold text-optus-ink/60">Open cases</p>
            <p className="mt-2 text-3xl font-black text-optus-navy">
              {cases.filter((item) => item.status !== "Resolved").length}
            </p>
            <p className="text-sm text-optus-ink/65">Support is simulated</p>
          </div>
          <div className="rounded-2xl bg-surface-muted p-5">
            <p className="text-sm font-bold text-optus-ink/60">Services</p>
            <p className="mt-2 text-3xl font-black text-optus-navy">{services.length}</p>
            <p className="text-sm text-optus-ink/65">Mobile, prepaid and internet</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceHealthCard key={service.id} service={service} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/usage"
          className="rounded-full bg-optus-teal px-5 py-3 text-sm font-black text-white"
        >
          View usage
        </Link>
        <Link
          href="/bills"
          className="rounded-full border border-optus-teal px-5 py-3 text-sm font-black text-optus-teal"
        >
          Pay bill
        </Link>
        <Link
          href="/support-cases"
          className="rounded-full border border-line px-5 py-3 text-sm font-black text-optus-ink"
        >
          Track support
        </Link>
      </div>
    </div>
  );
}
