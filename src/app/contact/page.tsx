import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { placeholders } from "@/content/placeholder";

export const metadata: Metadata = { title: "Contact" };
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Contact" />
      <Container className="min-h-80 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {placeholders.stub.body} <TodoBadge />
        </p>
      </Container>
    </main>
  );
}
