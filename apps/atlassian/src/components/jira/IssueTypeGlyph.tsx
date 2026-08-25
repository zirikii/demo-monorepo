import { Bookmark, Bug, CheckSquare, Zap } from "lucide-react";
import type { IssueType } from "@/data/types";
import { cn } from "@/lib/cn";

const GLYPH: Record<IssueType, { icon: typeof Bug; className: string }> = {
  Story: { icon: Bookmark, className: "text-positive" },
  Task: { icon: CheckSquare, className: "text-atl-blue" },
  Bug: { icon: Bug, className: "text-critical" },
  Epic: { icon: Zap, className: "text-jpd" },
};

export function IssueTypeGlyph({ type, className }: { type: IssueType; className?: string }) {
  const glyph = GLYPH[type];
  const Icon = glyph.icon;
  return <Icon aria-hidden className={cn("h-4 w-4", glyph.className, className)} />;
}
