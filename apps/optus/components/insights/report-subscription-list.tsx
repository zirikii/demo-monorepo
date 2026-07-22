"use client";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportSubscription } from "@/lib/types";
export function ReportSubscriptionList({ reports }: { reports: ReportSubscription[] }) {
  const [rows, setRows] = useState(reports);
  const [isPending, startTransition] = useTransition();
  function toggle(id: string, enabled: boolean) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, enabled } : row)));
    startTransition(async () => {
      await fetch("/api/reports/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between gap-4 rounded-md border border-optus-line p-3"
          >
            <div>
              <p className="font-bold text-optus-ink">{report.name}</p>
              <p className="text-sm text-optus-muted">
                {report.cadence} · {report.owner} · last run {report.lastRun}
              </p>
            </div>
            <Switch
              checked={report.enabled}
              disabled={isPending}
              onCheckedChange={(checked) => toggle(report.id, checked)}
              aria-label={`Toggle ${report.name}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
