import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { placeholders } from "@/content/placeholder";
import { sectors, sectorHref } from "@/lib/nav";
export function generateMetadata() {
  return pageMetadata("Sectors", "/sectors");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Sectors" />
      <Container className="min-h-80 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {placeholders.stub.body} <TodoBadge />
        </p>
        {sectors.map((name) => (
          <section
            key={name}
            id={sectorHref(name).split("#")[1]}
            className="mt-8 border-t border-line pt-6"
          >
            <h2 className="mb-3 text-2xl">{name}</h2>
            <p className="text-muted">
              {placeholders.stub.body} <TodoBadge />
            </p>
          </section>
        ))}
      </Container>
    </main>
  );
}
