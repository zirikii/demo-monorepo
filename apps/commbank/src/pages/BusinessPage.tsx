import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function BusinessPage() {
  const product = getProductByPath("/business");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
