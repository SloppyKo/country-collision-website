import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewButton from "@/components/ReviewButton";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.countrycollisionhanford.com"),
  title: "Auto Body & Collision Repair in Hanford, CA | Country Collision",
  description:
    "Hanford's body shop for auto body, collision repair, and car painting. Owner-operated by Levi Herman. Call (559) 670-5889 for an estimate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground font-body antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ReviewButton />
        <Analytics />
      </body>
    </html>
  );
}
