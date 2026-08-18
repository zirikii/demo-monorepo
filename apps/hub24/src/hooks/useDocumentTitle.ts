import { useEffect } from "react";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | HUB24 (Demo)`;
  }, [title]);
}
