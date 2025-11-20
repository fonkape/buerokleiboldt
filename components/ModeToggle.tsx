'use client';
import { useMode } from '@/context/ModeContext';
import { motion } from 'framer-motion';
import { Scale, Terminal } from 'lucide-react';

export default function ModeToggle() {
  const { isCodeMode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      className={`
        relative h-10 px-4 rounded-full flex items-center gap-3 border-2 transition-all duration-500 shadow-sm
        ${isCodeMode ? 'border-green-400 bg-slate-800' : 'border-ikb bg-white'}
      `}
    >
      {/* Der Hintergrund-Slider (Animiert) */}
      <motion.div
        layout
        className={`absolute w-8 h-8 rounded-full shadow-sm top-0.5 ${isCodeMode ? 'bg-green-400' : 'bg-ikb'}`}
        // Wir berechnen die Position basierend auf dem Modus
        initial={false}
        animate={{ left: isCodeMode ? 'calc(100% - 2.25rem)' : '0.25rem' }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Icon: JURIST */}
      <div className={`z-10 flex items-center gap-2 text-xs font-bold transition-opacity duration-300 ${isCodeMode ? 'opacity-30 text-gray-400' : 'opacity-100 text-white'}`}>
        <Scale size={16} />
        <span className="hidden md:inline tracking-widest">JURIST</span>
      </div>

      {/* Icon: CODER */}
      <div className={`z-10 flex items-center gap-2 text-xs font-bold transition-opacity duration-300 ${isCodeMode ? 'opacity-100 text-slate-900' : 'opacity-30 text-gray-400'}`}>
         <span className="hidden md:inline font-mono tracking-widest">CODER</span>
         <Terminal size={16} />
      </div>
    </button>
  );
}