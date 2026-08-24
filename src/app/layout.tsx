import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond, Cantarell } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyConsultBar } from "@/components/experience/StickyConsultBar";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./premium.css";
import "./ba-gallery.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cantarell = Cantarell({
  variable: "--font-cantarell",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Tampa Bay Body Sculpting | Cosmetic Surgery, Lipo 360 & Tummy Tuck",
    template: "%s | Tampa Bay Body Sculpting",
  },
  description:
    "Lipo 360, Tummy Tuck, Breast Procedures, Arm and Thigh Liposuction, and Male Body Sculpting.",
  metadataBase: new URL("https://tampabaybodysculpting.com"),
  openGraph: {
    siteName: siteConfig.brand,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#65ebc9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`experience-premium ${dmSans.variable} ${cormorant.variable} ${cantarell.variable} antialiased`}
      >
        <Header premium />
        <main>{children}</main>
        <Footer />
        <StickyConsultBar />
      </body>
    </html>
  );
}
