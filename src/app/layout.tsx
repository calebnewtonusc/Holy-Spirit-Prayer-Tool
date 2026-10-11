import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import CosmicSky from "@/components/CosmicSky";
import "./globals.css";

// Christ Cosmic, Erik's booklet, sets its headings in Cormorant Garamond, so
// every heading on the site does too.
const cosmic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cosmic",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ask for the Fire | Holy Spirit Prayer Guide",
  description:
    "A voice guide, built from Erik Fish's teaching, that walks you through asking Jesus for the baptism of the Holy Spirit, including praying in tongues for the first time. Scripture first. No pressure.",
  openGraph: {
    title: "Ask for the Fire",
    description:
      "A calm voice guide through Luke 11:13: how much more will your Father give the Holy Spirit to those who ask.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cosmic.variable} ${body.variable}`}>
      <body className="font-sans">
        <CosmicSky />
        {children}
      </body>
    </html>
  );
}
