import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
export default function Loading() {
  return (
    <main id="main-content" aria-busy="true">
      <PageHero title="Loading…" />
      <Container className="min-h-screen py-16">
        <p role="status" className="text-muted">
          Loading page content…
        </p>
      </Container>
    </main>
  );
}
