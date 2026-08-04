import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function BusinessLoansPage() {
  const product = getProductByPath("/business/loans");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
