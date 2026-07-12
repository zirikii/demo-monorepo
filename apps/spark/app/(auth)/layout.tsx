import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center">
          <Logo />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <footer className="border-t border-line bg-white py-6">
        <div className="container-page text-center text-xs text-ink-muted">
          <p>
            Unofficial Spark NZ demo. Any email and password will sign you in.{" "}
            <Link href="/" className="font-medium text-spark-purple hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
