import { useEffect } from "react";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | Ticketek Australia (Demo)`;
  }, [title]);
}
