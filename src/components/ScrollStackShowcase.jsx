"use client"

import { Icon } from "@iconify/react"
import { ExternalLink } from "lucide-react"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"

const projects = [
  {
    title: "CodeLab",
    icon: "skill-icons:nextjs-dark",
    description:
      "Real-time collaborative coding platform featuring shared code editors, live cursors, rich text docs, whiteboard collaboration, and presence awareness.",
    link: "https://codellab.vercel.app/",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    borderColor: "border-blue-500/20 dark:border-blue-400/20",
  },
  {
    title: "Earning Area",
    icon: "logos:php",
    description:
      "A reward distribution platform that enables users to seamlessly distribute monetary rewards to a large community. Integrates Paytm & OpenMoney APIs with interactive formats.",
    link: "https://earningarea.org/",
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    borderColor: "border-emerald-500/20 dark:border-emerald-400/20",
  },
  {
    title: "Dream10",
    icon: "devicon:nextjs",
    description:
      "Real-time competitive quiz app with live contests, fair question broadcasting via Socket.IO, leaderboards, and prize distribution.",
    link: "https://dream10.in/",
    gradient: "from-amber-500/10 via-orange-500/10 to-red-500/10",
    borderColor: "border-amber-500/20 dark:border-amber-400/20",
  },
  {
    title: "Lead Tracking System",
    icon: "skill-icons:nextjs-dark",
    description:
      "Invite-only affiliate marketing platform with fraud detection, real-time dashboards, and automated payout engine.",
    link: "https://panel3.logicpay.in/",
    gradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
    borderColor: "border-violet-500/20 dark:border-violet-400/20",
  },
  {
    title: "TOD-AI",
    icon: "material-icon-theme:react-ts",
    description:
      "Interactive toddler learning app teaching the alphabet through animations, audio pronunciation, and engaging visuals.",
    link: "https://tod-ai-teal.vercel.app/",
    gradient: "from-sky-500/10 via-indigo-500/10 to-blue-500/10",
    borderColor: "border-sky-500/20 dark:border-sky-400/20",
  },
  {
    title: "Data Vault",
    icon: "mdi:shield-lock",
    description:
      "Secure file-sharing platform using Telegram Bot API as backend storage for efficient, low-cost file management.",
    link: "https://datavault-two.vercel.app/",
    gradient: "from-slate-500/10 via-gray-500/10 to-zinc-500/10",
    borderColor: "border-slate-500/20 dark:border-slate-400/20",
  },
  {
    title: "TicketHub",
    icon: "mdi:ticket",
    description:
      "Modern event ticket booking and management platform with secure authentication, event creation, ticket issuance, and attendee management.",
    link: "https://tickethub.vercel.app/",
    gradient: "from-rose-500/10 via-pink-500/10 to-red-500/10",
    borderColor: "border-rose-500/20 dark:border-rose-400/20",
  },
  {
    title: "Cashbackwallah",
    icon: "mdi:cash-multiple",
    description:
      "Logistics and shipping management platform for Indian e-commerce. Compare rates across 25+ carrier partners, book shipments, and manage wallet payments.",
    link: "https://cashbackwallah.com/",
    gradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    borderColor: "border-green-500/20 dark:border-green-400/20",
  },
  {
    title: "KanSpark",
    icon: "mdi:view-kanban",
    description:
      "Real-time collaborative Kanban project management application with drag-and-drop boards, lists, cards, team collaboration, and role-based permissions.",
    link: "https://kanspark-ruddy.vercel.app/",
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
    borderColor: "border-orange-500/20 dark:border-orange-400/20",
  },
  {
    title: "NEETCounselors",
    icon: "mdi:medical-bag",
    description:
      "India's trusted NEET counselling guidance platform. AI-powered college predictor, 1-on-1 video consultations, state-wise cutoff analysis, and live counselor booking.",
    link: "https://neetcounselors.com/",
    gradient: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
    borderColor: "border-cyan-500/20 dark:border-cyan-400/20",
  },
]

export default function ScrollStackShowcase() {
  return (
    <section className="w-full py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          My Projects
        </h2>
        <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Scroll through my featured work — each project stacks into view as you scroll.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ScrollStack
          stackPosition="15%"
          scaleEndPosition="5%"
          itemScale={0.02}
          baseScale={0.88}
          itemStackDistance={40}
          blurAmount={1}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.slug || project.title}>
              <div
                className={`relative h-full w-full rounded-[32px] border ${project.borderColor} bg-gradient-to-br ${project.gradient} backdrop-blur-xl bg-white/50 dark:bg-neutral-950/50 overflow-hidden group`}
              >
                <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-sm border border-neutral-200/50 dark:border-neutral-800/50">
                      <Icon icon={project.icon} className="h-8 w-8 text-neutral-800 dark:text-neutral-200" />
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/80 dark:bg-neutral-900/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-neutral-200/50 dark:border-neutral-800/50"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    </a>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      View Project
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent dark:from-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
