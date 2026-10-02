import { useEffect, useRef } from "react";
import { useAssistant } from "../AssistantProvider";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";

export function ThreadView() {
  const { conversation, typing, options, chooseOption } = useAssistant();
  const { messages } = conversation;
  const endRef = useRef<HTMLDivElement>(null);
  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id;
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: "smooth", block: "end" });
  }, [messages.length, typing, lastMessage]);

  return (
    <div className="space-y-3 px-4 py-4">
      <ol aria-live="polite" aria-label="Conversation" className="space-y-3">
        {messages.map((message, i) => (
          <li key={message.id}>
            <MessageBubble
              message={message}
              live={message.id === lastAssistantId && lastMessage?.id === message.id}
              grouped={message.role === "assistant" && messages[i - 1]?.role === "assistant"}
              hidePending={typing}
            />
          </li>
        ))}
      </ol>
      {typing && <TypingIndicator />}
      <QuickReplies options={options} onChoose={chooseOption} className="pl-10" />
      <div ref={endRef} />
    </div>
  );
}
