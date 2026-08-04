import { Link } from "react-router-dom";
import { productPages } from "@/data/products";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const extras = [
  { title: "Home", path: "/" },
  { title: "Log on", path: "/login" },
  { title: "Sign up", path: "/signup" },
  { title: "NetBank", path: "/netbank" },
  { title: "Rates", path: "/rates" },
  { title: "Calculators", path: "/calculators" },
  { title: "Offers", path: "/offers" },
  { title: "Find us", path: "/find-us" },
  { title: "Help", path: "/help" },
  { title: "Contact", path: "/contact" },
  { title: "Travel", path: "/travel" },
  { title: "About", path: "/about" },
  { title: "Careers", path: "/careers" },
  { title: "Newsroom", path: "/newsroom" },
  { title: "Sustainability", path: "/sustainability" },
  { title: "Security", path: "/security" },
  { title: "Privacy", path: "/privacy" },
  { title: "Accessibility", path: "/accessibility" },
];

export function SitemapPage() {
  useDocumentTitle("Sitemap");
  const links = [...extras, ...productPages.map((p) => ({ title: p.title, path: p.path }))];
  return (
    <PageLayout>
      <PageHero eyebrow="Site" title="Sitemap" summary="All demo routes in one place." />
      <div className="mx-auto max-w-6xl columns-1 gap-4 px-4 py-10 sm:columns-2 sm:px-6 md:columns-3">
        {links.map((l) => (
          <Link key={l.path + l.title} to={l.path} className="mb-2 block text-sm text-cba-blue hover:underline">
            {l.title}
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
