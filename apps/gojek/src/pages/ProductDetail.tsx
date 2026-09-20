import { Link, Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { CATEGORY_LABEL, getProduct } from "@/data/products";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  if (!product) return <Navigate to="/products" replace />;

  return (
    <PageLayout title={product.name}>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <Link to="/products" className="text-sm text-go-green hover:underline">
          Products
        </Link>
        <p className="mt-6 text-xs tracking-[0.16em] text-go-faint uppercase">{CATEGORY_LABEL[product.category]}</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight" style={{ color: product.color }}>
          {product.name}
        </h1>
        <p className="mt-6 text-2xl text-go-muted">{product.tagline}</p>
        <p className="mt-6 text-lg text-go-muted">{product.summary}</p>
      </article>
    </PageLayout>
  );
}
