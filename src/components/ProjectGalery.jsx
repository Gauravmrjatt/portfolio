"use client"
import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronDown,
    Target,
    ExternalLink,
    Box,
    Code2,
    Server,
    Layout,
    Terminal,
    Cpu
} from "lucide-react"
import { Icon } from "@iconify/react"
/* ---------------- UTILS ---------------- */
function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
}

/* ---------------- PROJECTS DATA ---------------- */
const projects = [
    {
        title: "Earning Area",
        description:
            "A reward distribution platform that enables users to seamlessly distribute monetary rewards to a large community. Integrates Paytm & OpenMoney APIs with interactive formats like Lifafa and scratch cards.",
        link: "https://earningarea.org/",
        cta: "Visit Site",
        techStack: [
            "skill-icons:html",
            "skill-icons:css",
            "skill-icons:javascript",
            "skill-icons:jquery",
            "devicon:php",
            "logos:mysql",
            "skill-icons:nodejs-dark",
            "skill-icons:mongodb",
            "devicon:redis",
            "logos:socket-io",
            "simple-icons:paytm",
            "logos:telegram"
        ]
    },
    {
        title: "Dream10",
        description:
            "Real-time competitive quiz app with live contests, fair question broadcasting via Socket.IO, leaderboards, and prize distribution.",
        link: "https://dream10.in/",
        cta: "Visit Site",
        techStack: [
            "logos:react",
            "devicon:nextjs",
            "devicon:tailwindcss",
            "simple-icons:radixui",
            "simple-icons:reactquery",
            "devicon:zustand",
            "tabler:brand-framer-motion",
            "simple-icons:greensock",
            "simple-icons:swiper",
            "skill-icons:threejs-dark",
            "logos:nodejs-icon",
            "skill-icons:expressjs-dark",
            "logos:mongodb-icon",
            "devicon:redis",
            "simple-icons:bullmq",
            "logos:socket-io",
            "logos:jwt-icon",
            "simple-icons:sentry",
            "simple-icons:razorpay",
            "logos:prometheus"
        ]
    },
    {
        title: "Lead Tracking System",
        description:
            "Invite-only affiliate marketing platform with fraud detection, real-time dashboards, and automated payout engine.",
        link: "https://panel3.logicpay.in/",
        cta: "Visit Dashboard",
        techStack: [
            "logos:nodejs-icon",
            "logos:socket-io",
            "devicon:redis",
            "logos:mongodb-icon",
            "devicon:nextjs",
            "devicon:tailwindcss",
            "devicon:rabbitmq",
            "simple-icons:bullmq",
            "logos:grafana",
            "logos:prometheus",
            "simple-icons:grafana-loki",
            "simple-icons:coolify",
            "vscode-icons:file-type-sentry",
            "logos:jwt-icon",
            "logos:docker-icon",
            "logos:material-ui"
        ]
    },
    {
        title: "TOD-AI",
        description:
            "Interactive toddler learning app teaching the alphabet through animations, audio pronunciation, and engaging visuals.",
        link: "https://tod-ai-teal.vercel.app/",
        cta: "Try It",
        techStack: [
            "logos:react",
            "devicon:nextjs",
            "devicon:tailwindcss",
            "simple-icons:radixui",
            "simple-icons:styledcomponents",
            "tabler:brand-framer-motion",
            "skill-icons:threejs-dark",
            "devicon:zustand",
            "simple-icons:reactquery",
            "simple-icons:axios",
            "logos:nodejs-icon",
            "logos:socket-io",
            "devicon:redis",
            "logos:mongodb-icon",
            "logos:grafana",
            "logos:prometheus",
            "logos:jwt-icon",
            "logos:docker-icon"
        ]
    },
    {
        title: "Data Vault",
        description:
            "Secure file-sharing platform using Telegram Bot API as backend storage for efficient, low-cost file management.",
        link: "https://datavault-two.vercel.app/",
        cta: "Visit App",
        techStack: [
            "logos:nodejs-icon",
            "logos:mongodb-icon",
            "devicon:nextjs",
            "devicon:tailwindcss",
            "logos:jwt-icon",
            "logos:react",
            "simple-icons:radixui",
            "simple-icons:reacthookform",
            "simple-icons:zod",
            "simple-icons:lucide"
        ]
    }
];

/* ---------------- CARD GENERATION ---------------- */
const cardTypes = ["Overview", "Frontend", "Backend", "Actions"]

const allCards = projects.flatMap(project =>
    cardTypes.map((type, idx) => ({
        id: `${project.title.replace(/\s+/g, "-")}--${type}`,
        projectTitle: project.title,
        type,
        project,
        typeIndex: idx
    }))
)

const frontendKeywords = [
    "html", "css", "javascript", "react", "nextjs", "tailwindcss", "radix-ui", "react-query",
    "react-table", "react-hook-form", "zod", "zustand", "framer-motion", "gsap", "swiper",
    "recharts", "threejs", "react-three-fiber", "lucide-react", "tabler-icons", "lottie",
    "axios", "jwt", "socket-io", "sentry", "razorpay", "onesignal", "styled-components",
    "tesseract", "cmdk", "clsx", "class-variance-authority", "date-fns", "react-day-picker",
    "embla-carousel", "sonner", "vaul", "next-themes"
];

const backendKeywords = [
    "logos:mysql", "nodejs", "express", "mongodb", "mongoose", "redis", "ioredis", "bull-mq",
    "socket-io", "ws", "jwt", "bcrypt", "dotenv", "nodemailer", "multer", "cloudinary",
    "razorpay", "rate-limiter", "helmet", "cors", "compression", "prometheus", "sentry",
    "nextjs-server", "ocr", "tesseract", "rabbitmq", "grafana", "docker"
];

function isFrontend(tech) {
    return frontendKeywords.some(kw => tech.toLowerCase().includes(kw))
}

function isBackend(tech) {
    return backendKeywords.some(kw => tech.toLowerCase().includes(kw))
}

/* ---------------- GRID CONFIG ---------------- */
const SIZE = 15
const CENTER = Math.floor(SIZE / 2)
const OUTER_DUMMY_RINGS = 3

function getCells(size) {
    const cells = []
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const dx = r - CENTER
            const dy = c - CENTER
            const ring = Math.max(Math.abs(dx), Math.abs(dy))
            cells.push({
                index: r * size + c,
                row: r,
                col: c,
                ring,
                inside: dx * dx + dy * dy <= CENTER * CENTER,
                dx,
                dy
            })
        }
    }
    return cells
}

const TypeIcon = ({ type, className }) => {
    switch (type) {
        case "Overview": return <Layout className={className} />;
        case "Frontend": return <Code2 className={className} />;
        case "Backend": return <Server className={className} />;
        case "Actions": return <Box className={className} />;
        default: return <Target className={className} />;
    }
};

export default function App() {
    const containerRef = useRef(null)
    const cellRefs = useRef([])
    const [openProject, setOpenProject] = useState(projects[0]?.title ?? null)
    const [activeCardId, setActiveCardId] = useState(null)

    const cells = getCells(SIZE)
    const maxRing = Math.max(...cells.map(c => c.ring))

    const sortedCells = [...cells].sort((a, b) => {
        if (a.ring !== b.ring) return a.ring - b.ring
        const angleA = Math.atan2(a.dy, a.dx)
        const angleB = Math.atan2(b.dy, b.dx)
        return angleA - angleB
    })

    const cardMap = new Map()
    const firstOccurrence = new Map()
    const placedTypeAt = new Array(SIZE * SIZE).fill(-1)

    const hasSameTypeInRowOrCol = (row, col, typeIndex) => {
        for (let i = 0; i < SIZE; i++) {
            const rowIdx = row * SIZE + i
            const colIdx = i * SIZE + col
            if (placedTypeAt[rowIdx] === typeIndex) return true
            if (placedTypeAt[colIdx] === typeIndex) return true
        }
        return false
    }

    const getCardinalNeighbors = index => {
        const cell = cells[index]
        if (!cell) return []
        const { row, col } = cell
        const neighbors = []
        if (row > 0) neighbors.push((row - 1) * SIZE + col)
        if (row < SIZE - 1) neighbors.push((row + 1) * SIZE + col)
        if (col > 0) neighbors.push(row * SIZE + (col - 1))
        if (col < SIZE - 1) neighbors.push(row * SIZE + (col + 1))
        return neighbors
    }

    const getDiagonalScore = (cellIndex, typeIndex) => {
        let minDist = Infinity
        for (let i = 0; i < cells.length; i++) {
            if (placedTypeAt[i] === typeIndex) {
                const placed = cells[i]
                const cand = cells[cellIndex]
                const ddx = Math.abs(placed.dx - cand.dx)
                const ddy = Math.abs(placed.dy - cand.dy)
                if (ddx > 0 && ddy > 0) {
                    const dist = Math.sqrt(ddx * ddx + ddy * ddy)
                    minDist = Math.min(minDist, dist)
                }
            }
        }
        return minDist === Infinity ? 1000 : minDist
    }

    let cardIndex = 0
    while (cardIndex < allCards.length) {
        let bestCellIndex = -1
        let bestScore = -1

        for (const cell of sortedCells) {
            if (!cell.inside) continue
            if (cell.ring === 0) continue
            const isOuterDummy = cell.ring >= maxRing - (OUTER_DUMMY_RINGS - 1)
            const isEdge = cell.row === 0 || cell.col === 0 || cell.row === SIZE - 1 || cell.col === SIZE - 1
            if (isEdge || isOuterDummy) continue
            if (cardMap.has(cell.index)) continue

            const card = allCards[cardIndex]
            if (hasSameTypeInRowOrCol(cell.row, cell.col, card.typeIndex)) continue
            const neighbors = getCardinalNeighbors(cell.index)
            if (neighbors.some(n => placedTypeAt[n] === card.typeIndex)) continue

            const score = getDiagonalScore(cell.index, card.typeIndex)
            if (score > bestScore) {
                bestScore = score
                bestCellIndex = cell.index
            }
        }

        if (bestCellIndex !== -1) {
            const card = allCards[cardIndex]
            cardMap.set(bestCellIndex, card)
            placedTypeAt[bestCellIndex] = card.typeIndex
            if (!firstOccurrence.has(card.id)) {
                firstOccurrence.set(card.id, bestCellIndex)
            }
            cardIndex++
        } else {
            cardIndex++
        }
    }

    const snapToCenter = (index, cardId = null) => {
        const container = containerRef.current
        const cell = cellRefs.current[index]
        if (!container || !cell) return

        if (cardId) setActiveCardId(cardId);

        const cr = container.getBoundingClientRect()
        const tr = cell.getBoundingClientRect()

        container.scrollTo({
            left: tr.left - cr.left + container.scrollLeft - container.clientWidth / 2 + tr.width / 2,
            top: tr.top - cr.top + container.scrollTop - container.clientHeight / 2 + tr.height / 2,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        const centerCell = cells.find(c => c.ring === 0)
        if (!centerCell) return
        requestAnimationFrame(() => snapToCenter(centerCell.index))

        // Initialize first active card
        if (projects[0]) {
            setActiveCardId(`${projects[0].title.replace(/\s+/g, "-")}--Overview`)
        }
    }, [])

    const toggleProject = title => {
        setOpenProject(prev => (prev === title ? null : title))
        // Auto-select overview when expanding a new project
        const cardId = `${title.replace(/\s+/g, "-")}--Overview`;
        const cellIndex = firstOccurrence.get(cardId);
        if (cellIndex !== undefined) {
            snapToCenter(cellIndex, cardId);
        }
    }

    return (
        <section id="projects" className="py-20 md:py-32 bg-background relative">
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">My Projects</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen relative overflow-hidden bg-background text-foreground gap-20">
                {/* ================= SIDEBAR ================= */}
                <aside className="w-full md:w-64 border-b md:border-b-0 border-border/40 bg-transparent md:h-screen sticky top-0 md:relative z-40 flex flex-col justify-start md:justify-center">
                    <div className="flex flex-col max-h-screen md:max-h-[80vh]">
                        <div className="p-6 md:p-4 pb-4 md:pb-6">
                            <h2 className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold opacity-60 mb-0.5">
                                Index
                            </h2>
                            <p className="text-lg md:text-xl font-black tracking-tighter opacity-90">WORKS</p>
                        </div>

                        {/* MOBILE NAV */}
                        <div className="md:hidden sticky top-0 z-50 flex flex-col px-4 pb-4 gap-3 bg-background/95 backdrop-blur-sm border-b border-border/30">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                {projects.map(project => (
                                    <button
                                        key={project.title}
                                        onClick={() => toggleProject(project.title)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap border shadow-sm",
                                            openProject === project.title
                                                ? "bg-foreground text-background border-foreground ring-2 ring-foreground/10"
                                                : "bg-secondary/30 text-muted-foreground border-transparent opacity-70"
                                        )}
                                    >
                                        {project.title}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {openProject && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex p-1 bg-secondary/20 rounded-xl overflow-x-auto no-scrollbar border border-border/30"
                                    >
                                        {cardTypes.map(type => {
                                            const cardId = `${openProject.replace(/\s+/g, "-")}--${type}`;
                                            const cellIndex = firstOccurrence.get(cardId);
                                            const isActive = activeCardId === cardId;
                                            return (
                                                <button
                                                    key={type}
                                                    onClick={() => cellIndex !== undefined && snapToCenter(cellIndex, cardId)}
                                                    className={cn(
                                                        "flex-1 px-3 py-2 text-[9px] uppercase tracking-wider font-bold whitespace-nowrap text-center transition-all rounded-lg",
                                                        isActive
                                                            ? "text-primary bg-background shadow-sm"
                                                            : "text-muted-foreground/50 hover:text-foreground"
                                                    )}
                                                >
                                                    {type}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* DESKTOP NAV */}
                        <div className="hidden md:flex flex-col overflow-y-auto px-4 gap-1.5 no-scrollbar">
                            {projects.map(project => {
                                const isExpanded = openProject === project.title;
                                return (
                                    <div key={project.title} className="group">
                                        <button
                                            onClick={() => toggleProject(project.title)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-left relative",
                                                isExpanded
                                                    ? "bg-secondary/30 text-foreground"
                                                    : "hover:bg-secondary/10 text-muted-foreground/60"
                                            )}
                                        >
                                            {isExpanded && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary rounded-full" />}
                                            <div className={cn(
                                                "w-1 h-1 rounded-full transition-all duration-500",
                                                isExpanded ? "bg-primary scale-125" : "bg-muted-foreground/20 group-hover:bg-muted-foreground/40"
                                            )} />
                                            <span className="text-xs font-bold tracking-tight">
                                                {project.title}
                                            </span>
                                            <ChevronDown className={cn(
                                                "w-3 h-3 ml-auto opacity-20 transition-transform duration-300",
                                                isExpanded && "rotate-180 opacity-60"
                                            )} />
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-0.5 ml-3 border-l border-primary/10 pl-3 py-1.5 space-y-1">
                                                        {cardTypes.map(type => {
                                                            const cardId = `${project.title.replace(/\s+/g, "-")}--${type}`;
                                                            const cellIndex = firstOccurrence.get(cardId);
                                                            const isActive = activeCardId === cardId;
                                                            return (
                                                                <button
                                                                    key={type}
                                                                    onClick={() => cellIndex !== undefined && snapToCenter(cellIndex, cardId)}
                                                                    className={cn(
                                                                        "flex items-center gap-2 w-full py-1 text-[10px] font-semibold uppercase tracking-tight transition-colors text-left group/item",
                                                                        isActive
                                                                            ? "text-primary opacity-100"
                                                                            : "text-muted-foreground/50 hover:text-foreground/80"
                                                                    )}
                                                                >
                                                                    <TypeIcon type={type} className={cn(
                                                                        "w-3 h-3 transition-opacity",
                                                                        isActive ? "opacity-100" : "opacity-30 group-hover/item:opacity-80"
                                                                    )} />
                                                                    {type}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* ================= GRID ================= */}
                <main className="flex items-center justify-center flex-shrink-0 ">
                    <div className="relative aspect-square md:w-[min(75vw,75vh)] w-[min(100vw)] md:max-w-[42rem] md:rounded-full rounded-2xl overflow-hidden border border-border/10">
                        <div className="absolute inset-0 z-20 pointer-events-none
                        bg-background
                        [mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]
                        md:[mask-image:radial-gradient(circle_at_center,transparent_0%,transparent_40%,black_70%,black_100%)]"
                        />

                        <div ref={containerRef} className="absolute inset-0 overflow-hidden p-6 no-scrollbar z-10 pointer-events-none">
                            <div className="relative">
                                {cells.map(({ index, inside, row, col }) => {
                                    const offsetX = row % 2 === 1 ? 200 : 0;
                                    let displayCard = cardMap.get(index);
                                    const ring = cells[index].ring;
                                    const isCardActive = displayCard && activeCardId === displayCard.id;

                                    return (
                                        <div
                                            key={index}
                                            ref={el => (cellRefs.current[index] = el)}
                                            className={cn(
                                                "absolute transition-all duration-500 w-[400px] h-[400px] max-w-[85vw] max-h-[85vw] rounded-[2.5rem] border flex items-center justify-center p-1",
                                                inside
                                                    ? cn("border-border shadow-sm")
                                                    : "border-transparent opacity-10"
                                            )}
                                            style={{
                                                left: `${col * 400 + offsetX}px`,
                                                top: `${row * 360}px`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            <div className="h-full w-full rounded-[2.2rem] bg-background p-10 flex flex-col relative overflow-hidden">
                                                {ring === 0 && !displayCard && (
                                                    <div className="h-full flex flex-col items-center justify-center">
                                                        <span className="text-primary text-[10px] font-black tracking-[.4em] uppercase mb-2">Selected</span>
                                                        <div className="font-black text-4xl italic tracking-tighter">PROJECTS</div>
                                                    </div>
                                                )}

                                                {displayCard && (
                                                    <div className="flex flex-col h-full">
                                                        <div className="flex items-center gap-2 mb-6">
                                                            <TypeIcon type={displayCard.type} className={cn("w-3.5 h-3.5", isCardActive ? "text-primary" : "text-primary/80")} />
                                                            <span className={cn(
                                                                "text-[10px] font-bold uppercase tracking-[0.2em]",
                                                                isCardActive ? "text-primary/90" : "text-muted-foreground/60"
                                                            )}>
                                                                {displayCard.type}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-2xl font-bold tracking-tight mb-4 leading-tight opacity-90">
                                                            {displayCard.projectTitle}
                                                        </h3>

                                                        <div className="flex-1">
                                                            {displayCard.type === "Overview" && (
                                                                <p className="text-sm text-muted-foreground/70 leading-relaxed font-medium">
                                                                    {displayCard.project.description}
                                                                </p>
                                                            )}

                                                            {(displayCard.type === "Frontend" || displayCard.type === "Backend") && (
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {displayCard.project.techStack
                                                                        .filter(displayCard.type === "Frontend" ? isFrontend : isBackend)
                                                                        .map(tech => (
                                                                            <div key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border rounded-xl text-[11px] font-semibold">
                                                                                <Icon icon={tech} className="h-3.5 w-3.5" />
                                                                                {tech
                                                                                    .split(":")
                                                                                    .pop()
                                                                                    .replace(/-DARK|BRAND-|-ICON|FILE-TYPE-/gi, "")
                                                                                    .toUpperCase()}
                                                                            </div>
                                                                        ))}

                                                                </div>

                                                            )}

                                                            {displayCard.type === "Actions" && (
                                                                <div className="h-full flex flex-col justify-center pointer-events-auto">
                                                                    <a
                                                                        href={displayCard.project.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="group/btn flex items-center justify-center gap-3 py-3.5 bg-primary text-primary-foreground rounded-2xl font-bold text-xs transition-all hover:bg-primary/90"
                                                                    >
                                                                        {displayCard.project.cta}
                                                                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}