import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { real } from "@/content/real";

export function generateMetadata() {
  return pageMetadata("Conduct", "/conduct");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Conduct" />
      <Container className="min-h-80 py-16">
        <h2 className="mb-6 text-heading text-brand-red">
          {real.conduct.title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {real.conduct.description} <ReviewBadge {...real.conduct} />
        </p>
      </Container>
    </main>
  );
}
