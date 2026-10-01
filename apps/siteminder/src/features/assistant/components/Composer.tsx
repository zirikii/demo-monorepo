import { useState, type FormEvent } from "react";
import { AudioLines, ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function Composer({
  onSend,
  onVoice,
  placeholder = "Ask about channels, bookings, rates…",
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
    <form
      onSubmit={submit}
      className={cn(
        "flex items-center gap-1.5 rounded-full border p-1.5 pl-4 transition-shadow focus-within:shadow-glow",
        dark ? "border-white/20 bg-white/10" : "border-line bg-white focus-within:border-royal",
      )}
    >
      <label htmlFor={`assistant-input-${tone}`} className="sr-only">
        Message SiteMinder Support
      </label>
      <input
        id={`assistant-input-${tone}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        className={cn(
          "h-9 min-w-0 flex-1 bg-transparent text-sm focus:outline-none",
          dark ? "text-white placeholder:text-white/55" : "text-ink placeholder:text-ink-faint",
        )}
      />
      {onVoice && (
        <button
          type="button"
          onClick={onVoice}
          aria-label="Switch to voice"
          title="Talk instead"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-royal transition-colors hover:bg-royal-tint"
        >
          <AudioLines className="size-5" aria-hidden />
        </button>
      )}
      <button
        type="submit"
        aria-label="Send"
        disabled={!ready}
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
          ready
            ? dark
              ? "bg-lime text-stratos"
              : "bg-royal text-white hover:bg-royal-hover"
            : dark
              ? "bg-white/10 text-white/40"
              : "bg-line-soft text-ink-faint",
        )}
      >
        <ArrowUp className="size-5" aria-hidden />
      </button>
    </form>
  );
}
