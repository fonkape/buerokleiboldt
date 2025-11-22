'use client';

import { useTheme } from "@/context/ThemeContext";
import SwissHome from "@/components/themes/SwissHome";
import OrganicHome from "@/components/themes/OrganicHome";

export default function Home() {
  const { theme } = useTheme();

  // Render different components based on the theme
  // 'swiss' and 'cyber' share the SwissHome structure (Cyber is just a dark mode of Swiss)
  // 'organic' gets a completely new design and content structure
  if (theme === 'organic') {
    return <OrganicHome />;
  }

  return <SwissHome />;
}