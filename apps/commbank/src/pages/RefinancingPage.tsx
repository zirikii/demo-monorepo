import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function RefinancingPage() {
  const product = getProductByPath("/home-loans/refinancing");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
