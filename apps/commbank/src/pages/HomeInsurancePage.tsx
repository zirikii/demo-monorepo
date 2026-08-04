import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function HomeInsurancePage() {
  const product = getProductByPath("/insurance/home");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
