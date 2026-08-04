import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router never scrolls on navigation, and a pushState does not trigger the
 * browser's native anchor jump, so both cross-page and same-page hash links need
 * handling here. Anchor targets rely on scroll-margin-top to clear the sticky
 * header. Keyed on `location.key` so re-clicking the same anchor scrolls again.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const changedPage = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    // Animating across a page the visitor has not seen yet reads as a glitch, so
    // only same-page anchors scroll smoothly.
    const behavior: ScrollBehavior = changedPage ? "auto" : "smooth";
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior });
    }
  }, [pathname, hash, key]);

  return null;
}
