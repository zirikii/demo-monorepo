import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Field";
import { replyToRovo } from "@/data/jira";

interface Message {
  from: "you" | "rovo";
  text: string;
}

export function RovoPanel({ compact = false }: { compact?: boolean }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "rovo",
      text: "I can see PORTAL Sprint 24, Confluence briefs, and last week's partner Looms. Ask about the board, blockers, or a work item.",
    },
  ]);

  function send(next = prompt) {
    const trimmed = next.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { from: "you", text: trimmed },
      { from: "rovo", text: replyToRovo(trimmed) },
    ]);
    setPrompt("");
  }

  return (
    <div className="flex h-full flex-col rounded-atl-lg border border-line bg-white shadow-atl">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Sparkles aria-hidden className="h-4 w-4 text-rovo" />
        <p className="text-sm font-extrabold text-ink-strong">Rovo</p>
      </div>
      <div className={compact ? "flex max-h-72 flex-col gap-3 overflow-auto p-4" : "flex flex-1 flex-col gap-3 overflow-auto p-4"}>
        {messages.map((message, index) => (
          <p
            key={`${message.from}-${index}`}
            className={
              message.from === "you"
                ? "ml-8 rounded-atl bg-atl-tint px-3 py-2 text-sm text-ink-strong"
                : "mr-8 rounded-atl bg-surface-deep px-3 py-2 text-sm text-ink-soft"
            }
          >
            {message.text}
          </p>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <label className="sr-only" htmlFor="rovo-prompt">
          Ask Rovo
        </label>
        <TextInput
          id="rovo-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What's blocked this sprint?"
        />
        <Button type="submit">Ask</Button>
      </form>
    </div>
  );
}
