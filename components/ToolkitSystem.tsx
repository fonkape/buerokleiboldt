'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ToolkitSystem() {
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const { theme, t } = useTheme();

    // Theme-specific styles
    const styles = {
        swiss: {
            line: "stroke-black",
            node: "bg-white border-2 border-black hover:bg-ikb hover:text-white hover:border-ikb",
            activeNode: "bg-ikb text-white border-ikb",
            text: "font-mono text-black",
            card: "bg-white border-2 border-black shadow-[8px_8px_0_0_#000]"
        },
        cyber: {
            line: "stroke-green-500 shadow-[0_0_10px_#22c55e]",
            node: "bg-slate-900 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]",
            activeNode: "bg-green-500 text-black border-green-500 shadow-[0_0_20px_#22c55e]",
            text: "font-mono text-green-500",
            card: "bg-slate-900 border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        },
        organic: {
            line: "stroke-orange-400/50",
            node: "bg-white/80 backdrop-blur-md border border-orange-200 text-[#1A1A1A] hover:bg-orange-50 hover:border-orange-400 hover:scale-110 transition-all duration-300 shadow-sm",
            activeNode: "bg-orange-500 text-white border-orange-500 shadow-lg scale-110",
            text: "font-sans text-[#1A1A1A]",
            card: "bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl"
        }
    };

    const currentStyle = styles[theme];

    // Node positions (Satellite layout) - Perfect Equilateral Triangle
    // Center of 800x600 is 400,300.
    // Radius 180.
    // Top: 400, 120 -> 50%, 20%
    // Bottom Left: 244, 390 -> 30.5%, 65%
    // Bottom Right: 556, 390 -> 69.5%, 65%
    const nodes = [
        { id: 0, x: 244, y: 390, label: "AUDIT", cardPos: { top: '60%', left: '0%', x: 0, y: 0 } }, // Card to left
        { id: 1, x: 400, y: 120, label: "ARCHITECT", cardPos: { top: '35%', left: '50%', x: '-50%', y: '0' } }, // Card below the node (inside triangle)
        { id: 2, x: 556, y: 390, label: "BRIDGE", cardPos: { top: '60%', right: '0%', left: 'auto', x: 0, y: 0 } } // Card to right
    ];

    return (
        <div className="relative w-full max-w-[800px] mx-auto h-[600px] flex items-center justify-center">

            {/* SVG CONNECTIONS */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                <motion.path
                    d="M400 120 L 244 390"
                    fill="none"
                    strokeWidth="2"
                    className={currentStyle.line}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.path
                    d="M400 120 L 556 390"
                    fill="none"
                    strokeWidth="2"
                    className={currentStyle.line}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.path
                    d="M244 390 L 556 390"
                    fill="none"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className={currentStyle.line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </svg>

            {/* NODES */}
            {nodes.map((node, i) => (
                <motion.button
                    key={node.id}
                    className={`absolute w-24 h-24 rounded-full flex items-center justify-center text-xs font-bold tracking-widest z-10 ${activeNode === i ? currentStyle.activeNode : currentStyle.node
                        }`}
                    style={{ left: `${(node.x / 800) * 100}%`, top: `${(node.y / 600) * 100}%`, transform: 'translate(-50%, -50%)' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
                >
                    {node.label}
                </motion.button>
            ))}

            {/* DETAIL CARD OVERLAY */}
            <AnimatePresence>
                {activeNode !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`absolute z-20 p-8 max-w-sm w-full ${currentStyle.card}`}
                        style={nodes[activeNode].cardPos as any}
                    >
                        {/* CONTENT (Dynamic based on activeNode) */}
                        <div className="relative">
                            <button
                                onClick={() => setActiveNode(null)}
                                className="absolute top-0 right-0 opacity-50 hover:opacity-100"
                            >
                                ✕
                            </button>

                            <h3 className={`text-2xl font-bold mb-4 ${currentStyle.text}`}>
                                {t.services.items[activeNode].title}
                            </h3>
                            <p className="font-mono text-sm opacity-80 mb-6 leading-relaxed">
                                {t.services.items[activeNode].content}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-mono text-xs opacity-50 uppercase tracking-widest mb-2">
                                        {t.services.items[activeNode].pointsTitle1}
                                    </h4>
                                    <ul className="font-mono text-sm space-y-1">
                                        {t.services.items[activeNode].points1.map((p, k) => <li key={k}>- {p}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-mono text-xs opacity-50 uppercase tracking-widest mb-2">
                                        {t.services.items[activeNode].pointsTitle2}
                                    </h4>
                                    <ul className="font-mono text-sm space-y-1">
                                        {t.services.items[activeNode].points2.map((p, k) => <li key={k}>- {p}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
