import { useEffect } from "react";

export function Toast({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 3200);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed right-4 bottom-4 z-50 rounded-go border border-go-green/40 bg-go-card px-4 py-3 text-sm shadow-go"
    >
      {message}
    </div>
  );
}
