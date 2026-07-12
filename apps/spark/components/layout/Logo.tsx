import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  variant?: "colour" | "white";
  href?: string;
  className?: string;
  /** Rendered logo height in pixels (width scales to the Spark lockup ratio). */
  height?: number;
}

/** Spark wordmark + spot, linked. Uses the official brand SVGs under /brand. */
export function Logo({ variant = "colour", href = "/", className, height = 34 }: LogoProps) {
  const src = variant === "white" ? "/brand/spark-logo-white.svg" : "/brand/spark-logo.svg";
  // The Spark lockup SVG has a 332 x 122 viewBox (~2.72:1).
  const width = Math.round(height * 2.72);
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center focus-ring rounded-sm", className)}
      aria-label="Spark home"
    >
      <Image src={src} alt="Spark" width={width} height={height} priority unoptimized />
    </Link>
  );
}
