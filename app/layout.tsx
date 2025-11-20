import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ModeProvider } from "@/context/ModeContext";
import SmoothScroll from "@/components/SmoothScroll";

// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ['400', '600', '700'],
    variable: "--font-ibm-plex-mono",
    display: "swap",
});


export const metadata: Metadata = {
  title: "Daniel Kleiboldt | Legal Engineer & KMU-Beratung",
  description: "Solutions Architect für AI & Blockchain. Schnittstelle zwischen Recht, IT und Business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SVG Favicon Definition (für das Browser-Tab)
  const faviconSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="48" style="font-family:'IBM Plex Mono'" font-weight="700" font-size="38" text-anchor="middle" fill="#002FA7" dominant-baseline="central">DK</text><path d="M28 22 C 18 22, 18 22, 18 35 L 18 42 C 18 48, 12 50, 12 50 C 12 50, 18 52, 18 58 L 18 65 C 18 78, 18 78, 28 78" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke="#002FA7"/><path d="M72 22 C 82 22, 82 22, 82 35 L 82 42 C 82 48, 88 50, 88 50 C 88 50, 82 52, 82 58 L 82 65 C 82 78, 82 78, 72 78" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke="#002FA7"/></svg>`;

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* FAVICON IMPLEMENTIERUNG */}
        <link rel="icon" type="image/svg+xml" href={`data:image/svg+xml;utf8,${encodeURIComponent(faviconSvg)}`} />
      </head>
      <body className={`${playfair.variable} ${jetbrains.variable} ${ibmPlexMono.variable} bg-white dark:bg-slate-900 dark:text-gray-100 text-black font-serif antialiased transition-colors duration-500`}>
        <ModeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ModeProvider>

        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Daniel Kleiboldt",
                "jobTitle": "Solutions Architect & Legal Engineer",
                "url": "https://dkleiboldt.de"
              }
            ]
          })
        }} />
      </body>
    </html>
  );
}