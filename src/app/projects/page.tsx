import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProjectFilters } from "@/components/sections/ProjectFilters";
export function generateMetadata() {
  return pageMetadata("Projects", "/projects");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Projects" />
      <Container className="py-section">
        <h2 className="mb-4 text-heading">Project information preview</h2>
        <p className="mb-8 text-muted">
          These stock images illustrate industrial sectors. They are not Dodzel
          project photographs. Approved clients, scopes and project results are
          still required.
        </p>
        <ProjectFilters />
      </Container>
    </main>
  );
}
