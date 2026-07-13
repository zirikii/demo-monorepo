import type { Metadata } from "next";

export const metadata: Metadata = { title: "Parent Hub" };

export default function ParentHubPage() {
  return (
    <div className="container grid items-center gap-10 py-14 md:grid-cols-2">
      <img
        src="/brand/photos/parent-hub.jpg"
        alt="Young person with a phone"
        className="w-full rounded-lg object-cover"
      />
      <div>
        <h1 className="text-4xl font-bold text-spark-ink">Parent Hub</h1>
        <p className="mt-5 text-base leading-relaxed text-spark-ink/80">
          Raising kids in today&apos;s digital world comes with big questions and unique challenges.
          We&apos;ve created a space grounded in psychology, real-life parenting and expert guidance,
          so you can feel confident as you support your child&apos;s digital journey.
        </p>
      </div>
    </div>
  );
}
