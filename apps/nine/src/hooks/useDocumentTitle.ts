import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title.includes("nine.com.au") ? title : `${title} | nine.com.au`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
