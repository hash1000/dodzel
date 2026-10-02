import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function ClosingCta() {
  return (
    <section className="bg-navy py-section text-on-dark">
      <Container className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p className="mb-5 text-xs uppercase tracking-widest text-amber">
            Start a conversation <TodoBadge />
          </p>
          <h2 className="max-w-2xl text-5xl tracking-tight sm:text-6xl">
            {placeholders.closing.title}
          </h2>
          <p className="mt-6 max-w-lg text-muted-dark">
            {placeholders.closing.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href="/request-a-quote">Request a Quote</Button>
          <Button href="/contact" variant="outline">
            Contact
          </Button>
        </div>
      </Container>
    </section>
  );
}
