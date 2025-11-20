'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Typ-Definition: Was kann unser Context?
type ModeContextType = {
  isCodeMode: boolean;
  toggleMode: () => void;
};

// Context erstellen
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// Der Provider: Er wickelt sich um die App und stellt den Zustand bereit
export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [isCodeMode, setIsCodeMode] = useState(false);

  // Der "Effekt": Wenn isCodeMode true ist, füge 'dark' zum HTML-Tag hinzu
  useEffect(() => {
    const root = window.document.documentElement;
    if (isCodeMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isCodeMode]);

  const toggleMode = () => setIsCodeMode(!isCodeMode);

  return (
    <ModeContext.Provider value={{ isCodeMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

// Ein Hook für einfachen Zugriff
export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}