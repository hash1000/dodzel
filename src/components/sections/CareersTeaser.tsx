import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function CareersTeaser() {
  return (
    <section className="on-light bg-paper py-section">
      <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-5 eyebrow type-label">
            08 / Careers
          </p>
          <h2 className="mb-5">{placeholders.careers.title}</h2>
          <p className="max-w-lg text-[var(--fg-body)]">
            {placeholders.careers.description} <TodoBadge />
          </p>
        </div>
        <Button href="/careers" variant="outline">
          Explore careers
        </Button>
      </Container>
    </section>
  );
}
