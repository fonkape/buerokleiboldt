'use client';
import NavBar from "@/components/NavBar";
import { useMode } from "@/context/ModeContext";
import { Reveal } from "@/components/Reveal";

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
        </div>
      </section>

      {/* 3. THE CHALLENGE */}
      <section id="challenge" className="border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 border-r-2 border-black dark:border-green-500/30 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors">
            <h2 className="text-5xl md:text-6xl font-serif dark:font-mono italic dark:not-italic mb-8 leading-tight">
              The Silo Trap.
            </h2>
            <p className="font-mono text-sm leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
              Innovationsprojekte scheitern selten an der Technik. Sie scheitern an der Schnittstelle.
            </p>
            <ul className="space-y-6 font-serif dark:font-mono text-xl">
              <li className="flex items-start"><span className="text-ikb dark:text-green-400 font-mono mr-4">01.</span> Legal blockiert (&quot;Zu riskant&quot;).</li>
              <li className="flex items-start"><span className="text-ikb dark:text-green-400 font-mono mr-4">02.</span> IT baut Features, die illegal sind.</li>
              <li className="flex items-start"><span className="text-ikb dark:text-green-400 font-mono mr-4">03.</span> Business verfehlt den ROI.</li>
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

      {/* 4. THE SOLUTION (VENN) */}
      <section id="solution" className="py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden border-b-2 border-black dark:border-green-500/30 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif dark:font-mono text-4xl italic dark:not-italic mb-4">Die Lösung: Symbiose</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-ikb dark:text-green-400">Ich löse die Silos auf.</p>
        </div>

        <div className="venn-container scale-75 md:scale-100 dark:opacity-90">
          <div className="venn-circle venn-law dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">LAW</div>
          <div className="venn-circle venn-tech dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">TECH</div>
          <div className="venn-circle venn-biz dark:border-green-500 dark:text-green-400 dark:bg-slate-900/50">BUSINESS</div>
          <div className="venn-me dark:bg-green-600 dark:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <span className="font-serif dark:font-mono text-3xl italic dark:not-italic">Me</span>
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Architect</span>
          </div>
        </div>
      </section>

      {/* 5. USE CASES */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-slate-800/50 border-b-2 border-black dark:border-green-500/30 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-ikb dark:text-green-400">/// Echte Szenarien</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
                { id: "01", title: "Der Mittelständler & das KI-Tool", p: "Mitarbeiter nutzten ChatGPT für Kundendaten.", l: "Lokale LLM-Instanz (Llama)." },
                { id: "02", title: "Supply Chain auf der Blockchain", p: "Logistik-Nachweise manipulierbar.", l: "Permissioned Ledger (Hyperledger)." },
                { id: "03", title: "Das Startup & die MiCA-Lizenz", p: "FinTech wollte tokenisierte Assets ohne Lizenz.", l: "Hybrid-Architektur & Whitelisting." },
                { id: "04", title: "Maschinenbau & Tokenisierung", p: "Kapital in Maschinen gebunden.", l: "eWpG-konforme Smart Contracts." }
            ].map((c, i) => (
                <article key={i} className="bg-white dark:bg-slate-900 border-2 border-black dark:border-green-500/30 p-8 relative group hover:shadow-lg dark:hover:border-green-400 transition-all">
                    <div className="absolute top-0 right-0 bg-black dark:bg-green-500 text-white dark:text-black px-3 py-1 font-mono text-xs font-bold">CASE {c.id}</div>
                    <h3 className="font-serif dark:font-mono text-3xl italic dark:not-italic mb-6">{c.title}</h3>
                    <div className="space-y-4 font-mono text-sm">
                        <p className="dark:text-gray-400"><strong className="uppercase border-b border-black dark:border-green-500 dark:text-white">Problem:</strong> {c.p}</p>
                        <p className="text-ikb dark:text-green-400"><strong className="uppercase border-b border-ikb dark:border-green-400">Lösung:</strong> {c.l}</p>
                    </div>
                </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900 border-b-2 border-black dark:border-green-500/30 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-sm uppercase tracking-widest mb-12 text-center text-ikb dark:text-green-400">/// Was Kunden sagen</h2>

          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x">
              {[
                { i: "SM", name: "Sarah Müller", role: "CTO, PropTech Startup", text: "Daniel hat unsere Token-Architektur in 3 Wochen BaFin-konform gemacht." },
                { i: "TK", name: "Thomas Krause", role: "Head of Legal, Mittelstand AG", text: "Endlich jemand, der unsere Compliance-Anforderungen versteht UND technisch liefert." },
                { i: "LP", name: "Laura Peters", role: "Founder, HealthTech GmbH", text: "Daniel hat uns gezeigt, wie wir AI DSGVO-konform nutzen können." },
                { i: "MH", name: "Michael Hoffmann", role: "CFO, Supply Chain Solutions", text: "Der Workshop hat Juristen und IT-Abteilung endlich zusammengebracht." }
              ].map((t, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[400px] bg-gray-50 dark:bg-slate-800 border-2 border-black dark:border-green-500/30 p-8 snap-center">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-ikb dark:bg-green-600 rounded-full flex items-center justify-center text-white font-mono font-bold text-lg mr-4">{t.i}</div>
                    <div>
                      <h4 className="font-serif dark:font-mono font-bold text-lg">{t.name}</h4>
                      <p className="font-mono text-xs text-gray-500 dark:text-green-400/70">{t.role}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300 italic dark:not-italic">&quot;{t.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SERVICES */}
      <section id="services" className="border-b-2 border-black dark:border-green-500/30 bg-white dark:bg-slate-900 transition-colors">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-black dark:divide-green-500/30">

          {/* Service 1 */}
          <div className="p-12 hover:bg-gray-50 dark:hover:bg-slate-800 transition duration-300 group h-full flex flex-col">
            <div className="font-mono text-xs mb-8 border border-black dark:border-green-500 inline-block px-3 py-1 bg-white dark:bg-slate-900 dark:text-green-400 group-hover:bg-ikb group-hover:text-white group-hover:border-ikb transition self-start">AUDIT</div>
            <h3 className="font-serif dark:font-mono text-3xl italic dark:not-italic mb-4">Feasibility Check</h3>
            <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-8 flex-grow">
              Bevor Sie Budget verbrennen: Ein 48h Review Ihrer Idee. Machbar? Sinnvoll?
            </p>
            <ul className="font-mono text-xs space-y-4 border-t-2 border-black dark:border-green-500/30 pt-6 mt-auto">
              <li className="flex items-center"><i className="fas fa-arrow-right text-ikb dark:text-green-400 mr-3"></i> Go / No-Go Analyse</li>
            </ul>
          </div>

          {/* Service 2 (Core) */}
          <div className="p-12 bg-ikb dark:bg-green-900/20 text-white dark:text-green-100 relative overflow-hidden group h-full flex flex-col border-x-2 border-black dark:border-green-500/30">
            <div className="absolute top-0 right-0 bg-black dark:bg-green-500 text-white dark:text-black text-[10px] font-mono uppercase px-3 py-1 font-bold">Core</div>
            <div className="font-mono text-xs mb-8 border border-white dark:border-green-400 inline-block px-3 py-1 self-start">ARCHITECTURE</div>
            <h3 className="font-serif dark:font-mono text-3xl italic dark:not-italic mb-4">Legal Engineering</h3>
            <p className="font-mono text-sm leading-relaxed opacity-90 mb-8 flex-grow">
              Ich schreibe User Stories für Compliance und Specs für die Entwickler.
            </p>
            <ul className="font-mono text-xs space-y-4 border-t-2 border-white/30 dark:border-green-400/30 pt-6 mt-auto">
              <li className="flex items-center"><i className="fas fa-check mr-3"></i> Compliance-by-Design</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="p-12 hover:bg-gray-50 dark:hover:bg-slate-800 transition duration-300 group h-full flex flex-col">
            <div className="font-mono text-xs mb-8 border border-black dark:border-green-500 inline-block px-3 py-1 bg-white dark:bg-slate-900 dark:text-green-400 group-hover:bg-ikb group-hover:text-white group-hover:border-ikb transition self-start">WORKSHOP</div>
            <h3 className="font-serif dark:font-mono text-3xl italic dark:not-italic mb-4">The Bridge</h3>
            <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-8 flex-grow">
              Ich bringe Ihre Juristen und Entwickler in einen Raum.
            </p>
            <ul className="font-mono text-xs space-y-4 border-t-2 border-black dark:border-green-500/30 pt-6 mt-auto">
              <li className="flex items-center"><i className="fas fa-arrow-right text-ikb dark:text-green-400 mr-3"></i> Vocabulary Alignment</li>
            </ul>
          </div>

        </div>
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
                <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-4">
                    <i className="fas fa-user text-6xl text-gray-400 dark:text-green-500/50 mb-4"></i>
                    <p className="font-mono text-xs">Hier dein Foto einfügen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTACT */}
      <footer id="contact" className="bg-black dark:bg-slate-950 text-white py-24 px-6 md:px-12 border-t-8 border-ikb dark:border-green-500 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4 text-ikb dark:text-green-400">/// Let&apos;s start</p>
            <h2 className="font-serif dark:font-mono text-5xl md:text-7xl italic dark:not-italic mb-8">Genug Theorie.</h2>

            <form className="space-y-4 max-w-md">
              <input type="text" placeholder="Ihr Name" className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400" />
              <input type="email" placeholder="Ihre E-Mail" className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400" />
              <textarea rows={4} placeholder="Worum geht es?" className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400"></textarea>
              <button type="button" className="w-full bg-ikb dark:bg-green-600 text-white font-mono font-bold text-lg px-10 py-4 hover:bg-white dark:hover:bg-green-400 hover:text-ikb dark:hover:text-black transition duration-300 border-2 border-transparent">
                Nachricht senden
              </button>
            </form>
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