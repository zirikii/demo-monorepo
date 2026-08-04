import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function BankingPage() {
  const product = getProductByPath("/banking");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
