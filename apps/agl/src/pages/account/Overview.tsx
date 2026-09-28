import { Link } from "react-router-dom";
import { AudioLines, MessageCircle } from "lucide-react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { ServiceIcon } from "@/components/account/ServiceIcon";
import { UsageChart } from "@/components/account/UsageChart";
import { Badge } from "@/components/ui/Badge";
import { dailyUsage, outstandingBills, services, totalOutstanding } from "@/data/account";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { daysUntil, formatCurrency, formatDate } from "@/lib/format";

export function AccountOverviewPage() {
  useDocumentTitle("My Account");
  const { user } = useAuth();
  const { open } = useAssistant();
  const due = outstandingBills();

  return (
    <AccountLayout title={`Hi ${user?.firstName ?? ""}`}>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="due-heading" className="rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="due-heading" className="text-sm font-bold text-ink-soft">
                Total amount due
              </h2>
              <p className="text-4xl font-extrabold text-agl-blue-dark">{formatCurrency(totalOutstanding())}</p>
            </div>
            <button
              type="button"
              onClick={() => open({ step: "billing.pay", label: "Pay my bill" })}
              className="rounded-full bg-agl-blue px-5 py-2.5 font-extrabold text-white hover:bg-agl-blue-hover"
            >
              Pay now
            </button>
          </div>
          <ul className="mt-5 divide-y divide-line-soft">
            {due.map((bill) => {
              const days = daysUntil(bill.due);
              return (
                <li key={bill.id} className="flex items-center gap-3 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-agl-sky text-agl-blue">
                    <ServiceIcon kind={bill.kind} className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-ink capitalize">{bill.kind}</span>
                    <span className="block text-xs text-ink-faint">
                      Due {formatDate(bill.due, "short")}
                      {days >= 0 ? ` · in ${days} days` : ""}
                    </span>
                  </span>
                  {bill.readType === "estimated" && <Badge tone="caution">Estimated read</Badge>}
                  <span className="font-extrabold text-ink">{formatCurrency(bill.amount)}</span>
                </li>
              );
            })}
          </ul>
          <Link to="/account/bills" className="mt-2 inline-flex text-sm font-bold text-agl-blue hover:underline">
            View all bills →
          </Link>
        </section>

        <section className="rounded-agl-lg bg-agl-navy p-6 text-white shadow-agl-lift">
          <h2 className="text-xl font-extrabold">Questions about your account?</h2>
          <p className="mt-1 text-sm text-white/80">The AGL Assistant knows your bills, plan and services.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Why is my bill higher?", step: "billing.high" },
              { label: "Submit a gas read", step: "meters.submit" },
              { label: "Set up direct debit", step: "billing.directdebit" },
            ].map((q) => (
              <button
                key={q.step}
                type="button"
                onClick={() => open({ step: q.step, label: q.label })}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold ring-1 ring-white/20 hover:bg-white/20"
              >
                {q.label}
              </button>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={() => open()} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-agl-blue">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat
            </button>
            <button
              type="button"
              onClick={() => open({ mode: "voice" })}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold ring-1 ring-white/25"
            >
              <AudioLines className="h-4 w-4" aria-hidden="true" /> Talk
            </button>
          </div>
        </section>
      </div>

      <section aria-labelledby="usage-heading" className="mt-6 rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="usage-heading" className="text-lg font-extrabold text-ink">
            Electricity this week
          </h2>
          <Link to="/account/usage" className="text-sm font-bold text-agl-blue hover:underline">
            See usage →
          </Link>
        </div>
        <UsageChart points={dailyUsage} />
      </section>

      <section aria-labelledby="services-heading" className="mt-6">
        <h2 id="services-heading" className="mb-3 text-lg font-extrabold text-ink">
          Your services
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <li key={s.id} className="rounded-agl-lg border border-line-soft bg-white p-5">
              <ServiceIcon kind={s.kind} className="h-6 w-6 text-agl-blue" />
              <p className="mt-2 font-extrabold text-ink">{s.name}</p>
              <p className="text-sm text-ink-soft">{s.plan}</p>
            </li>
          ))}
        </ul>
      </section>
    </AccountLayout>
  );
}
