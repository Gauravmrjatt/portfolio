"use client";

import { Github, Star, GitFork, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const statLinks = [
  {
    label: "Repositories",
    value: "50+",
    icon: GitFork,
    href: "https://github.com/Gauravmrjatt?tab=repositories",
  },
  {
    label: "Stars Earned",
    value: "10+",
    icon: Star,
    href: "https://github.com/Gauravmrjatt",
  },
  {
    label: "Contributions",
    value: "1k+",
    icon: Activity,
    href: "https://github.com/Gauravmrjatt",
  },
  {
    label: "Followers",
    value: "5",
    icon: Users,
    href: "https://github.com/Gauravmrjatt",
  },
];

export function GitHubWidget({ className, isDark }) {
  const graphTheme = isDark ? "github-dark-compact" : "github-compact";

  return (
    <div
      className={cn(
        "border border-border rounded-3xl p-6 sm:p-8 bg-background/50 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Github className="h-5 w-5" />
        </div>
        <div>
          <a
            href="https://github.com/Gauravmrjatt"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-lg hover:underline"
          >
            Gauravmrjatt
          </a>
          <p className="text-xs text-muted-foreground">GitHub Profile</p>
        </div>
      </div>

      {/* Stat badges */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {statLinks.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground leading-tight truncate">
                  {stat.label}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Embed stats */}
      <div className="space-y-3 ">
        <img
          src="https://github-readme-stats.vercel.app/api?username=Gauravmrjatt&show_icons=true&theme=transparent&hide_border=true&count_private=true&layout=donut-vertical"
          alt="GitHub Stats"
          className="m-auto rounded-lg"
          loading="lazy"
        />
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=Gauravmrjatt&layout=donut-vertical&theme=transparent&hide_border=true&langs_count=8"
          alt="Top Languages"
          className="m-auto"
          loading="lazy"
        />
      </div>

      {/* Contribution heatmap */}
      <div className="mt-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          Contribution Calendar
        </p>
        <div className={cn(isDark && "brightness-[1.6] contrast-[.85]")}>
          <img
            src="https://ghchart.rshah.org/Gauravmrjatt"
            alt="GitHub Contribution Heatmap"
            className="w-full rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Activity graph */}
      <div className="mt-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          Contribution Activity
        </p>
        <img
          src={`https://github-readme-activity-graph.vercel.app/graph?username=Gauravmrjatt&theme=${graphTheme}&hide_border=true&area=true`}
          alt="GitHub Activity Graph"
          className="w-full rounded-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default GitHubWidget;
