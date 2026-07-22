import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Optus Business Hub Demo",
  description: "Unofficial Optus Enterprise and Business self-service UI demo.",
  icons: { icon: "/brand/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
