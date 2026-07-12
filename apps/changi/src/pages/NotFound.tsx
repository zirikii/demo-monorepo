import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundPage() {
  return <PageLayout><section className="mx-auto max-w-3xl px-4 py-24 text-center"><h1 className="text-5xl font-black">Page not found</h1><p className="mt-4 text-[#665448]">The demo route you requested is not available.</p><ButtonLink to="/" className="mt-8">Return home</ButtonLink></section></PageLayout>;
}
