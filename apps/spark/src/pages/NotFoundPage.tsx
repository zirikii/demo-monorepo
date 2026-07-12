import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="spark-container grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-spark-purple">404</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">Page not found</h1>
          <p className="mt-4 text-ink-soft">
            This demo focuses on Spark's NZ Travel Packs promotional page.
          </p>
          <Link
            to="/online/shop/promotions/travel-and-move"
            className="spark-focus mt-8 inline-flex rounded-full bg-spark-purple px-6 py-3 text-sm font-black text-white"
          >
            Open Travel Packs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
