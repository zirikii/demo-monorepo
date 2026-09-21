import { cn } from "@/lib/cn";

export type StatusBarVariant = "light" | "dark" | "island" | "android";

const A = "/figma";

/**
 * iOS / Android status bars from the Figma `atoms/statusbar` components. Each variant
 * keeps the exact padding and icon geometry of the frame it appears in.
 */
export function StatusBar({
  variant = "light",
  className,
}: {
  variant?: StatusBarVariant;
  className?: string;
}) {
  if (variant === "island") {
    return (
      <div className={cn("flex w-full items-center justify-between overflow-hidden", className)}>
        <div className="flex h-[59px] w-[134px] flex-col items-center justify-center pb-[3px] pl-[10px]">
          <div className="h-[21px] w-[54px]">
            <p className="text-center text-[16px] leading-[21px] font-semibold tracking-[-0.32px] text-white">
              9:41
            </p>
          </div>
        </div>
        <div className="absolute left-1/2 flex h-[59px] -translate-x-1/2 flex-col items-center justify-center py-[11px]">
          <div className="relative h-[37px] w-[125px] rounded-[100px] bg-black" />
        </div>
        <div className="flex h-[59px] w-[134px] items-center justify-center pr-[11px]">
          <div className="h-[13px] w-[78.401px]">
            <img
              alt=""
              className="block size-full"
              src={`${A}/statusbar-signal-wifi-battery-dark.svg`}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "android") {
    return (
      <div className={cn("flex w-full items-center justify-end gap-[2px] px-[8px] pb-px", className)}>
        <div className="h-[16px] w-[18.044px]">
          <img alt="" className="block size-full" src={`${A}/statusbar-android-wifi.svg`} />
        </div>
        <div className="size-[16px]">
          <img alt="" className="block size-full" src={`${A}/statusbar-android-cellular.svg`} />
        </div>
        <div className="size-[16px]">
          <img alt="" className="block size-full" src={`${A}/statusbar-android-battery.svg`} />
        </div>
        <div className="h-[19px] opacity-90">
          <p className="text-right text-[14px] leading-[19px] font-semibold text-black">08:08</p>
        </div>
      </div>
    );
  }

  const dark = variant === "dark";
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between pt-[11px] pb-[12px] pl-[21px]",
        dark ? "pr-[15px]" : "pr-[14px]",
        className,
      )}
    >
      <div className="h-[21px] w-[54px]">
        <img
          alt=""
          className="block size-full"
          src={dark ? `${A}/statusbar-time-dark.svg` : `${A}/statusbar-time.svg`}
        />
      </div>
      {dark ? (
        <div className="absolute top-0 left-[calc(50%-0.5px)] h-[32px] w-[172px] -translate-x-1/2">
          <img alt="" className="block size-full" src={`${A}/statusbar-notch.svg`} />
        </div>
      ) : null}
      <div className="flex items-center gap-[4px]">
        <div className="h-[14px] w-[20px]">
          <img
            alt=""
            className="block size-full"
            src={dark ? `${A}/statusbar-network-dark.svg` : `${A}/statusbar-network.svg`}
          />
        </div>
        <div className="h-[14px] w-[16px]">
          <img
            alt=""
            className="block size-full"
            src={dark ? `${A}/statusbar-wifi-dark.svg` : `${A}/statusbar-wifi.svg`}
          />
        </div>
        <div className={cn("w-[25px]", dark ? "h-[12px]" : "h-[14px]")}>
          <img
            alt=""
            className="block size-full"
            src={dark ? `${A}/statusbar-battery-dark.svg` : `${A}/statusbar-battery.svg`}
          />
        </div>
      </div>
    </div>
  );
}
