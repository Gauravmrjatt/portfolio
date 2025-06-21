// FIXED: OrbitingCircles now stays sticky until all tech grid content is scrolled
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { DotPattern } from '@/components/magicui/dot-pattern';
import StackIcon from "tech-stack-icons";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";



const USE_ICONS = true;

const categories = [
    {
        title: 'LANGUAGES',
        techs: ['js', 'typescript', 'php', 'c++', 'java', 'python', 'bash'],
    },
    {
        title: 'FRONTEND',
        techs: ['html5', 'css3', 'tailwindcss', 'js', 'typescript', 'react', 'nextjs', 'jquery', 'redux', 'pugjs', 'threejs', 'shadcnui', 'materialui'],
    },
    {
        title: 'BACKEND',
        techs: ['nodejs', 'expressjs', 'rest', 'graphql', 'socketio', 'jwt', 'pwa'],
    },
    {
        title: 'DATABASES',
        techs: ['mongodb', 'postgresql', 'mysql', 'redis'],
    },
    {
        title: 'ORMs / ODMs / Validation',
        techs: ['mongoose', 'prisma', 'zod'],
    },
    {
        title: 'DEVOPS & CLOUD',
        techs: ['docker', 'dockercompose', 'nginx', 'ci', 'githubactions', 'vercel', 'aws', 'coolify'],
    },
    {
        title: 'MONITORING & LOGGING',
        techs: ['grafana', 'prometheus', 'loki', 'senatry', 'bugsink'],
    },
    {
        title: 'TOOLS & UTILITIES',
        techs: ['git', 'github', 'vscode', 'postman', 'figma', 'firebase', 'auth0', 'json'],
    },
];

const allTechs = Array.from(new Set(categories.flatMap(category => category.techs)));

const formatTechName = (tech) => tech
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\d+$/, '')
    .replace('js', 'JS')
    .replace('css', 'CSS')
    .replace('html', 'HTML')
    .replace('pwa', 'PWA')
    .replace('jwt', 'JWT')
    .replace('rest', 'REST')
    .replace('ci', 'CI/CD')
    .replace('c++', 'C++')
    .toUpperCase();

const UNSUPPORTED_ICONS = new Set([
    'socketio', 'rest', 'jwt', 'dockercompose', 'nginx', 'ci', 'githubactions', 'stripe', 'razorpay', 'prometheus', 'loki', 'coolify', 'senatry', 'bugsink'
]);

export default function TechStackSection() {
    const [showIcons, setShowIcons] = useState(USE_ICONS);

    return (
        <section className="relative py-16 overflow-hidden">
            <div className="text-4xl pt-6 text-center font-medium font-sans flex justify-center mb-4">
                <PointerHighlight className="bg-background">TECH & STACKS</PointerHighlight>
            </div>

            {/* <button
                onClick={() => setShowIcons(!showIcons)}
                className="mb-12 mx-auto px-4 py-2 rounded-full bg-muted text-sm font-medium flex items-center gap-2 transition-all hover:bg-muted/50"
            >
                <div className={`w-3 h-3 rounded-full ${showIcons ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {showIcons ? 'Icons Enabled' : 'Icons Disabled'}
            </button> */}

            <div className="relative mb-0 overflow-hidden py-4 border-y border-muted bg-background">
                <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-100%'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                    {[...allTechs, ...allTechs].map((tech, index) => {
                        const isUnsupported = UNSUPPORTED_ICONS.has(tech);
                        const shouldShowIcon = showIcons && !isUnsupported;
                        return (
                            <div key={`${tech}-${index}`} className="flex items-center mx-6">
                                {shouldShowIcon ? (
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <StackIcon className="w-10 h-10" name={tech} />
                                    </div>
                                ) : (
                                    <span className="text-sm font-medium capitalize whitespace-nowrap">
                                        {formatTechName(tech)}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
            </div>

            <div className="md:flex max-h-[100vh] overflow-y-auto mt-3 hide-scrollbar h-screen">
                <div className="sticky -z-1 top-20 self-start w-full md:w-[50%] h-fit flex items-center justify-center">
                    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                        <OrbitingCircles iconSize={40}>
                            {[...categories[0].techs].map((tech, index) => {
                                const isUnsupported = UNSUPPORTED_ICONS.has(tech);
                                const shouldShowIcon = showIcons && !isUnsupported;
                                return (
                                    <div key={`${tech}-${index}`} className="flex items-center mx-6">
                                        {shouldShowIcon ? (
                                            <div className="flex flex-col items-center justify-center p-2">
                                                <StackIcon className="w-10 h-10" name={tech} />
                                            </div>
                                        ) : (
                                            <span className="text-sm font-medium capitalize whitespace-nowrap">
                                                {formatTechName(tech)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </OrbitingCircles>
                        <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                            {[...categories[2].techs].map((tech, index) => {
                                const isUnsupported = UNSUPPORTED_ICONS.has(tech);
                                const shouldShowIcon = showIcons && !isUnsupported;
                                return (
                                    <div key={`${tech}-${index}`} className="flex items-center mx-6">
                                        {shouldShowIcon ? (
                                            <div className="flex flex-col items-center justify-center p-2">
                                                <StackIcon className="w-10 h-10" name={tech} />
                                            </div>
                                        ) : (
                                            <span className="text-sm font-medium capitalize whitespace-nowrap">
                                                {formatTechName(tech)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </OrbitingCircles>
                    </div>
                </div>

                <div className="z-10 bg-background/90 w-full md:w-[50%] space-y-12 pb-32 ">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="rounded-3xl p-6 bg-background backdrop-blur-md border border-muted mx-4 transition-all"
                        >
                            <h2 className="text-2xl font-sans font-bold tracking-wide mb-5 text-center underline decoration-muted underline-offset-4">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {category.techs.map((tech, techIndex) => {
                                    const isUnsupported = UNSUPPORTED_ICONS.has(tech);
                                    const shouldShowIcon = showIcons && !isUnsupported;
                                    const techName = formatTechName(tech);

                                    return (
                                        <motion.div
                                            key={tech}
                                            whileHover={{ scale: 1.08, rotate: 1 }}
                                            whileTap={{ scale: 0.96 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 15,
                                                delay: techIndex * 0.02,
                                            }}
                                            className={`flex flex-col items-center justify-center text-center p-3 rounded-xl border border-muted bg-muted/10 hover:bg-muted/30 backdrop-blur-sm transition-all duration-200 cursor-pointer ${!shouldShowIcon ? 'min-h-[80px]' : ''}`}
                                        >
                                            {shouldShowIcon ? (
                                                <>
                                                    <StackIcon className="w-8 h-8 mb-1 drop-shadow-md" name={tech} />
                                                    <span className="text-xs font-mono font-medium capitalize mt-1">
                                                        {techName}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xs font-mono font-medium">{techName}</span>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <DotPattern className="absolute inset-0 -z-10 opacity-20" size={20} radius={1} />
            <div className="absolute inset-x-0 top-1/2 h-[200px] bg-gradient-to-b from-background to-transparent -z-20" />
            <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-background to-transparent -z-20" />
        </section>
    );
}