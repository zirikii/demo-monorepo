import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowLeft, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/cn";

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pb-2 pt-3 text-[14px] font-semibold",
        dark ? "text-white" : "text-ink",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <Signal className="size-3.5" aria-hidden="true" />
        <Wifi className="size-3.5" aria-hidden="true" />
        <span className="relative h-3 w-6 rounded-[3px] border border-current" aria-hidden="true">
          <span className="absolute inset-y-0.5 left-0.5 right-1 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function NavBar({
  title,
  onBack,
  dark = false,
  right,
}: {
  title?: string;
  onBack?: () => void;
  dark?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 px-4 pb-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={cn(
            "flex size-10 items-center justify-center rounded-full",
            dark ? "text-white" : "text-ink",
          )}
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
        </button>
      ) : (
        <span className="size-10" />
      )}
      <h1
        className={cn(
          "flex-1 truncate text-[18px] font-semibold leading-6",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h1>
      {right ?? <span className="size-10" />}
    </div>
  );
}

export function PrimaryButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "h-11 w-full rounded-full bg-gopay text-[16px] font-bold text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "h-11 w-full rounded-full border border-gopay bg-gradient-to-b from-white/70 to-transparent text-[16px] font-bold text-gopay",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn("w-full py-2 text-center text-[14px] font-bold text-gopay", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[812px] w-[375px] flex-col overflow-hidden bg-page shadow-[0_24px_60px_rgba(20,24,28,0.18)] sm:rounded-[32px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="absolute inset-x-4 top-24 z-20 rounded-2xl bg-ink px-4 py-3 text-[13px] leading-5 text-white shadow-lg">
      <p>{message}</p>
      <button type="button" className="mt-2 text-[12px] font-bold text-white" onClick={onClose}>
        Dismiss
      </button>
    </div>
  );
}
