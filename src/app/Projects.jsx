'use client';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StackIcon from "tech-stack-icons";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextAnimation from "@/components/TextAnimation";
import { DotPattern } from '@/components/magicui/dot-pattern';

const projects = [
    {
        title: "Earning Area",
        icon: "php",
        shortDescription: "A reward distribution platform that enables users to seamlessly distribute monetary rewards to a large community with minimal effort. It integrates with Paytm Payout API, Paytm Payment Gateway, and OpenMoney to handle transactions securely.",
        description: <p className="text-sm mb-4 text-sm">
            A reward distribution platform that enables users to seamlessly distribute monetary rewards to a large community with minimal effort. It integrates with Paytm Payout API, Paytm Payment Gateway, and OpenMoney to handle transactions securely.
            <br /><br />
            The platform supports advanced filters such as requiring users to join a Telegram channel or watch a YouTube video before claiming a reward. Rewards can be distributed in interactive formats like <strong>Lifafa</strong> (envelope-based distribution) or <strong>scratch cards</strong>, enhancing user engagement and participation.
        </p>,
        color: "#B33791",
        link: "https://earningarea.org/",
        duration: "Jan 2024 – Present",
        techStack: ["html5", "css3", "js", "jquery", "php", "mysql", "nodejs", "mongodb", "redis", 'SOCKETIO', 'OPENMONEY-API', 'PAYTM-API', 'TELEGRAM-API', 'YOUTUBE-API'],
        repo: "https://github.com/yourusername/earning-area"
    },
    {
        title: "Dream10",
        icon: "nextjs2",
        link: "https://dream10.in/",
        shortDescription: "A real-time, competitive quiz application that allows users to join live contests and answer questions simultaneously. The system ensures fairness by broadcasting each question to all participants at the exact same time, effectively preventing cheating or time-based",
        description: <p>
            A real-time, competitive quiz application that allows users to join live contests and answer questions simultaneously. The system ensures fairness by broadcasting each question to all participants at the exact same time, effectively preventing cheating or time-based advantages. Players can participate in daily, weekly, or special-themed contests, with each contest tailored to a specific topic or difficulty level.
            <br /><br />
            Rankings are calculated based on accuracy and response time, and prizes are distributed according to the player’s final standing on the leaderboard. The platform encourages engagement through dynamic game modes, streak bonuses, and interactive feedback after each quiz. It's designed to deliver an exciting, skill-based experience for users seeking both entertainment and rewards.
        </p>,
        color: "#0C359E",
        duration: "Sep 2023 – Dec 2023",
        techStack: ["nodejs", "socketio", "redis", "mongodb", "nextjs2", "tailwindcss", "grafana", "rabbit-mq", "grafana", "prometheus", "loki", "coolify", "senatry", 'jwt', 'docker'],
        repo: "https://github.com/yourusername/quiz-app"
    },
    {
        title: "Lead Tracking System",
        icon: "nextjs2",
        link: "https://panel3.logicpay.in/",
        shortDescription: " An invite-only affiliate marketing platform designed to track and manage leads with precision. The system includes built-in fraud detection mechanisms to ensure the authenticity of each lead and protect against abuse. It offers a detailed reporting dashboard where affiliates can monitor their performance, traffic sources, and conversion metrics in real time.",
        description: <p>
            An invite-only affiliate marketing platform designed to track and manage leads with precision. The system includes built-in fraud detection mechanisms to ensure the authenticity of each lead and protect against abuse. It offers a detailed reporting dashboard where affiliates can monitor their performance, traffic sources, and conversion metrics in real time.
            <br /> <br />
            The platform also features a robust rewards distribution engine, supporting pending payments, manual and automated payouts, and customizable earning rules. Users can apply multiple filters to segment data, analyze campaign performance, and optimize targeting. This makes it an ideal solution for affiliate managers and marketers looking for transparency, control, and scalability.
        </p>,
        color: "#69247C",
        duration: "Sep 2023 – Dec 2023",
        techStack: ["nodejs", "redis", "mongodb", "nextjs2", "tailwindcss", "grafana", "bull-mq", "grafana", "prometheus", "loki", 'jwt', 'docker'],
        repo: "https://github.com/yourusername/quiz-app"
    },
    {
        title: "TOD-AI",
        icon: "react",
        link: "https://tod-ai-teal.vercel.app/",
        shortDescription: "ToD-AI is a fun and interactive web-based ai designed to teach toddlers  through engaging visuals, playful animations, and clear audio pronunciation. Each game is introduced with colorful illustrations and sound cues that capture a child’s attention and reinforce learning through repetition and interaction. The game provides a safe, intuitive, and distraction-free environment, perfect for early learners exploring the alphabet for the first time.",
        description: <p>
            ToD-AI is a fun and interactive web-based ai designed to teach toddlers  through engaging visuals, playful animations, and clear audio pronunciation. Each game is introduced with colorful illustrations and sound cues that capture a child’s attention and reinforce learning through repetition and interaction. The game provides a safe, intuitive, and distraction-free environment, perfect for early learners exploring the alphabet for the first time.
            <br /><br />
            Built using Next.js, React, and Tailwind CSS, the platform ensures fast performance, responsive design, and a seamless user experience across devices. Its clean codebase and modular component structure also make it easy to maintain and expand—for example, by adding mini-games, multilingual support, or phonics modules in the future. This project combines education and technology to create a delightful and effective learning tool for toddlers. </p>,
        color: "#000D6B",
        duration: "Sep 2023 – Dec 2023",
        techStack: ["nodejs", "mongodb", "nextjs2", "tailwindcss", 'jwt'],
        repo: "https://github.com/yourusername/quiz-app"
    },
    {
        title: "Data Vault",
        icon: "react",
        link: "https://datavault-two.vercel.app/",
        shortDescription: "Data Vault is a secure file-sharing platform that allows users to upload, store, and share files seamlessly with anyone on the platform. It provides a simple interface where users can manage their digital assets, organize them into categories, and share them with specific individuals or publicly through generated links. Designed for flexibility and ease of use, Data Vault ensures quick file access while maintaining user control over visibility and distribution.",
        description: <p>
            Data Vault is a secure file-sharing platform that allows users to upload, store, and share files seamlessly with anyone on the platform. It provides a simple interface where users can manage their digital assets, organize them into categories, and share them with specific individuals or publicly through generated links. Designed for flexibility and ease of use, Data Vault ensures quick file access while maintaining user control over visibility and distribution.
            <br /><br />
            What makes Data Vault unique is its use of Telegram as a backend storage system. By leveraging Telegram’s cloud infrastructure through bot APIs and secure messaging, the platform stores and retrieves files efficiently without relying on traditional cloud providers. This approach reduces hosting overhead while taking advantage of Telegram's reliability and scalability. Data Vault combines smart integration with secure file management to offer a lightweight, modern solution for peer-to-peer file sharing.
        </p>,
        color: "#780C28",
        duration: "Sep 2023 – Dec 2023",
        techStack: ["nodejs", "mongodb", "nextjs2", "tailwindcss", 'jwt', "TELEGRAM-API"],
        repo: "https://github.com/yourusername/quiz-app"
    }
];

const UNSUPPORTED_ICONS = new Set([
    'socketio', 'rest', 'jwt', 'dockercompose', 'nginx', 'ci', 'githubactions', 'stripe', 'razorpay', 'prometheus', 'loki', 'coolify', 'senatry', 'bugsink', 'SOCKETIO', 'OPENMONEY-API', 'PAYTM-API', 'TELEGRAM-API', 'YOUTUBE-API', "rabbit-mq", "bull-mq"
]);

export default function Projects() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <>
            <div className='snap-start text-center bg-background border-t border-b p-5'>
                <TextAnimation className='text-center'>Projects</TextAnimation>
            </div>
            <div className='snap-start relative overflow-hidden'>
                <VerticalTimeline>
                    {projects.map((project, index) => {
                        const isExpanded = expandedIndex === index;
                        const shortDescription = typeof project.shortDescription === 'string'
                            ? project.shortDescription.slice(0, 120) + "..."
                            : null;

                        return (
                            <VerticalTimelineElement
                                key={index}
                                className="vertical-timeline-element--work font-sans"
                                contentArrowStyle={{ borderRight: `7px solid ${project.color}` }}
                                iconStyle={{ background: project.color, boxShadow: "none" }}
                                contentStyle={{ background: project.color, color: '#fff' }}
                                iconClassName="flex justify-center items-center"
                                icon={
                                    <div className='flex justify-center items-center'>
                                        <StackIcon name={project.icon} className='h-10 w-10 -mt-4 -ml-4' />
                                    </div>
                                }
                            >
                                <h3 className="vertical-timeline-element-title text-xl font-bold mb-2">
                                    {project.title}
                                </h3>

                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={isExpanded ? 'expanded' : 'collapsed'}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="text-sm mb-2">
                                            {isExpanded ? project.description : shortDescription}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="text-xs underline underline-offset-2 hover:text-white/80 transition"
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </button>

                                {project.techStack && (
                                    <div className="flex mt-5 flex-wrap gap-2 mb-4">
                                        {project.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 flex justify-center items-center py-1 text-xs bg-white/20 rounded font-mono"
                                            >
                                                {UNSUPPORTED_ICONS.has(tech)
                                                    ? tech.toUpperCase()
                                                    : <StackIcon name={tech} className="h-10 w-10" />}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className='flex gap-5'>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm underline underline-offset-2 hover:text-white/80 transition"
                                    >Visit →</a>

                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm underline underline-offset-2 hover:text-white/80 transition"
                                        >
                                            View Code →
                                        </a>
                                    )}
                                </div>
                            </VerticalTimelineElement>
                        );
                    })}

                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', boxShadow: "none" }}
                        iconClassName="flex justify-center items-center"
                        icon={
                            <div className='flex justify-center items-center'>
                                <StackIcon name="react" className='h-10 w-10 -mt-4 -ml-4' />
                            </div>
                        }
                    />
                </VerticalTimeline>

                <div className='fixed inset-0 -z-1'>
                    <DotPattern className="absolute inset-0 -z-10 opacity-20" />
                </div>
            </div>
        </>
    );
}
