'use client';
import { useState } from 'react';
import { useMode } from '@/context/ModeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { isCodeMode, t } = useMode(); // Wir holen das Wörterbuch und den Modus

  // Wir holen die Texte aus dem Context
  const serviceData = t.services.items;

  // Farben definieren
  const primaryColor = isCodeMode ? "#22c55e" : "#002FA7";
  const primaryColorClass = isCodeMode
    ? "bg-green-600 dark:bg-green-900/50 text-white dark:text-green-200"
    : "bg-ikb text-white";
  const hoverColorClass = isCodeMode
    ? "hover:bg-green-500/20 dark:hover:bg-green-900/40"
    : "hover:bg-ikb/90";

  // Berechnung der Breite für das horizontale Accordion
  const getWidth = (id: number) => {
    if (openId === null) return '33.33%';
    return id === openId ? '70%' : '15%';
  };

  // Statische Untertitel
  const subtitles = ["AUDIT", "ARCHITECTURE", "WORKSHOP"];

  return (
    <div className="flex w-full divide-x-2 divide-black dark:divide-green-500/30 overflow-hidden min-h-[500px] border-y-2 border-black dark:border-green-500/30">
      {serviceData.map((item, index) => {
        // Wir nutzen den Index (0, 1, 2) um eine ID zu simulieren (1, 2, 3)
        const id = index + 1;
        const isOpen = id === openId;
        const toggleHandler = () => setOpenId(isOpen ? null : id);

        // Das mittlere Element (Index 1) ist unser "Core" Service (Legal Engineering)
        const isCore = index === 1;

        // Styling Logik: Hintergrundfarbe nur für Core
        const itemBgClass = isCore
            ? primaryColorClass
            : "bg-white dark:bg-slate-900";

        const currentHoverClass = isCore ? hoverColorClass : "";
        const width = getWidth(id);

        // Mapping der Punkte
        const sections = [
            { title: item.pointsTitle1, points: item.points1 },
            { title: item.pointsTitle2, points: item.points2 }
        ];

        return (
          <motion.div
            key={index}
            initial={{ width: '33.33%' }}
            animate={{ width: width }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`p-8 md:p-12 transition duration-300 h-auto flex flex-col cursor-pointer relative flex-shrink-0 overflow-hidden ${currentHoverClass} ${itemBgClass}`}
            onClick={toggleHandler}
          >

            {/* Header / Subtitle */}
            <div className={`flex justify-between items-start mb-8 z-10`} style={{color: isCore ? "white" : "inherit"}}>
              <div className={`font-mono text-xs border inline-block px-3 py-1 self-start transition-colors ${isCore ? "text-white border-white dark:border-green-400" : "border-black dark:border-green-500 bg-white dark:bg-slate-900 dark:text-green-400"}`}>
                  {subtitles[index]}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={`text-2xl ${isCore ? "text-white" : "text-ikb dark:text-green-400"}`}
              >
                <i className="fas fa-plus"></i>
              </motion.div>
            </div>

            {/* Titel */}
            <h3 className={`font-serif dark:font-mono text-3xl mb-4 whitespace-nowrap ${isCore ? "text-white italic dark:not-italic" : "text-black dark:text-gray-100 italic dark:not-italic"} z-10`}>
                {item.title}
            </h3>

            <AnimatePresence mode='wait'>
              {isOpen ? (
                // DETAIL ANSICHT (OFFEN)
                <motion.div
                  key="detail-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="overflow-y-auto mt-4 pt-4 border-t-2 z-10 pr-4 custom-scrollbar"
                  style={{
                    borderColor: isCore ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)",
                    maxHeight: '400px'
                  }}
                >
                  {/* Haupttext */}
                  <p className={`font-mono text-sm leading-relaxed ${isCore ? "opacity-90 text-white" : "text-gray-700 dark:text-gray-300"} mb-8`}>
                    {item.content}
                  </p>

                  {/* Unterpunkte */}
                  {sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        <h4 className={`font-serif dark:font-mono text-xl italic dark:not-italic mb-3 ${isCore ? "text-white" : "text-ikb dark:text-green-400"}`}>
                            {section.title}
                        </h4>

                        <ul className={`font-mono text-sm space-y-2 ${isCore ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                            {section.points.map((point, pIndex) => (
                                <li key={pIndex} className="flex items-start">
                                    <span className="mr-3 text-lg opacity-80" style={{ color: isCore ? "white" : primaryColor }}>
                                        <i className="fas fa-arrow-right"></i>
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                  ))}

                </motion.div>
              ) : (
                // VORSCHAU ANSICHT (GESCHLOSSEN)
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`font-mono text-sm leading-relaxed ${isCore ? "opacity-90" : "text-gray-600 dark:text-gray-400"} mb-8 flex-grow z-10 line-clamp-3`}
                >
                    {item.content}
                </motion.p>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}