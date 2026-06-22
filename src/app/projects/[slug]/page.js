import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects-data";
import ProjectDetailClient from "@/components/ProjectsFanSection";

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

  return <ProjectDetailClient initialSlug={slug} />;
}
