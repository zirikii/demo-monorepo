import { quickActions } from "@/lib/constants/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export function ActionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.label}
              className="flex items-center justify-between gap-3 rounded-md border border-optus-line p-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-optus-teal" aria-hidden="true" />
                <div>
                  <p className="font-bold text-optus-ink">{action.label}</p>
                  <p className="text-sm text-optus-muted">{action.value}</p>
                </div>
              </div>
              <Badge tone="yellow">Review</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
