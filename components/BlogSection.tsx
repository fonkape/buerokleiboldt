'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from '@/context/ModeContext';

// --- DATEN: DEINE ARTIKEL ---
const blogPosts = [
  {
    id: 1,
    date: "20. Nov 2025",
    category: "SMART CONTRACTS",
    title: "Smart Contracts sind keine Verträge (und das ist ein Problem)",
    excerpt: "Juristen hassen Smart Contracts. Entwickler verstehen nicht warum. Ich erkläre, warum beide Recht haben – und was die Lösung ist.",
    readTime: "4 Min",
    // Der Inhalt als JSX für perfekte Formatierung
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="font-serif italic text-xl border-l-4 border-ikb dark:border-green-500 pl-4 my-8">
          "Ein Smart Contract ist kein Vertrag. Zumindest nicht im rechtlichen Sinne."
        </p>

        <p>
          Als mich neulich ein Mandant fragte, ob sein Entwickler-Team „einfach einen Smart Contract für die Lieferkette programmieren“ könne, musste ich ihn stoppen. Nicht, weil die Idee schlecht war. Sondern weil sie auf einem gefährlichen Irrtum basierte.
        </p>
        <p>
          Genau hier beginnt das Drama, das ich in den letzten Monaten bei Dutzenden Mittelständlern gesehen habe: Entwickler bauen brillante Automatisierungen. Rechtsabteilungen blockieren sie aus Angst. Und am Ende verbrennt das Unternehmen sechsstellige Budgets – für nichts.
        </p>

        <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Was Smart Contracts wirklich sind</h3>
        <p>
          Lassen wir die Marketing-Sprache beiseite. Ein Smart Contract ist Code, der einen Vertrag abbildet und automatisch ausführt – aber er ist nicht der Vertrag selbst.
        </p>
        <p>
          <strong>Analogie:</strong> Stellen Sie sich einen Getränkeautomaten vor. Sie werfen 2 Euro ein, drücken einen Knopf, und die Cola fällt heraus. Der Automat führt den Kaufvertrag aus, aber er ist nicht der Vertrag.
        </p>
        <ul className="list-disc pl-5 space-y-2 font-mono text-sm">
            <li>Der Code: <code>if (payment_received) &#123; release_goods(); &#125;</code></li>
            <li>Der Vertrag: Die rechtliche Einigung über Preis, Qualität, Gewährleistung, Haftung.</li>
        </ul>

        <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Warum Juristen Smart Contracts fürchten</h3>
        <p>
          Vor Kurzem saß ich in einem Workshop mit der Rechtsabteilung eines produzierenden Mittelständlers. Das IT-Team hatte einen Smart Contract entwickelt, der Zahlungen automatisch freigibt. Die Reaktion der Juristen? Panik.
        </p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Widerruf:</strong> Ein Smart Contract lässt sich nicht einfach rückgängig machen.</li>
            <li><strong>Defekte Ware:</strong> Wenn der Sensor "Lieferung" meldet, fließt das Geld – auch wenn die Ware Schrott ist.</li>
            <li><strong>Haftung:</strong> Wer zahlt bei Bugs im Code?</li>
        </ul>

        <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Die Lösung: Hybrid Contracts</h3>
        <p>
          Die gute Nachricht: Sie müssen sich nicht zwischen „Blockchain-Innovation“ und „rechtssicherer Abwicklung“ entscheiden. Die Lösung sind <strong>Hybrid Smart Contracts</strong>.
        </p>

        <div className="bg-gray-50 dark:bg-slate-800 p-6 border-l-2 border-black dark:border-green-500 my-6">
            <h4 className="font-bold mb-2">1. Legal Wrapper (Der Rahmen)</h4>
            <p className="text-sm mb-4">Ein klassischer Vertrag regelt Haftung und Streitbeilegung. Er hat "Vorrang" vor dem Code.</p>

            <h4 className="font-bold mb-2">2. On-Chain Execution (Der Motor)</h4>
            <p className="text-sm">Der Code automatisiert nur die Erfüllung (Zahlung, Freigabe) bei klaren Parametern.</p>
        </div>

        <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Fazit: Code UND Gesetz</h3>
        <p>
          Smart Contracts sind keine Science-Fiction mehr. Aber die Wahrheit ist: Weder Ihre Juristen noch Ihre Entwickler liegen falsch. Sie sprechen nur verschiedene Sprachen. Hybrid Contracts sind die Übersetzung.
        </p>
        <p>
           Wenn Ihre Rechtsabteilung und Ihre IT sich das nächste Mal streiten, setzen Sie sie an einen Tisch – mit jemandem, der beide Seiten versteht.
        </p>
      </div>
    )
  }
  // Hier können später weitere Artikel folgen...
];


export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const { isCodeMode } = useMode();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedPost !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedPost]);

  const activePost = blogPosts.find(p => p.id === selectedPost);

  return (
    <section id="blog" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900 border-b-2 border-black dark:border-green-500/30 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-black dark:border-green-500/30 pb-8">
           <div>
             <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 border-l-4 border-ikb dark:border-green-500 pl-4 transition-colors text-ikb dark:text-green-400">
                /// INSIGHTS
             </p>
             <h2 className="font-serif dark:font-mono text-5xl italic dark:not-italic leading-tight text-black dark:text-gray-100">
                Legal Tech<br/>Logbuch.
             </h2>
           </div>
           <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mt-6 md:mt-0 max-w-md text-right">
              Gedanken an der Schnittstelle. Praxisnah, ohne Juristendeutsch.
           </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">
           {blogPosts.map((post) => (
             <motion.article
                key={post.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-gray-50 dark:bg-slate-800 border-2 border-transparent hover:border-ikb dark:hover:border-green-500 transition-all duration-300 p-8"
                onClick={() => setSelectedPost(post.id)}
             >
                <div className="flex justify-between items-center mb-6 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    <span>{post.date}</span>
                    <span className="text-ikb dark:text-green-400 group-hover:underline">{post.category}</span>
                </div>
                <h3 className="font-serif dark:font-mono text-3xl italic dark:not-italic mb-4 text-black dark:text-white group-hover:text-ikb dark:group-hover:text-green-400 transition-colors">
                    {post.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-6">
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                    Read Article <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
                </div>
             </motion.article>
           ))}

           {/* Placeholder Card for "Coming Soon" */}
           <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 flex flex-col justify-center items-center text-center opacity-50">
              <p className="font-mono text-xs uppercase mb-2">Coming Next</p>
              <h3 className="font-serif dark:font-mono text-xl text-gray-400">MiCA für den Mittelstand</h3>
           </div>
        </div>

        {/* MODAL (ARTICLE VIEW) */}
        <AnimatePresence>
            {selectedPost && activePost && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedPost(null)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
                    />

                    {/* Content Card */}
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 top-10 md:top-20 md:inset-x-auto md:right-0 md:w-[800px] bg-white dark:bg-slate-900 z-[70] overflow-y-auto border-l-2 border-black dark:border-green-500 shadow-2xl"
                    >
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-ikb dark:hover:bg-green-500 hover:text-white transition-colors z-50"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="p-8 md:p-16 max-w-3xl mx-auto">
                            <div className="font-mono text-xs text-ikb dark:text-green-400 mb-4 uppercase tracking-widest">
                                {activePost.category} • {activePost.readTime} Read
                            </div>
                            <h1 className="font-serif dark:font-mono text-4xl md:text-5xl mb-8 leading-tight text-black dark:text-white">
                                {activePost.title}
                            </h1>

                            {/* Der eigentliche Text */}
                            <div className="prose dark:prose-invert prose-lg font-serif dark:font-sans text-gray-800 dark:text-gray-300">
                                {activePost.content}
                            </div>

                            {/* Author Footer im Modal */}
                            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <img src="/me.jpg" alt="DK" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-black dark:text-white">Daniel Kleiboldt</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Legal Engineer</p>
                                </div>
                                <div className="ml-auto">
                                    <a href="https://linkedin.com/in/daniel-kleiboldt" target="_blank" className="text-ikb dark:text-green-400 hover:underline text-sm font-mono">
                                        Auf LinkedIn folgen →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
}