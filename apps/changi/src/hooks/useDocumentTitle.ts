import { useEffect } from "react";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} | Changi Airport (Demo)` : "Airport | Changi Airport (Demo)";
  }, [title]);
}
