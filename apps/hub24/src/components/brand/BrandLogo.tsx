import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

const SRC: Record<Tone, string> = {
  dark: "/brand/logo-dark.svg",
  light: "/brand/logo-light.svg",
};

interface BrandLogoProps {
  tone?: Tone;
  className?: string;
}

export function BrandLogo({ tone = "dark", className }: BrandLogoProps) {
  return (
    <img
      src={SRC[tone]}
      alt="HUB24"
      width={140}
      height={30}
      className={cn("h-7 w-auto", className)}
    />
  );
}
