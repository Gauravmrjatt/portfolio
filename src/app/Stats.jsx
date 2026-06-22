"use client";

import GitHubWidget from "@/components/ui/github-widget";
import LeetCodeWidget from "@/components/ui/leetcode-widget";
import { useTheme } from "next-themes";
export default function Stats() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id="stats" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Coding Stats
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GitHubWidget isDark={isDark} />
          <LeetCodeWidget isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
