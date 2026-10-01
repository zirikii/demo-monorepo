import { useLocation } from "react-router-dom";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";

export function Assistant() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <AssistantLauncher />
      <AssistantPanel />
    </>
  );
}
