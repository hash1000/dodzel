import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { placeholders } from "@/content/placeholder";

export function generateMetadata() {
  return pageMetadata("Projects", "/projects");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Projects" />
      <Container className="min-h-80 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {placeholders.stub.body} <TodoBadge />
        </p>
        {placeholders.projects.map((project) => (
          <section
            key={project.id}
            id={`project-${project.id}`}
            className="mt-8 border-t border-line pt-6"
          >
            <h2 className="mb-3 text-2xl">{project.title}</h2>
            <p className="text-muted">
              {placeholders.stub.body} <TodoBadge />
            </p>
          </section>
        ))}
      </Container>
    </main>
  );
}
