import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SettingsStore } from "@/lib/types";
export function ProfileCard({ profile }: { profile: SettingsStore["profile"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="rounded-md bg-optus-page p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-optus-muted">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="mt-1 font-bold text-optus-ink">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
