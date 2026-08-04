import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function NetbankSaverPage() {
  const product = getProductByPath("/banking/netbank-saver");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
