import Link from "next/link";
import { placeholders } from "@/content/placeholder";
import { MediaFrame } from "./MediaFrame";
import { TodoBadge } from "./TodoBadge";
export function ProjectCard({
  project,
}: {
  project: (typeof placeholders.projects)[number];
}) {
  return (
    <article
      data-project-card
      className="media-hover overflow-hidden rounded-card border border-line border-t-2 border-t-accent-2 bg-surface"
    >
      <MediaFrame
        slot={`project-${project.id}`}
        className="aspect-[4/3]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="p-6">
        <p className="mb-3 text-xs text-accent-on-light">
          Illustrative stock media · project details pending
        </p>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted">
          {project.sector} · {project.country}
        </p>
        <h3 className="mb-4 text-xl">
          <Link
            href={`/projects#project-${project.id}`}
            className="hover:underline"
          >
            {project.title}
          </Link>
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm text-muted">
          <dt>Scope</dt>
          <dd>{project.scope}</dd>
          <dt>Client</dt>
          <dd>{project.client}</dd>
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </dl>
        <div className="mt-5">
          <TodoBadge todo={project.todo} />
        </div>
      </div>
    </article>
  );
}
