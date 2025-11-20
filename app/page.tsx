'use client';
import { useState } from 'react';
import NavBar from "@/components/NavBar";
// import { useMode } from "@/context/ModeContext"; // TEMPORÄR ENTFERNT FÜR SINGLE MODE
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ServiceAccordion from "@/components/ServiceAccordion";
import UseCaseGrid from "@/components/UseCaseGrid";
import { motion } from "framer-motion";

// HINWEIS: Da der ModeToggle entfernt wurde, simulieren wir den Zustand hier statisch als 'false' (Legal Mode).
// Das verhindert Fehler, falls Komponenten useMode erwarten, und hält den Code sauber für spätere Reaktivierung.
const useMode = () => ({ isCodeMode: false });

// Definition der Silo Traps inkl. Zitate
const siloTraps = [
  { id: 1, text: "01. Legal blockiert.", quote: "ZU RISIKANT", left: '12rem' },
  { id: 2, text: "02. Code ohne Compliance.", quote: "ABMAHNUNG GARANTIERT", left: '16rem' },
  { id: 3, text: "03. Strategie ohne Return.", quote: "BUDGET VERBRANNT", left: '17rem' },
];

// KOMPONENTE: Silo Trap Item mit Hover-Animation
const SiloTrapItem = ({ text, quote, left }: { text: string; quote: string; left: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isCodeMode } = useMode();

    const quoteColor = isCodeMode ? "text-green-500/40" : "text-ikb/50";
    const primaryColor = isCodeMode ? "text-green-400" : "text-ikb";

    return (
        <motion.li
            className="flex flex-col items-start relative cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hauptstatement: Z-Index 10, immer lesbar */}
            <span className={`${primaryColor} font-mono text-xl mr-4 z-10 transition-colors`}>{text}</span>

            {/* Zitat: Animation mit framer-motion (von unten aufsteigend) */}
            <motion.span
                className={`font-serif italic text-5xl absolute z-0 whitespace-nowrap tracking-wide ${quoteColor}`}
                style={{ left: left }}
                initial={{ y: 25, opacity: 0.05 }}
                animate={{
                    y: isHovered ? 5 : 25,
                    opacity: isHovered ? 1 : 0.05
                }}
                transition={{ duration: 0.3 }}
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
        {/* Matrix Background Effect */}
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
          <div className="p-12 md:p-24 border-r-2 border-black dark:border-green-500/30 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors">
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

      {/* 4. THE SOLUTION (VENN DIAGRAM - STATISCH + PULS ZENTRUM) */}
      <section id="solution" className="py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif dark:font-mono text-4xl italic dark:not-italic mb-4">Die Lösung: Symbiose</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-ikb dark:text-green-400">Ich löse die Silos auf.</p>
        </div>

        <div className="venn-container scale-75 md:scale-100 dark:opacity-90">
          {/* ÄUSSERE KREISE (STATISCH) */}
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
            <motion.div
                className={`absolute inset-0 rounded-full ${isCodeMode ? 'bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-ikb/10 shadow-[0_0_10px_rgba(0,47,167,0.4)]'}`}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
             <svg viewBox="0 0 100 100" className='w-12 h-12 relative z-10'>
                <text x="50" y="48" style={{fontFamily: 'IBM Plex Mono, monospace'}} fontWeight="700" fontSize="38" textAnchor="middle" fill="white" dominantBaseline="central">DK</text>
                <path d="M28 22 C 18 22, 18 22, 18 35 L 18 42 C 18 48, 12 50, 12 50 C 12 50, 18 52, 18 58 L 18 65 C 18 78, 18 78, 28 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
                <path d="M72 22 C 82 22, 82 22, 82 35 L 82 42 C 82 48, 88 50, 88 50 C 88 50, 82 52, 82 58 L 82 65 C 82 78, 82 78, 72 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
            </svg>
          </div>
        </div>
      </section>

      {/* 5. USE CASES (GRID BREAK INTERACTION) */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/50 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-ikb dark:text-green-400">/// Echte Szenarien</h2>

          {/* DIE NEUE INTERAKTIVE GRID KOMPONENTE */}
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

      {/* 12. CONTACT / FOOTER */}
      <footer id="contact" className="bg-black dark:bg-slate-950 text-white py-24 px-6 md:px-12 border-t-8 border-ikb dark:border-green-500 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4 text-ikb dark:text-green-400">/// Let&apos;s start</p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-7xl italic dark:not-italic mb-8">Genug Theorie.</h2>

            <ContactForm />

          </div>

          <div className="flex flex-col justify-end items-start md:items-end font-mono text-sm text-gray-500">
            <p className="text-right">
              &copy; 2025 Daniel Kleiboldt.<br/>
              Münster.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}