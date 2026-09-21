import { X } from "lucide-react";

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      role="status"
      className="absolute inset-x-4 top-16 z-30 flex items-start gap-3 rounded-2xl bg-text-title px-4 py-3 text-static-white shadow-lg"
    >
      <p className="flex-1 text-body-small font-semibold">{message}</p>
      <button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="text-static-white">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
