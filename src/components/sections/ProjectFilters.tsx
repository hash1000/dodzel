"use client";
import { useState } from "react";
import { placeholders } from "@/content/placeholder";
import { ProjectCard } from "@/components/ui/ProjectCard";
const illustrationSectors: Record<number, string> = {
  1: "Refining",
  2: "Power",
  3: "Cement",
};
const filters = ["All sectors", "Refining", "Power", "Cement"];
export function ProjectFilters() {
  const [selected, setSelected] = useState("All sectors");
  const projects = placeholders.projects.filter(
    (project) =>
      selected === "All sectors" ||
      illustrationSectors[project.id] === selected,
  );
  return (
    <>
      <div
        aria-label="Filter illustrative stock media by sector"
        className="mb-8 flex flex-wrap gap-3"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            aria-pressed={selected === filter}
            onClick={() => setSelected(filter)}
            className={`min-h-11 rounded-full border px-5 text-sm ${selected === filter ? "border-accent bg-accent text-surface-dark" : "border-line bg-surface text-link hover:border-accent-2"}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mb-5 text-sm text-muted">
        {projects.length} illustrative media{" "}
        {projects.length === 1 ? "card" : "cards"}. Filters describe the stock
        imagery; approved project sectors are pending.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <div id={`project-${project.id}`} key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
}
