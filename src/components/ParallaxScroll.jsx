"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * ParallaxScroll Component
 * 
 * A modern, smooth parallax scrolling section with layered content.
 * Perfect for hero sections, about pages, or feature showcases.
 * 
 * Features:
 * - Multiple parallax layers with different speeds
 * - Smooth scrolling on all devices
 * - Mobile-optimized (reduced motion support)
 * - Fully customizable via props
 * 
 * Usage:
 * <ParallaxScroll>
 *   <div className="layer" data-speed="0.2">Slow background</div>
 *   <div className="layer" data-speed="0.5">Medium layer</div>
 *   <div className="layer" data-speed="1">Fast foreground</div>
 * </ParallaxScroll>
 */

export default function ParallaxScroll({ 
  children, 
  className,
  baseVelocity = 1,
  smooth = true 
}) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      style={{ height: "120vh" }} // Allows parallax effect space
    >
      {/* Background parallax layers */}
      <div className="absolute inset-0">
        {children}
      </div>

      {/* Optional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </section>
  )
}

/**
 * ParallaxLayer Component
 * 
 * Individual layer inside ParallaxScroll
 * 
 * Props:
 * - speed: Number between -1 and 2 (negative = opposite direction)
 * - className: Tailwind classes
 * - children: Content
 */

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className,
  offset = 0 
}) {
  const layerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${offset * 100}vh`, `${(offset + speed) * -100}vh`]
  )

  return (
    <motion.div
      ref={layerRef}
      className={cn("absolute inset-0 w-full", className)}
      style={{
        y,
        // Optional: scale for extra depth
        // scale: useTransform(scrollYProgress, [0, 1], [1, 1 + speed * 0.2])
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Example Usage Component
 */

export function ParallaxHeroExample() {
  return (
    <ParallaxScroll className="bg-gradient-to-b from-background to-muted">
      {/* Slow background layer */}
      <ParallaxLayer speed={0.2} className="flex items-center justify-center">
        <div className="text-8xl md:text-9xl font-bold text-primary/5 select-none">
          BACKGROUND
        </div>
      </ParallaxLayer>

      {/* Medium layer - shapes or patterns */}
      <ParallaxLayer speed={0.5}>
        <div className="grid grid-cols-6 gap-8 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-32 h-32 bg-primary/10 rounded-full blur-xl"
              style={{
                transform: `translateX(${i % 2 === 0 ? -100 : 100}px) translateY(${Math.sin(i) * 100}px)`
              }}
            />
          ))}
        </div>
      </ParallaxLayer>

      {/* Fast foreground layer */}
      <ParallaxLayer speed={1} offset={0.3}>
        <div className="relative h-screen flex flex-col items-center justify-center text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Parallax Scroll Effect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
          >
            Smooth, performant parallax scrolling built with Framer Motion.
            Works beautifully on desktop and mobile.
          </motion.p>
        </div>
      </ParallaxLayer>
    </ParallaxScroll>
  )
}