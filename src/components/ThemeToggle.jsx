'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Optional: Show a placeholder to avoid layout shift
  if (!mounted) {
    return (
      <button
        className="h-full w-full"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-6 w-6" /> {/* Empty space matching icon size */}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-full w-full"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}