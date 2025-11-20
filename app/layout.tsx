import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ModeProvider } from "@/context/ModeContext";
import SmoothScroll from "@/components/SmoothScroll"; // <--- Importiert

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

export const metadata: Metadata = {
  title: "Daniel Kleiboldt | Legal Engineer & KMU-Beratung",
  description: "Solutions Architect für AI & Blockchain. Schnittstelle zwischen Recht, IT und Business.",
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
      <body className={`${playfair.variable} ${jetbrains.variable} bg-white dark:bg-slate-900 dark:text-gray-100 text-black font-serif antialiased transition-colors duration-500`}>
        <ModeProvider>
          {/* Hier wird der Scroll-Effekt aktiviert */}
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