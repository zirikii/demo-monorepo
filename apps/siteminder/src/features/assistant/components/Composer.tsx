import { useState, type FormEvent } from "react";
import { AudioLines, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function Composer({
  onSend,
  onVoice,
  placeholder = "Ask about your tickets…",
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
  const ready = Boolean(text.trim());
  return (
    <form onSubmit={submit} className="flex items-center gap-2" aria-label="Message Ticketek Support">
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
          "h-11 min-w-0 flex-1 rounded-full border px-4 text-sm focus:ring-2 focus:outline-none",
          dark
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/55 focus:ring-white/40"
            : "border-line bg-white text-ink placeholder:text-ink-faint focus:border-tk-blue focus:ring-tk-blue/20",
        )}
      />
      {onVoice && (
        <button
          type="button"
          onClick={onVoice}
          aria-label="Switch to voice"
          title="Talk instead"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tk-blue-tint text-tk-blue transition-colors hover:bg-tk-blue hover:text-white"
        >
          <AudioLines className="size-5" aria-hidden />
        </button>
      )}
      <button
        type="submit"
        aria-label="Send"
        disabled={!ready}
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
          ready ? (dark ? "bg-white text-midnight" : "bg-midnight text-white hover:bg-midnight-soft") : dark ? "bg-white/10 text-white/40" : "bg-line-soft text-ink-faint",
        )}
      >
        <SendHorizontal className="size-5" aria-hidden />
      </button>
    </form>
  );
}
