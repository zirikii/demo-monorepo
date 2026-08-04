import { TransferForm } from "@/components/netbank/TransferForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NetBankTransfersPage() {
  useDocumentTitle("NetBank — Transfers");
  return <TransferForm />;
}
