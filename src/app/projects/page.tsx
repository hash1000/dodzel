import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
export function generateMetadata() {
  return pageMetadata("Projects", "/projects");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Projects" />
      <Container className="py-section">
        <h2 className="mb-4 text-heading">Discuss your next project</h2>
        <p className="mb-8 text-muted">
          Contact our team to discuss your scope, requirements and delivery priorities.
        </p>
        <Button href="/contact">Get in touch</Button>
      </Container>
    </main>
  );
}
