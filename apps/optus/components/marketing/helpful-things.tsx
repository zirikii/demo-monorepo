import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { helpfulLinks } from "@/lib/constants/marketing";

export function HelpfulThings() {
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-extrabold text-optus-ink">Helpful things</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {helpfulLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="focus-ring group flex flex-col justify-between rounded-lg border border-line bg-white p-5 hover:border-optus-teal"
          >
            <div>
              <h3 className="font-bold text-optus-ink">{link.title}</h3>
              <p className="mt-1 text-sm text-optus-ink/70">{link.body}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-optus-teal">
              Go
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
