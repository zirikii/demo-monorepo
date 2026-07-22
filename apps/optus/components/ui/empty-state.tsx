import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
export function EmptyState({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center">
      <Icon className="mb-3 h-8 w-8 text-optus-teal" aria-hidden="true" />
      <h3 className="text-lg font-bold text-optus-ink">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-optus-muted">{body}</p>
    </Card>
  );
}
