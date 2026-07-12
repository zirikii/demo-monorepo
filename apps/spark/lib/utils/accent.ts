import type { AccentColour } from "@/lib/types";

interface AccentClasses {
  /** Solid background (for chips / icon tiles). */
  bg: string;
  /** Soft tinted background. */
  softBg: string;
  /** Text colour on light surfaces. */
  text: string;
  /** Border colour. */
  border: string;
  /** Top strip / bar. */
  bar: string;
}

/** Map a promotion/accent colour to Tailwind utility classes (Spark spot palette). */
export const ACCENT_CLASSES: Record<AccentColour, AccentClasses> = {
  purple: {
    bg: "bg-spark-purple",
    softBg: "bg-spark-purple-light",
    text: "text-spark-purple",
    border: "border-spark-purple",
    bar: "bg-spark-purple",
  },
  green: {
    bg: "bg-spark-green",
    softBg: "bg-[#E4F5EC]",
    text: "text-[#00854A]",
    border: "border-spark-green",
    bar: "bg-spark-green",
  },
  magenta: {
    bg: "bg-spark-magenta",
    softBg: "bg-[#FDE8F4]",
    text: "text-spark-magenta",
    border: "border-spark-magenta",
    bar: "bg-spark-magenta",
  },
  orange: {
    bg: "bg-spark-orange",
    softBg: "bg-[#FFF2DC]",
    text: "text-[#B7791F]",
    border: "border-spark-orange",
    bar: "bg-spark-orange",
  },
};
