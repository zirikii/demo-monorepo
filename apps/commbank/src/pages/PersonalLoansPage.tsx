import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function PersonalLoansPage() {
  const product = getProductByPath("/banking/personal-loans");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
