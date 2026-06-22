"use client";
import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { ExternalLink, ChevronRight, Layout, Code2, Server, Box } from "lucide-react";
import Link from "next/link";
import FanCarousel from "@/components/ui/fan-carousel";
import { getAllProjects } from "@/lib/projects-data";

const CARD_GRADIENTS = [
  "from-violet-600 to-indigo-700",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-blue-600 to-purple-700",
  "from-cyan-500 to-blue-600",
  "from-slate-600 to-gray-800",
  "from-orange-500 to-red-600",
  "from-amber-500 to-yellow-600",
  "from-teal-500 to-emerald-600",
  "from-rose-500 to-pink-700",
];

const CARD_ICONS = [
  "skill-icons:nextjs-dark",
  "logos:php",
  "skill-icons:react-dark",
  "skill-icons:nodejs-dark",
  "skill-icons:threejs-dark",
  "logos:telegram",
  "skill-icons:nextjs-dark",
  "skill-icons:nextjs-dark",
  "skill-icons:nextjs-dark",
  "skill-icons:nextjs-dark",
];

const TAB_ICONS = { Overview: Layout, Frontend: Code2, Backend: Server, Actions: Box };
const CARD_TYPES = ["Overview", "Frontend", "Backend", "Actions"];

const FRONTEND_KEYWORDS = [
  "html", "css", "javascript", "typescript", "react", "next", "tailwind",
  "radix", "zustand", "react-query", "tanstack", "framer", "three",
  "shadcn", "mantine", "dnd", "lexical", "monaco", "yjs", "styled",
  "jquery", "gsap", "swiper", "embla", "recharts", "date-fns",
  "react-hook-form", "zod", "lucide", "tabler", "lottie", "nextauth",
  "clsx", "axios", "next-auth", "react-table", "socket-io",
];

const BACKEND_KEYWORDS = [
  "node", "express", "prisma", "postgres", "mongo", "mongoose",
  "redis", "bullmq", "rabbitmq", "socket-io", "jwt", "bcrypt",
  "helmet", "cors", "docker", "prometheus", "grafana", "sentry",
  "nodemailer", "cloudinary", "razorpay", "paytm", "mysql",
  "payload", "cloudflare", "telegram", "nextauth", "next-auth",
  "bull", "loki", "graphql",
];

const TECH_ICON_MAP = {
  "Next.js": "skill-icons:nextjs-dark",
  "React": "skill-icons:react-dark",
  "TypeScript": "devicon:typescript",
  "Tailwind CSS": "devicon:tailwindcss",
  "Prisma": "simple-icons:prisma",
  "PostgreSQL": "logos:postgresql",
  "Express": "skill-icons:expressjs-dark",
  "Razorpay": "simple-icons:razorpay",
  "Redis": "devicon:redis",
  "BullMQ": "simple-icons:bullmq",
  "Socket.IO": "logos:socket-io",
  "Docker": "logos:docker-icon",
  "Zustand": "simple-icons:zustand",
  "TanStack Query": "simple-icons:reactquery",
  "Shadcn UI": "simple-icons:shadcnui",
  "Sentry": "simple-icons:sentry",
  "Mantine UI": "simple-icons:mantine",
  "MongoDB": "logos:mongodb-icon",
  "Mongoose": "simple-icons:mongoose",
  "JWT": "logos:jwt-icon",
  "dnd-kit": "simple-icons:dndkit",
  "Payload CMS": "simple-icons:payloadcms",
  "Radix UI": "simple-icons:radixui",
  "Cloudflare Turnstile": "simple-icons:cloudflare",
  "Lexical Editor": "simple-icons:lexical",
  "PHP": "logos:php",
  "MySQL": "logos:mysql",
  "Node.js": "skill-icons:nodejs-dark",
  "Paytm API": "simple-icons:paytm",
  "NextAuth": "simple-icons:nextauth",
  "Yjs": "simple-icons:yjs",
  "Monaco Editor": "simple-icons:monacoeditor",
  "Framer Motion": "simple-icons:framermotion",
  "Three.js": "skill-icons:threejs-dark",
  "Telegram API": "logos:telegram",
  "Grafana": "logos:grafana",
  "Prometheus": "logos:prometheus",
};

function getTechIcon(tech) {
  return TECH_ICON_MAP[tech] || `simple-icons:${tech.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

function isFrontend(tech) {
  const t = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
  return FRONTEND_KEYWORDS.some((kw) => t.includes(kw));
}

function isBackend(tech) {
  const t = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
  return BACKEND_KEYWORDS.some((kw) => t.includes(kw));
}

export default function ProjectDetailClient({ initialSlug }) {
  const projects = useMemo(() => getAllProjects(), []);
  const initialIndex = projects.findIndex((p) => p.slug === initialSlug);

  const [activeIndex, setActiveIndex] = useState(Math.max(0, initialIndex));
  const [activeTab, setActiveTab] = useState("Overview");
  const activeProject = projects[activeIndex];

  const fanItems = useMemo(
    () =>
      projects.map((p) => ({
        id: p.slug,
        linkUrl: `/projects/${p.slug}`,
        alt: p.title,
        imgUrl: null,
      })),
    [projects]
  );

  const handleCenterChange = (index) => {
    setActiveIndex(index);
    setActiveTab("Overview");
  };

  const renderCard = (item, index) => {
    const project = projects[index];
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
    const icon = CARD_ICONS[index % CARD_ICONS.length];
    const isCenter = index === activeIndex;

    return (
      <div
        className={`w-[160px] h-[280px] md:w-[200px] md:h-[340px] rounded-2xl overflow-hidden relative bg-gradient-to-br ${gradient} shadow-xl transition-shadow duration-300 ${isCenter ? "ring-2 ring-white/30 shadow-2xl" : ""}`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-5">
          <Icon icon={icon} className="w-12 h-12 md:w-16 md:h-16 text-white/90 mb-3" />
          <span className="text-white font-bold text-sm md:text-base text-center leading-tight">
            {project.title}
          </span>
        </div>
      </div>
    );
  };

  const tabContent = () => {
    if (!activeProject) return null;
    const techStackIcons = activeProject.techStack.map((tech) => ({
      name: tech,
      icon: getTechIcon(tech),
    }));

    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground/80 leading-relaxed text-base md:text-lg">
              {activeProject.description}
            </p>
            <a
              href={`/projects/${activeProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        );

      case "Frontend":
        return (
          <div className="flex flex-wrap gap-2">
            {techStackIcons
              .filter((t) => isFrontend(t.name))
              .map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 border border-border/50 rounded-full text-xs font-semibold text-muted-foreground"
                >
                  <Icon icon={t.icon} className="w-3.5 h-3.5" />
                  {t.name}
                </div>
              ))}
          </div>
        );

      case "Backend":
        return (
          <div className="flex flex-wrap gap-2">
            {techStackIcons
              .filter((t) => isBackend(t.name))
              .map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 border border-border/50 rounded-full text-xs font-semibold text-muted-foreground"
                >
                  <Icon icon={t.icon} className="w-3.5 h-3.5" />
                  {t.name}
                </div>
              ))}
          </div>
        );

      case "Actions":
        return (
          <div>
            <a
              href={activeProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Visit Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-4 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to home
        </Link>
      </div>

      <FanCarousel
        items={fanItems}
        renderCard={renderCard}
        onCenterChange={handleCenterChange}
        initialCenter={initialIndex}
      />

      {activeProject && (
        <div className="max-w-4xl mx-auto mt-8 md:mt-12 px-4 md:px-8 pb-20">
          <div className="border border-border/40 rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-4 p-6 md:p-8 pb-0">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                <Icon
                  icon={CARD_ICONS[activeIndex % CARD_ICONS.length]}
                  className="w-8 h-8 text-primary"
                />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                {activeProject.title}
              </h2>
            </div>

            <div className="flex gap-1 px-6 md:px-8 mt-6 border-b border-border/40">
              {CARD_TYPES.map((type) => {
                const TabIcon = TAB_ICONS[type];
                const isActive = activeTab === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[1px] ${
                      isActive
                        ? "text-foreground border-foreground"
                        : "text-muted-foreground/50 hover:text-foreground/80 border-transparent"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {type}
                  </button>
                );
              })}
            </div>

            <div className="p-6 md:p-8">{tabContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
