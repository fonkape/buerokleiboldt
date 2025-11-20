'use client';
import { ReactLenis } from '@studio-freight/react-lenis';
import React from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* Der Trick: Wir casten children zu 'any', um den TypeScript-Fehler zu umgehen */}
      {children as any}
    </ReactLenis>
  );
}