import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mobile, nbn & 5G Home Internet | Optus",
    template: "%s | Optus",
  },
  description:
    "Explore Optus mobile plans, the latest phones, nbn and 5G Home Internet, and entertainment like Optus Sport. Manage your account with My Optus. (Unofficial demo)",
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
