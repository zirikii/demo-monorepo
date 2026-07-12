import type { Metadata } from "next";
import { getBills } from "@/lib/data/bills";
import { PageHeader } from "@/components/layout/PageHeader";
import { BillsTable } from "@/components/bills/BillsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNzdCents, formatDate } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Bills" };

export default async function BillsPage() {
  const bills = await getBills();
  const nextBill = bills.find((b) => b.status !== "Paid");

  return (
    <div className="container-page space-y-6 py-8">
      <PageHeader title="Bills" description="Your recent invoices and payment history." />

      {nextBill ? (
        <Card>
          <CardHeader>
            <CardTitle>Amount due</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-3xl font-bold text-spark-ink">
                {formatNzdCents(nextBill.amount)}
              </p>
              <p className="mt-1 text-sm text-ink-secondary">
                {nextBill.period} · due {formatDate(nextBill.dueAt)}{" "}
                <Badge tone="caution" className="ml-1">
                  {nextBill.status}
                </Badge>
              </p>
              <ul className="mt-4 space-y-1 text-sm text-ink-secondary">
                {nextBill.items.map((item) => (
                  <li key={item.label} className="flex justify-between gap-8">
                    <span>{item.label}</span>
                    <span className="font-medium text-spark-ink">
                      {formatNzdCents(item.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg">Pay now</Button>
          </CardContent>
        </Card>
      ) : null}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-spark-ink">Billing history</h2>
        <BillsTable bills={bills} />
      </div>
    </div>
  );
}
