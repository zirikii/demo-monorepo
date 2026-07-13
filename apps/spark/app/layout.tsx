import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Broadband and Mobile Phone Services | Spark NZ",
    template: "%s | Spark NZ",
  },
  description:
    "Travelling to New Zealand? Stay connected. Discover broadband plans, mobile phones, mobile plans & accessories with Spark NZ. (Unofficial demo)",
  icons: {
    icon: "/brand/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body className={`${nunito.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
