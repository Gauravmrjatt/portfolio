"use client"
import { useMemo } from "react"
import { Icon } from "@iconify/react"

const techIcons = [
  "skill-icons:javascript", "skill-icons:typescript", "logos:php",
  "skill-icons:cpp", "logos:java", "logos:python", "logos:bash-icon",
  "logos:html-5", "skill-icons:css", "skill-icons:tailwindcss-dark",
  "logos:react", "logos:nextjs-icon", "skill-icons:jquery",
  "logos:redux", "logos:pug", "skill-icons:threejs-dark",
  "simple-icons:shadcnui", "logos:material-ui", "devicon:zustand",
  "simple-icons:nextui", "logos:nodejs-icon", "skill-icons:expressjs-dark",
  "vscode-icons:file-type-rest", "material-icon-theme:graphql",
  "logos:socket-io", "logos:jwt-icon", "logos:pwa",
  "logos:mongodb-icon", "logos:postgresql", "logos:mysql",
  "devicon:redis", "devicon:mongoose-wordmark",
  "material-icon-theme:prisma", "logos:zod",
  "material-icon-theme:docker", "material-icon-theme:nginx",
  "devicon:githubactions", "skill-icons:vercel-dark",
  "skill-icons:aws-dark", "carbon:continuous-integration",
  "devicon:grafana", "devicon:prometheus",
  "material-icon-theme:sentry", "simple-icons:bugsnag",
  "skill-icons:git", "skill-icons:github-light",
  "material-icon-theme:vscode", "devicon:postman", "logos:figma",
  "vscode-icons:file-type-firebase", "simple-icons:auth0",
  "material-icon-theme:json"
]

const ICON_SIZE = 32

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function shuffle(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function TechGridBackground({ density = 0.55, opacityProp = 1.12, className, style }) {
  const items = useMemo(() => {
    const rand = seededRandom(42)
    const cols = 28
    const rows = 20
    const total = Math.floor(cols * rows * density)

    const positions = Array.from({ length: cols * rows }, (_, i) => i)
    shuffle(positions, rand)
    const selected = positions.slice(0, total)

    return selected.map(i => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const cx = (col + 0.5) / cols * 100
      const cy = (row + 0.5) / rows * 100
      const rotation = (rand() - 0.5) * 60
      const size = ICON_SIZE * (0.6 + rand() * 0.8)
      const icon = techIcons[Math.floor(rand() * techIcons.length)]
      const floatDuration = 3 + rand() * 4
      const delay = rand() * 5
      const floatY = Math.round((rand() - 0.5) * 16 * 100) / 100

      return { cx, cy, rotation, size, icon, floatDuration, delay, floatY }
    })
  }, [density])

  return (
    <div
      className={`overflow-hidden pointer-events-none ${className ?? ""}`}
      style={{ filter: "grayscale(1)", ...style }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${item.cx}%`,
            top: `${item.cy}%`,
            transform: `rotate(${item.rotation}deg)`,
            opacity: ".7",
            willChange: "translate",
            // "--float-to": `${item.floatY}px`,
            // animation: `tech-float ${item.floatDuration}s ease-in-out ${item.delay}s infinite alternate`
          }}
        >
          <Icon icon={item.icon} style={{ width: item.size, height: item.size }} />
        </div>
      ))}
    
    </div>
  )
}
