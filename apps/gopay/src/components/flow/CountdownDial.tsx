import type { ReactNode } from "react";

const A = "/figma";

/** Ring colours from the three result states in the Figma file. */
const RING_COLOR = {
  green: "#00880d",
  amber: "#e8900e",
  red: "#ef2d2d",
} as const;

export type DialTone = keyof typeof RING_COLOR;

const RING_SIZE = 110;
/** Measured off the `Countdown Background` arc: a 4.125px band centred at r=48.81. */
const RING_STROKE = 4.125;
const RING_RADIUS = 48.81;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * The bevelled dial the result screens put above the sheet. `progress` is the fraction
 * of the ring that is drawn (1 = closed circle, which is how the non-counting states
 * render it).
 */
export function CountdownDial({
  tone,
  progress = 1,
  children,
}: {
  tone: DialTone;
  progress?: number;
  children: ReactNode;
}) {
  return (
    <div className="pointer-events-none relative mx-auto size-[142px]">
      <img
        alt=""
        className="absolute inset-0 block size-full"
        src={`${A}/countdown-bevel.svg`}
      />
      <img
        alt=""
        className="absolute top-1/2 left-1/2 block size-[120px] -translate-x-1/2 -translate-y-1/2"
        src={`${A}/countdown-outer.svg`}
      />
      <img
        alt=""
        className="absolute top-1/2 left-1/2 block size-[120px] -translate-x-1/2 -translate-y-1/2"
        src={`${A}/countdown-outer-shadow.svg`}
      />

      <svg
        aria-hidden
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        style={{ filter: `drop-shadow(0 0 4px ${RING_COLOR[tone]}66)` }}
        className="absolute top-1/2 left-1/2 size-[110px] -translate-x-1/2 -translate-y-1/2 -rotate-90"
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke={RING_COLOR[tone]}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - Math.min(Math.max(progress, 0), 1))}
          className="transition-[stroke-dashoffset] duration-500 ease-linear"
        />
      </svg>

      <img
        alt=""
        className="absolute top-1/2 left-1/2 block size-[88px] -translate-x-1/2 -translate-y-1/2"
        src={`${A}/countdown-inner.svg`}
      />
      <img
        alt=""
        className="absolute top-1/2 left-1/2 block size-[78px] -translate-x-1/2 -translate-y-1/2"
        src={`${A}/countdown-inner-overlay.svg`}
      />

      <div className="absolute top-1/2 left-1/2 flex size-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {children}
      </div>

      <img
        alt=""
        className="absolute top-[35px] left-1/2 block h-[39.5px] w-[70px] -translate-x-1/2"
        src={`${A}/countdown-glare.svg`}
      />
    </div>
  );
}

/** A 64px spot illustration centred in the dial. */
export function DialSpot({ src }: { src: string }) {
  return <img alt="" className="block size-[64px]" src={src} />;
}
