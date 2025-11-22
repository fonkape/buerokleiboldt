'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function OrganicToolkit() {
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const { t } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveNode(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const items = [
        { id: 0, label: "AUDIT", ...t.services.items[0] },
        { id: 1, label: "ARCHITECT", ...t.services.items[1] },
        { id: 2, label: "BRIDGE", ...t.services.items[2] }
    ];

    return (
        <div ref={containerRef} className="relative max-w-3xl mx-auto py-12 pl-8 border-l-2 border-gray-200">
            <div className="space-y-12">
                {items.map((item, i) => (
                    <div key={i} className="relative">
                        {/* Timeline Dot */}
                        <div
                            className={`absolute -left-[41px] top-2 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${activeNode === i ? 'bg-[#002FA7]' : 'bg-gray-300'}`}
                        ></div>

                        {/* Button */}
                        <button
                            onClick={() => setActiveNode(activeNode === i ? null : i)}
                            className={`text-xl font-bold tracking-widest transition-colors duration-300 hover:text-[#002FA7] ${activeNode === i ? 'text-[#002FA7]' : 'text-gray-400'}`}
                        >
                            {item.label}
                        </button>

                        {/* Content Accordion */}
                        <AnimatePresence>
                            {activeNode === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 pb-2">
                                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                            <h3 className="text-2xl font-serif mb-4 text-[#1A1A1A]">{item.title}</h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed">{item.content}</p>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#002FA7] uppercase tracking-widest mb-2">{item.pointsTitle1}</h4>
                                                    <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                                                        {item.points1.map((p, k) => <li key={k}>{p}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#002FA7] uppercase tracking-widest mb-2">{item.pointsTitle2}</h4>
                                                    <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                                                        {item.points2.map((p, k) => <li key={k}>{p}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
