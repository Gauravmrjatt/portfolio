'use client';
import React, { useEffect, useState } from 'react';
import RippleLoader from './ui/ripple-loader';

export default function FadeOutLoader({
  durationMs = 800,
  delayMs = 500,
  zIndex = 9999,
  lightBgToken = 'theme(colors.slate.50)',
  darkBgToken = 'theme(colors.gray.950)',
} = {}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = prev;
      }, durationMs);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, [delayMs, durationMs]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .fade-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--dur, 800ms) ease-out;
          z-index: var(--z, 9999);
        }
        .fade-overlay.hiding {
          opacity: 0;
        }
      `}</style>

      <div
        className={`fade-overlay ${!isVisible ? 'hiding' : ''} bg-slate-50 dark:bg-gray-950`}
        style={{ 
          ['--z']: zIndex,
          ['--dur']: `${durationMs}ms`
        }}
      >
        <RippleLoader />
      </div>
    </>
  );
}