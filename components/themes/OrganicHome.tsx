'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import OrganicNavBar from "@/components/themes/OrganicNavBar";
import OrganicToolkit from "@/components/themes/OrganicToolkit";
import ContactForm from "@/components/ContactForm";
import OrganicUseCases from "@/components/themes/OrganicUseCases";
import OrganicTechStack from "@/components/themes/OrganicTechStack";
import OrganicBlog from "@/components/themes/OrganicBlog";

export default function OrganicHome() {
    const { t } = useTheme();

    return (
        <main className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] selection:bg-blue-200 selection:text-black font-sans transition-colors duration-500">
            <OrganicNavBar />

            {/* 1. HERO SECTION: The "Flow" */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200/30 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-[#1A1A1A]/10 bg-white/50 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-8 text-[#002FA7]">
                            {t.organic.hero.badge}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif font-medium leading-tight mb-8 text-[#1A1A1A]">
                            {t.organic.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                            {t.organic.hero.subtitle}
                        </p>

                        <motion.a
                            href="#solution"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#F5F5F0] rounded-full text-sm font-bold tracking-widest hover:bg-[#002FA7] transition-colors shadow-lg"
                        >
                            {t.organic.hero.cta} <i className="fas fa-arrow-down"></i>
                        </motion.a>
                    </motion.div>
                </div>
            </header>

            {/* 2. THE PROBLEM: "The Innovation Trap" */}
            <section className="py-32 px-6 relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-serif mb-8 leading-tight">
                            {t.organic.problem.title}
                        </h2>
                        <p className="text-lg text-[#1A1A1A]/80 leading-relaxed mb-6">
                            {t.organic.problem.subtitle}
                        </p>
                        <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
                            {t.organic.problem.text}
                        </p>
                    </motion.div>

                    <div className="grid gap-6">
                        {t.organic.problem.cards.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#002FA7] text-xl shrink-0">
                                        <i className={`fas ${i === 0 ? 'fa-brain' : i === 1 ? 'fa-link' : 'fa-user-shield'}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                                        <p className="text-sm text-[#1A1A1A]/60">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SME POTENTIAL (NEW SECTION) */}
            <section className="py-24 px-6 bg-white/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4">{t.opportunity.subtitle}</h2>
                        <p className="text-[#1A1A1A]/60">{t.opportunity.title}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {t.opportunity.cards.map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="text-[#002FA7] text-3xl mb-6">
                                    {i === 0 && <i className="fas fa-file-contract"></i>}
                                    {i === 1 && <i className="fas fa-robot"></i>}
                                    {i === 2 && <i className="fas fa-coins"></i>}
                                </div>
                                <h3 className="font-serif text-xl mb-4">{card.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE SOLUTION: Toolkit (ACCORDION) */}
            <section id="solution" className="py-32 px-6 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#002FA7] font-bold tracking-widest text-xs uppercase mb-4 block">{t.organic.solution.label}</span>
                        <h2 className="text-5xl md:text-6xl font-serif mb-6">{t.organic.solution.title}</h2>
                        <p className="text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto">
                            {t.organic.solution.text}
                        </p>
                    </div>

                    {/* Toolkit System Integration */}
                    <OrganicToolkit />
                </div>
            </section>

            {/* 5. USE CASES (NEW CREATIVE LAYOUT) */}
            <OrganicUseCases />

            {/* 6. TRUST / ABOUT */}
            <section id="profile" className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-[#1A1A1A] text-[#F5F5F0] rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-serif mb-6">{t.organic.trust.title}</h2>
                            <div className="w-20 h-1 bg-[#002FA7] mb-8"></div>
                            <p className="text-lg text-white/80 leading-relaxed mb-8">
                                {t.organic.trust.text}
                            </p>
                            <div className="flex items-center gap-4">
                                <img src="/me.jpg" alt="Daniel Kleiboldt" className="w-16 h-16 rounded-full object-cover border-2 border-[#002FA7]" />
                                <div>
                                    <p className="font-bold text-white">Daniel Kleiboldt</p>
                                    <p className="text-sm text-white/50 uppercase tracking-widest">{t.organic.trust.role}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                                <h3 className="text-[#4D7CFF] font-bold mb-2">{t.organic.trust.certExpertise.title}</h3>
                                <p className="text-sm text-white/70">{t.organic.trust.certExpertise.text}</p>
                            </div>
                            <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                                <h3 className="text-[#4D7CFF] font-bold mb-2">{t.organic.trust.smeFocus.title}</h3>
                                <p className="text-sm text-white/70">{t.organic.trust.smeFocus.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. TECH STACK (STATIC) */}
            <OrganicTechStack />

            {/* 8. BLOG (NEW) */}
            <OrganicBlog />

            {/* 9. CONTACT */}
            <footer id="contact" className="py-32 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-serif mb-8">{t.organic.contact.title}</h2>
                    <p className="text-xl text-[#1A1A1A]/60 mb-12">
                        {t.organic.contact.subtitle}
                    </p>

                    <div className="bg-[#F5F5F0] p-8 md:p-12 rounded-3xl shadow-lg max-w-2xl mx-auto text-left border border-gray-100">
                        <ContactForm />
                    </div>

                    <div className="mt-16 flex justify-center gap-8 opacity-50">
                        <a href="#" className="hover:text-[#002FA7] transition-colors"><i className="fab fa-linkedin text-2xl"></i></a>
                        <a href="#" className="hover:text-[#002FA7] transition-colors"><i className="fab fa-github text-2xl"></i></a>
                        <a href="#" className="hover:text-[#002FA7] transition-colors"><i className="fab fa-twitter text-2xl"></i></a>
                    </div>
                    <p className="mt-8 text-xs text-[#1A1A1A]/40 uppercase tracking-widest">
                        &copy; 2025 Daniel Kleiboldt. Legal Engineering.
                    </p>
                </div>
            </footer>
        </main>
    );
}
