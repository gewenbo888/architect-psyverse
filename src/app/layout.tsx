import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ArchProvider } from "@/lib/providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://architect.psyverse.fun"),
  title: "Civilization Architect — model, compare, design civilizations | 文明架构师",
  description:
    "Civilizations are systems composed of population, governance, economy, resources, military, information flow, and cultural norms. Compare ten historical civilizations on the same axes. Run a simulator. Read collapse triggers. Design futures.",
  keywords: [
    "civilization model",
    "civilization design",
    "civilization simulator",
    "rise and collapse of civilizations",
    "Tainter complexity",
    "comparative civilizations",
    "governance structure",
    "civilization architect",
    "文明模型",
    "文明设计",
    "文明模拟",
    "兴衰周期",
    "Psyverse",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Civilization Architect · 文明架构师" }],
    title: "Civilization Architect — civilizations are systems, not stories",
    description:
      "Treat civilization as a function of seven variables. Most history becomes legible.",
    url: "https://architect.psyverse.fun/",
    siteName: "Civilization Architect",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "Civilization Architect — civilizations are systems, not stories.",
    description: "Seven axes. Ten civilizations. One simulator.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0E0F12" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <ArchProvider>
          <Nav />
          {children}
          <Footer />
        </ArchProvider>
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
