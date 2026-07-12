import type { Metadata } from "next";
import { getUsage } from "@/lib/data/usage";
import { getAccount } from "@/lib/data/account";
import { PageHeader } from "@/components/layout/PageHeader";
import { UsageTable } from "@/components/usage/UsageTable";
import { StatCard } from "@/components/common/StatCard";
import { Database, MessageSquare, Phone } from "lucide-react";
import { formatGb, pluralise } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Usage" };

export default async function UsagePage() {
  const [usage, account] = await Promise.all([getUsage(), getAccount()]);

  const dataGb = usage
    .filter((u) => u.unit === "GB")
    .reduce((sum, u) => sum + u.amount, 0);
  const callMins = usage
    .filter((u) => u.unit === "min")
    .reduce((sum, u) => sum + u.amount, 0);
  const texts = usage
    .filter((u) => u.unit === "txt")
    .reduce((sum, u) => sum + u.amount, 0);

  return (
    <div className="container-page space-y-6 py-8">
      <PageHeader
        title="Usage"
        description="Recent activity on your account this billing cycle."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Database}
          label="Data"
          value={formatGb(Number(dataGb.toFixed(1)))}
          hint={account.dataAllowanceGb <= 0 ? "Endless data plan" : `of ${formatGb(account.dataAllowanceGb)}`}
        />
        <StatCard icon={Phone} label="Calls" value={pluralise(callMins, "min")} hint="Included in plan" />
        <StatCard icon={MessageSquare} label="Texts" value={pluralise(texts, "text")} hint="Included in plan" />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-spark-ink">Recent activity</h2>
        <UsageTable usage={usage} />
      </div>
    </div>
  );
}
