import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Navbar({
  title,
  onBack,
  tone = "dark",
  right,
}: {
  title: string;
  onBack?: () => void;
  tone?: "dark" | "light";
  right?: ReactNode;
}) {
  const color = tone === "light" ? "text-static-white" : "text-text-title";
  return (
    <div className={cn("flex h-11 items-center gap-2 px-2", color)}>
      {onBack ? (
        <button type="button" onClick={onBack} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full">
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : (
        <span className="w-10" />
      )}
      <h1 className="flex-1 text-title-moderate font-semibold">{title}</h1>
      {right}
    </div>
  );
}
