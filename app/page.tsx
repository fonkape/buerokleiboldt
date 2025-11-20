'use client';
import { useState } from 'react';
import NavBar from "@/components/NavBar";
// import { useMode } from "@/context/ModeContext"; // TEMPORÄR ENTFERNT
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ServiceAccordion from "@/components/ServiceAccordion";
import UseCaseGrid from "@/components/UseCaseGrid";
import TechStack from "@/components/TechStack";
import { motion } from "framer-motion";

// HINWEIS: Da der ModeToggle entfernt wurde, simulieren wir den Zustand hier statisch.
const useMode = () => ({ isCodeMode: false });

// Definition der Silo Traps inkl. Zitate
// ANGEPASSTE POSITIONEN: Näher am Text, damit sie nicht rausfliegen
const siloTraps = [
  { id: 1, text: "01. Legal blockiert.", quote: "ZU RISIKANT", left: '4rem' },
  { id: 2, text: "02. Code ohne Compliance.", quote: "ABMAHNUNG GARANTIERT", left: '6rem' },
  { id: 3, text: "03. Strategie ohne Return.", quote: "BUDGET VERBRANNT", left: '6rem' },
];

// KOMPONENTE: Silo Trap Item mit Hover-Animation
const SiloTrapItem = ({ text, quote, left }: { text: string; quote: string; left: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isCodeMode } = useMode();

    const quoteColor = isCodeMode ? "text-green-500/40" : "text-ikb/40"; // Etwas transparenter (/40) für besseren Layering-Effekt
    const primaryColor = isCodeMode ? "text-green-400" : "text-ikb";

    return (
        <motion.li
            className="flex flex-col items-start relative cursor-default py-2" // Etwas vertikales Padding
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hauptstatement */}
            <span className={`${primaryColor} font-mono text-xl mr-4 z-10 transition-colors relative`}>{text}</span>

            {/* Zitat: Animation von unten */}
            <motion.span
                // SCHRIFTGRÖSSE REDUZIERT: von text-5xl auf text-3xl md:text-4xl
                className={`font-serif italic text-3xl md:text-4xl absolute z-0 whitespace-nowrap tracking-wide pointer-events-none ${quoteColor}`}
                style={{ left: left, top: '-5px' }} // Leicht nach oben korrigiert für bessere Überlappung
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: isHovered ? 0 : 20,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {quote}
            </motion.span>
        </motion.li>
    );
};

export default function Home() {
  const { isCodeMode } = useMode();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-gray-100 selection:bg-ikb dark:selection:bg-green-500 dark:selection:text-black transition-colors duration-500">
      <NavBar />

      {/* 1. HERO */}
      <header className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-10 transition-opacity duration-1000 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-8 border-l-4 border-ikb dark:border-green-500 pl-4 transition-colors">
              /// Legal Engineer & Solutions Architect
            </p>
          </Reveal>

          <h1 className="text-5xl md:text-8xl leading-[0.95] font-serif dark:font-mono mb-12 transition-all duration-500">
            <Reveal>
              Ihr Unternehmen will
            </Reveal>
            <Reveal delay={0.4}>
              <span className={`italic text-ikb dark:text-green-400 transition-colors ${isCodeMode ? 'not-italic' : ''}`}>AI</span> oder <span className={`italic text-ikb dark:text-green-400 transition-colors ${isCodeMode ? 'not-italic' : ''}`}>Blockchain</span> nutzen?
            </Reveal>
            <div className="mt-4"></div>
            <Reveal delay={0.6}>
              <span className="text-4xl md:text-6xl block opacity-80">
                 Ich übersetze zwischen Rechtsabteilung, IT und Management.
              </span>
            </Reveal>
          </h1>

          <div className="grid md:grid-cols-12 gap-12 border-t-2 border-black dark:border-green-500/30 pt-12 transition-colors duration-500">
            <div className="md:col-span-8">
              <Reveal delay={0.8}>
                <p className="font-mono text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-300">
                  Wenn Ihr Unternehmen AI oder Blockchain einsetzen will, prallen Welten aufeinander.
                  Ich löse die &quot;Lost in Translation&quot;-Probleme.
                  Für Innovation, die rechtssicher ist und Code, der Business-Ziele erfüllt.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
               <Reveal delay={1}>
                  <a href="#cases" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest hover:text-ikb dark:hover:text-green-400 transition-colors">
                    Zu den Use Cases
                    <span className="text-2xl group-hover:translate-y-1 transition">↓</span>
                  </a>
               </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THE OPPORTUNITY */}
      <section id="opportunity" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/50 border-y-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif dark:font-mono text-4xl italic dark:not-italic mb-12">
            Warum jetzt? <span className="not-italic text-black/40 dark:text-green-500/50">Das Potential für KMUs.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "fa-file-contract", title: "Smart Legal Contracts", text: "Automatisieren Sie Zahlungen und Lieferfreigaben. Verträge, die sich selbst ausführen – ohne manuellen Eingriff." },
              { icon: "fa-robot", title: "AI Compliance", text: "Nutzen Sie LLMs für interne Prozesse, ohne Geschäftsgeheimnisse zu leaken oder gegen die DSGVO zu verstoßen." },
              { icon: "fa-coins", title: "Asset Tokenization", text: "Machen Sie illiquide Firmenwerte (Maschinen, Immobilien) handelbar und erschließen Sie neue Finanzierungswege." }
            ].map((item, i) => (
              <article key={i} className="bg-white dark:bg-slate-900 p-8 border-2 border-black dark:border-green-500/30 hover:shadow-[8px_8px_0_0_#002FA7] dark:hover:shadow-[8px_8px_0_0_#22c55e] dark:hover:border-green-400 transition-all duration-300">
                <div className="text-ikb dark:text-green-400 text-4xl mb-6"><i className={`fas ${item.icon}`}></i></div>
                <h3 className="font-mono font-bold text-lg mb-4 uppercase dark:text-green-100">{item.title}</h3>
                <p className="font-serif dark:font-mono text-lg leading-relaxed text-gray-600 dark:text-gray-400">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="font-mono text-sm uppercase tracking-widest mb-4 text-ikb dark:text-green-400">Aber hier liegt das Problem:</p>
            <p className="font-serif dark:font-mono text-2xl md:text-3xl italic dark:not-italic max-w-3xl mx-auto">
              &quot;Die Technik ist bereit. Aber Ihre Abteilungen sprechen nicht dieselbe Sprache.&quot;
            </p>
            <div className="h-12 w-[2px] bg-black dark:bg-green-500 mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* 3. THE CHALLENGE (SILO TRAPS) */}
      <section id="challenge" className="border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="grid md:grid-cols-2">
          {/* LINKE SPALTE: TRAPS (Mit overflow-hidden FIX) */}
          <div className="p-12 md:p-24 border-r-2 border-black dark:border-green-500/30 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors overflow-hidden">
            <h2 className="text-5xl md:text-6xl font-serif dark:font-mono italic dark:not-italic mb-8 leading-tight">
              The Silo Trap.
            </h2>
            <p className="font-mono text-sm leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
              Innovationsprojekte scheitern selten an der Technik. Sie scheitern an der Schnittstelle.
            </p>

            {/* TRAPS MIT HOVER ANIMATION */}
            <ul className="space-y-12 font-mono text-xl">
              {siloTraps.map(trap => (
                <SiloTrapItem
                  key={trap.id}
                  text={trap.text}
                  quote={trap.quote}
                  left={trap.left}
                />
              ))}
            </ul>
          </div>

          {/* RECHTE SPALTE: KONSEQUENZEN */}
          <div className="flex flex-col font-mono bg-gray-100 dark:bg-slate-950 transition-colors">
            <div className="p-12 border-b-2 border-black dark:border-green-500/30 flex-1 hover:bg-white dark:hover:bg-slate-900 group cursor-default transition-colors flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs border border-black dark:border-green-500 px-2 py-1 bg-white dark:bg-slate-900 dark:text-green-400 transition-colors">RESULTAT A</span>
                <i className="fas fa-ban text-3xl text-red-500 dark:text-red-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase font-serif dark:font-mono italic dark:not-italic">Innovations-Stopp</h3>
              <p className="text-sm opacity-90 leading-relaxed dark:text-gray-400">
                Das Projekt wird aus Angst vor MiCA, AI Act oder DSGVO beerdigt, bevor es startet.
              </p>
            </div>

            <div className="p-12 flex-1 hover:bg-white dark:hover:bg-slate-900 group cursor-default transition-colors flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs border border-black dark:border-green-500 px-2 py-1 bg-white dark:bg-slate-900 dark:text-green-400 transition-colors">RESULTAT B</span>
                <i className="fas fa-bug text-3xl text-orange-500 dark:text-orange-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase font-serif dark:font-mono italic dark:not-italic">Teurer Re-Write</h3>
              <p className="text-sm opacity-90 leading-relaxed dark:text-gray-400">
                Die Software ist fertig, darf aber so nicht live gehen. Code muss für 6-stellige Summen neu geschrieben werden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SOLUTION (VENN DIAGRAM) */}
      <section id="solution" className="py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif dark:font-mono text-4xl italic dark:not-italic mb-4">Die Lösung: Symbiose</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-ikb dark:text-green-400">Ich löse die Silos auf.</p>
        </div>

        <div className="venn-container scale-75 md:scale-100 dark:opacity-90">
          {/* ÄUSSERE KREISE (STATISCH, statischer Anker) */}
          <div className="venn-circle venn-law dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">
            LAW
          </div>
          <div className="venn-circle venn-tech dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">
            TECH
          </div>
          <div className="venn-circle venn-biz dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">
            BUSINESS
          </div>

          {/* ZENTRUM: LOGO (Pulsierend) */}
          <div className="venn-me dark:bg-green-600 dark:shadow-[0_0_30px_rgba(34,197,94,0.4)]">

            {/* Pulsierender Hintergrund-Effekt */}
            <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                // Transparenter Rand für den "atmenden" Effekt
                style={{
                    backgroundColor: 'rgba(0, 47, 167, 0.1)', // Soft IKB Blau
                    boxShadow: '0 0 10px rgba(0, 47, 167, 0.4)',
                    opacity: 0.8
                }}
                // Dark Mode Anpassung via className überschreibt style im Dark Mode
                className={`absolute inset-0 rounded-full ${isCodeMode ? 'bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-ikb/10 shadow-[0_0_10px_rgba(0,47,167,0.4)]'}`}
            />

            {/* Logo SVG (Bleibt statisch und farbig) */}
             <svg viewBox="0 0 100 100" className='w-12 h-12 relative z-10'>
                <text x="50" y="48" style={{fontFamily: 'IBM Plex Mono, monospace'}} fontWeight="700" fontSize="38" textAnchor="middle" fill="white" dominantBaseline="central">DK</text>
                <path d="M28 22 C 18 22, 18 22, 18 35 L 18 42 C 18 48, 12 50, 12 50 C 12 50, 18 52, 18 58 L 18 65 C 18 78, 18 78, 28 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
                <path d="M72 22 C 82 22, 82 22, 82 35 L 82 42 C 82 48, 88 50, 88 50 C 88 50, 82 52, 82 58 L 82 65 C 82 78, 82 78, 72 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
            </svg>
          </div>
        </div>
      </section>

      {/* 5. USE CASES (INTERACTIVE GRID) */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/50 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-ikb dark:text-green-400">/// Echte Szenarien</h2>
          <UseCaseGrid />
        </div>
      </section>

      {/* 7. SERVICES (HORIZONTAL ACCORDION) */}
      <section id="services" className="py-12 md:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 border-l-4 border-ikb dark:border-green-500 pl-4">
                /// MEINE KERNDIENSTLEISTUNGEN
            </p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-6xl italic dark:not-italic leading-tight">
                Das Architekten-Toolkit.
            </h2>
        </div>
        <ServiceAccordion />
      </section>

      {/* 8. PROFILE */}
      <section id="profile" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/30 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <p className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-ikb dark:text-green-400">/// About Me</p>
              <h2 className="font-serif dark:font-mono text-4xl md:text-5xl italic dark:not-italic mb-8 leading-tight">
                &quot;Kein Anwalt.<br/>Kein reiner Coder.<br/>Der Übersetzer.&quot;
              </h2>
              <div className="space-y-6 font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300 border-l-2 border-black dark:border-green-500 pl-6">
                <p>
                  Diplom-Jurist (41). 10 Jahre Corporate Law. Jetzt Software Engineer.
                </p>
                <p>
                  Ich verstehe den Code <strong>und</strong> das Gesetzbuch. Ich bin Ihr Solutions Architect für die grauen Zonen der Digitalisierung.
                </p>
              </div>
              <div className="flex gap-4 mt-8 font-mono text-xs uppercase tracking-widest">
                <span className="bg-black dark:bg-green-500 text-white dark:text-black px-3 py-1">Diplom-Jurist</span>
                <span className="bg-ikb dark:bg-slate-700 text-white dark:text-green-400 px-3 py-1">AI Engineer</span>
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="relative p-2 border-2 border-black dark:border-green-500 bg-white dark:bg-slate-900 shadow-[12px_12px_0_0_#002FA7] dark:shadow-[12px_12px_0_0_#22c55e] transition-all">
                <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    src="/me.jpg"
                    alt="Daniel Kleiboldt"
                    className="w-full h-full object-cover filter grayscale dark:grayscale-0 dark:sepia-[.2] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-green-500/10 opacity-0 dark:opacity-100 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TECH STACK */}
      <TechStack />

      {/* 9. CONTACT / FOOTER */}
      <footer id="contact" className="bg-black dark:bg-slate-950 text-white py-24 px-6 md:px-12 border-t-8 border-ikb dark:border-green-500 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4 text-ikb dark:text-green-400">/// Let&apos;s start</p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-7xl italic dark:not-italic mb-8">Genug Theorie.</h2>

            <ContactForm />

          </div>

          <div className="flex flex-col justify-end items-start md:items-end font-mono text-sm text-gray-500">
            {/* SOCIAL LINKS */}
            <div className="flex gap-6 mb-8">
                {/* GitHub */}
                <a href="https://github.com/fonkape" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>

                {/* X (Twitter) */}
                <a href="https://x.com/danielkleiboldt" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-colors" aria-label="X">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/daniel-kleiboldt-306a75123/" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
            </div>

            <p className="text-right mb-2">
              &copy; 2025 Daniel Kleiboldt.<br/>
              Gütersloh.
            </p>

            {/* Tech Stack Credit */}
            <p className="text-right text-xs opacity-50 hover:opacity-100 transition-opacity">
                Engineered with <span className="text-ikb dark:text-green-400">Next.js</span> & <span className="text-ikb dark:text-green-400">Tailwind</span>.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}