import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
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
  themeColor: "#0c0806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
