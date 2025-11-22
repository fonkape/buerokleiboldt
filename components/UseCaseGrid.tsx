'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function UseCaseGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isCodeMode, t } = useTheme();

  const cases = t.cases.items;

  const accentColor = isCodeMode ? "text-green-400" : "text-ikb";
  const borderColor = isCodeMode ? "border-green-500/30" : "border-black";
  const activeBorderColor = isCodeMode ? "border-green-400" : "border-ikb";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {cases.map((item) => {
        const isActive = activeId === item.id;

        return (
          <motion.div
            layout
            key={item.id}
            onClick={() => setActiveId(isActive ? null : item.id)}
            className={`bg-white dark:bg-slate-900 border-2 p-8 cursor-pointer relative group overflow-hidden transition-colors duration-500
              ${isActive ? `md:col-span-2 ${activeBorderColor} shadow-2xl` : `${borderColor} hover:border-gray-400 dark:hover:border-green-500/60`}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* HEADER BEREICH */}
            <motion.div layout="position" className="flex justify-between items-start mb-4">
              <div>
                <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${isCodeMode ? 'text-green-500/60' : 'text-gray-400'}`}>
                  CASE {item.id}
                </div>
                <h3 className={`font-serif dark:font-mono text-2xl md:text-3xl ${isActive ? accentColor : 'text-black dark:text-gray-100'}`}>
                  {item.title}
                </h3>
              </div>

              {/* Toggle Icon */}
              <motion.div
                layout
                className={`text-2xl ${isActive ? accentColor : 'text-gray-300 group-hover:text-black dark:group-hover:text-green-400'}`}
                animate={{ rotate: isActive ? 45 : 0 }}
              >
                <i className="fas fa-plus"></i>
              </motion.div>
            </motion.div>

            {/* CONTENT */}
            <motion.div layout className="space-y-4">
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags && item.tags.map((tag, i) => (
                  <span key={i} className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border ${isCodeMode ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}