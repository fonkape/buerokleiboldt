'use client';
import { motion, Variants } from 'framer-motion'; // <--- 'Variants' importiert
import { useMode } from '@/context/ModeContext';

export default function BlueprintSystem({ activeId }: { activeId: number | null }) {
  const { isCodeMode } = useMode();

  const c = {
    base: isCodeMode ? "#1e293b" : "#cbd5e1",
    active: isCodeMode ? "#22c55e" : "#002FA7",
    glow: isCodeMode ? "rgba(34, 197, 94, 0.6)" : "rgba(0, 47, 167, 0.5)",
    scan: isCodeMode ? "rgba(34, 197, 94, 0.1)" : "rgba(0, 47, 167, 0.1)"
  };

  // FIX: Expliziter Typ 'Variants'
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="w-full h-72 md:h-96 flex justify-center items-center mb-12 relative overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50 rounded-xl backdrop-blur-sm">

      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
            animate={{ backgroundPosition: ["0px 0px", "20px 20px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%]"
            style={{
                backgroundImage: `linear-gradient(${c.base} 1px, transparent 1px), linear-gradient(90deg, ${c.base} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        />
      </div>

      <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-5xl relative z-10">

        {/* === ID 3: THE BRIDGE (WORKSHOP) - OBEN === */}
        <motion.g
            initial="hidden"
            animate={activeId === 3 ? "visible" : "hidden"}
            style={{ opacity: activeId === 3 || activeId === null ? 1 : 0.3 }}
        >
            <circle cx="280" cy="100" r="30" stroke={activeId === 3 ? c.active : c.base} strokeWidth="2"/>
            <text x="280" y="105" textAnchor="middle" fill={activeId === 3 ? c.active : c.base} fontSize="10" fontFamily="monospace">LAW</text>

            <circle cx="520" cy="100" r="30" stroke={activeId === 3 ? c.active : c.base} strokeWidth="2"/>
            <text x="520" y="105" textAnchor="middle" fill={activeId === 3 ? c.active : c.base} fontSize="10" fontFamily="monospace">CODE</text>

            <motion.path
                d="M310 100 L 490 100"
                stroke={activeId === 3 ? c.active : c.base}
                strokeWidth="2"
                strokeDasharray="5 5"
                animate={activeId === 3 ? { strokeDashoffset: [0, -20] } : {}}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />

            {activeId === 3 && (
                <>
                    <motion.circle r="4" fill={c.active} filter={`drop-shadow(0 0 8px ${c.active})`}>
                        <animateMotion path="M310 100 L 490 100" dur="1.5s" repeatCount="indefinite" />
                    </motion.circle>
                    <motion.circle r="4" fill={c.active} filter={`drop-shadow(0 0 8px ${c.active})`}>
                        <animateMotion path="M490 100 L 310 100" dur="1.5s" repeatCount="indefinite" begin="0.75s" />
                    </motion.circle>
                </>
            )}
        </motion.g>


        {/* === ID 2: LEGAL ENGINEERING (ARCHITECTURE) - MITTE === */}
        <motion.g
            initial="hidden"
            animate={activeId === 2 ? "visible" : "hidden"}
            style={{ opacity: activeId === 2 || activeId === null ? 1 : 0.3 }}
        >
            <motion.rect variants={draw} x="350" y="160" width="100" height="120" stroke={activeId === 2 ? c.active : c.base} strokeWidth="2" rx="4" />

            <motion.line variants={draw} x1="360" y1="180" x2="400" y2="180" stroke={activeId === 2 ? c.active : c.base} strokeWidth="2" />
            <motion.line variants={draw} x1="360" y1="200" x2="420" y2="200" stroke={activeId === 2 ? c.active : c.base} strokeWidth="2" />
            <motion.line variants={draw} x1="360" y1="220" x2="390" y2="220" stroke={activeId === 2 ? c.active : c.base} strokeWidth="2" />

            <motion.circle cx="350" cy="200" r="4" fill={activeId === 2 ? c.active : c.base} animate={activeId === 2 ? pulse : {}} />
            <motion.circle cx="450" cy="240" r="4" fill={activeId === 2 ? c.active : c.base} animate={activeId === 2 ? pulse : {}} />

            {activeId === 2 && (
                <motion.g
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <rect x="460" y="170" width="80" height="24" rx="2" fill={c.active} />
                    <text x="500" y="186" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">COMPLIANT</text>
                    <line x1="450" y1="182" x2="460" y2="182" stroke={c.active} strokeWidth="1"/>
                </motion.g>
            )}
        </motion.g>


        {/* === ID 1: FEASIBILITY CHECK (AUDIT) - UNTEN === */}
        <motion.g
            initial="hidden"
            animate={activeId === 1 ? "visible" : "hidden"}
            style={{ opacity: activeId === 1 || activeId === null ? 1 : 0.3 }}
        >
            <motion.path variants={draw} d="M200 340 L 600 340 L 580 380 L 220 380 Z" stroke={activeId === 1 ? c.active : c.base} strokeWidth="2" />

            <path d="M300 340 L 310 380" stroke={activeId === 1 ? c.active : c.base} strokeWidth="1" opacity="0.5"/>
            <path d="M400 340 L 400 380" stroke={activeId === 1 ? c.active : c.base} strokeWidth="1" opacity="0.5"/>
            <path d="M500 340 L 490 380" stroke={activeId === 1 ? c.active : c.base} strokeWidth="1" opacity="0.5"/>

            {activeId === 1 && (
                <>
                    <motion.rect
                        x="200" y="320" width="40" height="60"
                        fill="url(#scanGradient)"
                        animate={{ x: [0, 360, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ opacity: 0.5 }}
                    />
                    <motion.line
                        x1="240" y1="320" x2="240" y2="380"
                        stroke={c.active}
                        strokeWidth="2"
                        animate={{ x: [0, 360, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        filter={`drop-shadow(0 0 5px ${c.active})`}
                    />
                </>
            )}

            <defs>
                <linearGradient id="scanGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={c.active} stopOpacity="0" />
                    <stop offset="100%" stopColor={c.active} stopOpacity="0.3" />
                </linearGradient>
            </defs>
        </motion.g>

        <motion.line x1="400" y1="340" x2="400" y2="280" stroke={c.base} strokeWidth="1" strokeDasharray="2 2" />
        <motion.line x1="400" y1="160" x2="400" y2="100" stroke={c.base} strokeWidth="1" strokeDasharray="2 2" />

      </svg>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-400 flex flex-col gap-1">
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeId !== null ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>SYSTEM_STATUS: {activeId ? 'ACTIVE_SCAN' : 'STANDBY'}</span>
         </div>
         <div>MODULE: {activeId === 1 ? 'AUDIT_CORE' : activeId === 2 ? 'ARCH_BUILDER' : activeId === 3 ? 'BRIDGE_LINK' : 'WAITING'}</div>
      </div>
    </div>
  );
}