import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title.includes("Employment Hero")
      ? title
      : `${title} | Employment Hero (Demo)`;
  }, [title]);
}
