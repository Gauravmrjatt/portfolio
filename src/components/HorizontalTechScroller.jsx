// "use client"

// import { useEffect, useRef } from "react"
// import { Icon } from "@iconify/react"
// import { motion } from "framer-motion"
// import { Component as CardStack } from "@/components/ui/card-stack"

// function formatTechName(iconName) {
//   const parts = iconName.split(':')
//   const name = parts[parts.length - 1]
//     .split('-')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ')
//   return name
// }

// const categories = [
//   {
//     title: 'LANGUAGES',
//     techs: ['skill-icons:javascript', 'skill-icons:typescript', 'logos:php', 'skill-icons:cpp', 'logos:java', 'logos:python', 'logos:bash-icon'],
//   },
//   {
//     title: 'FRONTEND',
//     techs: ['logos:html-5', 'skill-icons:css', 'skill-icons:tailwindcss-dark', 'skill-icons:javascript', 'skill-icons:typescript', 'logos:react', 'logos:nextjs-icon', 'skill-icons:jquery', 'logos:redux', 'logos:pug', 'skill-icons:threejs-dark', 'simple-icons:shadcnui', 'logos:material-ui', 'devicon:zustand', 'simple-icons:nextui'],
//   },
//   {
//     title: 'BACKEND',
//     techs: ['logos:nodejs-icon', 'skill-icons:expressjs-dark', 'vscode-icons:file-type-rest', 'material-icon-theme:graphql', 'logos:socket-io', 'logos:jwt-icon', 'logos:pwa'],
//   },
//   {
//     title: 'DATABASES',
//     techs: ['logos:mongodb-icon', 'logos:postgresql', 'logos:mysql', 'devicon:redis'],
//   },
//   {
//     title: 'ORMs / ODMs / Validation',
//     techs: ['devicon:mongoose-wordmark', 'material-icon-theme:prisma', 'logos:zod'],
//   },
//   {
//     title: 'DEVOPS & CLOUD',
//     techs: ['material-icon-theme:docker', 'material-icon-theme:nginx', 'devicon:githubactions', 'skill-icons:vercel-dark', 'skill-icons:aws-dark', 'coolify', 'ci'],
//   },
//   {
//     title: 'MONITORING & LOGGING',
//     techs: ['devicon:grafana', 'devicon:prometheus', 'loki', 'material-icon-theme:sentry', 'bugsink'],
//   },
//   {
//     title: 'TOOLS & UTILITIES',
//     techs: ['skill-icons:git', 'skill-icons:github-light', 'material-icon-theme:vscode', 'devicon:postman', 'logos:figma', 'vscode-icons:file-type-firebase', 'simple-icons:auth0', 'material-icon-theme:json'],
//   },
// ];

// export default function TechStackSection() {
//   const scrollerRef = useRef(null)

//   return (
//     <section className="py-16 md:py-32 bg-background">
//       {/* Title - Responsive */}
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="text-5xl md:text-7xl font-bold text-center mb-12 md:mb-20 tracking-tight"
//       >
//         TECH & SKILLS
//       </motion.h1>

//       {/* Horizontal Scroller - Mobile: Native swipe with snap | Desktop: Simple overflow */}
//       <div
//         ref={scrollerRef}
//         className="flex gap-8 md:gap-16 overflow-x-auto px-6 md:px-12 snap-x snap-mandatory scrollbar-hide"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {/* Intro Panel: Clean grid of key icons */}
//         <div className="flex-shrink-0 w-[85vw] md:w-[70vw] max-w-4xl snap-center">
//           <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-10">
//             {categories.flatMap(cat => cat.techs).slice(0, 24).map((tech, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.05 }}
//                 whileHover={{ scale: 1.15, rotate: 8 }}
//                 className="flex items-center justify-center p-4 md:p-6 bg-card/80 rounded-2xl border border-border/50 backdrop-blur-sm shadow-lg"
//               >
//                 <Icon icon={tech} className="w-12 h-12 md:w-16 md:h-16" />
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Category Panels */}
//         {categories.map((category, idx) => {
//           const techCards = category.techs.map((tech, i) => ({
//             id: `${category.title}-${i}`,
//             title: formatTechName(tech),
//             description: "Proficient in modern workflows",
//             icon: <Icon icon={tech} className="w-10 h-10 md:w-12 md:h-12" />,
//           }))

//           return (
//             <div
//               key={idx}
//               className="flex-shrink-0 w-[85vw] md:w-[70vw] max-w-4xl snap-center flex flex-col items-center gap-8 md:gap-12"
//             >
//               <motion.h2
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="text-3xl md:text-5xl font-bold tracking-wider text-center"
//               >
//                 {category.title}
//               </motion.h2>

//               <CardStack
//                 cards={techCards}
//                 defaultLayout="stack"
//                 className="w-full max-w-md"
//               />
//             </div>
//           )
//         })}

//         {/* Final Panel */}
//         <div className="flex-shrink-0 w-[85vw] md:w-[60vw] snap-center flex flex-col items-center justify-center gap-6 text-center">
//           <motion.h2
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-6xl font-bold tracking-wide"
//           >
//             & More...
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-lg md:text-2xl text-muted-foreground max-w-md"
//           >
//             Always learning new tools, frameworks, and best practices.
//           </motion.p>
//         </div>
//       </div>

//       {/* Mobile Scroll Indicator */}
//       <div className="mt-8 flex justify-center gap-3 md:hidden">
//         <span className="text-sm text-muted-foreground">Swipe to explore →</span>
//         <motion.div
//           animate={{ x: [0, 12, 0] }}
//           transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
//           className="text-primary"
//         >
//           →
//         </motion.div>
//       </div>

//       {/* Custom scrollbar hide */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   )
// }
import { AnimatedFolder } from "@/components/ui/3d-folder"
import { Icon } from "@iconify/react"
const portfolioData = [
  {
    title: "Branding",
    projects: [
      { id: "1", image:  <Icon icon={"skill-icons:javascript"} className="w-12 h-12 md:w-16 md:h-16" />, title: "Lumnia" },
      { id: "2", image: <Icon icon={"skill-icons:javascript"} className="w-12 h-12 md:w-16 md:h-16" />, title: "Prism" },
      { id: "3", image: <Icon icon={"skill-icons:javascript"} className="w-12 h-12 md:w-16 md:h-16" />, title: "Vertex" },
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center w-full">
     
      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-center w-full">
          {portfolioData.map((folder) => (
            <AnimatedFolder key={folder.title} title={folder.title} projects={folder.projects} />
          ))}
        </div>
      </section>

    </main>
  )
}

