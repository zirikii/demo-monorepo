import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function SavingsAccountsPage() {
  const product = getProductByPath("/banking/savings-accounts");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
