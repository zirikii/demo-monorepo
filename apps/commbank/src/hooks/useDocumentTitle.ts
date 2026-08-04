import { useEffect } from "react";

const SUFFIX = "CommBank (Demo)";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;
  }, [title]);
}
