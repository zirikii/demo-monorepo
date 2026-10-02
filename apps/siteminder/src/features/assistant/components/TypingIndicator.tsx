import { SupportMark } from "./SupportMark";

export function TypingIndicator() {
  return (
    <div
      className="flex animate-fade-in items-center gap-2.5"
      role="status"
      aria-label="SiteMinder Support is typing"
    >
      <SupportMark />
      <div className="flex gap-1 rounded-[20px] rounded-tl-md bg-canvas px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-typing rounded-full bg-royal"
            style={{ animationDelay: `${i * 0.15}s` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
