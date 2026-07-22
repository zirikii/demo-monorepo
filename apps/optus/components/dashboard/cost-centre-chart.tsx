import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
export function CostCentreChart({ rows }: { rows: { name: string; amount: number }[] }) {
  const max = Math.max(...rows.map((row) => row.amount));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost centre allocation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row) => (
          <div key={row.name}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-optus-ink">{row.name}</span>
              <span className="text-optus-muted">{formatCurrency(row.amount)}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-optus-teal-soft">
              <div
                className="h-3 rounded-full bg-optus-teal"
                style={{ width: `${Math.max(8, (row.amount / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
