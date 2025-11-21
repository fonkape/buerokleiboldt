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

// FAVICON V2: "The Brackets Only"
// Reduziert auf { }, fetter Strich (#002FA7), für perfekte Lesbarkeit in 16px.
const faviconBase64 = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzUgMjAgQyAyMCAyMCwgMjAgMjAsIDIwIDQwIEwgMjAgNTAgQyAyMCA2MCwgMTAgNjUsIDEwIDY1IEMgMTAgNjUsIDIwIDcwLCAyMCA4MCBMIDIwIDkwIEMgMjAgMTEwLCAzNSAxMTAsIDM1IDExMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAyRkE3IiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNjUgMjAgQyA4MCAyMCwgODAgMjAsIDgwIDQwIEwgODAgNTAgQyA4MCA2MCwgOTAgNjUsIDkwIDY1IEMgOTAgNjUsIDgwIDcwLCA4MCA4MCBMIDgwIDkwIEMgODAgMTEwLCA2NSAxMTAsIDY1IDExMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAyRkE3IiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=";

export const metadata: Metadata = {
  title: "Daniel Kleiboldt | Legal Engineer & KMU-Beratung",
  description: "Solutions Architect für AI & Blockchain. Schnittstelle zwischen Recht, IT und Business.",
  icons: {
    icon: faviconBase64,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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