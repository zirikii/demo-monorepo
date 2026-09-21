import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The message card on the result screens. Its top edge scallops around the countdown
 * dial, so the outline is drawn as a path rather than a CSS border. Everything except
 * the height is fixed by the design; `height` is the value Figma uses per variant.
 */
function notchedCardPath(height: number): string {
  const bottom = 8 + height;
  return [
    "M347.535 8",
    "C358.285 8 367 16.7148 367 27.4648",
    `V${bottom - 20}`,
    `C367 ${bottom - 8.954} 358.046 ${bottom} 347 ${bottom}`,
    "H28",
    `C16.9543 ${bottom} 8 ${bottom - 8.954} 8 ${bottom - 20}`,
    "V27.4648",
    "C8 16.7148 16.7148 8 27.4648 8",
    "H111.13",
    "C118.853 8 125.675 12.7391 131.125 18.211",
    "C142.959 30.094 164.007 38 188 38",
    "C211.993 38 233.041 30.094 244.875 18.211",
    "C250.325 12.7391 257.147 8 264.87 8",
    "Z",
  ].join(" ");
}

export function NotchedCard({
  height,
  className,
  children,
}: {
  height: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative w-[375px]", className)} style={{ height: height + 8 }}>
      <svg
        aria-hidden
        className="absolute inset-0 block"
        width={375}
        height={height + 8}
        viewBox={`0 0 375 ${height + 8}`}
        fill="none"
      >
        <path d={notchedCardPath(height)} fill="#f9fafb" stroke="#ebecef" strokeWidth="1" />
      </svg>
      <div className="relative flex h-full flex-col items-center">{children}</div>
    </div>
  );
}

/** `Group 3126166` — the secondary panel the notched card and follow-up cards sit on. */
export function ResultPanel({ children }: { children: ReactNode }) {
  return (
    <div className="bg-fill-secondary shadow-bevel-top relative mt-[216px] min-h-[596px] w-[375px] rounded-[20px] pb-[24px]">
      {children}
    </div>
  );
}
