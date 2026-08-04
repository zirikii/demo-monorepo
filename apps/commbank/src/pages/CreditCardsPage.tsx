import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function CreditCardsPage() {
  const product = getProductByPath("/banking/credit-cards");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
