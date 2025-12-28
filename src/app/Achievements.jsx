import * as React from "react"
import { Trophy, Award, GraduationCap, Medal } from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
    {
        title: "Finalist in WebX",
        description: "Frontend Challenge by competitive coding community",
        date: "2024",
        icon: <Trophy className="h-6 w-6" />
    },
    {
        title: "WebForge",
        rank: "4th Rank",
        description: "National-level web development competition",
        date: "2025",
        icon: <Medal className="h-6 w-6" />
    },
    {
        title: "Code Arambh",
        rank: "4th Rank",
        description: "Intra-college coding contest",
        date: "2024",
        icon: <Award className="h-6 w-6" />
    },
    {
        title: "AWS Cloud Computing Certification (JOVAC)",
        issuer: "GLA University & Technical Guftgu",
        description: "Job-Oriented Value Added Course on AWS Cloud Computing",
        date: "2025",
        icon: <GraduationCap className="h-6 w-6" />
    }
]

const AchievementCard = ({ achievement }) => {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60",
                "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md",
                "p-6 md:p-8 shadow-lg hover:shadow-2xl",
                "transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
            )}
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 dark:opacity-30" />

            <div className="relative z-10">
                <div className="flex items-start gap-5">
                    <div
                        className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-xl",
                            "bg-primary/10 text-primary shadow-md",
                            "ring-4 ring-primary/20",
                            "group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        )}
                    >
                        {achievement.icon}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                                {achievement.title}
                            </h3>
                            {achievement.rank && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/20">
                                    {achievement.rank}
                                </span>
                            )}
                        </div>

                        {achievement.issuer && (
                            <p className="mt-1 text-sm font-medium text-primary">
                                {achievement.issuer}
                            </p>
                        )}

                        <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            {achievement.description}
                        </p>

                        <time className="mt-4 inline-block text-sm font-medium text-muted-foreground">
                            {achievement.date}
                        </time>
                    </div>
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
        </div>
    )
}

export default function Achievements() {
    return (
        <section className="py-20 md:py-32 bg-background min-h-[100vh]">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="text-center mb-16 md:mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Achievements & Certifications</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {achievements.map((achievement, index) => (
                        <AchievementCard key={index} achievement={achievement} />
                    ))}
                </div>
            </div>
        </section>
    )
}
