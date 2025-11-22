'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function OrganicTechStack() {
    const { t } = useTheme();

    const categories = [
        { name: "Languages", items: ["Python", "Solidity", "TypeScript", "SQL"], color: "bg-orange-50 border-orange-200" },
        { name: "Infrastructure", items: ["AWS", "Docker", "Terraform", "Kubernetes"], color: "bg-blue-50 border-blue-200" },
        { name: "AI Core", items: ["Llama 3", "LangChain", "PyTorch", "RAG"], color: "bg-green-50 border-green-200" },
        { name: "Web3", items: ["Ethereum", "Hyperledger", "Hardhat", "IPFS"], color: "bg-purple-50 border-purple-200" }
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-serif mb-4">{t.techstack.title}</h2>
                    <p className="text-lg text-[#1A1A1A]/60 max-w-2xl mx-auto">{t.techstack.subtitle}</p>
                </div>

                {/* Static Grid Layout */}
                <div className="grid md:grid-cols-4 gap-8 mb-24">
                    {categories.map((cat, i) => (
                        <div key={i} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                            <h3 className="font-bold mb-6 text-[#002FA7] uppercase tracking-widest text-xs border-b border-gray-200 pb-2">{cat.name}</h3>
                            <ul className="space-y-3">
                                {cat.items.map((item, k) => (
                                    <li key={k} className="text-sm text-[#1A1A1A] font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Certs Row */}
                <div className="grid md:grid-cols-3 gap-8">
                    {t.techstack.certs.map((cert, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 rounded-xl border border-gray-200 hover:border-[#002FA7] transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-[#002FA7]/5 flex items-center justify-center text-xl text-[#002FA7] group-hover:bg-[#002FA7] group-hover:text-white transition-colors">
                                <i className={`fab ${cert.icon} ${cert.icon === 'fa-cube' ? 'fas' : ''}`}></i>
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">{cert.title}</h4>
                                <p className="text-xs uppercase tracking-widest text-gray-500">{cert.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
