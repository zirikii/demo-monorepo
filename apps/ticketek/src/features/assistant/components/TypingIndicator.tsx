import { SupportMark } from "./SupportMark";

export function TypingIndicator() {
  return (
    <div className="flex animate-fade-in items-center gap-2.5" role="status" aria-label="Ticketek Support is typing">
      <SupportMark />
      <div className="flex gap-1 rounded-tk-xl rounded-tl-md bg-page px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-typing rounded-full bg-tk-jacaranda" style={{ animationDelay: `${i * 0.15}s` }} aria-hidden />
        ))}
      </div>
    </div>
  );
}
