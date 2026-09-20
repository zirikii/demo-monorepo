import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-gojek">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
