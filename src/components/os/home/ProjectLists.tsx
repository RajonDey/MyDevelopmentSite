"use client";

import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import { OsBadge } from "@/components/os/ui/OsBadge";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import type { CommandCenterData, Project } from "@/types/os";
import { daysUntil } from "@/lib/os/progress";
import { getMember, getObjective, getPillarForObjective } from "@/lib/os/selectors";

type ProjectListProps = {
  data: CommandCenterData;
  projects: Project[];
  emptyMessage: string;
};

function ProjectListItem({ data, project }: { data: CommandCenterData; project: Project }) {
  const owner = getMember(data, project.ownerId);
  const objective = getObjective(data, project.objectiveId);
  const pillar = objective ? getPillarForObjective(data, objective) : undefined;
  const days = daysUntil(project.deadline);

  return (
    <li className="flex items-start gap-3 border-b border-os-border/60 py-3 last:border-0 last:pb-0 first:pt-0">
      {owner ? <MemberAvatar member={owner} size="sm" /> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-os-text">
          {project.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <OsBadge variant={project.priority}>{project.priority.toUpperCase()}</OsBadge>
          {pillar ? (
            <span className="text-xs text-os-muted">
              {pillar.emoji} {pillar.name}
            </span>
          ) : null}
          {days !== null ? (
            <span
              className={
                days <= 7 ? "text-xs text-os-yellow" : "text-xs text-os-muted"
              }
            >
              {days < 0
                ? `${Math.abs(days)}d overdue`
                : days === 0
                  ? "Due today"
                  : `${days}d left`}
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function ProjectList({ data, projects, emptyMessage }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="text-sm text-os-muted">{emptyMessage}</p>;
  }

  return (
    <ul>
      {projects.map((project) => (
        <ProjectListItem key={project.id} data={data} project={project} />
      ))}
    </ul>
  );
}

type PriorityProjectsProps = {
  data: CommandCenterData;
};

export function PriorityProjects({ data }: PriorityProjectsProps) {
  const projects = data.projects
    .filter((p) => p.priority === "p1" && p.status === "active")
    .sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline.localeCompare(b.deadline);
    });

  return (
    <OsCard className="h-full">
      <h3 className="text-sm font-medium text-os-text">Priority projects</h3>
      <p className="mt-0.5 text-xs text-os-muted">P1 · Active</p>
      <div className="mt-3">
        <ProjectList
          data={data}
          projects={projects}
          emptyMessage="No P1 active projects."
        />
      </div>
    </OsCard>
  );
}

export function DueSoon({ data }: PriorityProjectsProps) {
  const projects = data.projects
    .filter((p) => {
      if (p.status === "done" || !p.deadline) return false;
      const days = daysUntil(p.deadline);
      return days !== null && days <= 14 && days >= -7;
    })
    .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""));

  return (
    <OsCard className="h-full">
      <h3 className="text-sm font-medium text-os-text">Due soon</h3>
      <p className="mt-0.5 text-xs text-os-muted">Within 14 days</p>
      <div className="mt-3">
        <ProjectList
          data={data}
          projects={projects}
          emptyMessage="Nothing due in the next two weeks."
        />
      </div>
    </OsCard>
  );
}

export function WinsStrip() {
  const { data } = useOsData();
  const wins = [...data.wins]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <OsCard className="h-full">
      <h3 className="text-sm font-medium text-os-text">Recent wins</h3>
      <p className="mt-0.5 text-xs text-os-muted">Shipped & milestones</p>
      <ul className="mt-3 space-y-3">
        {wins.map((win) => (
          <li key={win.id} className="border-l-2 border-os-accent/50 pl-3">
            <p className="text-sm font-medium text-os-text">{win.title}</p>
            {win.note ? (
              <p className="mt-0.5 text-xs text-os-muted">{win.note}</p>
            ) : null}
            <p className="mt-1 text-xs text-os-muted">
              {new Date(win.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </OsCard>
  );
}
