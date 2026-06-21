import Link from "next/link";
import { getAllProjects, getProjectBySlug, getAllProjectSlugs } from "@/lib/projects-data";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Project by Gaurav Chaudhary`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Gaurav Chaudhary`,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Project not found</h1>
        <Link href="/" className="text-primary underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
        >
          Visit Live Site
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
