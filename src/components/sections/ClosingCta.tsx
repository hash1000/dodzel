import { MediaFrame } from "@/components/ui/MediaFrame";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function ClosingCta() {
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-surface-dark py-section text-on-dark"
    >
      <MediaFrame
        slot="cta-background"
        className="absolute inset-0 -z-20 h-full w-full rounded-none"
        sizes="100vw"
        scrim
      />
      <Container className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p className="mb-5 text-xs uppercase tracking-widest text-accent">
            Start a conversation <TodoBadge />
          </p>
          <h2 className="max-w-2xl text-5xl tracking-tight sm:text-6xl">
            {placeholders.closing.title}
          </h2>
          <p className="mt-6 max-w-lg text-on-dark-muted">
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
