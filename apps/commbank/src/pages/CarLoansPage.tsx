import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function CarLoansPage() {
  const product = getProductByPath("/banking/car-loans");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
