"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ParallaxScroll, { ParallaxLayer, ParallaxHeroExample } from "@/components/ParallaxScroll";
import MonochromeBackground from "@/components/MonochromeBackground";
import { useTheme } from "next-themes";
const skills = [
    "MERN Stack",
    "LAMP Stack",
    "Next.js",
    "Docker",
]

export default function AboutMe() {
    const { theme } = useTheme();
    const [ref, inView] = useInView({
        threshold: 0.15,
        triggerOnce: true,
    })

    return (
        // <ParallaxScroll>
            <section
                ref={ref}
                className="snap-start relative min-h-screen overflow-hidden bg-background flex items-center "
            >
                {/* <ParallaxLayer speed={0}>
                     <MonochromeBackground theme={theme} />
                </ParallaxLayer> */}

                {/* Clean, subtle background with depth */}

                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8" />
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_var(--primary)_10%,_transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--secondary)_8%,_transparent_50%)]" />
                    </div>
                </div>
                {/* <ParallaxLayer speed={0.1} offset={2}> */}
                    <div className="container mx-auto px-6">

                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center max-w-7xl mx-auto">
                            {/* Image Section – Clean, elevated, modern */}

                            <motion.div
                                initial={{ opacity: 0, x: -80 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="flex justify-center"
                            >
                                <div className="relative group">
                                    {/* Soft outer glow */}
                                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition duration-1000" />

                                    {/* Image container */}
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.7 }}
                                            className="overflow-hidden rounded-3xl shadow-none"
                                        >
                                            <img
                                                src="/me2.png"
                                                alt="Gaurav"
                                                className="w-96 h-96 md:w-[440px] md:h-[440px] object-cover rounded-3xl"
                                            />
                                        </motion.div>

                                        {/* Floating badge */}

                                    </div>
                                </div>
                            </motion.div>

                            {/* Text Section – Spacious, elegant, highly readable */}

                            <motion.div
                                initial={{ opacity: 0, x: 80 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="space-y-12 mt-50"
                            >
                                {/* Greeting & Title */}
                                <div className="space-y-6">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4, duration: 0.9 }}
                                        className="text-5xl md:text-7xl font-bold leading-tight"
                                    >
                                        Hi, I'm{" "}
                                        <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                                            Gaurav
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.6, duration: 0.9 }}
                                        className="text-3xl md:text-4xl font-light text-foreground/80"
                                    >
                                        Passionate Full-Stack Developer
                                    </motion.p>
                                </div>

                                {/* Description paragraphs – airy and scannable */}
                                <div className="space-y-7 text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl">
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.8 }}
                                    >
                                        I'm an engineering student crafting modern, high-performance web applications that deliver exceptional user experiences.
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 1.0 }}
                                    >
                                        I specialize in the <strong className="font-semibold">MERN</strong> and <strong className="font-semibold">LAMP</strong> stacks, with extensive experience in{" "}
                                        <strong className="font-semibold">Next.js</strong>, <strong className="font-semibold">Redis</strong>,{" "}
                                        <strong className="font-semibold">Docker</strong>, and <strong className="font-semibold">PostgreSQL</strong>.
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 1.2 }}
                                    >
                                        I've built and optimized real-time systems supporting{" "}
                                        <span className="text-primary font-bold">over 100k concurrent users</span>, while designing clean, responsive, and intuitive interfaces.
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 1.4 }}
                                        className="text-2xl font-medium text-foreground"
                                    >
                                        I turn complex problems into elegant, efficient, and scalable solutions.
                                    </motion.p>
                                </div>

                                {/* Skills – Minimal, animated pills */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.6 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    {skills.map((skill, i) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 1.7 + i * 0.08, duration: 0.5 }}
                                            whileHover={{ scale: 1.1, y: -4 }}
                                            className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-foreground/90 font-medium rounded-full border border-primary/20 transition-all duration-300"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>

                             
                            </motion.div>
                        </div>

                    </div>
                {/* </ParallaxLayer> */}
                {/* <MonochromeBackground theme={theme} /> */}
            </section>
        // </ParallaxScroll>
    )
}