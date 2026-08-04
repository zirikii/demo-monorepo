import { AccountsList } from "@/components/netbank/AccountsList";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NetBankHomePage() {
  useDocumentTitle("NetBank — Accounts");
  return <AccountsList />;
}
