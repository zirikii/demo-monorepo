import { Link } from "react-router-dom";
import { ArrowRight, FileText, ScrollText, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const documents = [
  {
    icon: ScrollText,
    title: "Privacy Policy",
    copy: "What data this demo does (and mostly doesn't) collect, and how a real policy would be structured.",
    to: "/legal/privacy-policy",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    copy: "The security practices page, covering infrastructure, assurance, and access governance.",
    to: "/security",
  },
  {
    icon: FileText,
    title: "Demo disclaimer",
    copy: "This is an unofficial demonstration build. It is not affiliated with, endorsed by, or connected to Squiz in any way.",
    to: "/about",
  },
];

export function LegalPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Legal" }]} />
      <PageHero
        eyebrow="Legal"
        title="Legal information"
        copy="Policies and disclaimers for this demonstration website."
      />
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map(({ icon: DocIcon, title, copy, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex h-full flex-col rounded-2xl border border-cream-deep bg-card p-7 shadow-card transition-shadow hover:shadow-float"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint-tint text-navy">
                <DocIcon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy group-hover:underline">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                Read
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
