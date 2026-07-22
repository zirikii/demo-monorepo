import Link from "next/link";

export function SectionHeading({
  title,
  description,
  cta,
}: {
  title: string;
  description?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-optus-ink-soft">{description}</p> : null}
      </div>
      {cta ? (
        <Link
          href={cta.href}
          className="text-sm font-semibold text-optus-ink underline-offset-4 hover:underline"
        >
          {cta.label} →
        </Link>
      ) : null}
    </div>
  );
}
