import { getProductByPath } from "@/data/products";
import { ProductPageView } from "@/components/shared/ProductPageView";
import { NotFoundPage } from "@/pages/NotFound";

export function BuyingHomePage() {
  const product = getProductByPath("/home-loans/buying");
  if (!product) return <NotFoundPage />;
  return <ProductPageView product={product} />;
}
