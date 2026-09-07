import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/common/Toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mapsandpermits.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maps & Permits | Plans Approved. Projects Moving.",
    template: "%s | Maps & Permits",
  },
  description:
    "Professional drawings, permit applications, municipal approvals, and construction solutions across the GTA. Permit drawings submitted in 24 hours.",
  keywords: [
    "permit drawings",
    "building permits GTA",
    "architectural drawings Brampton",
    "municipal approvals",
    "site plans Toronto",
  ],
  openGraph: {
    title: "Maps & Permits | Plans Approved. Projects Moving.",
    description:
      "Professional drawings, permit applications, municipal approvals, and construction solutions across the GTA.",
    url: siteUrl,
    siteName: "Maps & Permits",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Maps & Permits",
    description:
      "Architecture, Engineering, Permit Drawings, Municipal Approvals, and Construction services across the Greater Toronto Area.",
    image: `${siteUrl}/images/placeholder.jpg`,
    telephone: "+1-437-777-6887",
    email: "maps.permit@gmail.com",
    areaServed: [
      "Brampton",
      "Mississauga",
      "Toronto",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Caledon",
      "Oakville",
      "Milton",
      "Burlington",
      "Etobicoke",
      "Scarborough",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brampton",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
