import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function HomeLoansPage() {
  const product = getProductByPath("/home-loans");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
