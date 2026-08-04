import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function FeedbackBar() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <section className="border-t border-line bg-surface py-8">
      <div className="container-page flex flex-wrap items-center gap-4">
        <p className="text-sm font-semibold text-black">Was the information on this page useful?</p>
        {answer ? (
          <p className="text-sm text-ink-soft" role="status">
            Thanks for your feedback.
          </p>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setAnswer("yes")}>
              Yes
            </Button>
            <Button size="sm" variant="outline" onClick={() => setAnswer("no")}>
              No
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
