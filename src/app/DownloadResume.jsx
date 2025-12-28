import * as React from "react";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DownloadResume() {
  // Replace with your actual resume URL (PDF link)
  const resumeUrl = "/resume.pdf"; // Example: place resume.pdf in public folder
  // OR use Google Drive / Dropbox link:
  // const resumeUrl = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
  <h1 className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tight">
         Ready to Work Together?
        </h1>
        
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Download my resume to learn more about my skills, projects, and experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Main Download Button */}
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative inline-flex items-center gap-3",
                "px-8 py-4 rounded-2xl font-semibold text-lg",
                "bg-primary text-primary-foreground shadow-lg",
                "hover:bg-primary/90 hover:shadow-2xl",
                "transition-all duration-300 hover:-translate-y-1",
                "focus:outline-none focus:ring-4 focus:ring-primary/30"
              )}
            >
              <Download className="h-6 w-6 group-hover:animate-bounce" />
              Download Resume (PDF)
            </a>

            {/* Optional Secondary Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-3",
                "px-6 py-3 rounded-xl font-medium text-base",
                "bg-neutral-100 dark:bg-neutral-800 text-foreground",
                "border border-border/60 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                "transition-all duration-300"
              )}
            >
              <FileText className="h-5 w-5" />
              View Resume Online
            </a>
          </div>

          {/* Optional small note */}
          <p  className="mt-6 text-sm text-muted-foreground">
            Last updated: December 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}