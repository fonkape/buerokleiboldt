'use client';

import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrganicBlog() {
    const { t } = useTheme();
    const [selectedPost, setSelectedPost] = useState<number | null>(null);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedPost(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        if (selectedPost !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedPost]);

    const posts = [
        {
            id: 0,
            category: "Smart Contracts",
            date: "Nov 2024",
            title: "Smart Contracts sind keine Verträge (und das ist ein Problem).",
            excerpt: "Wenn Code Law ist, wer haftet für Bugs? Warum wir hybride Governance-Modelle brauchen, die juristische Sicherheit mit technischer Unveränderlichkeit verbinden.",
            content: (
                <>
                    <p className="mb-6">
                        Der Satz "Code is Law" ist einer der bekanntesten und gleichzeitig missverständlichsten Slogans der Blockchain-Welt. Er suggeriert, dass technischer Code die einzige Wahrheit darstellt und menschliche Eingriffe oder rechtliche Rahmenbedingungen obsolet macht. Doch die Realität zeigt: Code ist fehleranfällig.
                    </p>
                    <h4 className="text-xl font-bold mb-3 text-[#1A1A1A]">Das DAO-Dilemma</h4>
                    <p className="mb-6">
                        Erinnern wir uns an den DAO-Hack 2016. Der Code erlaubte technisch gesehen die Entnahme der Gelder. War es also Diebstahl oder nur die Nutzung eines Features? Juristisch war der Fall klar, technisch jedoch unveränderbar – bis zum Hard Fork.
                    </p>
                    <h4 className="text-xl font-bold mb-3 text-[#1A1A1A]">Die Lösung: Hybride Verträge</h4>
                    <p className="mb-6">
                        Wir brauchen "Smart Legal Contracts". Das sind Verträge, die sowohl eine natürlichsprachliche (juristisch bindende) Komponente als auch eine maschinenlesbare (ausführbare) Komponente haben.
                    </p>
                    <p>
                        Ein solcher Ansatz ermöglicht es, die Effizienz der Automatisierung zu nutzen, ohne auf die Sicherheitsnetze des Rechtsstaats zu verzichten. Wenn der Smart Contract versagt, greift der Legal Contract als Fallback. Das ist Legal Engineering.
                    </p>
                </>
            ),
            active: true
        },
        {
            id: 1,
            category: "Regulation",
            date: "Coming Soon",
            title: "MiCA für den Mittelstand.",
            excerpt: "Was die Markets in Crypto Assets Regulation für deutsche KMUs bedeutet und wie man sich vorbereitet.",
            content: null,
            active: false
        }
    ];

    return (
        <section id="blog" className="py-32 px-6 bg-[#F5F5F0]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-5xl font-serif mb-4 text-[#1A1A1A]">{t.blog.title}</h2>
                        <p className="text-lg text-[#1A1A1A]/60 max-w-xl">{t.blog.desc}</p>
                    </div>
                    <a href="https://linkedin.com" target="_blank" className="text-[#002FA7] font-bold tracking-widest uppercase text-sm hover:underline">
                        View all on LinkedIn <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            layoutId={`card-${post.id}`}
                            onClick={() => post.active && setSelectedPost(post.id)}
                            className={`group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative overflow-hidden ${post.active ? 'hover:shadow-xl hover:border-[#002FA7]/20 cursor-pointer' : 'opacity-60 grayscale cursor-not-allowed'}`}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${post.active ? 'text-[#002FA7] bg-[#002FA7]/5' : 'text-gray-500 bg-gray-100'}`}>{post.category}</span>
                                <span className="text-xs text-gray-400 font-mono">{post.date}</span>
                            </div>
                            <motion.h3 layoutId={`title-${post.id}`} className={`text-2xl font-serif mb-4 leading-tight ${post.active ? 'group-hover:text-[#002FA7]' : ''} transition-colors`}>
                                {post.title}
                            </motion.h3>
                            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>
                            {post.active ? (
                                <span className="inline-flex items-center text-sm font-bold text-[#1A1A1A] group-hover:text-[#002FA7] transition-colors">
                                    {t.blog.read} <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            ) : (
                                <span className="inline-flex items-center text-sm font-bold text-gray-400">
                                    Coming Soon
                                </span>
                            )}
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* EXPANDED OVERLAY */}
            <AnimatePresence>
                {selectedPost !== null && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedPost}`}
                                className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto relative"
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                                >
                                    <i className="fas fa-times text-gray-600"></i>
                                </button>

                                <div className="p-10 md:p-14">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded text-[#002FA7] bg-[#002FA7]/5">
                                            {posts.find(p => p.id === selectedPost)?.category}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">
                                            {posts.find(p => p.id === selectedPost)?.date}
                                        </span>
                                    </div>

                                    <motion.h3
                                        layoutId={`title-${selectedPost}`}
                                        className="text-3xl md:text-4xl font-serif mb-8 leading-tight text-[#1A1A1A]"
                                    >
                                        {posts.find(p => p.id === selectedPost)?.title}
                                    </motion.h3>

                                    <div className="prose prose-lg text-gray-600 font-sans leading-relaxed">
                                        {posts.find(p => p.id === selectedPost)?.content}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
