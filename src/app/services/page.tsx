import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { placeholders } from "@/content/placeholder";
import { serviceGroups, serviceHref } from "@/lib/nav";
export const metadata: Metadata = { title: "Services" };
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Services" />
      <Container className="min-h-80 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {placeholders.stub.body} <TodoBadge />
        </p>
        {serviceGroups.map((group) => (
          <section key={group.title} className="mt-10">
            <h2 className="mb-5 text-2xl">{group.title}</h2>
            {group.services.map((name) => (
              <article
                key={name}
                id={serviceHref(name).split("#")[1]}
                className="border-t border-line py-5"
              >
                <h3 className="mb-3 text-xl">{name}</h3>
                <p className="text-muted">
                  {placeholders.stub.body} <TodoBadge />
                </p>
              </article>
            ))}
          </section>
        ))}
      </Container>
    </main>
  );
}
