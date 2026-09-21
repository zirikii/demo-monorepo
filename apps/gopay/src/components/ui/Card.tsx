import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** `gopay_theme/light/fill/background/primary` card with the top bevel highlight. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("bg-fill-primary shadow-bevel-top relative rounded-[20px]", className)}>
      {children}
    </div>
  );
}

/** A label/value row inside the e-KTP data card. */
export function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center gap-[4px] text-[14px] leading-[20px]">
      <p className="text-type-body min-w-px flex-1">{label}</p>
      <p className="text-type-title min-w-px flex-1 text-right font-semibold">{value}</p>
    </div>
  );
}

export function PlainDivider({ className }: { className?: string }) {
  return <div className={cn("bg-border-mute h-px w-full", className)} />;
}

/** `divider/big` — a hairline plus the 7px shaded band underneath it. */
export function BigDivider() {
  return (
    <div className="flex w-full flex-col items-start overflow-hidden">
      <div className="bg-border-mute h-px w-full" />
      <div className="h-[7px] w-full bg-gradient-to-b from-black/4 to-transparent" />
    </div>
  );
}
