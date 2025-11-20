#!/bin/bash

# 1. Dependencies installieren
echo "Installing dependencies..."
npm install clsx tailwind-merge

# 2. Ordnerstruktur sicherstellen
echo "Cleaning up..."
rm -rf app/page.tsx app/layout.tsx app/globals.css
mkdir -p components

# 3. Design-System Config (Tailwind) schreiben
echo "Writing Tailwind config..."
cat <<EOF > tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ikb: "#002FA7",
        bg: "#ffffff",
        text: "#000000",
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        mono: ["var(--font-jetbrains)"],
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
EOF

# 4. Globale Styles
echo "Writing globals.css..."
cat <<EOF > app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

@layer utilities {
  .swiss-border-b { @apply border-b-2 border-black; }
  .swiss-border-t { @apply border-t-2 border-black; }
  .swiss-border-r { @apply border-r-2 border-black; }
  .swiss-border-l { @apply border-l-2 border-black; }
  .swiss-border { @apply border-2 border-black; }

  .hover-ikb { @apply hover:bg-ikb hover:text-white transition-all duration-300; }
}

.venn-container { position: relative; height: 400px; width: 100%; display: flex; justify-content: center; align-items: center; }
.venn-circle {
  position: absolute; width: 280px; height: 280px; border-radius: 50%; border: 2px solid black;
  display: flex; justify-content: center; align-items: flex-start; padding-top: 2rem;
  font-family: var(--font-jetbrains); font-weight: bold; letter-spacing: 0.05em;
  background: rgba(255,255,255,0.5); transition: all 0.5s ease;
}
.venn-law { top: 0; left: 50%; transform: translateX(-85%); z-index: 1; }
.venn-tech { top: 0; left: 50%; transform: translateX(-15%); z-index: 1; }
.venn-biz { bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 2; align-items: flex-end; padding-bottom: 2rem; }
.venn-me {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -40%);
  width: 140px; height: 140px; background-color: #002FA7; border-radius: 50%;
  z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center;
  color: white; box-shadow: 0 0 30px rgba(0, 47, 167, 0.4); text-align: center;
}

details > summary { list-style: none; }
details > summary::-webkit-details-marker { display: none; }
EOF

# 5. NavBar Component
echo "Writing NavBar..."
cat <<EOF > components/NavBar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white z-50 swiss-border-b flex justify-between items-center px-6 md:px-12 h-24">
      <Link href="/" className="group">
        <div className="w-14 h-14 bg-ikb flex flex-col justify-end items-start p-1.5 hover:scale-105 transition-transform">
          <span className="text-white font-mono font-bold text-lg leading-none tracking-tighter">
            dk<span className="animate-blink">_</span>
          </span>
        </div>
      </Link>

      <div className="hidden md:flex gap-8 font-mono text-xs">
        {['Use Cases', 'Herausforderung', 'Lösung', 'Insights', 'Kontakt'].map((item) => (
          <Link
            key={item}
            href={\`#\${item.toLowerCase().replace(' ', '')}\`}
            className="hover:text-ikb hover:underline uppercase tracking-wide"
          >
            {item}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden font-mono text-xs uppercase font-bold p-4"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-white p-6 border-b-2 border-black flex flex-col gap-4 md:hidden shadow-xl">
           {['Use Cases', 'Herausforderung', 'Lösung', 'Insights', 'Kontakt'].map((item) => (
            <Link
              key={item}
              href={\`#\${item.toLowerCase().replace(' ', '')}\`}
              onClick={() => setIsOpen(false)}
              className="font-mono text-sm uppercase hover:text-ikb"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
EOF

# 6. Layout
echo "Writing Layout..."
cat <<EOF > app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      <body className={\`\${playfair.variable} \${jetbrains.variable} bg-white text-black font-serif antialiased\`}>
        {children}
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
EOF

# 7. Hauptseite
echo "Writing Page..."
cat <<EOF > app/page.tsx
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <header className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-8 border-l-4 border-ikb pl-4">
            /// Legal Engineer & Solutions Architect
          </p>

          <h1 className="text-5xl md:text-8xl leading-[0.95] font-serif mb-12">
            Ihr Unternehmen will<br />
            <span className="italic text-ikb">AI</span> oder <span className="italic text-ikb">Blockchain</span> nutzen?<br />
            <span className="text-4xl md:text-6xl mt-4 block">Ich übersetze zwischen Rechtsabteilung, IT und Management.</span>
          </h1>

          <div className="grid md:grid-cols-12 gap-12 border-t-2 border-black pt-12">
            <div className="md:col-span-8">
              <p className="font-mono text-lg md:text-xl leading-relaxed text-gray-800">
                Wenn Ihr Unternehmen AI oder Blockchain einsetzen will, prallen Welten aufeinander.
                Ich löse die &quot;Lost in Translation&quot;-Probleme.
                Für Innovation, die rechtssicher ist und Code, der Business-Ziele erfüllt.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
              <a href="#cases" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest hover:text-ikb transition">
                Zu den Use Cases
                <span className="text-2xl group-hover:translate-y-1 transition">↓</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="opportunity" className="py-24 px-6 md:px-12 bg-gray-50 swiss-border-t swiss-border-b">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl italic mb-12">Warum jetzt? <span className="not-italic text-black/40">Das Potential für KMUs.</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "fa-file-contract", title: "Smart Legal Contracts", text: "Automatisieren Sie Zahlungen und Lieferfreigaben. Verträge, die sich selbst ausführen." },
              { icon: "fa-robot", title: "AI Compliance", text: "Nutzen Sie LLMs für interne Prozesse, ohne Geschäftsgeheimnisse zu leaken oder DSGVO zu verletzen." },
              { icon: "fa-coins", title: "Asset Tokenization", text: "Machen Sie illiquide Firmenwerte handelbar und erschließen Sie neue Finanzierungswege." }
            ].map((item, i) => (
              <article key={i} className="bg-white p-8 swiss-border hover:shadow-[8px_8px_0_0_#002FA7] transition-shadow duration-300">
                <div className="text-ikb text-4xl mb-6"><i className={\`fas \${item.icon}\`}></i></div>
                <h3 className="font-mono font-bold text-lg mb-4 uppercase">{item.title}</h3>
                <p className="font-serif text-lg leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="challenge" className="swiss-border-b">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 swiss-border-r md:border-r-2 border-black flex flex-col justify-center bg-white">
            <h2 className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight">The Silo Trap.</h2>
            <p className="font-mono text-sm leading-relaxed mb-8 text-gray-600">
              Innovationsprojekte scheitern selten an der Technik. Sie scheitern an der Schnittstelle.
            </p>
            <ul className="space-y-6 font-serif text-xl">
              <li className="flex items-start"><span className="text-ikb font-mono mr-4">01.</span> Legal blockiert (&quot;Zu riskant&quot;).</li>
              <li className="flex items-start"><span className="text-ikb font-mono mr-4">02.</span> IT baut Features, die illegal sind.</li>
              <li className="flex items-start"><span className="text-ikb font-mono mr-4">03.</span> Business verfehlt den ROI.</li>
            </ul>
          </div>
          <div className="flex flex-col font-mono bg-gray-100">
             <div className="p-12 border-b-2 border-black flex-1 hover-ikb group cursor-default transition-colors flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 uppercase font-serif italic">Innovations-Stopp</h3>
                <p className="text-sm opacity-90">Das Projekt wird aus Angst vor MiCA oder AI Act beerdigt.</p>
             </div>
             <div className="p-12 flex-1 hover-ikb group cursor-default transition-colors flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 uppercase font-serif italic">Teurer Re-Write</h3>
                <p className="text-sm opacity-90">Code muss für 6-stellige Summen neu geschrieben werden.</p>
             </div>
          </div>
        </div>
      </section>

      <section id="lösung" className="py-24 px-6 bg-white overflow-hidden border-b-2 border-black">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl italic mb-4">Die Lösung: Symbiose</h2>
          <p className="font-mono text-sm uppercase tracking-widest">Ich löse die Silos auf.</p>
        </div>
        <div className="venn-container scale-75 md:scale-100">
          <div className="venn-circle venn-law">LAW</div>
          <div className="venn-circle venn-tech">TECH</div>
          <div className="venn-circle venn-biz">BUSINESS</div>
          <div className="venn-me">
            <span className="font-serif text-3xl italic">Me</span>
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Architect</span>
          </div>
        </div>
      </section>

      <section id="services" className="swiss-border-b bg-white">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-black">
          <div className="p-12 hover:bg-gray-50 transition duration-300 flex flex-col h-full">
            <div className="font-mono text-xs mb-8 border border-black inline-block px-3 py-1 self-start">AUDIT</div>
            <h3 className="font-serif text-3xl italic mb-4">Feasibility Check</h3>
            <p className="font-mono text-sm leading-relaxed text-gray-600 mb-8 flex-grow">Ein 48h Review Ihrer Idee. Ist sie rechtlich machbar?</p>
          </div>

          <div className="p-12 bg-ikb text-white relative flex flex-col h-full">
             <div className="font-mono text-xs mb-8 border border-white inline-block px-3 py-1 self-start">ARCHITECTURE</div>
             <h3 className="font-serif text-3xl italic mb-4">Legal Engineering</h3>
             <p className="font-mono text-sm leading-relaxed opacity-90 mb-8 flex-grow">Ich schreibe User Stories für Compliance und Specs für Entwickler.</p>
          </div>

          <div className="p-12 hover:bg-gray-50 transition duration-300 flex flex-col h-full">
             <div className="font-mono text-xs mb-8 border border-black inline-block px-3 py-1 self-start">WORKSHOP</div>
             <h3 className="font-serif text-3xl italic mb-4">The Bridge</h3>
             <p className="font-mono text-sm leading-relaxed text-gray-600 mb-8 flex-grow">Ich bringe Juristen und Entwickler zusammen.</p>
          </div>
        </div>
      </section>

      <footer id="kontakt" className="bg-black text-white py-24 px-6 md:px-12 border-t-8 border-ikb">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4 text-ikb">/// Let&apos;s start</p>
            <h2 className="font-serif text-5xl md:text-7xl italic mb-8">Genug Theorie.</h2>

            <form className="space-y-4 max-w-md">
              <input type="text" placeholder="Ihr Name" required className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb" />
              <input type="email" placeholder="Ihre E-Mail" required className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb" />
              <textarea rows={4} placeholder="Worum geht es?" required className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb"></textarea>
              <button type="button" className="w-full bg-ikb text-white font-mono font-bold text-lg px-10 py-4 hover:bg-white hover:text-ikb transition duration-300 border-2 border-transparent hover:border-ikb flex items-center justify-center gap-4">
                Nachricht senden
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-end md:items-end font-mono text-sm text-gray-500">
             <p>&copy; 2025 Daniel Kleiboldt. Münster.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
EOF

echo "✅ SUCCESS: Site regenerated."