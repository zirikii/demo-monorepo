import { QrCode, Volume2, CreditCard, Globe, Megaphone } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Stat } from "../components/ui/Stat";
import { Button } from "../components/ui/Button";
import { SuccessModal } from "../components/shared/SuccessModal";
import { useDisclosure } from "../hooks/useDisclosure";
import { businessProducts } from "../data/finance";
import { useState } from "react";

const productIcons: Record<string, typeof QrCode> = {
  qr: QrCode,
  soundbox: Volume2,
  pos: CreditCard,
  gateway: Globe,
};

const infoSections = [
  {
    heading: "Built for every counter in India",
    paragraphs: [
      "From a tea stall's first QR to an enterprise checkout processing lakhs of orders, the same platform handles acceptance, settlements, and reconciliation. Voice-confirmation devices remove the 'did it go through?' pause, and the business app turns daily collections into a ledger your accountant will love.",
      "Requests submitted on this page are simulated — the demo does not onboard real merchants.",
    ],
  },
];

export function BusinessPage() {
  useDocumentTitle("Paytm for Business — Accept Payments");
  const [pickedProduct, setPickedProduct] = useState(businessProducts[0].name);
  const success = useDisclosure();

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Accept payments <span className="text-paytm-cyan">online &amp; offline</span>
          </>
        }
        subtitle="QR, Soundbox, card machines, and gateway APIs — everything a business needs to get paid, with settlements that keep cash flow moving."
      />

      <section aria-label="Merchant stats" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-card p-8 shadow-card sm:grid-cols-4">
          <Stat value="4 Cr+" label="merchants onboard" />
          <Stat value="0%" label="fee on UPI QR" />
          <Stat value="11" label="languages on Soundbox" />
          <Stat value="T+0" label="same-day settlement option" />
        </div>
      </section>

      <section aria-label="Business products" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {businessProducts.map((product) => {
            const Icon = productIcons[product.id] ?? QrCode;
            return (
              <article
                key={product.id}
                id={product.anchor}
                className="flex flex-col rounded-2xl bg-card p-7 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paytm-sky">
                  <Icon aria-hidden="true" className="h-6 w-6 text-paytm-navy" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-ink">{product.name}</h2>
                <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {product.bullets.map((b) => (
                    <li key={b} className="text-xs text-ink-soft">
                      • {b}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 self-start"
                  onClick={() => {
                    setPickedProduct(product.name);
                    success.open();
                  }}
                >
                  Get {product.name}
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="advertise"
        aria-label="Advertise"
        className="mx-auto max-w-7xl px-4 pb-4 sm:px-6"
      >
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-gradient-to-r from-paytm-navy-deep to-paytm-navy-mid p-8 text-white shadow-card sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Megaphone aria-hidden="true" className="h-8 w-8 text-paytm-cyan" />
            <div>
              <h2 className="text-lg font-bold">Advertise on the platform</h2>
              <p className="mt-1 text-sm text-white/80">
                Put your brand in front of millions of daily payers with native placements.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setPickedProduct("Advertising");
              success.open();
            }}
          >
            Talk to Sales
          </Button>
        </div>
      </section>

      <SeoTextBlock sections={infoSections} />

      <SuccessModal
        open={success.isOpen}
        onClose={success.close}
        title="Request Received"
        lines={[
          { label: "Product", value: pickedProduct },
          { label: "Status", value: "Callback scheduled (simulated)" },
          { label: "Note", value: "Demo — no real onboarding" },
        ]}
      />
    </PageLayout>
  );
}
