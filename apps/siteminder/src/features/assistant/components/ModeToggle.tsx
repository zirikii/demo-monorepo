import { MessageCircle, Mic } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AssistantMode } from "../AssistantProvider";

export function ModeToggle({ mode, onChange }: { mode: AssistantMode; onChange: (mode: AssistantMode) => void }) {
  const items: { value: AssistantMode; label: string; Icon: typeof Mic }[] = [
    { value: "chat", label: "Chat", Icon: MessageCircle },
    { value: "voice", label: "Voice", Icon: Mic },
  ];
  return (
    <div role="group" aria-label="Conversation mode" className="relative inline-grid grid-cols-2 rounded-full bg-white/10 p-1 ring-1 ring-white/15">
      <span
        aria-hidden
        className={cn("absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out", mode === "voice" && "translate-x-full")}
      />
      {items.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(value)}
            className={cn(
              "relative inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-white",
              active ? "text-stratos" : "text-white/75 hover:text-white",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}
