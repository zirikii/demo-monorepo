import type { PropsWithChildren } from "react";
import { Badge } from "@/components/ui/Badge";

export function PageHero({ eyebrow, title, description, children }: PropsWithChildren<{ eyebrow: string; title: string; description: string }>) {
  return (
    <section className="hero-grid border-b border-[#eadfd3] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-[#2f271f] md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#665448]">{description}</p>
        </div>
        {children ? <div>{children}</div> : null}
      </div>
    </section>
  );
}
