import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function TermDepositsPage() {
  const product = getProductByPath("/banking/term-deposits");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
