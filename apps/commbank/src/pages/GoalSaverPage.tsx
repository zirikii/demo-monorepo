import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function GoalSaverPage() {
  const product = getProductByPath("/banking/goalsaver");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
