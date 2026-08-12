import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  blurb,
  breadcrumbs,
  tone = "wash",
  children,
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  breadcrumbs?: { label: string; to?: string }[];
  tone?: "wash" | "purple" | "white";
  children?: ReactNode;
}) {
  const light = tone === "purple";

  return (
    <section
      className={cn(
        "py-14 md:py-20",
        tone === "purple" && "bg-eh-purple text-white",
        tone === "wash" && "bg-eh-purple-wash",
        tone === "white" && "bg-white",
      )}
    >
      <div className="container-eh">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1 text-xs",
                light ? "text-white/70" : "text-eh-ink-faint",
              )}
            >
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 ? <ChevronRight size={12} /> : null}
                  {crumb.to ? (
                    <Link to={crumb.to} className="focus-eh hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-bold tracking-[0.16em] uppercase",
                light ? "text-eh-lime" : "text-eh-purple",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "mt-3 text-4xl leading-[1.1] font-bold md:text-5xl",
              light ? "text-white" : "text-eh-ink",
            )}
          >
            {title}
          </h1>
          {blurb ? (
            <p
              className={cn(
                "mt-5 text-lg leading-relaxed",
                light ? "text-white/80" : "text-eh-ink-soft",
              )}
            >
              {blurb}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
