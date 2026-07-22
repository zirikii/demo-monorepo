import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Optus Australia mobile, internet and entertainment demo",
    template: "%s | Optus Australia demo",
  },
  description:
    "Unofficial Optus Australia telco demo for mobile plans, home internet, phones, entertainment and My Optus self-service.",
  icons: {
    icon: "/brand/logo-mark.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className={`${montserrat.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
