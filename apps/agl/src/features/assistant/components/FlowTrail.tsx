import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { getNode, topicLabel } from "../flows";
import type { ConversationState } from "../engine/conversation";

/** "Internet & mobile › Internet not working" — keeps the customer oriented in the flow. */
export function FlowTrail({
  conversation,
  onBack,
  tone = "light",
}: {
  conversation: ConversationState;
  onBack: () => void;
  tone?: "light" | "dark";
}) {
  const current = conversation.currentStepId ? getNode(conversation.currentStepId) : undefined;
  const topic = current ? topicLabel(current) : undefined;
  if (!current || !topic) return null;
  const canGoBack = conversation.trail.length > 1;
  const dark = tone === "dark";

  return (
    <nav
      aria-label="Where you are"
      className={cn(
        "flex items-center gap-2 text-xs",
        dark ? "text-white/75" : "border-b border-line-soft bg-white/90 px-4 py-2 text-ink-soft backdrop-blur",
      )}
    >
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 font-bold",
            dark ? "text-white hover:bg-white/10" : "text-agl-blue hover:bg-agl-sky",
          )}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
        </button>
      )}
      <ol className="flex min-w-0 items-center gap-1.5">
        <li className="shrink-0 font-bold">{topic}</li>
        {current.title !== topic && (
          <>
            <li aria-hidden="true">›</li>
            <li className="truncate" aria-current="step">
              {current.title}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
