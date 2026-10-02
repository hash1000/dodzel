import { ProjectReveal } from "./ProjectReveal";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
export function FeaturedProjects() {
  return (
    <ProjectReveal>
      <Container>
        <SectionHeading {...placeholders.headings.projects}>
          <Button href="/projects" variant="outline">
            All projects
          </Button>
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {placeholders.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </ProjectReveal>
  );
}
