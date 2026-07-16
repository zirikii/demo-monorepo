import { useEffect } from "react";

const SUFFIX = "nine.com.au (Demo)";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SUFFIX}`
      : `Latest News, Sport & Entertainment | ${SUFFIX}`;
  }, [title]);
}
