import type { Metadata } from "next";

export const metadata: Metadata = { title: "Spark Foundation" };

export default function FoundationPage() {
  return (
    <div className="container grid items-center gap-10 py-14 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold text-spark-ink">Spark Foundation</h1>
        <p className="mt-5 text-base leading-relaxed text-spark-ink/80">
          Spark Foundation is our charitable organisation with a mission to accelerate towards Digital
          Equity. We provide funding, advocacy and other resources to rangatahi Māori and other youth
          who are disproportionally impacted by inequity.
        </p>
      </div>
      <img
        src="/brand/photos/foundation.jpg"
        alt="Person working from home"
        className="w-full rounded-lg object-cover"
      />
    </div>
  );
}
