// FIXED: OrbitingCircles now stays sticky until all tech grid content is scrolled
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

import { Icon } from '@iconify/react';


const USE_ICONS = true;

const categories = [
    {
        title: 'LANGUAGES',
        techs: ['skill-icons:javascript', 'skill-icons:typescript', 'logos:php', 'skill-icons:cpp', 'logos:java', 'logos:python', 'logos:bash-icon'],
    },
    {
        title: 'FRONTEND',
        techs: ['logos:html-5', 'skill-icons:css', 'skill-icons:tailwindcss-dark', 'skill-icons:javascript', 'skill-icons:typescript', 'logos:react', 'logos:nextjs-icon', 'skill-icons:jquery', 'logos:redux', 'logos:pug', 'skill-icons:threejs-dark', 'simple-icons:shadcnui', 'logos:material-ui', 'devicon:zustand', 'simple-icons:nextui'],
    },
    {
        title: 'BACKEND',
        techs: ['logos:nodejs-icon', 'skill-icons:expressjs-dark', 'vscode-icons:file-type-rest', 'material-icon-theme:graphql', 'logos:socket-io', 'logos:jwt-icon', 'logos:pwa'],
    },
    {
        title: 'DATABASES',
        techs: ['logos:mongodb-icon', 'logos:postgresql', 'logos:mysql', 'devicon:redis'],
    },
    {
        title: 'ORMs / ODMs / Validation',
        techs: ['devicon:mongoose-wordmark', 'material-icon-theme:prisma', 'logos:zod'],
    },
    {
        title: 'DEVOPS & CLOUD',
        techs: ['material-icon-theme:docker', 'material-icon-theme:nginx', 'devicon:githubactions', 'skill-icons:vercel-dark', 'skill-icons:aws-dark', 'coolify', 'ci'],
    },
    {
        title: 'MONITORING & LOGGING',
        techs: ['devicon:grafana', 'devicon:prometheus', 'loki', 'material-icon-theme:sentry', 'bugsink'],
    },
    {
        title: 'TOOLS & UTILITIES',
        techs: ['skill-icons:git', 'skill-icons:github-light', 'material-icon-theme:vscode', 'devicon:postman', 'logos:figma', 'vscode-icons:file-type-firebase', 'simple-icons:auth0', 'material-icon-theme:json'],
    },
];

const allTechs = Array.from(new Set(categories.flatMap(category => category.techs)));
const formatTechName = (tech) => {
    const replacements = {
        file: "FIREBAE",
        js: 'JS',
        css: 'CSS',
        html: 'HTML',
        pwa: 'PWA',
        jwt: 'JWT',
        rest: 'REST',
        ci: 'CI/CD',
        cpp: 'C++',
        'c++': 'C++',
        socketio: 'Socket.IO',
        redis: 'Redis',
        mysql: 'MySQL',
        mongodb: 'MongoDB',
        php: 'PHP',
        docker: 'Docker',
        graphql: 'GraphQL',
        tailwindcss: 'Tailwind CSS',
        nextjs2: 'Next.js',
        nextjs: 'Next.js',
        nodejs: 'Node.js',
        'openmoney-api': 'OpenMoney API',
        'paytm-api': 'Paytm API',
        'telegram-api': 'Telegram API',
        'youtube-api': 'YouTube API',
        'rabbit-mq': 'RabbitMQ',
        'bull-mq': 'BullMQ',
        grafana: 'Grafana',
        prometheus: 'Prometheus',
        loki: 'Loki',
        coolify: 'Coolify',
        senatry: 'Senatry'
    };

    // extract from "LOGOS:NEXTJS-ICON" ➝ "nextjs"
    const match = tech.toLowerCase().match(/:(.*?)(?:-|$)/);
    const key = match ? match[1] : tech.toLowerCase();

    // return formatted from map or fallback
    return replacements[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
};


const UNSUPPORTED_ICONS = new Set([
    'coolify', 'ci/cd', 'loki', 'bugsink'
]);

export default function TechStackSection() {
    const [showIcons, setShowIcons] = useState(USE_ICONS);
    return (
        <section className="relative mb-6 overflow-hidden h-screen snap-start">

            {/* <button
                onClick={() => setShowIcons(!showIcons)}
                className="mb-12 mx-auto px-4 py-2 rounded-full bg-muted text-sm font-medium flex items-center gap-2 transition-all hover:bg-muted/50"
            >
                <div className={`w-3 h-3 rounded-full ${showIcons ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {showIcons ? 'Icons Enabled' : 'Icons Disabled'}
            </button> */}

            <div className="relative snap-start mb-0 overflow-hidden py-4 border-y border-muted bg-background">
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
                                        <Icon className="w-8 h-8 mb-1 drop-shadow-md" icon={tech} />  </div>
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

            <div className="md:flex snap-start h-screen md:snap-y snap-mandatory overflow-y-auto hide-scrollbar">

                <div className="md:sticky snap-start  -z-1 top-10 self-start w-full md:w-[50%] h-fit flex flex-col items-center justify-center">
                    <div className="text-4xl  text-center font-medium font-sans flex justify-center">
                        <PointerHighlight className="bg-background">TECH & SKILLS</PointerHighlight>
                    </div>
                    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                        <OrbitingCircles iconSize={40}>
                            {[...categories[0].techs].map((tech, index) => {
                                const isUnsupported = UNSUPPORTED_ICONS.has(tech);
                                const shouldShowIcon = showIcons && !isUnsupported;
                                return (
                                    <div key={`${tech}-${index}`} className="flex items-center mx-6">
                                        {shouldShowIcon ? (
                                            <div className="flex flex-col items-center justify-center p-2">
                                                <Icon className="w-8 h-8 mb-1 drop-shadow-md" icon={tech} />
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
                                                <Icon className="w-8 h-8 mb-1 drop-shadow-md" icon={tech} />
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
                            // transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="snap-start min-h-screen pt-4 flex-col justify-center px-6 bg-background/50 backdrop-blur-md border border-muted transition-all"
                        >
                            <h2 className="text-2xl font-sans font-bold tracking-wide mb-5 text-center underline decoration-muted underline-offset-4">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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
                                            className={`flex relative overflow-hidden flex-col items-center justify-center text-center py-3 rounded-xl border border-muted bg-muted/10 hover:bg-muted/30 backdrop-blur-sm transition-all duration-200 cursor-pointer ${!shouldShowIcon ? 'min-h-[80px]' : ''}`}
                                        >
                                            {shouldShowIcon ? (
                                                <>
                                                    <Icon className="w-12 h-12 mb-1 drop-shadow-md" icon={tech} />
                                                    <span className="text-xs font-mono font-medium capitalize mt-1">
                                                        {techName}
                                                    </span>
                                                    <div className='absolute -bottom-2 -right-2 -z-1 opacity-10'>
                                                        <Icon className="w-18 h-18 mb-1 drop-shadow-md" icon={tech} />
                                                    </div>
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