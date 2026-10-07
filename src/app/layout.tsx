import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/dm-mono/400.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { company } from "@/lib/content";
export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Dekoraj Group | Infrastructure for modern agriculture",
    template: "%s | Dekoraj Group",
  },
  description:
    "Farm construction, poultry systems, equipment and agricultural project development. Build your next operation with Dekoraj Group.",
  openGraph: {
    type: "website",
    siteName: company.name,
    title: company.name,
    description: company.tagline,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#07110b" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <MotionProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
