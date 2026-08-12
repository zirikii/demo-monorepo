import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HERO_AI_ACTIVITY } from "@/data/platform";

export function AgentFeed() {
  return (
    <ul className="flex flex-col gap-3">
      {HERO_AI_ACTIVITY.map((activity) => (
        <li
          key={activity.id}
          className="flex items-start gap-3 rounded-eh border border-line bg-surface-tint px-4 py-3.5"
        >
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eh-tint text-eh-purple">
            <Sparkles aria-hidden className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.95rem] font-semibold text-ink-strong">{activity.summary}</p>
            <p className="text-sm text-ink-faint">
              {activity.agent} · {activity.time}
            </p>
          </div>
          <Badge tone={activity.status === "Completed" ? "positive" : "caution"}>
            {activity.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
