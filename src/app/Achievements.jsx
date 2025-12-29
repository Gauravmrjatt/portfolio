"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  Trophy,
  Award,
  GraduationCap,
  Medal,
  Layers,
  Grid3X3,
  LayoutList
} from "lucide-react"
import { cn } from "@/lib/utils"

// === Your Original CardStack Component (unchanged logic, just resized) ===
const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList
}

const SWIPE_THRESHOLD = 50

export function CardStack({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick
}) {
  const [layout, setLayout] = useState(defaultLayout)
  const [expandedCard, setExpandedCard] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) return null

  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex(prev => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex(prev => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getLayoutStyles = stackPosition => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2
        }
      case "grid":
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0
        }
      default:
        return {}
    }
  }

  const containerStyles = {
    stack: "relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96", // Responsive stack size
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl",
    list: "flex flex-col gap-6 max-w-3xl"
  }

  const displayCards =
    layout === "stack"
      ? getStackOrder()
      : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-8", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
        {Object.keys(layoutIcons).map(mode => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container - Now Responsive */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map(card => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    // Larger padding on md+
                    "cursor-pointer rounded-xl  border border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7 p-6 md:p-8",
                    "hover:border-primary/50 transition-colors shadow-lg hover:shadow-2xl", // Responsive card width
                    layout === "stack" &&
                      "absolute w-full h-full max-w-sm md:max-w-md",
                    layout === "stack" &&
                      isTopCard &&
                      "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-video",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-primary"
                  )}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    {card.icon && (
                      <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-lg md:text-2xl text-card-foreground truncate">
                          {card.title}
                        </h3>
                        {card.rank && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {card.rank}
                          </span>
                        )}
                      </div>
                      {card.issuer && (
                        <p className="mt-1 text-sm font-medium text-primary">
                          {card.issuer}
                        </p>
                      )}
                      <p
                        className={cn(
                          "text-sm md:text-base text-muted-foreground mt-2",
                          layout === "stack" && "line-clamp-3",
                          layout === "grid" && "line-clamp-2"
                        )}
                      >
                        {card.description}
                      </p>
                      <time className="mt-4 inline-block text-xs md:text-sm font-medium text-muted-foreground">
                        {card.date}
                      </time>
                    </div>
                  </div>

                  {isTopCard && (
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <span className="text-xs text-muted-foreground/50">
                        Swipe to navigate
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Pagination Dots */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Your Achievements Data
const achievements = [
  {
    id: "1",
    title: "Finalist in WebX",
    description: "Frontend Challenge by competitive coding community",
    date: "2024",
    icon: <Trophy className="h-6 w-6 md:h-8 md:w-8" />
  },
  {
    id: "2",
    title: "WebForge",
    rank: "4th Rank",
    description: "National-level web development competition",
    date: "2025",
    icon: <Medal className="h-6 w-6 md:h-8 md:w-8" />
  },
  {
    id: "3",
    title: "Code Arambh",
    rank: "4th Rank",
    description: "Intra-college coding contest",
    date: "2024",
    icon: <Award className="h-6 w-6 md:h-8 md:w-8" />
  },
  {
    id: "4",
    title: "AWS Cloud Computing Certification (JOVAC)",
    issuer: "GLA University & Technical Guftgu",
    description: "Job-Oriented Value Added Course on AWS Cloud Computing",
    date: "2025",
    icon: <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
  }
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Achievements & Certifications
          </h1>
        </div>
        
  
        {/* Your original CardStack with responsive resizing */}
        <CardStack
          cards={achievements}
          defaultLayout="stack"
          className="w-full"
        />
      </div>
    </section>
  )
}
