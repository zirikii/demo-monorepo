import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { catalogue, rewardBenefits } from "@/data/rewards";
import { formatPoints } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

type RedeemFeedback = {
  type: "success" | "error";
  message: string;
};

export function RewardsPage() {
  useDocumentTitle("Changi Rewards");
  const navigate = useNavigate();
  const { user, redeemPoints } = useAuth();
  const [feedback, setFeedback] = useState<RedeemFeedback | null>(null);

  const handleRedeem = (item: (typeof catalogue)[number]) => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent("/rewards")}`);
      return;
    }

    if (user.points < item.points) {
      setFeedback({
        type: "error",
        message: `You need ${formatPoints(item.points - user.points)} more points to redeem ${item.title}.`,
      });
      return;
    }

    const updatedUser = redeemPoints(item.points);
    if (!updatedUser) return;
    setFeedback({
      type: "success",
      message: `Redeemed ${item.title}. Your new balance is ${formatPoints(updatedUser.points)} points.`,
    });
  };

  return (
    <PageLayout>
      <PageHero
        title="Changi Rewards"
        subtitle="Earn when you dine, shop, and park — redeem for vouchers, experiences, and more."
        crumbs={[{ label: "Changi Rewards" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rewardBenefits.map((b) => (
            <article key={b.title} className="rounded-2xl border border-line bg-sand p-5">
              <h2 className="text-base font-black text-ink-deep">{b.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{b.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-ink-deep">Catalogue highlights</h2>
            {user ? (
              <p className="mt-2 text-sm text-ink-soft">
                Your balance:{" "}
                <span className="font-black text-purple">{formatPoints(user.points)} pts</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink-soft">
                Sign in to redeem catalogue rewards instantly.
              </p>
            )}
          </div>
          <Link to="/signup">
            <Button variant="purple">Join Changi Rewards</Button>
          </Link>
        </div>
        {feedback ? (
          <div
            className={`mt-5 rounded-xl border p-4 text-sm font-bold ${
              feedback.type === "success"
                ? "border-green/25 bg-green/10 text-green"
                : "border-danger/25 bg-danger/10 text-danger"
            }`}
            role={feedback.type === "success" ? "status" : "alert"}
          >
            {feedback.message}
          </div>
        ) : null}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {catalogue.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-xl border border-line bg-card p-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                {item.category}
              </p>
              <h3 className="mt-1 font-black text-ink-deep">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              <p className="mt-3 text-sm font-bold text-purple">{formatPoints(item.points)} pts</p>
              <Button
                className="mt-4 w-full"
                variant="secondary"
                onClick={() => handleRedeem(item)}
                aria-label={`Redeem ${item.title}`}
              >
                Redeem
              </Button>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
