import { useState, type FormEvent } from "react";
import { AudioLines, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function Composer({
  onSend,
  onVoice,
  placeholder = "Type your question…",
  tone = "light",
  autoFocus,
}: {
  onSend: (text: string) => void;
  onVoice?: () => void;
  placeholder?: string;
  tone?: "light" | "dark";
  autoFocus?: boolean;
}) {
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const dark = tone === "dark";
  return (
    <form onSubmit={submit} className="flex items-center gap-2" aria-label="Message the AGL Assistant">
      <label htmlFor={`assistant-input-${tone}`} className="sr-only">
        Message
      </label>
      <input
        id={`assistant-input-${tone}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-full border px-4 text-sm focus:outline-none focus:ring-2",
          dark
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/55 focus:ring-white/40"
            : "border-line bg-white text-ink placeholder:text-ink-faint focus:border-agl-blue focus:ring-agl-blue/20",
        )}
      />
      {onVoice && (
        <button
          type="button"
          onClick={onVoice}
          aria-label="Talk to the assistant"
          title="Talk to the assistant"
          className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-agl-sky text-agl-blue transition-colors hover:bg-agl-sky-deep"
        >
          <AudioLines className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <button
        type="submit"
        aria-label="Send"
        disabled={!text.trim()}
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
          text.trim()
            ? dark
              ? "bg-white text-agl-blue-dark hover:bg-agl-sky"
              : "bg-agl-blue text-white hover:bg-agl-blue-hover"
            : dark
              ? "bg-white/10 text-white/40"
              : "bg-surface-deep text-ink-faint",
        )}
      >
        <SendHorizontal className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}
