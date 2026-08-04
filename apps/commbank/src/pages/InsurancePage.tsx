import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function InsurancePage() {
  const product = getProductByPath("/insurance");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
