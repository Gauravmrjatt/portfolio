"use client";

import { ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import MonochromeBackground from "@/components/MonochromeBackground";
import { useTheme } from "next-themes";
const BentoGrid = ({ children, isMobile }) => {
  if (isMobile) {
    return <div className="w-full">{children}</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-6">
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  icon,
  description,
  href,
  cta,
  techStack = [],
  className,
  backgroundClass,
}) => {
  const UNSUPPORTED_ICONS = new Set([
    "coolify",
    "loki",
    "OPENMONEY-API",
    "bull-mq",
    "TELEGRAM-API",
    "paytm",
  ]);

  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60",
        "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-xl hover:shadow-2xl",
        "transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015]",
        "w-full", // ensures full width in carousel
        className
      )}
    >
      <MonochromeBackground theme={theme} />
      <div className={cn("absolute inset-0 opacity-40", backgroundClass)} />

      <div className="relative z-10 flex flex-col h-full p-7 md:p-9">
        <div className="flex items-center gap-5 mb-6">
          <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-800">
            <Icon icon={icon} className="h-10 w-10 text-neutral-800 dark:text-neutral-200" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {name}
          </h3>
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-8">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-300/40 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300"
              >
                {UNSUPPORTED_ICONS.has(tech) ? (
                  tech.toUpperCase().replace(/-/g, " ")
                ) : (
                  <Icon icon={tech} className="h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl",
              "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
              "hover:bg-neutral-800 dark:hover:bg-neutral-100",
              "transition-all duration-300 hover:gap-3 hover:shadow-lg"
            )}
          >
            {cta}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};



const projects = [
  {
    title: "Earning Area",
    icon: "logos:php",
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
      "OPENMONEY-API",
      "simple-icons:paytm",
      "logos:telegram",
      "logos:youtube-icon",
    ],
    span: "lg:col-span-7",
    background: "bg-gradient-to-br from-white to-black/20 dark:from-white/30 dark:to-transparent",
  },
  {
    title: "Dream10",
    icon: "devicon:nextjs",
    description:
      "Real-time competitive quiz app with live contests, fair question broadcasting via Socket.IO, leaderboards, and prize distribution.",
    link: "https://dream10.in/",
    cta: "Visit Site",
    techStack: [
      "logos:nodejs-icon",
      "logos:socket-io",
      "devicon:redis",
      "logos:mongodb-icon",
      "devicon:nextjs",
      "devicon:tailwindcss",
      "devicon:rabbitmq",
      "logos:grafana",
      "logos:prometheus",
      "loki",
      "coolify",
      "vscode-icons:file-type-sentry",
      "logos:jwt-icon",
      "logos:docker-icon",
    ],
    span: "lg:col-span-5",
    background: "bg-gradient-to-br from-white to-black/20 dark:from-white/30 dark:to-transparent",
  },
  {
    title: "Lead Tracking System",
    icon: "skill-icons:nextjs-dark",
    description:
      "Invite-only affiliate marketing platform with fraud detection, real-time dashboards, and automated payout engine.",
    link: "https://panel3.logicpay.in/",
    cta: "Visit Dashboard",
    techStack: [
      "logos:nodejs-icon",
      "devicon:redis",
      "logos:mongodb-icon",
      "devicon:nextjs",
      "devicon:tailwindcss",
      "logos:grafana",
      "bull-mq",
      "logos:prometheus",
      "loki",
      "logos:jwt-icon",
      "logos:docker-icon",
    ],
    span: "lg:col-span-4",
    background: "bg-gradient-to-br from-white to-black/20 dark:from-white/30 dark:to-transparent",
  },
  {
    title: "TOD-AI",
    icon: "material-icon-theme:react-ts",
    description:
      "Interactive toddler learning app teaching the alphabet through animations, audio pronunciation, and engaging visuals.",
    link: "https://tod-ai-teal.vercel.app/",
    cta: "Try It",
    techStack: [
      "logos:nodejs-icon",
      "logos:mongodb-icon",
      "devicon:nextjs",
      "devicon:tailwindcss",
      "logos:jwt-icon",
    ],
    span: "lg:col-span-4",
    background: "bg-gradient-to-br from-white to-black/20 dark:from-white/30 dark:to-transparent",
  },
  {
    title: "Data Vault",
    icon: "skill-icons:react-dark",
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
      "TELEGRAM-API",
    ],
    span: "lg:col-span-4",
    background: "bg-gradient-to-br from-white to-black/20 dark:from-white/30 dark:to-transparent",
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
 
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative">
      <div className="text-center mb-16 md:mb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-60">My Projects</h1>
      </div>

      {isMobile ? (
        <div className="px-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {projects.map((project, index) => (
                <div key={project.title} className="flex-none pl-4 w-full">
                  <BentoCard
                    name={project.title}
                    icon={project.icon}
                    description={project.description}
                    href={project.link}
                    cta={project.cta}
                    techStack={project.techStack}
                    backgroundClass={project.background}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Optional dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  selectedIndex === index ? "bg-neutral-900 dark:bg-white w-8" : "bg-neutral-400"
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <BentoGrid isMobile={isMobile}>
          {projects.map((project) => (
            <BentoCard
              key={project.title}
              name={project.title}
              icon={project.icon}
              description={project.description}
              href={project.link}
              cta={project.cta}
              techStack={project.techStack}
              className={project.span}
              backgroundClass={project.background}
            />
          ))}
        </BentoGrid>
      )}
    </section>
  );
}