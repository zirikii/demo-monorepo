import type { ReactNode } from "react";

export function BottomCtaBar({ children }: { children: ReactNode }) {
  return <div className="shrink-0 space-y-3 bg-bg-primary px-4 pb-8 pt-3">{children}</div>;
}
