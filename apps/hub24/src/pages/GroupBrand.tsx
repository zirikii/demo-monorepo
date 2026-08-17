import { Navigate, useLocation } from "react-router-dom";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { GROUP_BRANDS } from "@/data/group";

export default function GroupBrandPage() {
  const { pathname } = useLocation();
  const brand = pathname.includes("myprosperity")
    ? GROUP_BRANDS.myprosperity
    : pathname.includes("class")
      ? GROUP_BRANDS.class
      : null;
  if (!brand) return <Navigate to="/about-us" replace />;

  return (
    <PageLayout title={brand.name}>
      <PageHero eyebrow={brand.eyebrow} title={brand.name} body={brand.summary} />
      <Section>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{brand.body}</p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {brand.points.map((point) => (
            <li key={point} className="rounded-hub border border-line bg-surface-tint px-4 py-3">
              {point}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
