"use client";

import { Download, FileText } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import MonochromeBackground from "@/components/MonochromeBackground";
import items from "./items";

const resumeUrl = "/resume.pdf";

export default function GetInTouch() {
  const { theme } = useTheme();

  return (
   <section
  id="contact"
  className="relative rounded-xl border border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7 p-6 md:p-8 hover:border-primary/50 transition-colors shadow-lg hover:shadow-2xl "
>
  {/* Background */}
  {/* <div className="absolute rounded-xl inset-0 -z-10">
    <MonochromeBackground theme={theme} />
  </div> */}

  {/* Card */}
  <div className="mx-auto rounded-xl ">
    <div className="grid gap-8 p-8 md:grid-cols-2">

      {/* LEFT: 2x2 ICON GRID */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
        {items.slice(0, 4).map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/70 transition-all hover:scale-110 hover:bg-muted"
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* RIGHT: 2x1 BUTTON GRID */}
      <div className="grid grid-rows-2 gap-6">
        <a
          href={resumeUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center gap-3",
            "rounded-xl px-6 py-4 font-semibold",
            "bg-primary text-primary-foreground",
            "shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
          )}
        >
          <Download className="h-5 w-5" />
           Resume
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center gap-3",
            "rounded-xl px-6 py-4 font-medium",
            "bg-muted text-foreground",
            "border border-border/60 transition-colors hover:bg-muted/80"
          )}
        >
          <FileText className="h-5 w-5" />
          View
        </a>
      </div>

    </div>
  </div>
</section>

  );
}
