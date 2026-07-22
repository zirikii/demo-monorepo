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
    default: "Mobile, Internet & Entertainment | Optus",
    template: "%s | Optus",
  },
  description:
    "Say Yes to Optus. Mobile plans on the fast-growing Optus 5G network, nbn® and 5G Home Internet, the latest phones, prepaid and Optus Sport. (Unofficial demo)",
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
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
