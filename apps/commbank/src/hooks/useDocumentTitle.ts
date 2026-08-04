import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title.includes("CommBank")
      ? title
      : `${title} | CommBank (Demo)`;
  }, [title]);
}
