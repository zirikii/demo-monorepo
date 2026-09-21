import {
  Bike,
  Boxes,
  Building2,
  Bus,
  Car,
  Clapperboard,
  CreditCard,
  Gamepad2,
  HandHeart,
  Newspaper,
  Package,
  Pill,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  SprayCan,
  Store,
  Ticket,
  TrendingUp,
  Utensils,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ProductIconKey } from "@/data/products";

const registry: Record<ProductIconKey, LucideIcon> = {
  bike: Bike,
  car: Car,
  package: Package,
  boxes: Boxes,
  bus: Bus,
  utensils: Utensils,
  cart: ShoppingCart,
  bag: ShoppingBag,
  pill: Pill,
  wallet: Wallet,
  card: CreditCard,
  receipt: Receipt,
  phone: Smartphone,
  chart: TrendingUp,
  massage: HandHeart,
  clean: SprayCan,
  wrench: Wrench,
  store: Store,
  building: Building2,
  movie: Clapperboard,
  ticket: Ticket,
  game: Gamepad2,
  news: Newspaper,
};

export function ProductIcon({
  icon,
  className,
}: {
  icon: ProductIconKey;
  className?: string;
}) {
  const Icon = registry[icon];
  return <Icon aria-hidden="true" className={className} />;
}
