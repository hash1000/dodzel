import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { placeholders } from "@/content/placeholder";
import { subsidiaries } from "@/lib/nav";
export const metadata: Metadata = { title: "About" };
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="About" />
      <Container className="min-h-80 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {placeholders.stub.body} <TodoBadge />
        </p>
        {subsidiaries.map((entity) => (
          <section
            key={entity.name}
            id={entity.name.toLowerCase()}
            className="mt-8 border-t border-line pt-6"
          >
            <h2 className="text-2xl">{entity.name}</h2>
            <p className="my-3">{entity.detail}</p>
            <p className="text-muted">
              {placeholders.stub.body} <TodoBadge />
            </p>
          </section>
        ))}
      </Container>
    </main>
  );
}
