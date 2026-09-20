import { Apple, Play, QrCode } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function DownloadApp() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gojek px-8 py-12 text-white sm:px-14 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                One app for everything you need
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/85">
                Download Gojek and get rides, food, groceries, payments and more — all in one
                place, wherever you are.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
                >
                  <Apple aria-hidden="true" className="h-5 w-5" />
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Play aria-hidden="true" className="h-5 w-5" />
                  Google Play
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-6 backdrop-blur">
                <QrCode aria-hidden="true" className="h-28 w-28" />
                <p className="text-sm font-semibold text-white/90">Scan to download</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
