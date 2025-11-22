'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function OrganicUseCases() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const { t } = useTheme();
    const cases = t.cases.items;

    // Horizontal scroll logic
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    // State for expanded card (Overlay)
    const [activeCase, setActiveCase] = useState<any>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveCase(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (activeCase) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [activeCase]);

    return (
        <section ref={targetRef} id="cases" className="relative h-[300vh] bg-[#F5F5F0]">

            {/* Sticky Container for Horizontal Scroll */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Title (Absolute positioned to stay visible or move slightly) */}
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-5xl font-serif text-[#1A1A1A] mb-4">{t.cases.title}</h2>
                    <p className="text-[#1A1A1A]/60 max-w-md">
                        Scrollen Sie, um zu entdecken, wie ich Technologie in echten Mehrwert verwandle.
                    </p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[30vw]">
                    {cases.map((item) => (
                        <div key={item.id} className="relative group">
                            {/* Card Container */}
                            <div className="w-[400px] h-[500px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">

                                {/* Top: ID & Expand Button */}
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-[#002FA7] font-bold text-xl opacity-50">#{item.id}</span>
                                    <button
                                        onClick={() => setActiveCase(item)}
                                        className="w-10 h-10 rounded-full bg-[#F5F5F0] hover:bg-[#002FA7] hover:text-white transition-colors flex items-center justify-center text-[#1A1A1A]"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>

                                {/* Middle: Graphics Placeholder (Dynamic based on ID) */}
                                <div className="flex-grow flex items-center justify-center py-6">
                                    {/* Simple CSS Graphics based on ID to differentiate */}
                                    {item.id === "01" && (
                                        <div className="w-24 h-32 border-2 border-[#002FA7]/20 rounded-lg flex flex-col gap-2 p-2 relative">
                                            <div className="w-full h-2 bg-[#002FA7]/10 rounded"></div>
                                            <div className="w-2/3 h-2 bg-[#002FA7]/10 rounded"></div>
                                            <motion.div
                                                className="absolute bottom-4 right-[-10px] w-8 h-8 bg-[#002FA7] rounded-full flex items-center justify-center text-white text-xs"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            >
                                                <i className="fas fa-check"></i>
                                            </motion.div>
                                        </div>
                                    )}
                                    {item.id === "02" && (
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    className="w-8 h-8 border border-[#002FA7] rounded flex items-center justify-center text-[#002FA7] text-xs"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ delay: i * 0.2, repeat: Infinity }}
                                                >
                                                    <i className="fas fa-cube"></i>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                    {item.id === "03" && (
                                        <div className="relative w-32 h-20 border border-gray-200 rounded bg-white flex items-center justify-center overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 bg-[#002FA7]/10"
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            />
                                            <span className="text-xs font-mono text-[#002FA7]">SCANNING...</span>
                                        </div>
                                    )}
                                    {item.id === "04" && (
                                        <div className="w-32 h-32 rounded-full border-4 border-[#002FA7]/10 border-t-[#002FA7] flex items-center justify-center">
                                            <span className="font-bold text-[#002FA7]">100%</span>
                                        </div>
                                    )}
                                    {item.id === "05" && (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full border border-[#002FA7] flex items-center justify-center">
                                                <i className="fas fa-users text-[#002FA7]"></i>
                                            </div>
                                            <div className="w-0.5 h-4 bg-[#002FA7]"></div>
                                            <div className="flex gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#002FA7] text-white flex items-center justify-center text-xs">Yes</div>
                                                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs">No</div>
                                            </div>
                                        </div>
                                    )}
                                    {item.id === "06" && (
                                        <div className="flex items-center gap-4">
                                            <i className="fas fa-file-contract text-2xl text-gray-300"></i>
                                            <motion.div
                                                className="h-0.5 w-12 bg-[#002FA7]"
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                            ></motion.div>
                                            <i className="fas fa-coins text-2xl text-[#002FA7]"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom: Text Info */}
                                <div>
                                    <h3 className="text-2xl font-serif text-[#1A1A1A] mb-3 leading-tight">{item.title}</h3>
                                    <p className="text-sm text-[#1A1A1A]/70 mb-4 line-clamp-3">
                                        {item.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-[#002FA7]/5 text-[#002FA7] text-xs font-bold uppercase tracking-wider rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* OVERLAY / MODAL */}
            <AnimatePresence>
                {activeCase && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCase(null)}
                            className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm cursor-pointer"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`card-${activeCase.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Left: Visuals & Key Info */}
                            <div className="bg-[#F5F5F0] p-8 md:w-1/3 flex flex-col justify-between border-r border-gray-100">
                                <div>
                                    <span className="font-mono text-[#002FA7] font-bold text-4xl opacity-20 mb-4 block">#{activeCase.id}</span>
                                    <h3 className="text-3xl font-serif text-[#1A1A1A] mb-6">{activeCase.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {activeCase.tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Big Icon / Graphic */}
                                <div className="flex items-center justify-center py-12 opacity-80">
                                    <i className={`fas fa-${activeCase.id === "01" ? "robot" :
                                            activeCase.id === "02" ? "link" :
                                                activeCase.id === "03" ? "search" :
                                                    activeCase.id === "04" ? "shield-alt" :
                                                        activeCase.id === "05" ? "vote-yea" : "copyright"
                                        } text-9xl text-[#002FA7]/10`}></i>
                                </div>
                            </div>

                            {/* Right: Detailed Content */}
                            <div className="p-8 md:w-2/3 space-y-8 bg-white">
                                <button
                                    onClick={() => setActiveCase(null)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-[#1A1A1A] transition-colors"
                                >
                                    <i className="fas fa-times text-2xl"></i>
                                </button>

                                <div>
                                    <h4 className="font-bold text-[#002FA7] uppercase tracking-widest text-xs mb-2">Das Problem</h4>
                                    <p className="text-lg text-[#1A1A1A] leading-relaxed">
                                        {activeCase.fullStory?.problem || "Content loading..."}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-[#002FA7] uppercase tracking-widest text-xs mb-2">Die Lösung</h4>
                                    <p className="text-lg text-[#1A1A1A] leading-relaxed">
                                        {activeCase.fullStory?.solution}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                        <h4 className="font-bold text-green-700 uppercase tracking-widest text-xs mb-2">
                                            <i className="fas fa-chart-line mr-2"></i>
                                            Business Impact
                                        </h4>
                                        <p className="text-sm text-green-900 font-medium">
                                            {activeCase.fullStory?.result}
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                        <h4 className="font-bold text-[#002FA7] uppercase tracking-widest text-xs mb-2">
                                            <i className="fas fa-balance-scale mr-2"></i>
                                            Legal & Compliance
                                        </h4>
                                        <p className="text-sm text-blue-900 font-medium">
                                            {activeCase.fullStory?.legal}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
