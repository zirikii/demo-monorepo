import { useEffect } from "react";

const SUFFIX = "Gojek Tech (Demo)";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;
  }, [title]);
}
