// import * as React from "react";
// import { Download, FileText } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";

// export default function DownloadResume() {
//   // Replace with your actual resume URL (PDF link)
//   const resumeUrl = "/resume.pdf"; // Example: place resume.pdf in public folder
//   // OR use Google Drive / Dropbox link:
//   // const resumeUrl = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

//   return (
//     <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/80">


//       <div className="container mx-auto px-6 max-w-5xl text-center">

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//   <h1 className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tight">
//          Ready to Work Together?
//         </h1>

//           <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
//             Download my resume to learn more about my skills, projects, and experience.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
//             {/* Main Download Button */}
//             <a
//               href={resumeUrl}
//               download
//               target="_blank"
//               rel="noopener noreferrer"
//               className={cn(
//                 "group relative inline-flex items-center gap-3",
//                 "px-8 py-4 rounded-2xl font-semibold text-lg",
//                 "bg-primary text-primary-foreground shadow-lg",
//                 "hover:bg-primary/90 hover:shadow-2xl",
//                 "transition-all duration-300 hover:-translate-y-1",
//                 "focus:outline-none focus:ring-4 focus:ring-primary/30"
//               )}
//             >
//               <Download className="h-6 w-6 group-hover:animate-bounce" />
//               Download Resume (PDF)
//             </a>

//             {/* Optional Secondary Button */}
//             <a
//               href={resumeUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={cn(
//                 "inline-flex items-center gap-3",
//                 "px-6 py-3 rounded-xl font-medium text-base",
//                 "bg-neutral-100 dark:bg-neutral-800 text-foreground",
//                 "border border-border/60 hover:bg-neutral-200 dark:hover:bg-neutral-700",
//                 "transition-all duration-300"
//               )}
//             >
//               <FileText className="h-5 w-5" />
//               View Resume Online
//             </a>
//           </div>

//           {/* Optional small note */}
//           <p  className="mt-6 text-sm text-muted-foreground">
//             Last updated: December 2025
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client"
import { useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import GetInTouch from "./GetInTouch";

export default function LetsWorkTogether() {

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    setIsClicked(true)

    setTimeout(() => {
      setShowSuccess(true)
    }, 500)
  }

  const handleBookCall = () => {
    window.open("https://cal.com/gauravmrjatt/15min", "_blank")
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-12">

        <div
          className="absolute inset-0 z-10 flex flex-col  justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none"
          }}
        >
          <div className="flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"> 
            {/* Elegant heading */}
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground transition-all duration-500"
                style={{
                  transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                  opacity: showSuccess ? 1 : 0,
                  transitionDelay: "100ms"
                }}
              >
                Perfect
              </span>
              <h3
                className="text-3xl font-light tracking-tight text-foreground transition-all duration-500 sm:text-4xl"
                style={{
                  transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                  opacity: showSuccess ? 1 : 0,
                  transitionDelay: "200ms"
                }}
              >
                Let's talk
              </h3>
            </div>

            {/* Book a call button */}
            <button
              onClick={handleBookCall}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer"
              style={{
                transform: showSuccess
                  ? isButtonHovered
                    ? "translateY(0) scale(1.02)"
                    : "translateY(0) scale(1)"
                  : "translateY(15px) scale(1)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "150ms"
              }}
            >
              {/* Left line */}
              <div
                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                style={{
                  transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                  opacity: isButtonHovered ? 0 : 0.5
                }}
              />

              {/* Button content */}
              <div
                className="relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
                style={{
                  borderColor: isButtonHovered
                    ? "var(--foreground)"
                    : "var(--border)",
                  backgroundColor: isButtonHovered
                    ? "var(--foreground)"
                    : "transparent",
                  boxShadow: isButtonHovered
                    ? "0 0 30px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)"
                    : "none"
                }}
              >
                <Calendar
                  className="size-4 transition-all duration-500 sm:size-5"
                  strokeWidth={1.5}
                  style={{
                    color: isButtonHovered
                      ? "var(--background)"
                      : "var(--foreground)"
                  }}
                />
                <span
                  className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base"
                  style={{
                    color: isButtonHovered
                      ? "var(--background)"
                      : "var(--foreground)"
                  }}
                >
                  Book a call
                </span>
                <ArrowUpRight
                  className="size-4 transition-all duration-500 sm:size-5"
                  strokeWidth={1.5}
                  style={{
                    color: isButtonHovered
                      ? "var(--background)"
                      : "var(--foreground)",
                    transform: isButtonHovered
                      ? "translate(3px, -3px) scale(1.1)"
                      : "translate(0, 0) scale(1)"
                  }}
                />
              </div>

              {/* Right line */}
              <div
                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                style={{
                  transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                  opacity: isButtonHovered ? 0 : 0.5
                }}
              />
            </button>

            {/* Subtle subtext */}
            <span
              className="text-xs tracking-widest uppercase text-muted-foreground/50 transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "450ms"
              }}
            >
              15 min intro call
            </span>
          </div>
          
          <GetInTouch />
        </div>

        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto"
          }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Available for projects
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={e => handleClick(e)}
          style={{
            pointerEvents: isClicked ? "none" : "auto"
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center text-5xl md:text-7xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked
                  ? "translateY(-40px) scale(0.95)"
                  : "translateY(0) scale(1)"
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)"
                  }}
                >
                  Let's work
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)"
                  }}
                >
                  <span className="text-muted-foreground/60">together</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isClicked
                    ? "var(--foreground)"
                    : isHovered
                      ? "var(--foreground)"
                      : "var(--border)",
                  backgroundColor: isClicked
                    ? "transparent"
                    : isHovered
                      ? "var(--foreground)"
                      : "transparent",
                  transform: isClicked
                    ? "scale(3)"
                    : isHovered
                      ? "scale(1.1)"
                      : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "700ms" : "500ms"
                }}
              />
              <ArrowUpRight
                className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                style={{
                  transform: isClicked
                    ? "translate(100px, -100px) scale(0.5)"
                    : isHovered
                      ? "translate(2px, -2px)"
                      : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color:
                    isHovered && !isClicked
                      ? "var(--background)"
                      : "var(--foreground)",
                  transitionDuration: isClicked ? "600ms" : "500ms"
                }}
              />
            </div>
          </div>

          <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
            <div
              className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(-20px)"
                  : isHovered
                    ? "scaleX(1.5)"
                    : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5
              }}
            />
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
            <div
              className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(20px)"
                  : isHovered
                    ? "scaleX(1.5)"
                    : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5
              }}
            />
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto"
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Let's create
            something exceptional together.
          </p>
          <span className="text-xs tracking-widest uppercase text-muted-foreground/60">
            gauravmrjatt4@gmail.com
          </span>
        </div>
      </div>
    </section>
  )
}
