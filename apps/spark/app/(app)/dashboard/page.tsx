import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Database, Plane, SlidersHorizontal } from "lucide-react";
import { requireSession } from "@/lib/auth/server";
import { getAccount } from "@/lib/data/account";
import { getPlanById } from "@/lib/data/plans";
import { getBills } from "@/lib/data/bills";
import { getAddOns } from "@/lib/data/addons";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNzdCents, formatDate, formatGb, usagePercent } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Overview" };

export default async function DashboardPage() {
  const [user, account, bills, addons] = await Promise.all([
    requireSession(),
    getAccount(),
    getBills(),
    getAddOns(),
  ]);
  const plan = await getPlanById(account.planId);
  const nextBill = bills.find((b) => b.status !== "Paid") ?? bills[0];
  const activeAddOns = addons.filter((a) => account.activeAddOnIds.includes(a.id));
  const endless = account.dataAllowanceGb <= 0;
  const pct = usagePercent(account.dataUsedGb, account.dataAllowanceGb);

  const firstName = user.name.split(" ")[0] ?? user.name;

  return (
    <div className="container-page space-y-6 py-8">
      <PageHeader
        title={`Kia ora, ${firstName}`}
        description="Here's a snapshot of your Spark account."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Database}
          label="Data used this cycle"
          value={formatGb(account.dataUsedGb)}
          hint={endless ? "Endless data plan" : `of ${formatGb(account.dataAllowanceGb)}`}
        />
        <StatCard
          icon={CreditCard}
          label="Balance owing"
          value={formatNzdCents(account.balanceOwing)}
          hint={nextBill ? `Due ${formatDate(nextBill.dueAt)}` : "All paid"}
        />
        <StatCard
          icon={SlidersHorizontal}
          label="Active add-ons"
          value={String(activeAddOns.length)}
          hint="Manage in Add-ons"
        />
        <StatCard
          icon={Plane}
          label="Cycle resets"
          value={formatDate(account.cycleResetAt)}
          hint="Data allowance refreshes"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your plan</CardTitle>
              {plan?.roamingReady ? <Badge tone="brand">Roaming ready</Badge> : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {plan ? (
              <div>
                <p className="text-lg font-bold text-spark-ink">{plan.name}</p>
                <p className="text-sm text-ink-secondary">{plan.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="neutral">{plan.data}</Badge>
                  <Badge tone="neutral">{plan.calls}</Badge>
                </div>
              </div>
            ) : null}

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-secondary">Data usage</span>
                <span className="font-medium text-spark-ink">
                  {endless ? "Endless" : `${pct}%`}
                </span>
              </div>
              <Progress value={endless ? 40 : pct} className="mt-2" />
              <p className="mt-1.5 text-xs text-ink-muted">
                {formatGb(account.dataUsedGb)} used
                {endless ? " — full speed up to your fair-use threshold" : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/plan">Manage plan</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/usage">View usage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next bill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextBill ? (
              <>
                <div>
                  <p className="text-2xl font-bold text-spark-ink">
                    {formatNzdCents(nextBill.amount)}
                  </p>
                  <p className="text-sm text-ink-secondary">
                    {nextBill.period} · due {formatDate(nextBill.dueAt)}
                  </p>
                </div>
                <Badge tone={nextBill.status === "Paid" ? "positive" : "caution"}>
                  {nextBill.status}
                </Badge>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/bills">View all bills</Link>
                </Button>
              </>
            ) : (
              <p className="text-sm text-ink-secondary">No bills yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Travel prompt */}
      <Card>
        <CardContent className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-spark-purple-light text-spark-purple">
              <Plane className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-spark-ink">Heading overseas soon?</p>
              <p className="text-sm text-ink-secondary">
                Set up roaming before you fly so you land connected.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/roaming">Sort roaming</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
