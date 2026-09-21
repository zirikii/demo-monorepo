import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[40px] bg-bg-primary shadow-[0_24px_60px_rgb(16_24_32/18%)] ring-8 ring-black">
      {children}
    </div>
  );
}
