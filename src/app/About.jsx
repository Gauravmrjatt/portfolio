'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Gitlab, MapPin } from "lucide-react";
import Glow from "@/components/Glow";
const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "100+", label: "Problems Solved" },
    { value: "5+", label: "Projects" },
];

const skills = [
    "MERN Stack",
    "LAMP Stack",
    "Next.js",
    "Docker",
    "PostgreSQL",
    "Redis",
    "TypeScript",
    "Tailwind CSS",
];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const card = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function AboutMe() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section
            id="about"
            className="relative min-h-screen bg-background/50 px-4 py-20 overflow-x-hidden flex justify-center items-center"
        >
            {/* Background Glow */}
            <div className="
  fixed 
  top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 
  scale-[3]
  pointer-events-none
  opacity-30
">
                <Glow x={-40} y={-30} color="rgba(227,148,0,0.25)" />
                <Glow x={40} y={-20} color="rgba(0,151,254,0.25)" />
                <Glow x={55} y={20} color="rgba(0,173,9,0.25)" />
                <Glow x={0} y={55} color="rgba(243,71,255,0.25)" />
                <Glow x={-55} y={20} color="rgba(153,102,255,0.25)" />
                <Glow x={-35} y={-5} color="rgba(255,71,71,0.25)" />
            </div>

            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="relative z-10 max-w-7xl mx-auto space-y-6 overflow-hidden"
            >
                {/* ================= TOP ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* Profile */}
                    <motion.div
                        variants={card}
                        className="
              lg:col-span-4
              border border-border rounded-3xl p-8
              flex flex-col items-center justify-center text-center
              min-h-[520px]
              overflow-hidden bg-background/50
            "
                    >
                        <img
                            src="/me2.png"
                            alt="Gaurav"
                            className="rounded-2xl aspect-square object-cover max-w-[240px] w-full"
                        />

                        <h2 className="text-3xl font-bold mt-6">Gaurav</h2>
                        <p className="text-muted-foreground">Full-Stack Developer</p>

                        <div className="flex items-center gap-2 text-muted-foreground mt-3">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="text-sm">New Mathura, India</span>
                        </div>

                        <div className="flex gap-6 mt-5">
                            <Github className="h-6 w-6 hover:scale-125 transition" />
                            <Gitlab className="h-6 w-6 hover:scale-125 transition" />
                        </div>
                    </motion.div>

                    {/* Right side */}
                    <div className="lg:col-span-8  grid grid-cols-1 gap-6 overflow-hidden">
                        {/* About */}
                        <motion.div
                            variants={card}
                            className="
                border border-border rounded-3xl p-8 sm:p-10
                flex flex-col justify-center
                text-center lg:text-left
                bg-background/50
                min-h-[260px]
                overflow-hidden
              "
                        >
                            <h3 className="text-3xl font-bold mb-6">About Me</h3>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-full">
                                I’m a passionate Full-Stack Developer who enjoys building scalable,
                                performant, and pixel-perfect web experiences. I specialize in
                                MERN, LAMP, Next.js, and backend-focused systems.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={card}
                            className="
                border border-border rounded-3xl p-8
                grid grid-cols-1 sm:grid-cols-3 gap-6
                text-center
                overflow-hidden
                bg-background/50
              "
                        >
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-4xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ================= SKILLS (FULL WIDTH) ================= */}
                <motion.div
                    variants={card}
                    className="
            border border-border rounded-3xl p-6 sm:p-8
            overflow-hidden
            bg-background/50
          "
                >
                    <div
                        className="
              max-w-full
              flex flex-wrap
              justify-center
              gap-2 sm:gap-4
            "
                    >
                        {skills.map((skill) => (
                            <motion.span
                                key={skill}
                                whileHover={{ scale: 1.08, y: -2 }}
                                className="
                  px-3 py-1.5 sm:px-6 sm:py-3
                  rounded-full bg-muted
                  text-xs sm:text-sm font-medium
                  whitespace-nowrap
                  max-w-full
                "
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
