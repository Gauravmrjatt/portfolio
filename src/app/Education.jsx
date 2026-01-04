"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { School, BookOpen, GraduationCap } from "lucide-react";

const educationItems = [
  {
    id: 1,
    status: "completed",
    title: "10th Grade (Secondary School)",
    date: "March 2020",
    icon: <School className="h-4 w-4" />,
  },
  {
    id: 2,
    status: "completed",
    title: "12th Grade (Higher Secondary)",
    date: "March 2022",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: 3,
    status: "in-progress",
    title: "B.Tech in Computer Science",
    date: "2023 – 2027 (Expected)",
    icon: <GraduationCap className="h-4 w-4" />,
  },
];

const EducationZigZagTimeline = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [paths, setPaths] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const calculatePaths = () => {
    if (!containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    setSize({ width: parentRect.width, height: parentRect.height });

    const center = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - parentRect.left,
        y: r.top + r.height / 2 - parentRect.top,
      };
    };

    const points = cardRefs.current.map(center);

    // 🔑 Responsive curve strength
    const isMobile = parentRect.width < 640;
    const curveStrength = isMobile ? 120 : 240;

    const curve = (from, to, direction) => {
      const horizontal = curveStrength * (direction === "right" ? 1 : -1);
      const vertical = (to.y - from.y) * (isMobile ? 0.35 : 0.45);

      return `
        M ${from.x} ${from.y}
        C ${from.x + horizontal} ${from.y + vertical},
          ${to.x + horizontal} ${to.y - vertical},
          ${to.x} ${to.y}
      `;
    };

    setPaths([
      curve(points[0], points[1], "right"),
      curve(points[1], points[2], "left"),
    ]);
  };

  useEffect(() => {
    calculatePaths();

    const observer = new ResizeObserver(calculatePaths);
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener("resize", calculatePaths);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculatePaths);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative mx-auto max-w-3xl
        px-4 sm:px-6
        py-16 sm:py-24
        overflow-hidden
      "
    >
      {/* Heading */}
      <h1 className="mb-16 text-center text-4xl font-bold tracking-tight sm:mb-20 sm:text-6xl">
        Education Journey
      </h1>

      {/* SVG CURVES */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="dashGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#dashGradient)"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -32 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>

      {/* CARDS */}
      <div className="relative z-10 flex flex-col gap-16 sm:gap-28">
        {educationItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } max-sm:justify-center`}
          >
            <div
              ref={(el) => (cardRefs.current[index] = el)}
              className="w-72 rounded-xl border border-border bg-background p-6 shadow-sm dark:shadow-none"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-border ${
                    item.status === "in-progress"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationZigZagTimeline;
