import { AddressCheckForm } from "@/components/marketing/address-check-form";

export function CoverageTeaser() {
  return (
    <section className="container py-16">
      <div className="grid items-center gap-10 rounded-lg border border-line bg-white p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-3xl font-extrabold text-optus-ink">Check your coverage</h2>
          <p className="mt-3 text-optus-ink/70">
            Optus 5G is available to millions of Australians and growing. Enter your address to see
            mobile and home internet options available where you live.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-optus-ink/70">
            <li>· nbn® and 5G Home Internet availability</li>
            <li>· Indoor and outdoor 5G coverage</li>
            <li>· Typical evening speeds for your area</li>
          </ul>
        </div>
        <AddressCheckForm />
      </div>
    </section>
  );
}
