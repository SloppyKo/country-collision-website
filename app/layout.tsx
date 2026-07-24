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
  title: "Country Collision — Collision Repair, Custom Paint & Auto Restoration in Hanford, CA",
  description: "Collision Repair, Custom Paint, and Auto Restoration in Hanford California.",
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
