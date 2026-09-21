import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The Figma frames are 375 x 812 iPhone screens; taller frames (expanded review, the
 * result screens, Dira) scroll inside the same viewport.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="shadow-device rounded-[52px] bg-[#0f1115] p-[8px]">
      <div className="h-[812px] w-[375px] overflow-hidden rounded-[44px] bg-black">{children}</div>
    </div>
  );
}

/** One screen inside the device viewport. */
export function Screen({
  background = "bg-fill-quaternary",
  className,
  children,
}: {
  background?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-x-hidden overflow-y-auto [animation:screen-in_.18s_ease-out]",
        background,
        className,
      )}
    >
      {children}
    </div>
  );
}
