'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from '@/context/ModeContext';

// --- DATEN: DIE 6 SZENARIEN ALS 3-AKT-STORY ---
const cases = [
  {
    id: "01",
    title: "Der Mittelständler & das KI-Tool",
    hook: "Mitarbeiter nutzten ChatGPT für Kundendaten.",
    solution_short: "Lokale LLM-Instanz (Llama) on-premise.",
    story: {
      conflict: { title: "Der Datenschutz-GAU", text: "Der Vorstand wollte Innovation, aber der Datenschutzbeauftragte drohte mit Kündigung. Sensible Kundendaten landeten auf US-Servern. Das Projekt stand vor dem sofortigen Stopp." },
      turning: { title: "The Safe Room", text: "Wir isolierten die Intelligenz. Aufbau einer lokalen Open-Source LLM-Architektur (Llama 3). Kein Byte verlässt das Firmennetzwerk. Die AI lernt nur von internen Daten." },
      resolution: { title: "Souveräne Innovation", text: "Rechtsabteilung gibt grünes Licht. Produktivität steigt um 40%, ohne Compliance-Risiko. Das Unternehmen besitzt nun seine eigene AI-Infrastruktur." }
    }
  },
  {
    id: "02",
    title: "Supply Chain auf der Blockchain",
    hook: "Logistik-Nachweise waren manipulierbar.",
    solution_short: "Permissioned Ledger Architektur.",
    story: {
      conflict: { title: "Black Box Logistik", text: "Papiernachweise gingen verloren, Lieferanten fälschten Herkunftszertifikate. Bei Rückrufaktionen herrschte blindes Chaos und Haftungsrisiko für den CEO." },
      turning: { title: "The Immutable Ledger", text: "Implementierung eines Hyperledger Fabric Netzwerks. Nur verifizierte Partner erhalten Schreibrechte. Ein Smart Contract validiert jeden Handgriff automatisch." },
      resolution: { title: "Trust Protocol", text: "Lückenlose Nachweisbarkeit in Sekunden statt Wochen. Versicherungsprämien sanken um 15%, da das Manipulationsrisiko technisch eliminiert wurde." }
    }
  },
  {
    id: "03",
    title: "Das Startup & die MiCA-Lizenz",
    hook: "Tokenisierte Assets ohne Banklizenz geplant.",
    solution_short: "Hybrid-Architektur & Whitelisting.",
    story: {
      conflict: { title: "Die Regulierungs-Mauer", text: "Ein FinTech wollte Immobilienanteile tokenisieren. Die BaFin stufte das Modell als erlaubnispflichtiges Bankgeschäft ein. Drohende Insolvenz vor Launch." },
      turning: { title: "The Regulatory Hack", text: "Umbau der Architektur: Der Token dient nur als technischer Träger, nicht als Währung. Einbau einer Whitelist-Funktion im Smart Contract, die nur KYC-geprüfte Investoren zulässt." },
      resolution: { title: "License to Operate", text: "Das Modell fiel unter eine leichtere Lizenzklasse. Der Launch erfolgte pünktlich, vollkommen MiCA-konform und rechtssicher." }
    }
  },
  {
    id: "04",
    title: "Maschinenbau & Tokenisierung",
    hook: "Kapital in teuren Maschinen gebunden.",
    solution_short: "eWpG-konforme Smart Contracts.",
    story: {
      conflict: { title: "Frozen Capital", text: "Ein Mittelständler hatte 20 Mio. € in Maschinen gebunden. Banken waren zu langsam für neue Kredite. Das Wachstum war durch das eigene Anlagevermögen blockiert." },
      turning: { title: "Liquid Iron", text: "Rechtliche Konstruktion der Maschinen als digitales Wertpapier nach eWpG. Technisches Mapping der Maschinen-ID auf Ethereum-Token." },
      resolution: { title: "Instant Liquidity", text: "Verkauf von 20% der Maschinen-Token an Investoren. 4 Mio. € Liquidität in 2 Wochen generiert, ohne die Maschinen zu bewegen." }
    }
  },
  {
    id: "05",
    title: "Klinik & KI-Arztbriefe",
    hook: "Ärzte ertrinken in Bürokratie.",
    solution_short: "Air-Gapped AI System (Art. 9 DSGVO).",
    story: {
      conflict: { title: "Burnout durch Bürokratie", text: "Ärzte verbrachten 4 Stunden täglich mit Entlassbriefen statt mit Patienten. Cloud-AI war aufgrund von Art. 9 DSGVO (Gesundheitsdaten) streng verboten." },
      turning: { title: "The Air-Gapped Brain", text: "Training eines medizinischen Sprachmodells auf einem isolierten Server im Krankenhauskeller. Keine Internetverbindung, physische Zugangskontrolle." },
      resolution: { title: "Healing Focus", text: "Entlassbriefe werden in Sekunden vorformuliert. Ärzte gewinnen 30% Zeit für Patienten zurück. Datenschutz-Audit mit Bestnoten bestanden." }
    }
  },
  {
    id: "06",
    title: "Immobilien & Due Diligence",
    hook: "Prüfung von 5.000 Verträgen blockiert Verkauf.",
    solution_short: "Automatisierte Klausel-Extraktion.",
    story: {
      conflict: { title: "Data Paralysis", text: "Ein Portfolio-Verkauf drohte zu platzen, weil 20 Anwälte Monate brauchten, um 5.000 gewerbliche Mietverträge auf 'Change of Control'-Klauseln zu prüfen." },
      turning: { title: "The Silicon Associate", text: "Einsatz einer spezialisierten NLP-AI, trainiert auf deutsches Mietrecht. Extraktion und Risiko-Scoring aller Klauseln über Nacht." },
      resolution: { title: "Velocity Deal", text: "Die Due Diligence war in 48 Stunden fertig statt in 3 Monaten. Der Deal wurde erfolgreich geschlossen, massive Beraterkosten gespart." }
    }
  }
];

export default function UseCaseGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isCodeMode } = useMode();

  // Farben basierend auf Modus
  const accentColor = isCodeMode ? "text-green-400" : "text-ikb";
  const borderColor = isCodeMode ? "border-green-500/30" : "border-black";
  const activeBorderColor = isCodeMode ? "border-green-400" : "border-ikb";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {cases.map((item) => {
        const isActive = activeId === item.id;

        return (
          <motion.div
            layout // Magische Animation beim Grid-Umbruch
            key={item.id}
            onClick={() => setActiveId(isActive ? null : item.id)}
            className={`bg-white dark:bg-slate-900 border-2 p-8 cursor-pointer relative group overflow-hidden transition-colors duration-500
              ${isActive ? `md:col-span-2 ${activeBorderColor} shadow-2xl` : `${borderColor} hover:border-gray-400 dark:hover:border-green-500/60`}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* HEADER BEREICH */}
            <motion.div layout="position" className="flex justify-between items-start mb-4">
               <div>
                 <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${isCodeMode ? 'text-green-500/60' : 'text-gray-400'}`}>
                    CASE {item.id}
                 </div>
                 <h3 className={`font-serif dark:font-mono text-2xl md:text-3xl ${isActive ? accentColor : 'text-black dark:text-gray-100'}`}>
                    {item.title}
                 </h3>
               </div>

               {/* Toggle Icon */}
               <motion.div
                 layout
                 className={`text-2xl ${isActive ? accentColor : 'text-gray-300 group-hover:text-black dark:group-hover:text-green-400'}`}
                 animate={{ rotate: isActive ? 45 : 0 }}
               >
                 <i className="fas fa-plus"></i>
               </motion.div>
            </motion.div>

            {/* INITIAL VIEW (Zusammenfassung) */}
            {!isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                >
                    <p className="font-mono text-sm text-gray-600 dark:text-gray-400 border-l-2 border-black dark:border-green-500/30 pl-4">
                        <span className="uppercase font-bold text-xs block mb-1 opacity-50">Problem:</span>
                        {item.hook}
                    </p>
                    <p className={`font-mono text-sm ${accentColor} border-l-2 border-transparent pl-4`}>
                         <span className="uppercase font-bold text-xs block mb-1 opacity-50 text-black dark:text-white">Lösung:</span>
                        {item.solution_short}
                    </p>
                </motion.div>
            )}

            {/* EXPANDED VIEW (Die 3-Akt Story) */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-12"
                >
                  <div className="grid md:grid-cols-3 gap-12 relative z-10">

                    {/* AKT 1: KONFLIKT (Farbe geändert: Grau) */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} bg-white dark:bg-slate-900 flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>I</div>
                        <h4 className="font-serif dark:font-mono italic dark:not-italic text-lg mb-4 text-gray-500 dark:text-gray-400">Der Konflikt.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.conflict.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.story.conflict.text}
                        </p>
                    </div>

                    {/* AKT 2: WENDE */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} ${isCodeMode ? 'bg-green-500 text-black' : 'bg-ikb text-white'} flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>II</div>
                        <h4 className={`font-serif dark:font-mono italic dark:not-italic text-lg mb-4 ${accentColor}`}>Die Architektur.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.turning.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                             {item.story.turning.text}
                        </p>
                    </div>

                    {/* AKT 3: AUFLÖSUNG */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} bg-white dark:bg-slate-900 flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>III</div>
                        <h4 className="font-serif dark:font-mono italic dark:not-italic text-lg mb-4 text-black dark:text-white">Der Return.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.resolution.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                             {item.story.resolution.text}
                        </p>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}