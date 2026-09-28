import { MessageCircle, Mic } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AssistantMode } from "../AssistantProvider";

export function ModeToggle({ mode, onChange }: { mode: AssistantMode; onChange: (mode: AssistantMode) => void }) {
  const items: { value: AssistantMode; label: string; Icon: typeof Mic }[] = [
    { value: "chat", label: "Chat", Icon: MessageCircle },
    { value: "voice", label: "Voice", Icon: Mic },
  ];
  return (
    <div role="group" aria-label="Conversation mode" className="inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15">
      {items.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-white",
              active ? "bg-white text-agl-blue-dark shadow-sm" : "text-white/80 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
