import * as React from "react"
import { motion } from "framer-motion"
import { Check, Circle, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"

const StatusIcon = ({ status, customIcon }) => {
  if (customIcon) return <>{customIcon}</>

  switch (status) {
    case "completed":
      // White checkmark — stands out perfectly on dark background
      return <Check className="h-5 w-5 text-primary" strokeWidth={3} />
    case "in-progress":
      return <CircleDot className="h-5 w-5 text-primary animate-pulse" strokeWidth={2.5} />
    default:
      return (
        <Circle className="h-5 w-5 text-muted-foreground/50" strokeWidth={2} />
      )
  }
}

const TrackingTimeline = ({ items, className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.ol
      className={cn(
        "relative max-w-4xl mx-auto",
        "before:absolute before:left-5 before:md:left-6 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/60 before:to-transparent before:z-0",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {items.map(item => (
        <motion.li
          key={item.id}
          className="relative flex gap-6 md:gap-8 mb-12 last:mb-0 items-start"
          variants={itemVariants}
        >
          {/* Icon Container */}
          <div
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              "h-10 w-10 md:h-12 md:w-12",
              "rounded-full ring-8 ring-background shadow-lg z-10",
              "transition-all duration-300",
              {
                // Completed: Dark background with white icon (perfect contrast in both modes)
                "bg-neutral-900 dark:bg-neutral-800":
                  item.status === "completed",
                // In Progress: Light primary tint
                "bg-primary/20": item.status === "in-progress",
                // Pending: Subtle muted
                "bg-muted/70": item.status === "pending"
              }
            )}
          >
            {/* Pulse for in-progress */}

            {item.status === "in-progress" && (
              <span className="absolute h-8 w-8 animate-ping rounded-full bg-primary/50 opacity-75" />
            )}
            <StatusIcon status={item.status} customIcon={item.icon} />
          </div>

          {/* Content Card */}
          <div className="flex-1 pt-1 md:pt-2">
            <div
              className={cn(
                "rounded-xl border p-6 border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7 hover:shadow-lg",
                { "ring-2 ring-primary/30": item.status === "in-progress" }
              )}
            >
              <h3
                className={cn("font-semibold text-lg md:text-xl", {
                  "text-foreground": item.status !== "pending",
                  "text-muted-foreground": item.status === "pending"
                })}
              >
                {item.title}
              </h3>

              {item.description && (
                <p className="text-sm text-muted-foreground mt-1.5">
                  {item.description}
                </p>
              )}

              <time
                className={cn("block text-sm mt-3 font-medium", {
                  "text-primary": item.status === "in-progress",
                  "text-foreground/70": item.status === "completed",
                  "text-muted-foreground/60": item.status === "pending"
                })}
              >
                {item.date}
              </time>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}

export default TrackingTimeline
