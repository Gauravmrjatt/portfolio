"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from "framer-motion"
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { Home, Code, FolderKanban, Trophy, Mail, Moon, Sun } from "lucide-react"

const DOCK_HEIGHT = 128
const DEFAULT_MAGNIFICATION = 80
const DEFAULT_DISTANCE = 150
const DEFAULT_PANEL_HEIGHT = 64

/* -------------------- Context -------------------- */
const DockContext = createContext(undefined)

const DockProvider = ({ children, value }) => {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}

const useDock = () => {
  const context = useContext(DockContext)
  if (!context) throw new Error("useDock must be used within DockProvider")
  return context
}

/* -------------------- Active Section Context -------------------- */
const ActiveSectionContext = createContext(undefined)

export const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home")
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    // First priority: URL hash
    const hash = window.location.hash.slice(1)
    if (hash) {
      setActiveSection(hash)
      // Scroll to the section after a short delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" })
        }
      }, 100)
    } else {
      // Second priority: sessionStorage (for refresh without hash)
      const savedSection = sessionStorage.getItem("activeSection")
      if (savedSection) {
        setActiveSection(savedSection)
        if (savedSection !== "home") {
          setTimeout(() => {
            const element = document.getElementById(savedSection)
            if (element) {
              element.scrollIntoView({ behavior: "auto", block: "start" })
            }
          }, 100)
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveSection(hash)
        sessionStorage.setItem("activeSection", hash)
      } else {
        setActiveSection("home")
        sessionStorage.setItem("activeSection", "home")
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("popstate", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("popstate", handleHashChange)
    }
  }, [])

  // Save to sessionStorage whenever activeSection changes
  useEffect(() => {
    if (activeSection) {
      sessionStorage.setItem("activeSection", activeSection)
    }
  }, [activeSection])

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

const useActiveSection = () => {
  const context = useContext(ActiveSectionContext)
  if (!context) throw new Error("useActiveSection must be used within ActiveSectionProvider")
  return context
}

/* -------------------- Dock -------------------- */
export const Dock = ({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT
}) => {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    const check = () =>
      setHasMouse(window.matchMedia("(pointer: fine)").matches)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const maxHeight = useMemo(
    () => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4),
    [magnification]
  )

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      style={{ height }}
      className="mx-2 flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={e => hasMouse && (isHovered.set(1), mouseX.set(e.pageX))}
        onMouseLeave={() =>
          hasMouse && (isHovered.set(0), mouseX.set(Infinity))
        }
        className={`mx-auto flex w-fit gap-4 rounded-t-2xl rounded-b-lg md:rounded-b-2xl bg-gray-50 px-6 py-4 dark:bg-neutral-900 ${className || ''}`}
        style={{ height: panelHeight }}
      >
        <DockProvider
          value={{ mouseX, spring, distance, magnification, hasMouse }}
        >
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  )
}

/* -------------------- DockItem -------------------- */
export const DockItem = ({ children, className, href, sectionId }) => {
  const ref = useRef(null)
  const { distance, magnification, mouseX, spring, hasMouse } = useDock()
  const { activeSection } = useActiveSection()

  const isActive = sectionId === activeSection

  const mouseDistance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return 0
    return val - bounds.left - bounds.width / 2
  })

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  )

  const width = useSpring(hasMouse ? widthTransform : 40, spring)

  const handleClick = (e) => {
    if (!sectionId) return

    e.preventDefault()

    const element = document.getElementById(sectionId)
    if (element) {
      window.location.hash = sectionId
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 0)
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`relative inline-flex items-center justify-center ${isActive ? "rounded-xl bg-neutral-200 dark:bg-neutral-700" : ""
        } ${className || ''}`}
      tabIndex={0}
    >
      <a href={href || `#${sectionId}`} onClick={handleClick}>
        {Children.map(children, child =>
          cloneElement(child, {
            width,
            isHovered: hasMouse && mouseX.get() !== Infinity,
            isActive
          })
        )}
      </a>
    </motion.div>
  )
}

/* -------------------- ScrollSpy -------------------- */
export const ScrollSpy = () => {
  const { setActiveSection } = useActiveSection()
  const lastActiveRef = useRef("home")

  useEffect(() => {
    const sectionIds = ["home", "skills", "projects", "achievements", "contact"]

    const findActiveSection = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const viewportCenter = scrollY + viewportHeight / 3 // Use top third of viewport as reference

      // If near the top, always set home
      if (scrollY < 100) {
        if (lastActiveRef.current !== "home") {
          lastActiveRef.current = "home"
          window.history.replaceState(null, "", window.location.pathname)
          setActiveSection("home")
        }
        return
      }

      // Find the section that contains the viewport center
      let activeId = "home"

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = scrollY + rect.top
          const elementBottom = elementTop + rect.height

          if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
            activeId = id
            break
          }
        }
      }

      // Only update if changed
      if (activeId !== lastActiveRef.current) {
        lastActiveRef.current = activeId
        window.history.replaceState(null, "", `#${activeId}`)
        setActiveSection(activeId)
      }
    }

    // Run on mount
    findActiveSection()

    // Throttled scroll handler
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          findActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [setActiveSection])

  return null
}

/* -------------------- DockLabel -------------------- */
export const DockLabel = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const parentRef = useRef(null)

  useEffect(() => {
    const parent = parentRef.current?.parentElement?.parentElement
    if (!parent) return

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    parent.addEventListener("mouseenter", handleMouseEnter)
    parent.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter)
      parent.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={parentRef}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-black ${className || ''}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------- DockIcon -------------------- */
export const DockIcon = ({ children, className, width, isActive }) => {
  const size = useTransform(width, v => v)

  return (
    <motion.div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-lg p-2 ${isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-neutral-600 dark:text-neutral-300"
        } ${className || ''}`}
    >
      {children}
    </motion.div>
  )
}

/* -------------------- Theme Toggle -------------------- */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <button onClick={toggleTheme} className="w-full h-full flex items-center justify-center">
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}