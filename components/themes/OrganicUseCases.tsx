'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function OrganicUseCases() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const { t } = useTheme();

    // Horizontal scroll logic
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    // Enhanced Content with Graphs/Animations
    const enhancedCases = t.cases.items.map((item, i) => {
        let graph = null;

        // Simple SVG Graphs/Visuals based on index/topic
        if (i === 0) { // Automated NDA
            graph = (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-[10px] uppercase tracking-widest text-[#002FA7] mb-2 font-bold">Process Efficiency</div>
                    <div className="flex items-end gap-2 h-24">
                        <div className="w-8 bg-gray-300 h-[80%] rounded-t relative group"><span className="absolute -top-4 left-0 text-[9px] opacity-0 group-hover:opacity-100">Manual</span></div>
                        <div className="w-8 bg-[#002FA7] h-[20%] rounded-t relative group"><span className="absolute -top-4 left-0 text-[9px] opacity-0 group-hover:opacity-100">Auto</span></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-mono">-75% Time Spent</div>
                </div>
            );
        } else if (i === 1) { // Tokenization
            graph = (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="animate-spin-slow w-full h-full">
                            <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                            <circle cx="50" cy="50" r="40" stroke="#002FA7" strokeWidth="8" fill="none" strokeDasharray="250" strokeDashoffset="75" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#002FA7] font-bold text-xs">
                            $2M+
                        </div>
                    </div>
                </div>
            );
        } else if (i === 2) { // AI Due Diligence
            graph = (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full overflow-hidden">
                            <div className="h-full bg-[#002FA7] w-[95%]"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                            <span>Accuracy</span>
                            <span>95%</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            // Generic visual for others
            graph = (
                <div className="mt-6 h-24 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                    <i className="fas fa-chart-line text-3xl text-[#002FA7]/20"></i>
                </div>
            );
        }

        return { ...item, graph };
    });

    return (
        <section id="cases" ref={targetRef} className="relative h-[300vh] bg-[#F5F5F0]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Title Overlay */}
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-5xl font-serif text-[#1A1A1A]">{t.cases.title}</h2>
                    <p className="text-[#1A1A1A]/60 mt-2">Scroll to explore <i className="fas fa-arrow-right ml-2"></i></p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[20vw]">
                    {enhancedCases.map((item, i) => (
                        <div
                            key={i}
                            className="relative w-[400px] h-[550px] bg-white rounded-[2rem] shadow-xl border border-white/50 p-8 flex flex-col shrink-0 overflow-hidden group hover:border-[#002FA7]/30 transition-colors"
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map((tag, k) => (
                                        <span key={k} className="px-3 py-1 bg-[#002FA7]/5 text-[#002FA7] rounded-full text-xs font-bold uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-serif text-[#1A1A1A] leading-tight group-hover:text-[#002FA7] transition-colors">{item.title}</h3>
                            </div>

                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    {item.desc}
                                </p>

                                {/* Additional Content / Graph */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">Impact Analysis</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Implementing this solution resulted in significant improvements in process velocity and compliance adherence.
                                    </p>
                                    {item.graph}
                                </div>
                            </div>

                            {/* Footer / Number */}
                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-6xl font-serif text-gray-100 font-bold group-hover:text-[#002FA7]/10 transition-colors">0{i + 1}</span>
                                <button className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-[#002FA7] transition-colors">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
