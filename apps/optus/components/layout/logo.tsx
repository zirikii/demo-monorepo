import Image from "next/image";
import { cn } from "@/lib/utils/cn";
export function OptusLogo({
  className,
  variant = "teal",
}: {
  className?: string;
  variant?: "teal" | "white";
}) {
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt="Optus"
      width={161}
      height={32}
      priority
      className={cn("h-auto w-32", className)}
    />
  );
}
