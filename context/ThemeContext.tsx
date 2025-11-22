'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';
type Theme = 'swiss' | 'cyber' | 'organic';

// --- DAS WÖRTERBUCH ---
const translations = {
    de: {
        nav: {
            cases: "Use Cases",
            challenge: "Herausforderung",
            solution: "Lösung",
            profile: "Profil",
            contact: "Kontakt",
            blog: "Insights"
        },
        hero: {
            role: "/// JURIST, LEGAL ENGINEER & SOLUTIONS ARCHITECT",
            titlePart1: "Ihr Unternehmen will",
            titlePart2: "nutzen?",
            subtitle: "Aber Legal, IT und Business sprechen nicht dieselbe Sprache. Ich übersetze.",
            intro: "Rechtliche Compliance und technische Präzision sind keine Gegensätze. Sie sind zwei Seiten derselben Architektur. Ich bringe 10 Jahre juristische Expertise direkt in die Entwicklungsumgebung. Ich baue Systeme, die 'Compliant by Design' sind. Keine Workarounds. Keine Übersetzungsfehler.",
            cta: "Zu den Use Cases"
        },
        opportunity: {
            title: "Warum jetzt?",
            subtitle: "Das Potential für KMUs.",
            cards: [
                { title: "Smart Legal Contracts", text: "Automatisieren Sie Zahlungen und Lieferfreigaben. Verträge, die sich selbst ausführen – ohne manuellen Eingriff." },
                { title: "AI Compliance", text: "Nutzen Sie LLMs für interne Prozesse, ohne Geschäftsgeheimnisse zu leaken oder gegen die DSGVO zu verstoßen." },
                { title: "Asset Tokenization", text: "Machen Sie illiquide Firmenwerte (Maschinen, Immobilien) handelbar und erschließen Sie neue Finanzierungswege." }
            ],
            transition: "Aber hier liegt das Problem:",
            quote: "\"Die Technik ist bereit. Aber Ihre Abteilungen sprechen nicht dieselbe Sprache.\""
        },
        challenge: {
            title: "The Silo Trap.",
            subtitle: "Innovationsprojekte scheitern selten an der Technik. Sie scheitern an der Schnittstelle.",
            traps: [
                { text: "01. Legal blockiert.", quote: "ZU RISIKANT" },
                { text: "02. Code ohne Compliance.", quote: "ABMAHNUNG GARANTIERT" },
                { text: "03. Strategie ohne Return.", quote: "BUDGET VERBRANNT" }
            ],
            resultA: { title: "Innovations-Stopp", text: "Das Projekt wird aus Angst vor MiCA, AI Act oder DSGVO beerdigt, bevor es startet." },
            resultB: { title: "Teurer Re-Write", text: "Die Software ist fertig, darf aber so nicht live gehen. Code muss für 6-stellige Summen neu geschrieben werden." }
        },
        solution: {
            title: "Die Lösung: Symbiose",
            subtitle: "Ich löse die Silos auf.",
            me: "Me",
            arch: "Architect"
        },
        cases: {
            title: "/// Echte Szenarien",
            items: [
                {
                    id: "01",
                    title: "Der Mittelständler & das KI-Tool",
                    desc: "Mitarbeiter nutzten ChatGPT für Kundendaten. Lösung: Lokale LLM-Instanz (Llama) on-premise.",
                    tags: ["AI", "Privacy", "Compliance"]
                },
                {
                    id: "02",
                    title: "Supply Chain auf der Blockchain",
                    desc: "Logistik-Nachweise waren manipulierbar. Lösung: Permissioned Ledger (Hyperledger) Architektur.",
                    tags: ["Blockchain", "Supply Chain", "Audit"]
                },
                {
                    id: "03",
                    title: "Das Startup & die MiCA-Lizenz",
                    desc: "Tokenisierte Assets ohne Banklizenz geplant. Lösung: Hybrid-Architektur & Whitelisting (BaFin-konform).",
                    tags: ["FinTech", "Regulation", "MiCA"]
                },
                {
                    id: "04",
                    title: "Maschinenbau & Tokenisierung",
                    desc: "Kapital in teuren Maschinen gebunden. Lösung: eWpG-konforme Smart Contracts (Pay-per-Use).",
                    tags: ["Tokenization", "IoT", "Finance"]
                },
                {
                    id: "05",
                    title: "Klinik & KI-Arztbriefe",
                    desc: "Ärzte ertrinken in Bürokratie. Cloud-AI verboten. Lösung: Air-Gapped AI System für Datenschutz.",
                    tags: ["Health", "AI", "GDPR"]
                },
                {
                    id: "06",
                    title: "Immobilien & Due Diligence",
                    desc: "Prüfung von 5.000 Mietverträgen blockiert Verkauf. Lösung: Automatisierte Klausel-Extraktion & Risiko-Scoring.",
                    tags: ["Real Estate", "NLP", "Automation"]
                }
            ]
        },
        services: {
            supertitle: "/// MEINE KERNDIENSTLEISTUNGEN",
            title: "Das Architekten-Toolkit.",
            items: [
                {
                    title: "Feasibility Check",
                    content: "Ich prüfe Ihre AI/Blockchain-Initiativen auf rechtliche Stabilität, technische Umsetzbarkeit und kommerziellen Nutzen. Ziel ist die Eliminierung von Projekten mit hohem Haftungsrisiko oder unklarem ROI, bevor signifikante Ressourcen gebunden werden.",
                    pointsTitle1: "Kernleistung", points1: ["Go / No-Go Analyse basierend auf Risiko und ROI.", "Eliminierung von Projekten mit hohem Haftungsrisiko."],
                    pointsTitle2: "Methodik", points2: ["Rechtliches Screening (AI Act, MiCA, DSGVO).", "Technische Machbarkeitsstudie (Skalierbarkeit, Sicherheit).", "Business Case Validierung (Markt, Monetarisierung)."]
                },
                {
                    title: "Legal Engineering",
                    content: "Die Haftungsrisiken der digitalen Transformation werden in greifbare, technische Anforderungen überführt. Ich implementiere Compliance-Anforderungen (MiCA, AI Act, DSGVO) direkt in die Systemarchitektur – Compliance-by-Design statt nachträglicher Korrektur.",
                    pointsTitle1: "Kernleistung", points1: ["Übersetzen von Regulierung in Code-Spezifikationen.", "Compliance-by-Design als fester Bestandteil der Architektur."],
                    pointsTitle2: "Methodik", points2: ["Zerlegung juristischer Texte in atomare technische Regeln.", "Erstellung von Compliance-Flowcharts und Datenmodellen.", "Code-Audit mit juristischer Perspektive vor dem Deploy."]
                },
                {
                    title: "The Bridge",
                    content: "Gezielte Workshops und temporäre Projektleitung, um die Kommunikationssilos zwischen Abteilungen zu überbrücken. Das Ergebnis ist ein aligniertes, schnelles Projektteam, das alle Risiken und Chancen aus einer gemeinsamen Perspektive bewertet.",
                    pointsTitle1: "Kernleistung", points1: ["Synchronisation von Juristen, IT und Business.", "Reduzierung von Missverständnissen und Projektverzögerungen."],
                    pointsTitle2: "Methodik", points2: ["Vocabulary Alignment-Workshops.", "Moderation von Risiko-Sprints.", "Etablierung eines einheitlichen Dokumentationsstandards."]
                }
            ]
        },
        profile: {
            subtitle: "/// About Me",
            title1: "Kein Anwalt.",
            title2: "Kein reiner Coder.",
            title3: "Der Übersetzer.",
            text1: "Diplom-Jurist (41). 10 Jahre Corporate Law. Jetzt Software Engineer.",
            text2: "Ich verstehe den Code und das Gesetzbuch. Ich bin Ihr Solutions Architect für die grauen Zonen der Digitalisierung."
        },
        techstack: {
            title: "Tech Stack & Zertifizierungen",
            subtitle: "Meine Werkzeuge für robuste Legal Engineering Lösungen.",
            certs: [
                { icon: "fa-certificate", title: "TÜV Rheinland", subtitle: "Smart Contract Auditor" },
                { icon: "fa-university", title: "Legal Tech", subtitle: "LL.M. / Strategist" },
                { icon: "fa-cube", title: "Blockchain", subtitle: "Solidity Developer" }
            ]
        },
        blog: {
            subtitle: "/// INSIGHTS",
            title: "Legal Tech Logbuch",
            desc: "Gedanken zu Smart Contracts, AI Regulation und der Zukunft des Rechts.",
            read: "Artikel lesen"
        },
        footer: {
            subtitle: "/// Let's start",
            title: "Genug Theorie.",
            button: "Feasibility Check anfragen",
            sending: "Wird gesendet...",
            successTitle: "Nachricht gesendet!",
            successText: "Ich melde mich in Kürze bei Ihnen.",
            placeholderName: "Ihr Name",
            placeholderMail: "Ihre E-Mail",
            placeholderMsg: "Worum geht es?",
            credit: "Engineered with Next.js & Tailwind."
        },
        organic: {
            hero: {
                badge: "Legal Engineering",
                title: "Innovation without the Handbrake.",
                subtitle: "Ihre Entwickler wollen bauen. Ihre Anwälte sehen Risiken. Ich überbrücke die Lücke zwischen agiler Tech und starrem Recht.",
                cta: "Lösung entdecken"
            },
            problem: {
                title: "Die Innovations-Falle",
                subtitle: "Warum 80% der Legal Tech Projekte scheitern.",
                text: "Kanzleien kaufen Software, aber keine Prozesse. IT-Abteilungen verstehen das Recht nicht. Das Ergebnis: Teure Tools, die niemand nutzt. Ich schließe diese Lücke.",
                cards: [
                    { title: "Silo-Denken", desc: "Anwälte und Entwickler sprechen verschiedene Sprachen." },
                    { title: "Tool-Fokus", desc: "Technologie ohne Strategie ist nur Kostenfaktor." },
                    { title: "Risiko-Aversion", desc: "Compliance als Bremse statt als Leitplanke." }
                ]
            },
            solution: {
                label: "Mein Ansatz",
                title: "Vom Gutachten zum System",
                text: "Ich liefere keine PDF-Konzepte. Ich baue funktionierende Prototypen, auditiere Ihre Smart Contracts und architektoniere Ihre Compliance-Pipeline."
            },
            trust: {
                title: "Der Übersetzer",
                text: "Mit einem Hintergrund in Jura (Prädikatsexamen) und Informatik (Full Stack Dev) spreche ich beide Sprachen fließend. Ich bin der Missing Link zwischen Ihrer Partnerschaft und Ihrer IT.",
                role: "Legal Engineer & Gründer",
                certExpertise: {
                    title: "Zertifizierte Expertise",
                    text: "TÜV-zertifizierter Smart Contract Auditor und Legal Tech Strategist."
                },
                smeFocus: {
                    title: "Mittelstands-Fokus",
                    text: "Spezialisiert auf die pragmatische Digitalisierung des deutschen Mittelstands."
                }
            },
            contact: {
                title: "Lassen Sie uns bauen.",
                subtitle: "Kein Sales-Call. Ein technisches Erstgespräch über Ihre Architektur."
            }
        }
    },
    en: {
        nav: {
            solution: "Solution",
            cases: "Use Cases",
            profile: "Profile",
            blog: "Logbook",
            contact: "Contact",
            challenge: "Challenge" // Added to satisfy type if needed, though not used in Organic
        },
        hero: {
            role: "/// LEGAL ENGINEER",
            titlePart1: "Law",
            titlePart2: "Code",
            subtitle: "The bridge between complex law and scalable code.",
            intro: "I transform complex legal requirements into scalable technical systems. For firms that want to lead.",
            cta: "Explore Toolkit"
        },
        opportunity: {
            title: "Why Legal Engineering?",
            subtitle: "The SME Opportunity",
            cards: [
                { title: "Efficiency", text: "Automate repetitive tasks and reduce overhead." },
                { title: "Compliance", text: "Built-in regulatory adherence for your systems." },
                { title: "Innovation", text: "New business models enabled by tech." }
            ],
            transition: "The Problem:",
            quote: "Tech is ready. Culture is not."
        },
        challenge: {
            title: "The Silo Trap",
            subtitle: "Why projects fail.",
            traps: [
                { text: "Legal says No", quote: "RISK" },
                { text: "Dev says Yes", quote: "BUG" },
                { text: "Biz says Maybe", quote: "COST" }
            ],
            resultA: { title: "Stop", text: "Project dead." },
            resultB: { title: "Rewrite", text: "Expensive fix." }
        },
        solution: {
            title: "Symbiosis",
            subtitle: "Breaking Silos.",
            me: "Me",
            arch: "Architect"
        },
        cases: {
            title: "Use Cases",
            items: [
                { id: "01", title: "Automated NDA", desc: "Zero-touch workflow for standard agreements.", tags: ["Automation", "Contract"] },
                { id: "02", title: "Tokenization Platform", desc: "Legally compliant asset tokenization.", tags: ["Web3", "Finance"] },
                { id: "03", title: "AI Due Diligence", desc: "Custom LLM pipeline for contract review.", tags: ["AI", "NLP"] },
                { id: "04", title: "GDPR Dashboard", desc: "Real-time compliance monitoring.", tags: ["Privacy", "Dashboard"] },
                { id: "05", title: "DAO Governance", desc: "Legal wrapper for decentralized orgs.", tags: ["Web3", "Corporate"] },
                { id: "06", title: "IP Licensing", desc: "Automated royalty distribution via smart contracts.", tags: ["IP", "Smart Contracts"] }
            ]
        },
        services: {
            supertitle: "/// CORE SERVICES",
            title: "The Architect's Toolkit",
            items: [
                {
                    title: "Smart Contract Audit",
                    content: "I verify your on-chain logic against legal requirements and security vulnerabilities.",
                    pointsTitle1: "Security",
                    points1: ["Reentrancy Checks", "Gas Optimization", "Access Control"],
                    pointsTitle2: "Legal Compliance",
                    points2: ["MiCA Conformity", "GDPR Logic", "Liability Wrapper"]
                },
                {
                    title: "Legal Architecture",
                    content: "I design system architectures that are compliant by default.",
                    pointsTitle1: "Design",
                    points1: ["Data Privacy Patterns", "Regulatory APIs", "Audit Trails"],
                    pointsTitle2: "Strategy",
                    points2: ["Tech Stack Selection", "Vendor Due Diligence", "Scalability"]
                },
                {
                    title: "The Bridge",
                    content: "I translate between your legal department and your dev team.",
                    pointsTitle1: "Translation",
                    points1: ["Req. Engineering", "Spec Writing", "Stakeholder Mgmt"],
                    pointsTitle2: "Education",
                    points2: ["Workshops", "Documentation", "Training"]
                }
            ]
        },
        profile: {
            subtitle: "/// About Me",
            title1: "Not a lawyer.",
            title2: "Not just a coder.",
            title3: "The Translator.",
            text1: "Diploma Jurist. 10 years Law. Now Dev.",
            text2: "I understand code and law."
        },
        techstack: {
            title: "Tech Stack & Certifications",
            subtitle: "My tools for robust Legal Engineering solutions.",
            certs: [
                { icon: "fa-certificate", title: "TÜV Rheinland", subtitle: "Smart Contract Auditor" },
                { icon: "fa-university", title: "Legal Tech", subtitle: "LL.M. / Strategist" },
                { icon: "fa-cube", title: "Blockchain", subtitle: "Solidity Developer" }
            ]
        },
        blog: {
            subtitle: "/// INSIGHTS",
            title: "Legal Tech Logbook",
            desc: "Thoughts on Smart Contracts, AI Regulation, and the future of law.",
            read: "Read Article"
        },
        footer: {
            subtitle: "/// Let's start",
            title: "Enough theory.",
            button: "Request Check",
            sending: "Sending...",
            successTitle: "Sent!",
            successText: "I'll be in touch.",
            placeholderName: "Name",
            placeholderMail: "Email",
            placeholderMsg: "Message",
            credit: "Engineered with Next.js."
        },
        organic: {
            hero: {
                badge: "Legal Engineering",
                title: "Law, built for the future.",
                subtitle: "I transform complex legal requirements into scalable technical systems. For firms that want to lead.",
                cta: "Discover Solution"
            },
            problem: {
                title: "The Innovation Trap",
                subtitle: "Why 80% of Legal Tech projects fail.",
                text: "Firms buy software, not processes. IT departments don't understand the law. The result: Expensive tools nobody uses. I bridge this gap.",
                cards: [
                    { title: "Silo Thinking", desc: "Lawyers and devs speak different languages." },
                    { title: "Tool Focus", desc: "Tech without strategy is just a cost center." },
                    { title: "Risk Aversion", desc: "Compliance as a blocker instead of a guardrail." }
                ]
            },
            solution: {
                label: "My Approach",
                title: "From Opinion to System",
                text: "I don't deliver PDF concepts. I build working prototypes, audit your smart contracts, and architect your compliance pipeline."
            },
            trust: {
                title: "The Translator",
                text: "With a background in Law (Honors) and CS (Full Stack Dev), I speak both languages fluently. I am the missing link between your partnership and your IT.",
                role: "Legal Engineer & Founder",
                certExpertise: {
                    title: "Certified Expertise",
                    text: "TÜV-certified Smart Contract Auditor and Legal Tech Strategist."
                },
                smeFocus: {
                    title: "SME Focus",
                    text: "Specialized in pragmatic digitalization for the German Mittelstand."
                }
            },
            contact: {
                title: "Let's build.",
                subtitle: "No sales call. A technical initial discussion about your architecture."
            }
        }
    }
};

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isCodeMode: boolean;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.de;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('swiss');
    const [language, setLanguage] = useState<Language>('de');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedLang = localStorage.getItem('language') as Language;

        if (savedTheme && ['swiss', 'cyber', 'organic'].includes(savedTheme)) {
            setTheme(savedTheme);
        }
        if (savedLang && ['de', 'en'].includes(savedLang)) {
            setLanguage(savedLang);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('theme', theme);
        localStorage.setItem('language', language);

        document.documentElement.setAttribute('data-theme', theme);

        // Cyber uses dark mode tailwind classes
        if (theme === 'cyber') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, language, mounted]);

    const isCodeMode = theme === 'cyber';
    const t = translations[language];

    // Removed the early return to ensure Context is always available
    // if (!mounted) {
    //   return <>{children}</>;
    // }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isCodeMode, language, setLanguage, t }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
