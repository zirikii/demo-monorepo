import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router never scrolls on navigation, and a pushState does not trigger the
 * browser's native anchor jump, so both cross-page and same-page hash links need
 * handling here. Anchor targets rely on scroll-margin-top to clear the sticky
 * header.
 *
 * This is a layout effect on purpose: in a plain effect the browser paints the top
 * of the destination page before the scroll lands, so a hash navigation visibly
 * flashes the wrong position first.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  // Null rather than the current pathname, so the first render counts as arriving on
  // a new page and a shared or refreshed hash URL jumps instead of animating.
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const changedPage = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    // "instant" rather than "auto": auto defers to the CSS scroll-behavior, which is
    // smooth here, so it would animate. Animating across a page the visitor has not
    // seen yet reads as a glitch, so only same-page anchors scroll smoothly.
    const behavior: ScrollBehavior = changedPage ? "instant" : "smooth";
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior });
    }
  }, [pathname, hash, key]);

  return null;
}
