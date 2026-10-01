import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** React Router never scrolls on navigation, so page changes and hash links are handled here. */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const changedPage = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    // "auto" would defer to the smooth CSS scroll-behavior and animate across a page not yet seen.
    const behavior: ScrollBehavior = changedPage ? "instant" : "smooth";
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, key]);

  return null;
}
