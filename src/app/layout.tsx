import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Holy Spirit Guided Prayer Tool",
  description:
    "A scripture-rooted guided prayer experience for Christians who want calm, biblical help seeking the gifts of the Holy Spirit, including tongues. No pressure. No hype. Just a guided path.",
  openGraph: {
    title: "Holy Spirit Guided Prayer Tool",
    description:
      "Seek the gifts of the Holy Spirit with peace, scripture, and guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}  <Analytics />
</body>
    </html>
  );
}
