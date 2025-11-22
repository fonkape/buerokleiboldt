'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';
import { useTheme } from '@/context/ThemeContext';

// Das Logo (unverändert)
const LogoSVG = ({ isCodeMode }: { isCodeMode: boolean }) => {
  const color = isCodeMode ? '#22c55e' : '#002FA7';
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="48" style={{ fontFamily: 'IBM Plex Mono, monospace' }} fontWeight="700" fontSize="38" textAnchor="middle" fill={color} dominantBaseline="central">DK</text>
      <path d="M28 22 C 18 22, 18 22, 18 35 L 18 42 C 18 48, 12 50, 12 50 C 12 50, 18 52, 18 58 L 18 65 C 18 78, 18 78, 28 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
      <path d="M72 22 C 82 22, 82 22, 82 35 L 82 42 C 82 48, 88 50, 88 50 C 88 50, 82 52, 82 58 L 82 65 C 82 78, 82 78, 72 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
    </svg>
  );
};

const SLOGAN_MAIN = "BÜRO FÜR LEGAL ENGINEERING";
const SLOGAN_SUB = "DANIEL KLEIBOLDT";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // Hier holen wir uns das Wörterbuch 't' aus dem Context
  const { isCodeMode, t } = useTheme();

  // Die Menü-Punkte sind jetzt dynamisch
  const navItems = [
    { name: t.nav.cases, href: '#cases' },
    { name: t.nav.challenge, href: '#challenge' },
    { name: t.nav.solution, href: '#services' },
    { name: t.nav.profile, href: '#profile' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const SloganClassMain = "font-extrabold text-[14px] text-slate-700 dark:text-gray-300 tracking-[0.05em] uppercase";
  const SloganClassSub = "font-normal text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.05em] uppercase";

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-2 border-black dark:border-green-500/30 flex justify-between items-center px-6 md:px-12 h-24 transition-colors duration-500">

      <Link href="/" className="group flex items-center gap-4" aria-label="Homepage">
        <div className="w-12 h-12 flex-shrink-0">
          <LogoSVG isCodeMode={isCodeMode} />
        </div>
        <div className="flex flex-col justify-center font-mono leading-tight hidden sm:flex">
          <span className={SloganClassMain}>{SLOGAN_MAIN}</span>
          <span className={SloganClassSub}>{SLOGAN_SUB}</span>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-mono text-xs dark:text-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-ikb dark:hover:text-green-400 hover:underline uppercase tracking-wide transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* THEME TOGGLE */}
        <ThemeToggle />

        {/* HIER IST DER NEUE SPRACH-SCHALTER */}
        <LanguageSwitch />

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden font-mono text-xs uppercase font-bold dark:text-white"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-white dark:bg-slate-900 p-6 border-b-2 border-black dark:border-green-500 flex flex-col gap-6 md:hidden shadow-xl z-40">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-mono text-sm uppercase hover:text-ikb dark:text-gray-100 dark:hover:text-green-400 border-b border-gray-100 dark:border-gray-800 pb-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}