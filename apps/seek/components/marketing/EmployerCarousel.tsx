"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Star, Users } from "lucide-react";
import type { Employer } from "@/lib/types";
import { EmployerLogo } from "@/components/common/EmployerLogo";
import { cn } from "@/lib/utils/cn";

const PAGE_SIZE = 6;

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      title={`${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            i < rounded
              ? "fill-tone-caution text-tone-caution"
              : "fill-transparent text-line-strong",
          )}
        />
      ))}
    </span>
  );
}

const reviewFmt = new Intl.NumberFormat("en-AU");

export function EmployerCarousel({ employers }: { employers: Employer[] }) {
  const [page, setPage] = React.useState(0);
  const pageCount = Math.max(1, Math.ceil(employers.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * PAGE_SIZE;
  const visible = employers.slice(start, start + PAGE_SIZE);

  return (
    <section className="container-page py-14" aria-label="Find your next employer">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-seek-navy">Find your next employer</h2>
          <p className="mt-1 max-w-2xl text-ink-secondary">
            Explore company profiles to learn about jobs, reviews, company culture, perks and
            benefits. (All employers shown are fictional.)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-ink-muted" aria-live="polite">
            {safePage + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              aria-label="Previous employers"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-seek-navy transition-colors hover:border-seek-pink hover:text-seek-pink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-seek-navy"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
              aria-label="Next employers"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-seek-navy transition-colors hover:border-seek-pink hover:text-seek-pink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-seek-navy"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((emp) => (
          <li key={emp.id}>
            <Link
              href={`/companies/${emp.slug}`}
              className="focus-ring group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-card transition-all hover:border-seek-pink hover:shadow-card-hover"
            >
              <div className="flex items-start gap-3">
                <EmployerLogo src={emp.logo} name={emp.name} size={48} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-seek-navy">{emp.name}</p>
                  <p className="truncate text-xs text-ink-muted">{emp.industry}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <StarRating rating={emp.rating} />
                <span className="font-semibold text-seek-navy">{emp.rating.toFixed(1)}</span>
                <span className="text-ink-muted">
                  ({reviewFmt.format(emp.reviewCount)} reviews)
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-ink-secondary">{emp.tagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {emp.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {emp.size}
                </span>
              </div>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-seek-pink">
                View company reviews
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
