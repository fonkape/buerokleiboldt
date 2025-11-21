'use client';
import { useState } from 'react';
import NavBar from "@/components/NavBar";
import { useMode } from "@/context/ModeContext";
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ServiceAccordion from "@/components/ServiceAccordion";
import UseCaseGrid from "@/components/UseCaseGrid";
import TechStack from "@/components/TechStack";
import BlogSection from "@/components/BlogSection";
import { motion } from "framer-motion";

// Layout-Daten für die Silo Traps
const trapLayouts = [
  { left: '11rem' },
  { left: '16rem' },
  { left: '16rem' }
];

// GLITCH COMPONENT (V3: Seismic & Tall)
const GlitchWord = ({ text }: { text: string }) => {
    const { isCodeMode } = useMode();

    // Farben
    const glitchColor = isCodeMode ? "text-green-300" : "text-blue-400";
    const baseColor = isCodeMode ? "text-green-400" : "text-ikb";
    const bgClass = isCodeMode ? "bg-slate-900" : "bg-white";

    // WICHTIG: Font-Style explizit machen, damit Layer deckungsgleich sind
    const fontStyle = isCodeMode ? "font-mono not-italic" : "font-serif italic";

    return (
        <span className="relative inline-block group">
            {/* Basis-Wort */}
            <span className={`transition-colors ${baseColor} ${fontStyle}`}>
                {text}
            </span>

            {/* Der Glitch-Layer: 85% Höhe, Zitter-Animation */}
            <motion.span
                className={`absolute top-0 left-0 w-full overflow-hidden pointer-events-none ${glitchColor} ${bgClass} ${fontStyle}`}
                aria-hidden="true"
                // "Seismic" Animation: Zufälliges kurzes Zittern
                animate={{
                    x: [0, -1, 1, -0.5, 0],
                    y: [0, 0.5, -0.5, 0],
                    opacity: [1, 0.9, 1]
                }}
                transition={{
                    duration: 0.15,          // Sehr schnelles Zittern (Vibration)
                    repeat: Infinity,
                    repeatDelay: 2 + Math.random() * 3, // Zufällige Pause
                    ease: "linear"
                }}
                style={{
                    height: '85%', // Mehr vertikaler Raum (85%)
                    clipPath: 'inset(0 0 15% 0)', // Schneidet nur unten 15% ab
                    transform: 'translateX(2px)' // Grundversatz
                }}
            >
                {text}
            </motion.span>
        </span>
    );
};

// Silo Trap Item
const SiloTrapItem = ({ text, quote, left }: { text: string; quote: string; left: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isCodeMode } = useMode();

    const quoteColor = isCodeMode ? "text-green-500/40" : "text-ikb/40";
    const primaryColor = isCodeMode ? "text-green-400" : "text-ikb";

    return (
        <motion.li
            className="flex flex-col items-start relative cursor-default py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={`${primaryColor} font-mono text-xl mr-4 z-10 transition-colors relative`}>{text}</span>
            <motion.span
                className={`font-serif italic text-2xl absolute z-0 whitespace-nowrap tracking-wide pointer-events-none ${quoteColor}`}
                style={{ left: left, top: '1.2rem' }}
                initial={{ y: 15, opacity: 0 }}
                animate={{
                    y: isHovered ? 0 : 15,
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
  const { isCodeMode, t } = useMode();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-gray-100 selection:bg-ikb dark:selection:bg-green-500 dark:selection:text-black transition-colors duration-500">
      <NavBar />

      {/* 1. HERO */}
      <header className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-10 transition-opacity duration-1000 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-8 border-l-4 border-ikb dark:border-green-500 pl-4 transition-colors">
              {t.hero.role}
            </p>
          </Reveal>

          <h1 className="text-5xl md:text-8xl leading-[0.95] font-serif dark:font-mono mb-12 transition-all duration-500">
            <Reveal>
              {t.hero.titlePart1}
            </Reveal>

            {/* GLITCH EFFEKT */}
            <Reveal delay={0.4}>
               <div className="flex flex-wrap gap-x-4 md:gap-x-6 items-baseline pt-2">
                  <GlitchWord text="AI" />
                  <span className="opacity-50 italic dark:not-italic">/</span>
                  <GlitchWord text="Blockchain" />
                  <span>{t.hero.titlePart2}</span>
               </div>
            </Reveal>

            <div className="mt-4"></div>

            <Reveal delay={0.6}>
              {/* TYPO FIX: pb-2 und leading-tight */}
              <span className="text-4xl md:text-6xl block opacity-80 pb-2 leading-tight pt-2">
                 {t.hero.subtitle}
              </span>
            </Reveal>
          </h1>

          <div className="grid md:grid-cols-12 gap-12 border-t-2 border-black dark:border-green-500/30 pt-12 transition-colors duration-500">
            <div className="md:col-span-8">
              <Reveal delay={0.8}>
                <p className="font-mono text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-300">
                  {t.hero.intro}
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
               <Reveal delay={1}>
                  <a href="#cases" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest hover:text-ikb dark:hover:text-green-400 transition-colors">
                    {t.hero.cta}
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
            {t.opportunity.title} <span className="not-italic text-black/40 dark:text-green-500/50">{t.opportunity.subtitle}</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {t.opportunity.cards.map((card, i) => (
              <article key={i} className="bg-white dark:bg-slate-900 p-8 border-2 border-black dark:border-green-500/30 hover:shadow-[8px_8px_0_0_#002FA7] dark:hover:shadow-[8px_8px_0_0_#22c55e] dark:hover:border-green-400 transition-all duration-300">
                <div className="text-ikb dark:text-green-400 text-4xl mb-6">
                    {i===0 && <i className="fas fa-file-contract"></i>}
                    {i===1 && <i className="fas fa-robot"></i>}
                    {i===2 && <i className="fas fa-coins"></i>}
                </div>
                <h3 className="font-mono font-bold text-lg mb-4 uppercase dark:text-green-100">{card.title}</h3>
                <p className="font-serif dark:font-mono text-lg leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="font-mono text-sm uppercase tracking-widest mb-4 text-ikb dark:text-green-400">{t.opportunity.transition}</p>
            <p className="font-serif dark:font-mono text-2xl md:text-3xl italic dark:not-italic max-w-3xl mx-auto">
              {t.opportunity.quote}
            </p>
            <div className="h-12 w-[2px] bg-black dark:bg-green-500 mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* 3. THE CHALLENGE */}
      <section id="challenge" className="border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 border-r-2 border-black dark:border-green-500/30 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors overflow-hidden">
            <h2 className="text-5xl md:text-6xl font-serif dark:font-mono italic dark:not-italic mb-8 leading-tight">
              {t.challenge.title}
            </h2>
            <p className="font-mono text-sm leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
              {t.challenge.subtitle}
            </p>

            <ul className="space-y-12 font-mono text-xl">
              {t.challenge.traps.map((trap, i) => (
                <SiloTrapItem
                  key={i}
                  text={trap.text}
                  quote={trap.quote}
                  left={trapLayouts[i].left}
                />
              ))}
            </ul>
          </div>

          <div className="flex flex-col font-mono bg-gray-100 dark:bg-slate-950 transition-colors">
            <div className="p-12 border-b-2 border-black dark:border-green-500/30 flex-1 hover:bg-white dark:hover:bg-slate-900 group cursor-default transition-colors flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs border border-black dark:border-green-500 px-2 py-1 bg-white dark:bg-slate-900 dark:text-green-400 transition-colors">RESULT A</span>
                <i className="fas fa-ban text-3xl text-red-500 dark:text-red-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase font-serif dark:font-mono italic dark:not-italic">{t.challenge.resultA.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed dark:text-gray-400">
                {t.challenge.resultA.text}
              </p>
            </div>

            <div className="p-12 flex-1 hover:bg-white dark:hover:bg-slate-900 group cursor-default transition-colors flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs border border-black dark:border-green-500 px-2 py-1 bg-white dark:bg-slate-900 dark:text-green-400 transition-colors">RESULT B</span>
                <i className="fas fa-bug text-3xl text-orange-500 dark:text-orange-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase font-serif dark:font-mono italic dark:not-italic">{t.challenge.resultB.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed dark:text-gray-400">
                {t.challenge.resultB.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SOLUTION */}
      <section id="solution" className="py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif dark:font-mono text-4xl italic dark:not-italic mb-4">{t.solution.title}</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-ikb dark:text-green-400">{t.solution.subtitle}</p>
        </div>

        <div className="venn-container scale-75 md:scale-100 dark:opacity-90">
          <div className="venn-circle venn-law dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">LAW</div>
          <div className="venn-circle venn-tech dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">TECH</div>
          <div className="venn-circle venn-biz dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">BUSINESS</div>

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

      {/* 5. USE CASES */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/50 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-ikb dark:text-green-400">{t.cases.title}</h2>
          <UseCaseGrid />
        </div>
      </section>

      {/* 6. SERVICES */}
      <section id="services" className="py-12 md:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 border-l-4 border-ikb dark:border-green-500 pl-4">
                {t.services.supertitle}
            </p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-6xl italic dark:not-italic leading-tight">
                {t.services.title}
            </h2>
        </div>
        <ServiceAccordion />
      </section>

      {/* 7. PROFILE */}
      <section id="profile" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/30 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <p className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-ikb dark:text-green-400">{t.profile.subtitle}</p>
              <h2 className="font-serif dark:font-mono text-4xl md:text-5xl italic dark:not-italic mb-8 leading-tight">
                Legal Mind.<br/>Tech Stack.<br/>The Translator.
              </h2>
              <div className="space-y-6 font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300 border-l-2 border-black dark:border-green-500 pl-6">
                <p>{t.profile.text1}</p>
                <p>{t.profile.text2}</p>
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

      {/* 9. BLOG SECTION */}
      <BlogSection />

      {/* 10. CONTACT / FOOTER */}
      <footer id="contact" className="bg-black dark:bg-slate-950 text-white py-24 px-6 md:px-12 border-t-8 border-ikb dark:border-green-500 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4 text-ikb dark:text-green-400">{t.footer.subtitle}</p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-7xl italic dark:not-italic mb-8">{t.footer.title}</h2>

            <ContactForm />

          </div>

          <div className="flex flex-col justify-end items-start md:items-end font-mono text-sm text-gray-500">
            {/* SOCIAL LINKS */}
            <div className="flex gap-6 mb-8">
                <a href="https://github.com/fonkape" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                <a href="https://x.com/danielkleiboldt" target="_blank" rel="noopener noreferrer" className="group text-gray-400 hover:text-white transition-colors" aria-label="X">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
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

            <p className="text-right text-xs opacity-50 hover:opacity-100 transition-opacity">
                {t.footer.credit}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}