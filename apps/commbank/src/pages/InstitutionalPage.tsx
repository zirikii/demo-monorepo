import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function InstitutionalPage() {
  const product = getProductByPath("/institutional");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
