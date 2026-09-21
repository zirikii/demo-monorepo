import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { StatusBar, type StatusBarVariant } from "./StatusBar";

const A = "/figma";

/** `molecules/navbar/default` — back chevron plus an 18/24 semibold screen title. */
export function TitleNavbar({
  title,
  onBack,
  className,
}: {
  title: string;
  onBack?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col items-center gap-[8px] pb-[8px]", className)}>
      <StatusBar variant="light" />
      <div className="flex w-full items-center gap-[24px] px-[16px]">
        <div className="flex min-w-px flex-1 items-center gap-[8px]">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="size-[24px] shrink-0 cursor-pointer"
          >
            <img alt="" className="block size-full" src={`${A}/ic-back.svg`} />
          </button>
          <div className="flex h-[40px] min-w-px flex-1 items-center overflow-hidden">
            <p className="text-type-title min-w-px flex-1 text-[18px] leading-[24px] font-semibold">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** `molecules/navbar/transparent` — a floating circular button over artwork. */
export function CircularButton({
  icon,
  label,
  onClick,
  className,
}: {
  icon: "back" | "close";
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "bg-fill-secondary shadow-float relative size-[40px] shrink-0 cursor-pointer rounded-[100px]",
        className,
      )}
    >
      <span className="absolute top-1/2 left-1/2 size-[40px] -translate-x-1/2 -translate-y-1/2">
        <img alt="" className="block size-full" src={`${A}/button-circular-fill.svg`} />
      </span>
      <span className="absolute top-1/2 left-1/2 flex size-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <img
          alt=""
          className="block size-full"
          src={icon === "back" ? `${A}/ic-back-circular.svg` : `${A}/ic-close-pip.svg`}
        />
      </span>
    </button>
  );
}

export function TransparentNavbar({
  statusBar = "light",
  onBack,
  backIcon = "back",
  right,
  className,
}: {
  statusBar?: StatusBarVariant;
  onBack?: () => void;
  backIcon?: "back" | "close";
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-[8px] pb-[8px]", className)}>
      <StatusBar variant={statusBar} />
      <div className="flex w-full items-center justify-between px-[16px]">
        <CircularButton icon={backIcon} label={backIcon === "back" ? "Back" : "Close"} onClick={onBack} />
        {right}
      </div>
    </div>
  );
}

/** `navbar/kyc/transparent` — flat back arrow over the camera, plus "View Guides". */
export function CaptureNavbar({
  onBack,
  showGuides = true,
  guidesTone = "dark",
}: {
  onBack?: () => void;
  showGuides?: boolean;
  guidesTone?: "dark" | "light";
}) {
  return (
    <div className="flex w-full items-center justify-between px-[16px] py-[8px]">
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="flex size-[40px] cursor-pointer items-center justify-center"
      >
        <span className="size-[24px]">
          <img alt="" className="block size-full" src={`${A}/ic-back-light.svg`} />
        </span>
      </button>
      {showGuides ? (
        <button
          type="button"
          className={cn(
            "cursor-pointer rounded-[24px] py-[8px] pl-[8px] text-[14px] leading-[20px] font-bold",
            guidesTone === "dark" ? "text-type-title" : "text-white drop-shadow",
          )}
        >
          View Guides
        </button>
      ) : null}
    </div>
  );
}
