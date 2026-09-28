import { ChevronRight, Headset, House } from "lucide-react";
import { cn } from "@/lib/cn";
import type { RenderedOption } from "../engine/conversation";

function optionIcon(option: RenderedOption) {
  if (option.next === "handoff") return <Headset className="h-3.5 w-3.5" aria-hidden="true" />;
  if (option.next === "menu" || option.next === "root") return <House className="h-3.5 w-3.5" aria-hidden="true" />;
  return null;
}

export function QuickReplies({
  options,
  onChoose,
  tone = "light",
  className,
}: {
  options: RenderedOption[];
  onChoose: (option: RenderedOption) => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (options.length === 0) return null;
  return (
    <div role="group" aria-label="Suggested replies" className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option, i) => (
        <button
          key={`${option.next}-${option.label}`}
          type="button"
          onClick={() => onChoose(option)}
          style={{ animationDelay: `${i * 40}ms` }}
          className={cn(
            "group inline-flex animate-fade-up items-center gap-1.5 rounded-full border px-3.5 py-2 text-left text-sm font-bold transition-colors",
            tone === "light"
              ? "border-agl-blue/30 bg-white text-agl-blue hover:border-agl-blue hover:bg-agl-sky"
              : "border-white/25 bg-white/10 text-white hover:border-white/60 hover:bg-white/20",
          )}
        >
          {optionIcon(option)}
          {option.label}
          <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
