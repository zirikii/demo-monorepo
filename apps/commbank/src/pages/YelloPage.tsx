import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function YelloPage() {
  const product = getProductByPath("/commbank-yello");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
