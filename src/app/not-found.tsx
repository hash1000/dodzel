import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <main id="main-content">
      <PageHero title="Page not found" />
      <Container className="min-h-80 py-16">
        <p className="mb-8 text-muted">
          The page you’re looking for could not be found.
        </p>
        <Button href="/">Return home</Button>
      </Container>
    </main>
  );
}
