import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function NetbankInfoPage() {
  const product = getProductByPath("/digital-banking/netbank");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
