"use client"
import { motion } from "motion/react"
import { Icon } from "@iconify/react"

const orbitIcons = [
  { icon: "logos:react", label: "React" },
  { icon: "logos:nextjs-icon", label: "Next.js" },
  { icon: "logos:nodejs-icon", label: "Node.js" },
]

export default function TechOrbit({ className }) {
  const positions = [
    { x: -85, y: -100, rotate: -16 },
    { x: 0, y: -130, rotate: 0 },
    { x: 85, y: -100, rotate: 16 },
  ]

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-visible left-[50%] ${className ?? ""}`}>
      {orbitIcons.map((item, i) => (
        <motion.div
          key={item.label}
          className="absolute"
          style={{ left: "45%",  }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: positions[i].x,
            y: positions[i].y,
            scale: 1,
            rotate: positions[i].rotate,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 14,
            delay: 1.2,
          }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/40 shadow-xl flex items-center justify-center"
            style={{ willChange: "transform" }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 + i * 0.3,
            }}
          >
            <Icon icon={item.icon} className="w-8 h-8" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
