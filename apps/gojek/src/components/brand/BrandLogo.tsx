import { Link } from "react-router-dom";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

type Tone = "white" | "green" | "black";

const SRC: Record<Tone, string> = {
  white: asset("/brand/logo-white.svg"),
  green: asset("/brand/logo-green.svg"),
  black: asset("/brand/logo-black.svg"),
};

interface BrandLogoProps {
  tone?: Tone;
  to?: string;
  className?: string;
  imgClassName?: string;
}

export function BrandLogo({ tone = "white", to = "/", className, imgClassName }: BrandLogoProps) {
  const image = (
    <img
      src={SRC[tone]}
      alt="Gojek"
      width={92}
      height={30}
      className={cn("block h-[30px] w-[92px]", imgClassName)}
    />
  );

  if (!to) return <span className={className}>{image}</span>;

  return (
    <Link to={to} className={cn("focus-go inline-flex items-center", className)} aria-label="Gojek home">
      {image}
    </Link>
  );
}
