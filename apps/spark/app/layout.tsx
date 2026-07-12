import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Spark";

export const metadata: Metadata = {
  title: {
    default: `${appName} NZ — Mobile, Broadband & Travel (demo)`,
    template: `%s | ${appName} NZ`,
  },
  description:
    "Unofficial Spark New Zealand-style demo. Shop mobile and broadband plans, sort roaming before you travel, and manage your account in My Spark.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/icon.svg", type: "image/svg+xml" },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: "#5F259F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={inter.variable}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
