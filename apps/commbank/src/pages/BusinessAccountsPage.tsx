import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function BusinessAccountsPage() {
  const product = getProductByPath("/business/accounts");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
