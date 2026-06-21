import { getAllProjectSlugs } from "@/lib/projects-data";

export default function sitemap() {
  const siteUrl = "https://gauravmrjatt.vercel.app";

  const projectUrls = getAllProjectSlugs().map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
