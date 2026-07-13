import { Breadcrumb } from "./Breadcrumb";

type Props = {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
};

export function PageHero({ title, subtitle, crumbs = [] }: Props) {
  return (
    <section className="border-b border-line bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {crumbs.length ? (
          <div className="mb-4">
            <Breadcrumb items={crumbs} />
          </div>
        ) : null}
        <h1 className="animate-fade-up text-3xl font-black tracking-tight text-ink-deep sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-base text-ink-soft animate-fade-up" style={{ animationDelay: "80ms" }}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
