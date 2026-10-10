import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://ferrox-portfolio-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FERROX | Herramientas y Suministros Profesionales",
  description:
    "Descubrí herramientas, suministros y soluciones para profesionales, talleres y proyectos de construcción.",
  keywords: [
    "ferretería",
    "herramientas profesionales",
    "suministros industriales",
    "FERROX",
  ],
  openGraph: {
    title: "FERROX | Herramientas y Suministros Profesionales",
    description:
      "Descubrí herramientas, suministros y soluciones para profesionales, talleres y proyectos de construcción.",
    url: SITE_URL,
    siteName: "FERROX",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FERROX | Herramientas y Suministros Profesionales",
    description:
      "Descubrí herramientas, suministros y soluciones para profesionales, talleres y proyectos de construcción.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-warm-white">
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
