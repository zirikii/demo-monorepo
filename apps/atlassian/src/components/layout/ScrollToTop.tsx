import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router keeps the scroll position across navigations. Reset it on pathname change,
 * but honour in-page hash targets so anchor links still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
