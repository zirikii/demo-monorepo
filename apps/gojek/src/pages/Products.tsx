import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { CATEGORIES, CATEGORY_LABEL, productsByCategory } from "@/data/products";

export default function ProductsPage() {
  return (
    <PageLayout title="Products">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">Products</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          20+ products serving millions of customers
        </h1>
        <div className="mt-14 space-y-16">
          {CATEGORIES.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold">{CATEGORY_LABEL[category]}</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {productsByCategory(category).map((product) => (
                  <li key={product.slug}>
                    <Link
                      to={`/products/${product.slug}`}
                      className="focus-go block rounded-go-lg border border-white/8 bg-go-card p-6 hover:border-white/20"
                    >
                      <h3 className="text-xl font-semibold" style={{ color: product.color }}>
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-go-muted">{product.tagline}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
