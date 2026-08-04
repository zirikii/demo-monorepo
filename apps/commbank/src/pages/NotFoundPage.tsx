import { PublicLayout } from "@/components/layout/PublicLayout";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundPage() {
  return (
    <PublicLayout>
      <section className="container-page py-24 text-center">
        <p className="text-sm font-semibold text-cba-positive">404</p>
        <h1 className="mt-3 text-4xl font-bold">We couldn’t find that page</h1>
        <p className="mt-4 text-cba-ink-soft">Check the address or return to the demo homepage.</p>
        <ButtonLink className="mt-7" to="/">Go home</ButtonLink>
      </section>
    </PublicLayout>
  );
}
