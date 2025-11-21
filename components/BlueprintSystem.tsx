'use client';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';

export default function BlueprintSystem({ activeId }: { activeId: number | null }) {
  const { isCodeMode } = useMode();

  // Farben
  const inactiveColor = isCodeMode ? "#1e293b" : "#e2e8f0"; // Slate-800 / Gray-200
  const activeColor = isCodeMode ? "#22c55e" : "#002FA7";   // Grün / IKB
  const glowColor = isCodeMode ? "rgba(34, 197, 94, 0.5)" : "rgba(0, 47, 167, 0.3)";

  // Animationsvarianten für die aktiven Teile
  const activeVariant = {
    initial: { stroke: inactiveColor, fill: "transparent", filter: "none" },
    active: {
      stroke: activeColor,
      filter: `drop-shadow(0 0 8px ${glowColor})`,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full h-64 md:h-80 flex justify-center items-center mb-12 relative overflow-hidden">

      {/* Hintergrund-Grid für den Blueprint-Look */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: `radial-gradient(${inactiveColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-4xl">

        {/* --- ID 3: THE BRIDGE (WORKSHOP) - Oben / Verbindend --- */}
        <motion.g
            variants={activeVariant}
            initial="initial"
            animate={activeId === 3 ? "active" : "initial"}
        >
            {/* Linker Kopf/Bereich */}
            <path d="M250 100 A 40 40 0 1 0 250 180 A 40 40 0 1 0 250 100" strokeWidth="2"/>
            {/* Rechter Kopf/Bereich */}
            <path d="M550 100 A 40 40 0 1 0 550 180 A 40 40 0 1 0 550 100" strokeWidth="2"/>
            {/* Die Brücke (Verbindungslinie) */}
            <path d="M290 140 L 510 140" strokeWidth="4" strokeDasharray="8 8"/>
            {/* Pfeile auf der Brücke */}
            <path d="M390 130 L 410 140 L 390 150" strokeWidth="2"/>
        </motion.g>

        {/* --- ID 2: LEGAL ENGINEERING (ARCHITECTURE) - Mitte / Struktur --- */}
        <motion.g
            variants={activeVariant}
            initial="initial"
            animate={activeId === 2 ? "active" : "initial"}
        >
            {/* Die Säulen */}
            <rect x="360" y="180" width="20" height="140" strokeWidth="3"/>
            <rect x="420" y="180" width="20" height="140" strokeWidth="3"/>

            {/* Das Dach / Der Träger */}
            <rect x="340" y="160" width="120" height="20" strokeWidth="3"/>

            {/* Code-Details im Träger */}
            <path d="M350 170 L 360 170" strokeWidth="2"/>
            <path d="M370 170 L 430 170" strokeWidth="2"/>
            <path d="M440 170 L 450 170" strokeWidth="2"/>
        </motion.g>

        {/* --- ID 1: FEASIBILITY CHECK (AUDIT) - Unten / Fundament --- */}
        <motion.g
            variants={activeVariant}
            initial="initial"
            animate={activeId === 1 ? "active" : "initial"}
        >
            {/* Das Fundament */}
            <rect x="200" y="320" width="400" height="40" strokeWidth="3"/>
            {/* Schraffur im Fundament */}
            <path d="M220 320 L 200 340" strokeWidth="1"/>
            <path d="M260 320 L 220 360" strokeWidth="1"/>
            <path d="M300 320 L 260 360" strokeWidth="1"/>
            <path d="M340 320 L 300 360" strokeWidth="1"/>
            <path d="M380 320 L 340 360" strokeWidth="1"/>
            <path d="M420 320 L 380 360" strokeWidth="1"/>
            <path d="M460 320 L 420 360" strokeWidth="1"/>
            <path d="M500 320 L 460 360" strokeWidth="1"/>
            <path d="M540 320 L 500 360" strokeWidth="1"/>
            <path d="M580 320 L 540 360" strokeWidth="1"/>

            {/* Die Lupe (Scan) */}
            <circle cx="620" cy="300" r="30" strokeWidth="3"/>
            <line x1="645" y1="320" x2="665" y2="340" strokeWidth="6"/>
        </motion.g>

        {/* Verbindungslinien (Statisch, immer sichtbar aber dezent) */}
        <path d="M400 320 L 400 320" stroke={inactiveColor} strokeWidth="1" opacity="0.3"/>
        <line x1="400" y1="320" x2="400" y2="180" stroke={inactiveColor} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>

      </svg>

      {/* Label (Optional: Zeigt an, was gerade aktiv ist) */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs text-gray-400 uppercase tracking-widest">
        {activeId === 1 && "SYSTEM STATUS: AUDITING FOUNDATION"}
        {activeId === 2 && "SYSTEM STATUS: BUILDING ARCHITECTURE"}
        {activeId === 3 && "SYSTEM STATUS: BRIDGING SILOS"}
        {activeId === null && "SYSTEM STATUS: IDLE"}
      </div>
    </div>
  );
}