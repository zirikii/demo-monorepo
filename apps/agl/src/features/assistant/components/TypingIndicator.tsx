import { AssistantAvatar } from "./AssistantAvatar";

export function TypingIndicator() {
  return (
    <div className="flex animate-fade-in items-center gap-2.5" role="status" aria-label="AGL Assistant is typing">
      <AssistantAvatar />
      <div className="flex gap-1 rounded-agl-lg rounded-tl-md bg-surface-tint px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-typing rounded-full bg-agl-blue"
            style={{ animationDelay: `${i * 0.15}s` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
