import { Link } from "react-router-dom";
import { JoinUsBand } from "@/components/layout/JoinUsBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { IMPACT_STATS, HUBS } from "@/data/stats";
import { CATEGORIES, CATEGORY_LABEL, productsByCategory } from "@/data/products";

export default function AboutPage() {
  return (
    <PageLayout title="About us">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">About us</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Once a call-centre operation in Jakarta, now a Decacorn in Southeast Asia.
        </h1>
        <div className="mt-8 max-w-3xl space-y-4 text-lg text-go-muted">
          <p>
            Gojek started in 2010 as a call centre — twenty drivers, three services, one phone bank. The app launched
            in January 2015 with GoRide, GoSend, GoShop, and GoFood.
          </p>
          <p>
            Today it is Southeast Asia&apos;s leading on-demand platform and a pioneer of the multi-service ecosystem:
            20+ products, millions of customers, and a GoTo Group that also holds GoTo Financial.
          </p>
        </div>
        <dl className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="border-t border-white/12 pt-4">
              <dt className="text-sm text-go-faint">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold">Three hubs. One Super App.</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {HUBS.map((hub) => (
              <li key={hub.city} className="rounded-go-lg border border-white/8 bg-go-card p-6">
                <p className="text-xs tracking-[0.16em] text-go-faint uppercase">{hub.country}</p>
                <h3 className="mt-2 text-2xl font-semibold">{hub.city}</h3>
                <p className="mt-3 text-sm text-go-muted">{hub.focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold">The products nations run on</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {CATEGORIES.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold">{CATEGORY_LABEL[category]}</h3>
                <p className="mt-2 text-sm text-go-muted">
                  {productsByCategory(category)
                    .map((product) => product.name)
                    .join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <Link to="/products" className="mt-8 inline-flex text-go-green hover:underline">
            Browse every product
          </Link>
        </div>
      </section>
      <JoinUsBand />
    </PageLayout>
  );
}
