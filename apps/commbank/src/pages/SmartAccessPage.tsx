import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function SmartAccessPage() {
  const product = getProductByPath("/banking/everyday-account-smart-access");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
