import { AudioLines, MessageCircle } from "lucide-react";
import { AssistantAvatar } from "@/features/assistant/components/AssistantAvatar";
import { useAssistant } from "@/features/assistant/AssistantProvider";

/** Deep-links a help page into the matching assistant flow step. */
export function AskAssistantCard({ step, label, title = "Get this sorted with AGL Assistant" }: { step: string; label: string; title?: string }) {
  const { open } = useAssistant();
  return (
    <aside className="rounded-agl-lg bg-agl-navy p-6 text-white shadow-agl-lift">
      <div className="flex items-center gap-3">
        <AssistantAvatar size="md" online />
        <p className="font-extrabold">{title}</p>
      </div>
      <p className="mt-3 text-sm text-white/80">The assistant follows the same steps as this article and can finish the task for you.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => open({ step, label })}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-agl-blue hover:bg-agl-sky"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask AGL Assistant
        </button>
        <button
          type="button"
          onClick={() => open({ step, label, mode: "voice" })}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-extrabold text-white ring-1 ring-white/25 hover:bg-white/20"
        >
          <AudioLines className="h-4 w-4" aria-hidden="true" /> Talk instead
        </button>
      </div>
    </aside>
  );
}
