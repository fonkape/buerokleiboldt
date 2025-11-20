'use client';
import { useState } from 'react';
import Link from 'next/link';
import ModeToggle from './ModeToggle'; // Wird weiterhin importiert, aber nicht verwendet
import { useMode } from '@/context/ModeContext';

// 1. Die finale Logo SVG Komponente (Variante 2, y=48 fix)
const LogoSVG = ({ isCodeMode }: { isCodeMode: boolean }) => {
    // Farbe des Logos passt sich an (wird im Moment nicht genutzt, bleibt aber im Code)
    const color = isCodeMode ? '#22c55e' : '#002FA7';

    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="48" style={{fontFamily: 'IBM Plex Mono, monospace'}} fontWeight="700" fontSize="38" textAnchor="middle" fill={color} dominantBaseline="central">DK</text>

            {/* Klammer Design (Variante 2) */}
            <path d="M28 22 C 18 22, 18 22, 18 35 L 18 42 C 18 48, 12 50, 12 50 C 12 50, 18 52, 18 58 L 18 65 C 18 78, 18 78, 28 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke={color}/>
            <path d="M72 22 C 82 22, 82 22, 82 35 L 82 42 C 82 48, 88 50, 88 50 C 88 50, 82 52, 82 58 L 82 65 C 82 78, 82 78, 72 78" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" stroke={color}/>
        </svg>
    );
};

// Konstanten für den Header-Text
const SLOGAN_MAIN = "BÜRO FÜR LEGAL ENGINEERING";
const SLOGAN_SUB = "DANIEL KLEIBOLDT";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const { isCodeMode } = useMode(); // Muss nicht mehr destrukturiert werden

  const navItems = [
    { name: 'Use Cases', href: '#cases' },
    { name: 'Herausforderung', href: '#challenge' },
    { name: 'Lösung', href: '#services' },
    { name: 'Profil', href: '#profile' },
    { name: 'Kontakt', href: '#contact' },
  ];

  // Farben und Font-Styling aus den finalen Spezifikationen
  const SloganClassMain = "font-extrabold text-[14px] text-slate-700 dark:text-gray-300 tracking-[0.05em] uppercase";
  const SloganClassSub = "font-normal text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.05em] uppercase";

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-2 border-black dark:border-green-500/30 flex justify-between items-center px-6 md:px-12 h-24 transition-colors duration-500">

      {/* LOGO & SLOGAN (Links) */}
      <Link href="/" className="group flex items-center gap-4" aria-label="Homepage">

        {/* Logo SVG Container */}
        <div className="w-12 h-12 flex-shrink-0">
          {/* HINWEIS: Da isCodeMode jetzt auskommentiert ist, bleibt das Logo im IKB-Blau (Default) */}
          <LogoSVG isCodeMode={false} />
        </div>

        {/* Slogan Text (Dezenter) */}
        <div className="flex flex-col justify-center font-mono leading-tight">
             <span className={SloganClassMain}>{SLOGAN_MAIN}</span>
             <span className={SloganClassSub}>{SLOGAN_SUB}</span>
        </div>
      </Link>

      {/* CENTER: SWITCHER (TEMPORÄR ENTFERNT) */}
      {/* <div className="hidden md:block scale-90">
          <ModeToggle />
      </div> */}

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

      {/* MOBILE MENU BUTTON & SWITCH (TEMPORÄR ENTFERNT) */}
      <div className="flex items-center gap-4 md:hidden">
        {/* <div className="scale-75">
            <ModeToggle />
        </div> */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-mono text-xs uppercase font-bold dark:text-white"
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