'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'swiss', label: 'SWISS', icon: '■' },
        { id: 'cyber', label: 'CYBER', icon: '⚡' },
        { id: 'organic', label: 'ORGANIC', icon: '●' }
    ];

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`
            relative px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-md
            ${theme === t.id ? 'text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}
          `}
                >
                    {theme === t.id && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 bg-black dark:bg-green-500 rounded-md"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <span>{t.icon}</span>
                        <span className="hidden md:inline">{t.label}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
