import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function EverydayAccountsPage() {
  const product = getProductByPath("/banking/everyday-accounts");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
