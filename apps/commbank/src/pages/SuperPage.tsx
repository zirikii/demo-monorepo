import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function SuperPage() {
  const product = getProductByPath("/investing/super");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
