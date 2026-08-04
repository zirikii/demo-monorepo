import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function CarInsurancePage() {
  const product = getProductByPath("/insurance/car");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
