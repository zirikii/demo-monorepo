import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The five AGL rays, traced from public/brand/logo.png (1024px artboard). Each ray runs from its
 * outer tip (deep blue) to its inner end (light cyan), matching the official gradient direction.
 */
const RAYS = [
  { tip: [262, 345], inner: [410, 530] },
  { tip: [462, 228], inner: [490, 465] },
  { tip: [645, 288], inner: [580, 465] },
  { tip: [742, 420], inner: [665, 508] },
  { tip: [212, 626], inner: [385, 657] },
] as const;

export type RaysState = "idle" | "listening" | "thinking" | "speaking";

type Props = {
  className?: string;
  /** 0–1 audio level. Drives ray length while listening or speaking. */
  level?: number;
  state?: RaysState;
  animated?: boolean;
  title?: string;
};

export function AglRays({ className, level = 0, state = "idle", animated = false, title }: Props) {
  const id = useId().replace(/:/g, "");
  const [scales, setScales] = useState<number[]>(() => RAYS.map(() => 1));
  const [glow, setGlow] = useState<number[]>(() => RAYS.map(() => 1));
  const levelRef = useRef(level);
  levelRef.current = level;
  const smooth = useRef(0);

  useEffect(() => {
    if (!animated) {
      setScales(RAYS.map(() => 1));
      setGlow(RAYS.map(() => 1));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      smooth.current += (levelRef.current - smooth.current) * 0.25;
      const lvl = smooth.current;
      setScales(
        RAYS.map((_, i) => {
          const phase = Math.sin(t * (2.2 + i * 0.35) + i * 1.3);
          if (state === "speaking") return 0.62 + 0.38 * Math.min(1, lvl * (0.8 + 0.35 * phase));
          if (state === "listening") return 0.78 + 0.22 * Math.min(1, lvl * 1.4) + 0.03 * phase;
          if (state === "thinking") return 0.8 + 0.08 * Math.sin(t * 5 - i * 0.9);
          return 0.92 + 0.05 * phase;
        }),
      );
      setGlow(
        RAYS.map((_, i) => (state === "thinking" ? 0.45 + 0.55 * Math.max(0, Math.sin(t * 5 - i * 0.9)) : 1)),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated, state]);

  return (
    <svg
      viewBox="180 196 600 500"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        {RAYS.map((ray, i) => (
          <linearGradient
            key={i}
            id={`${id}-ray-${i}`}
            gradientUnits="userSpaceOnUse"
            x1={ray.tip[0]}
            y1={ray.tip[1]}
            x2={ray.inner[0]}
            y2={ray.inner[1]}
          >
            <stop offset="0" stopColor="var(--color-ray-deep)" />
            <stop offset="0.45" stopColor="var(--color-ray-cyan)" />
            <stop offset="1" stopColor="var(--color-ray-light)" />
          </linearGradient>
        ))}
      </defs>
      {RAYS.map((ray, i) => {
        const s = scales[i] ?? 1;
        const x2 = ray.inner[0] + (ray.tip[0] - ray.inner[0]) * s;
        const y2 = ray.inner[1] + (ray.tip[1] - ray.inner[1]) * s;
        return (
          <line
            key={i}
            x1={ray.inner[0]}
            y1={ray.inner[1]}
            x2={x2}
            y2={y2}
            stroke={`url(#${id}-ray-${i})`}
            strokeWidth={50}
            strokeLinecap="round"
            opacity={glow[i] ?? 1}
          />
        );
      })}
    </svg>
  );
}
