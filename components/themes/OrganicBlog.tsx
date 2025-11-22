'use client';

import { useTheme } from '@/context/ThemeContext';

export default function OrganicBlog() {
    const { t } = useTheme();

    // Placeholder data for blog posts (can be moved to translations later if needed)
    const posts = [
        {
            category: "Smart Contracts",
            date: "Nov 2024",
            title: "Smart Contracts sind keine Verträge (und das ist ein Problem).",
            excerpt: "Wenn Code Law ist, wer haftet für Bugs? Warum wir hybride Governance-Modelle brauchen, die juristische Sicherheit mit technischer Unveränderlichkeit verbinden.",
            link: "#",
            active: true
        },
        {
            category: "Regulation",
            date: "Coming Soon",
            title: "MiCA für den Mittelstand.",
            excerpt: "Was die Markets in Crypto Assets Regulation für deutsche KMUs bedeutet und wie man sich vorbereitet.",
            link: "#",
            active: false
        }
    ];

    return (
        <section id="blog" className="py-32 px-6 bg-[#F5F5F0]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-5xl font-serif mb-4 text-[#1A1A1A]">{t.blog.title}</h2>
                        <p className="text-lg text-[#1A1A1A]/60 max-w-xl">{t.blog.desc}</p>
                    </div>
                    <a href="https://linkedin.com" target="_blank" className="text-[#002FA7] font-bold tracking-widest uppercase text-sm hover:underline">
                        View all on LinkedIn <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                    {posts.map((post, i) => (
                        <article key={i} className={`group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${post.active ? 'hover:shadow-xl hover:border-[#002FA7]/20' : 'opacity-60 grayscale'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${post.active ? 'text-[#002FA7] bg-[#002FA7]/5' : 'text-gray-500 bg-gray-100'}`}>{post.category}</span>
                                <span className="text-xs text-gray-400 font-mono">{post.date}</span>
                            </div>
                            <h3 className={`text-2xl font-serif mb-4 leading-tight ${post.active ? 'group-hover:text-[#002FA7]' : ''} transition-colors`}>
                                {post.title}
                            </h3>
                            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>
                            {post.active ? (
                                <a href={post.link} className="inline-flex items-center text-sm font-bold text-[#1A1A1A] group-hover:text-[#002FA7] transition-colors">
                                    {t.blog.read} <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                                </a>
                            ) : (
                                <span className="inline-flex items-center text-sm font-bold text-gray-400 cursor-not-allowed">
                                    Coming Soon
                                </span>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
