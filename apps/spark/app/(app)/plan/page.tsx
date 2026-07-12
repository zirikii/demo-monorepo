import type { Metadata } from "next";
import Link from "next/link";
import { getAccount } from "@/lib/data/account";
import { getPlansByKind, getPlanById } from "@/lib/data/plans";
import { getAddOns } from "@/lib/data/addons";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlanManager } from "@/components/plans/PlanManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My plan" };

export default async function PlanPage() {
  const [account, mobilePlans, addons] = await Promise.all([
    getAccount(),
    getPlansByKind("mobile"),
    getAddOns(),
  ]);
  const plan = await getPlanById(account.planId);
  const activeAddOns = addons.filter((a) => account.activeAddOnIds.includes(a.id));

  return (
    <div className="container-page space-y-6 py-8">
      <PageHeader
        title="My plan"
        description="Review your current plan or switch to another mobile plan."
      />

      {plan ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{plan.name}</CardTitle>
              {plan.roamingReady ? <Badge tone="brand">Roaming ready</Badge> : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-ink-secondary">{plan.tagline}</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">{plan.data}</Badge>
              <Badge tone="neutral">{plan.calls}</Badge>
            </div>
            {activeAddOns.length ? (
              <div>
                <p className="text-sm font-medium text-spark-ink">Connected add-ons</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeAddOns.map((a) => (
                    <Badge key={a.id} tone="brand">
                      {a.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
            <Button asChild variant="secondary">
              <Link href="/addons">Manage add-ons</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-spark-ink">Switch mobile plan</h2>
        <PlanManager plans={mobilePlans} initialPlanId={account.planId} />
      </div>
    </div>
  );
}
