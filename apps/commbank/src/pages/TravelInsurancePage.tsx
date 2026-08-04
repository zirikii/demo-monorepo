import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function TravelInsurancePage() {
  const product = getProductByPath("/insurance/travel");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
