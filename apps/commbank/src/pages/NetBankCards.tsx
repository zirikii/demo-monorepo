import { CardsPanel } from "@/components/netbank/CardsPanel";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NetBankCardsPage() {
  useDocumentTitle("NetBank — Cards");
  return <CardsPanel />;
}
