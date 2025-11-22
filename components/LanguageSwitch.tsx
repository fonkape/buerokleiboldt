'use client';
import { useTheme } from '@/context/ThemeContext';

export default function LanguageSwitch() {
  const { language, setLanguage, theme } = useTheme();

  const isOrganic = theme === 'organic';
  const activeClass = isOrganic ? "font-bold text-[#1A1A1A]" : "font-bold text-black dark:text-white";
  const inactiveClass = isOrganic ? "text-[#1A1A1A]/40 hover:text-[#1A1A1A]" : "text-gray-400 hover:text-black dark:hover:text-white";

  return (
    <div className="flex gap-2 font-mono text-sm">
      <button
        onClick={() => setLanguage('de')}
        className={`transition-colors ${language === 'de' ? activeClass : inactiveClass}`}
      >
        DE
      </button>
      <span className={isOrganic ? "text-[#1A1A1A]/20" : "text-gray-300 dark:text-gray-600"}>/</span>
      <button
        onClick={() => setLanguage('en')}
        className={`transition-colors ${language === 'en' ? activeClass : inactiveClass}`}
      >
        EN
      </button>
    </div>
  );
}