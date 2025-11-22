'use client';

import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitch from "@/components/LanguageSwitch";
import { motion } from "framer-motion";

export default function OrganicNavBar() {
    const { t } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/40 rounded-full shadow-sm px-6 py-3 flex justify-between items-center">

                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xl tracking-wide text-[#002FA7]">
                        &#123; dk &#125;
                    </span>
                    <span className="hidden md:block font-sans text-sm font-medium tracking-wide text-[#1A1A1A]/80 border-l border-[#1A1A1A]/20 pl-3 ml-1">
                        Daniel Kleiboldt <br />
                        <span className="text-xs text-[#1A1A1A]/50 uppercase tracking-widest">Büro für Legal Engineering</span>
                    </span>
                </div>

                {/* LINKS */}
                <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-[#1A1A1A]/80">
                    <a href="#solution" className="hover:text-[#002FA7] transition-colors">{t.nav.solution}</a>
                    <a href="#cases" className="hover:text-[#002FA7] transition-colors">{t.nav.cases}</a>
                    <a href="#profile" className="hover:text-[#002FA7] transition-colors">{t.nav.profile}</a>
                    <a href="#blog" className="hover:text-[#002FA7] transition-colors">{t.nav.blog}</a>
                    <a href="#contact" className="hover:text-[#002FA7] transition-colors">{t.nav.contact}</a>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-4">
                    <LanguageSwitch />
                    <div className="w-px h-4 bg-[#1A1A1A]/10"></div>
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
}
