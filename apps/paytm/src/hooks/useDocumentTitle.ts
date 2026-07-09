import { useEffect } from "react";

const SUFFIX = "Paytm Demo";

/** Sets `document.title` for the page; restores nothing on unmount by design (SPA). */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX;
  }, [title]);
}
