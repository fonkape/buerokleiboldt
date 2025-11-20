'use client';
import { useState } from 'react';
import Link from 'next/link';
import ModeToggle from './ModeToggle'; // <--- Unser neuer Schalter

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Use Cases', href: '#cases' },
    { name: 'Herausforderung', href: '#challenge' },
    { name: 'Lösung', href: '#services' },
    { name: 'Profil', href: '#profile' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-2 border-black dark:border-green-500/30 flex justify-between items-center px-6 md:px-12 h-24 transition-colors duration-500">

      {/* LOGO */}
      <Link href="/" className="group" aria-label="Homepage">
        <div className="w-14 h-14 bg-ikb dark:bg-green-500 flex flex-col justify-end items-start p-1.5 hover:scale-105 transition-transform duration-300">
          <span className="text-white dark:text-slate-900 font-mono font-bold text-lg leading-none tracking-tighter">
            dk<span className="animate-blink">_</span>
          </span>
        </div>
      </Link>

      {/* CENTER: SWITCHER (Nur Desktop) */}
      <div className="hidden md:block scale-90">
          <ModeToggle />
      </div>

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

      {/* MOBILE MENU BUTTON & SWITCH */}
      <div className="flex items-center gap-4 md:hidden">
        <div className="scale-75">
            <ModeToggle />
        </div>
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