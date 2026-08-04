import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function LifeInsurancePage() {
  const product = getProductByPath("/insurance/life");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
