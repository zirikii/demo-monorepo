import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InsightsStore } from "@/lib/data/business";
import { formatCurrency } from "@/lib/formatters";
export function InsightsDashboard({ insights }: { insights: InsightsStore }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Inbound calling trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.inboundCalls.map((row) => (
            <div key={row.label} className="rounded-md border border-optus-line p-4">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-optus-ink">{row.label}</span>
                <span className="text-optus-muted">
                  {row.calls.toLocaleString("en-AU")} calls · {row.missed} missed
                </span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-optus-teal-soft">
                <div
                  className="h-3 rounded-full bg-optus-teal"
                  style={{ width: `${Math.min(100, row.calls / 85)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly spend trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.monthlySpend.map((row) => (
            <div
              key={row.month}
              className="flex items-center justify-between rounded-md bg-optus-page p-4"
            >
              <span className="font-bold text-optus-ink">{row.month}</span>
              <span className="text-optus-muted">{formatCurrency(row.amount)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
