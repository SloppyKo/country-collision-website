import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewButton from "@/components/ReviewButton";
import { EMAIL_DISPLAY, PHONE_HREF } from "@/lib/contact";
import "./globals.css";

const SITE_URL = "https://www.countrycollisionhanford.com";

// Structured data so search engines know what the business is and where it operates.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  "@id": `${SITE_URL}/#business`,
  name: "Country Collision",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo_final.png`,
  image: `${SITE_URL}/images/white%20truck%20body%20work.png`,
  description:
    "Hanford's body shop for auto body, collision repair, car painting, paint matching, and restorations across Kings County.",
  telephone: PHONE_HREF.replace("tel:", ""),
  email: EMAIL_DISPLAY,
  foundingDate: "2020",
  founder: { "@type": "Person", name: "Levi Herman" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanford",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Hanford, CA" },
    { "@type": "AdministrativeArea", name: "Kings County, CA" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  hasMap: "https://maps.app.goo.gl/rfbPrN8Ba4GZ4wC79",
  sameAs: [
    "https://maps.app.goo.gl/rfbPrN8Ba4GZ4wC79",
    "https://www.instagram.com/country_collision/",
    "https://www.yelp.com/biz/country-collision-hanford-2",
  ],
};

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ReviewButton />
        <Analytics />
      </body>
    </html>
  );
}
