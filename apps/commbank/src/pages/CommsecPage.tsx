import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function CommsecPage() {
  const product = getProductByPath("/investing/commsec");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
