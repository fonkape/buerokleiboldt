'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

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
      role: "/// Legal Engineer & Solutions Architect",
      titlePart1: "Ihr Unternehmen will",
      titlePart2: "nutzen?",
      subtitle: "Ich übersetze zwischen Rechtsabteilung, IT und Management.",
      intro: "Wenn Ihr Unternehmen AI oder Blockchain einsetzen will, prallen Welten aufeinander. Ich löse die 'Lost in Translation'-Probleme. Für Innovation, die rechtssicher ist und Code, der Business-Ziele erfüllt.",
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
        { id: "01", title: "Der Mittelständler & das KI-Tool", hook: "Mitarbeiter nutzten ChatGPT für Kundendaten.", solution: "Lokale LLM-Instanz (Llama) on-premise.",
          story: {
             conflict: { title: "Der Datenschutz-GAU", text: "Der Vorstand wollte Innovation, aber der Datenschutzbeauftragte drohte mit Kündigung. Sensible Kundendaten landeten auf US-Servern. Das Projekt stand vor dem sofortigen Stopp." },
             turning: { title: "The Safe Room", text: "Wir isolierten die Intelligenz. Aufbau einer lokalen Open-Source LLM-Architektur (Llama 3). Kein Byte verlässt das Firmennetzwerk. Die AI lernt nur von internen Daten." },
             resolution: { title: "Souveräne Innovation", text: "Rechtsabteilung gibt grünes Licht. Produktivität steigt um 40%, ohne Compliance-Risiko. Das Unternehmen besitzt nun seine eigene AI-Infrastruktur." }
          }
        },
        { id: "02", title: "Supply Chain auf der Blockchain", hook: "Logistik-Nachweise waren manipulierbar.", solution: "Permissioned Ledger (Hyperledger) Architektur.",
          story: {
             conflict: { title: "Black Box Logistik", text: "Papiernachweise gingen verloren, Lieferanten fälschten Herkunftszertifikate. Bei Rückrufaktionen herrschte blindes Chaos und Haftungsrisiko für den CEO." },
             turning: { title: "The Immutable Ledger", text: "Implementierung eines Hyperledger Fabric Netzwerks. Nur verifizierte Partner erhalten Schreibrechte. Ein Smart Contract validiert jeden Handgriff automatisch." },
             resolution: { title: "Trust Protocol", text: "Lückenlose Nachweisbarkeit in Sekunden statt Wochen. Versicherungsprämien sanken um 15%, da das Manipulationsrisiko technisch eliminiert wurde." }
          }
        },
        { id: "03", title: "Das Startup & die MiCA-Lizenz", hook: "Tokenisierte Assets ohne Banklizenz geplant.", solution: "Hybrid-Architektur & Whitelisting (BaFin-konform).",
          story: {
             conflict: { title: "Die Regulierungs-Mauer", text: "Ein FinTech wollte Immobilienanteile tokenisieren. Die BaFin stufte das Modell als erlaubnispflichtiges Bankgeschäft ein. Drohende Insolvenz vor Launch." },
             turning: { title: "The Regulatory Hack", text: "Umbau der Architektur: Der Token dient nur als technischer Träger, nicht als Währung. Einbau einer Whitelist-Funktion im Smart Contract, die nur KYC-geprüfte Investoren zulässt." },
             resolution: { title: "License to Operate", text: "Das Modell fiel unter eine leichtere Lizenzklasse. Der Launch erfolgte pünktlich, vollkommen MiCA-konform und rechtssicher." }
          }
        },
        { id: "04", title: "Maschinenbau & Tokenisierung", hook: "Kapital in teuren Maschinen gebunden.", solution: "eWpG-konforme Smart Contracts (Pay-per-Use).",
          story: {
             conflict: { title: "Frozen Capital", text: "Ein Mittelständler hatte 20 Mio. € in Maschinen gebunden. Banken waren zu langsam für neue Kredite. Das Wachstum war durch das eigene Anlagevermögen blockiert." },
             turning: { title: "Liquid Iron", text: "Rechtliche Konstruktion der Maschinen als digitales Wertpapier nach eWpG. Technisches Mapping der Maschinen-ID auf Ethereum-Token." },
             resolution: { title: "Instant Liquidity", text: "Verkauf von 20% der Maschinen-Token an Investoren. 4 Mio. € Liquidität in 2 Wochen generiert, ohne die Maschinen zu bewegen." }
          }
        },
        { id: "05", title: "Klinik & KI-Arztbriefe", hook: "Ärzte ertrinken in Bürokratie. Cloud-AI verboten.", solution: "Air-Gapped AI System für Datenschutz (Art. 9 DSGVO).",
          story: {
             conflict: { title: "Burnout durch Bürokratie", text: "Ärzte verbrachten 4 Stunden täglich mit Entlassbriefen statt mit Patienten. Cloud-AI war aufgrund von Art. 9 DSGVO (Gesundheitsdaten) streng verboten." },
             turning: { title: "The Air-Gapped Brain", text: "Training eines medizinischen Sprachmodells auf einem isolierten Server im Krankenhauskeller. Keine Internetverbindung, physische Zugangskontrolle." },
             resolution: { title: "Healing Focus", text: "Entlassbriefe werden in Sekunden vorformuliert. Ärzte gewinnen 30% Zeit für Patienten zurück. Datenschutz-Audit mit Bestnoten bestanden." }
          }
        },
        { id: "06", title: "Immobilien & Due Diligence", hook: "Prüfung von 5.000 Mietverträgen blockiert Verkauf.", solution: "Automatisierte Klausel-Extraktion & Risiko-Scoring.",
          story: {
             conflict: { title: "Data Paralysis", text: "Ein Portfolio-Verkauf drohte zu platzen, weil 20 Anwälte Monate brauchten, um 5.000 gewerbliche Mietverträge auf 'Change of Control'-Klauseln zu prüfen." },
             turning: { title: "The Silicon Associate", text: "Einsatz einer spezialisierten NLP-AI, trainiert auf deutsches Mietrecht. Extraktion und Risiko-Scoring aller Klauseln über Nacht." },
             resolution: { title: "Velocity Deal", text: "Die Due Diligence war in 48 Stunden fertig statt in 3 Monaten. Der Deal wurde erfolgreich geschlossen, massive Beraterkosten gespart." }
          }
        }
      ]
    },
    services: {
      supertitle: "/// MEINE KERNDIENSTLEISTUNGEN",
      title: "Das Architekten-Toolkit.",
      items: [
        {
            title: "Feasibility Check",
            content: "Wir prüfen Ihre AI/Blockchain-Initiativen auf rechtliche Stabilität, technische Umsetzbarkeit und kommerziellen Nutzen. Ziel ist die Eliminierung von Projekten mit hohem Haftungsrisiko oder unklarem ROI, bevor signifikante Ressourcen gebunden werden.",
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
        title: "Tech Stack & Certs",
        subtitle: "Nicht nur Theorie. Handfeste technische Qualifikation und tägliche Werkzeuge."
    },
    blog: {
        subtitle: "/// INSIGHTS",
        title: "Legal Tech Logbuch.",
        desc: "Gedanken an der Schnittstelle. Praxisnah, ohne Juristendeutsch.",
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
    }
  },
  en: {
    nav: {
      cases: "Use Cases",
      challenge: "The Challenge",
      solution: "Solution",
      profile: "Profile",
      contact: "Contact",
      blog: "Insights"
    },
    hero: {
      role: "/// Legal Engineer & Solutions Architect",
      titlePart1: "Your company wants to use",
      titlePart2: "?",
      subtitle: "I translate between Legal, IT, and Management.",
      intro: "When your company wants to deploy AI or Blockchain, worlds collide. I solve 'Lost in Translation' issues. for innovation that is legally compliant and code that meets business goals.",
      cta: "View Use Cases"
    },
    opportunity: {
      title: "Why now?",
      subtitle: "The potential for SMEs.",
      cards: [
        { title: "Smart Legal Contracts", text: "Automate payments and delivery approvals. Contracts that execute themselves – without manual intervention." },
        { title: "AI Compliance", text: "Use LLMs for internal processes without leaking trade secrets or violating GDPR." },
        { title: "Asset Tokenization", text: "Make illiquid assets (machinery, real estate) tradable and unlock new financing channels." }
      ],
      transition: "But here is the problem:",
      quote: "\"The technology is ready. But your departments don't speak the same language.\""
    },
    challenge: {
      title: "The Silo Trap.",
      subtitle: "Innovation projects rarely fail due to technology. They fail at the interface.",
      traps: [
        { text: "01. Legal blocking.", quote: "TOO RISKY" },
        { text: "02. Code without Compliance.", quote: "GUARANTEED FINES" },
        { text: "03. Strategy without Return.", quote: "BUDGET BURNED" }
      ],
      resultA: { title: "Innovation Stop", text: "The project is buried out of fear of MiCA, AI Act, or GDPR before it even starts." },
      resultB: { title: "Expensive Re-Write", text: "The software is ready but cannot go live. Code has to be rewritten for six-figure sums." }
    },
    solution: {
      title: "The Solution: Symbiosis",
      subtitle: "I break down the silos.",
      me: "Me",
      arch: "Architect"
    },
    cases: {
      title: "/// Real Scenarios",
      items: [
        { id: "01", title: "The SME & The AI Tool", hook: "Employees used ChatGPT for client data.", solution: "Local LLM Instance (Llama) on-premise.",
          story: {
             conflict: { title: "The Data Privacy Disaster", text: "The board wanted innovation, but the DPO threatened resignation. Sensitive client data ended up on US servers. The project faced an immediate stop." },
             turning: { title: "The Safe Room", text: "We isolated the intelligence. Building a local Open-Source LLM architecture (Llama 3). No byte leaves the company network. The AI learns only from internal data." },
             resolution: { title: "Sovereign Innovation", text: "Legal gave the green light. Productivity up by 40% without compliance risks. The company now owns its AI infrastructure." }
          }
        },
        { id: "02", title: "Supply Chain on Blockchain", hook: "Logistics records were manipulatable.", solution: "Permissioned Ledger (Hyperledger) Architecture.",
          story: {
             conflict: { title: "Black Box Logistics", text: "Paper records were lost, suppliers forged origin certificates. Recalls caused blind chaos and liability risks for the CEO." },
             turning: { title: "The Immutable Ledger", text: "Implementation of a Hyperledger Fabric network. Only verified partners get write access. A smart contract validates every move automatically." },
             resolution: { title: "Trust Protocol", text: "Gapless traceability in seconds instead of weeks. Insurance premiums dropped by 15% as manipulation risk was technically eliminated." }
          }
        },
        { id: "03", title: "The Startup & MiCA License", hook: "Tokenized assets planned without banking license.", solution: "Hybrid Architecture & Whitelisting (BaFin-compliant).",
          story: {
             conflict: { title: "The Regulatory Wall", text: "A FinTech wanted to tokenize real estate shares. The regulator classified the model as requiring a banking license. Insolvency loomed before launch." },
             turning: { title: "The Regulatory Hack", text: "Architecture pivot: The token serves only as a technical carrier, not currency. Integrated whitelist function in the smart contract allowing only KYC-verified investors." },
             resolution: { title: "License to Operate", text: "The model fell under a lighter license class. Launch was on time, fully MiCA compliant and legally secure." }
          }
        },
        { id: "04", title: "Engineering & Tokenization", hook: "Capital tied up in expensive machinery.", solution: "eWpG-compliant Smart Contracts (Pay-per-Use).",
          story: {
             conflict: { title: "Frozen Capital", text: "A manufacturer had €20M tied up in machinery. Banks were too slow for new loans. Growth was blocked by their own assets." },
             turning: { title: "Liquid Iron", text: "Legal construction of machines as digital securities. Technical mapping of Machine IDs to Ethereum tokens." },
             resolution: { title: "Instant Liquidity", text: "Sold 20% of machine tokens to investors. Generated €4M liquidity in 2 weeks without moving the machines." }
          }
        },
        { id: "05", title: "Clinic & AI Medical Letters", hook: "Doctors drowning in bureaucracy. Cloud AI banned.", solution: "Air-Gapped AI System for Privacy (GDPR Art. 9).",
          story: {
             conflict: { title: "Burnout by Bureaucracy", text: "Doctors spent 4 hours daily on discharge letters instead of patients. Cloud AI was strictly forbidden due to GDPR Art. 9 (health data)." },
             turning: { title: "The Air-Gapped Brain", text: "Training a medical language model on an isolated server in the hospital basement. No internet connection, physical access control." },
             resolution: { title: "Healing Focus", text: "Discharge letters are pre-drafted in seconds. Doctors gain 30% time back for patients. Privacy audit passed with flying colors." }
          }
        },
        { id: "06", title: "Real Estate & Due Diligence", hook: "Reviewing 5,000 contracts blocking sale.", solution: "Automated Clause Extraction & Risk Scoring.",
          story: {
             conflict: { title: "Data Paralysis", text: "A portfolio sale threatened to burst because 20 lawyers needed months to check 5,000 commercial leases for 'Change of Control' clauses." },
             turning: { title: "The Silicon Associate", text: "Deployment of specialized NLP AI, trained on tenancy law. Extraction and risk scoring of all clauses overnight." },
             resolution: { title: "Velocity Deal", text: "Due diligence finished in 48 hours instead of 3 months. The deal closed successfully, massive consulting fees saved." }
          }
        }
      ]
    },
    services: {
      supertitle: "/// MY CORE SERVICES",
      title: "The Architect's Toolkit.",
      items: [
        {
            title: "Feasibility Check",
            content: "We audit your AI/Blockchain initiatives for legal stability, technical feasibility, and commercial viability. The goal is to eliminate projects with high liability risk or unclear ROI before significant resources are committed.",
            pointsTitle1: "Core Service", points1: ["Go / No-Go Analysis based on risk and ROI.", "Elimination of high-liability projects."],
            pointsTitle2: "Methodology", points2: ["Legal Screening (AI Act, MiCA, GDPR).", "Technical Feasibility Study (Scalability, Security).", "Business Case Validation (Market, Monetization)."]
        },
        {
            title: "Legal Engineering",
            content: "Digital transformation liability risks are translated into tangible technical requirements. I implement compliance requirements (MiCA, AI Act, GDPR) directly into the system architecture – Compliance-by-Design instead of retrospective correction.",
            pointsTitle1: "Core Service", points1: ["Translating regulation into code specifications.", "Compliance-by-Design as a fixed part of the architecture."],
            pointsTitle2: "Methodology", points2: ["Decomposition of legal texts into atomic technical rules.", "Creation of compliance flowcharts and data models.", "Code audit with legal perspective before deploy."]
        },
        {
            title: "The Bridge",
            content: "Targeted workshops and interim project management to bridge communication silos between departments. The result is an aligned, fast project team that evaluates all risks and opportunities from a shared perspective.",
            pointsTitle1: "Core Service", points1: ["Synchronization of Legal, IT, and Business.", "Reduction of misunderstandings and project delays."],
            pointsTitle2: "Methodology", points2: ["Vocabulary Alignment Workshops.", "Moderation of Risk Sprints.", "Establishment of a unified documentation standard."]
        }
      ]
    },
    profile: {
      subtitle: "/// About Me",
      title1: "Not a lawyer.",
      title2: "Not just a coder.",
      title3: "The Translator.",
      text1: "Diploma Jurist (41). 10 years Corporate Law. Now Software Engineer.",
      text2: "I understand the code and the law book. I am your Solutions Architect for the gray zones of digitization."
    },
    techstack: {
        title: "Tech Stack & Certs",
        subtitle: "Not just theory. Tangible technical qualifications and daily tools."
    },
    blog: {
        subtitle: "/// INSIGHTS",
        title: "Legal Tech Log.",
        desc: "Thoughts at the intersection. Practical, no legalese.",
        read: "Read Article"
    },
    footer: {
        subtitle: "/// Let's start",
        title: "Enough theory.",
        button: "Request Feasibility Check",
        sending: "Sending...",
        successTitle: "Message sent!",
        successText: "I will get back to you shortly.",
        placeholderName: "Your Name",
        placeholderMail: "Your Email",
        placeholderMsg: "What is it about?",
        credit: "Engineered with Next.js & Tailwind."
    }
  }
};

// Typ-Definitionen für den Context
type ModeContextType = {
  isCodeMode: boolean;
  toggleMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.de; // Das Wörterbuch
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [language, setLanguage] = useState<Language>('de');

  // Funktion zum Umschalten des Dark Mode (aktuell inaktiv, aber wir behalten es)
  const toggleMode = () => {
      setIsCodeMode(!isCodeMode);
      const root = window.document.documentElement;
      root.classList.toggle('dark');
  };

  // Das aktuelle Wörterbuch basierend auf der gewählten Sprache
  const t = translations[language];

  return (
    <ModeContext.Provider value={{ isCodeMode, toggleMode, language, setLanguage, t }}>
      {children}
    </ModeContext.Provider>
  );
}

// Hook für Zugriff auf den Context
export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}