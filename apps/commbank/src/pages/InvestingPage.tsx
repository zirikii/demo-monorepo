import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function InvestingPage() {
  const product = getProductByPath("/investing");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
