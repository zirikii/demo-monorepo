import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

/** Slim announcement strip that sits above the sticky header. */
export function AnnouncementBanner() {
  return (
    <div className="bg-navy text-white">
      <Link
        to="/products/content-intelligence"
        className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-sm hover:underline"
      >
        <Sparkles className="size-4 text-mint" aria-hidden />
        <span className="font-semibold text-mint">NEW</span>
        <span className="hidden sm:inline">
          Content Intelligence is here! Make your content unmissable to AI search.
        </span>
        <span className="sm:hidden">Content Intelligence is here!</span>
        <ArrowRight className="size-4 text-mint" aria-hidden />
      </Link>
    </div>
  );
}
